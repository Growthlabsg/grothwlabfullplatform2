#!/bin/bash

# LibreTranslate Setup Script for GrowthLab
# This script sets up LibreTranslate for the GrowthLab application

set -e

echo "🚀 Setting up LibreTranslate for GrowthLab..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    echo "   Visit: https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

echo "✅ Docker and Docker Compose are available"

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp env.example .env
    echo "✅ .env file created. Please update it with your configuration."
else
    echo "✅ .env file already exists"
fi

# Start LibreTranslate service
echo "🐳 Starting LibreTranslate service..."
docker-compose -f docker-compose.libretranslate.yml up -d

echo "⏳ Waiting for LibreTranslate to start..."
sleep 10

# Check if service is running
if curl -f http://localhost:5000/languages > /dev/null 2>&1; then
    echo "✅ LibreTranslate is running successfully!"
    echo "🌐 Service URL: http://localhost:5000"
    echo "📚 API Documentation: http://localhost:5000/docs"
else
    echo "❌ LibreTranslate failed to start. Check logs with:"
    echo "   docker-compose -f docker-compose.libretranslate.yml logs"
    exit 1
fi

# Show available languages
echo "🌍 Available languages:"
curl -s http://localhost:5000/languages | jq -r '.[] | "  \(.code): \(.name)"' 2>/dev/null || echo "  (Install jq for better formatting)"

echo ""
echo "🎉 LibreTranslate setup complete!"
echo ""
echo "Next steps:"
echo "1. Update your .env file with: NEXT_PUBLIC_LIBRETRANSLATE_URL=http://localhost:5000"
echo "2. Restart your GrowthLab development server"
echo "3. Test translations in your app"
echo ""
echo "Useful commands:"
echo "  Start LibreTranslate: docker-compose -f docker-compose.libretranslate.yml up -d"
echo "  Stop LibreTranslate:  docker-compose -f docker-compose.libretranslate.yml down"
echo "  View logs:            docker-compose -f docker-compose.libretranslate.yml logs -f"
echo "  Update models:        docker-compose -f docker-compose.libretranslate.yml exec libretranslate ltmanage --update-models"
