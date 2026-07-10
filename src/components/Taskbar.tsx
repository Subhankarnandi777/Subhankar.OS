'use client';
import { useOSStore } from '@/store/osStore';
import { appConfigs } from './Desktop';
import { useEffect, useState } from 'react';
import { Wifi, Battery, Volume2, Search, ChevronUp, Sparkles, Bell } from 'lucide-react';

export default function Taskbar() {
  const { openWindows, activeAppId, focusApp, minimizeApp, openApp, isRecruiterMode, toggleRecruiterMode, toggleNotificationCenter, theme } = useOSStore();
  const [time, setTime] = useState<string>('');
  const [date, setDate] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setDate(now.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const isTerm = theme === 'terminal' || theme === 'amber';

  return (
    <div className={`absolute bottom-0 left-0 right-0 z-9999 flex items-center justify-between px-2 select-none ${
      isTerm 
        ? 'h-10 bg-[#000000] border-t terminal-border-only terminal-text shadow-none' 
        : 'h-12 bg-[#050505]/80 backdrop-blur-xl border-t border-white/10 shadow-[0_-5px_20px_rgba(0,0,0,0.5)]'
    }`}>
      
      {/* Start Button & Search (Left) */}
      <div className="flex items-center gap-1 md:gap-2 h-full">
        {isTerm ? (
          <button 
            className="h-8 px-2 md:px-3 border terminal-border-only flex items-center gap-2 font-bold terminal-text terminal-hover transition-colors mr-2 uppercase text-xs"
            title="Start Menu"
          >
            <span>☰</span> <span className="hidden md:inline">START</span>
          </button>
        ) : (
          <button 
            className="h-9 w-9 rounded-md hover:bg-white/10 flex items-center justify-center transition-colors group"
            title="Start Menu"
          >
            <div className="w-5 h-5 bg-linear-to-br from-cyan to-[#42b883] rounded-sm shadow-[0_0_10px_rgba(100,255,218,0.5)] group-hover:scale-110 transition-transform" />
          </button>
        )}
        
        {theme !== 'retro' && (
          <button 
            onClick={() => openApp('about')}
            className="h-9 px-2 md:px-3 rounded-md hover:bg-white/10 flex items-center gap-2 text-white/70 transition-colors"
          >
            <Search size={16} />
            <span className="text-sm hidden md:inline">Search</span>
          </button>
        )}
      </div>

      {/* Running Apps (Center) */}
      <div className="flex-1 flex justify-center items-center gap-1 h-full px-4 overflow-hidden">
        {openWindows.map(w => {
          const config = appConfigs.find(c => c.id === w.appId);
          if (!config) return null;
          const isActive = activeAppId === w.appId && !w.isMinimized;
          const Icon = config.icon;
          
          return (
            <button
              key={w.appId}
              onClick={() => {
                if (isActive) {
                  minimizeApp(w.appId);
                } else {
                  focusApp(w.appId);
                }
              }}
              className={isTerm 
                ? `h-8 px-3 flex items-center gap-2 max-w-[150px] font-bold border terminal-border-only ${isActive ? 'terminal-bg text-black' : 'bg-black terminal-text terminal-hover'}`
                : `h-10 px-3 rounded-md flex items-center gap-2 transition-all relative group ${isActive ? 'bg-white/15 shadow-inner' : 'hover:bg-white/10'}`
              }
            >
              {!isTerm && <Icon size={18} className={isActive ? "text-cyan" : "text-white/80 group-hover:text-white"} />}
              <span className={`text-sm max-w-[120px] truncate hidden md:inline ${isTerm ? "uppercase" : (isActive ? "text-white font-medium" : "text-white/80 group-hover:text-white")}`}>
                {isTerm ? `[ ${config.title} ]` : config.title}
              </span>
              {!isTerm && (
                <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] rounded-t-md transition-all ${
                  isActive ? 'w-1/2 bg-cyan shadow-[0_0_8px_rgba(100,255,218,0.8)]' : 'w-[4px] bg-white/40 group-hover:bg-white/60 group-hover:w-[6px]'
                }`} />
              )}
            </button>
          );
        })}
      </div>

      {/* System Tray (Right) */}
      <div className={`flex items-center gap-2 h-full ${isTerm ? 'px-2 border-l terminal-border-only h-full my-auto' : 'text-white/80'}`}>
        <button 
          onClick={toggleRecruiterMode}
          className={isTerm 
            ? "flex items-center gap-1 font-bold mr-2 terminal-hover px-2 h-full"
            : `h-9 px-3 rounded-md flex items-center gap-2 transition-all ${isRecruiterMode ? 'bg-purple/20 text-purple border border-purple/30' : 'hover:bg-white/10 text-purple/70 hover:text-purple'}`}
          title="Recruiter Mode"
        >
          {!isTerm && <Sparkles size={14} className={isRecruiterMode ? 'animate-pulse' : ''} />}
          <span className={`text-xs uppercase ${isTerm ? '' : 'font-semibold hidden md:block'}`}>{isRecruiterMode && isTerm ? '[RECRUITER ON]' : 'RECRUITER'}</span>
        </button>
        
        {!isTerm && (
          <button 
            onClick={toggleNotificationCenter}
            className="h-9 px-2 rounded-md hover:bg-white/10 flex items-center transition-colors"
          >
            <Bell size={16} />
          </button>
        )}
        
        <div className={`flex items-center gap-3 px-2 ${isTerm ? 'gap-2' : 'h-9 rounded-md hover:bg-white/10 transition-colors cursor-pointer'}`}>
          <Wifi size={14} />
          <button onClick={() => openApp('music')} className={isTerm ? 'hover:text-white' : 'hover:text-cyan transition-colors'} title="Open Music Player">
            <Volume2 size={14} />
          </button>
          <Battery size={14} />
        </div>
        <div className={`flex flex-col items-end justify-center px-2 cursor-default text-[10px] ${isTerm ? 'font-bold leading-tight' : 'h-9 rounded-md hover:bg-white/10 transition-colors cursor-pointer text-xs'}`}>
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
}

