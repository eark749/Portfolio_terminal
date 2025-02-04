import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Terminal as TerminalIcon } from 'lucide-react';
import OpenAI from 'openai';

type Message = {
  type: 'user' | 'bot';
  content: string;
  isCommand?: boolean;
};

const INITIAL_MESSAGE = "Hello! I'm your AI terminal assistant. I can help you discover and use terminal commands. Try these commands:\n\n• cd projects - View AI projects\n• cd certificates - View certifications\n• ls - List contents\n• help - Show all commands";

const commandHelp = {
  whoami: "Displays your bio and technical skills",
  "ls projects": "Lists all available projects with descriptions",
  "cat [project_name].txt": "Shows detailed information about a specific project",
  "cd certificates": "Navigate to certificates directory to view certifications",
  "ls certificates": "Lists all your certificates with links",
  resume: "Displays your professional experience and education",
  contact: "Shows all contact information",
  clear: "Clears the terminal screen",
  help: "Shows all available commands"
};

const openai = new OpenAI({
  apiKey: '',
  dangerouslyAllowBrowser: true
});

const SYSTEM_PROMPT = `You are an AI assistant for a terminal-based portfolio website. Your role is to guide users on how to use the terminal commands.

Available terminal commands:
${Object.entries(commandHelp).map(([cmd, desc]) => `- ${cmd}: ${desc}`).join('\n')}

Navigation Tips:
1. In home directory (~):
   - Use 'cd projects' to view AI projects
   - Use 'cd certificates' to view certifications
   - Use 'ls' to see available directories

2. In projects directory (~/projects):
   - Use 'ls' to list all projects
   - Use 'cat [project_name].txt' to view details
   - Use 'cd ..' to go back

3. In certificates directory (~/certificates):
   - Use 'ls' to view all certificates
   - Use 'cd ..' to go back

When users ask about specific information or tasks:
1. Always suggest relevant terminal commands they can use
2. Explain how to navigate to the right directory first
3. Keep responses friendly but technical

Remember: Guide users to use the terminal for commands.`;

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { type: 'bot', content: INITIAL_MESSAGE }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleAIResponse = async (userInput: string) => {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userInput }
        ],
        temperature: 0.7,
        max_tokens: 150
      });

      return completion.choices[0].message.content || "I couldn't process that request. Please try again.";
    } catch (error) {
      console.error('OpenAI API Error:', error);
      return "Sorry, I encountered an error. Please try again later.";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { type: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await handleAIResponse(input);
      setMessages(prev => [...prev, { type: 'bot', content: aiResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: "Sorry, I encountered an error. Please try again later." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="w-12 h-12 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-105"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-black" />
        ) : (
          <MessageSquare className="w-6 h-6 text-black" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 h-96 bg-black border border-green-500 rounded-lg shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-3 bg-green-950/30 border-b border-green-500/30 flex items-center gap-2">
            <TerminalIcon className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-mono">AI Terminal Assistant</span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-2 rounded ${
                    message.type === 'user'
                      ? 'bg-blue-950/30 text-blue-400'
                      : 'bg-green-950/20 text-green-400'
                  }`}
                >
                  <pre className="whitespace-pre-wrap font-mono text-sm">
                    {message.content}
                  </pre>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-green-950/20 text-green-400 p-2 rounded">
                  <div className="flex gap-1">
                    <span className="animate-bounce">.</span>
                    <span className="animate-bounce delay-100">.</span>
                    <span className="animate-bounce delay-200">.</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-3 bg-green-950/30 border-t border-green-500/30">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isLoading ? "Processing..." : "Ask about commands..."}
                disabled={isLoading}
                className="flex-1 bg-black border border-green-500/30 rounded px-3 py-1 text-blue-400 font-mono text-sm focus:outline-none focus:border-blue-500 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded p-2 transition-colors disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
