
import React from 'react';
import { Layout } from '../components/Layout';
import { Briefcase, Award, Users, Calendar } from 'lucide-react';

const Experience = () => {
  const workExperiences = [
    {
      title: "Electrical Engineering Intern",
      company: "Tech Solutions Inc.",
      period: "June 2023 - August 2023",
      location: "San Francisco, CA",
      description: "Assisted in the design and testing of circuit boards for IoT devices. Conducted performance analysis and documentation of test results. Collaborated with cross-functional teams on product development.",
      achievements: [
        "Designed PCB layout for a wireless sensor node that reduced production cost by 15%",
        "Developed test procedures for quality assurance that improved defect detection by 20%",
        "Participated in 3 client-facing meetings to present technical specifications",
        "Created documentation for internal knowledge base used by all engineering teams"
      ],
      technologies: ["PCB Design", "Altium Designer", "Test Equipment", "Arduino", "Technical Documentation"]
    },
    {
      title: "Research Assistant",
      company: "University Research Lab",
      period: "January 2023 - May 2023",
      location: "University Campus",
      description: "Worked on power electronics research project focused on improving efficiency of DC-DC converters. Designed and simulated circuit models using industry software. Contributed to research paper on converter optimization.",
      achievements: [
        "Improved converter efficiency by 7% through innovative circuit topology",
        "Developed MATLAB simulation models for performance prediction",
        "Co-authored research paper submitted to IEEE Power Electronics journal",
        "Presented findings at university research symposium"
      ],
      technologies: ["MATLAB", "Simulink", "Power Electronics", "LTspice", "Technical Writing"]
    },
    {
      title: "Technical Club Lead",
      company: "University Electronics Club",
      period: "September 2022 - Present",
      location: "University Campus",
      description: "Lead a team of 15 students in electronics projects and competitions. Organized workshops on PCB design, Arduino programming, and circuit analysis. Mentored junior students on project development and troubleshooting.",
      achievements: [
        "Organized 12 technical workshops with average attendance of 30 students",
        "Led team to 2nd place in regional robotics competition",
        "Secured $5,000 in funding from university for lab equipment",
        "Mentored 8 first-year students in completing their first electronics projects"
      ],
      technologies: ["Project Management", "Arduino", "Circuit Design", "Mentoring", "Event Planning"]
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-purple-300 mb-4">Professional Experience</h1>
        <p className="text-gray-300 mb-12 max-w-3xl">
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
              
              <div>
                <div className="flex justify-between mb-1">
                  <h3 className="text-lg font-semibold">Technology Tutor</h3>
                  <span className="text-purple-400 text-sm">2021 - 2022</span>
                </div>
                <p className="text-gray-400 mb-2">Community Center</p>
                <p className="text-gray-300">
                  Provided technology assistance to senior citizens, helping them learn to use digital 
                  devices and navigate online services. Developed simplified guides for common tasks.
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
                  <h3 className="text-lg font-semibold">IEEE Student Competition</h3>
                  <span className="text-purple-400 text-sm">2023</span>
                </div>
                <p className="text-gray-400 mb-2">2nd Place, IoT Device Category</p>
                <p className="text-gray-300">
                  Recognized for developing an innovative energy monitoring device that won second place 
                  in the regional IEEE student competition.
                </p>
              </div>
              
              <div className="mb-6 pb-6 border-b border-gray-700">
                <div className="flex justify-between mb-1">
                  <h3 className="text-lg font-semibold">Dean's List</h3>
                  <span className="text-purple-400 text-sm">2020 - Present</span>
                </div>
                <p className="text-gray-300">
                  Maintained academic excellence with GPA above 3.7 for all semesters.
                </p>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <h3 className="text-lg font-semibold">Academic Merit Scholarship</h3>
                  <span className="text-purple-400 text-sm">2020 - 2024</span>
                </div>
                <p className="text-gray-300">
                  Full tuition scholarship awarded for academic achievement and leadership potential.
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
