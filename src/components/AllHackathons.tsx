import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Filter, MapPin, Calendar, Clock, Users, Trophy, Target, ExternalLink } from 'lucide-react';

const AllHackathons = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock data for template display
  const hackathons = [
    {
      id: 1,
      title: "Smart Cities Hackathon 2024",
      description: "Build innovative solutions for urban challenges using IoT, AI, and smart technologies to create sustainable and efficient cities.",
      organizer: "Chennai Smart City Mission",
      date: "March 15-17, 2024",
      location: "IIT Madras, Chennai",
      prizePool: "₹5 Lakhs",
      participants: 500,
      registrationDeadline: "March 10, 2024",
      image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600",
      tags: ["IoT", "AI", "Smart Cities"],
      status: "Open for Registration",
      category: "technology",
      difficulty: "Advanced"
    },
    {
      id: 2,
      title: "EdTech Innovation Challenge",
      description: "Create revolutionary educational technology solutions for the digital learning era and transform how students learn.",
      organizer: "Anna University",
      date: "April 22-24, 2024",
      location: "Anna University, Chennai",
      prizePool: "₹3 Lakhs",
      participants: 300,
      registrationDeadline: "April 18, 2024",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600",
      tags: ["EdTech", "Innovation", "Learning"],
      status: "Coming Soon",
      category: "education",
      difficulty: "Intermediate"
    },
    {
      id: 3,
      title: "FinTech Revolution Hackathon",
      description: "Develop cutting-edge financial technology solutions for the next generation of digital banking and payments.",
      organizer: "VIT Vellore",
      date: "May 10-12, 2024",
      location: "VIT University, Vellore",
      prizePool: "₹4 Lakhs",
      participants: 400,
      registrationDeadline: "May 5, 2024",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600",
      tags: ["FinTech", "Blockchain", "Digital Payments"],
      status: "Registration Opens Soon",
      category: "finance",
      difficulty: "Advanced"
    },
    {
      id: 4,
      title: "AgriTech Innovation Summit",
      description: "Transform agriculture with technology solutions for sustainable farming and food security in rural areas.",
      organizer: "Tamil Nadu Agricultural University",
      date: "June 5-7, 2024",
      location: "TNAU, Coimbatore",
      prizePool: "₹6 Lakhs",
      participants: 350,
      registrationDeadline: "June 1, 2024",
      image: "https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=600",
      tags: ["AgriTech", "Sustainability", "Farming"],
      status: "Planning Phase",
      category: "agriculture",
      difficulty: "Intermediate"
    },
    {
      id: 5,
      title: "HealthTech Innovation Challenge",
      description: "Develop healthcare technology solutions to improve patient care and medical accessibility in underserved communities.",
      organizer: "SRM Institute",
      date: "July 12-14, 2024",
      location: "SRM University, Chennai",
      prizePool: "₹4.5 Lakhs",
      participants: 280,
      registrationDeadline: "July 8, 2024",
      image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600",
      tags: ["HealthTech", "Medical", "Innovation"],
      status: "Planning Phase",
      category: "healthcare",
      difficulty: "Advanced"
    },
    {
      id: 6,
      title: "CleanTech Sustainability Hackathon",
      description: "Create environmental technology solutions for climate change mitigation and sustainable development.",
      organizer: "PSG College of Technology",
      date: "August 20-22, 2024",
      location: "PSG Tech, Coimbatore",
      prizePool: "₹3.5 Lakhs",
      participants: 320,
      registrationDeadline: "August 15, 2024",
      image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=600",
      tags: ["CleanTech", "Environment", "Sustainability"],
      status: "Planning Phase",
      category: "environment",
      difficulty: "Intermediate"
    }
  ];

  const categories = [
    { value: 'all', label: 'All Events' },
    { value: 'technology', label: 'Technology' },
    { value: 'education', label: 'Education' },
    { value: 'finance', label: 'Finance' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'agriculture', label: 'Agriculture' },
    { value: 'environment', label: 'Environment' }
  ];

  const filteredHackathons = hackathons.filter(hackathon => {
    const matchesSearch = hackathon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hackathon.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hackathon.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || hackathon.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="pt-16 sm:pt-20 pb-12 sm:pb-16 bg-white min-h-screen relative">
      {/* Under Construction Overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] z-10 flex items-center justify-center">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-200 text-center max-w-md mx-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">🚧 Under Construction</h3>
          <p className="text-gray-600 mb-4">
            We're building an amazing events platform where you can discover and participate in 
            hackathons, workshops, and competitions. Stay tuned!
          </p>
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium text-sm">
            <span>Coming Soon</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 relative">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Events & Competitions
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            Discover hackathons, workshops, and innovation challenges across Tamil Nadu
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white"
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
            Showing {filteredHackathons.length} of {hackathons.length} events
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHackathons.map((hackathon) => (
            <div
              key={hackathon.id}
              className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              {/* Hero Image */}
              <div className="relative h-48">
                <img
                  src={hackathon.image}
                  alt={hackathon.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    hackathon.status === 'Open for Registration' ? 'bg-green-500 text-white' :
                    hackathon.status === 'Coming Soon' ? 'bg-yellow-500 text-white' :
                    'bg-gray-500 text-white'
                  }`}>
                    {hackathon.status}
                  </div>
                </div>
                
                {/* Prize Pool */}
                <div className="absolute bottom-3 left-3 text-white">
                  <div className="flex items-center space-x-2">
                    <Trophy className="w-5 h-5" />
                    <span className="font-bold text-lg">{hackathon.prizePool}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Title */}
                <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2">
                  {hackathon.title}
                </h3>
                
                {/* Organizer */}
                <p className="text-sm text-purple-600 font-medium mb-3">
                  by {hackathon.organizer}
                </p>
                
                {/* Description */}
                <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
                  {hackathon.description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {hackathon.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Event Details */}
                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Calendar className="w-3 h-3" />
                    <span>{hackathon.date}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="w-3 h-3" />
                    <span>{hackathon.location.split(',')[0]}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Users className="w-3 h-3" />
                    <span>{hackathon.participants} participants</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Clock className="w-3 h-3" />
                    <span>Deadline: {hackathon.registrationDeadline.split(',')[0]}</span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-4 border-t border-gray-100">
                  <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium flex items-center justify-center space-x-2">
                    <Target className="w-4 h-4" />
                    <span>
                      {hackathon.status === 'Open for Registration' ? 'Register Now' :
                       hackathon.status === 'Coming Soon' ? 'Notify Me' :
                       'Learn More'}
                    </span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredHackathons.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllHackathons;