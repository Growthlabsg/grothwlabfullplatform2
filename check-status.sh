#!/bin/bash

echo "🚀 GrowthLab Platform - Status Check"
echo "===================================="

# Check development server
echo "📱 Development Server (http://localhost:3000):"
if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 | grep -q "200"; then
    echo "✅ RUNNING - http://localhost:3000"
else
    echo "❌ NOT RUNNING"
fi

# Check production server
echo "🏭 Production Server (http://localhost:3001):"
if curl -s -o /dev/null -w "%{http_code}" http://localhost:3001 | grep -q "200"; then
    echo "✅ RUNNING - http://localhost:3001"
else
    echo "❌ NOT RUNNING"
fi

echo ""
echo "🌐 Access URLs:"
echo "   Development: http://localhost:3000"
echo "   Production:  http://localhost:3001"
echo ""
echo "📋 Key Pages to Test:"
echo "   Homepage: http://localhost:3000"
echo "   Analytics: http://localhost:3000/analytics"
echo "   Login: http://localhost:3000/login"
echo "   Dashboard: http://localhost:3000/dashboard"
echo "   GrowthStarter: http://localhost:3000/growthstarter"
echo ""
echo "🎯 Platform Features:"
echo "   ✅ Responsive Design"
echo "   ✅ Sidebar Navigation"
echo "   ✅ Analytics Dashboard"
echo "   ✅ User Authentication"
echo "   ✅ Real-time Updates"
echo "   ✅ Mobile Optimized" 