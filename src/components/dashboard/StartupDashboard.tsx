import React, { useState } from 'react';
import { 
  TrendingUp, Users, Calendar, MessageSquare, Plus, 
  Eye, Heart, Share2, Edit, BarChart3, Target, Rocket
} from 'lucide-react';

const StartupDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      title: 'Monthly Views',
      value: '1,247',
      change: '+23% this week',
      icon: Eye,
      color: 'bg-blue-500'
    },
    {
      title: 'Engagement',
      value: '456',
      change: '+12% this week',
      icon: Heart,
      color: 'bg-red-500'
    },
    {
      title: 'Community Posts',
      value: '12',
      change: '3 this week',
      icon: MessageSquare,
      color: 'bg-green-500'
    },
    {
      title: 'Events Joined',
      value: '8',
      change: '2 upcoming',
      icon: Calendar,
      color: 'bg-purple-500'
    }
  ];

  const myPosts = [
    {
      id: 1,
      title: 'Seeking technical co-founder for AI-powered EdTech platform',
      category: 'Co-founder Search',
      likes: 34,
      replies: 12,
      views: 189,
      status: 'published',
      createdAt: '2 days ago'
    },
    {
      id: 2,
      title: 'Best practices for validating product-market fit in Tier-2 cities',
      category: 'Startup Advice',
      likes: 67,
      replies: 18,
      views: 298,
      status: 'published',
      createdAt: '1 week ago'
    },
    {
      id: 3,
      title: 'Fundraising journey: Lessons from our seed round',
      category: 'Funding',
      likes: 89,
      replies: 24,
      views: 456,
      status: 'published',
      createdAt: '2 weeks ago'
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Smart Cities Hackathon 2024',
      date: 'March 15-17, 2024',
      location: 'Chennai',
      status: 'registered'
    },
    {
      id: 2,
      title: 'EdTech Innovation Summit',
      date: 'April 22-24, 2024',
      location: 'Coimbatore',
      status: 'interested'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Startup Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage your startup presence and connect with the ecosystem</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2">
            <Edit className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Create Post</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center space-x-1 text-sm font-medium text-green-600">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.title}</p>
              <p className="text-green-600 text-xs mt-1">{stat.change}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Ready to showcase your startup?</h3>
            <p className="text-purple-100">Share your success story and connect with investors</p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors duration-200 flex items-center space-x-2">
              <Rocket className="w-4 h-4" />
              <span>Share Story</span>
            </button>
            <button className="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2">
              <Target className="w-4 h-4" />
              <span>Find Investors</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'posts', label: 'My Posts' },
              { id: 'events', label: 'Events' },
              { id: 'analytics', label: 'Analytics' }
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
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-900">Your post received 5 new likes</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-900">New reply on your forum post</p>
                    <p className="text-xs text-gray-500">4 hours ago</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-900">Profile viewed by 12 investors</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-900 font-medium">Complete your startup profile</p>
                    <p className="text-xs text-blue-700">Add funding stage and team details</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm text-green-900 font-medium">Join upcoming hackathons</p>
                    <p className="text-xs text-green-700">3 relevant events this month</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'posts' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">My Forum Posts</h3>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>New Post</span>
                </button>
              </div>
              <div className="space-y-4">
                {myPosts.map((post) => (
                  <div key={post.id} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{post.title}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                            {post.category}
                          </span>
                          <span>{post.createdAt}</span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center space-x-1">
                            <Heart className="w-4 h-4" />
                            <span>{post.likes}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <MessageSquare className="w-4 h-4" />
                            <span>{post.replies}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{post.views}</span>
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-gray-400 hover:text-gray-600">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {myPosts.length === 0 && (
                  <div className="text-center py-8">
                    <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No posts yet</h3>
                    <p className="text-gray-600 mb-4">Share your startup journey with the community</p>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200">
                      Create Your First Post
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'events' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">My Events</h3>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">{event.title}</h4>
                        <p className="text-gray-600 text-sm">{event.date} • {event.location}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        event.status === 'registered' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {event.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-gray-50 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-4">Engagement Metrics</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Profile Views</span>
                    <span className="font-semibold">1,247</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Post Engagement</span>
                    <span className="font-semibold">8.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Investor Interest</span>
                    <span className="font-semibold">23</span>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-4">Growth Metrics</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Followers</span>
                    <span className="font-semibold text-green-600">+15%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Network Connections</span>
                    <span className="font-semibold text-green-600">+28%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Event Participation</span>
                    <span className="font-semibold text-green-600">+12%</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StartupDashboard;