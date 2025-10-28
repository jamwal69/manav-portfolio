'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X } from 'lucide-react';
import React from 'react';

interface Command {
  input: string;
  output: string | React.ReactElement;
  timestamp: Date;
}

const COMMANDS = {
  help: `Available commands:
  • about      - Learn about Manav
  • skills     - View technical skills
  • projects   - List featured projects
  • experience - Career history
  • contact    - Get contact information
  • blog       - Recent blog posts
  • resume     - Download resume
  • clear      - Clear terminal
  • exit       - Close terminal`,
  
  about: `Manav Singh Jamwal
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Cybersecurity Engineer | AI Security Researcher

Focused on:
• Application & Mobile Security
• Smart Contract Auditing
• AI-Powered Detection Systems
• Reverse Engineering & Malware Analysis

Currently @ Paytm | Spot Award Winner`,

  skills: `Technical Arsenal:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Cybersecurity]
├── Nmap, Metasploit, Burp Suite
├── Wireshark, OWASP Top 10
└── Kali Linux, Penetration Testing

[Mobile Security]
├── MobSF, JADX, apktool
├── Frida, Objection, Drozer
└── Android Malware Analysis

[Blockchain]
├── Solidity, Web3.js, Hardhat
├── Smart Contract Auditing
└── DeFi Security

[DevOps & Cloud]
├── Docker, Kubernetes, Git
├── AWS Security, CI/CD
└── Linux Administration`,

  projects: `Featured Projects:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[1] DigiCats NFT Game
    ├─ Ethereum smart contracts
    ├─ Web3.js, React, Hardhat
    └─ Status: Live Production
    
[2] People.ai
    ├─ AI-powered hiring evaluator
    ├─ IEEE YESIST12 Finalist
    └─ Python, ML, FastAPI
    
[3] Akagami Security Toolkit
    ├─ Comprehensive pentesting suite
    ├─ FastAPI, React, Python
    └─ Status: Active Development`,

  experience: `Career Timeline:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Current] Paytm
├─ Role: Security Engineer
├─ Achievement: Spot Award 2024
└─ Focus: Application Security, Mobile Security

[Education] MIET Jammu
├─ B.Tech Computer Science
└─ Specialization: Cybersecurity

[Certifications]
├─ IBM Cybersecurity Analyst
├─ Red Hat Linux Certification
└─ TryHackMe Active Contributor`,

  contact: `Contact Information:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📧 Email:    jamwalmanav69@gmail.com
💼 LinkedIn: linkedin.com/in/manavsinghjamwal
🐙 GitHub:   github.com/jamwal69
🌐 Website:  manav-portfolio-three.vercel.app

Available for:
├─ Security Consulting
├─ Penetration Testing
├─ Smart Contract Audits
└─ Technical Advisory`,

  blog: `Recent Blog Posts:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[1] Smart Contract Invariant Testing
    └─ Catching logic drift before audit
    
[2] Android Malware Config Extraction
    └─ Rapid encrypted C2 decoding
    
Type 'blog [number]' to read a post`,

  resume: `Resume Download:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📄 Opening resume viewer...
✓ Available for download
✓ SHA-256 verified
✓ Last updated: October 2025`,
};

export default function CLIMode() {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<Command[]>([]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut to open/close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  // Welcome message
  useEffect(() => {
    if (isOpen && history.length === 0) {
      setHistory([{
        input: '',
        output: `Welcome to MSJ Terminal v2.0
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Manav Singh Jamwal - Cybersecurity Engineer

Type 'help' for available commands
Type 'exit' or press ESC to close
Press ~ to toggle terminal`,
        timestamp: new Date(),
      }]);
    }
  }, [isOpen, history.length]);

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    let output: string | React.ReactElement = '';

    if (!trimmedCmd) {
      return;
    }

    // Add to command history
    setCommandHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);

    if (trimmedCmd === 'clear' || trimmedCmd === 'cls') {
      setHistory([]);
      return;
    }

    if (trimmedCmd === 'exit' || trimmedCmd === 'quit') {
      setIsOpen(false);
      return;
    }

    if (trimmedCmd in COMMANDS) {
      output = COMMANDS[trimmedCmd as keyof typeof COMMANDS];
    } else if (trimmedCmd.startsWith('blog ')) {
      const num = trimmedCmd.split(' ')[1];
      output = `Opening blog post #${num}...\nRedirecting to /blog`;
    } else {
      output = `Command not found: ${cmd}\nType 'help' for available commands`;
    }

    setHistory(prev => [...prev, {
      input: cmd,
      output,
      timestamp: new Date(),
    }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      executeCommand(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex + 1;
        if (newIndex < commandHistory.length) {
          setHistoryIndex(newIndex);
          setInput(commandHistory[commandHistory.length - 1 - newIndex]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-24 right-6 z-50 p-4 bg-gradient-to-r from-green-600 to-cyan-600 rounded-full shadow-2xl hover:shadow-green-500/50 transition-all"
            aria-label="Open Terminal"
          >
            <Terminal className="w-6 h-6 text-white" />
            <span className="absolute -top-8 right-0 text-xs font-mono text-green-400 whitespace-nowrap bg-slate-900 px-2 py-1 rounded border border-green-500/30">
              Press ~
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Terminal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-4 z-50 flex items-center justify-center"
          >
            <div
              className="w-full max-w-4xl h-[600px] bg-black/95 backdrop-blur-md border-2 border-green-500/50 rounded-lg shadow-2xl shadow-green-500/20 flex flex-col overflow-hidden font-mono"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-slate-900 border-b border-green-500/30 px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Terminal className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 text-sm font-semibold">root@msj:~#</span>
                  <span className="text-slate-500 text-xs">Terminal v2.0</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-slate-800 rounded transition-colors text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Output */}
              <div
                ref={outputRef}
                className="flex-1 overflow-y-auto p-4 space-y-3 text-sm"
              >
                {history.map((cmd, i) => (
                  <div key={i} className="space-y-1">
                    {cmd.input && (
                      <div className="flex items-center gap-2">
                        <span className="text-green-400">❯</span>
                        <span className="text-white">{cmd.input}</span>
                      </div>
                    )}
                    <div className="text-cyan-300 whitespace-pre-wrap pl-4">
                      {cmd.output}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <form onSubmit={handleSubmit} className="border-t border-green-500/30 bg-slate-900/50 p-4">
                <div className="flex items-center gap-2">
                  <span className="text-green-400">❯</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent border-none outline-none text-white placeholder-slate-500"
                    placeholder="Type a command..."
                    autoComplete="off"
                    spellCheck="false"
                  />
                </div>
              </form>

              {/* Status Bar */}
              <div className="bg-slate-900 border-t border-green-500/30 px-4 py-1 text-xs text-slate-400 flex items-center justify-between">
                <span>Press ~ to toggle | ESC to close | ↑↓ for history</span>
                <span className="text-green-400">{history.length} commands</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
