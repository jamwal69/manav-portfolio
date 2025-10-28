// Mixed: we need server-side access for listPosts; keep interactive segments in nested client components.
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
// listPosts now called in server parent to avoid bundling fs
import { 
  Shield, 
  Brain, 
  Code, 
  Globe, 
  Lock,
  ChevronDown,
  Github,
  Linkedin,
  Mail,
  Download,
  Star,
  Award,
  Database,
  Cloud,
  Terminal
} from 'lucide-react';
// AI Chatbot removed
import BootSequence from './BootSequence';
import dynamic from 'next/dynamic';
import InteractiveCyberTerminal from './InteractiveCyberTerminal';
import LoadingScreen from './LoadingScreen';
import ThemeToggle from './ThemeToggle';
import ContactForm from './ContactForm';
import ResumeViewer from './ResumeViewer';
import CyberGlobe from './CyberGlobe';
import GitHubAnalytics from './GitHubAnalytics';
import PentestingSandbox from './PentestingSandbox';
import CyberMascot from './CyberMascot';

// Lazy load heavy 3D scene client-side only with richer placeholder
const CyberpunkScene3D = dynamic(() => import('./CyberpunkScene3D'), { 
  ssr: false, 
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-xs font-mono text-cyan-300 p-4 animate-pulse">
      <div className="text-cyan-400/90">[ VISUAL CORE INITIALIZING ]</div>
      <div className="w-48 h-1 bg-cyan-900/40 rounded overflow-hidden">
        <div className="h-full w-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 animate-[progress_1.6s_ease_infinite]" />
      </div>
      <div className="text-cyan-500/70">loading shaders · allocating gpu buffers · linking scene graph</div>
      <style jsx>{`@keyframes progress{0%{transform:translateX(-60%)}100%{transform:translateX(160%)}}`}</style>
    </div>
  ) 
});

export default function FuturisticPortfolio() {
  const [currentSection, setCurrentSection] = useState('home');
  const [showBootSequence, setShowBootSequence] = useState(true);
  const [showTerminal, setShowTerminal] = useState(false);
  const [resumeHash, setResumeHash] = useState<string>('calculating...');
  const [nnActive, setNnActive] = useState(false);
  const [showResumeViewer, setShowResumeViewer] = useState(false);

  // Calculate SHA-256 of resume (client-side integrity display)
  useEffect(() => {
    async function hashResume() {
      try {
        const res = await fetch('/resume.pdf');
        const buf = await res.arrayBuffer();
        const hashBuf = await crypto.subtle.digest('SHA-256', buf);
        const hashArray = Array.from(new Uint8Array(hashBuf));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        setResumeHash(hashHex.slice(0, 16) + '…');
  } catch {
        setResumeHash('unavailable');
      }
    }
    hashResume();
  }, []);

  const navigation = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'contact', label: 'Contact' },
    { id: 'terminal', label: 'Terminal' },
  ];

  const projects = [
    {
      title: 'DigiCats',
      description: 'NFT game with smart contracts built on Ethereum',
      tech: ['Solidity', 'Web3.js', 'React', 'Hardhat'],
      category: 'Blockchain',
      status: 'Live',
      githubUrl: 'https://github.com/jamwal69/DigiCats',
      demoUrl: 'https://digicats.demo.com',
      icon: <Code className="w-6 h-6" />,
      color: 'cyber-blue'
    },
    {
      title: 'People.ai',
      description: 'AI hiring evaluator - IEEE YESIST12 Finalist',
      tech: ['Python', 'Machine Learning', 'FastAPI', 'scikit-learn'],
      category: 'AI/ML',
      status: 'Award Winner',
      githubUrl: 'https://github.com/jamwal69/People-ai',
      demoUrl: 'https://people-ai.demo.com',
      icon: <Brain className="w-6 h-6" />,
      color: 'cyber-purple'
    },
    {
      title: 'Akagami',
      description: 'Comprehensive cybersecurity toolkit for penetration testing',
      tech: ['FastAPI', 'React', 'Python', 'Security Tools'],
      category: 'Cybersecurity',
      status: 'Active Development',
      githubUrl: 'https://github.com/jamwal69/Akagami',
      demoUrl: 'https://akagami.demo.com',
      icon: <Shield className="w-6 h-6" />,
      color: 'cyber-green'
    }
  ];

  const skills = [
    {
      category: 'Cybersecurity',
      items: ['Nmap', 'Metasploit', 'OWASP', 'Burp Suite', 'Wireshark', 'Kali Linux'],
      icon: <Shield className="w-8 h-8" />,
      level: 95
    },
    {
      category: 'Mobile Security',
      items: ['MobSF', 'JADX', 'apktool', 'Frida', 'Objection', 'Drozer'],
      icon: <Lock className="w-8 h-8" />,
      level: 80
    },
    {
      category: 'Blockchain',
      items: ['Solidity', 'Web3.js', 'Hardhat', 'MetaMask', 'Ethereum'],
      icon: <Database className="w-8 h-8" />,
      level: 85
    },
    {
      category: 'DevOps & Cloud',
      items: ['Docker', 'Git', 'AWS', 'Shell/PowerShell', 'Linux'],
      icon: <Cloud className="w-8 h-8" />,
      level: 88
    }
  ];

  const achievements = [
    {
      title: 'Spot Award @ Paytm',
      description: 'Recognition for exceptional performance in cybersecurity initiatives',
      date: '2024',
      icon: <Award className="w-6 h-6" />,
      type: 'Corporate Recognition'
    },
    {
      title: 'TryHackMe Continuous Progress',
      description: 'Ongoing practical labs across web, cloud, malware & privilege escalation',
      date: 'Live',
      icon: <Shield className="w-6 h-6" />,
      type: 'Hands-on Labs'
    },
    {
      title: 'IEEE YESIST12 Finalist',
      description: 'Finalist for People.ai - AI-powered hiring evaluation system',
      date: '2024',
      icon: <Star className="w-6 h-6" />,
      type: 'Competition'
    },
    {
      title: 'IBM Cybersecurity Analyst',
      description: 'Professional certification in cybersecurity analysis',
      date: '2023',
      icon: <Shield className="w-6 h-6" />,
      type: 'Certification'
    },
    {
      title: 'Red Hat Linux Certification',
      description: 'System administration and security expertise',
      date: '2023',
      icon: <Terminal className="w-6 h-6" />,
      type: 'Certification'
    }
  ];

  // services removed

  // Safeguard: listPosts uses fs; guard to only call in browser where Next has inlined static data via prerender.
  // If window undefined (SSR) it's safe; in client hydration using dynamic import may cause bundling fs; rely on try/catch.
  // Components now simplified without blog automation

  return (
    <>
      {/* Boot Sequence */}
      <AnimatePresence>
        {showBootSequence && (
          <BootSequence onComplete={() => { setShowBootSequence(false); setNnActive(true); }} />
        )}
      </AnimatePresence>

      {/* Neural Network Active Badge (appears after boot) */}
      {nnActive && (
        <div className="fixed top-20 left-4 z-50 px-3 py-1 rounded-md border border-green-400/60 bg-green-500/15 backdrop-blur-sm shadow-lg text-[10px] tracking-wide font-mono text-green-300 animate-pulse">
          NEURAL NET ACTIVE
        </div>
      )}

      {/* Main Portfolio */}
      {!showBootSequence && (
        <div className="min-h-screen transition-colors duration-500 day-mode:bg-white day-mode:text-gray-900 night-mode:bg-slate-900 night-mode:text-white">
          {/* Loading Screen */}
          <LoadingScreen />

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Navigation */}
          <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-40 glass rounded-b-2xl mx-4 mt-4"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="text-2xl font-bold text-blue-400"
            >
              MSJ.DEV
            </motion.div>
            <div className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className={`transition-colors duration-300 ${
                    currentSection === item.id ? 'text-blue-400' : 'text-slate-300 hover:text-white'
                  }`}
                  onClick={() => setCurrentSection(item.id)}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/50" />
        
        {/* TryHackMe Badge - Floating */}
        <div className="absolute top-20 right-6 w-56 h-56 hidden lg:block z-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            className="w-full h-full"
          >
            <a
              href="https://tryhackme.com/p/jamwal"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-full rounded-xl overflow-hidden border-2 border-cyan-400/50 bg-slate-900/30 backdrop-blur-sm shadow-2xl shadow-cyan-500/30 hover:border-cyan-400 hover:shadow-cyan-500/50 transition-all"
            >
              <iframe
                src="https://tryhackme.com/api/v2/badges/public-profile?userPublicId=4190234"
                style={{ border: 'none', width: '100%', height: '100%' }}
                title="TryHackMe Badge"
              />
            </a>
          </motion.div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-8"
          >
            <motion.h1
              className="text-6xl md:text-8xl font-extrabold mb-6 tracking-tight"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="text-blue-400">MANAV SINGH</span>
              <br />
              <span className="text-sky-400">JAMWAL</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
            >
              Cybersecurity engineer focused on adversary-resistant architectures, applied ML for detection & automation, and secure smart contract ecosystems.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12"
            >
              <motion.button whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.3 }} className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-full font-semibold text-lg shadow-lg">Explore Work</motion.button>
              <motion.button whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.3 }} className="px-8 py-4 glass border border-blue-500 hover:bg-blue-500/10 rounded-full font-semibold text-lg">Contact</motion.button>
              <motion.button whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.3 }} className="px-8 py-4 glass border border-sky-500 hover:bg-sky-500/10 rounded-full font-semibold text-lg">Weekly Digest</motion.button>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            >
              <ChevronDown className="w-8 h-8 text-blue-400" />
            </motion.div>
          </motion.div>
          {/* Interactive APK Manifest Viewer & Frida Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-20 grid lg:grid-cols-2 gap-10"
          >
            <div className="card p-6 border border-cyan-500/30">
              <h3 className="text-2xl font-bold text-cyan-400 mb-4">APK Manifest Explorer (Sandbox)</h3>
              <p className="text-slate-400 text-sm mb-4">Pre-bundled sample manifest parsed; uploads disabled in demo.</p>
              <div id="apk-manifest-viewer" className="text-xs text-slate-300 space-y-2 font-mono">
                <p className="text-cyan-300">package: <span className="text-slate-400">com.sample.secureapp</span></p>
                <div>
                  <p className="text-cyan-300">activities:</p>
                  <ul className="pl-4 list-disc space-y-1">
                    <li>MainActivity <span className="text-yellow-400">exported</span></li>
                    <li>SettingsActivity</li>
                  </ul>
                </div>
                <div>
                  <p className="text-cyan-300">services:</p>
                  <ul className="pl-4 list-disc space-y-1">
                    <li>SyncService <span className="text-yellow-400">exported</span></li>
                  </ul>
                </div>
                <div>
                  <p className="text-cyan-300">receivers:</p>
                  <ul className="pl-4 list-disc space-y-1">
                    <li>BootReceiver <span className="text-red-400">insecure-permission</span></li>
                  </ul>
                </div>
                <p className="text-[10px] text-slate-500">Flags: <span className="text-yellow-400">exported</span> • <span className="text-red-400">insecure</span></p>
              </div>
            </div>
            <div className="card p-6 border border-purple-500/30">
              <h3 className="text-2xl font-bold text-purple-400 mb-4">Frida Script Gallery</h3>
              <p className="text-slate-400 text-sm mb-4">Copy-ready snippets for rapid dynamic inspection.</p>
              <ul className="space-y-4 text-xs font-mono">
                {[
                  {title:'Bypass SSL Pinning', code:`Java.perform(()=>{const X=Java.use('javax.net.ssl.X509TrustManager');/* override trust */});`},
                  {title:'Intercept Crypto Function', code:`Java.perform(()=>{const C=Java.use('javax.crypto.Cipher');C.doFinal.overload('[B').implementation=function(b){console.log('Cipher.doFinal',b);return this.doFinal.overload('[B').call(this,b)};});`},
                  {title:'Hook WebView JS Bridge', code:`Java.perform(()=>{const W=Java.use('android.webkit.WebView');W.addJavascriptInterface.implementation=function(o,n){console.log('JS bridge',n);return this.addJavascriptInterface(o,n)};});`}
                ].map(snip => (
                  <li key={snip.title} className="group">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-purple-300">{snip.title}</span>
                      <button onClick={()=>{navigator.clipboard.writeText(snip.code)}} className="text-purple-400 text-[10px] uppercase tracking-wide opacity-70 group-hover:opacity-100">Copy</button>
                    </div>
                    <pre className="bg-slate-900/60 p-3 rounded border border-slate-700 overflow-x-auto"><code>{snip.code}</code></pre>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="case-studies" className="py-20 bg-gradient-to-b from-slate-900/40 to-slate-900/70">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-cyan-400 mb-4">Case Studies</h2>
            <p className="text-slate-300 max-w-3xl mx-auto">Deep dives: context → constraints → approach → measurable impact.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-10">
            {[{
              title: 'Reducing False Positives in Runtime Alerts',
              problem: 'Noisy container runtime alerts obscured genuine lateral movement attempts.',
              approach: 'Correlated syscalls + process ancestry + network egress patterns; embedded lightweight scoring pipeline.',
              tooling: ['eBPF', 'Falco rules', 'Go sidecar', 'Prometheus'],
              impact: '57% reduction in analyst triage load; mean time-to-valid-signal improved 18m → 6m.'
            },{
              title: 'Smart Contract Risk Surface Hardening',
              problem: 'Re-entrancy & unchecked external call patterns in early prototypes.',
              approach: 'Threat model pass + invariant design + property-based fuzz harnesses before feature expansion.',
              tooling: ['Slither', 'Foundry fuzz', 'Hardhat', 'Custom invariants'],
              impact: 'Eliminated re-entrancy candidates pre-audit; gas delta < +2%.'
            },{
              title: 'APK Protection Bypass & Telemetry Loop',
              problem: 'Obfuscated mobile app with anti-debug, string encryption & SSL pinning blocked dynamic inspection.',
              approach: 'Layered: manifest + surface mapping → string decode pass → anti-root / ptrace bypass → Frida interception harness feeding structured telemetry.',
              tooling: ['MobSF', 'apktool', 'Frida', 'JADX', 'Objection'],
              impact: 'Full dynamic visibility in <2h; regression-ready hook set cut future variant analysis to <15m.'
            },{
              title: 'Android Malware Behavioral Deconstruction Pipeline',
              problem: 'Incoming trojan variants used reflection + delayed C2 resolution + encrypted assets defeating naive static triage.',
              approach: 'Automated chain: unpack & manifest diff → extractor for AES/RC4 config blobs → emulator w/ Frida script pack tracing reflective calls → network sink correlation + IOC emission.',
              tooling: ['apktool', 'JADX', 'Frida', 'mitmproxy', 'MobSF', 'YARA', 'Objection'],
              impact: 'Analyst manual triage time/sample reduced 45m → 9m; surfaced new C2 domains pre-campaign launch.'
            }].map(cs => (
              <motion.div key={cs.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="card p-6 border border-cyan-500/30 hover:border-cyan-400/60 transition-colors">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">{cs.title}</h3>
                <div className="space-y-3 text-sm text-slate-300">
                  <p><span className="text-cyan-300 font-mono">Problem:</span> {cs.problem}</p>
                  <p><span className="text-cyan-300 font-mono">Approach:</span> {cs.approach}</p>
                  <p><span className="text-cyan-300 font-mono">Tooling:</span> {cs.tooling.join(', ')}</p>
                  <p><span className="text-cyan-300 font-mono">Impact:</span> {cs.impact}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GitHub Analytics Section */}
      <section className="py-20 relative overflow-hidden day-mode:bg-white">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-black day-mode:from-white day-mode:to-slate-100" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-cyan-400 day-mode:text-slate-800">Live Development Activity</h2>
            <p className="text-xl text-slate-300 day-mode:text-slate-600 max-w-3xl mx-auto">Real-time GitHub analytics showcasing open-source contributions, repository metrics, and development momentum.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <GitHubAnalytics />
          </motion.div>
        </div>
      </section>

      {/* Pentesting Sandbox Section */}
      <section className="py-20 relative overflow-hidden day-mode:bg-slate-50">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-slate-900 day-mode:from-slate-100 day-mode:to-white" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-cyan-400 day-mode:text-slate-800">Security Research Lab</h2>
            <p className="text-xl text-slate-300 day-mode:text-slate-600 max-w-3xl mx-auto">Interactive demonstrations of common web vulnerabilities and their mitigations. Authorized testing environment for educational purposes.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <PentestingSandbox />
          </motion.div>
        </div>
      </section>

      {/* 3D Cyber Globe Visualization */}
      <section className="py-20 relative overflow-hidden day-mode:bg-white">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-slate-900 day-mode:from-slate-50 day-mode:to-white" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-cyan-400 day-mode:text-slate-800">Global Operations Network</h2>
            <p className="text-xl text-slate-300 day-mode:text-slate-600 max-w-3xl mx-auto">Real-time visualization of international projects, security research, and threat monitoring across global infrastructure.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="h-[600px] rounded-xl overflow-hidden glass border border-cyan-400"
          >
            <CyberGlobe />
          </motion.div>
        </div>
      </section>

      {/* 3D Cyberpunk Scene */}
      <section className="py-20 relative overflow-hidden day-mode:bg-slate-100">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-black day-mode:from-white day-mode:to-slate-200" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-cyan-400 day-mode:text-slate-800">Interactive Command Center</h2>
            <p className="text-xl text-slate-300 day-mode:text-slate-600 max-w-3xl mx-auto">System topology + command surface for exploratory analysis & structured interrogation.</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* 3D Scene */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="h-96 rounded-xl overflow-hidden glass border border-cyan-400"
            >
              <CyberpunkScene3D />
            </motion.div>

            {/* Interactive Terminal */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <InteractiveCyberTerminal />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-12"
          >
            <button
              onClick={() => setShowTerminal(prev => !prev)}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-full font-semibold text-lg shadow-lg transition-all duration-300"
            >
              <Terminal className="w-5 h-5 inline mr-2" />
              {showTerminal ? 'Hide Terminal' : 'Launch Full Terminal'}
            </button>
          </motion.div>

          {showTerminal && (
            <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
              <div className="relative w-full max-w-5xl">
                <button aria-label="Close terminal" onClick={() => setShowTerminal(false)} className="absolute -top-10 right-0 px-4 py-2 text-sm rounded bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg">Close</button>
                <InteractiveCyberTerminal onExit={() => setShowTerminal(false)} />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-blue-400 mb-4">About Me</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-sky-500 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="card p-8">
                <h3 className="text-2xl font-bold text-blue-400 mb-4">Professional Journey</h3>
                <p className="text-slate-300 leading-relaxed">
                  I build and harden systems where attackers actually spend time: application surface, runtime hooks, decentralized logic, and workflow glue code. Recent work spans secure automation pipelines, mobile reverse engineering, deterministic smart contract design, and operational telemetry that closes the feedback loop between detection and engineering. Recognition (Paytm Spot Award, IEEE YESIST12 finalist) reflects shipped impact, not hype. I care about reproducibility, reducing manual triage, and elevating defensive signal quality.
                </p>
              </div>

              <div className="card p-8">
                <h3 className="text-2xl font-bold text-sky-400 mb-4">Education</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-blue-400">MIET Jammu</h4>
                    <p className="text-slate-400">B.Tech in Computer Science & Engineering</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-400">Model Academy</h4>
                    <p className="text-slate-400">Secondary Education</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <motion.button
                  onClick={() => setShowResumeViewer(true)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full"
                >
                  <Download className="w-5 h-5" />
                  View Resume
                </motion.button>
                <motion.a
                  href="/resume.pdf"
                  download="Manav_Singh_Jamwal_Resume.pdf"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2 px-6 py-3 glass border border-blue-500 hover:bg-blue-500/10 rounded-full"
                >
                  <Download className="w-5 h-5" />
                  Download
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/manavsinghjamwal/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2 px-6 py-3 glass border border-blue-500 hover:bg-blue-500/10 rounded-full"
                >
                  <Linkedin className="w-5 h-5" />
                  LinkedIn
                </motion.a>
                <motion.a
                  href="https://github.com/jamwal69"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2 px-6 py-3 glass border border-sky-500 hover:bg-sky-500/10 rounded-full"
                >
                  <Github className="w-5 h-5" />
                  GitHub
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="card p-8 animate-float">
                <div className="w-full h-64 bg-gradient-to-br from-blue-500/20 to-sky-500/20 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="w-32 h-32 border-4 border-blue-500/50 border-t-blue-500 rounded-full mx-auto mb-4"
                    />
                    <p className="text-blue-400 font-mono">Neural Network Active</p>
                  </div>
                </div>
              </div>
              {/* FigmaColorSync removed */}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-blue-400 mb-4">Projects</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-sky-500 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-6 group cursor-pointer"
              >
                <div className="text-blue-400 mb-4">
                  {project.icon}
                </div>
                <h3 className="text-2xl font-bold mb-2 text-blue-400">{project.title}</h3>
                <p className="text-slate-300 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-blue-500/20 rounded-full text-sm text-blue-400 border border-blue-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sky-400 font-semibold">{project.status}</span>
                  <div className="flex gap-2">
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      className="p-2 glass rounded-full border border-blue-500 hover:bg-blue-500/10"
                    >
                      <Github className="w-4 h-4" />
                    </motion.a>
                    <motion.a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      className="p-2 glass rounded-full border border-sky-500 hover:bg-sky-500/10"
                    >
                      <Globe className="w-4 h-4" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-blue-400 mb-4">Skills & Tech Stack</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-sky-500 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="card p-6 text-center group"
              >
                <div className="text-blue-400 mb-4 flex justify-center">
                  {skill.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-blue-400">{skill.category}</h3>
                
                <div className="space-y-2 mb-6">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="inline-block px-2 py-1 bg-slate-800/50 rounded text-sm text-slate-300 m-1"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="w-full bg-slate-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="bg-gradient-to-r from-blue-500 to-sky-500 h-2 rounded-full"
                  />
                </div>
                <p className="text-blue-400 mt-2 font-semibold">{skill.level}%</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Security & Reverse Engineering */}
      <section id="mobile-security" className="py-20 bg-gradient-to-b from-slate-900/40 to-slate-900/80">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-cyan-400 mb-4">Mobile App Security</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto"></div>
            <p className="mt-6 text-slate-300 max-w-3xl mx-auto text-lg">
              Recent focus on Android application security: static & dynamic analysis, reverse engineering, and hardening assessments.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-10">
            {/* Tool Cards */}
            {[{
              name: 'MobSF',
              role: 'All-in-one automated static & dynamic analysis suite',
              usage: 'Upload APK → review findings: permissions, insecure crypto, exported comps.',
              plus: ['Fast baseline scan', 'API/intent analysis', 'Dynamic instrumentation'],
              improve: ['Supplement with manual review for logic flaws']
            },{
              name: 'JADX',
              role: 'Decompiles Dalvik bytecode to readable Java/Kotlin',
              usage: 'Inspect code flow, hard‑coded secrets, insecure network logic.',
              plus: ['Readable output', 'Search across codebase'],
              improve: ['Combine with smali diffs for obfuscated sections']
            },{
              name: 'apktool',
              role: 'Decode resources & smali for deep reverse engineering',
              usage: 'Rebuild after patching (e.g. bypassing root checks in lab).',
              plus: ['Full resource extraction', 'Smali-level control'],
              improve: ['Pair with Frida for runtime logic changes']
            }].map(tool => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="card p-6 border border-cyan-500/30 hover:border-cyan-400/60 transition-colors"
              >
                <h3 className="text-2xl font-semibold text-cyan-400 mb-2">{tool.name}</h3>
                <p className="text-slate-300 text-sm mb-4">{tool.role}</p>
                <p className="text-slate-400 text-xs mb-3"><span className="text-cyan-300 font-semibold">Usage:</span> {tool.usage}</p>
                <div className="mb-4">
                  <p className="text-cyan-300 text-xs font-semibold mb-1">Strengths</p>
                  <ul className="text-slate-400 text-xs space-y-1 list-disc list-inside">
                    {tool.plus.map(p => <li key={p}>{p}</li>)}
                  </ul>
                </div>
                <div>
                  <p className="text-cyan-300 text-xs font-semibold mb-1">Notes</p>
                  <ul className="text-slate-400 text-xs space-y-1 list-disc list-inside">
                    {tool.improve.map(p => <li key={p}>{p}</li>)}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 grid lg:grid-cols-2 gap-10"
          >
            <div className="card p-6 border border-blue-500/30">
              <h3 className="text-xl font-bold text-blue-400 mb-4">Dynamic Instrumentation Stack</h3>
              <ul className="text-slate-300 space-y-2 text-sm">
                <li><span className="text-blue-400">Frida:</span> Runtime function hooking & bypassing SSL pinning.</li>
                <li><span className="text-blue-400">Objection:</span> Rapid mobile exploration & root detection bypass assists.</li>
                <li><span className="text-blue-400">Drozer:</span> Assess exported components & IPC attack surface.</li>
                <li><span className="text-blue-400">mitmproxy / Burp Suite:</span> Intercept & manipulate encrypted traffic.</li>
              </ul>
            </div>
            <div className="card p-6 border border-purple-500/30">
              <h3 className="text-xl font-bold text-purple-400 mb-4">Assessment Workflow</h3>
              <ol className="list-decimal list-inside text-slate-300 space-y-2 text-sm">
                <li>Recon: Manifest review (permissions, exported activities, debuggable).</li>
                <li>Static: Decompile with JADX + deep dive with apktool.</li>
                <li>Dynamic: Instrument (Frida), capture traffic (Burp), modify flows.</li>
                <li>Reverse Protections: Root detection, cert pinning, obfuscation layers.</li>
                <li>Crypto Review: Key storage, algorithm misuse, hard‑coded secrets.</li>
                <li>Reporting: Map to OWASP MASVS / mobile ATT&CK techniques.</li>
              </ol>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Continue with remaining sections... */}
      
      {/* Achievements Section */}
      <section id="achievements" className="py-20 bg-slate-800/50 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-blue-400 mb-4">Achievements & Certifications</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-sky-500 mx-auto"></div>
            <p className="text-slate-400 max-w-2xl mx-auto mt-6 text-sm">Continuous learning & validated impact across offensive and defensive domains.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="card p-6 flex items-start gap-4 group"
              >
                <div className="text-blue-400 mt-1">
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-blue-400">{achievement.title}</h3>
                    <span className="px-3 py-1 bg-blue-500/20 rounded-full text-sm text-blue-400">
                      {achievement.date}
                    </span>
                  </div>
                  <p className="text-slate-300 mb-2">{achievement.description}</p>
                  <span className="text-sky-400 text-sm font-semibold">{achievement.type}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services removed */}

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-blue-400 mb-4">Get In Touch</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-sky-500 mx-auto"></div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="space-y-8"
            >
              <div className="card p-8">
                <h3 className="text-2xl font-bold mb-6 text-blue-400">Let&apos;s Connect</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 glass rounded-full bg-blue-500/20 border border-blue-500">
                      <Mail className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-slate-400">Email</p>
                      <p className="text-white">jamwalmanav69@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <motion.a
                  href="https://github.com/jamwal69"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 glass rounded-full border border-blue-500 hover:bg-blue-500/10 flex-1 flex items-center justify-center"
                >
                  <Github className="w-6 h-6" />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/manavsinghjamwal/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 glass rounded-full border border-sky-500 hover:bg-sky-500/10 flex-1 flex items-center justify-center"
                >
                  <Linkedin className="w-6 h-6" />
                </motion.a>
                <motion.a
                  href="mailto:jamwalmanav69@gmail.com"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 glass rounded-full border border-blue-500 hover:bg-blue-500/10 flex-1 flex items-center justify-center"
                >
                  <Mail className="w-6 h-6" />
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

  {/* Resume Viewer */}
  <ResumeViewer isOpen={showResumeViewer} onClose={() => setShowResumeViewer(false)} />

  {/* Improvements removed */}

      {/* Footer */}
      <footer className="py-12 bg-slate-900/50 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h3 className="text-2xl font-bold text-blue-400 mb-4">MSJ.DEV</h3>
            <p className="text-slate-400 mb-6">
              Practical security engineering, measurable outcomes, minimal noise.
            </p>
            <div className="mb-6 grid md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto">
              <div className="bg-slate-800/40 border border-slate-700 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-cyan-400 mb-2">RESUME INTEGRITY</h4>
                <p className="text-xs text-slate-400 leading-relaxed">SHA-256 (truncated): <span className="text-cyan-300 font-mono break-all">{resumeHash}</span></p>
                <p className="text-[10px] text-slate-500 mt-1">Verify integrity after download: sha256sum resume.pdf</p>
              </div>
              <div className="bg-slate-800/40 border border-slate-700 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-cyan-400 mb-2">PGP KEY (COMING SOON)</h4>
                <p className="text-xs text-slate-400 leading-relaxed">Public key publishing pipeline pending. Request provisional signed messages via email for critical disclosures.</p>
              </div>
            </div>
            <div className="flex justify-center gap-6 mb-6">
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">Privacy Policy</a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">Terms of Service</a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">Sitemap</a>
            </div>
            <p className="text-slate-500">
              © 2025 Manav Singh Jamwal. All rights reserved.
            </p>
          </motion.div>
        </div>
      </footer>
        </div>
      )}
      
      {/* Unified Cyber Mascot - AI Chat + Terminal Interface */}
      <CyberMascot />
    </>
  );
}
