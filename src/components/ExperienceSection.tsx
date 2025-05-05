
import React from 'react';

export const ExperienceSection: React.FC = () => {
  const experiences = [
    {
      title: "Electrical Engineering Intern",
      company: "Tech Solutions Inc.",
      period: "June 2023 - August 2023",
      description: "Assisted in the design and testing of circuit boards for IoT devices. Conducted performance analysis and documentation of test results. Collaborated with cross-functional teams on product development."
    },
    {
      title: "Research Assistant",
      company: "University Research Lab",
      period: "January 2023 - May 2023",
      description: "Worked on power electronics research project focused on improving efficiency of DC-DC converters. Designed and simulated circuit models using industry software. Contributed to research paper on converter optimization."
    },
    {
      title: "Technical Club Lead",
      company: "University Electronics Club",
      period: "September 2022 - Present",
      description: "Lead a team of 15 students in electronics projects and competitions. Organized workshops on PCB design, Arduino programming, and circuit analysis. Mentored junior students on project development and troubleshooting."
    }
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-3">Experience</h2>
      <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-blue-500 mb-8"></div>
      <p className="text-gray-300 mb-12 max-w-3xl">
        My professional experience includes internships, research positions, and leadership roles that have helped me develop technical and soft skills.
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
