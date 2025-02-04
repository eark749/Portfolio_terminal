import { useState, useEffect, useCallback } from 'react';

interface TypewriterOptions {
  speed?: number;
  autoStart?: boolean;
}

interface TypewriterState {
  displayText: string;
  isComplete: boolean;
}

export const useTypewriter = (
  text: string,
  options: TypewriterOptions = {}
): TypewriterState => {
  const { speed = 100, autoStart = true } = options;
  const [state, setState] = useState<TypewriterState>({
    displayText: '',
    isComplete: false
  });

  useEffect(() => {
    if (!autoStart) return;
    
    let currentIndex = 0;
    const timer = setInterval(() => {
      if (currentIndex < text.length) {
        setState(prev => ({
          displayText: text.slice(0, currentIndex + 1),
          isComplete: currentIndex + 1 === text.length
        }));
        currentIndex++;
      } else {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed, autoStart]);

  return state;
};