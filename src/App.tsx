import React, { useState, useEffect } from 'react';
import Terminal from './components/Terminal';
import Loading from './components/Loading';
import Chatbot from './components/Chatbot';
import Clock from './components/Clock';
import CommandNav from './components/CommandNav';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showElements, setShowElements] = useState(false);
  const [currentPath, setCurrentPath] = useState('~');

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Show elements after loading with a slight delay for smooth transition
      setTimeout(() => setShowElements(true), 500);
    }, 6000); // Show loading screen for 6 seconds

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black">
      {/* Header Elements with Fade-in Animation */}
      <div
        className={`
          transition-all duration-1000 ease-in-out
          ${showElements ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
        `}
      >
        {/* Name Header */}
        <div className="name-header font-mono text-lg font-bold">
          <span className="name-text">Vansh Soni</span>
        </div>

        {/* Clock */}
        <Clock />

        {/* Command Navigation */}
        <CommandNav currentPath={currentPath} />
      </div>

      {/* Main Content */}
      {isLoading ? (
        <Loading />
      ) : (
        <Terminal onPathChange={setCurrentPath} />
      )}

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
}

export default App;