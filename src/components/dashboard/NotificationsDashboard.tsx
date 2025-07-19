import React, { useState } from 'react';
import { 
  Bell, Check, X, MessageSquare, Calendar, 
  Users, Heart, Settings, Filter
} from 'lucide-react';

const NotificationsDashboard = () => {
  const [filter, setFilter] = useState('all');

  const notifications = [
    {
      id: 1,
      type: 'like',
      title: 'New like on your post',
      message: 'Priya Sharma liked your post about EdTech funding',
      time: '2 minutes ago',
      read: false,
      icon: Heart,
      color: 'text-red-500'
    },
    {
      id: 2,
      type: 'comment',
      title: 'New comment on your post',
      message: 'Rajesh Kumar commented on "Looking for technical co-founder"',
      time: '1 hour ago',
      read: false,
      icon: MessageSquare,
      color: 'text-blue-500'
    },
    {
      id: 3,
      type: 'event',
      title: 'Event reminder',
      message: 'Smart Cities Hackathon starts tomorrow',
      time: '3 hours ago',
      read: true,
      icon: Calendar,
      color: 'text-green-500'
    },
    {
      id: 4,
      type: 'connection',
      title: 'New connection request',
      message: 'Meera Nair wants to connect with you',
      time: '1 day ago',
      read: true,
      icon: Users,
      color: 'text-purple-500'
    },
    {
      id: 5,
      type: 'system',
      title: 'Profile verification complete',
      message: 'Your startup profile has been verified successfully',
      time: '2 days ago',
      read: true,
      icon: Check,
      color: 'text-green-500'
    }
  ];

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.read;
    if (filter === 'read') return notification.read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    // In a real app, this would update the notification status
    console.log('Mark as read:', id);
  };

  const markAllAsRead = () => {
    // In a real app, this would mark all notifications as read
    console.log('Mark all as read');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600 mt-1">
            Stay updated with your latest activities
            {unreadCount > 0 && (
              <span className="ml-2 bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                {unreadCount} unread
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={markAllAsRead}
            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            Mark All Read
          </button>
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center space-x-2">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'all', label: 'All', count: notifications.length },
              { id: 'unread', label: 'Unread', count: unreadCount },
              { id: 'read', label: 'Read', count: notifications.length - unreadCount }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 flex items-center space-x-2 ${
                  filter === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <span>{tab.label}</span>
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Notifications List */}
        <div className="divide-y divide-gray-100">
          {filteredNotifications.map((notification) => {
            const Icon = notification.icon;
            return (
              <div
                key={notification.id}
                className={`p-6 hover:bg-gray-50 transition-colors cursor-pointer ${
                  !notification.read ? 'bg-blue-50/50' : ''
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    !notification.read ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    <Icon className={`w-5 h-5 ${notification.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className={`font-semibold ${
                          !notification.read ? 'text-gray-900' : 'text-gray-700'
                        }`}>
                          {notification.title}
                        </h4>
                        <p className="text-gray-600 text-sm mt-1">
                          {notification.message}
                        </p>
                        <p className="text-gray-500 text-xs mt-2">
                          {notification.time}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="text-blue-600 hover:text-blue-700 transition-colors"
                            title="Mark as read"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                          title="Dismiss"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredNotifications.length === 0 && (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {filter === 'unread' ? 'No unread notifications' : 'No notifications'}
            </h3>
            <p className="text-gray-600">
              {filter === 'unread' 
                ? 'You\'re all caught up!' 
                : 'New notifications will appear here'
              }
            </p>
          </div>
        )}
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          {[
            { label: 'Email notifications', description: 'Receive notifications via email' },
            { label: 'Push notifications', description: 'Get browser push notifications' },
            { label: 'Forum activity', description: 'Notifications for forum posts and comments' },
            { label: 'Event reminders', description: 'Reminders for upcoming events' },
            { label: 'Network updates', description: 'Updates from your network connections' }
          ].map((setting, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
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
    </div>
  );
};

export default NotificationsDashboard;