import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, Calendar, TrendingUp, Shield, UserCheck, ArrowLeft,
  Clock, AlertCircle, BarChart3, Activity, Eye, CheckCircle, XCircle, Settings, Plus, Edit, Trash2, Trophy
} from 'lucide-react';
import { collection, getDocs, query, where, orderBy, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { SuccessStory } from '../../types/auth';
import SuccessStoryForm from './SuccessStoryForm';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showSuccessStoryForm, setShowSuccessStoryForm] = useState(false);
  const [publishedStories, setPublishedStories] = useState<SuccessStory[]>([]);
  const [storiesLoading, setStoriesLoading] = useState(false);
  const [editingStory, setEditingStory] = useState<SuccessStory | null>(null);

  React.useEffect(() => {
    if (activeTab === 'stories') {
      fetchPublishedStories();
    }
  }, [activeTab]);

  const fetchPublishedStories = async () => {
    try {
      setStoriesLoading(true);
      console.log('Admin fetching published stories...');
      
      // Fetch all stories and filter/sort on client side to avoid composite index requirement
      const q = collection(db, 'successStories');
      
      const querySnapshot = await getDocs(q);
      console.log('Admin stories query snapshot size:', querySnapshot.size);
      
      const storiesData: SuccessStory[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log('Admin story data:', data);
        // Only include published stories
        if (data.status === 'published') {
          storiesData.push({ 
            id: doc.id, 
            ...data,
            createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString()
          } as SuccessStory);
        }
      });
      
      // Sort by createdAt descending on client side
      storiesData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      
      console.log('Admin fetched stories:', storiesData);
      setPublishedStories(storiesData);
    } catch (error) {
      console.error('Error fetching published stories:', error);
    } finally {
      setStoriesLoading(false);
    }
  };

  const handleEditStory = (story: SuccessStory) => {
    // Close form first if it's open to ensure clean state
    if (showSuccessStoryForm) {
      setShowSuccessStoryForm(false);
      setTimeout(() => {
        setEditingStory(story);
        setShowSuccessStoryForm(true);
      }, 100);
    } else {
      setEditingStory(story);
      setShowSuccessStoryForm(true);
    }
  };

  const handleAddNewStory = () => {
    // Ensure we're in add mode
    setEditingStory(null);
    setShowSuccessStoryForm(true);
  };

  const handleDeleteStory = async (storyId: string) => {
    if (window.confirm('Are you sure you want to delete this success story?')) {
      try {
        await deleteDoc(doc(db, 'successStories', storyId));
        fetchPublishedStories(); // Refresh the list
      } catch (error) {
        console.error('Error deleting story:', error);
      }
    }
  };

  const handleFormClose = () => {
    setShowSuccessStoryForm(false);
    setEditingStory(null);
    if (activeTab === 'stories') {
      fetchPublishedStories(); // Refresh stories if we're on the stories tab
    }
  };

  const stats = [
    {
      title: 'Platform Users',
      value: '2,847',
      change: '+12% this month',
      icon: Users,
      color: 'bg-blue-500',
      trend: 'up'
    },
    {
      title: 'Pending Reviews',
      value: '23',
      change: '3 new today',
      icon: Clock,
      color: 'bg-yellow-500',
      trend: 'up'
    },
    {
      title: 'Active Events',
      value: '156',
      change: '+8% growth',
      icon: Calendar,
      color: 'bg-green-500',
      trend: 'up'
    },
    {
      title: 'Monthly Revenue',
      value: '₹12.5L',
      change: '+18% growth',
      icon: Shield,
      color: 'bg-purple-500',
      trend: 'up'
    }
  ];

  const pendingUsers = [
    {
      id: '1',
      name: 'NextGen AI Solutions',
      email: 'contact@nextgenai.com',
      role: 'startup',
      company: 'NextGen AI Solutions',
      submittedAt: '2 hours ago'
    },
    {
      id: '2',
      name: 'SRM Institute',
      email: 'innovation@srm.edu',
      role: 'institute',
      company: 'SRM Institute of Science & Technology',
      submittedAt: '5 hours ago'
    },
    {
      id: '3',
      name: 'Tamil Nadu Ventures',
      email: 'invest@tnventures.com',
      role: 'investor',
      company: 'Tamil Nadu Ventures',
      submittedAt: '1 day ago'
    },
    {
      id: '4',
      name: 'EcoTech Innovations',
      email: 'hello@ecotech.in',
      role: 'startup',
      company: 'EcoTech Innovations',
      submittedAt: '2 days ago'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'user_verification',
      message: 'Verified TechStart Innovations as premium startup',
      time: '2 hours ago',
      status: 'completed',
      icon: UserCheck
    },
    {
      id: 2,
      type: 'system_update',
      message: 'Platform security update deployed successfully',
      time: '4 hours ago',
      status: 'completed',
      icon: Shield
    },
    {
      id: 3,
      type: 'event_approval',
      message: 'Approved Smart Cities Hackathon 2024 for publication',
      time: '6 hours ago',
      status: 'completed',
      icon: Calendar
    },
    {
      id: 4,
      type: 'policy_update',
      message: 'Updated platform community guidelines',
      time: '1 day ago',
      status: 'completed',
      icon: Settings
    }
  ];

  const handleUserAction = (userId: string, action: 'approve' | 'reject') => {
    console.log(`Admin ${action} user ${userId}`);
    // In real app, this would make API call
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Platform Administration</h1>
          <p className="text-gray-600 mt-1">Monitor and manage the entire Catalyseed ecosystem</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            System Reports
          </button>
          <button 
            onClick={handleAddNewStory}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Success Story</span>
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
                  <span>Healthy</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.title}</p>
              <p className="text-green-600 text-xs mt-1">{stat.change}</p>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'System Activities' },
              { id: 'stories', label: 'Published Stories' },
              { id: 'users', label: 'User Verification Queue' },
              { id: 'events', label: 'Platform Events' },
              { id: 'analytics', label: 'Advanced Analytics' }
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
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent System Activities</h3>
              {recentActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-green-100">
                      <Icon className="w-5 h-5 text-green-600" />
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

          {activeTab === 'stories' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Published Success Stories</h3>
                <button 
                  onClick={handleAddNewStory}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Story</span>
                </button>
              </div>
              
              {storiesLoading ? (
                <div className="text-center py-8">
                  <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-gray-600">Loading stories...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {publishedStories.map((story) => (
                    <div key={story.id} className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            {story.inventorPhoto && (
                              <img
                                src={story.inventorPhoto}
                                alt={story.innovatorName}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                            )}
                            <div>
                              <h4 className="font-semibold text-gray-900">{story.companyStartupName}</h4>
                              <p className="text-gray-600 text-sm">by {story.innovatorName}</p>
                            </div>
                          </div>
                          <p className="text-gray-700 text-sm mb-2 line-clamp-2">{story.aboutStartup}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                              {story.innovationCategory}
                            </span>
                            {story.editedBy && (
                              <span>✏️ {story.editedBy}</span>
                            )}
                            <span>📍 {story.businessAddress.split(',')[0]}</span>
                            <span>🏢 {story.studentAlumniOf}</span>
                            <span>📅 {story.yearOfInnovation}</span>
                            {story.mobile && (
                              <span>📞 {story.mobile}</span>
                            )}
                            {story.lookingForInvestor && (
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                💰 Seeking Investment
                              </span>
                            )}
                            {story.mentorConnect && (
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                🎯 Seeking Mentor
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <button
                            onClick={() => handleEditStory(story)}
                            className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-1"
                          >
                            <Edit className="w-4 h-4" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteStory(story.id)}
                            className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center space-x-1"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {publishedStories.length === 0 && (
                    <div className="text-center py-8">
                      <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No success stories yet</h3>
                      <p className="text-gray-600 mb-4">Start by adding your first success story</p>
                      <button 
                        onClick={handleAddNewStory}
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200"
                      >
                        Add First Story
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending User Verifications</h3>
              <div className="space-y-4">
                {pendingUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                        <Users className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{user.name}</h4>
                        <p className="text-gray-600 text-sm">{user.email} • {user.role}</p>
                        <p className="text-gray-500 text-xs">Submitted {user.submittedAt}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleUserAction(user.id, 'approve')}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Verify</span>
                      </button>
                      <button
                        onClick={() => handleUserAction(user.id, 'reject')}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center space-x-2"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Reject</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'events' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Event Management</h3>
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Event management interface coming soon</p>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-gray-50 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-4">Platform Health Metrics</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Server Uptime</span>
                    <span className="font-semibold text-green-600">99.9%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active Sessions</span>
                    <span className="font-semibold">2,847</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">API Response Time</span>
                    <span className="font-semibold text-green-600">120ms</span>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-4">Security Metrics</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Security Score</span>
                    <span className="font-semibold text-green-600">A+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Failed Login Attempts</span>
                    <span className="font-semibold text-green-600">0.02%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Data Encryption</span>
                    <span className="font-semibold text-green-600">256-bit</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Success Story Form Modal */}
      <SuccessStoryForm 
        isOpen={showSuccessStoryForm}
        onClose={handleFormClose}
        editingStory={editingStory}
      />
    </div>
  );
};

export default AdminDashboard;