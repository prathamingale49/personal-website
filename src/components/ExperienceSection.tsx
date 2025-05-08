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
      description: "Leading the design of a comprehensive HITL program for the avionics system at YJSP. Ultimate goal is full vehicle simulation with hardware components, allowing both hardware and software validation.",
      achievements: [
        "Designing HITL test system to validate avionics sensor boards",
        "Building modular PCBs to emulate RTDs, thermocouples, and pressure sensors",
        "Leading system architecture for DSUB-connected test interfaces and automation"
      ],
      technologies: ["HITL Testing", "PCB Design", "Sensor Emulation", "System Architecture", "Test Automation"]
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
      <h2 className="text-3xl font-bold mb-3 text-purple-300">Experience</h2>
      <div className="h-1 w-24 bg-gradient-to-r from-purple-400 to-fuchsia-500 mb-8"></div>
      <p className="text-gray-300 mb-12 max-w-3xl text-center mx-auto w-fit">
        My recent professional experience includes internships and leadership roles at technical clubs, all of which have helped me develop my technical and soft skills.
      </p>

      <div className="space-y-12">
        {experiences.map((exp, index) => (
          <div key={index} className="relative">
            {/* Timeline connector */}
            {index < experiences.length && (
              <div className="absolute left-8 top-14 w-1 h-[calc(100%-3.5rem)] bg-gradient-to-b from-purple-400 to-fuchsia-500"></div>
            )}
            
            <div className="flex gap-12">
              {/* Circle marker */}
              <div className="mt-1.5 w-4 h-4 rounded-full bg-purple-400 flex-shrink-0 relative z-10 ring-4 ring-gray-800"></div>
              
              <div className="flex-1 flex flex-col items-center text-center pl-2">
                <h3 className="text-xl font-semibold text-white">{exp.title}</h3>
                <div className="text-purple-300 font-medium mb-1">{exp.company}</div>
                <div className="text-sm text-gray-400 mb-3">{exp.period}</div>
                <p className="text-gray-300 max-w-2xl">{exp.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
