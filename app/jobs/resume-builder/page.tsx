"use client"

import { Progress } from "@/components/ui/progress"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, Plus, Trash2, FileText, Download, Eye, CheckCircle2, X } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import {
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepTitle,
  StepDescription,
  StepSeparator,
} from "@/components/ui/stepper"

export default function ResumeBuilderPage() {
  const [step, setStep] = useState(1)
  const [resumeData, setResumeData] = useState({
    // Personal Information
    fullName: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    summary: "",

    // Work Experience
    workExperience: [
      {
        id: "exp1",
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
        achievements: [""],
      },
    ],

    // Education
    education: [
      {
        id: "edu1",
        degree: "",
        institution: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],

    // Skills
    skills: [""],

    // Projects
    projects: [
      {
        id: "proj1",
        title: "",
        description: "",
        technologies: "",
        link: "",
        startDate: "",
        endDate: "",
      },
    ],

    // Additional Sections
    certifications: [
      {
        id: "cert1",
        name: "",
        issuer: "",
        date: "",
        description: "",
      },
    ],

    // Template and Formatting
    template: "modern",
    accentColor: "#0F7377",
    fontSize: "medium",
  })

  const { toast } = useToast()

  const handleChange = (section: string, field: string, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section as keyof typeof prev] as object || {}),
        [field]: value,
      },
    }))
  }

  const handleArrayChange = (section: string, index: number, value: string) => {
    setResumeData((prev) => {
      const newArray = [...(prev[section as keyof typeof prev] as string[])]
      newArray[index] = value
      return {
        ...prev,
        [section]: newArray,
      }
    })
  }

  const handleAddArrayItem = (section: string) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: [...(prev[section as keyof typeof prev] as string[]), ""],
    }))
  }

  const handleRemoveArrayItem = (section: string, index: number) => {
    setResumeData((prev) => {
      const newArray = [...(prev[section as keyof typeof prev] as string[])]
      newArray.splice(index, 1)
      return {
        ...prev,
        [section]: newArray,
      }
    })
  }

  const handleObjectArrayChange = (section: string, id: string, field: string, value: string | boolean) => {
    setResumeData((prev) => {
      const array = prev[section as keyof typeof prev] as any[]
      const newArray = array.map((item) => (item.id === id ? { ...item, [field]: value } : item))
      return {
        ...prev,
        [section]: newArray,
      }
    })
  }

  const handleAddObjectArrayItem = (section: string) => {
    setResumeData((prev) => {
      const array = prev[section as keyof typeof prev] as any[]
      const newId = `${section.slice(0, 4)}${Date.now()}`

      let newItem = {}

      if (section === "workExperience") {
        newItem = {
          id: newId,
          title: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          current: false,
          description: "",
          achievements: [""],
        }
      } else if (section === "education") {
        newItem = {
          id: newId,
          degree: "",
          institution: "",
          location: "",
          startDate: "",
          endDate: "",
          description: "",
        }
      } else if (section === "projects") {
        newItem = {
          id: newId,
          title: "",
          description: "",
          technologies: "",
          link: "",
          startDate: "",
          endDate: "",
        }
      } else if (section === "certifications") {
        newItem = {
          id: newId,
          name: "",
          issuer: "",
          date: "",
          description: "",
        }
      }

      return {
        ...prev,
        [section]: [...array, newItem],
      }
    })
  }

  const handleRemoveObjectArrayItem = (section: string, id: string) => {
    setResumeData((prev) => {
      const array = prev[section as keyof typeof prev] as any[]
      return {
        ...prev,
        [section]: array.filter((item) => item.id !== id),
      }
    })
  }

  const handleAddAchievement = (expId: string) => {
    setResumeData((prev) => {
      const workExperience = [...prev.workExperience]
      const expIndex = workExperience.findIndex((exp) => exp.id === expId)

      if (expIndex !== -1 && workExperience[expIndex]) {
        workExperience[expIndex] = {
          ...workExperience[expIndex],
          achievements: [...(workExperience[expIndex] ? workExperience[expIndex].achievements : undefined), ""],
        }
      }

      return {
        ...prev,
        workExperience,
      }
    })
  }

  const handleRemoveAchievement = (expId: string, index: number) => {
    setResumeData((prev) => {
      const workExperience = [...prev.workExperience]
      const expIndex = workExperience.findIndex((exp) => exp.id === expId)

      if (expIndex !== -1 && workExperience[expIndex]) {
        const achievements = [...(workExperience[expIndex] ? workExperience[expIndex].achievements : undefined)]
        achievements.splice(index, 1)

        workExperience[expIndex] = {
          ...workExperience[expIndex],
          achievements,
        }
      }

      return {
        ...prev,
        workExperience,
      }
    })
  }

  const handleAchievementChange = (expId: string, index: number, value: string) => {
    setResumeData((prev) => {
      const workExperience = [...prev.workExperience]
      const expIndex = workExperience.findIndex((exp) => exp.id === expId)

      if (expIndex !== -1 && workExperience[expIndex]) {
        const achievements = [...(workExperience[expIndex] ? workExperience[expIndex].achievements : undefined)]
        achievements[index] = value

        workExperience[expIndex] = {
          ...workExperience[expIndex],
          achievements,
        }
      }

      return {
        ...prev,
        workExperience,
      }
    })
  }

  const handleNext = () => {
    // Validate current step
    if (step === 1) {
      if (!resumeData.fullName || !resumeData.email) {
        toast({
          title: "Missing information",
          description: "Please fill in your name and email before proceeding.",
          variant: "destructive",
        })
        return
      }
    }

    setStep((prev) => prev + 1)
    window.scrollTo(0, 0)
  }

  const handleBack = () => {
    setStep((prev) => prev - 1)
    window.scrollTo(0, 0)
  }

  const handleSaveResume = () => {
    // In a real app, this would save the resume to a database or generate a PDF
    toast({
      title: "Resume saved",
      description: "Your resume has been saved successfully.",
    })
  }

  const handleDownloadResume = () => {
    // In a real app, this would generate and download a PDF
    toast({
      title: "Resume downloaded",
      description: "Your resume has been downloaded as a PDF.",
    })
  }

  return (
          <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8">
          <Link href="/jobs" className="flex items-center text-[#0F7377] hover:underline mb-4">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Jobs
          </Link>
          <h1 className="text-3xl font-bold mb-4">Resume Builder</h1>
          <p className="text-[#334155] max-w-3xl">
            Create a professional resume that highlights your skills and experience. Our builder makes it easy to create
            a standout resume that will get you noticed by employers.
          </p>
        </div>

        <Stepper className="mb-10">
          <Step>
            <StepIndicator>
              <StepStatus>
                <CheckCircle2 className="h-4 w-4" />
              </StepStatus>
            </StepIndicator>
            <StepTitle>Personal Information</StepTitle>
            <StepDescription>Contact details and summary</StepDescription>
            <StepSeparator />
          </Step>
          <Step>
            <StepIndicator>
              <StepStatus>
                <CheckCircle2 className="h-4 w-4" />
              </StepStatus>
            </StepIndicator>
            <StepTitle>Experience & Education</StepTitle>
            <StepDescription>Work history and education</StepDescription>
            <StepSeparator />
          </Step>
          <Step>
            <StepIndicator>
              <StepStatus>
                <CheckCircle2 className="h-4 w-4" />
              </StepStatus>
            </StepIndicator>
            <StepTitle>Skills & Projects</StepTitle>
            <StepDescription>Skills and project highlights</StepDescription>
            <StepSeparator />
          </Step>
          <Step>
            <StepIndicator>
              <StepStatus>
                <CheckCircle2 className="h-4 w-4" />
              </StepStatus>
            </StepIndicator>
            <StepTitle>Additional Sections</StepTitle>
            <StepDescription>Certifications and more</StepDescription>
            <StepSeparator />
          </Step>
          <Step>
            <StepIndicator>
              <StepStatus>
                <CheckCircle2 className="h-4 w-4" />
              </StepStatus>
            </StepIndicator>
            <StepTitle>Design & Preview</StepTitle>
            <StepDescription>Customize and finalize</StepDescription>
          </Step>
        </Stepper>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>
                  {step === 1 && "Personal Information"}
                  {step === 2 && "Experience & Education"}
                  {step === 3 && "Skills & Projects"}
                  {step === 4 && "Additional Sections"}
                  {step === 5 && "Design & Preview"}
                </CardTitle>
                <CardDescription>
                  {step === 1 && "Add your contact information and professional summary"}
                  {step === 2 && "Add your work experience and education history"}
                  {step === 3 && "Highlight your skills and notable projects"}
                  {step === 4 && "Include certifications and other relevant information"}
                  {step === 5 && "Choose a template and preview your resume"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="fullName">Full Name*</Label>
                      <Input
                        id="fullName"
                        value={resumeData.fullName}
                        onChange={(e) => handleChange("", "fullName", e.target.value)}
                        placeholder="e.g. John Smith"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email Address*</Label>
                        <Input
                          id="email"
                          type="email"
                          value={resumeData.email}
                          onChange={(e) => handleChange("", "email", e.target.value)}
                          placeholder="e.g. john.smith@example.com"
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={resumeData.phone}
                          onChange={(e) => handleChange("", "phone", e.target.value)}
                          placeholder="e.g. +65 9123 4567"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={resumeData.location}
                        onChange={(e) => handleChange("", "location", e.target.value)}
                        placeholder="e.g. Singapore, Singapore"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="website">Website/Portfolio (Optional)</Label>
                        <Input
                          id="website"
                          value={resumeData.website}
                          onChange={(e) => handleChange("", "website", e.target.value)}
                          placeholder="e.g. https://johnsmith.com"
                        />
                      </div>

                      <div>
                        <Label htmlFor="linkedin">LinkedIn (Optional)</Label>
                        <Input
                          id="linkedin"
                          value={resumeData.linkedin}
                          onChange={(e) => handleChange("", "linkedin", e.target.value)}
                          placeholder="e.g. linkedin.com/in/johnsmith"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="summary">Professional Summary</Label>
                      <Textarea
                        id="summary"
                        value={resumeData.summary}
                        onChange={(e) => handleChange("", "summary", e.target.value)}
                        placeholder="Write a brief summary of your professional background, skills, and career goals..."
                        rows={4}
                      />
                    </div>

                    <div className="flex justify-end space-x-4">
                      <Button onClick={handleNext} className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                        Next Step
                      </Button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-8">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium">Work Experience</h3>
                        <Button variant="outline" size="sm" onClick={() => handleAddObjectArrayItem("workExperience")}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Experience
                        </Button>
                      </div>

                      <div className="space-y-6">
                        {resumeData.workExperience.map((exp) => (
                          <Card key={exp.id} className="border border-muted">
                            <CardContent className="p-4 space-y-4">
                              <div className="flex justify-between items-start">
                                <h4 className="font-medium">Position Details</h4>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleRemoveObjectArrayItem("workExperience", exp.id)}
                                  className="h-8 w-8 text-destructive"
                                >
                                  <Trash2 className="h-4 w-4" />
                                  <span className="sr-only">Remove experience</span>
                                </Button>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor={`title-${exp.id}`}>Job Title</Label>
                                  <Input
                                    id={`title-${exp.id}`}
                                    value={exp.title}
                                    onChange={(e) =>
                                      handleObjectArrayChange("workExperience", exp.id, "title", e.target.value)
                                    }
                                    placeholder="e.g. Senior Software Engineer"
                                  />
                                </div>

                                <div>
                                  <Label htmlFor={`company-${exp.id}`}>Company</Label>
                                  <Input
                                    id={`company-${exp.id}`}
                                    value={exp.company}
                                    onChange={(e) =>
                                      handleObjectArrayChange("workExperience", exp.id, "company", e.target.value)
                                    }
                                    placeholder="e.g. TechNova Solutions"
                                  />
                                </div>
                              </div>

                              <div>
                                <Label htmlFor={`location-${exp.id}`}>Location</Label>
                                <Input
                                  id={`location-${exp.id}`}
                                  value={exp.location}
                                  onChange={(e) =>
                                    handleObjectArrayChange("workExperience", exp.id, "location", e.target.value)
                                  }
                                  placeholder="e.g. Singapore, Singapore"
                                />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor={`startDate-${exp.id}`}>Start Date</Label>
                                  <Input
                                    id={`startDate-${exp.id}`}
                                    value={exp.startDate}
                                    onChange={(e) =>
                                      handleObjectArrayChange("workExperience", exp.id, "startDate", e.target.value)
                                    }
                                    placeholder="e.g. June 2020"
                                  />
                                </div>

                                <div>
                                  <Label htmlFor={`endDate-${exp.id}`}>End Date</Label>
                                  <div className="space-y-2">
                                    <Input
                                      id={`endDate-${exp.id}`}
                                      value={exp.endDate}
                                      onChange={(e) =>
                                        handleObjectArrayChange("workExperience", exp.id, "endDate", e.target.value)
                                      }
                                      placeholder="e.g. Present"
                                      disabled={exp.current}
                                    />
                                    <div className="flex items-center space-x-2">
                                      <input
                                        type="checkbox"
                                        id={`current-${exp.id}`}
                                        checked={exp.current}
                                        onChange={(e) =>
                                          handleObjectArrayChange("workExperience", exp.id, "current", e.target.checked)
                                        }
                                      />
                                      <Label htmlFor={`current-${exp.id}`} className="font-normal text-sm">
                                        I currently work here
                                      </Label>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <Label htmlFor={`description-${exp.id}`}>Job Description</Label>
                                <Textarea
                                  id={`description-${exp.id}`}
                                  value={exp.description}
                                  onChange={(e) =>
                                    handleObjectArrayChange("workExperience", exp.id, "description", e.target.value)
                                  }
                                  placeholder="Describe your responsibilities and role..."
                                  rows={3}
                                />
                              </div>

                              <div>
                                <div className="flex items-center justify-between mb-2">
                                  <Label>Key Achievements</Label>
                                  <Button variant="outline" size="sm" onClick={() => handleAddAchievement(exp.id)}>
                                    <Plus className="h-3 w-3 mr-1" />
                                    Add
                                  </Button>
                                </div>
                                <div className="space-y-2">
                                  {exp.achievements.map((achievement, index) => (
                                    <div key={index} className="flex gap-2">
                                      <Input
                                        value={achievement}
                                        onChange={(e) => handleAchievementChange(exp.id, index, e.target.value)}
                                        placeholder={`Achievement ${index + 1}`}
                                      />
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleRemoveAchievement(exp.id, index)}
                                        className="h-10 w-10 text-destructive"
                                        disabled={exp.achievements.length <= 1}
                                      >
                                        <X className="h-4 w-4" />
                                        <span className="sr-only">Remove achievement</span>
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium">Education</h3>
                        <Button variant="outline" size="sm" onClick={() => handleAddObjectArrayItem("education")}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Education
                        </Button>
                      </div>

                      <div className="space-y-6">
                        {resumeData.education.map((edu) => (
                          <Card key={edu.id} className="border border-muted">
                            <CardContent className="p-4 space-y-4">
                              <div className="flex justify-between items-start">
                                <h4 className="font-medium">Education Details</h4>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleRemoveObjectArrayItem("education", edu.id)}
                                  className="h-8 w-8 text-destructive"
                                >
                                  <Trash2 className="h-4 w-4" />
                                  <span className="sr-only">Remove education</span>
                                </Button>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor={`degree-${edu.id}`}>Degree/Certificate</Label>
                                  <Input
                                    id={`degree-${edu.id}`}
                                    value={edu.degree}
                                    onChange={(e) =>
                                      handleObjectArrayChange("education", edu.id, "degree", e.target.value)
                                    }
                                    placeholder="e.g. Bachelor of Science in Computer Science"
                                  />
                                </div>

                                <div>
                                  <Label htmlFor={`institution-${edu.id}`}>Institution</Label>
                                  <Input
                                    id={`institution-${edu.id}`}
                                    value={edu.institution}
                                    onChange={(e) =>
                                      handleObjectArrayChange("education", edu.id, "institution", e.target.value)
                                    }
                                    placeholder="e.g. National University of Singapore"
                                  />
                                </div>
                              </div>

                              <div>
                                <Label htmlFor={`location-${edu.id}`}>Location</Label>
                                <Input
                                  id={`location-${edu.id}`}
                                  value={edu.location}
                                  onChange={(e) =>
                                    handleObjectArrayChange("education", edu.id, "location", e.target.value)
                                  }
                                  placeholder="e.g. Singapore, Singapore"
                                />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor={`startDate-${edu.id}`}>Start Date</Label>
                                  <Input
                                    id={`startDate-${edu.id}`}
                                    value={edu.startDate}
                                    onChange={(e) =>
                                      handleObjectArrayChange("education", edu.id, "startDate", e.target.value)
                                    }
                                    placeholder="e.g. September 2016"
                                  />
                                </div>

                                <div>
                                  <Label htmlFor={`endDate-${edu.id}`}>End Date</Label>
                                  <Input
                                    id={`endDate-${edu.id}`}
                                    value={edu.endDate}
                                    onChange={(e) =>
                                      handleObjectArrayChange("education", edu.id, "endDate", e.target.value)
                                    }
                                    placeholder="e.g. May 2020"
                                  />
                                </div>
                              </div>

                              <div>
                                <Label htmlFor={`description-${edu.id}`}>Description (Optional)</Label>
                                <Textarea
                                  id={`description-${edu.id}`}
                                  value={edu.description}
                                  onChange={(e) =>
                                    handleObjectArrayChange("education", edu.id, "description", e.target.value)
                                  }
                                  placeholder="Relevant coursework, achievements, activities..."
                                  rows={3}
                                />
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between space-x-4">
                      <Button variant="outline" onClick={handleBack}>
                        Back
                      </Button>
                      <Button onClick={handleNext} className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                        Next Step
                      </Button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-8">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium">Skills</h3>
                        <Button variant="outline" size="sm" onClick={() => handleAddArrayItem("skills")}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Skill
                        </Button>
                      </div>

                      <div className="space-y-2">
                        {resumeData.skills.map((skill, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              value={skill}
                              onChange={(e) => handleArrayChange("skills", index, e.target.value)}
                              placeholder={`Skill ${index + 1}`}
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveArrayItem("skills", index)}
                              className="h-10 w-10 text-destructive"
                              disabled={resumeData.skills.length <= 1}
                            >
                              <X className="h-4 w-4" />
                              <span className="sr-only">Remove skill</span>
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium">Projects</h3>
                        <Button variant="outline" size="sm" onClick={() => handleAddObjectArrayItem("projects")}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Project
                        </Button>
                      </div>

                      <div className="space-y-6">
                        {resumeData.projects.map((project) => (
                          <Card key={project.id} className="border border-muted">
                            <CardContent className="p-4 space-y-4">
                              <div className="flex justify-between items-start">
                                <h4 className="font-medium">Project Details</h4>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleRemoveObjectArrayItem("projects", project.id)}
                                  className="h-8 w-8 text-destructive"
                                >
                                  <Trash2 className="h-4 w-4" />
                                  <span className="sr-only">Remove project</span>
                                </Button>
                              </div>

                              <div>
                                <Label htmlFor={`title-${project.id}`}>Project Title</Label>
                                <Input
                                  id={`title-${project.id}`}
                                  value={project.title}
                                  onChange={(e) =>
                                    handleObjectArrayChange("projects", project.id, "title", e.target.value)
                                  }
                                  placeholder="e.g. E-commerce Platform"
                                />
                              </div>

                              <div>
                                <Label htmlFor={`description-${project.id}`}>Description</Label>
                                <Textarea
                                  id={`description-${project.id}`}
                                  value={project.description}
                                  onChange={(e) =>
                                    handleObjectArrayChange("projects", project.id, "description", e.target.value)
                                  }
                                  placeholder="Describe the project, your role, and outcomes..."
                                  rows={3}
                                />
                              </div>

                              <div>
                                <Label htmlFor={`technologies-${project.id}`}>Technologies Used</Label>
                                <Input
                                  id={`technologies-${project.id}`}
                                  value={project.technologies}
                                  onChange={(e) =>
                                    handleObjectArrayChange("projects", project.id, "technologies", e.target.value)
                                  }
                                  placeholder="e.g. React, Node.js, MongoDB"
                                />
                              </div>

                              <div>
                                <Label htmlFor={`link-${project.id}`}>Project Link (Optional)</Label>
                                <Input
                                  id={`link-${project.id}`}
                                  value={project.link}
                                  onChange={(e) =>
                                    handleObjectArrayChange("projects", project.id, "link", e.target.value)
                                  }
                                  placeholder="e.g. https://github.com/username/project"
                                />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor={`startDate-${project.id}`}>Start Date</Label>
                                  <Input
                                    id={`startDate-${project.id}`}
                                    value={project.startDate}
                                    onChange={(e) =>
                                      handleObjectArrayChange("projects", project.id, "startDate", e.target.value)
                                    }
                                    placeholder="e.g. January 2022"
                                  />
                                </div>

                                <div>
                                  <Label htmlFor={`endDate-${project.id}`}>End Date</Label>
                                  <Input
                                    id={`endDate-${project.id}`}
                                    value={project.endDate}
                                    onChange={(e) =>
                                      handleObjectArrayChange("projects", project.id, "endDate", e.target.value)
                                    }
                                    placeholder="e.g. March 2022 or Ongoing"
                                  />
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between space-x-4">
                      <Button variant="outline" onClick={handleBack}>
                        Back
                      </Button>
                      <Button onClick={handleNext} className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                        Next Step
                      </Button>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-8">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium">Certifications</h3>
                        <Button variant="outline" size="sm" onClick={() => handleAddObjectArrayItem("certifications")}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Certification
                        </Button>
                      </div>

                      <div className="space-y-6">
                        {resumeData.certifications.map((cert) => (
                          <Card key={cert.id} className="border border-muted">
                            <CardContent className="p-4 space-y-4">
                              <div className="flex justify-between items-start">
                                <h4 className="font-medium">Certification Details</h4>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleRemoveObjectArrayItem("certifications", cert.id)}
                                  className="h-8 w-8 text-destructive"
                                >
                                  <Trash2 className="h-4 w-4" />
                                  <span className="sr-only">Remove certification</span>
                                </Button>
                              </div>

                              <div>
                                <Label htmlFor={`name-${cert.id}`}>Certification Name</Label>
                                <Input
                                  id={`name-${cert.id}`}
                                  value={cert.name}
                                  onChange={(e) =>
                                    handleObjectArrayChange("certifications", cert.id, "name", e.target.value)
                                  }
                                  placeholder="e.g. AWS Certified Solutions Architect"
                                />
                              </div>

                              <div>
                                <Label htmlFor={`issuer-${cert.id}`}>Issuing Organization</Label>
                                <Input
                                  id={`issuer-${cert.id}`}
                                  value={cert.issuer}
                                  onChange={(e) =>
                                    handleObjectArrayChange("certifications", cert.id, "issuer", e.target.value)
                                  }
                                  placeholder="e.g. Amazon Web Services"
                                />
                              </div>

                              <div>
                                <Label htmlFor={`date-${cert.id}`}>Date Issued</Label>
                                <Input
                                  id={`date-${cert.id}`}
                                  value={cert.date}
                                  onChange={(e) =>
                                    handleObjectArrayChange("certifications", cert.id, "date", e.target.value)
                                  }
                                  placeholder="e.g. May 2022"
                                />
                              </div>

                              <div>
                                <Label htmlFor={`description-${cert.id}`}>Description (Optional)</Label>
                                <Textarea
                                  id={`description-${cert.id}`}
                                  value={cert.description}
                                  onChange={(e) =>
                                    handleObjectArrayChange("certifications", cert.id, "description", e.target.value)
                                  }
                                  placeholder="Additional details about the certification..."
                                  rows={2}
                                />
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between space-x-4">
                      <Button variant="outline" onClick={handleBack}>
                        Back
                      </Button>
                      <Button onClick={handleNext} className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                        Next Step
                      </Button>
                    </div>
                  </div>
                )}

                {step === 5 && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Template & Design</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card
                          className={`border cursor-pointer ${resumeData.template === "modern" ? "ring-2 ring-[#0F7377]" : ""}`}
                          onClick={() => handleChange("", "template", "modern")}
                        >
                          <CardContent className="p-4 text-center">
                            <div className="h-40 bg-gray-100 mb-2 flex items-center justify-center">
                              <FileText className="h-12 w-12 text-gray-400" />
                            </div>
                            <p className="font-medium">Modern</p>
                          </CardContent>
                        </Card>

                        <Card
                          className={`border cursor-pointer ${resumeData.template === "classic" ? "ring-2 ring-[#0F7377]" : ""}`}
                          onClick={() => handleChange("", "template", "classic")}
                        >
                          <CardContent className="p-4 text-center">
                            <div className="h-40 bg-gray-100 mb-2 flex items-center justify-center">
                              <FileText className="h-12 w-12 text-gray-400" />
                            </div>
                            <p className="font-medium">Classic</p>
                          </CardContent>
                        </Card>

                        <Card
                          className={`border cursor-pointer ${resumeData.template === "creative" ? "ring-2 ring-[#0F7377]" : ""}`}
                          onClick={() => handleChange("", "template", "creative")}
                        >
                          <CardContent className="p-4 text-center">
                            <div className="h-40 bg-gray-100 mb-2 flex items-center justify-center">
                              <FileText className="h-12 w-12 text-gray-400" />
                            </div>
                            <p className="font-medium">Creative</p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="accentColor">Accent Color</Label>
                        <div className="flex gap-4 mt-2">
                          {["#0F7377", "#2563EB", "#7C3AED", "#EC4899", "#F59E0B", "#10B981"].map((color) => (
                            <div
                              key={color}
                              className={`h-8 w-8 rounded-full cursor-pointer ${resumeData.accentColor === color ? "ring-2 ring-offset-2 ring-gray-400" : ""}`}
                              style={{ backgroundColor: color }}
                              onClick={() => handleChange("", "accentColor", color)}
                            />
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="fontSize">Font Size</Label>
                        <Select
                          value={resumeData.fontSize}
                          onValueChange={(value) => handleChange("", "fontSize", value)}
                        >
                          <SelectTrigger id="fontSize">
                            <SelectValue placeholder="Select font size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="small">Small</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="large">Large</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-4">Resume Preview</h3>
                      <Card>
                        <CardContent className="p-6">
                          <div className="bg-gray-100 h-[600px] rounded-md flex items-center justify-center">
                            <div className="text-center">
                              <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                              <p className="text-lg font-medium mb-2">Resume Preview</p>
                              <p className="text-sm text-gray-500 mb-4">
                                This is where you would see a preview of your resume with the selected template and
                                design options.
                              </p>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-2" />
                                View Full Preview
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="flex justify-between space-x-4">
                      <Button variant="outline" onClick={handleBack}>
                        Back
                      </Button>
                      <div className="space-x-2">
                        <Button variant="outline" onClick={handleSaveResume}>
                          Save Resume
                        </Button>
                        <Button onClick={handleDownloadResume} className="bg-[#0F7377] hover:bg-[#0F7377]/90">
                          <Download className="h-4 w-4 mr-2" />
                          Download PDF
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <div className="sticky top-24 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Resume Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-1">Keep it concise</h4>
                      <p className="text-sm text-[#334155]">
                        Aim for a 1-2 page resume that highlights your most relevant experience and skills.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-1">Use action verbs</h4>
                      <p className="text-sm text-[#334155]">
                        Start bullet points with strong action verbs like &ldquo;Developed,&rdquo; &ldquo;Managed,&rdquo; or &ldquo;Increased.&rdquo;
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-1">Quantify achievements</h4>
                      <p className="text-sm text-[#334155]">
                        Include numbers and percentages to demonstrate your impact (e.g., &ldquo;Increased sales by 20%&rdquo;).
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-1">Tailor to the job</h4>
                      <p className="text-sm text-[#334155]">
                        Customize your resume for each application to highlight relevant skills and experience.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-1">Proofread carefully</h4>
                      <p className="text-sm text-[#334155]">
                        Check for spelling and grammar errors. Consider having someone else review it as well.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Resume Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Personal Information</span>
                        <span className="text-sm font-medium">
                          {resumeData.fullName && resumeData.email ? "100%" : "0%"}
                        </span>
                      </div>
                      <Progress value={resumeData.fullName && resumeData.email ? 100 : 0} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Work Experience</span>
                        <span className="text-sm font-medium">
                          {resumeData.workExperience.some((exp) => exp.title && exp.company) ? "100%" : "0%"}
                        </span>
                      </div>
                      <Progress
                        value={resumeData.workExperience.some((exp) => exp.title && exp.company) ? 100 : 0}
                        className="h-2"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Education</span>
                        <span className="text-sm font-medium">
                          {resumeData.education.some((edu) => edu.degree && edu.institution) ? "100%" : "0%"}
                        </span>
                      </div>
                      <Progress
                        value={resumeData.education.some((edu) => edu.degree && edu.institution) ? 100 : 0}
                        className="h-2"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Skills</span>
                        <span className="text-sm font-medium">
                          {resumeData.skills.some((skill) => skill) ? "100%" : "0%"}
                        </span>
                      </div>
                      <Progress value={resumeData.skills.some((skill) => skill) ? 100 : 0} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
}
