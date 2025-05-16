'use client';

import { useAuth } from './utils/AuthContext';
import Login from './components/Login';
import GraphView from './components/GraphView';
import ControlPanel from './components/ControlPanel';

export default function Home() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <main className="flex min-h-screen">
      <ControlPanel />
      <GraphView />
    </main>
  );
} 