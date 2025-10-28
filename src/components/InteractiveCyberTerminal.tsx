'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TerminalCommand {
  command: string;
  output: string[];
  color?: string;
}

interface InteractiveCyberTerminalProps {
  className?: string;
  onExit?: () => void; // optional callback when 'exit' command issued
}

export default function InteractiveCyberTerminal({ className = '', onExit }: InteractiveCyberTerminalProps) {
  // focus trap
  const containerRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalCommand[]>([]);
    const [currentPath] = useState('~/portfolio');
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands = {
    help: {
      output: [
        'Available commands:',
        '  ls          - List portfolio contents',
        '  cd <dir>    - Change directory',
        '  cat <file>  - Display file contents',
        '  skills      - Show technical skills',
        '  projects    - Display project portfolio',
        '  contact     - Show contact information',
        '  resume      - Download resume',
        '  hack        - Initialize hacking simulation',
        '  ai          - Launch AI assistant',
        '  clear       - Clear terminal',
        '  exit        - Exit terminal'
      ],
      color: '#00ffff'
    },
    ls: {
      output: [
        'total 8',
        'drwxr-xr-x  2 manav  staff   64 Aug  6 2025 skills/',
        'drwxr-xr-x  3 manav  staff   96 Aug  6 2025 projects/',
        'drwxr-xr-x  2 manav  staff   64 Aug  6 2025 certifications/',
        '-rw-r--r--  1 manav  staff  2.1K Aug  6 2025 about.txt',
        '-rw-r--r--  1 manav  staff  1.5K Aug  6 2025 contact.txt',
        '-rw-r--r--  1 manav  staff  3.2K Aug  6 2025 resume.pdf',
        '-rwxr-xr-x  1 manav  staff  4.8K Aug  6 2025 ai-assistant*'
      ],
      color: '#00ff00'
    },
    skills: {
      output: [
        '=== CYBERSECURITY ARSENAL ===',
        '• Penetration Testing: Nmap, Metasploit, Burp Suite',
        '• Network Security: Wireshark, pfSense, Snort',
        '• Vulnerability Assessment: OWASP, Nessus',
        '',
        '=== AI/ML TOOLKIT ===',
        '• Languages: Python, R, SQL',
        '• Frameworks: scikit-learn, TensorFlow, PyTorch',
        '• APIs: FastAPI, Flask, REST',
        '',
        '=== BLOCKCHAIN TECH ===',
        '• Smart Contracts: Solidity, Hardhat',
        '• Web3: Web3.js, Ethers.js',
        '• Platforms: Ethereum, Polygon',
        '',
        '=== DEVOPS & AUTOMATION ===',
        '• Containers: Docker, Kubernetes',
        '• Cloud: AWS, Azure, GCP',
        '• Scripting: Bash, PowerShell, Python'
      ],
      color: '#ff6b35'
    },
    projects: {
      output: [
        '=== PROJECT PORTFOLIO ===',
        '',
        '[1] DigiCats NFT Game',
        '    Smart contract-based gaming ecosystem',
        '    Tech: Solidity, Web3.js, React',
        '',
        '[2] People.ai - IEEE YESIST12 Finalist',
        '    AI-powered hiring evaluation system',
        '    Tech: Python, ML algorithms, FastAPI',
        '',
        '[3] Akagami Cybersecurity Toolkit',
        '    Comprehensive penetration testing suite',
        '    Tech: Python, Network protocols, CLI',
        '',
        'Use "cat projects/<name>" for detailed info'
      ],
      color: '#9d4edd'
    },
    contact: {
      output: [
        '=== SECURE COMMUNICATION CHANNELS ===',
        '',
        '📧 Email: jamwalmanav69@gmail.com',
        '🔗 LinkedIn: https://linkedin.com/in/manavsinghjamwal/',
        '💻 GitHub: https://github.com/jamwal69',
        '🌐 Website: https://msj.dev',
        '',
        '🔒 PGP Key: Available on request',
        '🛡️  Available 24/7 for security emergencies'
      ],
      color: '#06ffa5'
    },
    hack: {
      output: [
        'Initializing hacking simulation...',
        '',
        'TARGET ACQUIRED: 192.168.1.100',
        'SCANNING PORTS... [████████████] 100%',
        'VULNERABILITIES FOUND: 3 critical, 7 medium',
        '',
        'EXPLOITATION ATTEMPT...',
        'ACCESS GRANTED ✓',
        '',
        '⚠️  This is a simulation for demonstration purposes',
        '⚠️  Ethical hacking practices always apply'
      ],
      color: '#ff073a'
    },
    about: {
      output: [
        'CLASSIFIED FILE: MANAV SINGH JAMWAL',
        '================================',
        '',
        'I am a cybersecurity engineer with a deep passion for',
        'building secure, intelligent systems that blend the power',
        'of AI/ML and blockchain technologies.',
        '',
        'CLEARANCE LEVEL: TOP SECRET',
        'SPECIALIZATION: Threat modeling, automation,',
        'decentralized security frameworks',
        '',
        'ACHIEVEMENTS:',
        '• Spot Award at Paytm for security contributions',
        '• IEEE YESIST12 Finalist for innovative tech solutions',
        '• Certified: IBM Cybersecurity, Red Hat, Palo Alto'
      ],
      color: '#ffd60a'
    }
  };

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    let output: string[] = [];
    let color = '#ffffff';

    if (trimmedCmd === '') return;

    if (trimmedCmd === 'clear') {
      setHistory([]);
      return;
    }

    if (trimmedCmd === 'exit') {
      output = ['Terminating secure session...', 'Connection closed.'];
      color = '#ff073a';
      // trigger parent close after short delay to let output render
      setTimeout(() => { onExit?.(); }, 300);
    } else if (trimmedCmd === 'resume') {
      output = ['Downloading resume...', 'File: MANAV_SINGH_JAMWAL_Resume.pdf'];
      color = '#00ffff';
      // Trigger resume download
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = '/resume.pdf';
        link.download = 'MANAV_SINGH_JAMWAL_Resume.pdf';
        link.click();
      }, 1000);
    } else if (trimmedCmd === 'ai') {
      output = ['Launching AI Assistant...', 'Neural networks activated ✓'];
      color = '#9d4edd';
      // You could trigger the chatbot here
    } else if (commands[trimmedCmd as keyof typeof commands]) {
      const command = commands[trimmedCmd as keyof typeof commands];
      output = command.output;
      color = command.color || '#ffffff';
    } else {
      output = [
        `Command not found: ${cmd}`,
        'Type "help" for available commands'
      ];
      color = '#ff073a';
    }

    setHistory(prev => [...prev, {
      command: cmd,
      output,
      color
    }]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(input);
      setInput('');
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    // Welcome message
    setHistory([{
      command: 'system',
      output: [
        'MSJ CYBERSECURITY TERMINAL v2.1.0',
        'Quantum-encrypted connection established',
        '',
        'Welcome, visitor. You are now connected to a secure terminal.',
        'Type "help" to explore available commands.',
        '',
        'WARNING: All activities are monitored and logged.'
      ],
      color: '#00ffff'
    }]);
  }, []);

  useEffect(()=>{
    if(containerRef.current){
      const focusables = containerRef.current.querySelectorAll('input,button');
      (focusables[0] as HTMLElement | undefined)?.focus();
    }
  },[]);
  return (
    <div ref={containerRef} role="dialog" aria-modal="true" aria-label="Cyber terminal" className={`bg-black border border-cyan-400 rounded-lg overflow-hidden font-mono ${className}`}>
      {/* Terminal Header */}
      <div className="flex items-center justify-between p-3 bg-cyan-900/20 border-b border-cyan-400/30">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="text-cyan-400 text-sm">MSJ SECURE TERMINAL</span>
        <div className="text-green-400 text-xs">ONLINE</div>
      </div>

      {/* Terminal Content */}
      <div
        ref={terminalRef}
        className="h-96 overflow-y-auto p-4 text-sm"
        style={{ 
          scrollbarWidth: 'thin',
          scrollbarColor: '#00ffff #000000'
        }}
      >
        <AnimatePresence>
          {history.map((entry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-4"
            >
              {entry.command !== 'system' && (
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-green-400">manav@msj.dev</span>
                  <span className="text-white">:</span>
                  <span className="text-blue-400">{currentPath}</span>
                  <span className="text-white">$</span>
                  <span className="text-white">{entry.command}</span>
                </div>
              )}
              <div style={{ color: entry.color }}>
                {entry.output.map((line, lineIndex) => (
                  <div key={lineIndex} className="leading-relaxed">
                    {line}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Input Line */}
        <div className="flex items-center gap-2 mt-4">
          <span className="text-green-400">manav@msj.dev</span>
          <span className="text-white">:</span>
          <span className="text-blue-400">{currentPath}</span>
          <span className="text-white">$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-transparent text-white outline-none ml-1"
            placeholder="Type a command..."
            autoFocus
          />
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="text-white"
          >
            |
          </motion.span>
        </div>
      </div>
    </div>
  );
}
