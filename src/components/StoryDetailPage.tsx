import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, MapPin, Calendar, Trophy, BarChart3, Phone, Mail, Globe, Linkedin, User, Building, Target, DollarSign } from 'lucide-react';
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../config/firebase';
import { SuccessStory } from '../types/auth';
import ShareModal from './ShareModal';

const StoryDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState<SuccessStory | null>(null);
  const [loading, setLoading] = useState(true);
  const [likedStories, setLikedStories] = useState(new Set());
  const [shareModalOpen, setShareModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      fetchStory(id);
    }
  }, [id]);

  const fetchStory = async (storyId: string) => {
    try {
      setLoading(true);
      const docRef = doc(db, 'successStories', storyId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        setStory({ 
          id: docSnap.id, 
          ...data,
          createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString()
        } as SuccessStory);
      } else {
        console.log('No such document!');
        navigate('/success-stories');
      }
    } catch (error) {
      console.error('Error fetching story:', error);
      navigate('/success-stories');
    } finally {
      setLoading(false);
    }
  };

  const toggleLike = async (storyId: string) => {
    try {
      const storyRef = doc(db, 'successStories', storyId);
      const isLiked = likedStories.has(storyId);
      
      // Update Firestore
      await updateDoc(storyRef, {
        likes: increment(isLiked ? -1 : 1)
      });
      
      // Update local state
      setLikedStories(prev => {
        const newLiked = new Set(prev);
        if (newLiked.has(storyId)) {
          newLiked.delete(storyId);
        } else {
          newLiked.add(storyId);
        }
        return newLiked;
      });
      
      // Update story state with new like count
      if (story) {
        setStory(prev => prev ? { ...prev, likes: (prev.likes || 0) + (isLiked ? -1 : 1) } : null);
      }
    } catch (error) {
      console.error('Error updating like:', error);
    }
  };

  const handleShare = () => {
    setShareModalOpen(true);
  };

  const handleBack = () => {
    navigate('/success-stories');
  };

  // AI Scorecard Component
  const AIScorecard = ({ story }: { story: SuccessStory }) => {
    const metrics = [
      { field: 'problemClarity', label: 'Problem Clarity', value: story.problemClarity || 0 },
      { field: 'marketOpportunity', label: 'Market Opportunity', value: story.marketOpportunity || 0 },
      { field: 'innovationUSP', label: 'Innovation / USP', value: story.innovationUSP || 0 },
      { field: 'founderStrength', label: 'Founder Strength', value: story.founderStrength || 0 },
      { field: 'traction', label: 'Traction', value: story.traction || 0 },
      { field: 'scalability', label: 'Scalability', value: story.scalability || 0 },
      { field: 'revenueModel', label: 'Revenue Model', value: story.revenueModel || 0 },
      { field: 'impactPotential', label: 'Impact Potential', value: story.impactPotential || 0 }
    ];

    const totalScore = story.totalScore || 0;
    const maxScore = 40;
    const percentage = Math.round((totalScore / maxScore) * 100);

    const getAssessment = (percentage: number) => {
      if (percentage >= 90) return { text: 'Exceptional', emoji: '🚀', color: 'text-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-200' };
      if (percentage >= 80) return { text: 'Excellent', emoji: '⭐', color: 'text-green-500', bgColor: 'bg-green-50', borderColor: 'border-green-200' };
      if (percentage >= 70) return { text: 'Very Good', emoji: '👍', color: 'text-blue-500', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' };
      if (percentage >= 60) return { text: 'Good', emoji: '✅', color: 'text-yellow-500', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200' };
      if (percentage >= 50) return { text: 'Average', emoji: '⚡', color: 'text-orange-500', bgColor: 'bg-orange-50', borderColor: 'border-orange-200' };
      return { text: 'Needs Improvement', emoji: '📈', color: 'text-red-500', bgColor: 'bg-red-50', borderColor: 'border-red-200' };
    };

    const assessment = getAssessment(percentage);

    // Check if any scores exist
    const hasScores = metrics.some(metric => metric.value > 0);
    if (!hasScores) return null;

    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">AI Scorecard Radar Chart</h3>
            <p className="text-gray-600 text-sm">Comprehensive startup evaluation</p>
          </div>
        </div>

        {/* Metrics List */}
        <div className="space-y-4 mb-6">
          {metrics.map((metric) => (
            <div key={metric.field} className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 flex-1">{metric.label}</span>
              
              {/* Visual Dots */}
              <div className="flex items-center space-x-1 mx-4">
                {[1, 2, 3, 4, 5].map((dot) => (
                  <div
                    key={dot}
                    className={`w-2.5 h-2.5 rounded-full ${
                      dot <= metric.value
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                        : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
              
              <span className="text-sm font-bold text-purple-600 w-8 text-right">{metric.value}</span>
            </div>
          ))}
        </div>

        {/* Total Score Section */}
        <div className={`${assessment.bgColor} rounded-xl p-4 border ${assessment.borderColor}`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="text-lg">{assessment.emoji}</span>
              <span className={`font-bold ${assessment.color}`}>{assessment.text}</span>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {totalScore}/40
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div 
              className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${percentage}%` }}
            />
          </div>
          
          <div className="text-center">
            <span className="text-sm font-medium text-gray-600">{percentage}% Success Probability</span>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="pt-16 sm:pt-20 pb-12 sm:pb-16 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading success story...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="pt-16 sm:pt-20 pb-12 sm:pb-16 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Story Not Found</h2>
            <p className="text-gray-600 mb-8">The success story you're looking for doesn't exist.</p>
            <button
              onClick={handleBack}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Back to Success Stories
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 sm:pt-20 pb-12 sm:pb-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <button 
            onClick={handleBack}
            className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium">Back to All Stories</span>
          </button>
        </div>

        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          {/* Hero Image */}
          {(story.productServicePictures?.[0] || story.inventorPhoto) && (
            <div className="relative h-64 sm:h-80">
              <img
                src={story.productServicePictures?.[0] || story.inventorPhoto}
                alt={story.companyStartupName}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <span className="bg-purple-600 px-3 py-1 rounded-full text-sm font-medium">
                  {story.innovationCategory}
                </span>
              </div>
              
              {/* Action Buttons in Hero */}
              <div className="absolute bottom-6 right-6 flex items-center space-x-3">
                <button
                  onClick={() => toggleLike(story.id)}
                  className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 hover:text-red-600 px-4 py-2 rounded-lg transition-colors"
                >
                  <Heart className={`w-4 h-4 ${likedStories.has(story.id) ? 'fill-red-500 text-red-500' : ''}`} />
                  <span className="font-medium">{story.likes || 0}</span>
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  <span className="font-medium">Share</span>
                </button>
              </div>
            </div>
          )}

          {/* Header Info */}
          <div className="p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6 space-y-6 lg:space-y-0">
              <div className="flex items-center space-x-6">
                {/* Founder Image */}
                {story.inventorPhoto && (
                  <img
                    src={story.inventorPhoto}
                    alt={story.innovatorName}
                    className="w-20 h-20 lg:w-24 lg:h-24 rounded-full object-cover border-4 border-purple-200 shadow-lg"
                  />
                )}
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                    {story.companyStartupName}
                  </h1>
                  <p className="text-lg text-gray-600 mb-1">
                    Founded by <span className="font-semibold text-purple-600">{story.innovatorName}</span>
                  </p>
                  <p className="text-gray-500 mb-2">
                    {story.studentAlumniOf} • Class of {story.yearOrBatch}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Founded {story.yearOfInnovation}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{story.businessAddress.split(',')[0]}</span>
                    </span>
                  </div>
                  {story.editedBy && (
                    <p className="text-sm text-gray-500 mt-2 italic">
                      ✏️ Edited by: {story.editedBy}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">About the Startup</h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                {story.aboutStartup}
              </p>
              
              {/* Product/Service Details */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Product/Service Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-600">Product Name:</span>
                    <p className="font-semibold text-gray-900">{story.productServiceName}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Current Stage:</span>
                    <p className="font-semibold text-gray-900">{story.currentStage}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Verdict Section */}
            {story.aiVerdict && (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200 mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-900">AI Verdict</h3>
                    <p className="text-blue-700 text-sm">Expert assessment and recommendation</p>
                  </div>
                </div>
                <div className="bg-white/70 rounded-lg p-4 border border-blue-200">
                  <p className="text-blue-900 leading-relaxed font-medium">
                    {story.aiVerdict}
                  </p>
                </div>
              </div>
            )}

            {/* Funding Details */}
            {story.fundRaisedDetails && (
              <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Funding Raised</h3>
                <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                  <div className="flex items-center space-x-3 mb-3">
                    <Trophy className="w-6 h-6 text-yellow-600" />
                    <span className="font-bold text-yellow-900 text-lg">Funds Raised</span>
                  </div>
                  <p className="text-yellow-800 text-xl font-bold">{story.fundRaisedDetails}</p>
                </div>
              </div>
            )}

            {/* Investment & Mentorship Opportunities */}
            {(story.lookingForInvestor || story.mentorConnect) && (
              <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Current Opportunities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {story.lookingForInvestor && (
                    <div className="p-6 bg-green-50 rounded-xl border border-green-200">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                          <DollarSign className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-green-900 text-lg">Seeking Investment</h4>
                          <p className="text-green-600 text-sm">Open for funding discussions</p>
                        </div>
                      </div>
                      {story.investmentRange && (
                        <p className="text-green-700 font-semibold">Range: {story.investmentRange}</p>
                      )}
                    </div>
                  )}
                  {story.mentorConnect && (
                    <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                          <Target className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-blue-900 text-lg">Seeking Mentorship</h4>
                          <p className="text-blue-600 text-sm">Looking for guidance</p>
                        </div>
                      </div>
                      {story.mentorDomainDetails && (
                        <p className="text-blue-700 font-semibold">Domain: {story.mentorDomainDetails}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Product Gallery */}
            {story.productServicePictures && story.productServicePictures.length > 1 && (
              <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Product Gallery</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {story.productServicePictures.slice(1).map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`${story.productServiceName} ${index + 1}`}
                        className="w-full h-32 object-cover rounded-xl shadow-md group-hover:shadow-lg transition-shadow"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-xl"></div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Additional Information */}
          <div className="space-y-6">
            {/* AI Scorecard */}
            <AIScorecard story={story} />

            {/* Company Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Company Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Building className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Company Name</p>
                    <p className="font-medium text-gray-900">{story.companyStartupName}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Founded</p>
                    <p className="font-medium text-gray-900">{story.yearOfInnovation}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Address</p>
                    <p className="font-medium text-gray-900">{story.businessAddress}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Get in Touch</h3>
              <div className="space-y-3">
                {story.mobile && (
                  <a
                    href={`tel:${story.mobile}`}
                    className="flex items-center space-x-3 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors group"
                  >
                    <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-green-900">Call</p>
                      <p className="text-sm text-green-700">{story.mobile}</p>
                    </div>
                  </a>
                )}
                
                {story.email && (
                  <a
                    href={`mailto:${story.email}`}
                    className="flex items-center space-x-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
                  >
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-blue-900">Email</p>
                      <p className="text-sm text-blue-700">{story.email}</p>
                    </div>
                  </a>
                )}
                
                {story.webAddress && (
                  <a
                    href={story.webAddress}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors group"
                  >
                    <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                      <Globe className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-purple-900">Website</p>
                      <p className="text-sm text-purple-700">Visit Site</p>
                    </div>
                  </a>
                )}

                {story.linkedinProfile && (
                  <a
                    href={story.linkedinProfile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-3 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors group"
                  >
                    <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                      <Linkedin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-indigo-900">LinkedIn</p>
                      <p className="text-sm text-indigo-700">Connect</p>
                    </div>
                  </a>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-bold mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-purple-100">Founded</span>
                  <span className="font-bold">{story.yearOfInnovation}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-purple-100">Category</span>
                  <span className="font-bold">{story.innovationCategory}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-purple-100">Stage</span>
                  <span className="font-bold">{story.currentStage}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-purple-100">Likes</span>
                  <span className="font-bold">{story.likes || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        story={story}
        type="story"
      />
    </div>
  );
};

export default StoryDetailPage;