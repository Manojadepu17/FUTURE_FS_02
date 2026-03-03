#!/bin/bash

# Render Build Script for Mini CRM
set -e  # Exit on any error

echo "📂 Current directory: $(pwd)"
echo "📂 Listing root files:"
ls -la

echo "📦 Installing server dependencies..."
cd server && npm install && cd ..

echo "📦 Installing client dependencies..."
cd client && npm install

echo "🧹 Cleaning old build..."
cd client && rm -rf build

echo "🏗️ Building React client..."
npm run build

echo "📍 Moving back to root..."
cd ..

echo "✅ Build completed successfully!"
echo "📦 Build contents:"
ls -la client/build 2>/dev/null || echo "Build folder check..."
