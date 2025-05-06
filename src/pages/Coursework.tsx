
import React from 'react';
import { Layout } from '../components/Layout';
import { BookOpen, Star, Clock } from 'lucide-react';

const Coursework = () => {
  const courses = [
    {
      code: "ECE 2026",
      title: "Introduction to Signal Processing",
      description: "Signal representation, system response, convolution, Fourier series, and transform methods.",
      semester: "Spring 2025",
      grade: "A",
      highlights: [
        "Built a basic audio amplifier circuit",
        "Learned circuit analysis techniques",
        "Introduced to electrical engineering principles"
      ]
    },
    {
      code: "ECE 2031",
      title: "Digital Design Laboratory",
      description: "Boolean algebra, combinational and sequential logic circuits, and digital system design principles.",
      semester: "Spring 2025",
      grade: "A",
      highlights: [
        "Designed and implemented a 4-bit ALU",
        "Created state machines using VHDL",
        "Built digital clock project with FPGA"
      ]
    },
    {
      code: "ECE 2035",
      title: "Programming for HW/SW Systems",
      description: "Advanced circuit analysis, transient and steady-state circuit behavior, and network theorems.",
      semester: "Spring 2025",
      grade: "A",
      highlights: [
        "Analyzed complex RLC circuits",
        "Worked with operational amplifiers",
        "Learned frequency domain analysis techniques"
      ]
    },
    {
      code: "ECE 2040",
      title: "Circuit Analysis",
      description: "Semiconductor devices, diode and transistor circuits, and small-signal amplifier design.",
      semester: "Spring 2025",
      grade: "A",
      highlights: [
        "Designed various transistor amplifier configurations",
        "Conducted lab experiments with diodes and transistors",
        "Simulated circuits using SPICE software"
      ]
    },
    {
      code: "MATH 2552",
      title: "Differential Equations",
      description: "Signal representation, system response, convolution, Fourier series, and transform methods.",
      semester: "Spring 2025",
      grade: "A",
      highlights: [
        "Performed signal analysis using MATLAB",
        "Studied continuous and discrete-time systems",
        "Applied filter design techniques"
      ]
    },
    {
      code: "ECE 2020",
      title: "Digital System Design",
      description: "Advanced electronic circuit design, feedback, amplifiers, oscillators, and power electronics.",
      semester: "Fall 2024",
      grade: "A",
      highlights: [
        "Designed a Class AB audio amplifier",
        "Worked with operational amplifier circuits",
        "Built and tested a switching power supply"
      ]
    },
    {
      code: "CS 1331",
      title: "Object-Oriented Programming",
      description: "Microcontroller architecture, programming, interfacing, and embedded system design.",
      semester: "Fall 2024",
      grade: "A",
      highlights: [
        "Programmed ARM Cortex-M microcontrollers",
        "Developed embedded applications with sensors",
        "Created an IoT monitoring system"
      ]
    },
    {
      code: "PHYS 2212",
      title: "Introductory Physics II",
      description: "System modeling, stability analysis, controller design, and feedback systems.",
      semester: "Fall 2024",
      grade: "A",
      highlights: [
        "Modeled dynamic systems using differential equations",
        "Designed PID controllers",
        "Implemented control systems in Simulink"
      ]
    },
    {
      code: "MATH 1554",
      title: "Linear Algebra",
      description: "System modeling, stability analysis, controller design, and feedback systems.",
      semester: "Fall 2024",
      grade: "A",
      highlights: [
        "Modeled dynamic systems using differential equations",
        "Designed PID controllers",
        "Implemented control systems in Simulink"
      ]
    },
    {
      code: "VIP 3601",
      title: "Independent Research Project",
      description: "System modeling, stability analysis, controller design, and feedback systems.",
      semester: "Fall 2024",
      grade: "A",
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
