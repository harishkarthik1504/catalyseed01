import React from 'react';
import { Sparkles, MapPin, Phone, Mail, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    platform: [
      { name: 'Success Stories', href: '#success-stories' },
      { name: 'Hackathons', href: '#hackathons' },
      { name: 'Community', href: '#community' },
      { name: 'Testimonials', href: '#testimonials' }
    ],
    resources: [
      { name: 'Startup Guide', href: '#' },
      { name: 'Funding Database', href: '#' },
      { name: 'Mentorship', href: '#' },
      { name: 'Events', href: '#' }
    ],
    about: [
      { name: 'Vision', href: '#vision' },
      { name: 'Mission', href: '#mission' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' }
    ],
    support: [
      { name: 'Help Center', href: '#' },
      { name: 'Contact Us', href: '#' },
      { name: 'FAQ', href: '#' },
      { name: 'Support', href: '#' }
    ]
  };

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'YouTube', icon: Youtube, href: '#' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* Main Footer Content - Single Row */}
        <div className="py-8">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 sm:gap-6">
            {/* Brand Section */}
            <div className="col-span-2 md:col-span-2">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-6 h-6 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold">Catalyseed</span>
              </div>
              <p className="text-gray-400 mb-3 text-sm">
                Empowering Tamil Nadu's next generation of entrepreneurs.
              </p>
              <div className="space-y-1 text-xs">
                <div className="flex items-center space-x-2 text-gray-400">
                  <MapPin className="w-3 h-3" />
                  <span>Chennai, Tamil Nadu</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <Phone className="w-3 h-3" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <Mail className="w-3 h-3" />
                  <span>hello@catalyseed.com</span>
                </div>
              </div>
            </div>

            {/* Platform Links */}
            <div className="col-span-1">
              <h3 className="text-sm font-semibold mb-2">Platform</h3>
              <ul className="space-y-1">
                {footerLinks.platform.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-xs"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div className="col-span-1">
              <h3 className="text-sm font-semibold mb-2">Resources</h3>
              <ul className="space-y-1">
                {footerLinks.resources.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-xs"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* About Links (Vision & Mission) */}
            <div className="col-span-1">
              <h3 className="text-sm font-semibold mb-2">About</h3>
              <ul className="space-y-1">
                {footerLinks.about.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-xs"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div className="col-span-1">
              <h3 className="text-sm font-semibold mb-2">Support</h3>
              <ul className="space-y-1">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-xs"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Vision & Mission Section */}
        <div className="py-6 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-purple-400">Our Vision</h3>
              <p className="text-gray-400 text-sm">
                To be Tamil Nadu's leading platform for student entrepreneurship, creating a vibrant ecosystem where every innovative idea has the opportunity to flourish and transform into successful ventures.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-pink-400">Our Mission</h3>
              <p className="text-gray-400 text-sm">
                To empower student entrepreneurs through comprehensive resources, mentorship programs, and community connections, fostering innovation and driving economic growth across Tamil Nadu's educational landscape.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-4 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <p className="text-gray-400 text-xs text-center sm:text-left">
              © 2024 Catalyseed. All rights reserved. Built with ❤️ in Tamil Nadu.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-7 h-7 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
                >
                  <social.icon className="w-3 h-3" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;