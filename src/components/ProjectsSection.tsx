import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ProjectsSection: React.FC = () => {
  const projects = [
    {
      id: "bms-design",
      title: "Battery Management System",
      description: "Designed and implemented a comprehensive BMS for the Yellowjacket Space Program's rocket, featuring cell balancing, temperature monitoring, and state-of-charge estimation.",
      tags: ["PCB Design", "Power Electronics", "Embedded Systems", "Altium"],
      image: "/images/bms.jpg"
    },
    {
      id: "umbilical-system",
      title: "Rocket Umbilical System",
      description: "Developed the interface system between ground support equipment and the rocket, including power distribution, sensor integration, and data acquisition capabilities.",
      tags: ["Interface Design", "Signal Processing", "PCB Layout", "Testing"],
      image: "/images/umbilical.jpg"
    },
    {
      id: "smart-belt",
      title: "Smart Navigation Belt",
      description: "Created an assistive device for visually impaired individuals using ultrasonic sensors and haptic feedback to detect obstacles and provide navigation assistance.",
      tags: ["Arduino", "Sensors", "Embedded Systems", "Prototyping"],
      image: "/images/smartbelt.jpg"
    }
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-3 text-purple-300">Projects</h2>
      <div className="h-1 w-24 bg-gradient-to-r from-purple-400 to-fuchsia-500 mb-8"></div>
      <p className="text-gray-300 mb-12 max-w-3xl text-center mx-auto w-fit">
        Here are some of my notable electrical engineering projects. Each demonstrates different skills and technologies I've worked with, along with the project's purpose and outcome.
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
              <div className="text-purple-400 flex items-center gap-1 text-sm">
                Page Under Construction <ArrowRight size={16} />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
