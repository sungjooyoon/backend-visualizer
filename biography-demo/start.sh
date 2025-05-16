#!/bin/bash

# Install dependencies if node_modules does not exist
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Start the development server
echo "Starting Biography Demo on http://localhost:3001"
echo "Login with username: demo, password: graph2025"
npm run dev -- -p 3001
