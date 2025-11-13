import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { accessToken, profileType } = await request.json()
    
    if (!accessToken) {
      return NextResponse.json({ error: 'Access token required' }, { status: 400 })
    }

    let profileData = {}
    
    switch (profileType) {
      case 'basic':
        // Import basic profile
        const basicProfile = await fetch('https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedLastName,profilePicture,headline,summary)', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'X-Restli-Protocol-Version': '2.0.0',
          },
        })
        profileData.basic = await basicProfile.json()
        break
        
      case 'experience':
        // Import work experience
        const experience = await fetch('https://api.linkedin.com/v2/me?projection=(id,positions~)', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'X-Restli-Protocol-Version': '2.0.0',
          },
        })
        profileData.experience = await experience.json()
        break
        
      case 'education':
        // Import education
        const education = await fetch('https://api.linkedin.com/v2/me?projection=(id,educations~)', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'X-Restli-Protocol-Version': '2.0.0',
          },
        })
        profileData.education = await education.json()
        break
        
      case 'skills':
        // Import skills
        const skills = await fetch('https://api.linkedin.com/v2/me?projection=(id,skills~)', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'X-Restli-Protocol-Version': '2.0.0',
          },
        })
        profileData.skills = await skills.json()
        break
        
      case 'full':
        // Import full profile
        const fullProfile = await fetch('https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedLastName,profilePicture,headline,summary,positions~,educations~,skills~,volunteer~,certifications~,languages~,interests~)', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'X-Restli-Protocol-Version': '2.0.0',
          },
        })
        profileData.full = await fullProfile.json()
        break
        
      default:
        return NextResponse.json({ error: 'Invalid profile type' }, { status: 400 })
    }

    // Here you would typically:
    // 1. Parse the LinkedIn data
    // 2. Map it to your GrowthLab profile format
    // 3. Save to your database
    // 4. Return the mapped profile data

    return NextResponse.json({
      success: true,
      message: `Successfully imported ${profileType} profile`,
      data: profileData
    })
    
  } catch (error) {
    console.error('LinkedIn profile import error:', error)
    return NextResponse.json({ error: 'Failed to import profile' }, { status: 500 })
  }
}
