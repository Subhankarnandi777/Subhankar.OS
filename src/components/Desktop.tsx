'use client';
import { useOSStore } from '@/store/osStore';
import { Terminal, User, Briefcase, FileText, Settings, Bot, Mail, Award, LayoutDashboard, Code2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import ParticlesBackground from './ParticlesBackground';

export const appConfigs = [
  { id: 'about', title: 'About Me', icon: User },
  { id: 'projects', title: 'Projects', icon: Briefcase },
  { id: 'skills', title: 'Skills', icon: Award },
  { id: 'resume', title: 'Resume', icon: FileText },
  { id: 'terminal', title: 'Terminal', icon: Terminal },
  { id: 'assistant', title: 'AI Assistant', icon: Bot },
  { id: 'settings', title: 'Settings', icon: Settings },
  { id: 'contact', title: 'Contact', icon: Mail },
  { id: 'github', title: 'GitHub', icon: Code2 },
  { id: 'dashboard', title: 'Dashboard', icon: LayoutDashboard },
  { id: 'advisor', title: 'Career Advisor', icon: Bot },
  { id: 'blog', title: 'Blog', icon: FileText },
  { id: 'linkedin', title: 'LinkedIn', icon: Briefcase, isExternal: true, url: 'https://www.linkedin.com/in/subhankar-nandi-/' },
] as const;

export default function Desktop({ children }: { children: React.ReactNode }) {
  const { openApp, wallpaper, toggleCommandPalette, toggleRecruiterMode, theme } = useOSStore();
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K for Command Palette
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggleCommandPalette();
      }
      // Cmd/Ctrl + Alt + R for Recruiter Mode
      if ((e.metaKey || e.ctrlKey) && e.altKey && e.key.toLowerCase() === 'r') {
        e.preventDefault();
        toggleRecruiterMode();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleCommandPalette, toggleRecruiterMode]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleDoubleClick = (id: string, isExternal?: boolean, url?: string) => {
    if (isExternal && url) {
      window.open(url, '_blank');
    } else {
      openApp(id as any);
    }
    setSelectedIcon(null);
  };

  const handleClick = (id: string) => {
    setSelectedIcon(id);
  };

  const isTerm = theme === 'terminal' || theme === 'amber';

  return (
    <div 
      className={`absolute inset-0 z-0 overflow-hidden ${
        isTerm ? 'bg-black' :
        wallpaper === 'default' ? 'bg-linear-to-br from-navy via-[#050505] to-[#1a1025]' : 
        wallpaper === 'ai_core' ? 'bg-cover bg-center' : 'bg-black'
      }`}
      style={!isTerm && wallpaper === 'ai_core' ? { backgroundImage: `url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')` } : {}}
      onClick={() => setSelectedIcon(null)}
      id="desktop-area"
    >
      {/* ── TOP MENU BAR ── */}
      <div className={`absolute top-0 left-0 right-0 z-40 h-8 flex items-center justify-between px-4 select-none ${
        isTerm 
          ? 'bg-black border-b terminal-border-only'
          : 'bg-[#050505]/70 backdrop-blur-xl border-b border-white/10'
      }`}>
        {/* Left — OS Name */}
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 ${isTerm ? '' : ''}`}>
            {!isTerm && (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                <defs>
                  <linearGradient id="osGradDesktop" x1="0" y1="0" x2="20" y2="20" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#64ffda" />
                    <stop offset="100%" stopColor="#42b883" />
                  </linearGradient>
                </defs>
                {/* Monitor outline */}
                <rect x="1" y="2" width="18" height="12" rx="2" stroke="url(#osGradDesktop)" strokeWidth="1.5" fill="none" />
                {/* Screen inner glow */}
                <rect x="3.5" y="4.5" width="13" height="7" rx="1" fill="url(#osGradDesktop)" opacity="0.15" />
                {/* Cursor blink */}
                <rect x="5.5" y="7" width="1.5" height="2.5" rx="0.5" fill="url(#osGradDesktop)" />
                {/* Code lines */}
                <rect x="8.5" y="7.5" width="5" height="1" rx="0.5" fill="url(#osGradDesktop)" opacity="0.6" />
                <rect x="8.5" y="9.5" width="3" height="1" rx="0.5" fill="url(#osGradDesktop)" opacity="0.4" />
                {/* Stand */}
                <path d="M8 14h4" stroke="url(#osGradDesktop)" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M10 14v2.5" stroke="url(#osGradDesktop)" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M7.5 17.5h5" stroke="url(#osGradDesktop)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            )}
            <span className={`font-bold tracking-widest text-xs uppercase ${
              isTerm ? 'terminal-text' : 'text-white'
            }`}>
              {isTerm ? '[ SUBHANKAR.OS ]' : 'SUBHANKAR.OS'}
            </span>
          </div>
          {!isTerm && (
            <>
              <span className="text-white/20 text-xs">|</span>
              <span className="text-white/40 text-xs font-mono">v3.1.0</span>
            </>
          )}
        </div>

        {/* Right — Status info */}
        <div className="flex items-center gap-4">
          {!isTerm && (
            <span className="text-white/30 text-[10px] font-mono hidden sm:block">
              AI Engineer · Full Stack Developer
            </span>
          )}
          <span className={`text-[10px] font-mono ${isTerm ? 'terminal-text' : 'text-white/40'}`}>
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
      {/* Dynamic Cursor Glow (Modern Only) */}
      {!isTerm && (
        <div 
          className="absolute w-[600px] h-[600px] bg-cyan/10 rounded-full blur-[100px] pointer-events-none transition-opacity duration-500 ease-out z-0"
          style={{
            left: mousePos.x - 300,
            top: mousePos.y - 300,
          }}
        />
      )}

      {!isTerm && <ParticlesBackground />}

      {/* Background abstract elements for futuristic OS feel */}
      {!isTerm && wallpaper === 'default' && (
        <>
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan/5 blur-[120px] pointer-events-none z-0" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple/5 blur-[120px] pointer-events-none z-0" />
        </>
      )}
      {!isTerm && wallpaper === 'ai_core' && (
        <div className="absolute inset-0 bg-black/60 pointer-events-none z-0 backdrop-blur-[2px]" />
      )}
      
      {/* Desktop Icons — Categorized 2-column grid */}
      <div className={`hidden md:flex absolute top-10 left-4 flex-col gap-1 ${isTerm ? 'right-4 items-end' : ''}`}>

        {/* Portfolio Group */}
        {!isTerm && <p className="text-[9px] uppercase tracking-[0.2em] text-white/25 font-semibold px-1 mb-0.5 mt-1">Portfolio</p>}
        <div className="grid grid-cols-2 gap-1">
          {['about','projects','skills','resume'].map(id => {
            const app = appConfigs.find(a => a.id === id)!;
            return (
              <div
                key={app.id}
                onClick={(e) => { e.stopPropagation(); handleClick(app.id); }}
                onDoubleClick={(e) => { e.stopPropagation(); handleDoubleClick(app.id, (app as any).isExternal, (app as any).url); }}
                className={`flex flex-col items-center justify-center w-[72px] p-2 rounded-xl transition-all cursor-pointer select-none ${
                  isTerm 
                    ? selectedIcon === app.id ? 'terminal-bg' : 'terminal-hover'
                    : selectedIcon === app.id 
                      ? 'bg-cyan/15 border border-cyan/30 shadow-[0_0_12px_rgba(100,255,218,0.15)]' 
                      : 'hover:bg-white/10 border border-transparent hover:border-white/10'
                }`}
              >
                <div className={`w-11 h-11 mb-1.5 flex items-center justify-center rounded-xl ${
                  isTerm ? '' : 'bg-linear-to-br from-white/15 to-white/5 border border-white/10 shadow-lg backdrop-blur-sm'
                }`}>
                  <app.icon className={`w-6 h-6 ${isTerm ? (selectedIcon === app.id ? 'text-black' : 'terminal-text') : 'text-white'}`} />
                </div>
                <span className={`text-[10px] text-center w-full leading-tight ${
                  isTerm ? (selectedIcon === app.id ? 'text-black font-bold uppercase' : 'terminal-text uppercase') : 'text-white/90 font-medium'
                }`} style={isTerm ? {} : { textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}>
                  {isTerm ? `[${app.title}]` : app.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* Tools Group */}
        {!isTerm && <p className="text-[9px] uppercase tracking-[0.2em] text-white/25 font-semibold px-1 mb-0.5 mt-3">Tools</p>}
        <div className="grid grid-cols-2 gap-1">
          {['terminal','assistant','github','dashboard'].map(id => {
            const app = appConfigs.find(a => a.id === id)!;
            return (
              <div
                key={app.id}
                onClick={(e) => { e.stopPropagation(); handleClick(app.id); }}
                onDoubleClick={(e) => { e.stopPropagation(); handleDoubleClick(app.id, (app as any).isExternal, (app as any).url); }}
                className={`flex flex-col items-center justify-center w-[72px] p-2 rounded-xl transition-all cursor-pointer select-none ${
                  isTerm 
                    ? selectedIcon === app.id ? 'terminal-bg' : 'terminal-hover'
                    : selectedIcon === app.id 
                      ? 'bg-purple/15 border border-purple/30 shadow-[0_0_12px_rgba(179,157,219,0.15)]' 
                      : 'hover:bg-white/10 border border-transparent hover:border-white/10'
                }`}
              >
                <div className={`w-11 h-11 mb-1.5 flex items-center justify-center rounded-xl ${
                  isTerm ? '' : 'bg-linear-to-br from-white/15 to-white/5 border border-white/10 shadow-lg backdrop-blur-sm'
                }`}>
                  <app.icon className={`w-6 h-6 ${isTerm ? (selectedIcon === app.id ? 'text-black' : 'terminal-text') : 'text-white'}`} />
                </div>
                <span className={`text-[10px] text-center w-full leading-tight ${
                  isTerm ? (selectedIcon === app.id ? 'text-black font-bold uppercase' : 'terminal-text uppercase') : 'text-white/90 font-medium'
                }`} style={isTerm ? {} : { textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}>
                  {isTerm ? `[${app.title}]` : app.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* Connect Group */}
        {!isTerm && <p className="text-[9px] uppercase tracking-[0.2em] text-white/25 font-semibold px-1 mb-0.5 mt-3">Connect</p>}
        <div className="grid grid-cols-2 gap-1">
          {['contact','linkedin','advisor','blog'].map(id => {
            const app = appConfigs.find(a => a.id === id);
            if (!app) return null;
            return (
              <div
                key={app.id}
                onClick={(e) => { e.stopPropagation(); handleClick(app.id); }}
                onDoubleClick={(e) => { e.stopPropagation(); handleDoubleClick(app.id, (app as any).isExternal, (app as any).url); }}
                className={`flex flex-col items-center justify-center w-[72px] p-2 rounded-xl transition-all cursor-pointer select-none ${
                  isTerm 
                    ? selectedIcon === app.id ? 'terminal-bg' : 'terminal-hover'
                    : selectedIcon === app.id 
                      ? 'bg-white/20 border border-white/30 shadow-[0_0_12px_rgba(255,255,255,0.1)]' 
                      : 'hover:bg-white/10 border border-transparent hover:border-white/10'
                }`}
              >
                <div className={`w-11 h-11 mb-1.5 flex items-center justify-center rounded-xl ${
                  isTerm ? '' : 'bg-linear-to-br from-white/15 to-white/5 border border-white/10 shadow-lg backdrop-blur-sm'
                }`}>
                  <app.icon className={`w-6 h-6 ${isTerm ? (selectedIcon === app.id ? 'text-black' : 'terminal-text') : 'text-white'}`} />
                </div>
                <span className={`text-[10px] text-center w-full leading-tight ${
                  isTerm ? (selectedIcon === app.id ? 'text-black font-bold uppercase' : 'terminal-text uppercase') : 'text-white/90 font-medium'
                }`} style={isTerm ? {} : { textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}>
                  {isTerm ? `[${app.title}]` : app.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* Settings — solo at bottom */}
        {!isTerm && <p className="text-[9px] uppercase tracking-[0.2em] text-white/25 font-semibold px-1 mb-0.5 mt-3">System</p>}
        <div className="grid grid-cols-2 gap-1">
          {['settings'].map(id => {
            const app = appConfigs.find(a => a.id === id)!;
            return (
              <div
                key={app.id}
                onClick={(e) => { e.stopPropagation(); handleClick(app.id); }}
                onDoubleClick={(e) => { e.stopPropagation(); handleDoubleClick(app.id, (app as any).isExternal, (app as any).url); }}
                className={`flex flex-col items-center justify-center w-[72px] p-2 rounded-xl transition-all cursor-pointer select-none ${
                  selectedIcon === app.id 
                    ? 'bg-white/20 border border-white/30' 
                    : 'hover:bg-white/10 border border-transparent hover:border-white/10'
                }`}
              >
                <div className="w-11 h-11 mb-1.5 flex items-center justify-center rounded-xl bg-linear-to-br from-white/15 to-white/5 border border-white/10 shadow-lg backdrop-blur-sm">
                  <app.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-[10px] text-center w-full leading-tight text-white/90 font-medium" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}>
                  {app.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile: horizontal scrollable icon dock above taskbar */}
      <div className="md:hidden absolute bottom-12 left-0 right-0 z-50 flex items-center gap-3 px-3 py-2 overflow-x-auto scrollbar-hide bg-[#050505]/80 backdrop-blur-xl border-t border-white/10">
        {appConfigs.map((app) => (
          <div
            key={app.id}
            onClick={(e) => { e.stopPropagation(); handleDoubleClick(app.id, (app as any).isExternal, (app as any).url); }}
            className="flex flex-col items-center justify-center shrink-0 w-14 py-1 rounded-xl hover:bg-white/10 active:bg-white/20 transition-colors cursor-pointer"
          >
            <div className="w-10 h-10 mb-1 flex items-center justify-center rounded-xl bg-linear-to-br from-white/10 to-white/5 border border-white/10 shadow backdrop-blur-sm">
              <app.icon className="w-6 h-6 text-white drop-shadow-md" />
            </div>
            <span className="text-[9px] text-center text-white/80 truncate w-full leading-tight" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
              {app.title}
            </span>
          </div>
        ))}
      </div>

      {/* Render open application windows */}
      {children}
    </div>
  );
}

