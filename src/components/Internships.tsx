import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, MapPin, Clock, Users, Building, Briefcase, ArrowRight, Star, ExternalLink, Calendar, TrendingUp, BookOpen } from 'lucide-react';

const Internships = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

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
      category: "technology",
      companyLogo: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=100",
      rating: 4.5,
      learningOpportunities: ["Mentorship", "Code Reviews", "Project Ownership"]
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
      category: "marketing",
      companyLogo: "https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=100",
      rating: 4.3,
      learningOpportunities: ["Campaign Management", "Analytics Training", "Client Interaction"]
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
      category: "technology",
      companyLogo: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100",
      rating: 4.7,
      learningOpportunities: ["Research Papers", "Model Development", "Industry Projects"]
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
      category: "business",
      companyLogo: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100",
      rating: 4.4,
      learningOpportunities: ["Networking", "Pitch Development", "Market Analysis"]
    },
    {
      id: 5,
      title: "UI/UX Design Intern",
      company: "DesignCraft Studio",
      location: "Chennai",
      duration: "4 months",
      stipend: "₹14,000/month",
      type: "Hybrid",
      skills: ["Figma", "Adobe XD", "Prototyping"],
      description: "Create beautiful user experiences for mobile and web applications.",
      postedDate: "1 day ago",
      deadline: "April 20, 2024",
      applicants: 89,
      category: "design",
      companyLogo: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=100",
      rating: 4.6,
      learningOpportunities: ["Design Systems", "User Research", "Portfolio Building"]
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
    sessionStorage.setItem('internshipsScrollPosition', window.pageYOffset.toString());
  };

  return (
    <section id="internships" className="py-16 bg-white relative">
      {/* Under Construction Overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] z-10 flex items-center justify-center">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-200 text-center max-w-md mx-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">🚧 Under Construction</h3>
          <p className="text-gray-600 mb-4">
            We're building an amazing internship portal to connect students with 
            top companies. Exciting opportunities coming soon!
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
              <h2 className="text-3xl font-bold text-gray-900">Internship Opportunities</h2>
              <p className="text-gray-600 mt-1">Discover exciting internship opportunities with innovative startups and companies</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link 
              to="/internships"
              onClick={handleViewMore}
              className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200 group"
            >
              <span>View All</span>
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
            {internships.map((internship) => (
              <div
                key={internship.id}
                className="flex-shrink-0 w-80 group cursor-pointer"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-[500px] flex flex-col border-l-4 border-purple-400 relative">
                  {/* Floating Type Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg ${
                      internship.type === 'Remote' ? 'bg-green-500 text-white' :
                      internship.type === 'Hybrid' ? 'bg-purple-500 text-white' :
                      'bg-pink-500 text-white'
                    }`}>
                      {internship.type}
                    </span>
                  </div>

                  {/* Header with Gradient Background */}
                  <div className="relative bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50 p-6 pb-4">
                    <div className="flex items-start space-x-4">
                      <div className="relative">
                        <img
                          src={internship.companyLogo}
                          alt={internship.company}
                          className="w-16 h-16 rounded-xl object-cover border-3 border-white shadow-lg"
                        />
                        <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-md">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1">
                          {internship.title}
                        </h3>
                        <p className="text-purple-600 font-semibold mb-2">{internship.company}</p>
                        <div className="flex items-center space-x-2 text-sm">
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                            <span className="text-gray-600 font-medium">{internship.rating}</span>
                          </div>
                          <span className="text-gray-400">•</span>
                          <span className="text-gray-600">{internship.applicants} applicants</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 pt-2 flex-1 flex flex-col">
                    {/* Description */}
                    <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-2">
                      {internship.description}
                    </p>

                    {/* Key Info Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <MapPin className="w-4 h-4 text-purple-500" />
                          <span className="text-xs font-medium">Location</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-900 ml-6">{internship.location}</span>
                      </div>
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Clock className="w-4 h-4 text-purple-500" />
                          <span className="text-xs font-medium">Duration</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-900 ml-6">{internship.duration}</span>
                      </div>
                    </div>

                    {/* Skills Tags */}
                    <div className="mb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <BookOpen className="w-4 h-4 text-purple-500" />
                        <span className="text-xs font-medium text-gray-600">Skills You'll Learn</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {internship.skills.slice(0, 3).map((skill, index) => (
                          <span
                            key={index}
                            className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium border border-purple-200"
                          >
                            {skill}
                          </span>
                        ))}
                        {internship.skills.length > 3 && (
                          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
                            +{internship.skills.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Learning Opportunities */}
                    <div className="mb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-purple-500" />
                        <span className="text-xs font-medium text-gray-600">Growth Opportunities</span>
                      </div>
                      <div className="space-y-1">
                        {internship.learningOpportunities.slice(0, 2).map((opportunity, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                            <span className="text-xs text-gray-600">{opportunity}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Stipend Highlight */}
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-4 mb-4 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-purple-100 text-xs font-medium">Monthly Stipend</div>
                          <div className="text-white font-bold text-xl">{internship.stipend}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-purple-100 text-xs">Deadline</div>
                          <div className="text-white font-semibold text-sm">{internship.deadline.split(',')[0]}</div>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="mt-auto">
                      <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02]">
                        <span>Apply Now</span>
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* View More Card */}
            <div className="flex-shrink-0 w-80 h-[500px] group cursor-pointer">
              <Link
                to="/internships"
                onClick={handleViewMore}
                className="block h-full"
              >
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl h-full flex items-center justify-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-dashed border-purple-300 hover:border-purple-400 relative overflow-hidden">
                  <div className="text-center p-8">
                    <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mx-auto mb-4 w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                      <ArrowRight className="w-8 h-8 text-white transform transition-transform duration-500 ease-out group-hover:translate-x-8" />
                      <ArrowRight className="w-8 h-8 text-white absolute transform -translate-x-8 transition-transform duration-500 ease-out group-hover:translate-x-0" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">View All</h3>
                    <p className="text-gray-600">Discover more internship opportunities</p>
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

export default Internships;