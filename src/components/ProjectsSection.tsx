
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const projects = [
    {
      title: "Smart Home Power Monitor",
      description: "Designed and built a device that monitors power consumption of household appliances in real-time and reports data to a mobile app.",
      tags: ["Arduino", "PCB Design", "IoT", "Mobile App"],
      link: "#"
    },
    {
      title: "Automated Hydroponics System",
      description: "Created an automated system that monitors and maintains optimal growing conditions for plants using sensors and microcontrollers.",
      tags: ["Sensors", "Microcontrollers", "Automation", "Python"],
      link: "#"
    },
    {
      title: "Audio Amplifier Design",
      description: "Designed and implemented a Class D audio amplifier with digital signal processing capabilities for enhanced sound quality.",
      tags: ["Analog Design", "DSP", "PCB Layout", "Testing"],
      link: "#"
    }
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-3">Projects</h2>
      <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-blue-500 mb-8"></div>
      <p className="text-gray-300 mb-12 max-w-3xl">
        Here are some of my notable electrical engineering projects. Each demonstrates different skills and technologies I've worked with.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <Card key={index} className="bg-gray-800/60 border border-gray-700 hover:border-cyan-400/50 transition-all hover:shadow-lg hover:shadow-cyan-400/10">
            <CardHeader>
              <CardTitle className="text-cyan-300">{project.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-300">{project.description}</CardDescription>
              <div className="flex flex-wrap gap-2 mt-4">
                {project.tags.map((tag, i) => (
                  <span key={i} className="bg-gray-700 px-3 py-1 rounded-full text-xs text-cyan-200">
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <a 
                href={project.link}
                className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 text-sm"
              >
                View Project <ArrowRight size={16} />
              </a>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
