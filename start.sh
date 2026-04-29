#!/bin/bash
# Zero-G Portfolio — Quick Start
# Run this from the project root: bash start.sh

set -e

echo "🚀 Zero-G Portfolio Setup"
echo "========================="

# Check for Node.js
if ! command -v node &> /dev/null; then
  echo "❌ Node.js not found. Install from https://nodejs.org (v18+)"
  exit 1
fi

NODE_VER=$(node --version)
echo "✅ Node.js $NODE_VER found"

# Install deps if needed
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install
else
  echo "✅ node_modules already exists"
fi

echo ""
echo "🌌 Starting Zero-G Portfolio dev server..."
echo "   → http://localhost:3000"
echo ""

npm run dev
