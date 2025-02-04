import React, { useState, useEffect } from 'react';
import { Brain, Timer } from 'lucide-react';

interface Model {
  name: string;
  completionDate: Date;
}

const models: Model[] = [
  { name: "Neural Network Visualizer", completionDate: new Date('2024-03-15') },
  { name: "LLM Training Pipeline", completionDate: new Date('2024-04-01') },
  { name: "Computer Vision Suite", completionDate: new Date('2024-04-15') },
  { name: "NLP Toolkit", completionDate: new Date('2024-05-01') },
];

const ModelStats: React.FC = () => {
  const [nextDeadline, setNextDeadline] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const upcomingModels = models.filter(model => model.completionDate > now);
      
      if (upcomingModels.length === 0) {
        setNextDeadline('All projects completed');
        setTimeLeft('');
        return;
      }

      const nextModel = upcomingModels[0];
      const timeDiff = nextModel.completionDate.getTime() - now.getTime();
      
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      setNextDeadline(nextModel.name);
      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-16 right-4 z-50 font-mono bg-black border border-green-500/30 rounded-lg shadow-lg overflow-hidden">
      <div className="px-4 py-2 bg-green-950/30 border-b border-green-500/30 flex items-center gap-2">
        <Brain className="w-4 h-4 text-sky-400" />
        <span className="text-green-400">AI Models</span>
      </div>
      
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between gap-4">
          <span className="text-sky-400">Total Models:</span>
          <span className="text-green-400">{models.length}</span>
        </div>
        
        <div className="flex items-center justify-between gap-4">
          <span className="text-sky-400">Completed:</span>
          <span className="text-green-400">
            {models.filter(m => m.completionDate < new Date()).length}
          </span>
        </div>

        <div className="pt-2 border-t border-green-500/30">
          <div className="text-sm text-sky-400">Next Deadline:</div>
          <div className="text-green-400 font-bold">{nextDeadline}</div>
          {timeLeft && (
            <div className="flex items-center gap-2 mt-1 text-sm">
              <Timer className="w-3 h-3 text-sky-400" />
              <span className="text-green-400">{timeLeft}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModelStats;