"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Edit, Trash2, Save, X, Calendar, MapPin } from "lucide-react"

interface Experience {
  id: string
  role: string
  company: string
  duration: string
  location: string
  highlights: string[]
}

export function ExperienceSection() {
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: "1",
      role: "Growth Executive (Marketing Operations Analyst)",
      company: "Antbox Tech Pvt. Ltd. | Client: Simetrik",
      duration: "Apr 2025 – Jun 2025",
      location: "Bhubaneswar",
      highlights: [
        "Built dashboards using Excel, HubSpot, and NumPy to track KPIs like open rate, CTR, and opportunity creation",
        "Conducted A/B tests and improved campaign performance using statistical insights",
        "Segmented ICPs using CRM data, increasing engagement by 15%",
        "Automated reporting workflows, reducing manual effort by 60%",
        "Integrated LinkedIn Sales Navigator with CRM for intent-based outreach",
      ],
    },
    {
      id: "2",
      role: "IT Consultant",
      company: "Ariam Rit Engineering Limited",
      duration: "Apr 2024 – Sep 2024",
      location: "Kolkata, WB",
      highlights: [
        "Analyzed network installation processes and identified inefficiencies through stakeholder interviews and data audits",
        "Developed a cloud-based automation system using AWS and Python",
        "Utilized SQL and Excel to clean and structure operational data, producing weekly insights reports",
        "Translated business requirements into technical specifications for the cloud team",
        "Conducted root-cause analysis of recurring network bottlenecks, resulting in a 20% reduction in setup delays",
      ],
    },
  ])

  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newExperience, setNewExperience] = useState<Omit<Experience, "id">>({
    role: "",
    company: "",
    duration: "",
    location: "",
    highlights: [""],
  })

  const addExperience = () => {
    if (newExperience.role && newExperience.company) {
      setExperiences((prev) => [...prev, { ...newExperience, id: Date.now().toString() }])
      setNewExperience({
        role: "",
        company: "",
        duration: "",
        location: "",
        highlights: [""],
      })
      setIsAdding(false)
    }
  }

  const deleteExperience = (id: string) => {
    setExperiences((prev) => prev.filter((exp) => exp.id !== id))
  }

  const updateExperience = (id: string, updatedExperience: Omit<Experience, "id">) => {
    setExperiences((prev) => prev.map((exp) => (exp.id === id ? { ...updatedExperience, id } : exp)))
    setEditingId(null)
  }

  return (
    <section id="experience" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold text-primary font-sans">Experience</h2>
          <Button
            onClick={() => setIsAdding(true)}
            className="bg-primary text-primary-foreground hover:bg-primary/90 glow-effect"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Experience
          </Button>
        </div>

        {isAdding && (
          <Card className="mb-8 bg-card border-border">
            <CardContent className="p-6">
              <ExperienceForm
                experience={newExperience}
                onChange={setNewExperience}
                onSave={addExperience}
                onCancel={() => setIsAdding(false)}
                isNew={true}
              />
            </CardContent>
          </Card>
        )}

        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <Card key={experience.id} className="bg-card border-border relative">
              <CardHeader>
                {editingId === experience.id ? (
                  <ExperienceForm
                    experience={experience}
                    onChange={(updatedExp) => {
                      // This is a bit hacky but works for the edit form
                      const tempExp = { ...updatedExp }
                      setExperiences((prev) =>
                        prev.map((exp) => (exp.id === experience.id ? { ...tempExp, id: experience.id } : exp)),
                      )
                    }}
                    onSave={() => setEditingId(null)}
                    onCancel={() => setEditingId(null)}
                    isNew={false}
                  />
                ) : (
                  <>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl text-secondary font-sans">{experience.role}</CardTitle>
                        <p className="text-lg font-semibold text-foreground mt-1">{experience.company}</p>
                        <div className="flex items-center gap-4 mt-2 text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span className="font-serif">{experience.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span className="font-serif">{experience.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => setEditingId(experience.id)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => deleteExperience(experience.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </CardHeader>
              {editingId !== experience.id && (
                <CardContent>
                  <ul className="space-y-2">
                    {experience.highlights.map((highlight, highlightIndex) => (
                      <li key={highlightIndex} className="flex items-start gap-2 text-muted-foreground font-serif">
                        <span className="text-primary mt-1">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              )}
              {/* Timeline connector */}
              {index < experiences.length - 1 && (
                <div className="absolute left-8 -bottom-4 w-0.5 h-8 bg-primary/30"></div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function ExperienceForm({
  experience,
  onChange,
  onSave,
  onCancel,
  isNew,
}: {
  experience: Omit<Experience, "id">
  onChange: (exp: Omit<Experience, "id">) => void
  onSave: () => void
  onCancel: () => void
  isNew: boolean
}) {
  const addHighlight = () => {
    onChange({ ...experience, highlights: [...experience.highlights, ""] })
  }

  const updateHighlight = (index: number, value: string) => {
    const newHighlights = [...experience.highlights]
    newHighlights[index] = value
    onChange({ ...experience, highlights: newHighlights })
  }

  const removeHighlight = (index: number) => {
    onChange({ ...experience, highlights: experience.highlights.filter((_, i) => i !== index) })
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="Role/Position"
        value={experience.role}
        onChange={(e) => onChange({ ...experience, role: e.target.value })}
      />
      <Input
        placeholder="Company"
        value={experience.company}
        onChange={(e) => onChange({ ...experience, company: e.target.value })}
      />
      <div className="grid sm:grid-cols-2 gap-4">
        <Input
          placeholder="Duration (e.g., Jan 2024 - Present)"
          value={experience.duration}
          onChange={(e) => onChange({ ...experience, duration: e.target.value })}
        />
        <Input
          placeholder="Location"
          value={experience.location}
          onChange={(e) => onChange({ ...experience, location: e.target.value })}
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm font-medium">Key Highlights</label>
          <Button type="button" onClick={addHighlight} size="sm" variant="outline">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {experience.highlights.map((highlight, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <Textarea
              placeholder="Describe your achievement or responsibility..."
              value={highlight}
              onChange={(e) => updateHighlight(index, e.target.value)}
              rows={2}
              className="flex-1"
            />
            {experience.highlights.length > 1 && (
              <Button type="button" onClick={() => removeHighlight(index)} size="sm" variant="destructive">
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Button onClick={onSave} className="bg-primary text-primary-foreground">
          <Save className="mr-2 h-4 w-4" />
          {isNew ? "Add Experience" : "Save Changes"}
        </Button>
        <Button onClick={onCancel} variant="outline">
          <X className="mr-2 h-4 w-4" />
          Cancel
        </Button>
      </div>
    </div>
  )
}
