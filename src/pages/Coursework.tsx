
import React from 'react';
import { Layout } from '../components/Layout';
import { BookOpen, Star, Clock } from 'lucide-react';

const Coursework = () => {
  const courses = [
    {
      code: "EE 101",
      title: "Introduction to Electrical Engineering",
      description: "Fundamentals of electrical engineering, basic circuit theory, and introduction to electrical components.",
      semester: "Fall 2020",
      grade: "A",
      highlights: [
        "Built a basic audio amplifier circuit",
        "Learned circuit analysis techniques",
        "Introduced to electrical engineering principles"
      ]
    },
    {
      code: "EE 150",
      title: "Digital Logic Design",
      description: "Boolean algebra, combinational and sequential logic circuits, and digital system design principles.",
      semester: "Spring 2021",
      grade: "A+",
      highlights: [
        "Designed and implemented a 4-bit ALU",
        "Created state machines using VHDL",
        "Built digital clock project with FPGA"
      ]
    },
    {
      code: "EE 210",
      title: "Circuit Theory",
      description: "Advanced circuit analysis, transient and steady-state circuit behavior, and network theorems.",
      semester: "Fall 2021",
      grade: "A-",
      highlights: [
        "Analyzed complex RLC circuits",
        "Worked with operational amplifiers",
        "Learned frequency domain analysis techniques"
      ]
    },
    {
      code: "EE 230",
      title: "Electronics I",
      description: "Semiconductor devices, diode and transistor circuits, and small-signal amplifier design.",
      semester: "Spring 2022",
      grade: "A",
      highlights: [
        "Designed various transistor amplifier configurations",
        "Conducted lab experiments with diodes and transistors",
        "Simulated circuits using SPICE software"
      ]
    },
    {
      code: "EE 310",
      title: "Signals and Systems",
      description: "Signal representation, system response, convolution, Fourier series, and transform methods.",
      semester: "Fall 2022",
      grade: "B+",
      highlights: [
        "Performed signal analysis using MATLAB",
        "Studied continuous and discrete-time systems",
        "Applied filter design techniques"
      ]
    },
    {
      code: "EE 330",
      title: "Electronics II",
      description: "Advanced electronic circuit design, feedback, amplifiers, oscillators, and power electronics.",
      semester: "Spring 2023",
      grade: "A",
      highlights: [
        "Designed a Class AB audio amplifier",
        "Worked with operational amplifier circuits",
        "Built and tested a switching power supply"
      ]
    },
    {
      code: "EE 340",
      title: "Microprocessors and Embedded Systems",
      description: "Microcontroller architecture, programming, interfacing, and embedded system design.",
      semester: "Fall 2023",
      grade: "A",
      highlights: [
        "Programmed ARM Cortex-M microcontrollers",
        "Developed embedded applications with sensors",
        "Created an IoT monitoring system"
      ]
    },
    {
      code: "EE 350",
      title: "Control Systems",
      description: "System modeling, stability analysis, controller design, and feedback systems.",
      semester: "Fall 2023",
      grade: "A-",
      highlights: [
        "Modeled dynamic systems using differential equations",
        "Designed PID controllers",
        "Implemented control systems in Simulink"
      ]
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-purple-300 mb-8 text-center">Coursework</h1>
        <p className="text-gray-300 max-w-3xl mx-auto text-center mb-12">
          A comprehensive overview of my electrical engineering academic journey, highlighting key courses, projects, and learning outcomes that have shaped my expertise in the field.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {courses.map((course, index) => (
            <div 
              key={index} 
              className="bg-gray-800/60 border border-gray-700 hover:border-purple-400/50 rounded-lg p-6 transition-all"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-medium px-2 py-1 bg-purple-900/50 text-purple-300 rounded">
                  {course.code}
                </span>
                <div className="flex items-center">
                  <Star size={16} className="text-purple-400 mr-1" />
                  <span className="text-purple-300 font-medium">{course.grade}</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
              <p className="text-gray-400 mb-4">{course.description}</p>
              
              <div className="flex items-center text-gray-400 text-sm mb-4">
                <Clock size={14} className="mr-1" />
                <span>{course.semester}</span>
              </div>
              
              <div>
                <h4 className="flex items-center text-purple-300 mb-2 font-medium">
                  <BookOpen size={16} className="mr-1" />
                  Key Highlights
                </h4>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  {course.highlights.map((highlight, i) => (
                    <li key={i}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Coursework;
