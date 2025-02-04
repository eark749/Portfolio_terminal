import React, { useState, useEffect } from 'react';

const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50 font-mono text-lg bg-black border border-green-500/30 px-4 py-2 rounded-lg shadow-lg transition-all duration-500">
      <div className="text-green-400 flex items-center gap-2">
        <span className="animate-pulse text-xs">⚡</span>
        {time.toLocaleTimeString('en-US', { 
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })}
      </div>
    </div>
  );
};

export default Clock;