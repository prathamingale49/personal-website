import React from 'react';
import { ArrowRight } from 'lucide-react';

export const ProfileSection: React.FC = () => {
  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-16">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-1/2">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">
              Hello, I'm Pratham Ingale
            </span>
          </h1>
          <h2 className="text-xl md:text-2xl font-medium text-purple-400 mb-6">
            Electrical Engineering Student
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl">
            I'm passionate about electrical engineering, circuit design, and embedded systems. 
            This portfolio showcases my projects, internship experiences, and technical skills.
          </p>
          <div className="flex gap-4 justify-center">
            <a 
              href="#projects" 
              className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white px-6 py-3 rounded-md font-medium flex items-center gap-2"
            >
              View My Work <ArrowRight size={18} />
            </a>
            <a 
              href="#contact" 
              className="bg-transparent border border-purple-400 text-purple-400 hover:bg-purple-400/10 px-6 py-3 rounded-md font-medium"
            >
              Contact Me
            </a>
          </div>
        </div>
        <div className="lg:w-1/2 flex justify-center">
          <div className="relative">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-r from-purple-500/30 to-fuchsia-500/30 flex items-center justify-center p-2">
              <img 
                src="profilephoto.jpg" 
                alt="Pratham Ingale" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="absolute -z-10 top-0 left-0 w-full h-full rounded-full bg-purple-400/20 blur-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

