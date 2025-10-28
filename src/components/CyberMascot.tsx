'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, MessageCircle, Minimize2 } from 'lucide-react';
import Image from 'next/image';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const knowledgeBase = {
  skills: {
    security: ['Penetration Testing', 'Vulnerability Assessment', 'Threat Modeling', 'Security Auditing', 'eBPF/Falco', 'OWASP Top 10'],
    blockchain: ['Solidity', 'Smart Contracts', 'Foundry', 'Hardhat', 'DeFi', 'Web3.js'],
    mobile: ['Android Security', 'Reverse Engineering', 'Frida', 'APK Analysis', 'MobSF', 'Dynamic Analysis'],
    backend: ['Node.js', 'Python', 'Go', 'REST APIs', 'GraphQL', 'Microservices'],
    tools: ['Burp Suite', 'Metasploit', 'Wireshark', 'IDA Pro', 'Ghidra', 'Docker', 'Kubernetes']
  },
  experience: [
    { company: 'Paytm', role: 'Security Engineer', duration: '2022-Present', focus: 'Runtime security & threat detection' },
    { company: 'People.ai', role: 'Backend Developer', duration: '2021-2022', focus: 'Enterprise SaaS platform' },
    { company: 'DigiCats', role: 'Blockchain Developer', duration: '2020-2021', focus: 'NFT marketplace & smart contracts' }
  ],
  projects: [
    { name: 'Runtime Alert Pipeline', tech: ['eBPF', 'Falco', 'Go'], impact: '57% reduction in false positives' },
    { name: 'Smart Contract Auditing', tech: ['Solidity', 'Foundry', 'Slither'], impact: 'Zero re-entrancy vulnerabilities' },
    { name: 'APK Security Analysis', tech: ['Frida', 'JADX', 'MobSF'], impact: 'Automated malware detection pipeline' }
  ]
};

export default function CyberMascot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        setIsMinimized(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isOpen]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateResponse(inputValue);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1000);
  };

  const generateResponse = (question: string): string => {
    const lowerQ = question.toLowerCase();
    
    if (lowerQ.includes('skill') || lowerQ.includes('technology') || lowerQ.includes('tech stack')) {
      return `I have expertise across multiple domains:\n\n🛡️ Security: ${knowledgeBase.skills.security.join(', ')}\n⛓️ Blockchain: ${knowledgeBase.skills.blockchain.join(', ')}\n📱 Mobile: ${knowledgeBase.skills.mobile.join(', ')}\n🔧 Backend: ${knowledgeBase.skills.backend.join(', ')}\n🔨 Tools: ${knowledgeBase.skills.tools.join(', ')}`;
    }
    
    if (lowerQ.includes('experience') || lowerQ.includes('work') || lowerQ.includes('job')) {
      return knowledgeBase.experience.map(exp => 
        `${exp.role} at ${exp.company} (${exp.duration})\nFocus: ${exp.focus}`
      ).join('\n\n');
    }
    
    if (lowerQ.includes('project')) {
      return knowledgeBase.projects.map(proj => 
        `${proj.name}\nTech: ${proj.tech.join(', ')}\n${proj.impact}`
      ).join('\n\n');
    }
    
    if (lowerQ.includes('contact') || lowerQ.includes('email') || lowerQ.includes('reach')) {
      return "You can reach me at:\n📧 Email: contact@manavjamwal.dev\n🔗 GitHub: github.com/jamwal69\n🔗 LinkedIn: linkedin.com/in/manavjamwal\n🎯 TryHackMe: tryhackme.com/p/jamwal";
    }

    return "I can help you learn about my skills, experience, projects, and how to contact me. What would you like to know?";
  };

  const quickQuestions = [
    "What are your main skills?",
    "Tell me about your experience",
    "What projects have you worked on?",
    "How can I contact you?"
  ];

  const handleOpenChat = () => {
    setIsOpen(true);
    setIsMinimized(false);
    if (messages.length === 0) {
      setMessages([{
        role: 'assistant',
        content: "Hi! I'm MSJ's AI assistant. Ask me anything about experience, skills, projects, or how to get in touch!",
        timestamp: new Date()
      }]);
    }
  };

  // Idle mascot with chat button
  if (!isOpen) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <div className="relative">
          {/* Mascot */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpenChat}
            className="relative w-20 h-20 cursor-pointer bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full p-2 border-2 border-cyan-400/50 hover:border-cyan-400 transition-all shadow-2xl hover:shadow-cyan-500/50"
          >
            <Image
              src="/mascot.svg"
              alt="Cyber Assistant"
              width={64}
              height={64}
              className="drop-shadow-2xl"
            />
            
            {/* Pulsing glow */}
            <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-xl animate-pulse" />
          </motion.button>

          {/* Chat indicator */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg"
          >
            <MessageCircle className="w-4 h-4 text-white" />
          </motion.div>

          {/* Tooltip */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-slate-900/95 backdrop-blur-sm border border-cyan-400/50 rounded-lg px-4 py-2 whitespace-nowrap pointer-events-none"
          >
            <p className="text-cyan-400 font-mono text-sm">Ask me anything!</p>
            <div className="absolute top-1/2 -translate-y-1/2 -right-2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-cyan-400/50" />
          </motion.div>
        </div>
      </motion.div>
    );
  }

  // Minimized state
  if (isMinimized) {
    return (
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-8 right-8 w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center shadow-2xl shadow-cyan-500/50 z-50 border-2 border-cyan-300"
      >
        <Image
          src="/mascot.svg"
          alt="Cyber Assistant"
          width={48}
          height={48}
          className="drop-shadow-lg"
        />
      </motion.button>
    );
  }

  // Chat Mode
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="fixed bottom-8 right-8 w-96 max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-4rem)] bg-slate-900/95 backdrop-blur-md border border-cyan-400/50 rounded-2xl shadow-2xl shadow-cyan-500/20 z-50 flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/10 p-1.5 flex items-center justify-center">
            <Image
              src="/mascot.svg"
              alt="Assistant"
              width={32}
              height={32}
              className="drop-shadow-lg"
            />
          </div>
          <div>
            <h3 className="text-white font-bold">AI Assistant</h3>
            <p className="text-xs text-cyan-100">Ask me anything!</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsMinimized(true)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Minimize"
          >
            <Minimize2 className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                msg.role === 'user'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                  : 'bg-slate-800 text-slate-200 border border-cyan-400/30'
              }`}
            >
              <p className="text-sm whitespace-pre-line">{msg.content}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-slate-800 border border-cyan-400/30 p-3 rounded-lg">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Quick Questions */}
      {messages.length === 1 && (
        <div className="px-4 pb-2">
          <p className="text-xs text-slate-400 mb-2">Quick questions:</p>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => setInputValue(q)}
                className="text-xs px-3 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-400 rounded-full border border-cyan-400/30 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleChatSubmit} className="p-4 border-t border-cyan-400/30">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 bg-slate-800 text-white px-4 py-2 rounded-lg border border-cyan-400/30 focus:outline-none focus:border-cyan-400"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-lg font-semibold transition-all"
          >
            Send
          </button>
        </div>
      </form>
    </motion.div>
  );
}
