import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Heart, Share2, MapPin, Calendar, ArrowRight, Trophy } from 'lucide-react';
import { collection, getDocs, query, doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../config/firebase';
import { SuccessStory } from '../types/auth';
import ShareModal from './ShareModal';

const SuccessStories = () => {
  const navigate = useNavigate();
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedStory, setExpandedStory] = useState<string | null>(null);
  const [clickedStory, setClickedStory] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [likedStories, setLikedStories] = useState<Set<string>>(new Set());
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<SuccessStory | null>(null);

  React.useEffect(() => {
    fetchSuccessStories();
  }, []);

  const fetchSuccessStories = async () => {
    try {
      setLoading(true);
      console.log('Fetching success stories from Firebase...');
      
      // Simplified query to avoid composite index requirement
      const q = query(collection(db, 'successStories'));
      
      const querySnapshot = await getDocs(q);
      console.log('Query snapshot size:', querySnapshot.size);
      
      const storiesData: SuccessStory[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        // Filter for published stories on client side
        if (data.status === 'published') {
          console.log('Story data:', data);
          storiesData.push({ 
            id: doc.id, 
            ...data,
            createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString()
          } as SuccessStory);
        }
      });
      
      // Sort by createdAt on client side
      storiesData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      
      console.log('Fetched stories:', storiesData);
      setStories(storiesData);
    } catch (error) {
      console.error('Error fetching success stories:', error);
    } finally {
      setLoading(false);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleViewMore = () => {
    sessionStorage.setItem('successStoriesScrollPosition', window.pageYOffset.toString());
  };

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

  const handleShare = (story: SuccessStory, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
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

  const handleViewDetails = (story: SuccessStory, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    navigate(`/success-stories/${story.id}`);
  };

  const handleLike = (storyId: string, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    toggleLike(storyId);
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

  const handleCardClick = (storyId: string) => {
    if (clickedStory === storyId) {
      setClickedStory(null);
      setExpandedStory(null);
    } else {
      setClickedStory(storyId);
      setExpandedStory(storyId);
    }
  };

  if (loading) {
    return (
      <section id="success-stories" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading success stories...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="success-stories" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4 group">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Success Stories</h2>
              <p className="text-gray-600 mt-1">Inspiring journeys of entrepreneurs who transformed ideas into impactful startups</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link 
              to="/success-stories"
              onClick={handleViewMore}
              className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200 group"
            >
              <span>View More</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 hover:border-purple-300"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>

          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 hover:border-purple-300"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>

          <div
            ref={scrollRef}
            className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4 mx-12"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {stories.map((story) => (
              <div
                key={story.id}
                className="flex-shrink-0 w-80 group cursor-pointer"
                onClick={() => handleViewDetails(story)}
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-[520px] flex flex-col">
                  {/* Hero Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={story.productServicePictures[0] || 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600'}
                      alt={story.companyStartupName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 right-3">
                      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {story.innovationCategory}
                      </div>
                    </div>
                    
                    {/* Founder Info Overlay */}
                    <div className="absolute bottom-3 left-3 flex items-center space-x-3">
                      <img
                        src={story.inventorPhoto || `https://ui-avatars.com/api/?name=${encodeURIComponent(story.innovatorName)}&background=7c3aed&color=fff`}
                        alt={story.innovatorName}
                        className="w-10 h-10 rounded-full object-cover border-2 border-white"
                      />
                      <div className="text-white">
                        <h3 className="font-semibold text-sm">{story.innovatorName}</h3>
                        <p className="text-xs opacity-90">{story.yearOfInnovation}</p>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 flex-1 flex flex-col">
                    {/* Company Name */}
                    <h3 className="font-bold text-gray-900 text-lg mb-1 line-clamp-1">
                      {story.companyStartupName}
                    </h3>
                    
                    {/* Institute & Location */}
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm text-gray-600 truncate flex-1">
                        {story.studentAlumniOf}
                      </p>
                      <div className="flex items-center text-xs text-gray-500 ml-2">
                        <MapPin className="w-3 h-3 mr-1" />
                        <span>{story.businessAddress.split(',')[0]}</span>
                      </div>
                    </div>
                    
                    {/* Description */}
                    <p className="text-gray-700 text-sm leading-relaxed mb-3 line-clamp-3 flex-1">
                      {story.aboutStartup}
                    </p>
                    
                    {/* Key Details Grid */}
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
                          💰 Seeking Investment
                        </span>
                      )}
                      {story.mentorConnect && (
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                          🎯 Seeking Mentor
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
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={(e) => handleLike(story.id, e)}
                          className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors"
                        >
                          <Heart 
                            className={`w-4 h-4 transition-all duration-200 ${
                              likedStories.has(story.id) 
                                ? 'fill-red-500 text-red-500 scale-110'
                                : ''
                            }`}
                          />
                          <span className="text-xs font-medium">{story.likes || 0}</span>
                        </button>
                        <button 
                          onClick={(e) => handleShare(story, e)}
                          className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition-colors"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {stories.length === 0 && !loading && (
              <div className="flex-shrink-0 w-80 h-[520px] flex items-center justify-center">
                <div className="text-center p-8">
                  <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">No Success Stories Yet</h3>
                  <p className="text-gray-600">Success stories will appear here once published by admins.</p>
                </div>
              </div>
            )}

            {stories.length > 0 && (
              <div className="flex-shrink-0 w-80 h-[520px] group cursor-pointer">
                <Link
                  to="/success-stories"
                  onClick={handleViewMore}
                  className="block h-full"
                >
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl h-full flex items-center justify-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-dashed border-gray-300 hover:border-purple-400 relative overflow-hidden">
                    <div className="text-center p-8">
                      <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mx-auto mb-4 w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                        <ArrowRight className="w-8 h-8 text-white transform transition-transform duration-500 ease-out group-hover:translate-x-8" />
                        <ArrowRight className="w-8 h-8 text-white absolute transform -translate-x-8 transition-transform duration-500 ease-out group-hover:translate-x-0" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">View More</h3>
                      <p className="text-gray-600">Discover more inspiring journeys</p>
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        story={selectedStory}
        type="story"
      />
    </section>
  );
};

export default SuccessStories;