'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useOSStore } from '@/store/osStore';

const helpText = `Available commands:
  help       - Show this help message
  about      - Display brief information about me
  whoami     - Display current user
  skills     - List technical skills
  projects   - Show featured projects
  resume     - Download or view resume
  education  - Show educational background
  github     - Open GitHub profile
  linkedin   - Open LinkedIn profile
  contact    - Show contact information
  clear      - Clear terminal output
  ask <msg>  - Ask the AI Assistant a question directly`;

const commandsList = [
  'help', 'about', 'whoami', 'skills', 'projects', 'resume', 
  'education', 'github', 'linkedin', 'contact', 'clear', 'ask'
];

export default function TerminalApp() {
  const [history, setHistory] = useState<{ type: 'input' | 'output' | 'system', text: string }[]>([
    { type: 'system', text: 'Welcome to SUBHANKAR.OS Terminal v3.1.0\nType "help" for a list of available commands.' }
  ]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const endRef = useRef<HTMLDivElement>(null);
  
  const { openApp, addNotification } = useOSStore();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const rawCmd = cmd.trim();
    const trimmedCmd = rawCmd.toLowerCase();
    
    setHistory(prev => [...prev, { type: 'input', text: `visitor@subhankar.os:~$ ${rawCmd}` }]);
    if (rawCmd) {
      setCommandHistory(prev => [rawCmd, ...prev]);
      setHistoryIndex(-1);
    }
    
    if (trimmedCmd === '') return;
    
    let output = '';
    
    if (trimmedCmd.startsWith('ask ')) {
      const query = rawCmd.substring(4);
      addNotification({ title: 'AI Assistant', message: `Query sent: ${query}`, type: 'info' });
      openApp('assistant');
      output = `Processing query: "${query}"... Handing off to visual AI Assistant.`;
    } else {
      switch (trimmedCmd) {
        case 'sudo hire subhankar':
          output = "🎉 SUCCESS! Initiating hiring protocols... Launching contact portal...";
          openApp('contact');
          break;
        case 'skills --list':
          output = `Loading neural pathways...
[ OK ] Python
[ OK ] C / C++
[ OK ] Java
[ OK ] JavaScript / TypeScript
[ OK ] React & Next.js
[ OK ] Node.js & FastAPI
[ OK ] YOLOv8 & PyTorch
[ OK ] OpenCV & Deep Learning
[ OK ] SQL, MySQL, MongoDB`;
          break;
        case 'help':
          output = helpText;
          break;
        case 'about':
          output = "Subhankar Nandi - B.Tech CSE (AI & ML) Student passionate about intelligent applications.";
          openApp('about');
          break;
        case 'whoami':
          output = "visitor (guest mode)";
          break;
        case 'skills':
          output = "Python, C++, JavaScript, Next.js, React, Node.js, ML, Deep Learning...";
          openApp('skills');
          break;
        case 'projects':
          output = "Opening projects directory...";
          openApp('projects');
          break;
        case 'resume':
          output = "Fetching resume data...";
          openApp('resume');
          break;
        case 'education':
          output = "B.Tech Computer Science & Engineering (Artificial Intelligence & Machine Learning)";
          break;
        case 'github':
          output = "Redirecting to GitHub...";
          window.open('https://github.com/Subhankarnandi777', '_blank');
          break;
        case 'linkedin':
          output = "Redirecting to LinkedIn...";
          window.open('https://www.linkedin.com/in/subhankar-nandi-/', '_blank');
          break;
        case 'contact':
          output = "Opening contact form...";
          openApp('contact');
          break;
        case 'clear':
          setHistory([]);
          return;
        default:
          output = `Command not found: ${trimmedCmd}. Type "help" for available commands.`;
      }
    }
    
    if (output) {
      setHistory(prev => [...prev, { type: 'output', text: output }]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const nextIndex = historyIndex + 1;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const match = commandsList.find(c => c.startsWith(input.toLowerCase()));
      if (match) {
        setInput(match);
      }
    }
  };

  return (
    <div className="p-4 h-full bg-black/90 text-gray-300 font-mono text-sm overflow-y-auto" onClick={() => document.getElementById('terminal-input')?.focus()}>
      {history.map((line, idx) => (
        <div 
          key={idx} 
          className={`mb-1 ${
            line.type === 'input' ? 'text-white' : 
            line.type === 'system' ? 'text-purple' : 'text-cyan whitespace-pre-wrap'
          }`}
        >
          {line.text}
        </div>
      ))}
      <div className="flex items-center text-white mt-2">
        <span className="text-cyan mr-2">visitor@subhankar.os:~$</span>
        <input
          id="terminal-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none border-none caret-cyan"
          autoFocus
          autoComplete="off"
          spellCheck="false"
        />
      </div>
      <div ref={endRef} />
    </div>
  );
}
