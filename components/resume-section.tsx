"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Upload, Plus, Trash2, FileText } from "lucide-react"

interface Resume {
  id: string
  name: string
  url: string
  uploadDate: string
}

export function ResumeSection() {
  const [resumes, setResumes] = useState<Resume[]>([
    {
      id: "1",
      name: "Arijit_Bhattacharjee_Resume_2024.pdf",
      url: "/placeholder-resume.pdf",
      uploadDate: "2024-01-15",
    },
  ])

  const [isUploading, setIsUploading] = useState(false)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // In a real app, you'd upload to a server and get back a URL
      const newResume: Resume = {
        id: Date.now().toString(),
        name: file.name,
        url: URL.createObjectURL(file),
        uploadDate: new Date().toISOString().split("T")[0],
      }
      setResumes((prev) => [...prev, newResume])
      setIsUploading(false)
    }
  }

  const deleteResume = (id: string) => {
    setResumes((prev) => prev.filter((resume) => resume.id !== id))
  }

  const downloadResume = (resume: Resume) => {
    // In a real app, this would trigger a download
    const link = document.createElement("a")
    link.href = resume.url
    link.download = resume.name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section id="resume" className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold text-primary font-sans">Resume</h2>
          <div className="flex gap-4">
            <Button
              onClick={() => setIsUploading(true)}
              variant="outline"
              className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Resume
            </Button>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="bg-card border-border text-center">
            <CardContent className="p-8">
              <div className="mb-6">
                <FileText className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-2 font-sans">Download My Resume</h3>
                <p className="text-muted-foreground font-serif">
                  Get the latest version of my resume with all my experience, skills, and projects.
                </p>
              </div>

              {resumes.length > 0 && (
                <div className="space-y-4 mb-6">
                  {resumes.map((resume) => (
                    <div key={resume.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-8 w-8 text-primary" />
                        <div className="text-left">
                          <p className="font-medium text-foreground">{resume.name}</p>
                          <p className="text-sm text-muted-foreground">Uploaded: {resume.uploadDate}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => downloadResume(resume)}
                          size="sm"
                          className="bg-primary text-primary-foreground hover:bg-primary/90 glow-effect"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button onClick={() => deleteResume(resume.id)} size="sm" variant="destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <Button
                onClick={() => resumes.length > 0 && downloadResume(resumes[0])}
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 glow-effect px-8 py-3 text-lg"
                disabled={resumes.length === 0}
              >
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </Button>

              {isUploading && (
                <div className="mt-6 p-4 border-2 border-dashed border-primary/50 rounded-lg">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label htmlFor="resume-upload" className="cursor-pointer flex flex-col items-center gap-2">
                    <Upload className="h-8 w-8 text-primary" />
                    <span className="text-primary font-medium">Click to upload resume</span>
                    <span className="text-sm text-muted-foreground">PDF, DOC, or DOCX files only</span>
                  </label>
                  <Button onClick={() => setIsUploading(false)} variant="outline" size="sm" className="mt-2">
                    Cancel
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
