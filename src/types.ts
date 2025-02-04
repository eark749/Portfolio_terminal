export type Command = {
  name: string;
  description: string;
  action: () => void;
};

export type CommandHistory = {
  command: string;
  output: React.ReactNode;
  timestamp: Date;
};

export type Project = {
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  details?: string;
};

export type TerminalContextType = {
  history: CommandHistory[];
  addToHistory: (command: string, output: React.ReactNode) => void;
  clearHistory: () => void;
};