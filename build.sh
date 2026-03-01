#!/bin/bash

# Render Build Script for Mini CRM
set -e  # Exit on any error

echo "📦 Installing server dependencies..."
npm install --prefix ./server

echo "📦 Installing client dependencies..."
npm install --prefix ./client

echo "🏗️ Building React client..."
npm run build --prefix ./client

echo "✅ Build completed successfully!"
