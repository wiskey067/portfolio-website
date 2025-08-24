"use client"

import { Button } from "@/components/ui/button"
import { TypingAnimation } from "./typing-animation"
import { Github, Linkedin, Mail, Download } from "lucide-react"

export function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative">
      <div className="text-center z-10">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 font-sans">
          <TypingAnimation text="Arijit Bhattacharjee" className="text-primary" />
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-serif">
          Turning Ideas into Digital Solutions
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button
            onClick={() => scrollToSection("projects")}
            className="bg-primary text-primary-foreground hover:bg-primary/90 glow-effect px-8 py-3 text-lg"
          >
            View Projects
          </Button>
          <Button
            onClick={() => scrollToSection("resume")}
            variant="outline"
            className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground px-8 py-3 text-lg"
          >
            <Download className="mr-2 h-5 w-5" />
            Download Resume
          </Button>
        </div>
        <div className="flex justify-center space-x-6">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
            <Linkedin className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
            <Github className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
            <Mail className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  )
}
