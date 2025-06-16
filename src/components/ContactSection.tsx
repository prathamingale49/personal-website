import React from 'react';
import { ArrowRight, CircleDashed } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission would go here
    console.log("Form submitted");
    // In a real app, you would send this data to an API endpoint
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-3 text-purple-300">Contact Me</h2>
      <div className="h-1 w-24 bg-gradient-to-r from-purple-400 to-fuchsia-500 mb-8"></div>
      <p className="text-gray-300 mb-12 max-w-3xl text-center mx-auto">
        Feel free to reach out if you have any questions or want to connect!
      </p>

      <div className="flex flex-col md:flex-row gap-12">
        <div className="md:w-1/2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white"
                placeholder="Your Name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white"
                placeholder="your.email@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white"
                placeholder="Your message here..."
              />
            </div>
            
            <button 
              type="submit"
              className="bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600 text-white px-6 py-3 rounded-md font-medium flex items-center gap-2"
            >
              Send Message <ArrowRight size={18} />
            </button>
          </form>
        </div>
        
        <div className="md:w-1/2">
          <div className="bg-gray-800/60 p-6 rounded-lg border border-gray-700 h-full">
            <h3 className="text-xl font-semibold text-purple-300 mb-4 text-left">Contact Information</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <CircleDashed className="text-purple-400 mt-1" />
                <div className="text-left">
                  <h4 className="font-medium text-white">Email</h4>
                  <p className="text-gray-300">pratham.ing49@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <CircleDashed className="text-purple-400 mt-1" />
                <div className="text-left">
                  <h4 className="font-medium text-white">Location</h4>
                  <p className="text-gray-300">Atlanta, GA, USA</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <CircleDashed className="text-purple-400 mt-1" />
                <div className="text-left">
                  <h4 className="font-medium text-white">LinkedIn</h4>
                  <p className="text-gray-300">linkedin.com/in/pratham-ingale/</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <CircleDashed className="text-purple-400 mt-1" />
                <div className="text-left">
                  <h4 className="font-medium text-white">GitHub</h4>
                  <p className="text-gray-300">github.com/prathamingale49</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <CircleDashed className="text-purple-400 mt-1" />
                <div className="text-left">
                  <h4 className="font-medium text-white">X (Twitter)</h4>
                  <p className="text-gray-300">x.com/PrathamIng49</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
