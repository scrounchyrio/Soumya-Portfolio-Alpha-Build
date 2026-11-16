import React from "react";
import { HeroSection } from "../components/sections/HeroSection";
import { AboutSection } from "../components/sections/AboutSection";
import { ExperienceSection } from "../components/sections/ExperienceSection";
import { ProjectsSection } from "../components/sections/ProjectsSection";
import { GallerySection } from "../components/sections/GallerySection";
import { LinkedInSection } from "../components/sections/LinkedInSection";
import { SystemSpecsSection } from "../components/sections/SystemSpecsSection";
import { EducationSection } from "../components/sections/EducationSection";
import { ContactSection } from "../components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <GallerySection />
      <LinkedInSection />
      <SystemSpecsSection />
      <EducationSection />
      <ContactSection />
    </>
  );
}
