#!/bin/bash

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Start the development server
echo "Starting Biography Demo on http://localhost:3000"
echo "Login with username: demo, password: graph2025"
npm run dev 