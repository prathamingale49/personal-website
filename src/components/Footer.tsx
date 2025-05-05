
import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-8 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <p className="text-cyan-400 font-bold text-lg">EE.Portfolio</p>
            <p className="text-gray-400 text-sm">Electrical Engineering Student</p>
          </div>
          
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
              LinkedIn
            </a>
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
              GitHub
            </a>
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
              Email
            </a>
          </div>
        </div>
        
        <div className="h-px bg-gray-800 my-6"></div>
        
        <div className="text-center text-gray-500 text-sm">
          © {currentYear} Your Name. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
