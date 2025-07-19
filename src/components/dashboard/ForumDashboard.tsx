import React, { useState } from 'react';
import { 
  MessageSquare, Plus, Search, Filter, Heart, 
  Reply, Share2, Clock, TrendingUp, Users
} from 'lucide-react';

const ForumDashboard = () => {
  const [activeTab, setActiveTab] = useState('my-posts');
  const [searchTerm, setSearchTerm] = useState('');

  const myPosts = [
    {
      id: 1,
      title: 'Looking for technical co-founder for EdTech startup',
      content: 'I\'m building an AI-powered learning platform and need a technical co-founder...',
      category: 'Co-founder Search',
      likes: 23,
      replies: 8,
      views: 156,
      status: 'published',
      createdAt: '2 days ago'
    },
    {
      id: 2,
      title: 'How to validate product-market fit in rural markets?',
      content: 'Has anyone here successfully validated their product in rural Tamil Nadu?',
      category: 'Startup Advice',
      likes: 45,
      replies: 12,
      views: 234,
      status: 'published',
      createdAt: '1 week ago'
    }
  ];

  const trendingPosts = [
    {
      id: 1,
      title: 'Government funding schemes for startups in 2024',
      author: 'Priya Sharma',
      category: 'Funding',
      likes: 89,
      replies: 24,
      timeAgo: '3 hours ago'
    },
    {
      id: 2,
      title: 'Best practices for hiring in early-stage startups',
      author: 'Rajesh Kumar',
      category: 'Hiring',
      likes: 67,
      replies: 18,
      timeAgo: '5 hours ago'
    },
    {
      id: 3,
      title: 'Building a sustainable business model for AgriTech',
      author: 'Meera Nair',
      category: 'Business Strategy',
      likes: 54,
      replies: 15,
      timeAgo: '1 day ago'
    }
  ];

  const categories = [
    { name: 'Startup Advice', count: 456, color: 'bg-blue-100 text-blue-800' },
    { name: 'Co-founder Search', count: 234, color: 'bg-green-100 text-green-800' },
    { name: 'Funding', count: 189, color: 'bg-purple-100 text-purple-800' },
    { name: 'Marketing', count: 167, color: 'bg-orange-100 text-orange-800' },
    { name: 'Technical', count: 145, color: 'bg-pink-100 text-pink-800' },
    { name: 'Legal', count: 123, color: 'bg-indigo-100 text-indigo-800' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Forum</h1>
          <p className="text-gray-600 mt-1">Connect with the community and share knowledge</p>
        </div>
        <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>New Post</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search discussions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'my-posts', label: 'My Posts' },
                  { id: 'trending', label: 'Trending' },
                  { id: 'recent', label: 'Recent' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'border-purple-500 text-purple-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'my-posts' && (
                <div className="space-y-4">
                  {myPosts.map((post) => (
                    <div key={post.id} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{post.title}</h4>
                          <p className="text-gray-600 text-sm mb-2 line-clamp-2">{post.content}</p>
                          <span className="inline-block bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
                            {post.category}
                          </span>
                        </div>
                        <span className={`ml-4 px-2 py-1 rounded-full text-xs font-medium ${
                          post.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {post.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center space-x-1">
                            <Heart className="w-4 h-4" />
                            <span>{post.likes}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Reply className="w-4 h-4" />
                            <span>{post.replies}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{post.views}</span>
                          </span>
                        </div>
                        <span>{post.createdAt}</span>
                      </div>
                    </div>
                  ))}
                  {myPosts.length === 0 && (
                    <div className="text-center py-8">
                      <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No posts yet</h3>
                      <p className="text-gray-600 mb-4">Start a discussion with the community</p>
                      <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                        Create Your First Post
                      </button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'trending' && (
                <div className="space-y-4">
                  {trendingPosts.map((post) => (
                    <div key={post.id} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <TrendingUp className="w-4 h-4 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{post.title}</h4>
                          <p className="text-gray-600 text-sm mb-2">by {post.author}</p>
                          <div className="flex items-center justify-between">
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                              {post.category}
                            </span>
                            <div className="flex items-center space-x-3 text-sm text-gray-500">
                              <span className="flex items-center space-x-1">
                                <Heart className="w-3 h-3" />
                                <span>{post.likes}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Reply className="w-3 h-3" />
                                <span>{post.replies}</span>
                              </span>
                              <span>{post.timeAgo}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'recent' && (
                <div className="text-center py-8">
                  <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Recent Discussions</h3>
                  <p className="text-gray-600">Latest posts from the community will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Categories */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
            <div className="space-y-3">
              {categories.map((category, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${category.color}`}>
                    {category.name}
                  </span>
                  <span className="text-sm text-gray-500">{category.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
            <h3 className="text-lg font-bold mb-2">Join the Discussion</h3>
            <p className="text-purple-100 text-sm mb-4">
              Share your knowledge and connect with fellow entrepreneurs
            </p>
            <button className="w-full bg-white/20 backdrop-blur-sm text-white py-2 rounded-lg hover:bg-white/30 transition-colors font-medium">
              Start a Discussion
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumDashboard;