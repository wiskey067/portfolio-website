import { ParticleBackground } from "@/components/particle-background"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { SkillsSection } from "@/components/skills-section"
import { ProjectsSection } from "@/components/projects-section"
import { ExperienceSection } from "@/components/experience-section"
import { ResumeSection } from "@/components/resume-section"
import { ContactSection } from "@/components/contact-section"
import { AdminPanel } from "@/components/admin-panel"

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <ParticleBackground />
      <Navbar />
      <AdminPanel />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ResumeSection />
      <ContactSection />
    </main>
  )
}
