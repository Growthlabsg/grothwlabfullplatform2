/**
 * Mock resource data for development and testing
 *
 * This file contains additional mock resource data that can be used
 * throughout the application without changing any UI/UX components.
 */

export const mockStartupToolkits = [
  {
    id: "toolkit-1",
    title: "Founder's Toolkit",
    description: "Essential tools and templates for first-time founders",
    items: [
      { id: "guide-7", type: "guide" },
      { id: "template-7", type: "template" },
      { id: "template-8", type: "template" },
      { id: "video-7", type: "video" },
    ],
    featured: true,
  },
  {
    id: "toolkit-2",
    title: "Growth Toolkit",
    description: "Resources for scaling your startup",
    items: [
      { id: "guide-8", type: "guide" },
      { id: "video-8", type: "video" },
      { id: "webinar-7", type: "webinar" },
      { id: "template-9", type: "template" },
    ],
    featured: true,
  },
  {
    id: "toolkit-3",
    title: "International Expansion Toolkit",
    description: "Resources for expanding your startup globally",
    items: [
      { id: "webinar-8", type: "webinar" },
      { id: "guide-9", type: "guide" },
      { id: "template-8", type: "template" },
      { id: "video-9", type: "video" },
    ],
    featured: false,
  },
  {
    id: "toolkit-4",
    title: "Technical Founder's Toolkit",
    description: "Resources for technical founders and CTOs",
    items: [
      { id: "webinar-7", type: "webinar" },
      { id: "webinar-9", type: "webinar" },
      { id: "video-9", type: "video" },
      { id: "guide-7", type: "guide" },
    ],
    featured: false,
  },
  {
    id: "toolkit-5",
    title: "Fundraising Toolkit",
    description: "Resources for raising capital for your startup",
    items: [
      { id: "video-7", type: "video" },
      { id: "template-7", type: "template" },
      { id: "guide-8", type: "guide" },
      { id: "webinar-8", type: "webinar" },
    ],
    featured: true,
  },
]

export const mockResourceCollections = [
  {
    id: "collection-1",
    title: "Starting a Business in Singapore",
    description: "Everything you need to know about starting a business in Singapore",
    resources: [
      { id: "guide-7", type: "guide" },
      { id: "template-7", type: "template" },
      { id: "video-7", type: "video" },
      { id: "webinar-7", type: "webinar" },
    ],
    curator: "GrowthLab Team",
    featured: true,
  },
  {
    id: "collection-2",
    title: "Product Development Resources",
    description: "Resources for building and launching your product",
    resources: [
      { id: "guide-9", type: "guide" },
      { id: "template-8", type: "template" },
      { id: "template-9", type: "template" },
      { id: "video-8", type: "video" },
    ],
    curator: "Product Team at GrowthLab",
    featured: false,
  },
  {
    id: "collection-3",
    title: "Startup Sales Resources",
    description: "Resources for building your sales process",
    resources: [
      { id: "guide-8", type: "guide" },
      { id: "video-9", type: "video" },
      { id: "webinar-8", type: "webinar" },
      { id: "template-9", type: "template" },
    ],
    curator: "Sales Team at GrowthLab",
    featured: true,
  },
  {
    id: "collection-4",
    title: "AI for Startups",
    description: "Resources for implementing AI in your startup",
    resources: [
      { id: "webinar-9", type: "webinar" },
      { id: "video-8", type: "video" },
      { id: "guide-9", type: "guide" },
      { id: "template-8", type: "template" },
    ],
    curator: "Tech Team at GrowthLab",
    featured: false,
  },
  {
    id: "collection-5",
    title: "Startup Team Building",
    description: "Resources for building and managing your team",
    resources: [
      { id: "guide-9", type: "guide" },
      { id: "webinar-7", type: "webinar" },
      { id: "video-7", type: "video" },
      { id: "template-7", type: "template" },
    ],
    curator: "HR Team at GrowthLab",
    featured: true,
  },
]

export const mockResourceAuthors = [
  {
    id: "author-1",
    name: "Legal Team at GrowthLab",
    bio: "Experts in startup law and compliance in Singapore and Southeast Asia.",
    avatar: "/abstract-geometric-shapes.png",
    resources: [{ id: "guide-7", type: "guide" }],
  },
  {
    id: "author-2",
    name: "Sales Team at GrowthLab",
    bio: "Experienced sales leaders helping startups build effective sales processes.",
    avatar: "/rising-tide-startups.png",
    resources: [{ id: "guide-8", type: "guide" }],
  },
  {
    id: "author-3",
    name: "HR Team at GrowthLab",
    bio: "HR specialists focused on startup hiring and team building.",
    avatar: "/collaborative-growth.png",
    resources: [{ id: "guide-9", type: "guide" }],
  },
  {
    id: "author-4",
    name: "Finance Team at GrowthLab",
    bio: "Financial experts helping startups manage their finances and fundraising.",
    avatar: "/abstract-geometric-shapes.png",
    resources: [{ id: "template-7", type: "template" }],
  },
  {
    id: "author-5",
    name: "Product Team at GrowthLab",
    bio: "Product managers and designers helping startups build great products.",
    avatar: "/rising-tide-startups.png",
    resources: [{ id: "template-8", type: "template" }],
  },
  {
    id: "author-6",
    name: "UX Team at GrowthLab",
    bio: "UX researchers and designers helping startups create user-centered products.",
    avatar: "/collaborative-growth.png",
    resources: [{ id: "template-9", type: "template" }],
  },
  {
    id: "author-7",
    name: "Investment Team at GrowthLab",
    bio: "Investment professionals with experience in venture capital and angel investing.",
    avatar: "/abstract-letter-jt.png",
    resources: [{ id: "video-7", type: "video" }],
  },
  {
    id: "author-8",
    name: "Growth Team at GrowthLab",
    bio: "Growth marketers and product managers helping startups scale.",
    avatar: "/abstract-ms-flow.png",
    resources: [{ id: "video-8", type: "video" }],
  },
  {
    id: "author-9",
    name: "Analytics Team at GrowthLab",
    bio: "Data analysts and scientists helping startups make data-driven decisions.",
    avatar: "/abstract-geometric-shapes.png",
    resources: [{ id: "video-9", type: "video" }],
  },
  {
    id: "author-10",
    name: "Engineering Team at GrowthLab",
    bio: "Software engineers and technical leaders helping startups build scalable products.",
    avatar: "/abstract-ms-flow.png",
    resources: [{ id: "webinar-7", type: "webinar" }],
  },
  {
    id: "author-11",
    name: "Global Team at GrowthLab",
    bio: "International expansion experts helping startups go global.",
    avatar: "/rising-tide-startups.png",
    resources: [{ id: "webinar-8", type: "webinar" }],
  },
  {
    id: "author-12",
    name: "Tech Team at GrowthLab",
    bio: "Technology experts helping startups leverage emerging technologies.",
    avatar: "/collaborative-growth.png",
    resources: [{ id: "webinar-9", type: "webinar" }],
  },
]
