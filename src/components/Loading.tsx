import React from 'react';
import { Terminal } from 'lucide-react';

const Loading: React.FC = () => {
  const [dots, setDots] = React.useState('');
  const [currentStep, setCurrentStep] = React.useState(0);

  const steps = [
    'Initializing terminal...',
    'Loading dependencies...',
    'Configuring environment...',
    'Starting system...',
    'Establishing connection...',
    'Ready'
  ];

  React.useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => prev < steps.length - 1 ? prev + 1 : prev);
    }, 1000);

    return () => {
      clearInterval(dotsInterval);
      clearInterval(stepInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      <div className="w-full max-w-md p-4">
        <div className="mb-8 flex justify-center">
          <Terminal className="w-12 h-12 text-green-400 animate-pulse" />
        </div>
        
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div
              key={step}
              className={`
                transition-opacity duration-500
                ${index > currentStep ? 'opacity-0' : 'opacity-100'}
                ${index === currentStep ? 'text-green-400' : 'text-green-600'}
              `}
            >
              <div className="flex items-center">
                <span className="font-mono">
                  {index <= currentStep ? '>' : ''} {step}
                  {index === currentStep && dots}
                </span>
                {index < currentStep && (
                  <span className="ml-2 text-sky-400">[OK]</span>
                )}
              </div>
              {index < currentStep && (
                <div className="h-px bg-gradient-to-r from-green-500/20 via-green-500/5 to-transparent mt-2" />
              )}
            </div>
          ))}
        </div>

        <div className="mt-8">
          <div className="h-1 bg-black overflow-hidden rounded">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-sky-500 transition-all duration-500"
              style={{ 
                width: `${(currentStep / (steps.length - 1)) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;