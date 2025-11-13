# GrowthLab Platform

A comprehensive platform for startups, entrepreneurs, and investors with OAuth authentication, LinkedIn profile import, and advanced admin features.

## 🚀 Features

### Authentication & User Management
- **Google OAuth** - Sign in with Google accounts
- **LinkedIn OAuth** - Sign in with LinkedIn accounts
- **LinkedIn Profile Import** - Import professional profiles including:
  - Basic profile information
  - Work experience
  - Education history
  - Skills and endorsements
  - Professional summary

### Platform Features
- **Programmes Hub** - Comprehensive startup programs and resources
- **Startup Resources** - Curated tools and resources for entrepreneurs
- **Apps & Deals** - Platform for startup deals and applications
- **Super Admin Panel** - Complete platform management system
- **Feature Toggles** - Granular control over platform features
- **User Management** - Advanced user administration

### Technical Features
- **Next.js 15** - Modern React framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **OAuth Integration** - Secure authentication flows
- **API Management** - Comprehensive API configuration

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Google OAuth credentials
- LinkedIn OAuth credentials

### 1. Clone and Install
```bash
git clone <repository-url>
cd growthlab-sidebar
npm install
```

### 2. Environment Configuration
Copy the example environment file and configure your API keys:

```bash
cp env.example .env.local
```

Edit `.env.local` with your actual credentials:

```env
# Google OAuth
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google

# LinkedIn OAuth
NEXT_PUBLIC_LINKEDIN_CLIENT_ID=your_linkedin_client_id_here
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret_here
LINKEDIN_REDIRECT_URI=http://localhost:3000/api/auth/linkedin

# JWT Configuration
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d
```

### 3. OAuth Setup

#### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client ID
5. Set authorized redirect URIs:
   - `http://localhost:3000/api/auth/google` (development)
   - `https://yourdomain.com/api/auth/google` (production)
6. Copy Client ID and Client Secret to `.env.local`

#### LinkedIn OAuth
1. Go to [LinkedIn Developers](https://www.linkedin.com/developers/)
2. Create a new app
3. Set OAuth 2.0 redirect URLs:
   - `http://localhost:3000/api/auth/linkedin` (development)
   - `https://yourdomain.com/api/auth/linkedin` (production)
4. Request access to required scopes:
   - `r_liteprofile` - Basic profile information
   - `r_emailaddress` - Email address
5. Copy Client ID and Client Secret to `.env.local`

### 4. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 🔐 Authentication Flow

### Google OAuth Flow
1. User clicks "Continue with Google"
2. Redirected to Google OAuth consent screen
3. User authorizes the application
4. Google redirects back with authorization code
5. Backend exchanges code for access token
6. User profile is created/updated
7. User is redirected to dashboard

### LinkedIn OAuth Flow
1. User clicks "Continue with LinkedIn"
2. Redirected to LinkedIn OAuth consent screen
3. User authorizes the application
4. LinkedIn redirects back with authorization code
5. Backend exchanges code for access token
6. User profile is created/updated
7. User is redirected to dashboard

### LinkedIn Profile Import
1. User must be authenticated with LinkedIn
2. User can import specific profile sections:
   - Basic profile (name, headline, summary)
   - Work experience
   - Education
   - Skills
3. Import all sections at once or individually
4. Progress tracking and error handling
5. Data preview and confirmation

## 📁 Project Structure

```
growthlab-sidebar/
├── app/                          # Next.js app directory
│   ├── api/                     # API routes
│   │   └── auth/               # Authentication endpoints
│   │       ├── google/         # Google OAuth
│   │       └── linkedin/       # LinkedIn OAuth & import
│   ├── login/                  # Login page
│   ├── profile/                # User profile page
│   └── super-admin/            # Admin panel
├── components/                  # React components
│   ├── profile/                # Profile-related components
│   │   └── linkedin-import.tsx # LinkedIn import component
│   ├── super-admin/            # Admin components
│   └── ui/                     # UI primitives
├── contexts/                    # React contexts
│   └── auth-context.tsx        # Authentication context
├── types/                       # TypeScript type definitions
└── env.example                  # Environment variables template
```

## 🔧 API Endpoints

### Authentication
- `GET /api/auth/google` - Google OAuth callback
- `GET /api/auth/linkedin` - LinkedIn OAuth callback
- `POST /api/auth/linkedin/import` - LinkedIn profile import

### Profile Import Types
- `basic` - Basic profile information
- `experience` - Work experience
- `education` - Educational background
- `skills` - Professional skills
- `full` - Complete profile import

## 🎯 Usage Examples

### Login with OAuth
```tsx
import { useAuth } from '@/contexts/auth-context'

function LoginComponent() {
  const { login } = useAuth()
  
  return (
    <Button onClick={() => login('google')}>
      Continue with Google
    </Button>
  )
}
```

### Import LinkedIn Profile
```tsx
import { useAuth } from '@/contexts/auth-context'

function ProfileImport() {
  const { importLinkedInProfile } = useAuth()
  
  const handleImport = async () => {
    try {
      const result = await importLinkedInProfile('full')
      console.log('Import successful:', result)
    } catch (error) {
      console.error('Import failed:', error)
    }
  }
  
  return <Button onClick={handleImport}>Import Profile</Button>
}
```

## 🚨 Security Considerations

- **HTTPS Only** - Use HTTPS in production for all OAuth flows
- **State Parameter** - LinkedIn OAuth includes state parameter for CSRF protection
- **Token Storage** - Access tokens are stored securely in HTTP-only cookies
- **Scope Limitation** - Only request necessary OAuth scopes
- **Rate Limiting** - Implement rate limiting for profile import APIs
- **Input Validation** - Validate all user inputs and API responses

## 🧪 Testing

### Development Testing
1. Use test OAuth applications for development
2. Test with different user accounts
3. Verify error handling for invalid tokens
4. Test profile import with various data types

### Production Testing
1. Verify OAuth flows work with production credentials
2. Test profile import with real LinkedIn accounts
3. Monitor API rate limits and performance
4. Test error scenarios and edge cases

## 📚 Additional Resources

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [LinkedIn OAuth 2.0 Documentation](https://docs.microsoft.com/en-us/linkedin/shared/authentication/authentication)
- [Next.js Authentication](https://nextjs.org/docs/authentication)
- [OAuth Security Best Practices](https://oauth.net/2/oauth-best-practice/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code examples

---

**Note**: This is a development setup. For production deployment, ensure all security best practices are followed, including proper SSL certificates, secure cookie settings, and environment-specific configurations. 