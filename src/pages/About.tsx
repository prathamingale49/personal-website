
import React from 'react';
import { Layout } from '../components/Layout';
import { Heart, BookOpen, GraduationCap, Cpu, Zap, MessageCircle } from 'lucide-react';

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-purple-300 mb-4 text-center">About Me</h1>
          <div className="flex justify-center mb-12">
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-fuchsia-500"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div>
              <div className="w-full aspect-square max-w-md mx-auto bg-gray-800 rounded-2xl overflow-hidden border-4 border-purple-500/30">
                {/* Replace with your actual image */}
                <div className="w-full h-full flex items-center justify-center text-8xl">
                  👨‍💻
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-white mb-4">Hello, I'm Pratham Ingale</h2>
              <p className="text-gray-300 mb-4">
                I'm an electrical engineering student at Georgia Tech with a passion for building real, test-ready hardware—especially in avionics, power electronics, and embedded systems. I thrive on turning schematics into tangilbe boards, debugging systems under pressure, and designing hardware that works.
              </p>
              <p className="text-gray-300 mb-6">
                Currently, I'm designing high reliability electronics through hands-on internships and leadership roles in student rocketry. From rocket BMS PCBs to DC-DC converters and HITL validation platforms, I'm focused on creating robust, efficient systems that can survive demanding environments.
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <a 
                  href="https://linkedin.com/in/pratham-ingale/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-full flex items-center gap-2 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                  <span className="text-gray-300">LinkedIn</span>
                </a>
                <a 
                  href="https://github.com/prathamingale49" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-full flex items-center gap-2 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                  <span className="text-gray-300">GitHub</span>
                </a>
                <a 
                  href="mailto:pratham.ing49@gmail.com" 
                  className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-full flex items-center gap-2 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <span className="text-gray-300">Email</span>
                </a>
              </div>
            </div>
          </div>

          {/* My Story */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen size={24} className="text-purple-400" />
              <h2 className="text-2xl font-bold text-white">My Story</h2>
            </div>
            <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-8">
              <p className="text-gray-300 mb-4">
                My journey into electrical engineering began when I was 12 years old and took apart my first radio. Though my parents weren't thrilled about the disassembled appliance, that moment sparked a lifelong curiosity about electronics and how they work.
              </p>
              <p className="text-gray-300 mb-4">
                Throughout high school, I participated in robotics clubs and science fairs, always gravitating toward projects involving circuits and programming. One of my proudest achievements was building a solar-powered charging station for my school's outdoor area, which fueled my interest in renewable energy applications.
              </p>
              <p className="text-gray-300">
                In university, I've found my passion at the intersection of power electronics and sustainability. I'm particularly interested in how electrical engineering can contribute to addressing climate change through more efficient energy systems and renewable technology integration. My current focus is on developing the technical and problem-solving skills that will allow me to make meaningful contributions in this field.
              </p>
            </div>
          </section>

          {/* Personal Interests */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Heart size={24} className="text-purple-400" />
              <h2 className="text-2xl font-bold text-white">Personal Interests</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-purple-300 mb-3">Technical Hobbies</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Building amateur radio equipment</li>
                  <li>Restoring vintage electronics</li>
                  <li>DIY home automation projects</li>
                  <li>Participating in electronics hackathons</li>
                  <li>Contributing to open-source hardware projects</li>
                </ul>
              </div>
              
              <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-purple-300 mb-3">Beyond Engineering</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Landscape photography</li>
                  <li>Hiking and outdoor adventures</li>
                  <li>Science fiction literature</li>
                  <li>Playing bass guitar</li>
                  <li>Chess and strategy games</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Why Electrical Engineering */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Zap size={24} className="text-purple-400" />
              <h2 className="text-2xl font-bold text-white">Why Electrical Engineering?</h2>
            </div>
            <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="text-center p-4">
                  <div className="w-16 h-16 mx-auto bg-purple-900/50 rounded-full flex items-center justify-center mb-4">
                    <Cpu size={28} className="text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Innovation</h3>
                  <p className="text-gray-300">
                    I'm drawn to electrical engineering because it's at the forefront of technological innovation, constantly evolving and creating new possibilities.
                  </p>
                </div>
                
                <div className="text-center p-4">
                  <div className="w-16 h-16 mx-auto bg-purple-900/50 rounded-full flex items-center justify-center mb-4">
                    <GraduationCap size={28} className="text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Systems Thinking</h3>
                  <p className="text-gray-300">
                    The scale of electrical engineering projects means that every component must fit together perfectly—considering how everything works together.
                  </p>
                </div>
                
                <div className="text-center p-4">
                  <div className="w-16 h-16 mx-auto bg-purple-900/50 rounded-full flex items-center justify-center mb-4">
                    <MessageCircle size={28} className="text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Impact</h3>
                  <p className="text-gray-300">
                    Electrical engineering gives me the tools to solve meaningful problems and power the projects that matter the most.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default About;
