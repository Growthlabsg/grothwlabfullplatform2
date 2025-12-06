# Redux Toolkit & RTK Query Setup

This directory contains the Redux Toolkit and RTK Query setup for the GrowthLab application.

## Overview

The Redux setup includes:

- **Base API** with automatic refresh token handling and logout on token expiration
- **Authentication API** with all endpoints from Authentication.md
- **Auth Slice** for managing authentication state
- **Typed hooks** for use throughout the app
- **Redux Provider** component for wrapping the app

## File Structure

```
lib/redux/
├── baseApi.ts          # RTK Query base API with refresh token logic
├── authApi.ts          # Authentication endpoints (injected into baseApi)
├── authSlice.ts        # Redux slice for auth state management
├── store.ts           # Redux store configuration
├── hooks.ts           # Typed Redux hooks
├── ReduxProvider.tsx  # Provider component for Redux
├── types.ts           # TypeScript interfaces for API requests/responses
└── index.ts           # Main export file
```

## Key Features

### 🔄 Automatic Token Refresh

- Automatically refreshes access tokens when they expire
- Uses mutex to prevent multiple concurrent refresh requests
- Logs out user if refresh token is invalid or expired

### 🚪 Auto Logout

- Automatically logs out users when refresh tokens expire
- Clears stored tokens from localStorage
- Redirects to login page

### 🔐 Authentication Endpoints

Based on Authentication.md, includes:

- `POST /v1/auth/register` - User registration
- `POST /v1/auth/login` - User login
- `POST /v1/auth/refresh` - Refresh access token
- `POST /v1/auth/logout` - User logout
- `POST /v1/auth/resend-verification` - Resend email verification
- `POST /v1/auth/verify-email` - Verify email address
- `GET /v1/auth/me` - Get current user profile

### 🎯 Error Handling

- Proper error handling for validation errors
- Extracts meaningful error messages from API responses
- Supports both string and array error formats

## Usage

### In Components

```tsx
import { useAppSelector, useAppDispatch } from "@/lib/redux";
import { useLoginMutation } from "@/lib/redux";

function LoginComponent() {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async () => {
    try {
      const result = await login({
        emailAddress: "user@example.com",
        password: "password",
      }).unwrap();

      // Success - user is automatically set in Redux state
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };
}
```

### In Auth Context

The auth context has been updated to use Redux internally while maintaining the same API for backward compatibility.

## Configuration

### Base URL

The API base URL is configured in `baseApi.ts`:

```typescript
const BASE_URL = "http://localhost:8888/api";
```

### Token Storage

Tokens are stored in localStorage:

- `accessToken` - JWT access token
- `refreshToken` - JWT refresh token

## Integration

The Redux provider is wrapped around the app in `app/providers.tsx`:

```tsx
<ReduxProvider>
  <ThemeProvider>
    <AuthProvider>{/* Other providers */}</AuthProvider>
  </ThemeProvider>
</ReduxProvider>
```

## Migration Notes

- The auth context maintains backward compatibility
- All existing components using `useAuth()` continue to work
- Internal implementation now uses Redux + RTK Query
- Error handling improved with proper API error extraction
