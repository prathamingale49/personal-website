
import React from 'react';
import { Layout } from '../components/Layout';
import { Milestone, Target, Award, TrendingUp, BarChart2 } from 'lucide-react';

const CareerPlan = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-purple-300 mb-4">Career Plan</h1>
          <p className="text-gray-300 mb-12">
            My evolving roadmap as an electrical engineer—fueled by hands-on experience, mission-critical hardware, and a love for building systems that work when they have to.
          </p>

          {/* Career Objective */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Target size={24} className="text-purple-400" />
              <h2 className="text-2xl font-bold text-white">Career Objective</h2>
            </div>
            <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-8">
              <p className="text-gray-200 text-lg leading-relaxed">
                To become a leading electrical engineer specializing in avionics systems, embedded hardware, and power electronics, 
                contributing to the next generation of aerospace and energy platforms. I aim to operate at the intersection of 
                hardware reliability and high-performance design, where precision engineering meets real-world impact.
              </p>
            </div>
          </section>

          {/* Career Timeline */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Milestone size={24} className="text-purple-400" />
              <h2 className="text-2xl font-bold text-white">Career Timeline</h2>
            </div>
            <div className="space-y-8">
              {/* Short Term */}
              <div className="relative">
                <div className="absolute left-6 top-0 h-full w-1 bg-gradient-to-b from-purple-400 to-purple-700"></div>
                <div className="relative pl-16">
                  <div className="absolute left-0 top-1 w-12 h-12 rounded-full bg-purple-900 flex items-center justify-center">
                    <span className="text-purple-300 font-bold">1-3</span>
                  </div>
                  <h3 className="text-xl font-bold text-purple-300 mb-4">Short-term Goals (1-3 years)</h3>
                  <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-6">
                    <ul className="list-disc list-inside text-gray-300 space-y-3">
                      <li>Complete B.S. in Electrical Engineering with Minor in Computer Science at Georgia Tech</li>
                      <li>Lead hardware system design projects in student rocketry & embedded systems</li>
                      <li>Excel in internships at top-tier hardware design companies</li>
                      <li>Deepen skills in PCB design, system bring-up, and power delivery</li>
                      <li>Publish technical documentation and eventually develop an open-source hardware project</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Mid Term */}
              <div className="relative">
                <div className="absolute left-6 top-0 h-full w-1 bg-gradient-to-b from-purple-700 to-purple-900"></div>
                <div className="relative pl-16">
                  <div className="absolute left-0 top-1 w-12 h-12 rounded-full bg-purple-900 flex items-center justify-center">
                    <span className="text-purple-300 font-bold">3-5</span>
                  </div>
                  <h3 className="text-xl font-bold text-purple-300 mb-4">Mid-term Goals (3-5 years)</h3>
                  <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-6">
                    <ul className="list-disc list-inside text-gray-300 space-y-3">
                      <li>Complete Master's degree in Electrical Engineering with specialization in Analog or Power Electronics</li>
                      <li>Transition into a full-time design role in avionics, power systems, or embedded hardware</li>
                      <li>Obtain Professional Engineer (PE) license</li>
                      <li>Publish research or technical articles in industry journals</li>
                      <li>Contribute to mission-critical flight hardware or industrial power platforms</li>
                      <li>Gain ownership over full PCB systems and design program cycles</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Long Term */}
              <div className="relative">
                <div className="relative pl-16">
                  <div className="absolute left-0 top-1 w-12 h-12 rounded-full bg-purple-900 flex items-center justify-center">
                    <span className="text-purple-300 font-bold">10+</span>
                  </div>
                  <h3 className="text-xl font-bold text-purple-300 mb-4">Long-term Goals (10+ years)</h3>
                  <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-6">
                    <ul className="list-disc list-inside text-gray-300 space-y-3">
                      <li>Become a senior/principal engineer or hardware design manager</li>
                      <li>Consider pursuing an MBA or Engineering Management degree</li>
                      <li>Mentor younger engineers and help grow new technical teams</li>
                      <li>Lead cross-functional teams and contribute to strategic business decisions</li>
                      <li>Contribute to industry standards and publish in peer-reveiewed venues</li>
                      <li>Potentially found or join and early-stage startup with a focus on hardware</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Skills Development Plan */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp size={24} className="text-purple-400" />
              <h2 className="text-2xl font-bold text-white">Skills Development Plan</h2>
            </div>
            <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-purple-300 mb-3">Technical Skills</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Complex PCB layout and signal integrity optimization</li>
                  <li>High efficiency power conversion and distribution</li>
                  <li>Embedded firmware for hardware control (Rust, C, C++)</li>
                  <li>Hardware-in-the-loop system design and sensor emulation</li>
                  <li>RF-specific PCB and hardware design, simulation, and testing</li>
                  <li>Battery management, power switching, and protection circuits</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-purple-300 mb-3">Professional Skills</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Technical communication and cross-disciplinary collaboration</li>
                  <li>System architecture and long-term maintenance planning</li>
                  <li>Presentation skills for design reviews and customer meetings</li>
                  <li>Mentorship, technical leadership, and knowledge transfer</li>
                  <li>Agile hardware project planning and documentation</li>
                  <li>Product development and lifecycle management</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Industry Specialization */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <BarChart2 size={24} className="text-purple-400" />
              <h2 className="text-2xl font-bold text-white">Industry Specialization</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-purple-300 mb-3">Primary Focus Areas</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Avionics system architecture and validation</li>
                  <li>High-reliability power electronics for aerospace</li>
                  <li>Embedded systems for energy and automation</li>
                  <li>Robotics hardware: sensors, control, and actuation</li>
                  <li>Hardware-in-the-loop test infrastructure</li>
                </ul>
              </div>
              
              <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-purple-300 mb-3">Target Industries</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Spaceflight and satellite systems</li>
                  <li>Electric vehicle power and energy platforms</li>
                  <li>Autonomous aircraft and UAV hardware development</li>
                  <li>Industrial robotics, control, and automation</li>
                  <li>Clean energy storage and distribution systems</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default CareerPlan;
