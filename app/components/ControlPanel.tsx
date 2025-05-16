'use client';

import { useState } from 'react';
import { useGraph } from '../utils/GraphContext';
import { Person } from '../utils/types';

export default function ControlPanel() {
  const {
    graphData,
    addPerson,
    addRelationship,
    setFocusedNode,
    setProximityThreshold,
    setPhysicsEnabled,
    physicsEnabled,
    proximityThreshold,
    generateRandomNetwork
  } = useGraph();

  // State for adding a person
  const [newPersonName, setNewPersonName] = useState('');
  const [newPersonGroup, setNewPersonGroup] = useState('Friends');
  
  // State for adding a relationship
  const [fromPerson, setFromPerson] = useState<number>(0);
  const [toPerson, setToPerson] = useState<number>(0);
  const [proximityValue, setProximityValue] = useState(0.5);

  // For ego network focus
  const [selectedPerson, setSelectedPerson] = useState<number | null>(null);

  const handleAddPerson = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPersonName.trim() !== '') {
      addPerson({
        label: newPersonName,
        group: newPersonGroup
      });
      setNewPersonName('');
    }
  };

  const handleAddRelationship = (e: React.FormEvent) => {
    e.preventDefault();
    if (fromPerson && toPerson && fromPerson !== toPerson) {
      addRelationship({
        from: fromPerson,
        to: toPerson,
        value: proximityValue
      });
    }
  };

  const handleEgoFocus = (e: React.FormEvent) => {
    e.preventDefault();
    setFocusedNode(selectedPerson);
  };

  return (
    <div className="w-1/4 bg-white p-4 border-r border-gray-200 shadow-sm min-h-screen overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Control Panel</h2>
      
      {/* Add Person */}
      <div className="mb-6 bg-gray-50 p-3 rounded-lg">
        <h3 className="font-medium mb-2 text-gray-700">Add Person</h3>
        <form onSubmit={handleAddPerson} className="space-y-2">
          <div>
            <label className="block text-sm text-gray-600">Name</label>
            <input
              type="text"
              value={newPersonName}
              onChange={(e) => setNewPersonName(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Person name"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600">Group</label>
            <select
              value={newPersonGroup}
              onChange={(e) => setNewPersonGroup(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="Friends">Friends</option>
              <option value="Family">Family</option>
              <option value="Work">Work</option>
              <option value="School">School</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
          >
            Add Person
          </button>
        </form>
      </div>
      
      {/* Add Relationship */}
      <div className="mb-6 bg-gray-50 p-3 rounded-lg">
        <h3 className="font-medium mb-2 text-gray-700">Add Relationship</h3>
        <form onSubmit={handleAddRelationship} className="space-y-2">
          <div>
            <label className="block text-sm text-gray-600">Person A</label>
            <select
              value={fromPerson}
              onChange={(e) => setFromPerson(Number(e.target.value))}
              className="w-full p-2 border rounded"
            >
              <option value={0}>Select person...</option>
              {graphData.nodes.map((node: Person) => (
                <option key={node.id} value={node.id}>
                  {node.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600">Person B</label>
            <select
              value={toPerson}
              onChange={(e) => setToPerson(Number(e.target.value))}
              className="w-full p-2 border rounded"
            >
              <option value={0}>Select person...</option>
              {graphData.nodes.map((node: Person) => (
                <option key={node.id} value={node.id}>
                  {node.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600">
              Proximity ({proximityValue.toFixed(1)})
            </label>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={proximityValue}
              onChange={(e) => setProximityValue(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
          >
            Add Relationship
          </button>
        </form>
      </div>
      
      {/* Ego Focus */}
      <div className="mb-6 bg-gray-50 p-3 rounded-lg">
        <h3 className="font-medium mb-2 text-gray-700">Ego Focus</h3>
        <form onSubmit={handleEgoFocus} className="space-y-2">
          <div>
            <label className="block text-sm text-gray-600">Focus on Person</label>
            <select
              value={selectedPerson || ''}
              onChange={(e) => setSelectedPerson(e.target.value ? Number(e.target.value) : null)}
              className="w-full p-2 border rounded"
            >
              <option value="">Show all</option>
              {graphData.nodes.map((node: Person) => (
                <option key={node.id} value={node.id}>
                  {node.label}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
          >
            Apply Focus
          </button>
        </form>
      </div>
      
      {/* Simulation Settings */}
      <div className="mb-6 bg-gray-50 p-3 rounded-lg">
        <h3 className="font-medium mb-2 text-gray-700">Simulation Settings</h3>
        <div className="space-y-3">
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={physicsEnabled}
                onChange={(e) => setPhysicsEnabled(e.target.checked)}
                className="form-checkbox"
              />
              <span className="text-sm text-gray-600">Enable Physics</span>
            </label>
          </div>
          <div>
            <label className="block text-sm text-gray-600">
              Filter Weak Connections ({proximityThreshold.toFixed(1)})
            </label>
            <input
              type="range"
              min="0"
              max="0.9"
              step="0.1"
              value={proximityThreshold}
              onChange={(e) => setProximityThreshold(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>
      
      {/* Generate Random Network */}
      <div className="mb-6">
        <button
          onClick={generateRandomNetwork}
          className="w-full bg-green-500 text-white py-2 px-3 rounded hover:bg-green-600"
        >
          Generate Random Network
        </button>
      </div>
    </div>
  );
} 