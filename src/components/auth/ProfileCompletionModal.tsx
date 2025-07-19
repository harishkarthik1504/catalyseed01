import React, { useState } from 'react';
import { X, Save, User, Building, Target, DollarSign } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const ProfileCompletionModal: React.FC = () => {
  const { user, completeProfile, showProfileCompletion, setShowProfileCompletion, isLoading } = useAuth();
  const [profileData, setProfileData] = useState<any>({});
  const [error, setError] = useState('');

  if (!showProfileCompletion || !user || user.role === 'general') {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const success = await completeProfile(profileData);
      if (!success) {
        setError('Failed to save profile. Please try again.');
      }
    } catch (error: any) {
      setError(error.message || 'Failed to save profile');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: string, value: string) => {
    const array = value.split(',').map(item => item.trim()).filter(item => item);
    setProfileData((prev: any) => ({ ...prev, [field]: array }));
  };

  const renderRoleSpecificFields = () => {
    switch (user.role) {
      case 'startup':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  value={profileData.company || ''}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Your startup name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Designation *
                </label>
                <input
                  type="text"
                  value={profileData.designation || ''}
                  onChange={(e) => handleInputChange('designation', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g., Founder & CEO"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Funding Stage
                </label>
                <select
                  value={profileData.fundingStage || ''}
                  onChange={(e) => handleInputChange('fundingStage', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select funding stage</option>
                  <option value="Idea">Idea Stage</option>
                  <option value="Pre-Seed">Pre-Seed</option>
                  <option value="Seed">Seed</option>
                  <option value="Series A">Series A</option>
                  <option value="Series B+">Series B+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  value={profileData.location || ''}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="City, State"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Description *
              </label>
              <textarea
                value={profileData.bio || ''}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Describe your startup and what problem you're solving..."
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website URL
                </label>
                <input
                  type="url"
                  value={profileData.website || ''}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="https://yourcompany.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  LinkedIn Profile
                </label>
                <input
                  type="url"
                  value={profileData.linkedin || ''}
                  onChange={(e) => handleInputChange('linkedin', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Industry Sectors (comma-separated)
              </label>
              <input
                type="text"
                value={profileData.sectors?.join(', ') || ''}
                onChange={(e) => handleArrayChange('sectors', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., EdTech, FinTech, HealthTech"
              />
            </div>
          </>
        );

      case 'institute':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Institution Name *
                </label>
                <input
                  type="text"
                  value={profileData.company || ''}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Your institution name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Designation *
                </label>
                <input
                  type="text"
                  value={profileData.designation || ''}
                  onChange={(e) => handleInputChange('designation', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g., Innovation Cell Director"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Established Year
                </label>
                <input
                  type="text"
                  value={profileData.establishedYear || ''}
                  onChange={(e) => handleInputChange('establishedYear', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g., 1959"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Student Count
                </label>
                <input
                  type="text"
                  value={profileData.studentCount || ''}
                  onChange={(e) => handleInputChange('studentCount', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g., 10,000+"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>
              <input
                type="text"
                value={profileData.location || ''}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="City, State"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Institution Description *
              </label>
              <textarea
                value={profileData.bio || ''}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Describe your institution's focus on innovation and entrepreneurship..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Research Areas (comma-separated)
              </label>
              <input
                type="text"
                value={profileData.researchAreas?.join(', ') || ''}
                onChange={(e) => handleArrayChange('researchAreas', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., AI/ML, IoT, Blockchain, Robotics"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website URL
              </label>
              <input
                type="url"
                value={profileData.website || ''}
                onChange={(e) => handleInputChange('website', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="https://yourinstitution.edu"
              />
            </div>
          </>
        );

      case 'investor':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Organization Name *
                </label>
                <input
                  type="text"
                  value={profileData.company || ''}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Your investment firm/organization"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Designation *
                </label>
                <input
                  type="text"
                  value={profileData.designation || ''}
                  onChange={(e) => handleInputChange('designation', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g., Managing Partner"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Investment Range *
              </label>
              <input
                type="text"
                value={profileData.investmentRange || ''}
                onChange={(e) => handleInputChange('investmentRange', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., ₹50L - ₹5Cr"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>
              <input
                type="text"
                value={profileData.location || ''}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="City, State"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Investment Focus *
              </label>
              <textarea
                value={profileData.bio || ''}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Describe your investment thesis and focus areas..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Focus Sectors (comma-separated) *
              </label>
              <input
                type="text"
                value={profileData.sectors?.join(', ') || ''}
                onChange={(e) => handleArrayChange('sectors', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., FinTech, HealthTech, EdTech, AgriTech"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website URL
                </label>
                <input
                  type="url"
                  value={profileData.website || ''}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="https://yourfirm.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  LinkedIn Profile
                </label>
                <input
                  type="url"
                  value={profileData.linkedin || ''}
                  onChange={(e) => handleInputChange('linkedin', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  const getRoleIcon = () => {
    switch (user.role) {
      case 'startup': return <Target className="w-6 h-6 text-purple-600" />;
      case 'institute': return <Building className="w-6 h-6 text-blue-600" />;
      case 'investor': return <DollarSign className="w-6 h-6 text-green-600" />;
      default: return <User className="w-6 h-6 text-gray-600" />;
    }
  };

  const getRoleColor = () => {
    switch (user.role) {
      case 'startup': return 'from-purple-600 to-purple-700';
      case 'institute': return 'from-blue-600 to-blue-700';
      case 'investor': return 'from-green-600 to-green-700';
      default: return 'from-gray-600 to-gray-700';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-black bg-opacity-50 backdrop-blur-sm" />
        
        <div className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 bg-gradient-to-r ${getRoleColor()} rounded-xl flex items-center justify-center`}>
                {getRoleIcon()}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Complete Your Profile</h3>
                <p className="text-gray-600 text-sm">
                  Help us personalize your {user.role} experience
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowProfileCompletion(false)}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {renderRoleSpecificFields()}

            <div className="flex space-x-3 pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className={`flex-1 bg-gradient-to-r ${getRoleColor()} text-white py-3 px-4 rounded-lg hover:opacity-90 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2`}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Complete Profile</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => setShowProfileCompletion(false)}
                className="bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Skip for Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileCompletionModal;