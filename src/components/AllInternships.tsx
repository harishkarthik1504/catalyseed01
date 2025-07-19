import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Filter, MapPin, Calendar, Clock, Users, Building, Briefcase, ExternalLink, Star } from 'lucide-react';

const AllInternships = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock data for template display
  const internships = [
    {
      id: 1,
      title: "Software Development Intern",
      company: "TechStart Solutions",
      location: "Chennai",
      duration: "3 months",
      stipend: "₹15,000/month",
      type: "Full-time",
      skills: ["React", "Node.js", "MongoDB"],
      description: "Work on cutting-edge web applications and gain hands-on experience with modern tech stack.",
      postedDate: "2 days ago",
      deadline: "March 30, 2024",
      applicants: 45,
      category: "technology"
    },
    {
      id: 2,
      title: "Digital Marketing Intern",
      company: "GrowthHack Agency",
      location: "Coimbatore",
      duration: "6 months",
      stipend: "₹12,000/month",
      type: "Hybrid",
      skills: ["SEO", "Social Media", "Analytics"],
      description: "Learn digital marketing strategies and execute campaigns for startup clients.",
      postedDate: "1 week ago",
      deadline: "April 5, 2024",
      applicants: 32,
      category: "marketing"
    },
    {
      id: 3,
      title: "Data Science Intern",
      company: "AI Innovations Lab",
      location: "Bangalore",
      duration: "4 months",
      stipend: "₹20,000/month",
      type: "Remote",
      skills: ["Python", "Machine Learning", "SQL"],
      description: "Work on real-world AI projects and contribute to cutting-edge research.",
      postedDate: "3 days ago",
      deadline: "April 15, 2024",
      applicants: 67,
      category: "technology"
    },
    {
      id: 4,
      title: "Business Development Intern",
      company: "StartupConnect",
      location: "Mumbai",
      duration: "3 months",
      stipend: "₹18,000/month",
      type: "Full-time",
      skills: ["Sales", "Communication", "CRM"],
      description: "Help startups connect with investors and grow their business networks.",
      postedDate: "5 days ago",
      deadline: "March 25, 2024",
      applicants: 28,
      category: "business"
    }
  ];

  const categories = [
    { value: 'all', label: 'All Internships' },
    { value: 'technology', label: 'Technology' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'business', label: 'Business' },
    { value: 'design', label: 'Design' },
    { value: 'finance', label: 'Finance' }
  ];

  const filteredInternships = internships.filter(internship => {
    const matchesSearch = internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         internship.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || internship.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="pt-16 sm:pt-20 pb-12 sm:pb-16 bg-white min-h-screen relative">
      {/* Under Construction Overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] z-10 flex items-center justify-center">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-200 text-center max-w-md mx-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">🚧 Under Construction</h3>
          <p className="text-gray-600 mb-4">
            We're building an amazing internship platform to connect students with exciting opportunities. 
            Stay tuned for launch!
          </p>
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium text-sm">
            <span>Coming Soon</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 relative">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Internship Opportunities
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            Discover exciting internship opportunities with innovative startups and companies
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search internships..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
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
            Showing {filteredInternships.length} of {internships.length} internships
          </p>
        </div>

        {/* Internships Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInternships.map((internship) => (
            <div
              key={internship.id}
              className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg mb-1 line-clamp-2">
                      {internship.title}
                    </h3>
                    <div className="flex items-center space-x-2 text-gray-600 mb-2">
                      <Building className="w-4 h-4" />
                      <span className="font-medium">{internship.company}</span>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    internship.type === 'Remote' ? 'bg-green-100 text-green-800' :
                    internship.type === 'Hybrid' ? 'bg-blue-100 text-blue-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {internship.type}
                  </span>
                </div>

                <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-2">
                  {internship.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {internship.skills.slice(0, 3).map((skill, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                  {internship.skills.length > 3 && (
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                      +{internship.skills.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Details */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="w-3 h-3" />
                    <span>{internship.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Clock className="w-3 h-3" />
                    <span>{internship.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Star className="w-3 h-3" />
                    <span>{internship.stipend}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Users className="w-3 h-3" />
                    <span>{internship.applicants} applied</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>Deadline: {internship.deadline}</span>
                    </div>
                    <div className="mt-1">Posted {internship.postedDate}</div>
                  </div>
                  <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium text-sm flex items-center space-x-1">
                    <span>Apply Now</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredInternships.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No internships found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllInternships;