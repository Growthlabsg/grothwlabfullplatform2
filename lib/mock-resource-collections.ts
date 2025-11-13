/**
 * Mock resource collections for startups, investors, and students
 *
 * These collections group resources by audience type and topic
 * without changing any UI/UX components.
 */

export const startupResourceCollections = [
  {
    id: "startup-collection-1",
    title: "Early-Stage Startup Essentials",
    description: "Essential resources for founders at the early stages of their startup journey.",
    resources: [
      { id: "startup-guide-1", type: "guide" },
      { id: "startup-template-1", type: "template" },
      { id: "cross-guide-1", type: "guide" },
      { id: "cross-template-1", type: "template" },
    ],
    curator: "Startup Team at GrowthLab",
    featured: true,
  },
  {
    id: "startup-collection-2",
    title: "Growth-Stage Resources",
    description: "Resources for startups looking to scale and grow their business.",
    resources: [
      { id: "startup-guide-2", type: "guide" },
      { id: "startup-template-2", type: "template" },
      { id: "startup-video-1", type: "video" },
      { id: "cross-video-1", type: "video" },
    ],
    curator: "Growth Team at GrowthLab",
    featured: true,
  },
  {
    id: "startup-collection-3",
    title: "Startup Pivot & Strategy",
    description: "Resources for startups considering a pivot or strategic change.",
    resources: [
      { id: "startup-webinar-1", type: "webinar" },
      { id: "cross-guide-2", type: "guide" },
      { id: "cross-webinar-1", type: "webinar" },
      { id: "startup-template-2", type: "template" },
    ],
    curator: "Strategy Team at GrowthLab",
    featured: false,
  },
]

export const investorResourceCollections = [
  {
    id: "investor-collection-1",
    title: "Due Diligence Toolkit",
    description: "Essential resources for conducting thorough due diligence on potential investments.",
    resources: [
      { id: "investor-guide-1", type: "guide" },
      { id: "investor-template-1", type: "template" },
      { id: "investor-video-1", type: "video" },
      { id: "cross-template-1", type: "template" },
    ],
    curator: "Investment Team at GrowthLab",
    featured: true,
  },
  {
    id: "investor-collection-2",
    title: "Southeast Asian Market Insights",
    description: "Resources for understanding the Southeast Asian startup ecosystem.",
    resources: [
      { id: "investor-guide-2", type: "guide" },
      { id: "cross-guide-1", type: "guide" },
      { id: "cross-video-1", type: "video" },
      { id: "investor-webinar-1", type: "webinar" },
    ],
    curator: "Research Team at GrowthLab",
    featured: true,
  },
  {
    id: "investor-collection-3",
    title: "Portfolio Management Resources",
    description: "Resources for effectively managing your startup portfolio.",
    resources: [
      { id: "investor-template-2", type: "template" },
      { id: "cross-guide-2", type: "guide" },
      { id: "cross-webinar-1", type: "webinar" },
      { id: "investor-video-1", type: "video" },
    ],
    curator: "Portfolio Management Team at GrowthLab",
    featured: false,
  },
]

export const studentResourceCollections = [
  {
    id: "student-collection-1",
    title: "Student Entrepreneur Starter Pack",
    description: "Essential resources for students starting their entrepreneurial journey.",
    resources: [
      { id: "student-guide-1", type: "guide" },
      { id: "student-template-1", type: "template" },
      { id: "student-video-1", type: "video" },
      { id: "cross-guide-1", type: "guide" },
    ],
    curator: "Education Team at GrowthLab",
    featured: true,
  },
  {
    id: "student-collection-2",
    title: "Academic Project Commercialization",
    description: "Resources for turning academic projects into viable businesses.",
    resources: [
      { id: "student-guide-2", type: "guide" },
      { id: "student-template-2", type: "template" },
      { id: "cross-template-1", type: "template" },
      { id: "cross-video-1", type: "video" },
    ],
    curator: "Innovation Team at GrowthLab",
    featured: true,
  },
  {
    id: "student-collection-3",
    title: "University Entrepreneurship Resources",
    description: "Resources for leveraging university support for your startup.",
    resources: [
      { id: "student-webinar-1", type: "webinar" },
      { id: "cross-guide-2", type: "guide" },
      { id: "cross-webinar-1", type: "webinar" },
      { id: "student-template-1", type: "template" },
    ],
    curator: "University Relations Team at GrowthLab",
    featured: false,
  },
]
