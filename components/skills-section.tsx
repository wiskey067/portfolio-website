"use client"

import { useState } from "react"
import { usePersistentState } from "@/hooks/use-persistent-state"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, X, Save } from "lucide-react"
import { ProtectedButton } from "./protected-button"

interface Skill {
  id: string
  name: string
  category: string
}

export function SkillsSection() {
  const [skills, setSkills] = usePersistentState<Skill[]>("portfolio-skills", [
    { id: "1", name: "Python", category: "Languages" },
    { id: "2", name: "JavaScript", category: "Languages" },
    { id: "3", name: "TypeScript", category: "Languages" },
    { id: "4", name: "React.js", category: "Frameworks" },
    { id: "5", name: "Next.js", category: "Frameworks" },
    { id: "6", name: "Node.js", category: "Frameworks" },
    { id: "7", name: "AWS", category: "Tools" },
    { id: "8", name: "Docker", category: "Tools" },
    { id: "9", name: "Git", category: "Tools" },
    { id: "10", name: "MySQL", category: "Databases" },
    { id: "11", name: "PostgreSQL", category: "Databases" },
  ])

  const [isAdding, setIsAdding] = useState(false)
  const [newSkill, setNewSkill] = useState({ name: "", category: "" })

  const categories = ["Languages", "Frameworks", "Tools", "Databases"]

  const addSkill = () => {
    if (newSkill.name && newSkill.category) {
      setSkills((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          name: newSkill.name,
          category: newSkill.category,
        },
      ])
      setNewSkill({ name: "", category: "" })
      setIsAdding(false)
    }
  }

  const removeSkill = (id: string) => {
    setSkills((prev) => prev.filter((skill) => skill.id !== id))
  }

  const getSkillsByCategory = (category: string) => {
    return skills.filter((skill) => skill.category === category)
  }

  return (
    <section id="skills" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold text-primary font-sans">Skills</h2>
          <ProtectedButton
            onClick={() => setIsAdding(true)}
            className="bg-primary text-primary-foreground hover:bg-primary/90 glow-effect"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Skill
          </ProtectedButton>
        </div>

        {isAdding && (
          <Card className="mb-8 bg-card border-border">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  placeholder="Skill name"
                  value={newSkill.name}
                  onChange={(e) => setNewSkill((prev) => ({ ...prev, name: e.target.value }))}
                />
                <select
                  value={newSkill.category}
                  onChange={(e) => setNewSkill((prev) => ({ ...prev, category: e.target.value }))}
                  className="px-3 py-2 bg-input border border-border rounded-md text-foreground"
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <div className="flex gap-2">
                  <Button onClick={addSkill} size="sm" className="bg-primary text-primary-foreground">
                    <Save className="h-4 w-4" />
                  </Button>
                  <Button onClick={() => setIsAdding(false)} variant="outline" size="sm">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Card key={category} className="bg-card border-border">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 text-secondary font-sans">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {getSkillsByCategory(category).map((skill) => (
                    <div key={skill.id} className="relative group">
                      <Badge
                        variant="outline"
                        className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        {skill.name}
                      </Badge>
                      <ProtectedButton
                        onClick={() => removeSkill(skill.id)}
                        size="sm"
                        variant="destructive"
                        className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </ProtectedButton>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
