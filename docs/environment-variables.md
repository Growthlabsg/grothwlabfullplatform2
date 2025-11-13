# Environment Variables

This document outlines the environment variables used in the GrowthLab application.

## Development Setup

For development, you can use the mock environment variables by running:

\`\`\`bash
npx ts-node scripts/load-mock-env.ts
\`\`\`

This will create a `.env.local` file with mock values for development.

## Required Environment Variables

### Core Configuration
- `NODE_ENV` - Environment (`development`, `test`, or `production`)
- `PORT` - Server port (default: 3000)
- `NEXT_PUBLIC_APP_URL` - Public URL of the application
- `JWT_SECRET` - Secret for JWT token generation and validation

### Database
- `DATABASE_URL` - PostgreSQL connection string
- `POSTGRES_URL` - PostgreSQL connection string
- `POSTGRES_PRISMA_URL` - PostgreSQL connection string with Prisma configuration
- `POSTGRES_URL_NON_POOLING` - Non-pooling PostgreSQL connection string
- `DATABASE_URL_UNPOOLED` - Non-pooled PostgreSQL connection string

### Authentication
- `NEXTAUTH_SECRET` - Secret for Next.js Authentication
- `NEXTAUTH_URL` - URL for Next.js Authentication callbacks

### External Services
- `OPENAI_API_KEY` - OpenAI API key for AI features
- `GOOGLE_MAPS_API_KEY` - Google Maps API key for location services
- `GEOLOCATION_API_KEY` - API key for geolocation services
- `STRIPE_SECRET_KEY` - Stripe secret key for payment processing
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook secret for secure callbacks

### Email
- `SMTP_HOST` - SMTP server host
- `SMTP_PORT` - SMTP server port
- `SMTP_USER` - SMTP server username
- `SMTP_PASSWORD` - SMTP server password
- `EMAIL_FROM` - Email sender address

## Feature Flags

Feature flags allow enabling/disabling features:

- `NEXT_PUBLIC_FEATURE_VALUATION_COMPARISON` - Enable valuation comparison
- `NEXT_PUBLIC_FEATURE_VALUATION_HISTORY` - Enable valuation history
- `NEXT_PUBLIC_FEATURE_REPORT_GENERATION` - Enable report generation
- `NEXT_PUBLIC_FEATURE_INDUSTRY_BENCHMARKS` - Enable industry benchmarks
- `NEXT_PUBLIC_FEATURE_FUNDING_NAVIGATOR` - Enable funding navigator
- `NEXT_PUBLIC_FEATURE_CUSTOMER_DISCOVERY` - Enable customer discovery
- `NEXT_PUBLIC_FEATURE_VALUATION_CALCULATOR` - Enable valuation calculator
- `NEXT_PUBLIC_FEATURE_IDEA_VALIDATION` - Enable idea validation

## Analytics and Tracking
- `NEXT_PUBLIC_ANALYTICS_ID` - Analytics tracking ID
- `NEXT_PUBLIC_GOOGLE_ANALYTICS` - Google Analytics tracking ID

## Real-time Communication
- `NEXT_PUBLIC_SOCKET_URL` - WebSocket server URL
- `PUSHER_APP_ID` - Pusher application ID
- `PUSHER_KEY` - Pusher API key
- `PUSHER_SECRET` - Pusher API secret
- `PUSHER_CLUSTER` - Pusher cluster region

## Storage
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret

## Singapore-specific Services
- `SG_GOV_API_KEY` - Singapore government API key
- `ENTERPRISE_SG_API_KEY` - Enterprise Singapore API key

## API Configuration
- `API_TIMEOUT_MS` - API request timeout in milliseconds
- `API_RATE_LIMIT` - API rate limit per minute

## Environment Helper Functions

The application includes helper functions for working with environment variables:

\`\`\`typescript
import { env } from '../lib/env';

// Access environment variables with type safety
const apiKey = env.openaiApiKey;
const isFeatureEnabled = env.features.valuationComparison;

// Check environment
if (env.isProduction()) {
  // Production-only code
}
\`\`\`

## Testing

For testing, use the provided test utilities which set up mock environment variables:

\`\`\`typescript
import { setupTestEnvironment } from '../lib/testing-utils';

describe('My Test', () => {
  const cleanup = setupTestEnvironment();
  
  afterAll(() => cleanup());
  
  it('should work with mock environment', () => {
    // Test code
  });
});
