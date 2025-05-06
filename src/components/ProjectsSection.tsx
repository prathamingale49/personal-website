
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ProjectsSection: React.FC = () => {
  const projects = [
    {
      id: "smart-home-power-monitor",
      title: "Smart Home Power Monitor",
      description: "Designed and built a device that monitors power consumption of household appliances in real-time and reports data to a mobile app.",
      tags: ["Arduino", "PCB Design", "IoT", "Mobile App"],
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475"
    },
    {
      id: "automated-hydroponics-system",
      title: "Automated Hydroponics System",
      description: "Created an automated system that monitors and maintains optimal growing conditions for plants using sensors and microcontrollers.",
      tags: ["Sensors", "Microcontrollers", "Automation", "Python"],
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1"
    },
    {
      id: "audio-amplifier-design",
      title: "Audio Amplifier Design",
      description: "Designed and implemented a Class D audio amplifier with digital signal processing capabilities for enhanced sound quality.",
      tags: ["Analog Design", "DSP", "PCB Layout", "Testing"],
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
    }
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-3">Projects</h2>
      <div className="h-1 w-24 bg-gradient-to-r from-purple-400 to-fuchsia-500 mb-8"></div>
      <p className="text-gray-300 mb-12 max-w-3xl">
        Here are some of my notable electrical engineering projects. Each demonstrates different skills and technologies I've worked with.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <Card key={index} className="bg-gray-800/60 border border-gray-700 hover:border-purple-400/50 transition-all hover:shadow-lg hover:shadow-purple-400/10">
            <div className="w-full h-48 overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-purple-300">{project.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-300">{project.description}</CardDescription>
              <div className="flex flex-wrap gap-2 mt-4">
                {project.tags.map((tag, i) => (
                  <span key={i} className="bg-gray-700 px-3 py-1 rounded-full text-xs text-purple-200">
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Link 
                to={`/projects/${project.id}`}
                className="text-purple-400 hover:text-purple-300 flex items-center gap-1 text-sm"
              >
                View Project <ArrowRight size={16} />
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
