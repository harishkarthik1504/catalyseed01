import React, { useState } from 'react';
import { MessageSquare, Users, TrendingUp, Calendar, ChevronRight, Pin, Star, Plus, X, Send, Lightbulb, UserCheck, Briefcase, Target, ExternalLink, MapPin, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Community = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('trending');

  // Mock data for template display
  const trendingPosts = [
    {
      id: 1,
      title: 'Looking for technical co-founder for EdTech startup',
      author: 'Priya Sharma',
      avatar: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=100',
      category: 'Co-founder Search',
      content: 'I\'m building an AI-powered learning platform and need a technical co-founder with experience in machine learning...',
      likes: 23,
      replies: 8,
      timeAgo: '2 hours ago',
      tags: ['EdTech', 'Co-founder', 'AI']
    },
    {
      id: 2,
      title: 'Government funding schemes for startups in 2024',
      author: 'Rajesh Kumar',
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100',
      category: 'Funding',
      content: 'Here\'s a comprehensive list of government funding schemes available for startups in Tamil Nadu...',
      likes: 89,
      replies: 24,
      timeAgo: '3 hours ago',
      tags: ['Funding', 'Government', 'Startup']
    },
    {
      id: 3,
      title: 'Best practices for hiring in early-stage startups',
      author: 'Meera Nair',
      avatar: 'https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg?auto=compress&cs=tinysrgb&w=100',
      category: 'Hiring',
      content: 'Sharing my experience on building a strong team when resources are limited...',
      likes: 67,
      replies: 18,
      timeAgo: '5 hours ago',
      tags: ['Hiring', 'Team Building', 'Startup']
    }
  ];

  const categories = [
    { name: 'Startup Advice', count: 456, icon: Lightbulb, color: 'bg-blue-100 text-blue-800' },
    { name: 'Co-founder Search', count: 234, icon: UserCheck, color: 'bg-green-100 text-green-800' },
    { name: 'Funding', count: 189, icon: Briefcase, color: 'bg-purple-100 text-purple-800' },
    { name: 'Networking', count: 167, icon: Users, color: 'bg-orange-100 text-orange-800' }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Startup Networking Meetup',
      date: 'March 20, 2024',
      location: 'Chennai',
      attendees: 45
    },
    {
      id: 2,
      title: 'Investor Connect Session',
      date: 'March 25, 2024',
      location: 'Coimbatore',
      attendees: 32
    }
  ];

  return (
    <section id="community" className="py-12 sm:py-16 lg:py-20 bg-white relative">
      {/* Under Construction Overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] z-10 flex items-center justify-center">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-200 text-center max-w-md mx-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">🚧 Under Construction</h3>
          <p className="text-gray-600 mb-4">
            We're building an amazing community platform where entrepreneurs can connect, 
            share ideas, and collaborate. Stay tuned!
          </p>
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium text-sm">
            <span>Coming Soon</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 relative">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
            Community Forum
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Connect with fellow entrepreneurs, share knowledge, and build meaningful relationships
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Forum Content */}
          <div className="lg:col-span-2">
            {/* Forum Tabs */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: 'trending', label: 'Trending', icon: TrendingUp },
                    { id: 'recent', label: 'Recent', icon: Clock },
                    { id: 'popular', label: 'Popular', icon: Star }
                  ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 flex items-center space-x-2 ${
                          activeTab === tab.id
                            ? 'border-purple-500 text-purple-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="p-6">
                <div className="space-y-6">
                  {trendingPosts.map((post) => (
                    <div key={post.id} className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                      <div className="flex items-start space-x-4">
                        <img
                          src={post.avatar}
                          alt={post.author}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-bold text-gray-900">{post.author}</h4>
                            <span className="text-gray-500 text-sm">•</span>
                            <span className="text-gray-500 text-sm">{post.timeAgo}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              post.category === 'Co-founder Search' ? 'bg-green-100 text-green-800' :
                              post.category === 'Funding' ? 'bg-purple-100 text-purple-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {post.category}
                            </span>
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-2">{post.title}</h3>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.content}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-3">
                            {post.tags.map((tag, index) => (
                              <span key={index} className="bg-white text-gray-600 px-2 py-1 rounded-full text-xs border">
                                #{tag}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center space-x-6 text-sm text-gray-500">
                            <button className="flex items-center space-x-1 hover:text-red-500 transition-colors">
                              <Star className="w-4 h-4" />
                              <span>{post.likes}</span>
                            </button>
                            <button className="flex items-center space-x-1 hover:text-blue-500 transition-colors">
                              <MessageSquare className="w-4 h-4" />
                              <span>{post.replies}</span>
                            </button>
                            <button className="flex items-center space-x-1 hover:text-purple-500 transition-colors">
                              <ExternalLink className="w-4 h-4" />
                              <span>Share</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Categories */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Categories</h3>
              <div className="space-y-3">
                {categories.map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Icon className="w-4 h-4 text-gray-600" />
                        </div>
                        <span className="font-medium text-gray-900">{category.name}</span>
                      </div>
                      <span className="text-sm text-gray-500">{category.count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">{event.title}</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-3 h-3" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-3 h-3" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-3 h-3" />
                        <span>{event.attendees} attending</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Join Community CTA */}
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-bold mb-2">Join the Discussion</h3>
              <p className="text-purple-100 text-sm mb-4">
                Connect with 10,000+ entrepreneurs and innovators
              </p>
              <button className="w-full bg-white/20 backdrop-blur-sm text-white py-2 rounded-lg hover:bg-white/30 transition-colors font-medium flex items-center justify-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Start Discussion</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;