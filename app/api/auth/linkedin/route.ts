import { NextRequest, NextResponse } from 'next/server'

const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID
const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET
const LINKEDIN_REDIRECT_URI = process.env.LINKEDIN_REDIRECT_URI

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  
  if (!code) {
    return NextResponse.redirect(new URL('/login?error=no_code', request.url))
  }

  try {
    // Exchange authorization code for access token
    const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: LINKEDIN_CLIENT_ID!,
        client_secret: LINKEDIN_CLIENT_SECRET!,
        redirect_uri: LINKEDIN_REDIRECT_URI!,
      }),
    })

    const tokenData = await tokenResponse.json()
    
    if (!tokenResponse.ok) {
      throw new Error(`LinkedIn token error: ${tokenData.error_description || tokenData.error}`)
    }

    // Get user profile from LinkedIn
    const profileResponse = await fetch('https://api.linkedin.com/v2/me', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
        'X-Restli-Protocol-Version': '2.0.0',
      },
    })

    const profileData = await profileResponse.json()
    
    if (!profileResponse.ok) {
      throw new Error(`LinkedIn profile error: ${profileData.message || 'Failed to fetch profile'}`)
    }

    // Get email address
    const emailResponse = await fetch('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
        'X-Restli-Protocol-Version': '2.0.0',
      },
    })

    const emailData = await emailResponse.json()
    const email = emailData.elements?.[0]?.['handle~']?.emailAddress || ''

    const userProfile = {
      id: profileData.id,
      email,
      firstName: profileData.localizedFirstName,
      lastName: profileData.localizedLastName,
      profilePicture: profileData.profilePicture?.['displayImage~']?.elements?.[0]?.identifiers?.[0]?.identifier || '',
      provider: 'linkedin',
      accessToken: tokenData.access_token, // Store for profile import
      expiresAt: Date.now() + (tokenData.expires_in * 1000),
      // Add missing properties that the sidebar expects
      role: 'user',
      avatarUrl: profileData.profilePicture?.['displayImage~']?.elements?.[0]?.identifiers?.[0]?.identifier || '',
      displayName: `${profileData.localizedFirstName || ''} ${profileData.localizedLastName || ''}`.trim() || email,
      name: `${profileData.localizedFirstName || ''} ${profileData.localizedLastName || ''}`.trim() || email
    }
    
    // For now, redirect to dashboard with user info
    const response = NextResponse.redirect(new URL('/dashboard', request.url))
    response.cookies.set('user_profile', JSON.stringify(userProfile), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    })
    
    return response
  } catch (error) {
    console.error('LinkedIn OAuth error:', error)
    return NextResponse.redirect(new URL('/login?error=oauth_failed', request.url))
  }
}
