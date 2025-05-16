import './globals.css';
import type { Metadata } from 'next';
import { AuthProvider } from './utils/AuthContext';
import { GraphProvider } from './utils/GraphContext';

export const metadata: Metadata = {
  title: 'Biography Demo - Relationship Graph',
  description: 'Demonstration of Biography\'s platform and graph of human relationships',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <GraphProvider>
            {children}
          </GraphProvider>
        </AuthProvider>
      </body>
    </html>
  );
} 