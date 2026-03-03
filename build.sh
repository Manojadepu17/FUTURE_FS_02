#!/bin/bash

# Render Build Script for Mini CRM
set -e  # Exit on any error

echo "================================================"
echo "🚀 Starting Fresh Build for Mini CRM"
echo "================================================"

echo "📂 Current directory: $(pwd)"
echo "📂 Listing root files:"
ls -la

echo ""
echo "================================================"
echo "📦 Installing server dependencies..."
echo "================================================"
cd server
rm -rf node_modules package-lock.json 2>/dev/null || true
npm install
cd ..

echo ""
echo "================================================"
echo "📦 Installing client dependencies..."
echo "================================================"
cd client
rm -rf node_modules package-lock.json 2>/dev/null || true
npm install

echo ""
echo "================================================" 
echo "🧹 Removing old build completely..."
echo "================================================"
rm -rf build 2>/dev/null || true
rm -rf .cache 2>/dev/null || true

echo ""
echo "================================================"
echo "🏗️ Building fresh React client..."
echo "================================================"
CI=false npm run build

echo ""
echo "================================================"
echo "✅ Build completed successfully!"
echo "================================================"
echo "📦 Build contents:"
ls -la build 2>/dev/null || echo "Checking build folder..."
cd ..

echo ""
echo "🎉 Ready to deploy!"
