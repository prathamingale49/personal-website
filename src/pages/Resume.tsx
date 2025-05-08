
import React from 'react';
import { Layout } from '../components/Layout';
import { FileDown, Award, Book, Briefcase, Cpu, Download } from 'lucide-react';

const Resume = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-purple-300">Resume</h1>
            <button className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md transition-colors">
              <Download size={18} /> Download PDF
            </button>
          </div>

          <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-8 mb-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-2/3">
                <h2 className="text-2xl font-bold text-white mb-2">Pratham Ingale</h2>
                <h3 className="text-xl text-purple-300 mb-4">Electrical Engineering Student</h3>
                <p className="text-gray-300 mb-4">
                  Builder of mission-critical hardware and systems with hands-on experience in PCB design, power electronics, and embedded systems.
                  I specialize in building reliable, test-ready boards for aerospace and energy applications.
                </p>
              </div>
              <div className="w-full md:w-1/3">
                <div className="text-gray-300">
                  <div className="flex items-center gap-2 mb-2">
                    <span>📧</span>
                    <span>pratham.ing49@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span>📱</span>
                    <span>(704) 431-7206</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span>🔗</span>
                    <a href="https://linkedin.com/in/pratham-ingale/" className="text-purple-400 hover:underline">LinkedIn</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🌐</span>
                    <a href="https://github.com/prathamingale49" className="text-purple-400 hover:underline">GitHub</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Briefcase size={20} className="text-purple-400" />
                <h2 className="text-2xl font-bold">Experience</h2>
              </div>

              <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-6">
                {/* SpaceX */}
                <div className="mb-6 pb-6 border-b border-gray-700">
                  <div className="flex justify-between mb-1">
                    <h3 className="text-xl font-semibold">Avionics Hardware Design Intern</h3>
                    <span className="text-purple-400">Fall 2025</span>
                  </div>
                  <p className="text-gray-400 mb-2">SpaceX – Starlink Aviation</p>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li>Details to be added after internship completion</li>
                  </ul>
                </div>

                {/* Tesla */}
                <div className="mb-6 pb-6 border-b border-gray-700">
                  <div className="flex justify-between mb-1">
                    <h3 className="text-xl font-semibold">Cell Electronics Design Intern</h3>
                    <span className="text-purple-400">Summer 2025</span>
                  </div>
                  <p className="text-gray-400 mb-2">Tesla – Cell Manufacturing</p>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li>Details to be added after internship completion</li>
                  </ul>
                </div>

                {/* HITL */}
                <div className="mb-6 pb-6 border-b border-gray-700">
                  <div className="flex justify-between mb-1">
                    <h3 className="text-xl font-semibold">Hardware-in-the-Loop Lead</h3>
                    <span className="text-purple-400">April 2025 – Present</span>
                  </div>
                  <p className="text-gray-400 mb-2">Yellowjacket Space Program</p>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li>Designed HITL test system to validate avionics sensor boards</li>
                    <li>Built modular PCBs to emulate RTDs, thermocouples, and pressure sensors</li>
                    <li>Led system architecture for DSUB-connected test interfaces and automation</li>
                  </ul>
                </div>

                {/* BMS */}
                <div className="mb-6 pb-6 border-b border-gray-700">
                  <div className="flex justify-between mb-1">
                    <h3 className="text-xl font-semibold">Battery Management System Engineer</h3>
                    <span className="text-purple-400">January 2025 – Present</span>
                  </div>
                  <p className="text-gray-400 mb-2">Yellowjacket Space Program</p>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li>Designed a 4-layer BMS PCB with converters, op-amps, and load switches</li>
                    <li>Wrote Rust firmware for SPI comms, power control, and telemetry logging</li>
                    <li>Handled bring-up and validation using oscilloscopes and debug tools</li>
                  </ul>
                </div>

                {/* Umbilical & Harnessing */}
                <div>
                  <div className="flex justify-between mb-1">
                    <h3 className="text-xl font-semibold">Umbilical & Harnessing Engineer</h3>
                    <span className="text-purple-400">January 2025 – Present</span>
                  </div>
                  <p className="text-gray-400 mb-2">Yellowjacket Space Program</p>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li>Designed interface PCBs for rocket ground-to-flight comms and abort logic</li>
                    <li>Implemented rocket harness with 8+ Ethernet lines and 20+ signal channels</li>
                    <li>Integrated PTs, RTDs, TCs, valves, and sensor routing across avionics stack</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-4">
                <Book size={20} className="text-purple-400" />
                <h2 className="text-2xl font-bold">Education</h2>
              </div>
              <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-6">
                <div className="flex justify-between mb-1">
                  <h3 className="text-xl font-semibold">Bachelor of Science in Electrical Engineering</h3>
                  <span className="text-purple-400">2024 - 2026 (Expected)</span>
                </div>
                <p className="text-gray-400 mb-2">Georgia Institute of Technology</p>
                <p className="text-white">GPA: 4.0/4.0</p>
                <p className="text-gray-300 mt-2">
                  Relevant coursework: Circuit Analysis, Digital Systems, Signals Processing, 
                  Embedded Programming, Object Oriented Programming, Differential Equations, Multivariable Calculus
                </p>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-4">
                <Cpu size={20} className="text-purple-400" />
                <h2 className="text-2xl font-bold">Technical Skills</h2>
              </div>
              <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-purple-300">Hardware</h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                      <li>PCB Schematic/Layout (Altium Designer, KiCad)</li>
                      <li>Circuit Simulation (LTSpice, PSpice)</li>
                      <li>Soldering & Rework (SMD, THT, QFN, BGA)</li>
                      <li>DC-DC Converters (Buck, Boost, LDO)</li>
                      <li>OScilloscopes, Logic Analyzers, Multimeters</li>
                      <li>Harnessing, Signal Debug, HITL Testbeds</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-purple-300">Programming</h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                      <li>Microcontrollers (STM32, ESP32, ATMega)</li>
                      <li>Rust, C, C++ Programming</li>
                      <li>Firmware for SPI, ADCs, GPIO, Ethernet</li>
                      <li>FPGA Basics (Quartus, VHDL)</li>
                      <li>MATLAB, Simulink, Python</li>
                      <li>Git, VSCode, Keil, Jupyter</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <div className="space-y-8">
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Briefcase size={20} className="text-purple-400" />
                <h2 className="text-2xl font-bold">Projects</h2>
              </div>

              <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-6">
                {/* SpaceX */}
                <div className="mb-6 pb-6 border-b border-gray-700">
                  <div className="flex justify-between mb-1">
                    <h3 className="text-xl font-semibold">Embedded Smart Belt</h3>
                    <span className="text-purple-400">April 2024</span>
                  </div>
                  <p className="text-gray-400 mb-2">A belt to detect obstacles for the visually impaired</p>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li>Belt built using an Arduino, ultrasonic & infrared sensors, 3 speakers, and 2 vibration motors</li>
                    <li>85%+ accuracy in head, waist, and foot level obstacle detection and floor drop off detection</li>
                  </ul>
                </div>

                {/* Tesla */}
                <div className="mb-6 pb-6 border-b border-gray-700">
                  <div className="flex justify-between mb-1">
                    <h3 className="text-xl font-semibold">LED Chaser PCB</h3>
                    <span className="text-purple-400">October 2024</span>
                  </div>
                  <p className="text-gray-400 mb-2">LED Chaser PCB that varies speed of chaser pattern</p>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li>Designed, simulated, and fabricated a timer-controlled LED game using NE555 and CD4017</li>
                    <li>Built schematic, layout, and BOM in Altium and debugged circuit on breadboard pre-fab</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-4">
                <Award size={20} className="text-purple-400" />
                <h2 className="text-2xl font-bold">Certifications, Awards, Test Scores</h2>
              </div>
              <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-6">
                <ul className="list-disc list-inside text-gray-300 space-y-3">
                  <li>
                    <span className="font-semibold text-white">Faculty Honors & Dean's List</span> - 
                    GPA of 4.0 all semesters (2024-Present)
                  </li>
                  <li>
                    <span className="font-semibold text-white">National Merit Scholarship</span>
                  </li>
                  <li>
                    <span className="font-semibold text-white">Perfect 36 ACT Score</span>
                  </li>
                  <li>
                    <span className="font-semibold text-white">10x Top 4 Medalist at State Tournament</span> - 
                    NC Science Olympiad (2019-2024)
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
      </div>
    </Layout>
  );
};

export default Resume;
