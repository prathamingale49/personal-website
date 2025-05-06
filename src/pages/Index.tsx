
import React from "react";
import { Layout } from "../components/Layout";
import { ProfileSection } from "../components/ProfileSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { ExperienceSection } from "../components/ExperienceSection";
import { SkillsSection } from "../components/SkillsSection";
import { ContactSection } from "../components/ContactSection";

const Index = () => {
  return (
    <Layout>
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
    </Layout>
  );
};

export default Index;
