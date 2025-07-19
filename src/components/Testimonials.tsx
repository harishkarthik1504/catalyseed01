import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Dr. Rajesh Krishnan",
      role: "Director, IIT Madras Innovation Center",
      company: "IIT Madras",
      image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=200",
      testimonial: "Catalyseed has been instrumental in showcasing the incredible innovation happening in Tamil Nadu's educational institutions. The platform has given our startups the visibility they deserve and connected them with the right ecosystem partners.",
      rating: 5
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Founder & CEO",
      company: "EduTech Solutions",
      image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=200",
      testimonial: "Being featured on Catalyseed transformed our startup journey. We went from being unknown to connecting with investors and mentors who believed in our vision. The platform truly catalyzes innovation.",
      rating: 5
    },
    {
      id: 3,
      name: "Venkat Ramakrishnan",
      role: "Managing Partner",
      company: "Chennai Angels",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200",
      testimonial: "Catalyseed is our go-to platform for discovering promising startups from Tamil Nadu. The quality of innovations and the passion of young entrepreneurs featured here is remarkable.",
      rating: 5
    },
    {
      id: 4,
      name: "Prof. Meera Natarajan",
      role: "Vice Chancellor",
      company: "Anna University",
      image: "https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg?auto=compress&cs=tinysrgb&w=200",
      testimonial: "The platform has created a vibrant ecosystem where our students can showcase their innovations and connect with industry experts. It's bridging the gap between academia and industry beautifully.",
      rating: 5
    },
    {
      id: 5,
      name: "Arjun Patel",
      role: "Co-founder",
      company: "AgriBot Technologies",
      image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=200",
      testimonial: "The community support and networking opportunities through Catalyseed have been invaluable. We've found co-founders, advisors, and even our first customers through this platform.",
      rating: 5
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-4">
            What Ecosystem Enablers Say
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-purple-100 max-w-2xl mx-auto px-4">
            Hear from the leaders who are shaping Tamil Nadu's innovation landscape
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Arrows */}
          <div className="hidden sm:block">
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm rounded-full p-2 lg:p-3 hover:bg-white/30 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm rounded-full p-2 lg:p-3 hover:bg-white/30 transition-colors"
            >
              <ChevronRight className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
            </button>
          </div>

          {/* Testimonial Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 mx-4 sm:mx-8 lg:mx-12 border border-white/20">
            <div className="text-center">
              <Quote className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white/60 mx-auto mb-4 sm:mb-6" />
              
              <div className="flex justify-center mb-4 sm:mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, index) => (
                  <Star key={index} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              <blockquote className="text-base sm:text-lg lg:text-xl text-white mb-6 sm:mb-8 leading-relaxed max-w-3xl mx-auto">
                "{testimonials[currentTestimonial].testimonial}"
              </blockquote>

              <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                <img
                  src={testimonials[currentTestimonial].image}
                  alt={testimonials[currentTestimonial].name}
                  className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full object-cover border-2 border-white/30"
                />
                <div className="text-center sm:text-left">
                  <h4 className="text-base sm:text-lg font-semibold text-white">
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p className="text-purple-200 text-sm sm:text-base">
                    {testimonials[currentTestimonial].role}
                  </p>
                  <p className="text-purple-300 text-xs sm:text-sm">
                    {testimonials[currentTestimonial].company}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Indicators */}
          <div className="flex justify-center mt-6 sm:mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${
                  index === currentTestimonial 
                    ? 'bg-white' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Additional Stats */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">98%</div>
            <div className="text-purple-200 text-sm sm:text-base">Satisfaction Rate</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">150+</div>
            <div className="text-purple-200 text-sm sm:text-base">Success Stories</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">50+</div>
            <div className="text-purple-200 text-sm sm:text-base">Partner Institutes</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">₹100Cr+</div>
            <div className="text-purple-200 text-sm sm:text-base">Funding Raised</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;