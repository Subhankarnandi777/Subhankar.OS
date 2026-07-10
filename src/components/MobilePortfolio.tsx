'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal, User, Briefcase, FileText, Award, Bot, Mail,
  Code2, LayoutDashboard, Settings as SettingsIcon, X, ChevronDown, Download,
  ExternalLink, Send, GraduationCap, Activity
} from 'lucide-react';
import Settings from '@/apps/Settings';
import Dashboard from '@/apps/Dashboard';
import TerminalApp from '@/apps/TerminalApp';
import AIAssistant from '@/apps/AIAssistant';
import { useOSStore } from '@/store/osStore';

/* ── App Registry ── */
const portfolioApps = [
  { id: 'about',    icon: User,          title: 'About Me',     desc: 'Who am I?',         color: 'from-cyan/30 to-blue-500/20',    border: 'border-cyan/30' },
  { id: 'projects', icon: Briefcase,     title: 'Projects',     desc: 'My work',            color: 'from-purple/30 to-pink-500/20',  border: 'border-purple/30' },
  { id: 'skills',   icon: Code2,         title: 'Skills',       desc: 'Tech stack',         color: 'from-green-400/20 to-teal-500/20', border: 'border-green-400/30' },
  { id: 'resume',   icon: FileText,      title: 'Resume',       desc: 'Download CV',        color: 'from-orange-400/20 to-yellow-500/20', border: 'border-orange-400/30' },
  { id: 'certs',    icon: Award,         title: 'Certifications', desc: 'Verified certs',  color: 'from-yellow-400/20 to-amber-500/20', border: 'border-yellow-400/30' },
  { id: 'contact',  icon: Mail,          title: 'Contact',      desc: 'Get in touch',       color: 'from-red-400/20 to-rose-500/20', border: 'border-red-400/30' },
  { id: 'terminal', icon: Terminal,      title: 'Terminal',     desc: 'CLI interface',      color: 'from-gray-400/20 to-slate-500/20', border: 'border-gray-400/30' },
  { id: 'assistant',icon: Bot,           title: 'AI Assistant', desc: 'Chat with AI',       color: 'from-violet-400/20 to-purple-500/20', border: 'border-violet-400/30' },
  { id: 'github',   icon: Code2,         title: 'GitHub',       desc: 'My repos',           color: 'from-gray-300/20 to-zinc-500/20', border: 'border-gray-300/30' },
];

const systemApps = [
  { id: 'settings',   icon: Settings,       title: 'Settings',     desc: 'Preferences',        color: 'from-slate-400/20 to-gray-500/20', border: 'border-slate-400/30' },
  { id: 'dashboard',  icon: LayoutDashboard,title: 'Dashboard',    desc: 'Analytics',          color: 'from-blue-400/20 to-indigo-500/20', border: 'border-blue-400/30' },
];

/* ── In-App Content ── */
const skills = [
  { name: 'Python', level: 90 }, { name: 'JavaScript', level: 85 },
  { name: 'React / Next.js', level: 80 }, { name: 'Machine Learning', level: 80 },
  { name: 'Node.js', level: 75 }, { name: 'HTML / CSS', level: 88 },
];

const education = [
  { degree: 'B.Tech — CSE (AI & ML)', institution: 'IEM, Kolkata', duration: '2024–2028', score: 'CGPA: 8.51', description: 'Specializing in Artificial Intelligence and Machine Learning.' },
  { degree: 'Higher Secondary (WBCHSE)', institution: "Govt. Sponsored Multipurpose School - (Boy's) Taki House", duration: 'Mar 2024', score: '80.8%', description: 'Completed under WBCHSE with focused interest in Science & Mathematics.' },
  { degree: 'Secondary (WBBSE)', institution: "Govt. Sponsored Multipurpose School - (Boy's) Taki House", duration: 'Mar 2022', score: '76.57%', description: 'Completed under WBBSE with solid foundation in core sciences.' },
];

const projects = [
  { title: 'SmartSpend AI', desc: 'AI-powered personal finance assistant — expense analysis & fraud detection.', tech: ['React', 'FastAPI', 'ML'], github: 'https://github.com/Subhankarnandi777/SmartSpend-AI' },
  { title: 'E-Sehat', desc: 'AI healthcare platform for telemedicine with intelligent symptom analysis.', tech: ['React Native', 'Node.js', 'OpenAI'], github: 'https://github.com/Subhankarnandi777/E-Sehat' },
  { title: 'YOLOv8 Disaster Drone', desc: 'Real-time human detection for disaster management using YOLOv8.', tech: ['Python', 'YOLO', 'OpenCV'], github: 'https://github.com/Subhankarnandi777/Real-Time-Human-Detection-using-YOLOv8-for-Disaster-Management' },
  { title: 'CyberGuardAI', desc: 'Multi-Agent Cybersecurity Incident Response Operations Hub.', tech: ['Python', 'FastAPI', 'Multi-Agent'], github: 'https://github.com/Subhankarnandi777/CyberGuardAI' },
  { title: 'Support Ticket Classifier', desc: 'ML system that classifies support tickets using NLP.', tech: ['Python', 'Scikit-learn', 'NLP'], github: 'https://github.com/Subhankarnandi777/Support-Ticket-Classification' },
  { title: 'Store Sales Forecasting', desc: 'End-to-end sales forecasting with XGBoost and Power BI.', tech: ['Python', 'XGBoost', 'Power BI'], github: 'https://github.com/Subhankarnandi777/Store-Sales-Forecasting-Demand-Analysis.' },
];

const certifications = [
  { title: 'Advanced System Security Topics', issuer: 'University of Colorado' },
  { title: 'Information Theory', issuer: 'Chinese University of Hong Kong' },
  { title: 'Azure Fundamentals', issuer: 'Microsoft' },
  { title: 'ML Foundations: Statistics', issuer: 'LinkedIn Learning' },
  { title: 'Cyber Security Fundamentals', issuer: 'Coursera' },
  { title: '2nd Place — Ureckon 2026', issuer: 'Innovation Challenge' },
];

/* ── App Screen Content ── */
function AppScreen({ id, onClose }: { id: string; onClose: () => void }) {
  const { theme, accentColor } = useOSStore();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const isTerm = theme === 'terminal' || theme === 'amber';

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
      transition={{ type: 'spring', damping: 28, stiffness: 300 }}
      className={`fixed inset-0 z-50 flex flex-col ${isTerm ? 'bg-black text-[var(--term-primary)]' : 'bg-[#050505]'}`}
    >
      {/* App Header */}
      <div className={`flex items-center justify-between px-4 py-3 shrink-0 ${
        isTerm ? 'terminal-titlebar border-b terminal-border-only' : 'border-b border-white/10 bg-[#050505]/80 backdrop-blur-xl'
      }`}>
        <h2 className={`font-bold text-base capitalize ${isTerm ? 'uppercase text-black' : 'text-white'}`}>{id.replace('-', ' ')}</h2>
        <button onClick={onClose} className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
          isTerm ? 'hover:bg-black/20 text-black' : 'bg-white/10 hover:bg-white/20 text-white'
        }`}>
          <X size={16} />
        </button>
      </div>

      {/* App Content */}
      <div className="flex-1 overflow-y-auto">
        {id === 'about' && (
          <div className="p-5 space-y-6">
            <div className="text-center py-6">
              <div className="w-20 h-20 rounded-full bg-linear-to-br from-cyan/40 to-purple/40 border-2 border-cyan/40 flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(100,255,218,0.2)]">
                <span className="text-2xl font-bold text-cyan">SN</span>
              </div>
              <h1 className="text-xl font-extrabold text-white mb-1">Subhankar Nandi</h1>
              <p className="text-cyan text-sm font-mono">AI Engineer & Full Stack Developer</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3 text-sm text-gray-300 leading-relaxed">
              <p>Hello! I'm a B.Tech CSE (AI & ML) student at IEM Kolkata, passionate about building intelligent applications.</p>
              <p>I completed my schooling at Govt. Sponsored Multipurpose School - (Boy's) Taki House, achieving 80.8% in 12th and 76.57% in 10th.</p>
              <p>I enjoy building AI-powered applications, scalable backends, and modern web apps. Interests span AI, ML, Computer Vision, NLP, Cloud Computing, and Full Stack Development.</p>
            </div>
            <a href="/Subhankar_Nandi_(CV).pdf" download className="flex items-center justify-center gap-2 w-full py-3 bg-linear-to-r from-cyan to-purple text-black font-bold rounded-xl">
              <Download size={16} /> Download CV
            </a>
            {/* Education */}
            <div>
              <h3 className="text-white font-bold mb-3 flex items-center gap-2"><GraduationCap size={16} className="text-cyan" /> Education</h3>
              <div className="space-y-3">
                {education.map((e, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="flex justify-between items-start mb-1 flex-wrap gap-1">
                      <span className="text-white font-semibold text-sm">{e.degree}</span>
                      <span className="text-xs text-cyan font-mono bg-cyan/10 px-2 py-0.5 rounded-full">{e.duration}</span>
                    </div>
                    <p className="text-cyan text-xs font-medium mb-1">{e.institution}</p>
                    <p className="text-gray-400 text-xs">Score: {e.score}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {id === 'projects' && (
          <div className="p-5 space-y-4">
            {projects.map((p, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-cyan/30 transition-colors">
                <h3 className="text-white font-bold mb-1">{p.title}</h3>
                <p className="text-gray-400 text-sm mb-3 leading-relaxed">{p.desc}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {p.tech.map(t => <span key={t} className="text-xs bg-cyan/10 text-cyan px-2 py-0.5 rounded-full border border-cyan/20">{t}</span>)}
                </div>
                <a href={p.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-cyan transition-colors">
                  <Code2 size={12} /> GitHub <ExternalLink size={10} />
                </a>
              </div>
            ))}
          </div>
        )}

        {id === 'skills' && (
          <div className="p-5 space-y-5">
            {skills.map(s => (
              <div key={s.name}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-white font-medium">{s.name}</span>
                  <span className="text-gray-400 font-mono">{s.level}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${s.level}%` }} transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full bg-linear-to-r from-cyan to-purple rounded-full" />
                </div>
              </div>
            ))}
            <div>
              <h3 className="text-white font-bold mt-6 mb-3">All Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {['Python','C/C++','Java','TypeScript','React','Next.js','Node.js','FastAPI','YOLOv8','PyTorch','OpenCV','SQL','MongoDB','Docker','Git','AWS'].map(t => (
                  <span key={t} className="text-xs bg-white/5 border border-white/10 text-gray-300 px-3 py-1.5 rounded-full">{t}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {id === 'resume' && (
          <div className="p-5 space-y-4">
            <div className="bg-linear-to-br from-cyan/10 to-purple/10 border border-cyan/20 rounded-2xl p-6 text-center">
              <FileText className="w-10 h-10 text-cyan mx-auto mb-3" />
              <h3 className="text-white font-bold text-lg mb-2">Subhankar Nandi — CV</h3>
              <p className="text-gray-400 text-sm mb-4">Complete resume with education, projects, certifications, and experience.</p>
              <a href="/Subhankar_Nandi_(CV).pdf" download="Subhankar_Nandi_(CV).pdf"
                className="inline-flex items-center gap-2 px-6 py-3 bg-cyan text-black font-bold rounded-xl">
                <Download size={18} /> Download PDF
              </a>
            </div>
            <div className="space-y-3">
              {education.map((e, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex justify-between items-start flex-wrap gap-1 mb-1">
                    <span className="text-white font-semibold text-sm">{e.degree}</span>
                    <span className="text-xs text-cyan font-mono">{e.duration}</span>
                  </div>
                  <p className="text-cyan text-xs mb-1">{e.institution}</p>
                  <p className="text-gray-400 text-xs">{e.score}</p>
                  <p className="text-gray-500 text-xs mt-2 leading-relaxed">{e.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {id === 'certs' && (
          <div className="p-5 space-y-3">
            {certifications.map((c, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-start gap-3">
                <Award size={16} className="text-yellow-400 mt-0.5 shrink-0" />
                <div>
                  <h3 className="text-white font-semibold text-sm">{c.title}</h3>
                  <p className="text-gray-400 text-xs font-mono mt-0.5">{c.issuer}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {id === 'contact' && (
          <div className="p-5">
            <form onSubmit={handleSend} className="space-y-4">
              {['name', 'email', 'subject'].map(field => (
                <input key={field} required type={field === 'email' ? 'email' : 'text'}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={(form as any)[field]}
                  onChange={e => setForm(p => ({ ...p, [field]: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan/50 text-sm"
                />
              ))}
              <textarea required rows={5} placeholder="Your message..."
                value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan/50 text-sm resize-none"
              />
              <button type="submit" className="w-full py-3 bg-linear-to-r from-cyan to-purple text-black font-bold rounded-xl flex items-center justify-center gap-2">
                <Send size={16} /> {sent ? '✓ Sent!' : 'Send Message'}
              </button>
            </form>
            <div className="mt-6 space-y-3">
              <a href="https://github.com/Subhankarnandi777" target="_blank" rel="noreferrer"
                className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl hover:border-cyan/30 transition-colors">
                <Code2 size={18} className="text-cyan" />
                <div><p className="text-white font-medium text-sm">GitHub</p><p className="text-gray-400 text-xs">@Subhankarnandi777</p></div>
                <ExternalLink size={14} className="text-gray-400 ml-auto" />
              </a>
              <a href="https://www.linkedin.com/in/subhankar-nandi-/" target="_blank" rel="noreferrer"
                className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl hover:border-cyan/30 transition-colors">
                <Briefcase size={18} className="text-blue-400" />
                <div><p className="text-white font-medium text-sm">LinkedIn</p><p className="text-gray-400 text-xs">subhankar-nandi-</p></div>
                <ExternalLink size={14} className="text-gray-400 ml-auto" />
              </a>
            </div>
          </div>
        )}

        {id === 'terminal' && (
          <div className="h-full bg-black">
            <TerminalApp />
          </div>
        )}

        {id === 'assistant' && (
          <div className="h-full">
            <AIAssistant />
          </div>
        )}

        {id === 'github' && (
          <div className="p-5 space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 overflow-x-auto">
              <img src="https://ghchart.rshah.org/00FFFF/Subhankarnandi777" alt="GitHub contributions" className="w-full min-w-[500px] h-auto" />
            </div>
            <a href="https://github.com/Subhankarnandi777" target="_blank" rel="noreferrer"
              className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl text-white hover:border-cyan/30 transition-colors">
              <Code2 size={16} /> View Full GitHub Profile <ExternalLink size={14} className="text-gray-400" />
            </a>
          </div>
        )}

        {id === 'settings' && (
          <div className="h-full">
            <Settings />
          </div>
        )}

        {id === 'dashboard' && (
          <div className="h-full">
            <Dashboard />
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ── MAIN MOBILE OS ── */
export default function MobilePortfolio() {
  const { theme, wallpaper } = useOSStore();
  const [activeTab, setActiveTab] = useState<'portfolio' | 'system'>('portfolio');
  const [openApp, setOpenApp] = useState<string | null>(null);

  const apps = activeTab === 'portfolio' ? portfolioApps : systemApps;
  const isTerm = theme === 'terminal' || theme === 'amber';

  return (
    <div 
      className={`fixed inset-0 flex flex-col select-none overflow-hidden ${
        isTerm ? 'bg-black terminal-text' :
        wallpaper === 'default' ? 'bg-linear-to-br from-navy via-[#050505] to-[#1a1025]' : 
        wallpaper === 'ai_core' ? 'bg-cover bg-center' : 'bg-black'
      }`}
      style={!isTerm && wallpaper === 'ai_core' ? { backgroundImage: `url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')` } : {}}
    >
      {!isTerm && wallpaper === 'ai_core' && (
        <div className="absolute inset-0 bg-black/60 pointer-events-none z-0 backdrop-blur-[2px]" />
      )}
      
      {/* ── Mobile Header ── */}
      <div 
        className={`shrink-0 flex items-center justify-between px-4 pb-3 z-10 ${
          isTerm ? 'border-b terminal-border-only bg-black/90' : 'border-b border-white/10 bg-[#050505]/80 backdrop-blur-xl'
        }`}
        style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}
      >
        <div className="flex items-center gap-2.5">
          {!isTerm && (
            <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
              <defs>
                <linearGradient id="osGradMobile" x1="0" y1="0" x2="20" y2="20" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#64ffda" />
                  <stop offset="100%" stopColor="#42b883" />
                </linearGradient>
              </defs>
              <rect x="1" y="2" width="18" height="12" rx="2" stroke="url(#osGradMobile)" strokeWidth="1.5" fill="none" />
              <rect x="3.5" y="4.5" width="13" height="7" rx="1" fill="url(#osGradMobile)" opacity="0.15" />
              <rect x="5.5" y="7" width="1.5" height="2.5" rx="0.5" fill="url(#osGradMobile)" />
              <rect x="8.5" y="7.5" width="5" height="1" rx="0.5" fill="url(#osGradMobile)" opacity="0.6" />
              <rect x="8.5" y="9.5" width="3" height="1" rx="0.5" fill="url(#osGradMobile)" opacity="0.4" />
              <path d="M8 14h4" stroke="url(#osGradMobile)" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M10 14v2.5" stroke="url(#osGradMobile)" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M7.5 17.5h5" stroke="url(#osGradMobile)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )}
          <div>
            <p className={`font-bold tracking-widest text-sm uppercase leading-none ${isTerm ? 'terminal-text' : 'text-white'}`}>
              {isTerm ? '[ SUBHANKAR.OS ]' : 'SUBHANKAR.OS'}
            </p>
            <p className={`text-[9px] font-mono mt-0.5 ${isTerm ? 'terminal-text opacity-70' : 'text-white/30'}`}>v3.1.0 · AI Engineer</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full animate-pulse ${isTerm ? 'bg-[var(--term-primary)]' : 'bg-cyan shadow-[0_0_6px_rgba(100,255,218,0.8)]'}`} />
          <span className={`text-[10px] font-mono ${isTerm ? 'terminal-text opacity-70' : 'text-white/40'}`}>Online</span>
        </div>
      </div>

      {/* ── Tab Bar ── */}
      <div className={`flex mx-4 mt-2 mb-4 rounded-2xl p-1 shrink-0 z-10 ${
        isTerm ? 'border terminal-border-only' : 'bg-white/5 border border-white/10'
      }`}>
        {(['portfolio', 'system'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === tab
                ? (isTerm ? 'terminal-bg text-black' : 'bg-linear-to-r from-cyan/30 to-purple/30 text-white border border-cyan/30 shadow-lg')
                : (isTerm ? 'terminal-text hover:bg-[var(--term-bg-hover)]' : 'text-white/40 hover:text-white/70')
            }`}
          >
            {tab === 'portfolio' ? (isTerm ? '> PORTFOLIO' : '⚡ Portfolio') : (isTerm ? '> SYSTEM' : '⚙ System')}
          </button>
        ))}
      </div>

      {/* ── App Grid ── */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 scrollbar-hide z-10">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-3 gap-3"
        >
          {apps.map((app, i) => {
            const Icon = app.icon;
            return (
              <motion.button
                key={app.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => setOpenApp(app.id)}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl backdrop-blur-sm active:scale-95 transition-all text-center min-h-[100px] ${
                  isTerm 
                    ? 'border terminal-border-only terminal-hover' 
                    : `bg-linear-to-br ${app.color} border ${app.border}`
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 shadow-lg ${
                  isTerm ? '' : `bg-linear-to-br ${app.color} border ${app.border}`
                }`}>
                  <Icon size={20} className={isTerm ? 'terminal-text' : 'text-white'} />
                </div>
                <span className={`font-bold text-[11px] leading-tight ${isTerm ? 'terminal-text uppercase' : 'text-white'}`}>{isTerm ? `[${app.title}]` : app.title}</span>
                {!isTerm && <span className="text-white/50 text-[9px] mt-0.5 leading-tight">{app.desc}</span>}
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className={`shrink-0 px-4 py-3 z-10 ${
        isTerm ? 'border-t terminal-border-only bg-black/90' : 'border-t border-white/10 bg-[#050505]/80 backdrop-blur-xl'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <a href="https://github.com/Subhankarnandi777" target="_blank" rel="noreferrer"
              className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                isTerm ? 'border terminal-border-only terminal-hover' : 'bg-white/5 border border-white/10 hover:border-cyan/30'
              }`}>
              <Code2 size={14} className={isTerm ? 'terminal-text' : 'text-white/70'} />
            </a>
            <a href="https://www.linkedin.com/in/subhankar-nandi-/" target="_blank" rel="noreferrer"
              className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                isTerm ? 'border terminal-border-only terminal-hover' : 'bg-white/5 border border-white/10 hover:border-cyan/30'
              }`}>
              <Briefcase size={14} className={isTerm ? 'terminal-text' : 'text-white/70'} />
            </a>
            <a href="mailto:subhankarnandi777@gmail.com"
              className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                isTerm ? 'border terminal-border-only terminal-hover' : 'bg-white/5 border border-white/10 hover:border-cyan/30'
              }`}>
              <Mail size={14} className={isTerm ? 'terminal-text' : 'text-white/70'} />
            </a>
          </div>
          <a href="/Subhankar_Nandi_(CV).pdf" download
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold ${
              isTerm ? 'terminal-bg text-black' : 'bg-cyan/10 border border-cyan/30 text-cyan'
            }`}>
            <Download size={12} /> CV
          </a>
        </div>
      </div>

      {/* ── App Screen Overlay ── */}
      <AnimatePresence>
        {openApp && (
          <AppScreen id={openApp} onClose={() => setOpenApp(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
