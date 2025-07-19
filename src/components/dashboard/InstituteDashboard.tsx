import React, { useState } from 'react';
import { 
  TrendingUp, Users, Calendar, Award, Plus, 
  Eye, BookOpen, Lightbulb, GraduationCap, Building
} from 'lucide-react';

const InstituteDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      title: 'Active Startups',
      value: '45',
      change: '+8 this semester',
      icon: Lightbulb,
      color: 'bg-blue-500'
    },
    {
      title: 'Events This Year',
      value: '12',
      change: '3 this month',
      icon: Calendar,
      color: 'bg-green-500'
    },
    {
      title: 'Research Projects',
      value: '89',
      change: '+15 active',
      icon: BookOpen,
      color: 'bg-purple-500'
    },
    {
      title: 'Industry Partners',
      value: '23',
      change: '5 new this year',
      icon: Building,
      color: 'bg-orange-500'
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'AI Innovation Challenge 2024',
      date: 'March 15-17, 2024',
      participants: 300,
      status: 'published',
      registrations: 156
    },
    {
      id: 2,
      title: 'Startup Pitch Competition',
      date: 'April 10, 2024',
      participants: 200,
      status: 'pending',
      registrations: 0
    },
    {
      id: 3,
      title: 'Industry Connect Summit',
      date: 'May 5-6, 2024',
      participants: 400,
      status: 'draft',
      registrations: 0
    }
  ];

  const studentStartups = [
    {
      id: 1,
      name: 'SmartLearn AI',
      founder: 'Arjun Sharma',
      department: 'Computer Science',
      stage: 'Seed',
      description: 'Personalized AI tutoring platform',
      year: '2024'
    },
    {
      id: 2,
      name: 'EcoFarm Solutions',
      founder: 'Priya Nair',
      department: 'Mechanical Engineering',
      stage: 'Pre-Seed',
      description: 'Sustainable farming technology',
      year: '2024'
    },
    {
      id: 3,
      name: 'HealthTech Innovations',
      founder: 'Karthik Reddy',
      department: 'Biomedical Engineering',
      stage: 'Idea',
      description: 'Wearable health monitoring devices',
      year: '2024'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Institute Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage innovation activities and showcase institutional excellence</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2">
            <Eye className="w-4 h-4" />
            <span>View Profile</span>
          </button>
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Create Event</span>
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

      {/* Innovation Highlights */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Innovation Excellence</h3>
            <p className="text-blue-100">Fostering entrepreneurship and innovation since 1959</p>
            <p className="text-blue-100 text-sm mt-1">10,000+ students • 50+ research areas • 200+ faculty</p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors duration-200 flex items-center space-x-2">
              <Award className="w-4 h-4" />
              <span>Achievements</span>
            </button>
            <button className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2">
              <GraduationCap className="w-4 h-4" />
              <span>Programs</span>
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
              { id: 'events', label: 'Events' },
              { id: 'startups', label: 'Student Startups' },
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
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-900">New startup registered: EduTech Solutions</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-900">Smart Cities Hackathon approved</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-900">15 new innovation projects submitted</p>
                    <p className="text-xs text-gray-500">3 days ago</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full p-3 bg-purple-50 border border-purple-200 rounded-lg text-left hover:bg-purple-100 transition-colors">
                    <p className="text-sm text-purple-900 font-medium">Create New Event</p>
                    <p className="text-xs text-purple-700">Host hackathons, workshops, or seminars</p>
                  </button>
                  <button className="w-full p-3 bg-blue-50 border border-blue-200 rounded-lg text-left hover:bg-blue-100 transition-colors">
                    <p className="text-sm text-blue-900 font-medium">Register Student Startup</p>
                    <p className="text-xs text-blue-700">Add new student ventures to showcase</p>
                  </button>
                  <button className="w-full p-3 bg-green-50 border border-green-200 rounded-lg text-left hover:bg-green-100 transition-colors">
                    <p className="text-sm text-green-900 font-medium">Update Institute Profile</p>
                    <p className="text-xs text-green-700">Enhance visibility and attract partnerships</p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'events' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Institute Events</h3>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Create Event</span>
                </button>
              </div>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{event.title}</h4>
                        <p className="text-gray-600 text-sm">{event.date}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <span>Max: {event.participants} participants</span>
                          <span>Registered: {event.registrations}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          event.status === 'published' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {event.status}
                        </span>
                        <button className="text-purple-600 hover:text-purple-700 font-medium text-sm">
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'startups' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Student Startups</h3>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Add Startup</span>
                </button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {studentStartups.map((startup) => (
                  <div key={startup.id} className="p-6 bg-gray-50 rounded-xl">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-bold text-gray-900">{startup.name}</h4>
                        <p className="text-gray-600 text-sm">{startup.description}</p>
                      </div>
                      <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
                        {startup.stage}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Founder:</span>
                        <span className="font-medium">{startup.founder}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Department:</span>
                        <span className="font-medium">{startup.department}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Year:</span>
                        <span className="font-medium">{startup.year}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <button className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-200 text-sm font-medium">
                        View Details
                      </button>
                      <button className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm font-medium">
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
                {studentStartups.length === 0 && (
                  <div className="col-span-2 text-center py-8">
                    <Lightbulb className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No student startups yet</h3>
                    <p className="text-gray-600 mb-4">Encourage students to register their innovative ventures</p>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200">
                      Add First Startup
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-gray-50 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-4">Innovation Metrics</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active Startups</span>
                    <span className="font-semibold">45</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Research Projects</span>
                    <span className="font-semibold">89</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Patents Filed</span>
                    <span className="font-semibold">23</span>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-4">Event Performance</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Events Hosted</span>
                    <span className="font-semibold">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Participants</span>
                    <span className="font-semibold">2,847</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Success Rate</span>
                    <span className="font-semibold text-green-600">94%</span>
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

export default InstituteDashboard;