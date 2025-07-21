import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, MapPin, Calendar, Search, Filter, Trophy } from 'lucide-react';
import { collection, getDocs, query, doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../config/firebase';
import { SuccessStory } from '../types/auth';
import ShareModal from './ShareModal';

const AllSuccessStories = () => {
  const navigate = useNavigate();
  const { id: urlStoryId } = useParams();
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [likedStories, setLikedStories] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedStory, setExpandedStory] = useState<string | null>(null);
  const [clickedStory, setClickedStory] = useState<string | null>(null);
  const [detailViewStory, setDetailViewStory] = useState<SuccessStory | null>(null);

  useEffect(() => {
    fetchSuccessStories();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Handle category selection from URL params or custom event
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    if (category) {
      setSelectedFilter(category);
    }
    
    // Listen for category selection events from header
    const handleCategorySelect = (event: CustomEvent) => {
      setSelectedFilter(event.detail);
    };
    
    window.addEventListener('categorySelect', handleCategorySelect as EventListener);
    
    return () => {
      sessionStorage.removeItem('successStoriesScrollPosition');
      window.removeEventListener('categorySelect', handleCategorySelect as EventListener);
    };
  }, []);

  // Handle URL-based story viewing
  useEffect(() => {
    if (urlStoryId && stories.length > 0) {
      const story = stories.find(s => s.id === urlStoryId);
      if (story) {
        setDetailViewStory(story);
      }
    }
  }, [urlStoryId, stories]);

  const fetchSuccessStories = async () => {
    try {
      setLoading(true);
      console.log('Fetching all success stories...');
      
      // Simplified query to avoid composite index requirement
      const q = query(collection(db, 'successStories'));
      
      const querySnapshot = await getDocs(q);
      console.log('All stories query snapshot size:', querySnapshot.size);
      
      const storiesData: SuccessStory[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        // Filter for published stories on client side
        if (data.status === 'published') {
          console.log('All stories data:', data);
          storiesData.push({ 
            id: doc.id, 
            ...data,
            createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString()
          } as SuccessStory);
        }
      });
      
      // Sort by createdAt on client side
      storiesData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      
      console.log('All fetched stories:', storiesData);
      setStories(storiesData);
    } catch (error) {
      console.error('Error fetching success stories:', error);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredStories = () => {
    return stories.filter(story => {
      const matchesSearch = story.companyStartupName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           story.innovatorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           story.aboutStartup.toLowerCase().includes(searchTerm.toLowerCase());
      
      let matchesFilter = selectedFilter === 'all';
      if (!matchesFilter) {
        // Handle special category mappings
        if (selectedFilter === 'pink-zone') {
          matchesFilter = story.innovationCategory === 'Pink Zone';
        } else if (selectedFilter === 'campus-startups') {
          matchesFilter = story.innovationCategory === 'Campus Startups';
        } else if (selectedFilter === 'edtech') {
          matchesFilter = story.innovationCategory === 'EdTech';
        } else if (selectedFilter === 'fintech') {
          matchesFilter = story.innovationCategory === 'FinTech';
        } else if (selectedFilter === 'agritech') {
          matchesFilter = story.innovationCategory === 'AgriTech';
        } else if (selectedFilter === 'deeptech') {
          matchesFilter = story.innovationCategory === 'DeepTech';
        } else if (selectedFilter === 'waste-management') {
          matchesFilter = story.innovationCategory === 'Waste Management';
        } else {
          matchesFilter = story.innovationCategory === selectedFilter;
        }
      }
      
      return matchesSearch && matchesFilter;
    });
  };

  const categories = [
    { value: 'all', label: 'All Stories' },
    { value: 'EdTech', label: 'EdTech' },
    { value: 'FinTech', label: 'FinTech' },
    { value: 'AgriTech', label: 'AgriTech' },
    { value: 'DeepTech', label: 'DeepTech' },
    { value: 'Robotics', label: 'Robotics' },
    { value: 'Waste Management', label: 'Waste Management' },
    { value: 'pink-zone', label: 'Pink Zone' },
    { value: 'campus-startups', label: 'Campus Startups' },
    { value: 'Other', label: 'Other' }
  ];

  const filteredStories = getFilteredStories();

  const toggleLike = (storyId: string) => {
    const updateLike = async () => {
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
        
        // Update stories state with new like count
        setStories(prev => prev.map(story => 
          story.id === storyId 
            ? { ...story, likes: (story.likes || 0) + (isLiked ? -1 : 1) }
            : story
        ));
      } catch (error) {
        console.error('Error updating like:', error);
      }
    };
    
    updateLike();
  };

  const oldToggleLike = (storyId: string) => {
    setLikedStories(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(storyId)) {
        newLiked.delete(storyId);
      } else {
        newLiked.add(storyId);
      }
      return newLiked;
    });
  };

  const handleShare = (story: SuccessStory) => {
    // Transform story data to match ShareModal expectations
    const transformedStory = {
      ...story,
      company: story.companyStartupName,
      founder: story.innovatorName,
      description: story.aboutStartup,
      institute: story.studentAlumniOf,
      location: story.businessAddress?.split(',')[0] || 'Unknown',
      image: story.productServicePictures?.[0] || story.inventorPhoto,
      tags: story.innovationCategory ? [story.innovationCategory] : []
    };
    setSelectedStory(story);
    setShareModalOpen(true);
  };

  const handleViewDetails = (story: SuccessStory) => {
    setDetailViewStory(story);
    navigate(`/success-stories/${story.id}`, { replace: true });
  };

  const handleCloseDetailView = () => {
    setDetailViewStory(null);
    navigate('/success-stories', { replace: true });
  };

  const handleCardClick = (storyId: string) => {
    if (clickedStory === storyId) {
      setClickedStory(null);
      setExpandedStory(null);
    } else {
      setClickedStory(storyId);
      setExpandedStory(storyId);
    }
  };

  // If we're showing a detailed view, render the detail component
  if (detailViewStory) {
    return (
      <div className="pt-16 sm:pt-20 pb-12 sm:pb-16 bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-8">
            <button 
              onClick={handleCloseDetailView}
              className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-medium">Back to All Stories</span>
            </button>
          </div>

          {/* Story Header */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            {/* Hero Image */}
            {(detailViewStory.productServicePictures?.[0] || detailViewStory.inventorPhoto) && (
              <div className="relative h-64 sm:h-80">
                <img
                  src={detailViewStory.productServicePictures?.[0] || detailViewStory.inventorPhoto}
                  alt={detailViewStory.companyStartupName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <span className="bg-purple-600 px-3 py-1 rounded-full text-sm font-medium">
                    {detailViewStory.innovationCategory}
                  </span>
                </div>
              </div>
            )}

            {/* Story Content */}
            <div className="p-6 sm:p-8">
              {/* Header Info */}
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-8 space-y-6 lg:space-y-0">
                <div className="flex items-center space-x-6">
                  {/* Large Founder Image */}
                  {detailViewStory.inventorPhoto && (
                    <img
                      src={detailViewStory.inventorPhoto}
                      alt={detailViewStory.innovatorName}
                      className="w-24 h-24 lg:w-32 lg:h-32 rounded-full object-cover border-4 border-purple-200 shadow-lg"
                    />
                  )}
                  <div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                      {detailViewStory.companyStartupName}
                    </h1>
                    <p className="text-lg text-gray-600 mb-1">
                      Founded by <span className="font-semibold text-purple-600">{detailViewStory.innovatorName}</span>
                    </p>
                    <p className="text-gray-500 mb-2">
                      {detailViewStory.studentAlumniOf} • Class of {detailViewStory.yearOrBatch}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Founded {detailViewStory.yearOfInnovation}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{detailViewStory.businessAddress.split(',')[0]}</span>
                      </span>
                    </div>
                    {detailViewStory.editedBy && (
                      <p className="text-sm text-gray-500 mt-2 italic">
                        ✏️ Edited by: {detailViewStory.editedBy}
                      </p>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => toggleLike(detailViewStory.id)}
                    className="flex items-center space-x-2 bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-600 px-4 py-2 rounded-lg transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${likedStories.has(detailViewStory.id) ? 'fill-red-500 text-red-500' : ''}`} />
                    <span className="font-medium">{detailViewStory.likes || 0}</span>
                  </button>
                  <button
                    onClick={() => handleShare(detailViewStory)}
                    className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    <span className="font-medium">Share</span>
                  </button>
                </div>
              </div>

              {/* Story Description */}
              <div className="prose max-w-none mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">About the Startup</h2>
                <p className="text-gray-700 leading-relaxed text-lg mb-4">
                  {detailViewStory.aboutStartup}
                </p>
                
                {/* Product/Service Details */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Product/Service: {detailViewStory.productServiceName}</h3>
                  <p className="text-gray-700">Target Customer: {detailViewStory.customerSegment}</p>
                </div>
              </div>

              {/* Team Details */}
              {detailViewStory.teamDetails && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Team</h3>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-gray-700 leading-relaxed">{detailViewStory.teamDetails}</p>
                  </div>
                </div>
              )}

              {/* Funding Details */}
              {detailViewStory.fundRaisedDetails && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Funding Information</h3>
                  <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <Trophy className="w-5 h-5 text-yellow-600" />
                      <span className="font-semibold text-yellow-900">Funds Raised</span>
                    </div>
                    <p className="text-yellow-800 text-lg font-semibold">{detailViewStory.fundRaisedDetails}</p>
                  </div>
                </div>
              )}

              {/* Investment & Mentorship Status */}
              {(detailViewStory.lookingForInvestor || detailViewStory.mentorConnect) && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Current Opportunities</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {detailViewStory.lookingForInvestor && (
                      <div className="p-6 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center space-x-2 mb-3">
                          <span className="text-2xl">💰</span>
                          <h4 className="font-bold text-green-900 text-lg">Seeking Investment</h4>
                        </div>
                        {detailViewStory.investmentRange && (
                          <p className="text-green-700 font-semibold">Range: {detailViewStory.investmentRange}</p>
                        )}
                        <p className="text-green-600 text-sm mt-2">Open to discussing investment opportunities</p>
                      </div>
                    )}
                    {detailViewStory.mentorConnect && (
                      <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center space-x-2 mb-3">
                          <span className="text-2xl">🎯</span>
                          <h4 className="font-bold text-blue-900 text-lg">Seeking Mentorship</h4>
                        </div>
                        {detailViewStory.mentorDomainDetails && (
                          <p className="text-blue-700 font-semibold">Domain: {detailViewStory.mentorDomainDetails}</p>
                        )}
                        <p className="text-blue-600 text-sm mt-2">Looking for experienced mentors</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Product/Service Images Gallery */}
              {detailViewStory.productServicePictures && detailViewStory.productServicePictures.length > 1 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Product Gallery</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {detailViewStory.productServicePictures.slice(1).map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`${detailViewStory.productServiceName} ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg"></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Information */}
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Additional Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Academic Background</h4>
                    <p className="text-gray-700">{detailViewStory.studentAlumniOf}</p>
                    <p className="text-gray-600 text-sm">Batch: {detailViewStory.yearOrBatch}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Business Address</h4>
                    <p className="text-gray-700">{detailViewStory.businessAddress}</p>
                  </div>
                </div>
              </div>

              {/* Get in Touch */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Get in Touch</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {detailViewStory.mobile && (
                    <a
                      href={`tel:${detailViewStory.mobile}`}
                      className="flex flex-col items-center justify-center space-y-2 bg-green-600 hover:bg-green-700 text-white p-4 rounded-xl transition-all duration-200 font-medium hover:scale-105 shadow-lg"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                      </svg>
                      <span className="text-sm">Call</span>
                    </a>
                  )}
                  
                  {detailViewStory.email && (
                    <a
                      href={`mailto:${detailViewStory.email}`}
                      className="flex flex-col items-center justify-center space-y-2 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl transition-all duration-200 font-medium hover:scale-105 shadow-lg"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                      <span className="text-sm">Email</span>
                    </a>
                  )}
                  
                  {detailViewStory.webAddress && (
                    <a
                      href={detailViewStory.webAddress}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center space-y-2 bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-xl transition-all duration-200 font-medium hover:scale-105 shadow-lg"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
                      </svg>
                      <span className="text-sm">Website</span>
                    </a>
                  )}

                  {detailViewStory.linkedinProfile && (
                    <a
                      href={detailViewStory.linkedinProfile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center space-y-2 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-xl transition-all duration-200 font-medium hover:scale-105 shadow-lg"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      <span className="text-sm">LinkedIn</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <ShareModal
          isOpen={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
          story={selectedStory}
          type="story"
        />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="pt-16 sm:pt-20 pb-12 sm:pb-16 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="text-center py-20">
            <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading success stories...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 sm:pt-20 pb-12 sm:pb-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors mb-4"
            onClick={() => {
              const scrollPosition = sessionStorage.getItem('successStoriesScrollPosition');
              if (scrollPosition) {
                setTimeout(() => {
                  window.scrollTo({ top: parseInt(scrollPosition), behavior: 'smooth' });
                }, 100);
              }
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            All Success Stories
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            Discover inspiring journeys from Tamil Nadu's entrepreneurial ecosystem
          </p>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap gap-1 bg-gray-100 p-1 rounded-lg">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedFilter(category.value)}
                className={`px-3 py-2 rounded-lg font-medium text-xs sm:text-sm transition-colors whitespace-nowrap ${
                  selectedFilter === category.value
                    ? 'bg-white text-purple-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search stories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-600">
            Showing {filteredStories.length} of {stories.length} stories
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {filteredStories.map((story) => (
            <div 
              key={story.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Hero Image */}
              <div className="relative h-48">
                <img
                  src={story.productServicePictures[0] || 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600'}
                  alt={story.companyStartupName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                {/* Category Badge */}
                <div className="absolute top-3 right-3">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                    {story.innovationCategory}
                  </div>
                </div>
                
                {/* Founder Info Overlay */}
                <div className="absolute bottom-3 left-3 flex items-center space-x-2">
                  <img
                    src={story.inventorPhoto || `https://ui-avatars.com/api/?name=${encodeURIComponent(story.innovatorName)}&background=7c3aed&color=fff`}
                    alt={story.innovatorName}
                    className="w-8 h-8 rounded-full object-cover border-2 border-white"
                  />
                  <div className="text-white">
                    <h3 className="font-semibold text-sm">{story.innovatorName}</h3>
                    <p className="text-xs opacity-90">{story.yearOfInnovation}</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Company Name */}
                <h3 className="font-bold text-gray-900 text-lg mb-1 line-clamp-1">
                  {story.companyStartupName}
                </h3>
                
                {/* Institute & Location */}
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600 truncate flex-1">
                    {story.studentAlumniOf}
                  </p>
                  <div className="flex items-center text-xs text-gray-500 ml-2">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span>{story.businessAddress.split(',')[0]}</span>
                  </div>
                </div>
                
                {/* Description */}
                <p className="text-gray-700 text-sm leading-relaxed mb-3 line-clamp-2">
                  {story.aboutStartup}
                </p>
                
                {/* Key Details */}
                <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                  <div>
                    <span className="text-gray-500">Stage:</span>
                    <p className="font-medium text-gray-900 truncate">{story.currentStage}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Product:</span>
                    <p className="font-medium text-gray-900 truncate">{story.productServiceName}</p>
                  </div>
                </div>
                
                {/* Status Badges */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {story.lookingForInvestor && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      💰 Investment
                    </span>
                  )}
                  {story.mentorConnect && (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                      🎯 Mentor
                    </span>
                  )}
                </div>
                
                {/* Editor Info */}
                {story.editedBy && (
                  <p className="text-xs text-gray-500 mb-3 italic">
                    ✏️ Edited by: {story.editedBy}
                  </p>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(story.id);
                      }}
                      className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          likedStories.has(story.id) ? 'fill-red-500 text-red-500' : ''
                        }`}
                      />
                      <span className="text-xs font-medium">{story.likes || 0}</span>
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShare(story);
                      }}
                      className="text-gray-600 hover:text-purple-600 transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewDetails(story);
                    }}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1.5 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 text-xs font-medium"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredStories.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No stories found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        story={selectedStory}
        type="story"
      />
    </div>
  );
};

export default AllSuccessStories;