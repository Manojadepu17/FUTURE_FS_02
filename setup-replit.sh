#!/bin/bash

# Replit Deployment Setup Script
# This script helps set up the database for Replit deployment

echo "🚀 Mini CRM - Replit Deployment Setup"
echo "======================================"
echo ""

# Check if we're in the right directory
if [ ! -f "server/server.js" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Check if .env exists in server directory
if [ ! -f "server/.env" ]; then
    echo "⚠️  No .env file found in server directory"
    echo "Creating .env from .env.example..."
    cp server/.env.example server/.env
    echo "✅ Created server/.env"
    echo ""
    echo "⚠️  IMPORTANT: Edit server/.env and add your database credentials!"
    echo "   You need to set:"
    echo "   - DB_HOST"
    echo "   - DB_NAME"
    echo "   - DB_USER"
    echo "   - DB_PASSWORD"
    echo "   - CLIENT_URL"
    echo ""
    read -p "Press Enter after you've updated the .env file..."
fi

echo "📦 Installing server dependencies..."
cd server
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed"
echo ""

# Create database (if createDB.js exists)
if [ -f "createDB.js" ]; then
    echo "🗄️  Creating database..."
    node createDB.js
    if [ $? -eq 0 ]; then
        echo "✅ Database created successfully"
    else
        echo "⚠️  Database creation failed or already exists"
    fi
    echo ""
fi

# Seed database
echo "🌱 Seeding database with initial data..."
node seed.js

if [ $? -eq 0 ]; then
    echo "✅ Database seeded successfully"
    echo ""
    echo "🎉 Setup Complete!"
    echo ""
    echo "Default Admin Credentials:"
    echo "📧 Email: admin@crm.com"
    echo "🔑 Password: admin123"
    echo ""
    echo "⚠️  Remember to change the password after first login!"
    echo ""
    echo "🚀 You can now run: npm start"
else
    echo "❌ Database seeding failed"
    echo "Please check your database connection settings"
    exit 1
fi

cd ..
