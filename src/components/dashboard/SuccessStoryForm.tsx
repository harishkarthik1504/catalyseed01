import React, { useState } from 'react';
import { X, Save, Upload, Trash2, AlertCircle, CheckCircle } from 'lucide-react';
import { collection, addDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../config/firebase';
import { useAuth } from '../../context/AuthContext';
import { SuccessStory } from '../../types/auth';

interface SuccessStoryFormProps {
  isOpen: boolean;
  onClose: () => void;
  editingStory?: SuccessStory | null;
}

const SuccessStoryForm: React.FC<SuccessStoryFormProps> = ({ isOpen, onClose, editingStory }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  // Initialize with empty form data
  const getInitialFormData = () => ({
    innovatorName: '',
    mobile: '',
    email: '',
    webAddress: '',
    linkedinProfile: '',
    innovationCategory: 'EdTech',
    yearOfInnovation: '',
    editedBy: 'Dr. G. S. Mahalakshmi',
    aiVerdict: '',
    aboutStartup: '',
    currentStage: '',
    fundRaisedDetails: '',
    studentAlumniOf: '',
    yearOrBatch: '',
    businessAddress: '',
    companyStartupName: '',
    productServiceName: '',
    lookingForInvestor: false,
    investmentRange: '',
    mentorConnect: false,
    mentorDomainDetails: '',
    // AI Scorecard fields
    problemClarity: 0,
    marketOpportunity: 0,
    innovationUSP: 0,
    founderStrength: 0,
    traction: 0,
    scalability: 0,
    revenueModel: 0,
    impactPotential: 0,
    totalScore: 0
  });

  const [formData, setFormData] = useState(getInitialFormData);

  const [inventorPhoto, setInventorPhoto] = useState<File | null>(null);
  const [productServicePictures, setProductServicePictures] = useState<File[]>([]);
  const [existingInventorPhoto, setExistingInventorPhoto] = useState('');
  const [existingProductPictures, setExistingProductPictures] = useState<string[]>([]);

  // Update form data when editingStory changes or modal opens
  React.useEffect(() => {
    if (isOpen) {
      if (editingStory) {
        // Populate form with existing story data
        setFormData({
          innovatorName: editingStory.innovatorName || '',
          mobile: editingStory.mobile || '',
          email: editingStory.email || '',
          webAddress: editingStory.webAddress || '',
          linkedinProfile: editingStory.linkedinProfile || '',
          innovationCategory: editingStory.innovationCategory || 'EdTech',
          yearOfInnovation: editingStory.yearOfInnovation || '',
          editedBy: editingStory.editedBy || 'Dr. G. S. Mahalakshmi',
          aiVerdict: editingStory.aiVerdict || '',
          aboutStartup: editingStory.aboutStartup || '',
          currentStage: editingStory.currentStage || '',
          fundRaisedDetails: editingStory.fundRaisedDetails || '',
          studentAlumniOf: editingStory.studentAlumniOf || '',
          yearOrBatch: editingStory.yearOrBatch || '',
          businessAddress: editingStory.businessAddress || '',
          companyStartupName: editingStory.companyStartupName || '',
          productServiceName: editingStory.productServiceName || '',
          lookingForInvestor: editingStory.lookingForInvestor || false,
          investmentRange: editingStory.investmentRange || '',
          mentorConnect: editingStory.mentorConnect || false,
          mentorDomainDetails: editingStory.mentorDomainDetails || '',
          // AI Scorecard fields
          problemClarity: editingStory.problemClarity || 0,
          marketOpportunity: editingStory.marketOpportunity || 0,
          innovationUSP: editingStory.innovationUSP || 0,
          founderStrength: editingStory.founderStrength || 0,
          traction: editingStory.traction || 0,
          scalability: editingStory.scalability || 0,
          revenueModel: editingStory.revenueModel || 0,
          impactPotential: editingStory.impactPotential || 0,
          totalScore: editingStory.totalScore || 0
        });
        setExistingInventorPhoto(editingStory.inventorPhoto || '');
        setExistingProductPictures(editingStory.productServicePictures || []);
      } else {
        // Reset form for new story
        setFormData(getInitialFormData());
        setExistingInventorPhoto('');
        setExistingProductPictures([]);
      }
      
      // Reset file inputs and states
      setInventorPhoto(null);
      setProductServicePictures([]);
      setError('');
      setSuccess(false);
    }
  }, [isOpen, editingStory]);

  // Reset form when modal closes
  React.useEffect(() => {
    if (!isOpen) {
      // Small delay to allow modal close animation
      setTimeout(() => {
        resetForm();
      }, 300);
    }
  }, [isOpen]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Auto-calculate total score when scorecard fields change
    if (['problemClarity', 'marketOpportunity', 'innovationUSP', 'founderStrength', 'traction', 'scalability', 'revenueModel', 'impactPotential'].includes(field)) {
      const updatedData = { ...formData, [field]: value };
      const total = updatedData.problemClarity + updatedData.marketOpportunity + updatedData.innovationUSP + 
                   updatedData.founderStrength + updatedData.traction + updatedData.scalability + 
                   updatedData.revenueModel + updatedData.impactPotential;
      setFormData(prev => ({ ...prev, [field]: value, totalScore: total }));
    }
  };

  const handleFileUpload = async (file: File, path: string): Promise<string> => {
    const storageRef = ref(storage, `success-stories/${path}/${Date.now()}_${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError('');

    try {
      // Upload inventor photo
      let inventorPhotoUrl = '';
      if (inventorPhoto) {
        inventorPhotoUrl = await handleFileUpload(inventorPhoto, 'inventor-photos');
      } else {
        inventorPhotoUrl = existingInventorPhoto;
      }

      // Upload product/service pictures
      const productServiceUrls: string[] = [];
      
      // Keep existing pictures that weren't removed
      productServiceUrls.push(...existingProductPictures);
      
      // Upload new pictures
      for (const file of productServicePictures) {
        const url = await handleFileUpload(file, 'product-service-pictures');
        productServiceUrls.push(url);
      }

      // Prepare success story data
      const successStoryData = {
        ...formData,
        inventorPhoto: inventorPhotoUrl,
        productServicePictures: productServiceUrls,
        likes: editingStory?.likes || 0,
        shareCount: editingStory?.shareCount || 0,
        createdAt: editingStory?.createdAt || serverTimestamp(),
        createdBy: editingStory?.createdBy || user.id,
        status: 'published', // Admin can directly publish
        updatedAt: serverTimestamp(),
        updatedBy: user.id
      };

      if (editingStory) {
        // Update existing story
        await updateDoc(doc(db, 'successStories', editingStory.id), successStoryData);
      } else {
        // Create new story
        await addDoc(collection(db, 'successStories'), successStoryData);
      }
      
      setSuccess(true);
      setTimeout(() => {
        onClose();
        resetForm();
      }, 2000);

    } catch (error: any) {
      console.error('Error creating success story:', error);
      setError(error.message || 'Failed to create success story');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData(getInitialFormData());
    setInventorPhoto(null);
    setProductServicePictures([]);
    setExistingInventorPhoto('');
    setExistingProductPictures([]);
    setSuccess(false);
    setError('');
  };

  const removeExistingProductImage = (index: number) => {
    setExistingProductPictures(prev => prev.filter((_, i) => i !== index));
  };

  const removeProductImage = (index: number) => {
    setProductServicePictures(prev => prev.filter((_, i) => i !== index));
  };

  if (!isOpen) return null;

  if (success) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity bg-black bg-opacity-50 backdrop-blur-sm" />
          
          <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Success Story {editingStory ? 'Updated' : 'Published'}!
              </h3>
              <p className="text-gray-600 mb-4">
                The success story has been successfully {editingStory ? 'updated' : 'published'} and is now visible on the platform.
              </p>
              <div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose} />
        
        <div className="inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              {editingStory ? 'Edit Success Story' : 'Add Success Story'}
            </h3>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-4 h-4 text-red-500" />
                <span className="text-sm text-red-700">{error}</span>
              </div>
            )}

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Innovator Name *
                </label>
                <input
                  type="text"
                  value={formData.innovatorName}
                  onChange={(e) => handleInputChange('innovatorName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile *
                </label>
                <input
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => handleInputChange('mobile', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Web Address
                </label>
                <input
                  type="url"
                  value={formData.webAddress}
                  onChange={(e) => handleInputChange('webAddress', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  LinkedIn Profile
                </label>
                <input
                  type="url"
                  value={formData.linkedinProfile}
                  onChange={(e) => handleInputChange('linkedinProfile', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Innovation Category *
                </label>
                <select
                  value={formData.innovationCategory}
                  onChange={(e) => handleInputChange('innovationCategory', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                >
                  <option value="EdTech">EdTech</option>
                  <option value="FinTech">FinTech</option>
                  <option value="AgriTech">AgriTech</option>
                  <option value="DeepTech">DeepTech</option>
                  <option value="Robotics">Robotics</option>
                  <option value="Waste Management">Waste Management</option>
                  <option value="Pink Zone">Pink Zone</option>
                  <option value="Campus Startups">Campus Startups</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year of Innovation *
                </label>
                <input
                  type="text"
                  value={formData.yearOfInnovation}
                  onChange={(e) => handleInputChange('yearOfInnovation', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g., 2024"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Edited By
                </label>
                <input
                  type="text"
                  value={formData.editedBy}
                  onChange={(e) => handleInputChange('editedBy', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Image Uploads */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Inventor Photo
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setInventorPhoto(e.target.files?.[0] || null)}
                    className="w-full"
                  />
                  {(inventorPhoto || existingInventorPhoto) && (
                    <div className="mt-2">
                      <img
                        src={inventorPhoto ? URL.createObjectURL(inventorPhoto) : existingInventorPhoto}
                        alt="Preview"
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      {existingInventorPhoto && !inventorPhoto && (
                        <p className="text-xs text-gray-500 mt-1">Current photo (upload new to replace)</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product/Service Pictures
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      setProductServicePictures(prev => [...prev, ...files]);
                    }}
                    className="w-full"
                  />
                  
                  {/* Show existing pictures */}
                  {existingProductPictures.length > 0 && (
                    <div className="mt-2">
                      <p className="text-xs text-gray-500 mb-2">Current Pictures:</p>
                      <div className="grid grid-cols-3 gap-2 mb-2">
                        {existingProductPictures.map((url, index) => (
                          <div key={`existing-${index}`} className="relative">
                            <img
                              src={url}
                              alt={`Existing ${index + 1}`}
                              className="w-full h-16 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => removeExistingProductImage(index)}
                              className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Show new pictures */}
                  {productServicePictures.length > 0 && (
                    <div className="mt-2">
                      <p className="text-xs text-gray-500 mb-2">New Pictures:</p>
                      <div className="grid grid-cols-3 gap-2">
                        {productServicePictures.map((file, index) => (
                          <div key={`new-${index}`} className="relative">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`New ${index + 1}`}
                              className="w-full h-16 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => removeProductImage(index)}
                              className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Company Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company/Startup Name *
                </label>
                <input
                  type="text"
                  value={formData.companyStartupName}
                  onChange={(e) => handleInputChange('companyStartupName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product/Service Name *
                </label>
                <input
                  type="text"
                  value={formData.productServiceName}
                  onChange={(e) => handleInputChange('productServiceName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                About Startup *
              </label>
              <textarea
                value={formData.aboutStartup}
                onChange={(e) => handleInputChange('aboutStartup', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                AI Verdict
              </label>
              <textarea
                value={formData.aiVerdict}
                onChange={(e) => handleInputChange('aiVerdict', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="AI-generated assessment and verdict about this startup..."
              />
              <p className="text-xs text-gray-500 mt-1">
                This field will be displayed prominently on the success story detail page
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Stage *
                </label>
                <input
                  type="text"
                  value={formData.currentStage}
                  onChange={(e) => handleInputChange('currentStage', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g., Seed, Series A, MVP"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fund Raised Details
                </label>
                <input
                  type="text"
                  value={formData.fundRaisedDetails}
                  onChange={(e) => handleInputChange('fundRaisedDetails', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g., ₹50 Lakhs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Student/Alumni of *
                </label>
                <input
                  type="text"
                  value={formData.studentAlumniOf}
                  onChange={(e) => handleInputChange('studentAlumniOf', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year or Batch *
                </label>
                <input
                  type="text"
                  value={formData.yearOrBatch}
                  onChange={(e) => handleInputChange('yearOrBatch', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Address *
                </label>
                <textarea
                  value={formData.businessAddress}
                  onChange={(e) => handleInputChange('businessAddress', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              {/* Investment & Mentorship Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="lookingForInvestor"
                    checked={formData.lookingForInvestor}
                    onChange={(e) => handleInputChange('lookingForInvestor', e.target.checked)}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <label htmlFor="lookingForInvestor" className="text-sm font-medium text-gray-700">
                    Looking for Investor?
                  </label>
                </div>

                {formData.lookingForInvestor && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Investment Range
                    </label>
                    <input
                      type="text"
                      value={formData.investmentRange}
                      onChange={(e) => handleInputChange('investmentRange', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="e.g., ₹1-5 Cr"
                    />
                  </div>
                )}

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="mentorConnect"
                    checked={formData.mentorConnect}
                    onChange={(e) => handleInputChange('mentorConnect', e.target.checked)}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <label htmlFor="mentorConnect" className="text-sm font-medium text-gray-700">
                    Mentor Connect?
                  </label>
                </div>

                {formData.mentorConnect && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Domain Details
                    </label>
                    <input
                      type="text"
                      value={formData.mentorDomainDetails}
                      onChange={(e) => handleInputChange('mentorDomainDetails', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="e.g., Technology, Marketing, Finance"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* AI Scorecard Section */}
            <div className="border-t border-gray-200 pt-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">AI Scorecard Evaluation</h4>
              <p className="text-sm text-gray-600 mb-6">Rate each parameter from 0-5 (0 = Poor, 5 = Excellent)</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { field: 'problemClarity', label: 'Problem Clarity' },
                  { field: 'marketOpportunity', label: 'Market Opportunity' },
                  { field: 'innovationUSP', label: 'Innovation / USP' },
                  { field: 'founderStrength', label: 'Founder Strength' },
                  { field: 'traction', label: 'Traction' },
                  { field: 'scalability', label: 'Scalability' },
                  { field: 'revenueModel', label: 'Revenue Model' },
                  { field: 'impactPotential', label: 'Impact Potential' }
                ].map((item) => (
                  <div key={item.field} className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700">
                      {item.label}
                    </label>
                    
                    {/* Visual Dots */}
                    <div className="flex items-center space-x-2">
                      {[1, 2, 3, 4, 5].map((dot) => (
                        <button
                          key={dot}
                          type="button"
                          onClick={() => handleInputChange(item.field, dot)}
                          className={`w-4 h-4 rounded-full transition-all duration-200 hover:scale-110 ${
                            dot <= (formData[item.field as keyof typeof formData] as number)
                              ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-md'
                              : 'bg-gray-300 hover:bg-gray-400'
                          }`}
                        />
                      ))}
                      <span className="ml-3 text-sm font-medium text-purple-600">
                        {formData[item.field as keyof typeof formData] as number}/5
                      </span>
                    </div>
                    
                    {/* Range Slider */}
                    <input
                      type="range"
                      min="0"
                      max="5"
                      value={formData[item.field as keyof typeof formData] as number}
                      onChange={(e) => handleInputChange(item.field, parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-purple"
                    />
                    
                    {/* Number Input */}
                    <input
                      type="number"
                      min="0"
                      max="5"
                      value={formData[item.field as keyof typeof formData] as number}
                      onChange={(e) => {
                        const value = Math.max(0, Math.min(5, parseInt(e.target.value) || 0));
                        handleInputChange(item.field, value);
                      }}
                      className="w-20 px-2 py-1 border border-gray-300 rounded text-center text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h5 className="text-lg font-bold text-gray-900">Total Assessment Score</h5>
                    <p className="text-gray-600 text-sm">Overall startup evaluation rating</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {formData.totalScore}/40
                    </div>
                    <div className="text-sm text-gray-500">
                      {Math.round((formData.totalScore / 40) * 100)}% Success Rate
                    </div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full transition-all duration-500 shadow-sm"
                    style={{ width: `${(formData.totalScore / 40) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>{editingStory ? 'Update Success Story' : 'Publish Success Story'}</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SuccessStoryForm;