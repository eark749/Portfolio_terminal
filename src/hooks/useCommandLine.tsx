import React, { useState } from 'react';
import { Terminal, ChevronRight, Download, Award, Mail, Phone, MapPin, Linkedin, Github, Twitter } from 'lucide-react';
import { resume } from '../data/resume';
import { certificates } from '../data/certificates';
import { contact } from '../data/contact';
import { projects } from '../data/projects';

interface CommandButtonProps {
  command: string;
  description: string;
}

const CommandButton: React.FC<CommandButtonProps> = ({ command, description }) => (
  <div className="group flex items-center gap-2 hover:bg-green-950/30 p-2 rounded-lg transition-all duration-200 cursor-pointer">
    <ChevronRight className="w-4 h-4 text-sky-400 group-hover:translate-x-1 transition-transform" />
    <span className="text-sky-400 font-bold">{command}</span>
    <span className="text-green-400">-</span>
    <span className="text-gray-400">{description}</span>
  </div>
);

const useCommandLine = () => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [currentDirectory, setCurrentDirectory] = useState('home');

  const isInProjectsDirectory = React.useCallback(() => {
    return currentDirectory === 'projects';
  }, [currentDirectory]);

  const isInCertificatesDirectory = React.useCallback(() => {
    return currentDirectory === 'certificates';
  }, [currentDirectory]);

  const getPromptPath = React.useCallback(() => {
    if (isInProjectsDirectory()) return '~/projects';
    if (isInCertificatesDirectory()) return '~/certificates';
    return '~';
  }, [isInProjectsDirectory, isInCertificatesDirectory]);

  const generateResumeMarkdown = () => {
    return `# ${resume.name}
## ${resume.title}

${resume.summary}

## Experience
${resume.experience.map(job => `
### ${job.title} at ${job.company}
${job.period}
${job.highlights.map(h => `- ${h}`).join('\n')}`).join('\n')}

## Education
${resume.education.map(edu => `
### ${edu.degree}
${edu.school} | ${edu.period}
${edu.details}`).join('\n')}

## Skills
${Object.entries(resume.skills).map(([category, skills]) => `
### ${category.replace('_', ' ')}
${skills.join(', ')}`).join('\n')}`;
  };

  const downloadResume = () => {
    const markdown = generateResumeMarkdown();
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vansh_soni_resume.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const commands = React.useMemo(() => ({
    cd: (args: string[]) => {
      const destination = args[0];

      if (!destination || destination === '~' || destination === '..') {
        setCurrentDirectory('home');
        return 'Changed to home directory';
      }

      if (destination === 'projects') {
        setCurrentDirectory('projects');
        return 'Changed to projects directory';
      }

      if (destination === 'certificates') {
        setCurrentDirectory('certificates');
        return 'Changed to certificates directory';
      }

      return `cd: ${destination}: No such directory`;
    },

    ls: () => {
      if (isInProjectsDirectory()) {
        return (
          <div className="text-green-400">
            <div className="mb-2 text-sky-400">total {projects.length}</div>
            {projects.map((project, index) => (
              <div
                key={index}
                className="mb-4 hover:bg-green-950/20 p-2 rounded transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sky-400">-rw-r--r--</span>
                  <span className="font-bold">{project.name}.txt</span>
                </div>
                <p className="ml-4 opacity-80">{project.description}</p>
                <p className="ml-4 text-green-300 text-sm">
                  Stack: {project.technologies.join(', ')}
                </p>
              </div>
            ))}
          </div>
        );
      }

      if (isInCertificatesDirectory()) {
        return (
          <div className="text-green-400">
            <div className="mb-2 text-sky-400">total {certificates.length}</div>
            {certificates.map((cert, index) => (
              <div
                key={index}
                className="mb-4 hover:bg-green-950/20 p-2 rounded transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-sky-400" />
                  <span className="font-bold">{cert.name}</span>
                </div>
                <div className="ml-6 text-sm">
                  <p className="text-gray-400">Issuer: {cert.issuer}</p>
                  <p className="text-gray-400">Date: {cert.date}</p>
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-400 hover:underline"
                  >
                    View Certificate
                  </a>
                </div>
              </div>
            ))}
          </div>
        );
      }

      return (
        <div className="text-green-400">
          <div className="flex items-center gap-2">
            <span className="text-sky-400">drwxr-xr-x</span>
            <span className="font-bold">projects/</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sky-400">drwxr-xr-x</span>
            <span className="font-bold">certificates/</span>
          </div>
        </div>
      );
    },

    cat: (args: string[]) => {
      if (!isInProjectsDirectory()) {
        return (
          <div className="text-red-400">
            Please cd into the projects directory first
          </div>
        );
      }

      if (!args[0]) {
        return (
          <div className="text-red-400">Please specify a file to read</div>
        );
      }

      const fileName = args[0].replace('.txt', '');
      const project = projects.find(
        (p) => p.name.toLowerCase() === fileName.toLowerCase()
      );

      if (!project) {
        return <div className="text-red-400">cat: {args[0]}: No such file</div>;
      }

      return (
        <div className="text-green-400">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-sky-400">{project.name}</h2>
            <p className="text-sm opacity-75">
              Repository:{' '}
              <a
                href={project.link}
                className="text-sky-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {project.link}
              </a>
            </p>
          </div>
          
          {project.image && (
            <div className="mb-4 rounded-lg overflow-hidden border border-green-500/30">
              <img 
                src={project.image} 
                alt={project.name}
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}

          <div className="mb-4">
            <h3 className="font-bold mb-2">Description:</h3>
            <p className="ml-2">{project.description}</p>
          </div>
          <div className="mb-4">
            <h3 className="font-bold mb-2">Technical Details:</h3>
            <pre className="ml-2 whitespace-pre-wrap">{project.details}</pre>
          </div>
          <div className="mb-4">
            <h3 className="font-bold mb-2">Technologies:</h3>
            <div className="ml-2 flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-green-950/30 rounded text-sky-400"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      );
    },

    pwd: () => <div className="text-green-400">{getPromptPath()}</div>,

    whoami: () => (
      <div className="text-green-400">
        <h2 className="text-xl font-bold mb-2">AI Research Engineer</h2>
        <p className="mb-4">
          Specializing in neural networks and ethical AI development
        </p>
        <h3 className="text-lg font-bold mb-2">Core Skills:</h3>
        <ul className="ml-4 mb-4 space-y-1">
          <li>• Deep Learning Architecture Design</li>
          <li>• Natural Language Processing</li>
          <li>• Computer Vision Systems</li>
          <li>• Ethical AI Development</li>
          <li>• MLOps & Infrastructure</li>
        </ul>
        <div className="mt-4 p-2 bg-green-950/20 rounded">
          <p className="text-sky-400">Status: Available for collaboration</p>
          <p className="text-green-300">Location: Remote</p>
        </div>
      </div>
    ),

    resume: () => (
      <div className="text-green-400 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{resume.name}</h1>
          <button
            onClick={downloadResume}
            className="flex items-center gap-2 px-3 py-1 bg-green-950/30 hover:bg-green-950/50 rounded border border-green-500/30 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
        </div>
        
        <div>
          <h2 className="text-xl text-sky-400">{resume.title}</h2>
          <p className="mt-2 opacity-80">{resume.summary}</p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3">Experience</h2>
          {resume.experience.map((job, index) => (
            <div key={index} className="mb-4 pl-4 border-l border-green-500/30">
              <h3 className="text-lg text-sky-400">{job.title}</h3>
              <p className="text-sm opacity-80">{job.company} | {job.period}</p>
              <ul className="mt-2 space-y-1">
                {job.highlights.map((highlight, i) => (
                  <li key={i}>• {highlight}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3">Education</h2>
          {resume.education.map((edu, index) => (
            <div key={index} className="mb-4 pl-4 border-l border-green-500/30">
              <h3 className="text-lg text-sky-400">{edu.degree}</h3>
              <p className="text-sm opacity-80">{edu.school} | {edu.period}</p>
              <p className="mt-1">{edu.details}</p>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(resume.skills).map(([category, skillList]) => (
              <div key={category}>
                <h3 className="text-sky-400 mb-2 capitalize">{category.replace('_', ' ')}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillList.map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-green-950/30 rounded text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),

    contact: () => (
      <div className="text-green-400 space-y-6">
        <div className="flex items-center gap-2 text-xl font-bold text-sky-400">
          <Mail className="w-5 h-5" />
          <span>Contact Information</span>
        </div>

        <div className="space-y-4 bg-green-950/20 p-4 rounded-lg border border-green-500/30">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-sky-400" />
              <a href={`mailto:${contact.email}`} className="text-green-400 hover:underline">
                {contact.email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-sky-400" />
              <span className="text-green-400">{contact.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-sky-400" />
              <span className="text-green-400">{contact.location}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-green-500/30">
            <h3 className="text-sky-400 mb-2">Social Profiles</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Linkedin className="w-4 h-4 text-sky-400" />
                <a href={contact.social.linkedin} target="_blank" rel="noopener noreferrer" 
                   className="text-green-400 hover:underline">
                  LinkedIn Profile
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Github className="w-4 h-4 text-sky-400" />
                <a href={contact.social.github} target="_blank" rel="noopener noreferrer"
                   className="text-green-400 hover:underline">
                  GitHub Profile
                </a>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-green-500/30">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                contact.availability.status === 'available' ? 'bg-green-500' :
                contact.availability.status === 'busy' ? 'bg-yellow-500' :
                'bg-red-500'
              } animate-pulse`}></div>
              <span className="text-sky-400">Status:</span>
              <span className="text-green-400">{contact.availability.message}</span>
            </div>
          </div>
        </div>
      </div>
    ),

    help: () => (
      <div className="text-green-400 space-y-4">
        <div className="flex items-center gap-2 mb-6">
          <Terminal className="w-5 h-5 text-sky-400" />
          <h2 className="text-xl font-bold">Available Commands</h2>
        </div>
        
        <div className="space-y-2 bg-black/50 p-4 rounded-lg border border-green-500/20">
          <CommandButton 
            command="cd projects" 
            description="Navigate to projects directory" 
          />
          <CommandButton 
            command="cd certificates" 
            description="Navigate to certificates directory" 
          />
          <CommandButton 
            command="cd .." 
            description="Go back to home directory" 
          />
          <CommandButton 
            command="ls" 
            description="List contents of current directory" 
          />
          <CommandButton 
            command="cat [filename]" 
            description="View file contents" 
          />
          <CommandButton 
            command="pwd" 
            description="Print working directory" 
          />
          <CommandButton 
            command="whoami" 
            description="Display bio and skills" 
          />
          <CommandButton 
            command="resume" 
            description="View and download detailed resume" 
          />
          <CommandButton 
            command="contact" 
            description="View contact information" 
          />
          <CommandButton 
            command="clear" 
            description="Clear the terminal" 
          />
          <CommandButton 
            command="help" 
            description="Show this help message" 
          />
        </div>

        <div className="mt-4 text-sm text-gray-400">
          <p>Tip: Use <span className="text-sky-400">Tab</span> key to autocomplete commands</p>
          <p>Tip: Commands are case-insensitive</p>
        </div>
      </div>
    ),

    clear: () => null,
  }), [isInProjectsDirectory, isInCertificatesDirectory, getPromptPath]);

  const handleCommand = React.useCallback((cmd: string) => {
    const parts = cmd.trim().split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    const commandFunction = commands[command as keyof typeof commands];

    if (typeof commandFunction === 'function') {
      return commandFunction(args);
    }

    return (
      <span className="text-red-400">
        Command not found. Type 'help' for available commands.
      </span>
    );
  }, [commands]);

  const updateSuggestions = React.useCallback(
    (value: string) => {
      const baseCommands = [
        'cd projects',
        'cd certificates',
        'cd ..',
        'ls',
        'pwd',
        'whoami',
        'resume',
        'contact',
        'clear',
        'help',
      ];
      const projectCommands = isInProjectsDirectory()
        ? projects.map((p) => `cat ${p.name}.txt`)
        : [];

      const availableCommands = [...baseCommands, ...projectCommands];

      const filtered = availableCommands.filter(
        (cmd) =>
          cmd.toLowerCase().startsWith(value.toLowerCase()) &&
          cmd.toLowerCase() !== value.toLowerCase()
      );
      setSuggestions(filtered);
    },
    [isInProjectsDirectory]
  );

  return {
    input,
    setInput,
    handleCommand,
    suggestions,
    updateSuggestions,
    currentPath: getPromptPath(),
  };
};

export default useCommandLine;