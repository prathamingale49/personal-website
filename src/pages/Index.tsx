
import React, { useEffect } from "react";
import { ScrollCircuit } from "../components/ScrollCircuit";
import { ProfileSection } from "../components/ProfileSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { ExperienceSection } from "../components/ExperienceSection";
import { SkillsSection } from "../components/SkillsSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";

const Index = () => {
  useEffect(() => {
    // For smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href) {
          document.querySelector(href)?.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-black text-gray-200">
      <div className="fixed top-0 left-0 w-full h-full z-0 opacity-30">
        <ScrollCircuit />
      </div>
      <div className="relative z-10">
        <header className="py-6 px-4 md:px-8 lg:px-16 fixed w-full top-0 bg-black/80 backdrop-blur-md z-20">
          <nav className="flex justify-between items-center max-w-7xl mx-auto">
            <div className="text-gray-300 font-bold text-2xl">EE.Portfolio</div>
            <ul className="hidden md:flex gap-8">
              <li><a href="#home" className="hover:text-gray-400 transition-colors">Home</a></li>
              <li><a href="#projects" className="hover:text-gray-400 transition-colors">Projects</a></li>
              <li><a href="#experience" className="hover:text-gray-400 transition-colors">Experience</a></li>
              <li><a href="#skills" className="hover:text-gray-400 transition-colors">Skills</a></li>
              <li><a href="#contact" className="hover:text-gray-400 transition-colors">Contact</a></li>
            </ul>
          </nav>
        </header>

        <main className="pt-24 pb-12">
          <section id="home" className="min-h-screen flex items-center">
            <ProfileSection />
          </section>

          <section id="projects" className="py-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
            <ProjectsSection />
          </section>

          <section id="experience" className="py-16 px-4 md:px-8 lg:px-16 bg-zinc-900/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto">
              <ExperienceSection />
            </div>
          </section>

          <section id="skills" className="py-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
            <SkillsSection />
          </section>

          <section id="contact" className="py-16 px-4 md:px-8 lg:px-16 bg-zinc-900/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto">
              <ContactSection />
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Index;
