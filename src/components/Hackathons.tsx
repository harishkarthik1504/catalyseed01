import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Calendar, MapPin, Users, Trophy, ArrowRight, Clock, Target } from 'lucide-react';

const Hackathons = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Mock data for template display
  const hackathons = [
    {
      id: 1,
      title: "Smart Cities Hackathon 2024",
      description: "Build innovative solutions for urban challenges using IoT, AI, and smart technologies.",
      organizer: "Chennai Smart City Mission",
      date: "March 15-17, 2024",
      location: "IIT Madras, Chennai",
      prizePool: "₹5 Lakhs",
      participants: 500,
      registrationDeadline: "March 10, 2024",
      image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600",
      tags: ["IoT", "AI", "Smart Cities"],
      status: "Open for Registration"
    },
    {
      id: 2,
      title: "EdTech Innovation Challenge",
      description: "Create revolutionary educational technology solutions for the digital learning era.",
      organizer: "Anna University",
      date: "April 22-24, 2024",
      location: "Anna University, Chennai",
      prizePool: "₹3 Lakhs",
      participants: 300,
      registrationDeadline: "April 18, 2024",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600",
      tags: ["EdTech", "Innovation", "Learning"],
      status: "Coming Soon"
    },
    {
      id: 3,
      title: "FinTech Revolution Hackathon",
      description: "Develop cutting-edge financial technology solutions for the next generation.",
      organizer: "VIT Vellore",
      date: "May 10-12, 2024",
      location: "VIT University, Vellore",
      prizePool: "₹4 Lakhs",
      participants: 400,
      registrationDeadline: "May 5, 2024",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600",
      tags: ["FinTech", "Blockchain", "Digital Payments"],
      status: "Registration Opens Soon"
    },
    {
      id: 4,
      title: "AgriTech Innovation Summit",
      description: "Transform agriculture with technology solutions for sustainable farming.",
      organizer: "Tamil Nadu Agricultural University",
      date: "June 5-7, 2024",
      location: "TNAU, Coimbatore",
      prizePool: "₹6 Lakhs",
      participants: 350,
      registrationDeadline: "June 1, 2024",
      image: "https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=600",
      tags: ["AgriTech", "Sustainability", "Farming"],
      status: "Planning Phase"
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
    sessionStorage.setItem('hackathonsScrollPosition', window.pageYOffset.toString());
  };

  return (
    <section id="hackathons" className="py-16 bg-gray-50 relative">
      {/* Under Construction Overlay */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] z-10 flex items-center justify-center">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-200 text-center max-w-md mx-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">🚧 Under Construction</h3>
          <p className="text-gray-600 mb-4">
            We're organizing exciting hackathons, workshops, and competitions for entrepreneurs. 
            Amazing events coming your way soon!
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
                <Trophy className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Events & Competitions</h2>
              <p className="text-gray-600 mt-1">Join hackathons, workshops, and innovation challenges across Tamil Nadu</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link 
              to="/events"
              onClick={handleViewMore}
              className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200 group"
            >
              <span>View All Events</span>
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
            {hackathons.map((hackathon) => (
              <div
                key={hackathon.id}
                className="flex-shrink-0 w-80 group cursor-pointer"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-[520px] flex flex-col">
                  {/* Hero Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={hackathon.image}
                      alt={hackathon.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
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
                    
                    {/* Prize Pool Overlay */}
                    <div className="absolute bottom-3 left-3 text-white">
                      <div className="flex items-center space-x-2">
                        <Trophy className="w-5 h-5" />
                        <span className="font-bold text-lg">{hackathon.prizePool}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    {/* Title */}
                    <h3 className="font-bold text-gray-900 text-xl mb-2 line-clamp-2">
                      {hackathon.title}
                    </h3>
                    
                    {/* Organizer */}
                    <p className="text-sm text-purple-600 font-medium mb-3">
                      by {hackathon.organizer}
                    </p>
                    
                    {/* Description */}
                    <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
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
                    
                    {/* Event Details Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                      <div className="flex items-center space-x-1 text-gray-600">
                        <Calendar className="w-3 h-3" />
                        <span>{hackathon.date}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-600">
                        <MapPin className="w-3 h-3" />
                        <span>{hackathon.location.split(',')[0]}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-600">
                        <Users className="w-3 h-3" />
                        <span>{hackathon.participants} participants</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-600">
                        <Clock className="w-3 h-3" />
                        <span>Deadline: {hackathon.registrationDeadline.split(',')[0]}</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="mt-auto">
                      <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium flex items-center justify-center space-x-2">
                        <Target className="w-4 h-4" />
                        <span>
                          {hackathon.status === 'Open for Registration' ? 'Register Now' :
                           hackathon.status === 'Coming Soon' ? 'Notify Me' :
                           'Learn More'}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* View More Card */}
            <div className="flex-shrink-0 w-80 h-[520px] group cursor-pointer">
              <Link
                to="/events"
                onClick={handleViewMore}
                className="block h-full"
              >
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl h-full flex items-center justify-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-dashed border-gray-300 hover:border-purple-400 relative overflow-hidden">
                  <div className="text-center p-8">
                    <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mx-auto mb-4 w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                      <ArrowRight className="w-8 h-8 text-white transform transition-transform duration-500 ease-out group-hover:translate-x-8" />
                      <ArrowRight className="w-8 h-8 text-white absolute transform -translate-x-8 transition-transform duration-500 ease-out group-hover:translate-x-0" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">View All Events</h3>
                    <p className="text-gray-600">Discover more competitions and workshops</p>
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

export default Hackathons;