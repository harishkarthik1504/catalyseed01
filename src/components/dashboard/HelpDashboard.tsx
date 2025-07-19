import React, { useState } from 'react';
import { 
  HelpCircle, Search, Book, MessageCircle, 
  Mail, Phone, ExternalLink, ChevronRight
} from 'lucide-react';

const HelpDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const faqCategories = [
    {
      title: 'Getting Started',
      icon: Book,
      questions: [
        {
          question: 'How do I create my profile?',
          answer: 'To create your profile, click on the "Edit Profile" button in your dashboard and fill in your information.'
        },
        {
          question: 'How do I join events?',
          answer: 'Browse events in the Events section and click "Register" on any event you\'re interested in.'
        },
        {
          question: 'How do I connect with other users?',
          answer: 'Visit user profiles and click the "Connect" button to send a connection request.'
        }
      ]
    },
    {
      title: 'Forum & Community',
      icon: MessageCircle,
      questions: [
        {
          question: 'How do I post in the forum?',
          answer: 'Go to the Forum section and click "New Post" to start a discussion.'
        },
        {
          question: 'How do I reply to posts?',
          answer: 'Click on any post to view it and use the reply box at the bottom to respond.'
        },
        {
          question: 'Can I edit my posts?',
          answer: 'Yes, you can edit your posts by clicking the edit icon on your own posts.'
        }
      ]
    },
    {
      title: 'Account & Privacy',
      icon: HelpCircle,
      questions: [
        {
          question: 'How do I change my password?',
          answer: 'Go to Settings > Security and use the "Change Password" section.'
        },
        {
          question: 'How do I control my privacy settings?',
          answer: 'Visit Settings > Privacy to manage who can see your profile and information.'
        },
        {
          question: 'How do I delete my account?',
          answer: 'Account deletion can be done from Settings > Privacy > Delete Account.'
        }
      ]
    }
  ];

  const contactOptions = [
    {
      title: 'Email Support',
      description: 'Get help via email within 24 hours',
      icon: Mail,
      contact: 'support@catalyseed.com',
      action: 'Send Email'
    },
    {
      title: 'Phone Support',
      description: 'Speak with our team directly',
      icon: Phone,
      contact: '+91 98765 43210',
      action: 'Call Now'
    },
    {
      title: 'Community Forum',
      description: 'Ask questions and get help from the community',
      icon: MessageCircle,
      contact: 'Join Discussion',
      action: 'Visit Forum'
    }
  ];

  const resources = [
    {
      title: 'User Guide',
      description: 'Complete guide to using Catalyseed',
      icon: Book,
      link: '#'
    },
    {
      title: 'Video Tutorials',
      description: 'Step-by-step video guides',
      icon: ExternalLink,
      link: '#'
    },
    {
      title: 'API Documentation',
      description: 'For developers building integrations',
      icon: ExternalLink,
      link: '#'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Help & Support</h1>
          <p className="text-gray-600 mt-1">Find answers to your questions and get support</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for help articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* FAQ Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              {faqCategories.map((category, categoryIndex) => {
                const Icon = category.icon;
                return (
                  <div key={categoryIndex} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 flex items-center space-x-3">
                      <Icon className="w-5 h-5 text-purple-600" />
                      <h3 className="font-semibold text-gray-900">{category.title}</h3>
                    </div>
                    <div className="divide-y divide-gray-200">
                      {category.questions.map((faq, faqIndex) => (
                        <details key={faqIndex} className="group">
                          <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                            <span className="font-medium text-gray-900">{faq.question}</span>
                            <ChevronRight className="w-4 h-4 text-gray-500 group-open:rotate-90 transition-transform" />
                          </summary>
                          <div className="px-4 pb-4">
                            <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                          </div>
                        </details>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Contact & Resources */}
        <div className="space-y-6">
          {/* Contact Support */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Support</h3>
            <div className="space-y-4">
              {contactOptions.map((option, index) => {
                const Icon = option.icon;
                return (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{option.title}</h4>
                        <p className="text-gray-600 text-sm mb-2">{option.description}</p>
                        <p className="text-purple-600 text-sm font-medium">{option.contact}</p>
                        <button className="mt-2 text-purple-600 hover:text-purple-700 text-sm font-medium">
                          {option.action}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Resources */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Resources</h3>
            <div className="space-y-3">
              {resources.map((resource, index) => {
                const Icon = resource.icon;
                return (
                  <a
                    key={index}
                    href={resource.link}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <Icon className="w-5 h-5 text-gray-500 group-hover:text-purple-600" />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 group-hover:text-purple-600">
                        {resource.title}
                      </h4>
                      <p className="text-gray-600 text-sm">{resource.description}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-purple-600" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Help */}
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
            <h3 className="text-lg font-bold mb-2">Need Immediate Help?</h3>
            <p className="text-purple-100 text-sm mb-4">
              Our support team is here to help you succeed
            </p>
            <button className="w-full bg-white/20 backdrop-blur-sm text-white py-2 rounded-lg hover:bg-white/30 transition-colors font-medium">
              Start Live Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpDashboard;