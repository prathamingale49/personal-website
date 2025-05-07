
import React from 'react';
import { Layout } from '../components/Layout';
import { BookOpen, Star, Clock } from 'lucide-react';

const Coursework = () => {
  const courses = [
    {
      code: "ECE 2026",
      title: "Introduction to Signal Processing",
      description: "Discrete-time signals, linear systems, convolution, sampling, and Fourier methods.",
      semester: "Spring 2025",
      grade: "A",
      highlights: [
        "Designed filters using MATLAB and audio data",
        "Applied DFT and Z-transform to real signals",
        "Analyzed aliasing and system response plots"
      ]
    },
    {
      code: "ECE 2031",
      title: "Digital Design Laboratory",
      description: "Boolean logic, VHDL, FPGA systems, sequential logic, and team-based digital design.",
      semester: "Spring 2025",
      grade: "A",
      highlights: [
        "Programmed FPGAs to implement logic units",
        "Designed a state machine and 4-bit ALU",
        "Built a full LED Peripheral system with VHDL"
      ]
    },
    {
      code: "ECE 2035",
      title: "Programming for HW/SW Systems",
      description: "Low-level C, RISC-V assembly, memory management, data structures, and debugging.",
      semester: "Spring 2025",
      grade: "A",
      highlights: [
        "Wrote C and assembly for hardware control",
        "Built data structures using pointer logic",
        "Programmed a Snake game in C on an LCD + Mbed"
      ]
    },
    {
      code: "ECE 2040",
      title: "Circuit Analysis",
      description: "DC/AC circuits, RLC transients, phasors, Thevenin/Norton, and op-amp modeling.",
      semester: "Spring 2025",
      grade: "A",
      highlights: [
        "Analyzed RLC circuits in time and frequency domains",
        "Built SPICE models for AC and DC circuits",
        "Applied Thevenin and Norton theorems in circuit design"
      ]
    },
    {
      code: "MATH 2552",
      title: "Differential Equations",
      description: "First and second-order ODEs, Laplace methods, systems, and basic modeling.",
      semester: "Spring 2025",
      grade: "A",
      highlights: [
        "Solved ODEs with Laplace transforms",
        "Modeled circuits and systems with ODEs",
        "Used eigenvalues in linear system solvers"
      ]
    },
    {
      code: "ECE 2020",
      title: "Digital System Design",
      description: "Combinational/sequential logic, datapath, CPU design, binary math, assembly.",
      semester: "Fall 2024",
      grade: "A",
      highlights: [
        "Built ALU, memory, and control circuits",
        "Designed a state machine for a vending machine",
        "Wrote simple programs in MIPS assembly"
      ]
    },
    {
      code: "CS 1331",
      title: "Object-Oriented Programming",
      description: "Java classes, inheritance, polymorphism, object design, and debugging skills.",
      semester: "Fall 2024",
      grade: "A",
      highlights: [
        "Wrote Java apps with GUI and objects",
        "Used class hierarchies and interfaces",
        "Debugged code using IDE tools and tests"
      ]
    },
    {
      code: "PHYS 2212",
      title: "Introductory Physics II",
      description: "Electric fields, circuits, magnetism, optics, and intro to modern physics.",
      semester: "Fall 2024",
      grade: "A",
      highlights: [
        "Applied Gauss's law to charge setups",
        "Built and analyzed DC and AC circuits",
        "Analyzed Lenz's and Faraday's Laws in experiments"
      ]
    },
    {
      code: "MATH 1554",
      title: "Linear Algebra",
      description: "Matrices, Gaussian elimination, eigenvalues, vector spaces, and projections.",
      semester: "Fall 2024",
      grade: "A",
      highlights: [
        "Solved systems of linear equations using row reduction",
        "Diagonalized matrices with eigendecomp",
        "Applied dot products to least squares"
      ]
    },
    {
      code: "MATH 2551",
      title: "Multivariable Calculus",
      description: "Partial derivatives, multiple integrals, vector fields, and optimization.",
      semester: "Fall 2024",
      grade: "A",
      highlights: [
        "Applied Lagrange for constrained optimalization",
        "Used Green's and Stokes' theorems in vector fields",
        "Evaluated triple integrals in 3D shapes",
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
