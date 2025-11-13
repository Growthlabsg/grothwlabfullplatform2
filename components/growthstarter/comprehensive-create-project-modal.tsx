"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Play, FileText } from "lucide-react"

interface ComprehensiveCreateProjectModalProps {
  isOpen: boolean
  onClose: () => void
  onCreateProject: (project: any) => void
}

export function ComprehensiveCreateProjectModal({ 
  isOpen, 
  onClose, 
  onCreateProject 
}: ComprehensiveCreateProjectModalProps) {
  const [step, setStep] = useState(1)
  const [project, setProject] = useState({
    title: '',
    description: '',
    shortDescription: '',
    category: 'technology',
    goal: 0,
    campaignDuration: 30,
    currency: 'USD',
    location: '',
    contactEmail: '',
    story: '',
    risks: '',
    timeline: '',
    tags: [] as string[],
    socialLinks: {
      website: '',
      twitter: '',
      facebook: '',
      instagram: '',
      linkedin: ''
    },
    image: '',
    images: [] as File[],
    videos: [] as File[],
    faq: [] as Array<{ question: string; answer: string }>,
    team: [] as Array<{ name: string; role: string; bio: string; avatar: string }>,
    rewards: [] as Array<{ amount: number; title: string; description: string }>,
    stretchGoals: [] as Array<{ amount: number; title: string; description: string }>,
    businessPlan: '',
    marketResearch: '',
    financialProjections: '',
    documents: [] as File[],
    shippingInfo: '',
    returnPolicy: '',
    estimatedDelivery: ''
  })

  const [currentTag, setCurrentTag] = useState('')
  const [currentFAQ, setCurrentFAQ] = useState({ question: '', answer: '' })
  const [currentTeamMember, setCurrentTeamMember] = useState({ name: '', role: '', bio: '', avatar: '' })
  const [currentReward, setCurrentReward] = useState({ amount: 0, title: '', description: '' })
  const [currentStretchGoal, setCurrentStretchGoal] = useState({ amount: 0, title: '', description: '' })

  const addTag = () => {
    if (currentTag.trim() && !project.tags.includes(currentTag.trim())) {
      setProject({ ...project, tags: [...project.tags, currentTag.trim()] })
      setCurrentTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setProject({ ...project, tags: project.tags.filter(tag => tag !== tagToRemove) })
  }

  const addFAQ = () => {
    if (currentFAQ.question && currentFAQ.answer) {
      setProject({ ...project, faq: [...project.faq, currentFAQ] })
      setCurrentFAQ({ question: '', answer: '' })
    }
  }

  const removeFAQ = (index: number) => {
    setProject({ ...project, faq: project.faq.filter((_, i) => i !== index) })
  }

  const addTeamMember = () => {
    if (currentTeamMember.name && currentTeamMember.role) {
      setProject({ ...project, team: [...project.team, currentTeamMember] })
      setCurrentTeamMember({ name: '', role: '', bio: '', avatar: '' })
    }
  }

  const removeTeamMember = (index: number) => {
    setProject({ ...project, team: project.team.filter((_, i) => i !== index) })
  }

  const addReward = () => {
    if (currentReward.amount > 0 && currentReward.title) {
      setProject({ ...project, rewards: [...project.rewards, currentReward] })
      setCurrentReward({ amount: 0, title: '', description: '' })
    }
  }

  const removeReward = (index: number) => {
    setProject({ ...project, rewards: project.rewards.filter((_, i) => i !== index) })
  }

  const addStretchGoal = () => {
    if (currentStretchGoal.amount > 0 && currentStretchGoal.title) {
      setProject({ ...project, stretchGoals: [...project.stretchGoals, currentStretchGoal] })
      setCurrentStretchGoal({ amount: 0, title: '', description: '' })
    }
  }

  const removeStretchGoal = (index: number) => {
    setProject({ ...project, stretchGoals: project.stretchGoals.filter((_, i) => i !== index) })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setProject({ ...project, images: [...project.images, ...files] })
  }

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setProject({ ...project, videos: [...project.videos, ...files] })
  }

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setProject({ ...project, documents: [...project.documents, ...files] })
  }

  const removeImage = (index: number) => {
    setProject({ ...project, images: project.images.filter((_, i) => i !== index) })
  }

  const removeVideo = (index: number) => {
    setProject({ ...project, videos: project.videos.filter((_, i) => i !== index) })
  }

  const removeDocument = (index: number) => {
    setProject({ ...project, documents: project.documents.filter((_, i) => i !== index) })
  }

  const nextStep = () => {
    if (step < 6) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = () => {
    onCreateProject(project)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[95vh] overflow-y-auto">
        {/* Header with Progress */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Create New Project</h3>
            <Button onClick={onClose} variant="ghost" size="sm">
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4, 5, 6].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  stepNum <= step 
                    ? 'bg-[#0F7377] text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                }`}>
                  {stepNum}
                </div>
                {stepNum < 6 && (
                  <div className={`w-8 h-0.5 mx-2 ${
                    stepNum < step ? 'bg-[#0F7377]' : 'bg-gray-200 dark:bg-gray-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Step {step} of 6: {
              step === 1 ? 'Basic Information' :
              step === 2 ? 'Project Details' :
              step === 3 ? 'Media & Content' :
              step === 4 ? 'Team & Rewards' :
              step === 5 ? 'Business & Legal' :
              'Review & Launch'
            }
          </div>
        </div>
        
        <div className="p-6">
          {/* Step 1: Basic Information */}
          {step === 1 && (
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Basic Information</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Project Title *
                  </label>
                  <Input
                    value={project.title}
                    onChange={(e) => setProject({...project, title: e.target.value})}
                    placeholder="Enter your project title"
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category *
                  </label>
                  <Select value={project.category} onValueChange={(value) => setProject({...project, category: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="art">Art</SelectItem>
                      <SelectItem value="games">Games</SelectItem>
                      <SelectItem value="music">Music</SelectItem>
                      <SelectItem value="publishing">Publishing</SelectItem>
                      <SelectItem value="food">Food</SelectItem>
                      <SelectItem value="fashion">Fashion</SelectItem>
                      <SelectItem value="health">Health</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Short Description *
                </label>
                <Input
                  value={project.shortDescription}
                  onChange={(e) => setProject({...project, shortDescription: e.target.value})}
                  placeholder="One-line description for your project"
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Description *
                </label>
                <Textarea
                  value={project.description}
                  onChange={(e) => setProject({...project, description: e.target.value})}
                  placeholder="Describe your project in detail..."
                  className="w-full min-h-[120px]"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Funding Goal ($) *
                  </label>
                  <Input
                    type="number"
                    value={project.goal}
                    onChange={(e) => setProject({...project, goal: parseInt(e.target.value) || 0})}
                    placeholder="50000"
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Campaign Duration (Days) *
                  </label>
                  <Input
                    type="number"
                    value={project.campaignDuration}
                    onChange={(e) => setProject({...project, campaignDuration: parseInt(e.target.value) || 30})}
                    placeholder="30"
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Currency
                  </label>
                  <Select value={project.currency} onValueChange={(value) => setProject({...project, currency: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                      <SelectItem value="SGD">SGD</SelectItem>
                      <SelectItem value="JPY">JPY</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Location
                  </label>
                  <Input
                    value={project.location}
                    onChange={(e) => setProject({...project, location: e.target.value})}
                    placeholder="City, Country"
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Contact Email *
                  </label>
                  <Input
                    type="email"
                    value={project.contactEmail}
                    onChange={(e) => setProject({...project, contactEmail: e.target.value})}
                    placeholder="your@email.com"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* Step 2: Project Details */}
          {step === 2 && (
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Project Details</h4>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Project Story *
                </label>
                <Textarea
                  value={project.story}
                  onChange={(e) => setProject({...project, story: e.target.value})}
                  placeholder="Tell your story. Why are you creating this project? What inspired you?"
                  className="w-full min-h-[150px]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Risks & Challenges
                </label>
                <Textarea
                  value={project.risks}
                  onChange={(e) => setProject({...project, risks: e.target.value})}
                  placeholder="What challenges might you face? How will you overcome them?"
                  className="w-full min-h-[100px]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Timeline & Milestones
                </label>
                <Textarea
                  value={project.timeline}
                  onChange={(e) => setProject({...project, timeline: e.target.value})}
                  placeholder="Project timeline and key milestones"
                  className="w-full min-h-[100px]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tags
                </label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    placeholder="Add a tag"
                    className="flex-1"
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  />
                  <Button onClick={addTag} size="sm">Add</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <button onClick={() => removeTag(tag)}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Social Links
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    value={project.socialLinks.website}
                    onChange={(e) => setProject({...project, socialLinks: {...project.socialLinks, website: e.target.value}})}
                    placeholder="Website URL"
                    className="w-full"
                  />
                  <Input
                    value={project.socialLinks.twitter}
                    onChange={(e) => setProject({...project, socialLinks: {...project.socialLinks, twitter: e.target.value}})}
                    placeholder="Twitter URL"
                    className="w-full"
                  />
                  <Input
                    value={project.socialLinks.facebook}
                    onChange={(e) => setProject({...project, socialLinks: {...project.socialLinks, facebook: e.target.value}})}
                    placeholder="Facebook URL"
                    className="w-full"
                  />
                  <Input
                    value={project.socialLinks.instagram}
                    onChange={(e) => setProject({...project, socialLinks: {...project.socialLinks, instagram: e.target.value}})}
                    placeholder="Instagram URL"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* Step 3: Media & Content */}
          {step === 3 && (
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Media & Content</h4>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Main Project Image URL *
                </label>
                <Input
                  value={project.image}
                  onChange={(e) => setProject({...project, image: e.target.value})}
                  placeholder="https://example.com/main-image.jpg"
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Additional Images
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Plus className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Click to upload images</p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB each</p>
                  </label>
                </div>
                {project.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
                    {project.images.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-24 object-cover rounded"
                        />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Project Videos
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    multiple
                    accept="video/*"
                    onChange={handleVideoUpload}
                    className="hidden"
                    id="video-upload"
                  />
                  <label htmlFor="video-upload" className="cursor-pointer">
                    <Play className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Click to upload videos</p>
                    <p className="text-xs text-gray-500">MP4, MOV, AVI up to 100MB each</p>
                  </label>
                </div>
                {project.videos.length > 0 && (
                  <div className="space-y-2 mt-4">
                    {project.videos.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">{file.name}</span>
                        <button
                          onClick={() => removeVideo(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  FAQ Section
                </label>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={currentFAQ.question}
                      onChange={(e) => setCurrentFAQ({...currentFAQ, question: e.target.value})}
                      placeholder="Question"
                      className="flex-1"
                    />
                    <Input
                      value={currentFAQ.answer}
                      onChange={(e) => setCurrentFAQ({...currentFAQ, answer: e.target.value})}
                      placeholder="Answer"
                      className="flex-1"
                    />
                    <Button onClick={addFAQ} size="sm">Add FAQ</Button>
                  </div>
                  {project.faq.map((faq, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-sm">{faq.question}</p>
                          <p className="text-sm text-gray-600 mt-1">{faq.answer}</p>
                        </div>
                        <button
                          onClick={() => removeFAQ(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Step 4: Team & Rewards */}
          {step === 4 && (
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Team & Rewards</h4>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Team Members
                </label>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      value={currentTeamMember.name}
                      onChange={(e) => setCurrentTeamMember({...currentTeamMember, name: e.target.value})}
                      placeholder="Name"
                    />
                    <Input
                      value={currentTeamMember.role}
                      onChange={(e) => setCurrentTeamMember({...currentTeamMember, role: e.target.value})}
                      placeholder="Role"
                    />
                    <Input
                      value={currentTeamMember.bio}
                      onChange={(e) => setCurrentTeamMember({...currentTeamMember, bio: e.target.value})}
                      placeholder="Bio"
                      className="md:col-span-2"
                    />
                    <Input
                      value={currentTeamMember.avatar}
                      onChange={(e) => setCurrentTeamMember({...currentTeamMember, avatar: e.target.value})}
                      placeholder="Avatar URL"
                      className="md:col-span-2"
                    />
                  </div>
                  <Button onClick={addTeamMember} size="sm">Add Team Member</Button>
                  
                  {project.team.map((member, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-sm">{member.name}</p>
                          <p className="text-sm text-gray-600">{member.role}</p>
                          <p className="text-xs text-gray-500 mt-1">{member.bio}</p>
                        </div>
                        <button
                          onClick={() => removeTeamMember(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Rewards & Perks
                </label>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      type="number"
                      value={currentReward.amount}
                      onChange={(e) => setCurrentReward({...currentReward, amount: parseInt(e.target.value) || 0})}
                      placeholder="Amount ($)"
                    />
                    <Input
                      value={currentReward.title}
                      onChange={(e) => setCurrentReward({...currentReward, title: e.target.value})}
                      placeholder="Reward Title"
                    />
                    <Button onClick={addReward} size="sm">Add Reward</Button>
                  </div>
                  <Textarea
                    value={currentReward.description}
                    onChange={(e) => setCurrentReward({...currentReward, description: e.target.value})}
                    placeholder="Reward Description"
                    className="w-full"
                  />
                  
                  {project.rewards.map((reward, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-sm">${reward.amount} - {reward.title}</p>
                          <p className="text-sm text-gray-600 mt-1">{reward.description}</p>
                        </div>
                        <button
                          onClick={() => removeReward(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Stretch Goals
                </label>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      type="number"
                      value={currentStretchGoal.amount}
                      onChange={(e) => setCurrentStretchGoal({...currentStretchGoal, amount: parseInt(e.target.value) || 0})}
                      placeholder="Goal Amount ($)"
                    />
                    <Input
                      value={currentStretchGoal.title}
                      onChange={(e) => setCurrentStretchGoal({...currentStretchGoal, title: e.target.value})}
                      placeholder="Goal Title"
                    />
                    <Button onClick={addStretchGoal} size="sm">Add Goal</Button>
                  </div>
                  <Textarea
                    value={currentStretchGoal.description}
                    onChange={(e) => setCurrentStretchGoal({...currentStretchGoal, description: e.target.value})}
                    placeholder="Goal Description"
                    className="w-full"
                  />
                  
                  {project.stretchGoals.map((goal, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-sm">${goal.amount} - {goal.title}</p>
                          <p className="text-sm text-gray-600 mt-1">{goal.description}</p>
                        </div>
                        <button
                          onClick={() => removeStretchGoal(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Step 5: Business & Legal */}
          {step === 5 && (
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Business & Legal</h4>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Business Plan
                </label>
                <Textarea
                  value={project.businessPlan}
                  onChange={(e) => setProject({...project, businessPlan: e.target.value})}
                  placeholder="Describe your business model and plan..."
                  className="w-full min-h-[100px]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Market Research
                </label>
                <Textarea
                  value={project.marketResearch}
                  onChange={(e) => setProject({...project, marketResearch: e.target.value})}
                  placeholder="Your market research and target audience analysis..."
                  className="w-full min-h-[100px]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Financial Projections
                </label>
                <Textarea
                  value={project.financialProjections}
                  onChange={(e) => setProject({...project, financialProjections: e.target.value})}
                  placeholder="Financial projections and budget breakdown..."
                  className="w-full min-h-[100px]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Legal Documents
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx"
                    onChange={handleDocumentUpload}
                    className="hidden"
                    id="document-upload"
                  />
                  <label htmlFor="document-upload" className="cursor-pointer">
                    <FileText className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Click to upload documents</p>
                    <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB each</p>
                  </label>
                </div>
                {project.documents.length > 0 && (
                  <div className="space-y-2 mt-4">
                    {project.documents.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">{file.name}</span>
                        <button
                          onClick={() => removeDocument(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Shipping Information
                  </label>
                  <Textarea
                    value={project.shippingInfo}
                    onChange={(e) => setProject({...project, shippingInfo: e.target.value})}
                    placeholder="Shipping details and costs..."
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Return Policy
                  </label>
                  <Textarea
                    value={project.returnPolicy}
                    onChange={(e) => setProject({...project, returnPolicy: e.target.value})}
                    placeholder="Return and refund policy..."
                    className="w-full"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Estimated Delivery Date
                </label>
                <Input
                  type="date"
                  value={project.estimatedDelivery}
                  onChange={(e) => setProject({...project, estimatedDelivery: e.target.value})}
                  className="w-full"
                />
              </div>
            </div>
          )}
          
          {/* Step 6: Review & Launch */}
          {step === 6 && (
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Review & Launch</h4>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <h5 className="font-semibold text-lg mb-4">Project Summary</h5>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium">Title:</span> {project.title}
                  </div>
                  <div>
                    <span className="font-medium">Category:</span> {project.category}
                  </div>
                  <div>
                    <span className="font-medium">Goal:</span> ${project.goal.toLocaleString()}
                  </div>
                  <div>
                    <span className="font-medium">Duration:</span> {project.campaignDuration} days
                  </div>
                  <div>
                    <span className="font-medium">Location:</span> {project.location}
                  </div>
                  <div>
                    <span className="font-medium">Tags:</span> {project.tags.join(', ')}
                  </div>
                  <div>
                    <span className="font-medium">Team Members:</span> {project.team.length}
                  </div>
                  <div>
                    <span className="font-medium">Rewards:</span> {project.rewards.length}
                  </div>
                  <div>
                    <span className="font-medium">Images:</span> {project.images.length}
                  </div>
                  <div>
                    <span className="font-medium">Videos:</span> {project.videos.length}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="rounded"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the Terms of Service and understand that this project will be publicly visible.
                </label>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="legal"
                  className="rounded"
                />
                <label htmlFor="legal" className="text-sm text-gray-600">
                  I confirm that all information provided is accurate and I have the right to create this project.
                </label>
              </div>
            </div>
          )}
          
          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button
              onClick={prevStep}
              disabled={step === 1}
              variant="outline"
            >
              Previous
            </Button>
            
            {step < 6 ? (
              <Button
                onClick={nextStep}
                className="bg-[#0F7377] hover:bg-[#0F7377]/90 text-white"
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="bg-[#0F7377] hover:bg-[#0F7377]/90 text-white"
              >
                Launch Project
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
