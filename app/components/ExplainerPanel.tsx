'use client';

export default function ExplainerPanel() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">The Social OS: Biography's Platform</h2>
      
      <div className="space-y-4">
        <section>
          <h3 className="text-lg font-semibold mb-2">This is the Social OS</h3>
          <p className="text-gray-700">
            A graph of proximity is a better database than timelines or metadata. It represents the 
            real structure of human relationships, prioritizing connections over chronology.
          </p>
        </section>
        
        <section>
          <h3 className="text-lg font-semibold mb-2">The Agent Connection</h3>
          <p className="text-gray-700">
            Every agent in Biography's ecosystem (Lovebug, Dan, etc.) is just a query on this graph.
            They don't have separate databases — they all operate on the same substrate of human relationships.
          </p>
        </section>
        
        <section>
          <h3 className="text-lg font-semibold mb-2">How Proximity Updates Work</h3>
          <p className="text-gray-700">Proximity between people increases based on interactions:</p>
          <ul className="list-disc pl-5 mt-2 text-gray-700">
            <li><span className="font-medium">Match = +0.9</span> - Strong connection formation</li>
            <li><span className="font-medium">At same event = +0.6</span> - Meaningful shared experience</li>
            <li><span className="font-medium">DM = +0.4</span> - Direct communication</li>
            <li><span className="font-medium">Like = +0.1</span> - Lightweight acknowledgment</li>
          </ul>
        </section>
        
        <section>
          <h3 className="text-lg font-semibold mb-2">Network Visualization</h3>
          <p className="text-gray-700">The graph structure enables:</p>
          <div className="my-3 py-3 px-4 bg-gray-50 rounded-md font-mono text-sm">
            Alice —[0.9]— Bob<br />
            ↘︎ [0.5]        ↘︎ [0.6]<br />
            Carol        David
          </div>
          <p className="text-gray-700">
            This simplified view shows how Alice is strongly connected to Bob (0.9), 
            moderately to Carol (0.5), while Bob connects to David (0.6).
          </p>
        </section>
        
        <section>
          <h3 className="text-lg font-semibold mb-2">Practical Applications</h3>
          <ul className="list-disc pl-5 text-gray-700">
            <li><span className="font-medium">Lovebug</span> knows who to match based on graph proximity and patterns</li>
            <li><span className="font-medium">Jruski</span> knows who to invite to events by analyzing cluster density</li>
            <li><span className="font-medium">Dan</span> can find your close friends who haven't connected yet</li>
            <li><span className="font-medium">Group chats</span> can be auto-suggested based on existing clusters</li>
          </ul>
        </section>
        
        <section className="bg-indigo-50 p-4 rounded-md">
          <h3 className="text-lg font-semibold mb-2 text-indigo-800">Why This Matters</h3>
          <p className="text-gray-700">
            This representation of social relationships as a weighted graph enables Biography to:
          </p>
          <ul className="list-disc pl-5 mt-2 text-gray-700">
            <li><span className="font-medium">Store</span> social ties in structured form</li>
            <li><span className="font-medium">Query and update</span> that graph in real time</li>
            <li><span className="font-medium">Visualize and explore</span> the data that agents use</li>
            <li><span className="font-medium">Enable</span> social intelligence for future applications</li>
          </ul>
        </section>
      </div>
    </div>
  );
} 