import React, { useState } from 'react';
import { 
  User, Mail, Lock, Bell, Shield, Eye, 
  Globe, Smartphone, Save, Camera
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const SettingsDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.profile?.bio || '',
    location: user?.profile?.location || '',
    website: user?.profile?.website || '',
    linkedin: user?.profile?.linkedin || '',
    twitter: user?.profile?.twitter || ''
  });

  const handleSave = () => {
    console.log('Saving settings:', profileData);
    // In a real app, this would save to the backend
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account preferences and privacy settings</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
            <nav className="space-y-2">
              {[
                { id: 'profile', label: 'Profile', icon: User },
                { id: 'account', label: 'Account', icon: Mail },
                { id: 'security', label: 'Security', icon: Lock },
                { id: 'notifications', label: 'Notifications', icon: Bell },
                { id: 'privacy', label: 'Privacy', icon: Shield },
                { id: 'appearance', label: 'Appearance', icon: Eye }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === item.id
                        ? 'bg-purple-50 text-purple-600 border border-purple-200'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium text-sm">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
                
                {/* Avatar Section */}
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || '')}&background=7c3aed&color=fff&size=128`}
                      alt={user?.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <button className="absolute bottom-0 right-0 bg-purple-600 text-white rounded-full p-2 hover:bg-purple-700 transition-colors">
                      <Camera className="w-3 h-3" />
                    </button>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{user?.name}</h3>
                    <p className="text-gray-600 text-sm">{user?.email}</p>
                    <button className="text-purple-600 hover:text-purple-700 text-sm font-medium mt-1">
                      Change Avatar
                    </button>
                  </div>
                </div>

                {/* Profile Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={profileData.location}
                      onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="City, State"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website
                    </label>
                    <input
                      type="url"
                      value={profileData.website}
                      onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <button
                  onClick={handleSave}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Security Settings</h2>
                
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Change Password</h3>
                    <p className="text-gray-600 text-sm mb-4">Update your password to keep your account secure</p>
                    <div className="space-y-3">
                      <input
                        type="password"
                        placeholder="Current password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <input
                        type="password"
                        placeholder="New password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      <input
                        type="password"
                        placeholder="Confirm new password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <button className="mt-3 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                      Update Password
                    </button>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Two-Factor Authentication</h3>
                    <p className="text-gray-600 text-sm mb-4">Add an extra layer of security to your account</p>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                      Enable 2FA
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Notification Preferences</h2>
                
                <div className="space-y-4">
                  {[
                    { label: 'Email notifications', description: 'Receive notifications via email' },
                    { label: 'Push notifications', description: 'Get browser push notifications' },
                    { label: 'Forum activity', description: 'Notifications for forum posts and comments' },
                    { label: 'Event reminders', description: 'Reminders for upcoming events' },
                    { label: 'Network updates', description: 'Updates from your network connections' },
                    { label: 'Marketing emails', description: 'Receive updates about new features and events' }
                  ].map((setting, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{setting.label}</h4>
                        <p className="text-gray-600 text-sm">{setting.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Privacy Settings</h2>
                
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Profile Visibility</h3>
                    <p className="text-gray-600 text-sm mb-4">Control who can see your profile information</p>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                      <option>Public - Anyone can see your profile</option>
                      <option>Network - Only your connections can see your profile</option>
                      <option>Private - Only you can see your profile</option>
                    </select>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Data Export</h3>
                    <p className="text-gray-600 text-sm mb-4">Download a copy of your data</p>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Request Data Export
                    </button>
                  </div>

                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <h3 className="font-semibold text-red-900 mb-2">Delete Account</h3>
                    <p className="text-red-700 text-sm mb-4">Permanently delete your account and all associated data</p>
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}

            {['account', 'appearance'].includes(activeTab) && (
              <div className="text-center py-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {activeTab === 'account' ? 'Account Settings' : 'Appearance Settings'}
                </h2>
                <p className="text-gray-600">This section is coming soon</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsDashboard;