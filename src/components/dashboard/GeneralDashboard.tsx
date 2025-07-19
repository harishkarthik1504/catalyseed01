import React, { useState } from 'react';
import { 
  TrendingUp, Users, Calendar, MessageSquare, Plus, 
  Eye, Heart, Share2, Edit, BarChart3, Target, User
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const GeneralDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      title: 'Profile Views',
      value: '247',
      change: '+15% this week',
      icon: Eye,
      color: 'bg-blue-500'
    },
    {
      title: 'Forum Posts',
      value: '8',
      change: '2 this week',
      icon: MessageSquare,
      color: 'bg-green-500'
    },
    {
      title: 'Network Connections',
      value: '34',
      change: '+5 this month',
      icon: Users,
      color: 'bg-purple-500'
    },
    {
      title: 'Events Attended',
      value: '12',
      change: '3 upcoming',
      icon: Calendar,
      color: 'bg-orange-500'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'forum_post',
      message: 'Posted a question about startup funding',
      time: '2 hours ago',
      icon: MessageSquare
    },
    {
      id: 2,
      type: 'event_registration',
      message: 'Registered for Smart Cities Hackathon',
      time: '1 day ago',
      icon: Calendar
    },
    {
      id: 3,
      type: 'profile_update',
      message: 'Updated profile information',
      time: '3 days ago',
      icon: User
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
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
          <p className="text-gray-600 mt-1">Stay connected with Tamil Nadu's innovation ecosystem</p>
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

      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Explore the Innovation Ecosystem</h3>
            <p className="text-purple-100">Connect with startups, join events, and share your journey</p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors duration-200 flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Find Network</span>
            </button>
            <button className="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Browse Events</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Recent Activity' },
              { id: 'events', label: 'My Events' },
              { id: 'network', label: 'Network' },
              { id: 'recommendations', label: 'Recommendations' }
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
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              {recentActivity.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-purple-100">
                      <Icon className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 font-medium">{activity.message}</p>
                      <p className="text-gray-500 text-sm">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
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

          {activeTab === 'network' && (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Build Your Network</h3>
              <p className="text-gray-600 mb-4">Connect with entrepreneurs, investors, and innovators</p>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200">
                Discover People
              </button>
            </div>
          )}

          {activeTab === 'recommendations' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended for You</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">Join Smart Cities Hackathon</h4>
                  <p className="text-blue-700 text-sm">Based on your interests in technology and innovation</p>
                </div>
                <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-2">Connect with Local Startups</h4>
                  <p className="text-green-700 text-sm">Expand your network in the Tamil Nadu ecosystem</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeneralDashboard;