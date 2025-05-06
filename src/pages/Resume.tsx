
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
                <h2 className="text-2xl font-bold text-white mb-2">Your Name</h2>
                <h3 className="text-xl text-purple-300 mb-4">Electrical Engineering Student</h3>
                <p className="text-gray-300 mb-4">
                  Passionate electrical engineering student with hands-on experience in circuit design, 
                  embedded systems, and power electronics. Seeking opportunities to apply technical knowledge 
                  and problem-solving skills in a challenging internship or entry-level position.
                </p>
              </div>
              <div className="w-full md:w-1/3">
                <div className="text-gray-300">
                  <div className="flex items-center gap-2 mb-2">
                    <span>📧</span>
                    <span>your.email@example.com</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span>📱</span>
                    <span>(123) 456-7890</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span>🔗</span>
                    <a href="https://linkedin.com/in/yourprofile" className="text-purple-400 hover:underline">LinkedIn</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🌐</span>
                    <a href="https://github.com/yourusername" className="text-purple-400 hover:underline">GitHub</a>
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
                <div className="mb-6 pb-6 border-b border-gray-700">
                  <div className="flex justify-between mb-1">
                    <h3 className="text-xl font-semibold">Electrical Engineering Intern</h3>
                    <span className="text-purple-400">Jun 2023 - Aug 2023</span>
                  </div>
                  <p className="text-gray-400 mb-2">Tech Solutions Inc.</p>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li>Assisted in the design and testing of circuit boards for IoT devices</li>
                    <li>Conducted performance analysis and documentation of test results</li>
                    <li>Collaborated with cross-functional teams on product development</li>
                    <li>Created technical documentation for internal and client use</li>
                  </ul>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <h3 className="text-xl font-semibold">Research Assistant</h3>
                    <span className="text-purple-400">Jan 2023 - May 2023</span>
                  </div>
                  <p className="text-gray-400 mb-2">University Research Lab</p>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li>Worked on power electronics research project focused on DC-DC converters</li>
                    <li>Designed and simulated circuit models using industry software</li>
                    <li>Contributed to research paper on converter optimization</li>
                    <li>Presented findings at university research symposium</li>
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
                  <span className="text-purple-400">2020 - 2024 (Expected)</span>
                </div>
                <p className="text-gray-400 mb-2">University Name</p>
                <p className="text-white">GPA: 3.8/4.0</p>
                <p className="text-gray-300 mt-2">
                  Relevant coursework: Circuit Analysis, Digital Systems, Signals and Systems, 
                  Electromagnetic Fields, Power Electronics, Microcontroller Applications
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
                      <li>Circuit Design and Analysis</li>
                      <li>PCB Layout (Altium Designer, KiCad)</li>
                      <li>Microcontrollers (Arduino, ESP32)</li>
                      <li>FPGA Development</li>
                      <li>Test Equipment (Oscilloscopes, Multimeters)</li>
                      <li>Signal Processing</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-purple-300">Software</h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                      <li>MATLAB & Simulink</li>
                      <li>C/C++ Programming</li>
                      <li>Python</li>
                      <li>LTspice/PSpice</li>
                      <li>CAD Software (SolidWorks)</li>
                      <li>VHDL/Verilog</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-4">
                <Award size={20} className="text-purple-400" />
                <h2 className="text-2xl font-bold">Certifications & Awards</h2>
              </div>
              <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-6">
                <ul className="list-disc list-inside text-gray-300 space-y-3">
                  <li>
                    <span className="font-semibold text-white">IEEE Student Competition</span> - 
                    2nd Place, IoT Device Category (2023)
                  </li>
                  <li>
                    <span className="font-semibold text-white">Dean's List</span> - 
                    All semesters (2020-Present)
                  </li>
                  <li>
                    <span className="font-semibold text-white">Academic Merit Scholarship</span> - 
                    Full tuition coverage (2020-2024)
                  </li>
                  <li>
                    <span className="font-semibold text-white">Certified LabVIEW Associate Developer</span> - 
                    National Instruments (2022)
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Resume;
