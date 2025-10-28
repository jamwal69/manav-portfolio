'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Minimize2, Maximize2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const KNOWLEDGE_BASE = {
  skills: {
    cybersecurity: ['Nmap', 'Metasploit', 'OWASP', 'Burp Suite', 'Wireshark', 'Kali Linux'],
    mobile: ['MobSF', 'JADX', 'apktool', 'Frida', 'Objection', 'Drozer'],
    blockchain: ['Solidity', 'Web3.js', 'Hardhat', 'MetaMask', 'Ethereum'],
    devops: ['Docker', 'Git', 'AWS', 'Shell/PowerShell', 'Linux'],
  },
  projects: [
    {
      name: 'DigiCats',
      description: 'NFT game with smart contracts built on Ethereum',
      tech: ['Solidity', 'Web3.js', 'React', 'Hardhat'],
      category: 'Blockchain',
    },
    {
      name: 'People.ai',
      description: 'AI hiring evaluator - IEEE YESIST12 Finalist',
      tech: ['Python', 'Machine Learning', 'FastAPI', 'scikit-learn'],
      category: 'AI/ML',
    },
    {
      name: 'Akagami',
      description: 'Comprehensive cybersecurity toolkit for penetration testing',
      tech: ['FastAPI', 'React', 'Python', 'Security Tools'],
      category: 'Cybersecurity',
    },
  ],
  achievements: [
    'Spot Award @ Paytm for exceptional cybersecurity performance',
    'IEEE YESIST12 Finalist for People.ai',
    'IBM Cybersecurity Analyst Certification',
    'Red Hat Linux Certification',
    'Active TryHackMe contributor',
  ],
  experience: [
    {
      company: 'Paytm',
      role: 'Security Engineer',
      achievement: 'Received Spot Award for exceptional performance in cybersecurity initiatives',
    },
  ],
};

const QUICK_QUESTIONS = [
  'What are your main skills?',
  'Tell me about your projects',
  'What certifications do you have?',
  'What is your experience?',
];

function generateResponse(question: string): string {
  const lowerQ = question.toLowerCase();
  
  // Skills
  if (lowerQ.includes('skill') || lowerQ.includes('tech') || lowerQ.includes('know')) {
    const allSkills = Object.entries(KNOWLEDGE_BASE.skills)
      .map(([category, skills]) => `**${category.toUpperCase()}**: ${skills.join(', ')}`)
      .join('\n\n');
    return `I specialize in multiple domains:\n\n${allSkills}\n\nI'm particularly strong in application security, mobile reverse engineering, and blockchain auditing.`;
  }
  
  // Projects
  if (lowerQ.includes('project') || lowerQ.includes('built') || lowerQ.includes('work')) {
    const projects = KNOWLEDGE_BASE.projects
      .map(p => `**${p.name}** (${p.category}): ${p.description}\nTech: ${p.tech.join(', ')}`)
      .join('\n\n');
    return `Here are my key projects:\n\n${projects}\n\nEach project demonstrates practical application of security principles and modern development practices.`;
  }
  
  // Achievements/Certifications
  if (lowerQ.includes('achievement') || lowerQ.includes('cert') || lowerQ.includes('award') || lowerQ.includes('recognition')) {
    return `My achievements include:\n\n${KNOWLEDGE_BASE.achievements.map(a => `• ${a}`).join('\n')}\n\nThese recognize both technical expertise and practical impact.`;
  }
  
  // Experience
  if (lowerQ.includes('experience') || lowerQ.includes('work') || lowerQ.includes('job') || lowerQ.includes('paytm')) {
    const exp = KNOWLEDGE_BASE.experience[0];
    return `I work as a ${exp.role} at ${exp.company}, where I've earned recognition for cybersecurity excellence. ${exp.achievement}.\n\nI focus on practical security: application hardening, mobile app assessments, smart contract audits, and detection engineering.`;
  }
  
  // Mobile security
  if (lowerQ.includes('mobile') || lowerQ.includes('android') || lowerQ.includes('frida') || lowerQ.includes('mobsf')) {
    return `I specialize in mobile application security using tools like:\n\n• **MobSF** - Automated static & dynamic analysis\n• **JADX** - Decompilation & code inspection\n• **Frida** - Runtime instrumentation & bypasses\n• **apktool** - Resource extraction & smali editing\n• **Objection** - Rapid security assessment\n\nI've developed case studies on bypassing app protections and malware analysis pipelines.`;
  }
  
  // Blockchain/Smart contracts
  if (lowerQ.includes('blockchain') || lowerQ.includes('smart contract') || lowerQ.includes('solidity') || lowerQ.includes('web3')) {
    return `I have hands-on experience with blockchain security:\n\n• Built **DigiCats** - NFT game with Solidity smart contracts\n• Experienced in threat modeling & invariant design\n• Use Slither, Foundry fuzz testing, and Hardhat\n• Focus on re-entrancy prevention and gas optimization\n\nI approach smart contracts with a security-first mindset, eliminating vulnerabilities pre-audit.`;
  }
  
  // Contact
  if (lowerQ.includes('contact') || lowerQ.includes('hire') || lowerQ.includes('email') || lowerQ.includes('reach')) {
    return `You can reach me at:\n\n📧 **Email**: jamwalmanav69@gmail.com\n💼 **LinkedIn**: linkedin.com/in/manavsinghjamwal\n🐙 **GitHub**: github.com/jamwal69\n\nFeel free to download my resume or use the contact form below!`;
  }
  
  // Default
  return `I'm Manav Singh Jamwal, a cybersecurity engineer specializing in:\n\n• Application & mobile security\n• Smart contract auditing\n• AI-powered detection systems\n• Penetration testing & reverse engineering\n\nI focus on practical security with measurable outcomes. Ask me about my skills, projects, certifications, or experience!`;
}

export default function AIResumeAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `👋 Hi! I'm Manav's AI assistant. I can answer questions about his skills, projects, experience, and certifications. What would you like to know?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate thinking delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const response = generateResponse(input);
    const assistantMessage: Message = {
      role: 'assistant',
      content: response,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
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
            className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all"
            aria-label="Open AI Assistant"
          >
            <Bot className="w-6 h-6 text-white" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? 'auto' : '600px',
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-96 bg-slate-900 border border-blue-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Bot className="w-6 h-6 text-white" />
                  <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-green-400 rounded-full" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">AI Resume Assistant</h3>
                  <p className="text-xs text-blue-100">Ask me anything!</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:bg-white/10 rounded transition-colors"
                  aria-label={isMinimized ? 'Maximize' : 'Minimize'}
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/10 rounded transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/50">
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                          message.role === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-800 text-slate-200 border border-slate-700'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        <p className="text-xs mt-1 opacity-60">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-slate-800 border border-slate-700 rounded-2xl px-4 py-3">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Questions */}
                {messages.length <= 1 && (
                  <div className="px-4 py-2 bg-slate-900/50 border-t border-slate-800">
                    <p className="text-xs text-slate-400 mb-2">Quick questions:</p>
                    <div className="flex flex-wrap gap-2">
                      {QUICK_QUESTIONS.map((q, i) => (
                        <button
                          key={i}
                          onClick={() => handleQuickQuestion(q)}
                          className="text-xs px-3 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-full transition-colors"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                <div className="p-4 bg-slate-900 border-t border-slate-800">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Ask me anything..."
                      className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 text-sm"
                    />
                    <button
                      onClick={handleSend}
                      disabled={!input.trim()}
                      className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 rounded-lg transition-colors"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
