'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { GraphData, Person, Relationship } from './types';

// Initial mock data
const initialGraphData: GraphData = {
  nodes: [
    { id: 1, label: "Alice", group: "Friends" },
    { id: 2, label: "Bob", group: "Friends" },
    { id: 3, label: "Charlie", group: "Work" },
    { id: 4, label: "David", group: "Family" },
    { id: 5, label: "Emily", group: "Work" },
  ],
  edges: [
    { from: 1, to: 2, value: 0.9, title: "Best Friends" },
    { from: 1, to: 3, value: 0.5, title: "Acquaintances" },
    { from: 2, to: 3, value: 0.6, title: "Friends" },
    { from: 3, to: 4, value: 0.3, title: "Colleagues" },
    { from: 4, to: 5, value: 0.7, title: "Close Friends" },
  ]
};

interface GraphContextType {
  graphData: GraphData;
  focusedNodeId: number | null;
  proximityThreshold: number;
  physicsEnabled: boolean;
  addPerson: (person: Omit<Person, 'id'>) => void;
  addRelationship: (relationship: Omit<Relationship, 'title'>) => void;
  updateRelationship: (from: number, to: number, value: number) => void;
  setFocusedNode: (nodeId: number | null) => void;
  setProximityThreshold: (threshold: number) => void;
  setPhysicsEnabled: (enabled: boolean) => void;
  generateRandomNetwork: () => void;
}

const GraphContext = createContext<GraphContextType | undefined>(undefined);

export const GraphProvider = ({ children }: { children: ReactNode }) => {
  const [graphData, setGraphData] = useState<GraphData>(initialGraphData);
  const [focusedNodeId, setFocusedNodeId] = useState<number | null>(null);
  const [proximityThreshold, setProximityThreshold] = useState<number>(0);
  const [physicsEnabled, setPhysicsEnabled] = useState<boolean>(true);

  const addPerson = (person: Omit<Person, 'id'>) => {
    const newId = Math.max(...graphData.nodes.map((n: Person) => n.id), 0) + 1;
    setGraphData((prev: GraphData) => ({
      ...prev,
      nodes: [...prev.nodes, { id: newId, ...person }]
    }));
  };

  const addRelationship = (relationship: Omit<Relationship, 'title'>) => {
    const existingEdgeIndex = graphData.edges.findIndex(
      (e: Relationship) => (e.from === relationship.from && e.to === relationship.to) ||
           (e.from === relationship.to && e.to === relationship.from)
    );

    if (existingEdgeIndex >= 0) {
      // Update existing relationship
      const updatedEdges = [...graphData.edges];
      updatedEdges[existingEdgeIndex] = {
        ...updatedEdges[existingEdgeIndex],
        value: relationship.value
      };
      
      setGraphData((prev: GraphData) => ({
        ...prev,
        edges: updatedEdges
      }));
    } else {
      // Add new relationship
      setGraphData((prev: GraphData) => ({
        ...prev,
        edges: [...prev.edges, { ...relationship, title: `Proximity: ${relationship.value.toFixed(2)}` }]
      }));
    }
  };

  const updateRelationship = (from: number, to: number, value: number) => {
    const existingEdgeIndex = graphData.edges.findIndex(
      (e: Relationship) => (e.from === from && e.to === to) || (e.from === to && e.to === from)
    );

    if (existingEdgeIndex >= 0) {
      const updatedEdges = [...graphData.edges];
      updatedEdges[existingEdgeIndex] = {
        ...updatedEdges[existingEdgeIndex],
        value,
        title: `Proximity: ${value.toFixed(2)}`
      };
      
      setGraphData((prev: GraphData) => ({
        ...prev,
        edges: updatedEdges
      }));
    }
  };

  const setFocusedNode = (nodeId: number | null) => {
    setFocusedNodeId(nodeId);
  };

  const generateRandomNetwork = () => {
    const newNodes: Person[] = [];
    const newEdges: Relationship[] = [];
    
    const groups = ['Friends', 'Work', 'Family', 'School'];
    
    // Create 10 random nodes
    for (let i = 1; i <= 10; i++) {
      const id = graphData.nodes.length + i;
      newNodes.push({
        id,
        label: `Person ${id}`,
        group: groups[Math.floor(Math.random() * groups.length)]
      });
    }
    
    // Create random connections between nodes
    const allNodes = [...graphData.nodes, ...newNodes];
    for (let i = 0; i < 15; i++) {
      const sourceIndex = Math.floor(Math.random() * allNodes.length);
      let targetIndex = Math.floor(Math.random() * allNodes.length);
      
      // Avoid self-connections
      while (targetIndex === sourceIndex) {
        targetIndex = Math.floor(Math.random() * allNodes.length);
      }
      
      const value = Math.round(Math.random() * 10) / 10; // Random value between 0 and 1
      
      newEdges.push({
        from: allNodes[sourceIndex].id,
        to: allNodes[targetIndex].id,
        value,
        title: `Proximity: ${value.toFixed(2)}`
      });
    }
    
    setGraphData((prev: GraphData) => ({
      nodes: [...prev.nodes, ...newNodes],
      edges: [...prev.edges, ...newEdges]
    }));
  };

  return (
    <GraphContext.Provider value={{
      graphData,
      focusedNodeId,
      proximityThreshold,
      physicsEnabled,
      addPerson,
      addRelationship,
      updateRelationship,
      setFocusedNode,
      setProximityThreshold,
      setPhysicsEnabled,
      generateRandomNetwork
    }}>
      {children}
    </GraphContext.Provider>
  );
};

export const useGraph = () => {
  const context = useContext(GraphContext);
  if (context === undefined) {
    throw new Error('useGraph must be used within a GraphProvider');
  }
  return context;
}; 