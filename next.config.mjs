/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: process.env.NODE_ENV === 'production',
  },
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV === 'production',
  },
  // Enable compression for better performance
  compress: true,
  // Enable SWC minification
  swcMinify: true,
  images: {
    // Allow specific domains where your images might be hosted
    domains: [
      'v0.blob.com',      // For v0-generated images
      'localhost',        // For local development
      'vercel.app',       // For Vercel deployments
      'githubusercontent.com', // For GitHub-hosted images
      'images.unsplash.com',  // For Unsplash images if used
    ],
    
    // Remote patterns provide more flexible hostname matching
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        pathname: '**',
      },
    ],
    
    // Important settings for placeholders and SVGs
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    
    // Format settings for optimized images
    formats: ['image/avif', 'image/webp'],
    
    // Set reasonable default image quality
    minimumCacheTTL: 60,
    
    // Use this only in development if having issues with image optimization
    // In production, it's better to let Next.js optimize images
    unoptimized: process.env.NODE_ENV === 'development',
  },
  
  // Ensure assets in public folder are accessible
  // This is usually the default, but adding it to be explicit
  assetPrefix: undefined,
  
  // Experimental features if needed
  experimental: {
    // Enable if you want to use modern image formats more aggressively
    // optimizeFonts: true,
    // scrollRestoration: true,
  },
}

export default nextConfig
