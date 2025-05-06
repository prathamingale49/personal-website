
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();

  // This would ideally come from a database or API, we're using static data here for simplicity
  const projects = {
    "smart-home-power-monitor": {
      title: "Smart Home Power Monitor",
      description: "Designed and built a device that monitors power consumption of household appliances in real-time and reports data to a mobile app.",
      fullDescription: `
        This Smart Home Power Monitor was developed to help homeowners track and reduce their energy consumption. 
        The system uses current transformers and voltage sensors to accurately measure power usage in real-time.
        
        The device features:
        • Real-time power consumption monitoring
        • Historical data tracking
        • Abnormal usage alerts
        • Energy-saving recommendations
        • Mobile app integration
        
        Technical implementation included designing custom PCBs, programming an ESP32 microcontroller, and developing a React Native mobile application for user interaction.
        
        The project demonstrated skills in circuit design, embedded systems programming, IoT connectivity, and app development while addressing the real-world need for energy conservation.
      `,
      tags: ["Arduino", "PCB Design", "IoT", "Mobile App"],
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      gallery: [
        "https://images.unsplash.com/photo-1518770660439-4636190af475",
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158", 
        "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
      ]
    },
    "automated-hydroponics-system": {
      title: "Automated Hydroponics System",
      description: "Created an automated system that monitors and maintains optimal growing conditions for plants using sensors and microcontrollers.",
      fullDescription: `
        The Automated Hydroponics System was designed to optimize plant growth in indoor environments while minimizing water usage and maintenance requirements.
        
        Key features include:
        • Automated nutrient delivery system
        • pH and EC monitoring and adjustment
        • Light cycle control
        • Temperature and humidity regulation
        • Remote monitoring and control via web interface
        
        The system uses multiple sensors including pH probes, EC sensors, temperature sensors, and water level sensors. An Arduino Mega controls the system's core functions, while a Raspberry Pi handles the web interface and data logging.
        
        This project combined knowledge of plant biology, fluid mechanics, sensor integration, and control systems to create a sustainable growing solution.
      `,
      tags: ["Sensors", "Microcontrollers", "Automation", "Python"],
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1", 
      gallery: [
        "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d", 
        "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
      ]
    },
    "audio-amplifier-design": {
      title: "Audio Amplifier Design",
      description: "Designed and implemented a Class D audio amplifier with digital signal processing capabilities for enhanced sound quality.",
      fullDescription: `
        This audio amplifier project focused on creating a high-efficiency Class D amplifier with advanced DSP features while maintaining audiophile-grade sound quality.
        
        Technical specifications:
        • 100W per channel (stereo)
        • THD+N < 0.01% at rated power
        • SNR > 110dB
        • Frequency response: 20Hz - 20kHz ±0.1dB
        • Digital inputs: USB, Optical, Coaxial
        • DSP features: Parametric EQ, Room correction, Crossover
        
        The design process included simulation in LTSpice, prototype development on breadboard, PCB design in Altium, and extensive testing using audio analyzers.
        
        The final product demonstrates skills in analog circuit design, digital signal processing, PCB layout, and audio engineering principles.
      `,
      tags: ["Analog Design", "DSP", "PCB Layout", "Testing"],
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      gallery: [
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
        "https://images.unsplash.com/photo-1518770660439-4636190af475", 
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
      ]
    }
  };

  const project = projectId ? projects[projectId as keyof typeof projects] : null;

  if (!project) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl text-red-400">Project not found</h1>
          <Link to="/" className="mt-4 inline-block text-purple-400 hover:text-purple-300">
            Return to home
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <Link to="/#projects" className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-8">
          <ArrowLeft size={18} className="mr-1" /> Back to Projects
        </Link>

        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="w-full md:w-1/2">
            <div className="w-full h-96 bg-gray-800 rounded-lg overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl font-bold text-white mb-4">{project.title}</h1>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag, i) => (
                <span key={i} className="bg-gray-700 px-3 py-1 rounded-full text-xs text-purple-200">
                  {tag}
                </span>
              ))}
            </div>
            <div className="prose prose-invert max-w-none">
              {project.fullDescription.split('\n').map((paragraph, idx) => (
                <p key={idx} className="mb-4 text-gray-300">{paragraph}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Project Gallery */}
        <div className="my-12">
          <h2 className="text-2xl font-bold mb-6">Project Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {project.gallery.map((img, idx) => (
              <div key={idx} className="bg-gray-800 rounded-lg overflow-hidden h-64">
                <img 
                  src={img} 
                  alt={`Project image ${idx+1}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Next/Previous Project Navigation */}
        <div className="flex justify-between mt-12 pt-6 border-t border-gray-700">
          <Link 
            to={`/projects/smart-home-power-monitor`} 
            className="text-purple-400 hover:text-purple-300 flex items-center"
          >
            <ArrowLeft size={18} className="mr-1" /> Previous Project
          </Link>
          <Link 
            to={`/projects/audio-amplifier-design`} 
            className="text-purple-400 hover:text-purple-300 flex items-center"
          >
            Next Project <ArrowRight size={18} className="ml-1" />
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default ProjectDetail;
