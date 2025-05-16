'use client';

import { useEffect, useRef, useState } from 'react';
import { Network } from 'vis-network';
import { DataSet } from 'vis-data';
import { useGraph } from '../utils/GraphContext';
import ExplainerPanel from './ExplainerPanel';
import { Person, Relationship } from '../utils/types';

export default function GraphView() {
  const { 
    graphData, 
    focusedNodeId, 
    proximityThreshold,
    physicsEnabled
  } = useGraph();
  
  const [showExplainer, setShowExplainer] = useState(false);
  const networkContainer = useRef<HTMLDivElement>(null);
  const networkInstance = useRef<Network | null>(null);

  useEffect(() => {
    if (!networkContainer.current) return;

    // Filter edges based on the threshold
    const filteredEdges = graphData.edges.filter((edge: Relationship) => edge.value >= proximityThreshold);
    
    // Create datasets
    const nodes = new DataSet(
      graphData.nodes.map((node: Person) => ({
        ...node,
        color: getNodeColor(node.group || ''),
        font: { color: '#333', size: 16 },
        shape: 'dot',
        size: 15
      }))
    );

    const edges = new DataSet(
      filteredEdges.map((edge: Relationship) => ({
        ...edge,
        width: edge.value * 5, // Thicker lines for stronger connections
        color: { color: '#5E81AC', opacity: edge.value },
        smooth: { type: 'continuous' }
      }))
    );

    // Configure network options
    const options = {
      physics: {
        enabled: physicsEnabled,
        stabilization: true,
        barnesHut: {
          gravitationalConstant: -80000,
          springConstant: 0.001,
          springLength: 200
        }
      },
      interaction: {
        hover: true,
        navigationButtons: true,
        keyboard: {
          enabled: true
        }
      },
      nodes: {
        scaling: {
          min: 10,
          max: 30
        }
      },
      edges: {
        scaling: {
          min: 1,
          max: 10
        }
      }
    };

    // Create network
    const network = new Network(
      networkContainer.current,
      { nodes, edges },
      options
    );

    // Handle focused node
    if (focusedNodeId) {
      // Get all connected nodes (1st degree)
      const connectedNodeIds = new Set<number>();
      const connectedEdges = filteredEdges.filter((edge: Relationship) => {
        if (edge.from === focusedNodeId || edge.to === focusedNodeId) {
          connectedNodeIds.add(edge.from);
          connectedNodeIds.add(edge.to);
          return true;
        }
        return false;
      });

      // Get 2nd degree connections
      const secondDegreeNodeIds = new Set<number>(connectedNodeIds);
      filteredEdges.forEach((edge: Relationship) => {
        if (connectedNodeIds.has(edge.from) || connectedNodeIds.has(edge.to)) {
          secondDegreeNodeIds.add(edge.from);
          secondDegreeNodeIds.add(edge.to);
        }
      });

      // Set opacity for nodes
      nodes.forEach((node: any) => {
        const isConnected = secondDegreeNodeIds.has(node.id);
        nodes.update({
          id: node.id,
          opacity: isConnected ? 1 : 0.2
        });
      });

      // Set opacity for edges
      edges.forEach((edge: any) => {
        const isConnected = secondDegreeNodeIds.has(edge.from) && secondDegreeNodeIds.has(edge.to);
        edges.update({
          id: edge.id,
          opacity: isConnected ? 1 : 0.1
        });
      });

      network.focus(focusedNodeId, { 
        scale: 1.2, 
        animation: true 
      });
    }

    // Store network instance for cleanup
    networkInstance.current = network;

    // Cleanup
    return () => {
      if (networkInstance.current) {
        networkInstance.current.destroy();
      }
    };
  }, [graphData, focusedNodeId, proximityThreshold, physicsEnabled]);

  // Get color based on group
  const getNodeColor = (group: string) => {
    const colors: Record<string, string> = {
      'Friends': '#88C0D0',
      'Family': '#A3BE8C',
      'Work': '#5E81AC',
      'School': '#B48EAD'
    };
    return colors[group] || '#D08770';
  };

  return (
    <div className="flex flex-col w-3/4 h-screen relative">
      <div className="absolute top-4 right-4 z-10">
        <button 
          onClick={() => setShowExplainer(!showExplainer)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
        >
          {showExplainer ? 'Hide Explainer' : 'Show Graph Explainer'}
        </button>
      </div>
      
      {showExplainer && (
        <div className="absolute top-16 right-4 w-1/2 z-10 shadow-xl">
          <ExplainerPanel />
        </div>
      )}
      
      <div ref={networkContainer} className="flex-1 bg-gray-50" />
    </div>
  );
} 