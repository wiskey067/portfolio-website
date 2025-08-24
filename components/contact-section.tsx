"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Github, Linkedin, Mail, Phone, MapPin, Edit, Save, X } from "lucide-react"

const iconMap = {
  Mail: Mail,
  Phone: Phone,
  MapPin: MapPin,
  Github: Github,
  Linkedin: Linkedin,
} as const

export function ContactSection() {
  const [contactInfo, setContactInfo] = useState([
    {
      iconName: "Mail" as keyof typeof iconMap,
      label: "Email",
      value: "ab9777816@gmail.com",
      href: "mailto:ab9777816@gmail.com",
      key: "email",
    },
    {
      iconName: "Phone" as keyof typeof iconMap,
      label: "Phone",
      value: "+91-9073930881",
      href: "tel:+919073930881",
      key: "phone",
    },
    {
      iconName: "MapPin" as keyof typeof iconMap,
      label: "Location",
      value: "Bhubaneswar, India",
      href: null,
      key: "location",
    },
  ])

  const [isEditing, setIsEditing] = useState(false)
  const [editValues, setEditValues] = useState({
    email: "ab9777816@gmail.com",
    phone: "+91-9073930881",
    location: "Bhubaneswar, India",
  })

  const handleEdit = () => {
    setEditValues({
      email: contactInfo[0].value,
      phone: contactInfo[1].value,
      location: contactInfo[2].value,
    })
    setIsEditing(true)
  }

  const handleSave = () => {
    const updatedContactInfo = [
      {
        ...contactInfo[0],
        value: editValues.email,
        href: `mailto:${editValues.email}`,
      },
      {
        ...contactInfo[1],
        value: editValues.phone,
        href: `tel:${editValues.phone.replace(/[^0-9+]/g, "")}`,
      },
      {
        ...contactInfo[2],
        value: editValues.location,
        href: null,
      },
    ]
    setContactInfo(updatedContactInfo)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditValues({
      email: contactInfo[0].value,
      phone: contactInfo[1].value,
      location: contactInfo[2].value,
    })
  }

  const socialLinks = [
    {
      iconName: "Linkedin" as keyof typeof iconMap,
      label: "LinkedIn",
      href: "https://linkedin.com/in/arijit-bhattacharjee",
      color: "hover:text-blue-500",
    },
    {
      iconName: "Github" as keyof typeof iconMap,
      label: "GitHub",
      href: "https://github.com/wiskey067",
      color: "hover:text-gray-400",
    },
    {
      iconName: "Mail" as keyof typeof iconMap,
      label: "Email",
      href: `mailto:${contactInfo[0].value}`,
      color: "hover:text-red-500",
    },
  ]

  return (
    <section id="contact" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-4 font-sans">Get In Touch</h2>
          <p className="text-xl text-muted-foreground font-serif">Let's discuss your next project or opportunity</p>
        </div>

        <div className="max-w-2xl mx-auto space-y-8">
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-2xl text-foreground font-sans">Contact Information</CardTitle>
              {!isEditing ? (
                <Button variant="outline" size="sm" onClick={handleEdit} className="gap-2 bg-transparent">
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSave}
                    className="gap-2 text-green-600 hover:text-green-700 bg-transparent"
                  >
                    <Save className="h-4 w-4" />
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCancel}
                    className="gap-2 text-red-600 hover:text-red-700 bg-transparent"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={editValues.email}
                      onChange={(e) => setEditValues((prev) => ({ ...prev, email: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={editValues.phone}
                      onChange={(e) => setEditValues((prev) => ({ ...prev, phone: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location" className="text-sm font-medium">
                      Location
                    </Label>
                    <Input
                      id="location"
                      type="text"
                      value={editValues.location}
                      onChange={(e) => setEditValues((prev) => ({ ...prev, location: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                </div>
              ) : (
                contactInfo.map((info) => {
                  const IconComponent = iconMap[info.iconName]
                  return (
                    <div key={info.label} className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground font-serif">{info.label}</p>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-foreground hover:text-primary transition-colors font-medium"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-foreground font-medium">{info.value}</p>
                        )}
                      </div>
                    </div>
                  )
                })
              )}
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground font-sans">Follow Me</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 justify-center">
                {socialLinks.map((social) => {
                  const IconComponent = iconMap[social.iconName]
                  return (
                    <Button
                      key={social.label}
                      variant="outline"
                      size="icon"
                      asChild
                      className={`border-border hover:border-primary ${social.color} transition-colors`}
                    >
                      <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                        <IconComponent className="h-5 w-5" />
                      </a>
                    </Button>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
