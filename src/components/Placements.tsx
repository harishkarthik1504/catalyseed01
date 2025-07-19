import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, MapPin, Calendar, GraduationCap, Building, ArrowRight, Award, TrendingUp, Users, Clock, Briefcase, Target, Star, DollarSign } from 'lucide-react';

const Placements = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Mock data for placement opportunities
  const opportunities = [
    {
      id: 1,
      company: "Google India",
      position: "Software Engineer - New Grad",
      package: "₹35-45 LPA",
      location: "Bangalore, Hyderabad",
      type: "Full-time",
      experience: "0-1 years",
      eligibilityBranches: ["CSE", "IT", "ECE"],
      eligibilityCGPA: "7.5+",
      applicationDeadline: "March 25, 2024",
      companyLogo: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=100",
      description: "Join Google's engineering team to build products that help billions of users.",
      requirements: ["Strong programming skills", "Problem-solving abilities", "Team collaboration"],
      category: "technology",
      applicants: 1250,
      rating: 4.8,
      urgency: "high"
    },
    {
      id: 2,
      company: "Microsoft",
      position: "Associate Product Manager",
      package: "₹28-38 LPA",
      location: "Hyderabad, Bangalore",
      type: "Full-time",
      experience: "0-2 years",
      eligibilityBranches: ["Any Engineering", "MBA"],
      eligibilityCGPA: "7.0+",
      applicationDeadline: "March 30, 2024",
      companyLogo: "https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=100",
      description: "Drive product strategy and execution for Microsoft's cloud services.",
      requirements: ["Product management experience", "Data analysis", "Leadership skills"],
      category: "technology",
      applicants: 890,
      rating: 4.6,
      urgency: "medium"
    },
    {
      id: 3,
      company: "Goldman Sachs",
      position: "Technology Analyst",
      package: "₹32-42 LPA",
      location: "Mumbai, Bangalore",
      type: "Full-time",
      experience: "0-1 years",
      eligibilityBranches: ["CSE", "IT", "ECE", "Mathematics"],
      eligibilityCGPA: "8.0+",
      applicationDeadline: "April 5, 2024",
      companyLogo: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100",
      description: "Work at the intersection of finance and technology in global markets.",
      requirements: ["Strong analytical skills", "Programming knowledge", "Financial interest"],
      category: "finance",
      applicants: 654,
      rating: 4.7,
      urgency: "high"
    },
    {
      id: 4,
      company: "Deloitte",
      position: "Business Technology Analyst",
      package: "₹18-28 LPA",
      location: "Chennai, Mumbai, Hyderabad",
      type: "Full-time",
      experience: "0-1 years",
      eligibilityBranches: ["Any Engineering", "MBA", "BCA"],
      eligibilityCGPA: "6.5+",
      applicationDeadline: "April 10, 2024",
      companyLogo: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100",
      description: "Drive digital transformation for Fortune 500 clients across industries.",
      requirements: ["Consulting mindset", "Communication skills", "Business acumen"],
      category: "consulting",
      applicants: 1100,
      rating: 4.4,
      urgency: "low"
    },
    {
      id: 5,
      company: "Infosys",
      position: "Systems Engineer",
      package: "₹15-25 LPA",
      location: "Chennai, Bangalore, Pune",
      type: "Full-time",
      experience: "0-1 years",
      eligibilityBranches: ["Any Engineering"],
      eligibilityCGPA: "6.0+",
      applicationDeadline: "April 15, 2024",
      companyLogo: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=100",
      description: "Be part of next-generation technology services and digital transformation.",
      requirements: ["Technical aptitude", "Learning mindset", "Adaptability"],
      category: "technology",
      applicants: 2100,
      rating: 4.2,
      urgency: "medium"
    }
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleViewMore = () => {
    sessionStorage.setItem('placementsScrollPosition', window.pageYOffset.toString());
  };

  return (
    <section id="placements" className="py-16 bg-gray-50 relative">
      {/* Under Construction Overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] z-10 flex items-center justify-center">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-200 text-center max-w-md mx-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">🚧 Under Construction</h3>
          <p className="text-gray-600 mb-4">
            We're building a comprehensive placement portal to connect students with 
            top employers. Amazing career opportunities coming soon!
          </p>
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium text-sm">
            <span>Coming Soon</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4 group">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Placement Opportunities</h2>
              <p className="text-gray-600 mt-1">Discover exciting career opportunities from top companies across Tamil Nadu</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link 
              to="/placements"
              onClick={handleViewMore}
              className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200 group"
            >
              <span>View All Opportunities</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 hover:border-purple-300"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>

          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 hover:border-purple-300"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>

          <div
            ref={scrollRef}
            className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4 mx-12"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {opportunities.map((opportunity) => (
              <div
                key={opportunity.id}
                className="flex-shrink-0 w-80 group cursor-pointer"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-[520px] flex flex-col border border-gray-100">
                  {/* Top Section with Company & Urgency */}
                  <div className="relative p-6 bg-gradient-to-r from-gray-50 to-gray-100">
                    {/* Urgency Badge */}
                    <div className="absolute top-3 right-3">
                      <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-bold ${
                        opportunity.urgency === 'high' ? 'bg-red-100 text-red-700' :
                        opportunity.urgency === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        <Clock className="w-3 h-3" />
                        <span>{opportunity.urgency === 'high' ? 'Urgent' : opportunity.urgency === 'medium' ? 'Soon' : 'Open'}</span>
                      </div>
                    </div>

                    {/* Company Info */}
                    <div className="flex items-start space-x-4">
                      <img
                        src={opportunity.companyLogo}
                        alt={opportunity.company}
                        className="w-14 h-14 rounded-xl object-cover border-2 border-white shadow-sm"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg text-gray-900 truncate">{opportunity.company}</h3>
                        <div className="flex items-center space-x-2 mb-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm text-gray-600 font-medium">{opportunity.rating}</span>
                        </div>
                        <span className={`inline-block px-2 py-1 rounded-lg text-xs font-medium ${
                          opportunity.category === 'technology' ? 'bg-blue-100 text-blue-700' :
                          opportunity.category === 'finance' ? 'bg-emerald-100 text-emerald-700' :
                          'bg-purple-100 text-purple-700'
                        }`}>
                          {opportunity.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Position & Package */}
                  <div className="px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                    <h4 className="font-bold text-lg leading-tight mb-2">{opportunity.position}</h4>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4" />
                        <span className="font-bold text-lg">{opportunity.package}</span>
                      </div>
                      <div className="text-purple-100 text-sm">
                        {opportunity.experience}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    {/* Description */}
                    <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-2">
                      {opportunity.description}
                    </p>

                    {/* Key Stats */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <Users className="w-4 h-4 text-purple-600 mx-auto mb-1" />
                        <div className="text-xs text-gray-600">Applicants</div>
                        <div className="font-bold text-gray-900">{opportunity.applicants}</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <GraduationCap className="w-4 h-4 text-purple-600 mx-auto mb-1" />
                        <div className="text-xs text-gray-600">Min CGPA</div>
                        <div className="font-bold text-gray-900">{opportunity.eligibilityCGPA}</div>
                      </div>
                    </div>

                    {/* Location & Deadline */}
                    <div className="space-y-2 mb-4 text-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <MapPin className="w-3 h-3" />
                          <span>Location</span>
                        </div>
                        <span className="font-medium text-gray-900">{opportunity.location.split(',')[0]}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Calendar className="w-3 h-3" />
                          <span>Deadline</span>
                        </div>
                        <span className="font-medium text-gray-900">{opportunity.applicationDeadline.split(',')[0]}</span>
                      </div>
                    </div>

                    {/* Eligibility */}
                    <div className="mb-4">
                      <div className="text-xs text-gray-600 mb-1">Eligible Branches</div>
                      <div className="flex flex-wrap gap-1">
                        {opportunity.eligibilityBranches.slice(0, 2).map((branch, index) => (
                          <span
                            key={index}
                            className="bg-purple-50 text-purple-700 px-2 py-1 rounded-full text-xs font-medium border border-purple-200"
                          >
                            {branch}
                          </span>
                        ))}
                        {opportunity.eligibilityBranches.length > 2 && (
                          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
                            +{opportunity.eligibilityBranches.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="mt-auto">
                      <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl">
                        <Target className="w-4 h-4" />
                        <span>Apply Now</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* View More Card */}
            <div className="flex-shrink-0 w-80 h-[520px] group cursor-pointer">
              <Link
                to="/placements"
                onClick={handleViewMore}
                className="block h-full"
              >
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl h-full flex items-center justify-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-dashed border-gray-300 hover:border-purple-400 relative overflow-hidden">
                  <div className="text-center p-8">
                    <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mx-auto mb-4 w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                      <ArrowRight className="w-8 h-8 text-white transform transition-transform duration-500 ease-out group-hover:translate-x-8" />
                      <ArrowRight className="w-8 h-8 text-white absolute transform -translate-x-8 transition-transform duration-500 ease-out group-hover:translate-x-0" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">View All Opportunities</h3>
                    <p className="text-gray-600">Discover more career opportunities</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Placements;