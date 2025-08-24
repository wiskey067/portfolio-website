"use client"

import { useState } from "react"
import { usePersistentState } from "@/hooks/use-persistent-state"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Github, ExternalLink, Save, X, Search } from "lucide-react"
import { ProtectedButton } from "./protected-button"

interface Project {
  id: string
  title: string
  description: string
  image: string
  tools: string[]
  githubUrl: string
  liveUrl: string
}

export function ProjectsSection() {
  const [projects, setProjects] = usePersistentState<Project[]>("portfolio-projects", [
    {
      id: "1",
      title: "Customer Segmentation using RFM Analysis",
      description:
        "Built a Power BI dashboard to visualize customer value, improving stakeholder decision-making. Automated data cleaning and RFM scoring in Python, increasing operational efficiency.",
      image: "/data-analytics-dashboard.png",
      tools: ["Python", "Power BI", "NumPy", "Pandas"],
      githubUrl: "https://github.com/wiskey067/rfm-analysis",
      liveUrl: "",
    },
    {
      id: "2",
      title: "Intelligent Task Allocation System",
      description:
        'Designed an ML-based system to automate sprint task allocation using team skillsets and workload. Engineered a custom "Sleeping Point" metric to quantify developer fatigue.',
      image: "/task-management-system.png",
      tools: ["Python", "scikit-learn", "NumPy", "Machine Learning"],
      githubUrl: "https://github.com/wiskey067/task-allocation",
      liveUrl: "",
    },
    {
      id: "3",
      title: "Psilocybin Data Analysis",
      description:
        "Analyzed psilocybin mushroom data to uncover compound concentration trends. Built ML models for species classification with improved accuracy using SVM, XGBoost, and Random Forest.",
      image: "/data-science-visualization.png",
      tools: ["Python", "Tableau", "XGBoost", "SVM", "Random Forest"],
      githubUrl: "https://github.com/wiskey067/psilocybin-analysis",
      liveUrl: "",
    },
  ])

  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [newProject, setNewProject] = useState<Omit<Project, "id">>({
    title: "",
    description: "",
    image: "/new-project-concept.png",
    tools: [],
    githubUrl: "",
    liveUrl: "",
  })

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tools.some((tool) => tool.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const addProject = () => {
    if (newProject.title && newProject.description) {
      setProjects((prev) => [...prev, { ...newProject, id: Date.now().toString() }])
      setNewProject({
        title: "",
        description: "",
        image: "/new-project-concept.png",
        tools: [],
        githubUrl: "",
        liveUrl: "",
      })
      setIsAdding(false)
    }
  }

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((project) => project.id !== id))
  }

  const updateProject = (id: string, updatedProject: Omit<Project, "id">) => {
    setProjects((prev) => prev.map((project) => (project.id === id ? { ...updatedProject, id } : project)))
    setEditingId(null)
  }

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
          <h2 className="text-4xl font-bold text-primary font-sans">Projects</h2>
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <ProtectedButton
              onClick={() => setIsAdding(true)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 glow-effect"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Project
            </ProtectedButton>
          </div>
        </div>

        {isAdding && (
          <Card className="mb-8 bg-card border-border">
            <CardContent className="p-6">
              <div className="grid gap-4">
                <Input
                  placeholder="Project title"
                  value={newProject.title}
                  onChange={(e) => setNewProject((prev) => ({ ...prev, title: e.target.value }))}
                />
                <Textarea
                  placeholder="Project description"
                  value={newProject.description}
                  onChange={(e) => setNewProject((prev) => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
                <Input
                  placeholder="Tools (comma-separated)"
                  value={newProject.tools.join(", ")}
                  onChange={(e) =>
                    setNewProject((prev) => ({
                      ...prev,
                      tools: e.target.value
                        .split(",")
                        .map((tool) => tool.trim())
                        .filter(Boolean),
                    }))
                  }
                />
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    placeholder="GitHub URL"
                    value={newProject.githubUrl}
                    onChange={(e) => setNewProject((prev) => ({ ...prev, githubUrl: e.target.value }))}
                  />
                  <Input
                    placeholder="Live Demo URL"
                    value={newProject.liveUrl}
                    onChange={(e) => setNewProject((prev) => ({ ...prev, liveUrl: e.target.value }))}
                  />
                </div>
                <div className="flex gap-2">
                  <ProtectedButton onClick={addProject} className="bg-primary text-primary-foreground">
                    <Save className="mr-2 h-4 w-4" />
                    Save Project
                  </ProtectedButton>
                  <Button onClick={() => setIsAdding(false)} variant="outline">
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="bg-card border-border hover:border-primary/50 transition-colors group">
              <CardHeader className="p-0">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </CardHeader>
              <CardContent className="p-6">
                {editingId === project.id ? (
                  <ProjectEditForm
                    project={project}
                    onSave={(updatedProject) => updateProject(project.id, updatedProject)}
                    onCancel={() => setEditingId(null)}
                  />
                ) : (
                  <>
                    <CardTitle className="text-xl mb-3 text-foreground font-sans">{project.title}</CardTitle>
                    <p className="text-muted-foreground mb-4 font-serif">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tools.map((tool) => (
                        <Badge key={tool} variant="outline" className="border-primary text-primary">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        {project.githubUrl && (
                          <Button size="sm" variant="outline" asChild>
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        {project.liveUrl && (
                          <Button size="sm" variant="outline" asChild>
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ProtectedButton size="sm" variant="outline" onClick={() => setEditingId(project.id)}>
                          <Edit className="h-4 w-4" />
                        </ProtectedButton>
                        <ProtectedButton size="sm" variant="destructive" onClick={() => deleteProject(project.id)}>
                          <Trash2 className="h-4 w-4" />
                        </ProtectedButton>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectEditForm({
  project,
  onSave,
  onCancel,
}: {
  project: Project
  onSave: (project: Omit<Project, "id">) => void
  onCancel: () => void
}) {
  const [editData, setEditData] = useState<Omit<Project, "id">>({
    title: project.title,
    description: project.description,
    image: project.image,
    tools: project.tools,
    githubUrl: project.githubUrl,
    liveUrl: project.liveUrl,
  })

  return (
    <div className="space-y-4">
      <Input value={editData.title} onChange={(e) => setEditData((prev) => ({ ...prev, title: e.target.value }))} />
      <Textarea
        value={editData.description}
        onChange={(e) => setEditData((prev) => ({ ...prev, description: e.target.value }))}
        rows={3}
      />
      <Input
        placeholder="Tools (comma-separated)"
        value={editData.tools.join(", ")}
        onChange={(e) =>
          setEditData((prev) => ({
            ...prev,
            tools: e.target.value
              .split(",")
              .map((tool) => tool.trim())
              .filter(Boolean),
          }))
        }
      />
      <div className="grid grid-cols-2 gap-2">
        <Input
          placeholder="GitHub URL"
          value={editData.githubUrl}
          onChange={(e) => setEditData((prev) => ({ ...prev, githubUrl: e.target.value }))}
        />
        <Input
          placeholder="Live Demo URL"
          value={editData.liveUrl}
          onChange={(e) => setEditData((prev) => ({ ...prev, liveUrl: e.target.value }))}
        />
      </div>
      <div className="flex gap-2">
        <ProtectedButton onClick={() => onSave(editData)} size="sm" className="bg-primary text-primary-foreground">
          <Save className="h-4 w-4" />
        </ProtectedButton>
        <Button onClick={onCancel} variant="outline" size="sm">
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
