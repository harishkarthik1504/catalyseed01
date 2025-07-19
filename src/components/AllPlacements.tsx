import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Filter, MapPin, Calendar, Clock, Users, Building, GraduationCap, TrendingUp, Award, Star } from 'lucide-react';

const AllPlacements = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock data for template display
  const placements = [
    {
      id: 1,
      studentName: "Arjun Sharma",
      company: "Google India",
      position: "Software Engineer",
      package: "₹45 LPA",
      college: "IIT Madras",
      branch: "Computer Science",
      year: "2024",
      location: "Bangalore",
      type: "Full-time",
      category: "technology",
      studentPhoto: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=200",
      companyLogo: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    {
      id: 2,
      studentName: "Priya Nair",
      company: "Microsoft",
      position: "Product Manager",
      package: "₹38 LPA",
      college: "Anna University",
      branch: "Information Technology",
      year: "2024",
      location: "Hyderabad",
      type: "Full-time",
      category: "technology",
      studentPhoto: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=200",
      companyLogo: "https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    {
      id: 3,
      studentName: "Karthik Reddy",
      company: "Goldman Sachs",
      position: "Financial Analyst",
      package: "₹42 LPA",
      college: "VIT Vellore",
      branch: "Economics",
      year: "2024",
      location: "Mumbai",
      type: "Full-time",
      category: "finance",
      studentPhoto: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200",
      companyLogo: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    {
      id: 4,
      studentName: "Meera Krishnan",
      company: "Deloitte",
      position: "Business Consultant",
      package: "₹28 LPA",
      college: "PSG College",
      branch: "Business Administration",
      year: "2024",
      location: "Chennai",
      type: "Full-time",
      category: "consulting",
      studentPhoto: "https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg?auto=compress&cs=tinysrgb&w=200",
      companyLogo: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100"
    }
  ];

  const categories = [
    { value: 'all', label: 'All Placements' },
    { value: 'technology', label: 'Technology' },
    { value: 'finance', label: 'Finance' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'operations', label: 'Operations' }
  ];

  const filteredPlacements = placements.filter(placement => {
    const matchesSearch = placement.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         placement.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         placement.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         placement.college.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || placement.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const stats = [
    { label: 'Average Package', value: '₹38.2 LPA', icon: TrendingUp, color: 'bg-green-500' },
    { label: 'Highest Package', value: '₹45 LPA', icon: Award, color: 'bg-purple-500' },
    { label: 'Placement Rate', value: '94%', icon: Star, color: 'bg-blue-500' },
    { label: 'Companies', value: '150+', icon: Building, color: 'bg-orange-500' }
  ];

  return (
    <div className="pt-16 sm:pt-20 pb-12 sm:pb-16 bg-white min-h-screen relative">
      {/* Under Construction Overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] z-10 flex items-center justify-center">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-200 text-center max-w-md mx-4">
          <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">🚧 Under Construction</h3>
          <p className="text-gray-600 mb-4">
            We're creating a comprehensive placement showcase to highlight successful career journeys. 
            Coming soon with amazing features!
          </p>
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium text-sm">
            <span>Coming Soon</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 relative">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Placement Success Stories
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            Celebrating outstanding career achievements of Tamil Nadu's brightest minds
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-100 p-4">
                <div className="flex items-center space-x-3">
                  <div className={`${stat.color} w-10 h-10 rounded-lg flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search placements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-gray-600">
            Showing {filteredPlacements.length} of {placements.length} placements
          </p>
        </div>

        {/* Placements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlacements.map((placement) => (
            <div
              key={placement.id}
              className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              {/* Header with Student Photo */}
              <div className="relative bg-gradient-to-br from-green-600 to-emerald-600 p-6 text-white">
                <div className="flex items-center space-x-4">
                  <img
                    src={placement.studentPhoto}
                    alt={placement.studentName}
                    className="w-16 h-16 rounded-full object-cover border-3 border-white shadow-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{placement.studentName}</h3>
                    <p className="text-green-100">{placement.college}</p>
                    <p className="text-green-200 text-sm">{placement.branch} • {placement.year}</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                    {placement.type}
                  </span>
                </div>
              </div>

              {/* Company Info */}
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src={placement.companyLogo}
                    alt={placement.company}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{placement.company}</h4>
                    <p className="text-gray-600">{placement.position}</p>
                  </div>
                </div>

                {/* Package Highlight */}
                <div className="bg-green-50 rounded-lg p-4 mb-4 border border-green-200">
                  <div className="flex items-center justify-between">
                    <span className="text-green-700 font-medium">Annual Package</span>
                    <span className="text-green-900 font-bold text-xl">{placement.package}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="w-3 h-3" />
                    <span>{placement.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Calendar className="w-3 h-3" />
                    <span>{placement.year}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Building className="w-3 h-3" />
                    <span>{placement.company}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <GraduationCap className="w-3 h-3" />
                    <span>{placement.branch}</span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2 px-4 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-medium">
                    View Success Story
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredPlacements.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No placements found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPlacements;