import React, { useState } from 'react';
import { Terminal, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';

interface CommandStep {
  command: string;
  description: string;
}

const navigationSteps = {
  home: [
    { command: 'cd projects', description: 'View AI projects' },
    { command: 'cd certificates', description: 'View certifications' },
    { command: 'ls', description: "See what's available" },
  ],
  projects: [
    { command: 'ls', description: 'List all projects' },
    { command: 'cat [project_name].txt', description: 'View project details' },
    { command: 'cd ..', description: 'Go back home' },
  ],
  certificates: [
    { command: 'ls', description: 'View all certificates' },
    { command: 'cd ..', description: 'Go back home' },
  ],
};

const CommandNav: React.FC<{ currentPath: string }> = ({ currentPath }) => {
  const [isOpen, setIsOpen] = useState(false);

  const getCurrentDirectory = () => {
    if (currentPath.includes('projects')) return 'projects';
    if (currentPath.includes('certificates')) return 'certificates';
    return 'home';
  };

  const currentSteps =
    navigationSteps[getCurrentDirectory() as keyof typeof navigationSteps];

  return (
    <div className="fixed top-20 right-4 z-50 font-mono transition-all duration-500 max-w-sm">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full mb-2 px-3 py-1.5 bg-black border border-green-500/30 rounded-lg shadow-lg flex items-center gap-2 hover:bg-green-950/30 transition-all duration-300"
      >
        <Terminal className="w-3 h-3 text-sky-400" />
        <span className="text-green-400 text-sm">Commands</span>
        {isOpen ? (
          <ChevronUp className="w-3 h-3 text-sky-400 ml-auto" />
        ) : (
          <ChevronDown className="w-3 h-3 text-sky-400 ml-auto" />
        )}
      </button>

      {/* Sliding Panel */}
      <div
        className={`
          bg-black border border-green-500/30 rounded-lg shadow-lg overflow-hidden
          transition-all duration-300 ease-in-out w-64
          ${isOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="p-3 space-y-1.5">
          {currentSteps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col gap-0.5 text-xs hover:bg-green-950/20 p-1 rounded group transition-colors"
            >
              <div className="flex items-center gap-1.5">
                <ChevronRight className="w-3 h-3 text-sky-400 group-hover:translate-x-1 transition-transform" />
                <span className="text-green-400 font-mono">{step.command}</span>
              </div>
              <span className="text-gray-400 ml-4 text-xs">
                {step.description}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommandNav;
