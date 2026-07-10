'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useOSStore, AppId } from '@/store/osStore';
import { appConfigs } from './Desktop';
import { Search, Terminal, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CommandPalette() {
  const { isCommandPaletteOpen, toggleCommandPalette, openApp, addNotification } = useOSStore();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        toggleCommandPalette();
      }
      if (e.key === 'Escape' && isCommandPaletteOpen) {
        toggleCommandPalette();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, toggleCommandPalette]);

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isCommandPaletteOpen]);

  const filteredApps = appConfigs.filter(app => 
    app.title.toLowerCase().includes(query.toLowerCase())
  );

  const isCommand = query.startsWith('>');

  const handleExecute = () => {
    if (isCommand) {
      const cmd = query.substring(1).trim();
      addNotification({
        title: 'Command Executed',
        message: `Ran: ${cmd}`,
        type: 'success'
      });
      openApp('terminal');
    } else {
      const app = filteredApps[selectedIndex];
      if (app) {
        if ((app as any).isExternal && (app as any).url) {
          window.open((app as any).url, '_blank');
        } else {
          openApp(app.id as AppId);
        }
      }
    }
    toggleCommandPalette();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, filteredApps.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleExecute();
    }
  };

  if (!isCommandPaletteOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-9999 flex items-start justify-center pt-[20vh]" onClick={toggleCommandPalette}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-2xl bg-navy/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center px-4 py-3 border-b border-white/10">
            {isCommand ? <Terminal className="w-5 h-5 text-cyan mr-3" /> : <Search className="w-5 h-5 text-gray-400 mr-3" />}
            <input
              ref={inputRef}
              type="text"
              className="flex-1 bg-transparent outline-none text-white text-lg placeholder:text-gray-500"
              placeholder="Search apps or type > for commands..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              onKeyDown={handleKeyDown}
            />
            <div className="flex gap-1">
              <kbd className="px-2 py-1 bg-white/10 rounded text-xs text-gray-400 font-mono">ESC</kbd>
            </div>
          </div>
          
          <div className="max-h-[60vh] overflow-y-auto p-2">
            {!isCommand && filteredApps.map((app, idx) => (
              <div 
                key={app.id} 
                className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-colors ${idx === selectedIndex ? 'bg-white/10' : 'hover:bg-white/5'}`}
                onMouseEnter={() => setSelectedIndex(idx)}
                onClick={handleExecute}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-linear-to-br from-white/10 to-transparent border border-white/5`}>
                  <app.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-medium">{app.title}</h4>
                  <p className="text-xs text-gray-400">Application</p>
                </div>
                {idx === selectedIndex && <ArrowRight className="w-4 h-4 text-cyan" />}
              </div>
            ))}
            
            {isCommand && (
              <div className="px-4 py-3 bg-white/5 rounded-xl cursor-pointer" onClick={handleExecute}>
                <h4 className="text-white font-mono text-sm">Execute in Terminal: <span className="text-cyan">{query.substring(1)}</span></h4>
              </div>
            )}
            
            {!isCommand && filteredApps.length === 0 && (
              <div className="px-4 py-8 text-center text-gray-400">
                No apps found for "{query}"
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
