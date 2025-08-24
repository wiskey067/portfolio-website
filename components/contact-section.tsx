"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export function ContactSection() {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "ab9777816@gmail.com",
      href: "mailto:ab9777816@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91-9073930881",
      href: "tel:+919073930881",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Bhubaneswar, India",
      href: null,
    },
  ]

  const socialLinks = [
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/arijit-bhattacharjee",
      color: "hover:text-blue-500",
    },
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/wiskey067",
      color: "hover:text-gray-400",
    },
    {
      icon: Mail,
      label: "Email",
      href: "mailto:ab9777816@gmail.com",
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
            <CardHeader>
              <CardTitle className="text-2xl text-foreground font-sans">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {contactInfo.map((info) => (
                <div key={info.label} className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <info.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-serif">{info.label}</p>
                    {info.href ? (
                      <a href={info.href} className="text-foreground hover:text-primary transition-colors font-medium">
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-foreground font-medium">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground font-sans">Follow Me</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 justify-center">
                {socialLinks.map((social) => (
                  <Button
                    key={social.label}
                    variant="outline"
                    size="icon"
                    asChild
                    className={`border-border hover:border-primary ${social.color} transition-colors`}
                  >
                    <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                      <social.icon className="h-5 w-5" />
                    </a>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
