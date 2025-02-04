import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Terminal as TerminalIcon, ChevronRight } from 'lucide-react';
import { useTypewriter } from '../hooks/useTypewriter';
import useCommandLine from '../hooks/useCommandLine';
import type { CommandHistory } from '../types';

const ASCII_ART = `
 █████╗ ██╗    ███████╗███╗   ██╗ ██████╗ ██╗███╗   ██╗███████╗███████╗██████╗ 
██╔══██╗██║    ██╔════╝████╗  ██║██╔════╝ ██║████╗  ██║██╔════╝██╔════╝██╔══██╗
███████║██║    █████╗  ██╔██╗ ██║██║  ███╗██║██╔██╗ ██║█████╗  █████╗  ██████╔╝
██╔══██║██║    ██╔══╝  ██║╚██╗██║██║   ██║██║██║╚██╗██║██╔══╝  ██╔══╝  ██╔══██╗
██║  ██║██║    ███████╗██║ ╚████║╚██████╔╝██║██║ ╚████║███████╗███████╗██║  ██║
╚═╝  ╚═╝╚═╝    ╚══════╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝╚═╝  ╚═══╝╚══════╝╚══════╝╚═╝  ╚═╝
`;

const WELCOME_TEXT =
  'Welcome to my Portfolio terminal. Type "help" for available commands.';

interface TerminalProps {
  onPathChange: (path: string) => void;
}

const Terminal: React.FC<TerminalProps> = ({ onPathChange }) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [history, setHistory] = useState<CommandHistory[]>([]);

  const { displayText: welcomeText, isComplete } = useTypewriter(WELCOME_TEXT, {
    speed: 50,
    autoStart: true,
  });

  const { input, setInput, handleCommand, suggestions, currentPath } =
    useCommandLine();

  useEffect(() => {
    onPathChange(currentPath);
  }, [currentPath, onPathChange]);

  const addToHistory = useCallback(
    (command: string, output: React.ReactNode) => {
      setHistory((prev) => [
        ...prev,
        {
          command,
          output,
          timestamp: new Date(),
          path: currentPath,
        },
      ]);
    },
    [currentPath]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!input.trim()) return;

      const output = handleCommand(input);
      if (input.toLowerCase() === 'clear') {
        setHistory([]);
      } else {
        addToHistory(input, output);
      }
      setInput('');
    },
    [input, handleCommand, addToHistory, setInput]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Tab' && suggestions.length > 0) {
        e.preventDefault();
        setInput(suggestions[0]);
      }
    },
    [suggestions, setInput]
  );

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div className="min-h-screen bg-black text-green-400 p-4">
      <div
        ref={terminalRef}
        className="terminal-window max-w-4xl mx-auto overflow-y-auto relative font-mono"
        style={{ height: 'calc(100vh - 2rem)' }}
      >
        <div className="p-6">
          <pre
            className="text-green-500 mb-4 text-xs sm:text-sm overflow-x-auto glitch"
            data-text={ASCII_ART}
          >
            {ASCII_ART}
          </pre>

          <div className="mb-4 flex items-center gap-2">
            <TerminalIcon className="w-4 h-4 text-sky-400" />
            <div className="flex items-center">
              <span>{welcomeText}</span>
              {!isComplete && <span className="ml-1 animate-pulse">█</span>}
            </div>
          </div>

          {history.map((entry, index) => (
            <div
              key={index}
              className="mb-4 hover:bg-green-950/20 hover:shadow-[0_0_15px_rgba(56,189,248,0.1)] transition-all duration-300 rounded p-2"
            >
              <div className="flex items-center gap-2 text-green-300">
                <span className="opacity-75 text-sky-400">{entry.path} $</span>
                <span className="font-bold text-white">{entry.command}</span>
              </div>
              <div className="mt-2 ml-6">{entry.output}</div>
            </div>
          ))}

          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <span className="opacity-75 text-sky-400">{currentPath} $</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-white caret-green-400"
              autoFocus
              spellCheck="false"
              autoCapitalize="off"
              autoComplete="off"
            />
          </form>

          {suggestions.length > 0 && (
            <div className="mt-2 ml-6 space-y-1">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-gray-400 hover:text-white cursor-pointer px-2 py-1 rounded hover:bg-green-950/30 transition-colors"
                  onClick={() => setInput(suggestion)}
                >
                  <ChevronRight className="w-4 h-4 text-sky-400" />
                  <span>{suggestion}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="scanline"></div>
      </div>
    </div>
  );
};

export default Terminal;
