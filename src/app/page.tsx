import React from "react";
import { LandingSection } from "../components/sections/LandingSection";
import { ProjectsSection } from "../components/sections/ProjectsSection";
import { AboutSection } from "../components/sections/AboutSection";
import { ExperienceSection } from "../components/sections/ExperienceSection";
import { GallerySection } from "../components/sections/GallerySection";
import { LinkedInSection } from "../components/sections/LinkedInSection";
import { SystemSpecsSection } from "../components/sections/SystemSpecsSection";
import { EducationSection } from "../components/sections/EducationSection";
import { ContactSection } from "../components/sections/ContactSection";
import { EntranceExperience, WorkGrid } from "../components/entrance/EntranceExperience";

export default function HomePage() {
  return (
    <>
      <EntranceExperience />
      <WorkGrid>
        <LandingSection />
        <ProjectsSection />
        <AboutSection />
        <ExperienceSection />
        <GallerySection />
        <LinkedInSection />
        <SystemSpecsSection />
        <EducationSection />
        <ContactSection />
      </WorkGrid>
    </>
  );
}
