
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
            My strategic roadmap for professional development in the electrical engineering field, outlining short and long-term goals, specialization interests, and milestones.
          </p>

          {/* Career Objective */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Target size={24} className="text-purple-400" />
              <h2 className="text-2xl font-bold text-white">Career Objective</h2>
            </div>
            <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-8">
              <p className="text-gray-200 text-lg leading-relaxed">
                To become a specialized electrical engineer focusing on renewable energy systems and power electronics, 
                contributing to sustainable technology development while maintaining a balance between technical expertise, 
                project management, and innovation. I aim to work at the intersection of electrical engineering and clean 
                energy to help advance solutions for global energy challenges.
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
                    <span className="text-purple-300 font-bold">1-2</span>
                  </div>
                  <h3 className="text-xl font-bold text-purple-300 mb-4">Short-term Goals (1-2 years)</h3>
                  <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-6">
                    <ul className="list-disc list-inside text-gray-300 space-y-3">
                      <li>Complete Bachelor's degree in Electrical Engineering with focus on power systems</li>
                      <li>Secure an entry-level position at a renewable energy or power electronics company</li>
                      <li>Obtain IEEE Power Electronics certification</li>
                      <li>Develop proficiency in power systems simulation software</li>
                      <li>Build a portfolio of 3-5 significant personal projects in sustainable energy</li>
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
                      <li>Complete Master's degree in Electrical Engineering with specialization in Power Electronics</li>
                      <li>Progress to mid-level engineering role with project management responsibilities</li>
                      <li>Obtain Professional Engineer (PE) license</li>
                      <li>Publish research or technical articles in industry journals</li>
                      <li>Develop expertise in renewable integration with power grids</li>
                      <li>Participate in industry conferences as a presenter</li>
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
                      <li>Reach senior engineer or engineering manager position</li>
                      <li>Lead major renewable energy infrastructure projects</li>
                      <li>Potentially pursue MBA or Engineering Management degree</li>
                      <li>Consider entrepreneurship in clean tech or energy consulting</li>
                      <li>Mentor younger engineers and contribute to STEM education initiatives</li>
                      <li>Establish recognition as an industry expert in power systems and renewable energy</li>
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
                  <li>Advanced power electronics design and simulation</li>
                  <li>Grid integration techniques for renewable energy</li>
                  <li>Energy storage systems and battery management</li>
                  <li>Power quality analysis and improvement methods</li>
                  <li>SCADA systems and industrial control networks</li>
                  <li>Programming for embedded systems in energy applications</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-purple-300 mb-3">Professional Skills</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Project management and team leadership</li>
                  <li>Technical writing and documentation</li>
                  <li>Client communication and requirements gathering</li>
                  <li>Budget management and resource allocation</li>
                  <li>Regulatory compliance knowledge for energy systems</li>
                  <li>Public speaking and technical presentations</li>
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
                  <li>Solar and wind power integration systems</li>
                  <li>Energy storage and grid stabilization</li>
                  <li>Microgrids and distributed generation</li>
                  <li>Power quality and efficiency optimization</li>
                  <li>Smart grid technologies</li>
                </ul>
              </div>
              
              <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-purple-300 mb-3">Target Industries</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Renewable energy development companies</li>
                  <li>Utility-scale power electronics manufacturers</li>
                  <li>Electric vehicle charging infrastructure</li>
                  <li>Energy consulting firms</li>
                  <li>Research institutions focusing on sustainable energy</li>
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
