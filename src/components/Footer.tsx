
import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black border-t border-zinc-800 py-8 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-300 font-bold text-lg">Pratham Ingale</p>
            <p className="text-gray-500 text-sm">Electrical Engineering Student</p>
          </div>
          
          <div className="flex gap-6">
            <a
              href="https://linkedin.com/in/pratham-ingale/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-300 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/prathamingale49"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-300 transition-colors"
            >
              GitHub
            </a>
            <a
              href="mailto:pratham.ing49@gmail.com"
              className="text-gray-500 hover:text-gray-300 transition-colors"
            >
              Email
            </a>
          </div>
        </div>
        
        <div className="h-px bg-zinc-800 my-6"></div>
        
        <div className="text-center text-gray-600 text-sm">
          © {currentYear} Pratham Ingale. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
