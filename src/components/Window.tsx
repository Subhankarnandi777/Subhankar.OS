'use client';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useOSStore, AppId } from '@/store/osStore';
import { appConfigs } from './Desktop';
import { X, Minus, Square } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface WindowProps {
  appId: AppId;
  children: React.ReactNode;
}

export default function Window({ appId, children }: WindowProps) {
  const { openWindows, activeAppId, closeApp, minimizeApp, maximizeApp, focusApp, theme } = useOSStore();
  const windowState = openWindows.find(w => w.appId === appId);
  const config = appConfigs.find(c => c.id === appId);
  const constraintsRef = useRef(null);

  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    constraintsRef.current = document.getElementById('desktop-area') as any;
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (!windowState || !config || !isClient) return null;

  const isActive = activeAppId === appId;
  const isMaximized = windowState.isMaximized || isMobile; // auto-maximize on mobile
  const isMinimized = windowState.isMinimized;
  const isTerm = theme === 'terminal' || theme === 'amber';

  const Icon = config.icon;

  const handlePointerDown = () => {
    if (!isActive) focusApp(appId);
  };

  const variants: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 40, rotateX: 10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotateX: 0,
      width: isMaximized ? '100%' : '800px',
      height: isMaximized ? (isMobile ? '100dvh' : 'calc(100vh - 48px)') : '500px',
      x: isMaximized ? 0 : undefined,
      y: isMaximized ? 0 : undefined,
      transition: { type: 'spring', damping: 25, stiffness: 300, mass: 0.8 }
    },
    minimized: { opacity: 0, scale: 0.6, y: '50vh', transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.9, y: 20, transition: { duration: 0.2 } }
  };

  return (
    <AnimatePresence>
      {!isMinimized && (
        <motion.div
          drag={!isMaximized}
          dragConstraints={{ left: 0, top: 0, right: typeof window !== 'undefined' ? window.innerWidth - 800 : 0, bottom: typeof window !== 'undefined' ? window.innerHeight - 548 : 0 }}
          dragMomentum={false}
          dragElastic={0}
          onPointerDown={handlePointerDown}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          style={{ zIndex: windowState.zIndex }}
          className={`absolute overflow-hidden flex flex-col pointer-events-auto ${
            isTerm
              ? `terminal-border ${isMaximized ? 'inset-0' : 'top-[10%] left-[15%] w-[70vw] h-[75vh]'}`
              : `rounded-xl shadow-2xl border transition-shadow ${
                  isActive 
                    ? 'border-white/20 shadow-[0_20px_60px_-15px_rgba(100,255,218,0.2),inset_0_1px_0_rgba(255,255,255,0.2)]' 
                    : 'border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
                } ${isMaximized ? 'inset-0 rounded-none! border-0' : 'top-[5%] left-[5%] w-[90vw] h-[85vh] md:top-[10%] md:left-[15%] md:w-[70vw] md:h-[75vh]'}`
          }`}
        >
          {/* Glass background & Reflection (Modern Only) */}
          {!isTerm && (
            <>
              <div className="absolute inset-0 bg-navy/80 backdrop-blur-2xl -z-10" />
              <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/40 to-transparent opacity-50 z-20 pointer-events-none" />
              <div className="absolute top-0 left-0 bottom-0 w-px bg-linear-to-b from-white/30 to-transparent opacity-50 z-20 pointer-events-none" />
            </>
          )}
          
          {/* Title Bar */}
          <div 
            className={`h-9 flex items-center justify-between px-3 select-none shrink-0 ${
              isTerm 
                ? (isActive ? 'terminal-titlebar' : 'terminal-hover terminal-text border-b terminal-border-only')
                : `border-b border-white/10 ${isActive ? 'bg-white/5' : 'bg-black/20'}`
            } ${!isMaximized ? 'cursor-grab active:cursor-grabbing' : ''}`}
            onDoubleClick={() => maximizeApp(appId)}
          >
            <div className="flex items-center gap-2 pointer-events-none text-white/90">
              {!isTerm && (
                <div className={`w-5 h-5 rounded-md flex items-center justify-center ${isActive ? 'bg-cyan/20' : 'bg-white/10'}`}>
                  <Icon size={13} className={isActive ? 'text-cyan' : 'text-white/60'} />
                </div>
              )}
              <span className={`text-xs tracking-wide ${isTerm ? 'font-bold uppercase' : 'font-medium text-white/80'}`}>
                {isTerm ? `${config.title.replace(' ', '_').toUpperCase()}.EXE` : config.title}
              </span>
            </div>
            
            {/* macOS-style traffic light buttons */}
            <div className={`flex items-center gap-1.5 z-10 ${isTerm ? 'font-bold text-lg gap-0' : ''}`}>
              <button 
                onClick={(e) => { e.stopPropagation(); minimizeApp(appId); }}
                className={isTerm 
                  ? "px-2 hover:bg-[#000000] terminal-text flex items-center justify-center leading-none h-full" 
                  : "w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-300 flex items-center justify-center group transition-colors"}
                title="Minimize"
              >
                {isTerm ? '_' : <Minus size={6} className="text-yellow-800 opacity-0 group-hover:opacity-100" />}
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); maximizeApp(appId); }}
                className={isTerm 
                  ? "px-2 hover:bg-[#000000] terminal-text flex items-center justify-center leading-none h-full" 
                  : "w-3 h-3 rounded-full bg-green-400 hover:bg-green-300 flex items-center justify-center group transition-colors"}
                title="Maximize"
              >
                {isTerm ? '□' : <Square size={5} className="text-green-800 opacity-0 group-hover:opacity-100" />}
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); closeApp(appId); }}
                className={isTerm 
                  ? "px-2 hover:bg-[#000000] terminal-text flex items-center justify-center leading-none ml-1 h-full" 
                  : "w-3 h-3 rounded-full bg-red-400 hover:bg-red-300 flex items-center justify-center group transition-colors"}
                title="Close"
              >
                {isTerm ? 'X' : <X size={6} className="text-red-800 opacity-0 group-hover:opacity-100" />}
              </button>
            </div>
          </div>

          {/* Window Content */}
          <div className={`flex-1 overflow-auto relative ${isTerm ? 'bg-[#000000] terminal-text' : 'bg-black/40'}`}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

