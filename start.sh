#!/bin/bash

echo "🚀 Starting CWPay WhatsApp Bot..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚙️  Creating .env file from .env.example..."
    cp .env.example .env
    echo ""
fi

echo "✅ Starting server..."
echo ""
echo "📱 Bot Admin: http://localhost:3000/bot-admin.html"
echo "🏠 Dashboard: http://localhost:3000/dashboard.html"
echo ""

npm start
