"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Edit, Save, X } from "lucide-react"
import { ProtectedButton } from "./protected-button"

export function AboutSection() {
  const [isEditing, setIsEditing] = useState(false)
  const [aboutData, setAboutData] = useState({
    title: "About Me",
    description: `I'm a passionate Full Stack Developer with expertise in modern web technologies. 
    Currently pursuing B.Tech in Computer Science at KIIT University, I have hands-on experience 
    in building scalable applications and solving complex problems. My journey includes working 
    as an IT Consultant and Growth Executive, where I've developed automation systems and 
    data-driven solutions that drive business growth.`,
    profileImage: "/professional-developer-headshot.png",
  })

  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically save to a database
    console.log("Saving about data:", aboutData)
  }

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold text-primary font-sans">About Me</h2>
          <ProtectedButton
            onClick={() => setIsEditing(!isEditing)}
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            {isEditing ? <X className="mr-2 h-4 w-4" /> : <Edit className="mr-2 h-4 w-4" />}
            {isEditing ? "Cancel" : "Edit"}
          </ProtectedButton>
        </div>

        <Card className="bg-card border-border">
          <CardContent className="p-8">
            <div>
              {isEditing ? (
                <div className="space-y-4">
                  <Input
                    value={aboutData.title}
                    onChange={(e) => setAboutData((prev) => ({ ...prev, title: e.target.value }))}
                    className="text-2xl font-bold"
                  />
                  <Textarea
                    value={aboutData.description}
                    onChange={(e) => setAboutData((prev) => ({ ...prev, description: e.target.value }))}
                    rows={8}
                    className="resize-none"
                  />
                  <Button onClick={handleSave} className="bg-primary text-primary-foreground">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              ) : (
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground font-sans">{aboutData.title}</h3>
                  <p className="text-muted-foreground leading-relaxed font-serif whitespace-pre-line">
                    {aboutData.description}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
