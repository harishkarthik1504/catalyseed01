import React, { useState } from 'react';
import { 
  TrendingUp, Users, Target, MessageSquare, Plus, 
  Eye, Star, Filter, Search, DollarSign, Briefcase
} from 'lucide-react';

const InvestorDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      title: 'Deals Reviewed',
      value: '156',
      change: '+12 this week',
      icon: Eye,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Deals',
      value: '23',
      change: '5 new matches',
      icon: Target,
      color: 'bg-green-500'
    },
    {
      title: 'Portfolio Size',
      value: '8',
      change: '2 recent investments',
      icon: Briefcase,
      color: 'bg-purple-500'
    },
    {
      title: 'Network Size',
      value: '342',
      change: '+18 this month',
      icon: Users,
      color: 'bg-orange-500'
    }
  ];

  const startupOpportunities = [
    {
      id: 1,
      name: 'NextGen AI Solutions',
      sector: 'EdTech',
      stage: 'Seed',
      seeking: '₹3 Cr',
      location: 'Chennai',
      match: 92,
      description: 'AI-powered personalized learning platform for K-12 education',
      founded: '2023'
    },
    {
      id: 2,
      name: 'FarmTech Innovations',
      sector: 'AgriTech',
      stage: 'Pre-Seed',
      seeking: '₹2 Cr',
      location: 'Coimbatore',
      match: 85,
      description: 'IoT-based precision farming solutions for small farmers',
      founded: '2024'
    },
    {
      id: 3,
      name: 'MedConnect',
      sector: 'HealthTech',
      stage: 'Seed',
      seeking: '₹4 Cr',
      location: 'Vellore',
      match: 88,
      description: 'AI-powered diagnostic platform for rural healthcare',
      founded: '2023'
    },
    {
      id: 4,
      name: 'GreenEnergy Solutions',
      sector: 'CleanTech',
      stage: 'Series A',
      seeking: '₹8 Cr',
      location: 'Chennai',
      match: 79,
      description: 'Solar energy solutions for residential and commercial use',
      founded: '2022'
    }
  ];

  const portfolioCompanies = [
    {
      id: 1,
      name: 'EduTech Solutions',
      sector: 'EdTech',
      invested: '₹1.5 Cr',
      valuation: '₹12 Cr',
      growth: '+45%',
      status: 'Growing'
    },
    {
      id: 2,
      name: 'GreenEnergy Systems',
      sector: 'CleanTech',
      invested: '₹2 Cr',
      valuation: '₹18 Cr',
      growth: '+32%',
      status: 'Stable'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Investor Dashboard</h1>
          <p className="text-gray-600 mt-1">Discover and track investment opportunities in Tamil Nadu</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Filter Startups</span>
          </button>
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Post Opportunity</span>
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

      {/* Investment Focus */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Investment Focus Areas</h3>
            <p className="text-green-100">EdTech • HealthTech • AgriTech • FinTech</p>
            <p className="text-green-100 text-sm mt-1">Investment Range: ₹50L - ₹5Cr</p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors duration-200 flex items-center space-x-2">
              <Search className="w-4 h-4" />
              <span>Find Startups</span>
            </button>
            <button className="bg-white text-green-600 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2">
              <DollarSign className="w-4 h-4" />
              <span>Investment Criteria</span>
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
              { id: 'opportunities', label: 'Investment Opportunities' },
              { id: 'portfolio', label: 'Portfolio' },
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
                    <p className="text-sm text-gray-900">New startup match: TechStart Innovations</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-900">Portfolio update: EduTech Solutions raised Series A</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-900">5 new startups in your focus areas</p>
                    <p className="text-xs text-gray-500">2 days ago</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment Pipeline</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium text-blue-900">Due Diligence</span>
                    <span className="text-sm text-blue-700">3 startups</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <span className="text-sm font-medium text-yellow-900">Term Sheet</span>
                    <span className="text-sm text-yellow-700">1 startup</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-sm font-medium text-green-900">Closed Deals</span>
                    <span className="text-sm text-green-700">2 this quarter</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'opportunities' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Investment Opportunities</h3>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search startups..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200">
                    <Filter className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {startupOpportunities.map((startup) => (
                  <div key={startup.id} className="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg">{startup.name}</h4>
                        <p className="text-gray-600 text-sm">{startup.description}</p>
                      </div>
                      <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                        <Star className="w-3 h-3" />
                        <span>{startup.match}% match</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500">Sector</p>
                        <p className="font-medium text-gray-900">{startup.sector}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Stage</p>
                        <p className="font-medium text-gray-900">{startup.stage}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Seeking</p>
                        <p className="font-medium text-gray-900">{startup.seeking}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Location</p>
                        <p className="font-medium text-gray-900">{startup.location}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-200 text-sm font-medium">
                        View Details
                      </button>
                      <button className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm font-medium">
                        Save
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'portfolio' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Companies</h3>
              <div className="space-y-4">
                {portfolioCompanies.map((company) => (
                  <div key={company.id} className="p-6 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 text-lg">{company.name}</h4>
                        <p className="text-gray-600 text-sm">{company.sector}</p>
                      </div>
                      <div className="grid grid-cols-3 gap-6 text-center">
                        <div>
                          <p className="text-xs text-gray-500">Invested</p>
                          <p className="font-bold text-gray-900">{company.invested}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Valuation</p>
                          <p className="font-bold text-gray-900">{company.valuation}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Growth</p>
                          <p className="font-bold text-green-600">{company.growth}</p>
                        </div>
                      </div>
                      <span className={`ml-4 px-3 py-1 rounded-full text-xs font-medium ${
                        company.status === 'Growing' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {company.status}
                      </span>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200 text-sm">
                        View Details
                      </button>
                      <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm">
                        Generate Report
                      </button>
                    </div>
                  </div>
                ))}
                {portfolioCompanies.length === 0 && (
                  <div className="text-center py-8">
                    <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No investments yet</h3>
                    <p className="text-gray-600 mb-4">Start building your portfolio by investing in promising startups</p>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200">
                      Explore Opportunities
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-gray-50 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-4">Investment Performance</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Invested</span>
                    <span className="font-semibold">₹15.5 Cr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Portfolio Value</span>
                    <span className="font-semibold text-green-600">₹42.3 Cr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">ROI</span>
                    <span className="font-semibold text-green-600">2.7x</span>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-4">Deal Flow</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Startups Reviewed</span>
                    <span className="font-semibold">156</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Due Diligence</span>
                    <span className="font-semibold">23</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Investments Made</span>
                    <span className="font-semibold">8</span>
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

export default InvestorDashboard;