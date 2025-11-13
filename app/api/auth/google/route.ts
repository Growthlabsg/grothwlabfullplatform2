import { NextRequest, NextResponse } from 'next/server'
import { OAuth2Client } from 'google-auth-library'

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
)

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  
  if (!code) {
    return NextResponse.redirect(new URL('/login?error=no_code', request.url))
  }

  try {
    const { tokens } = await client.getToken(code)
    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token!,
      audience: process.env.GOOGLE_CLIENT_ID
    })
    
    const payload = ticket.getPayload()!
    
    // Here you would typically:
    // 1. Check if user exists in your database
    // 2. Create or update user profile
    // 3. Generate JWT token
    // 4. Set session
    
    const userProfile = {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
      provider: 'google',
      // Add missing properties that the sidebar expects
      role: 'user',
      avatarUrl: payload.picture,
      displayName: payload.name,
      expiresAt: Date.now() + (60 * 60 * 24 * 7 * 1000) // 7 days
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
    console.error('Google OAuth error:', error)
    return NextResponse.redirect(new URL('/login?error=oauth_failed', request.url))
  }
}
