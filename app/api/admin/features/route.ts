import { NextRequest, NextResponse } from "next/server"
import type { PlatformFeature } from "@/types/auth"

// Mock database - in production, this would be your actual database
let features: PlatformFeature[] = [
  {
    id: "feed",
    name: "Social Feed",
    description: "Main social networking feed for users",
    category: "core",
    status: "live",
    phase: "phase1",
    launchDate: "2024-01-01",
    targetAudience: ["all"],
    dependencies: [],
    metrics: ["daily_active_users", "engagement_rate"],
    isEnabled: true,
    isPublic: true,
    requiresAuth: false,
    permissions: ["view:feed"],
    config: { maxPostsPerDay: 10 }
  },
  {
    id: "growthstarter",
    name: "GrowthStarter",
    description: "Crowdfunding platform for startups",
    category: "monetization",
    status: "beta",
    phase: "phase2",
    launchDate: "2024-03-01",
    targetAudience: ["startup", "investor"],
    dependencies: ["feed"],
    metrics: ["total_raised", "successful_campaigns"],
    isEnabled: true,
    isPublic: true,
    requiresAuth: true,
    permissions: ["view:growthstarter"],
    config: { minCampaignAmount: 1000 }
  },
  {
    id: "ai-matching",
    name: "AI Co-founder Matching",
    description: "AI-powered co-founder matching system",
    category: "growth",
    status: "development",
    phase: "phase3",
    targetAudience: ["startup"],
    dependencies: ["feed"],
    metrics: ["match_success_rate", "user_satisfaction"],
    isEnabled: false,
    isPublic: false,
    requiresAuth: true,
    permissions: ["view:cofounder"],
    config: { algorithmVersion: "1.0" }
  }
]

export async function GET() {
  try {
    return NextResponse.json({ features })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch features" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const newFeature: PlatformFeature = {
      id: `feature_${Date.now()}`,
      name: body.name || "New Feature",
      description: body.description || "",
      category: body.category || "core",
      status: "development",
      phase: "phase1",
      targetAudience: body.targetAudience || [],
      dependencies: body.dependencies || [],
      metrics: body.metrics || [],
      isEnabled: false,
      isPublic: false,
      requiresAuth: true,
      permissions: body.permissions || [],
      config: body.config || {}
    }
    
    features.push(newFeature)
    
    return NextResponse.json({ 
      message: "Feature created successfully", 
      feature: newFeature 
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create feature" },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updates } = body
    
    const featureIndex = features.findIndex(f => f.id === id)
    if (featureIndex === -1) {
      return NextResponse.json(
        { error: "Feature not found" },
        { status: 404 }
      )
    }
    
    features[featureIndex] = { ...features[featureIndex], ...updates }
    
    return NextResponse.json({ 
      message: "Feature updated successfully", 
      feature: features[featureIndex] 
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update feature" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    
    if (!id) {
      return NextResponse.json(
        { error: "Feature ID is required" },
        { status: 400 }
      )
    }
    
    const featureIndex = features.findIndex(f => f.id === id)
    if (featureIndex === -1) {
      return NextResponse.json(
        { error: "Feature not found" },
        { status: 404 }
      )
    }
    
    features.splice(featureIndex, 1)
    
    return NextResponse.json({ 
      message: "Feature deleted successfully" 
    })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete feature" },
      { status: 500 }
    )
  }
}
