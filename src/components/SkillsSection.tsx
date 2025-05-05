
import React from 'react';

export const SkillsSection: React.FC = () => {
  const skillCategories = [
    {
      category: "Technical Skills",
      skills: [
        { name: "Circuit Design", level: 90 },
        { name: "PCB Layout", level: 85 },
        { name: "Microcontroller Programming", level: 80 },
        { name: "Signal Processing", level: 75 },
        { name: "Power Electronics", level: 70 },
      ]
    },
    {
      category: "Software & Tools",
      skills: [
        { name: "MATLAB", level: 85 },
        { name: "Altium Designer", level: 80 },
        { name: "Arduino", level: 90 },
        { name: "SPICE Simulation", level: 75 },
        { name: "LabVIEW", level: 65 },
      ]
    },
    {
      category: "Programming Languages",
      skills: [
        { name: "C/C++", level: 80 },
        { name: "Python", level: 75 },
        { name: "VHDL", level: 65 },
        { name: "JavaScript", level: 60 },
        { name: "Assembly", level: 50 },
      ]
    }
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-3">Skills</h2>
      <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-blue-500 mb-8"></div>
      <p className="text-gray-300 mb-12 max-w-3xl">
        I've developed a diverse set of skills through coursework, projects, and professional experiences.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {skillCategories.map((category, catIndex) => (
          <div key={catIndex} className="bg-gray-800/60 p-6 rounded-lg border border-gray-700">
            <h3 className="text-xl font-semibold text-cyan-300 mb-4">{category.category}</h3>
            <div className="space-y-4">
              {category.skills.map((skill, skillIndex) => (
                <div key={skillIndex}>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-200">{skill.name}</span>
                    <span className="text-cyan-400">{skill.level}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-400 to-blue-500" 
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
