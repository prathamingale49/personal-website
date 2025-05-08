import React from 'react';
import { Layout } from '../components/Layout';
import { Briefcase, Award, Users, Calendar } from 'lucide-react';

const Experience = () => {
  const workExperiences = [
    {
      title: "Avionics Hardware Design Intern",
      company: "SpaceX – Starlink Aviation",
      period: "Fall 2025",
      location: "Hawthorne, CA",
      description: "Details to be added after internship completion",
      achievements: [
        "Details to be added after internship completion"
      ],
      technologies: ["PCB Design", "Altium Designer", "Test Equipment", "Avionics", "Hardware Design"]
    },
    {
      title: "Cell Electronics Design Intern",
      company: "Tesla – Cell Manufacturing",
      period: "Summer 2025",
      location: "Austin, TX",
      description: "Details to be added after internship completion",
      achievements: [
        "Details to be added after internship completion"
      ],
      technologies: ["Power Electronics", "Cell Design", "Test Equipment", "Hardware Design"]
    },
    {
      title: "Hardware-in-the-Loop Lead",
      company: "Yellowjacket Space Program",
      period: "April 2025 - Present",
      location: "Georgia Tech",
      description: "Leading the development of HITL test systems for validating avionics sensor boards and ensuring reliable rocket systems.",
      achievements: [
        "Designed HITL test system to validate avionics sensor boards",
        "Built modular PCBs to emulate RTDs, thermocouples, and pressure sensors",
        "Led system architecture for DSUB-connected test interfaces and automation"
      ],
      technologies: ["HITL Testing", "PCB Design", "Sensor Emulation", "System Architecture", "Test Automation"]
    },
    {
      title: "Battery Management System Engineer",
      company: "Yellowjacket Space Program",
      period: "January 2025 - Present",
      location: "Georgia Tech",
      description: "Designing and implementing battery management systems for rocket power systems, focusing on reliability and efficiency.",
      achievements: [
        "Designed a 4-layer BMS PCB with converters, op-amps, and load switches",
        "Wrote Rust firmware for SPI comms, power control, and telemetry logging",
        "Handled bring-up and validation using oscilloscopes and debug tools"
      ],
      technologies: ["BMS Design", "PCB Layout", "Rust", "Power Electronics", "Hardware Debugging"]
    },
    {
      title: "Umbilical & Harnessing Engineer",
      company: "Yellowjacket Space Program",
      period: "January 2025 - Present",
      location: "Georgia Tech",
      description: "Responsible for designing and implementing interface systems for rocket ground-to-flight communications and sensor integration.",
      achievements: [
        "Designed interface PCBs for rocket ground-to-flight comms and abort logic",
        "Implemented rocket harness with 8+ Ethernet lines and 20+ signal channels",
        "Integrated PTs, RTDs, TCs, valves, and sensor routing across avionics stack"
      ],
      technologies: ["Interface Design", "Harnessing", "Sensor Integration", "PCB Design", "System Integration"]
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-purple-300 mb-4">Professional Experience</h1>
        <p className="text-gray-300 mb-12 max-w-3xl text-center mx-auto">
          A detailed overview of my professional experience in the electrical engineering field, including internships, research positions, and leadership roles that have contributed to my technical and soft skill development.
        </p>

        {/* Work Experience */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Briefcase size={24} className="text-purple-400" />
            <h2 className="text-2xl font-bold text-white">Work Experience</h2>
          </div>

          <div className="space-y-12">
            {workExperiences.map((exp, index) => (
              <div key={index} className="relative">
                {/* Timeline connector */}
                {index < workExperiences.length - 1 && (
                  <div className="absolute left-8 top-14 w-1 h-[calc(100%)]">
                    <div className="h-full w-full bg-gradient-to-b from-purple-400 to-purple-700"></div>
                  </div>
                )}
                
                <div className="flex gap-8">
                  {/* Circle marker */}
                  <div className="mt-1.5 w-16 h-16 rounded-full bg-gray-800 border-4 border-purple-500 flex-shrink-0 relative z-10 flex items-center justify-center">
                    <Briefcase size={24} className="text-purple-400" />
                  </div>
                  
                  <div className="w-full">
                    <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-6">
                      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-3">
                        <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                        <div className="flex items-center text-purple-300 mt-2 lg:mt-0">
                          <Calendar size={16} className="mr-1" />
                          <span>{exp.period}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-300 mb-4">
                        <span className="font-medium">{exp.company}</span>
                        <span className="mx-2">•</span>
                        <span>{exp.location}</span>
                      </div>
                      <p className="text-gray-300 mb-6">{exp.description}</p>
                      
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-purple-300 mb-3">Key Achievements</h4>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start">
                              <div className="text-purple-400 mr-2">•</div>
                              <div className="text-gray-300">{achievement}</div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-semibold text-gray-400 mb-2">TECHNOLOGIES & SKILLS</h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, i) => (
                            <span key={i} className="bg-gray-700 px-3 py-1 rounded-full text-xs text-purple-200">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Experiences */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Volunteer Experience */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Users size={20} className="text-purple-400" />
              <h2 className="text-xl font-bold text-white">Volunteer Experience</h2>
            </div>
            <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-6">
              <div className="mb-6 pb-6 border-b border-gray-700">
                <div className="flex justify-between mb-1">
                  <h3 className="text-lg font-semibold">Science Olympiad Mentor</h3>
                  <span className="text-purple-400 text-sm">2021 - 2024</span>
                </div>
                <p className="text-gray-400 mb-2">Local Middle School</p>
                <p className="text-gray-300">
                  Taught epidemiology to middle school students for Science Olympiad competitions. Led the team to 
                  achieve 2nd place at state championships, becoming the first team from their high school to ever 
                  place at the state level.
                </p>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <h3 className="text-lg font-semibold">STEM Outreach Volunteer</h3>
                  <span className="text-purple-400 text-sm">2022 - Present</span>
                </div>
                <p className="text-gray-400 mb-2">Local High Schools</p>
                <p className="text-gray-300">
                  Conducted workshops introducing high school students to electrical engineering concepts 
                  through hands-on projects. Demonstrated circuit building and programming basics to spark 
                  interest in STEM careers.
                </p>
              </div>
            </div>
          </div>

          {/* Honors & Awards */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Award size={20} className="text-purple-400" />
              <h2 className="text-xl font-bold text-white">Honors & Awards</h2>
            </div>
            <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-6">
              <div className="mb-6 pb-6 border-b border-gray-700">
                <div className="flex justify-between mb-1">
                  <h3 className="text-lg font-semibold">Faculty Honors & Dean's List</h3>
                  <span className="text-purple-400 text-sm">2024 - Present</span>
                </div>
                <p className="text-gray-300">
                  Maintained perfect 4.0 GPA for all semesters at Georgia Tech.
                </p>
              </div>
              
              <div className="mb-6 pb-6 border-b border-gray-700">
                <div className="flex justify-between mb-1">
                  <h3 className="text-lg font-semibold">National Merit Scholarship</h3>
                  <span className="text-purple-400 text-sm">2024</span>
                </div>
                <p className="text-gray-300">
                  Awarded for exceptional academic achievement and potential.
                </p>
              </div>
              
              <div className="mb-6 pb-6 border-b border-gray-700">
                <div className="flex justify-between mb-1">
                  <h3 className="text-lg font-semibold">Perfect 36 ACT Score</h3>
                  <span className="text-purple-400 text-sm">2024</span>
                </div>
                <p className="text-gray-300">
                  Achieved perfect score in all sections of the ACT.
                </p>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <h3 className="text-lg font-semibold">10x Top 4 Medalist</h3>
                  <span className="text-purple-400 text-sm">2019 - 2024</span>
                </div>
                <p className="text-gray-400 mb-2">NC Science Olympiad</p>
                <p className="text-gray-300">
                  Consistently placed in top 4 positions across multiple events in state-level competitions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Experience;
