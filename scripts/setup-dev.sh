#!/bin/bash

# Setup script for development environment

echo "🚀 Setting up Best Next.js Template development environment..."

# Check if .env exists
if [ ! -f .env ]; then
  echo "📝 Creating .env file from .env.example..."
  cp .env.example .env
  echo "⚠️  Please update the .env file with your actual values before continuing!"
  exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Check if DATABASE_URL is set
if [ -z "${DATABASE_URL}" ]; then
  echo "⚠️  DATABASE_URL not set in environment. Please set it in your .env file."
  exit 1
fi

# Run database migrations
echo "🗄️  Running database migrations..."
npm run drizzle:migrate

# Seed test user
echo "👤 Creating test user..."
npm run seed:test-user

# Run type check
echo "🔍 Running type check..."
npm run typecheck

# Run linting
echo "🧹 Running linter..."
npm run lint

# Run tests
echo "🧪 Running tests..."
npm run test

echo "✅ Development environment setup complete!"
echo ""
echo "🎯 Next steps:"
echo "  1. Start the development server: npm run dev"
echo "  2. Run E2E tests: npm run test:e2e"
echo "  3. Build for production: npm run build"
echo ""
echo "📚 Default test user credentials:"
echo "  Email: test@example.com"
echo "  Password: password123"