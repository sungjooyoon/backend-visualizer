# Biography Demo: Relationship Graph Visualization

A demonstration web app showcasing Biography's platform and the graph of human relationships for General Catalyst.

## Overview

This demo app visualizes how Biography's platform stores relationship data as a graph, with:
- People represented as nodes
- Relationships represented as edges with proximity values
- A dynamic, interactive visualization showing how this data powers social agents

## Features

- **Login Screen**: Secured with demo credentials
  - Username: `demo`
  - Password: `graph2025`

- **Graph Visualization**:
  - Interactive network diagram of people
  - Relationships shown as weighted connections
  - Dynamic physics simulation
  - Zoom, pan, and hover for details

- **Control Panel**:
  - Add new people
  - Create/modify relationships
  - Focus on a specific person's network
  - Filter weak connections
  - Generate synthetic test data

- **Explainer Panel**:
  - Conceptual overview of the "Social OS"
  - How agents query the graph
  - Examples of proximity updates
  - Real-world applications

## Tech Stack

- React + TypeScript
- Next.js
- Tailwind CSS
- vis-network (graph visualization)

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Run the development server:
   ```
   npm run dev
   ```

3. Visit http://localhost:3000 in your browser

4. Login with:
   - Username: `demo`
   - Password: `graph2025`

## Project Structure

- `app/`: Main Next.js application
  - `components/`: React components
    - `Login.tsx`: Authentication screen
    - `GraphView.tsx`: Network visualization
    - `ControlPanel.tsx`: Tools for modifying the graph
    - `ExplainerPanel.tsx`: Conceptual explanation
  - `utils/`: Helper functions and context
    - `types.ts`: TypeScript interfaces
    - `AuthContext.tsx`: Authentication state
    - `GraphContext.tsx`: Graph data management

## Demo Notes

This demo is focused on showcasing the backend structure of Biography's platform, specifically:

1. How Biography stores human relationship data
2. How we model people as nodes, and proximity as edges
3. How that data might power future social agents

The visualization demonstrates how Lovebug, Dan, and other agents can query this graph to deliver personalized experiences. 