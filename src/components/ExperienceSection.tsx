
import React from 'react';

export const ExperienceSection: React.FC = () => {
  const experiences = [
    {
      title: "Incoming Avionics Hardware Design Intern",
      company: "SpaceX",
      period: "September 2025 - December 2025",
      description: "TBA"
    },
    {
      title: "Incoming Cell Electronics Design Intern",
      company: "Tesla",
      period: "May 2025 - August 2025",
      description: "TBA"
    },
    {
      title: "Avionics Hardware-In-the-Loop Lead",
      company: "Yellowjacket Space Program",
      period: "April 2025 - Present",
      description: "Leading the design of a comprehensive HITL program for the avionics system at YJSP. Ultimate goal is full vehicle simulation with hardware components, allowing both hardware and software validation."
    },
    {
      title: "Battery Management System Responsible Engineer",
      company: "Yellowjacket Space Program",
      period: "January 2025 - Present",
      description: "Layout and schematic design of a 4-layer PCB intended for power management, including Buck/Boost Converters, Load Switches, LDOs, MOSFETs, Op-Amps, and Microcontrollers. Revised 6-layer PCB utilizing similar strucutre."
    }
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-3">Experience</h2>
      <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-blue-500 mb-8"></div>
      <p className="text-gray-300 mb-12 max-w-3xl text-center mx-auto w-fit">
        My recent professional experience includes internships and leadership roles at technical clubs, all of which have helped me develop my technical and soft skills.
      </p>

      <div className="space-y-12">
        {experiences.map((exp, index) => (
          <div key={index} className="relative">
            {/* Timeline connector */}
            {index < experiences.length - 1 && (
              <div className="absolute left-8 top-14 w-1 h-[calc(100%-3.5rem)] bg-gradient-to-b from-cyan-400 to-blue-500"></div>
            )}
            
            <div className="flex gap-8">
              {/* Circle marker */}
              <div className="mt-1.5 w-4 h-4 rounded-full bg-cyan-400 flex-shrink-0 relative z-10 ring-4 ring-gray-800"></div>
              
              <div>
                <h3 className="text-xl font-semibold text-white">{exp.title}</h3>
                <div className="text-cyan-300 font-medium mb-1">{exp.company}</div>
                <div className="text-sm text-gray-400 mb-3">{exp.period}</div>
                <p className="text-gray-300">{exp.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
