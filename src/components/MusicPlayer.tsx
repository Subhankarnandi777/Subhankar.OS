'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { Play, Pause, SkipForward, SkipBack, Music, Volume2, X } from 'lucide-react';
import { useOSStore } from '@/store/osStore';

const tracks = [
  { id: 1, title: 'Cyber City Ambient', artist: 'Neon Network', duration: '3:45' },
  { id: 2, title: 'Deep Learning Lofi', artist: 'Neural Beats', duration: '2:30' },
  { id: 3, title: 'Terminal Focus', artist: 'Code Wave', duration: '4:15' }
];

export default function MusicPlayer() {
  const { openWindows, closeApp } = useOSStore();
  const isOpen = openWindows.some(w => w.appId === 'music');
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const dragControls = useDragControls();

  if (!isOpen) return null;

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragMomentum={false}
      dragElastic={0.1}
      initial={{ opacity: 0, y: 50, x: window.innerWidth - 320 }}
      animate={{ opacity: 1, y: window.innerHeight - 250 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed w-72 bg-navy/95 backdrop-blur-3xl border border-white/20 rounded-2xl shadow-2xl z-8000 overflow-hidden"
    >
      {/* Drag Handle & Header */}
      <div 
        onPointerDown={(e) => dragControls.start(e)}
        className="h-8 bg-white/5 border-b border-white/10 flex items-center justify-between px-3 cursor-grab active:cursor-grabbing"
      >
        <div className="flex items-center gap-2">
          <Music size={14} className="text-purple" />
          <span className="text-xs font-semibold text-gray-300">OS Media Player</span>
        </div>
        <button onClick={() => closeApp('music')} className="text-gray-500 hover:text-white transition-colors">
          <X size={14} />
        </button>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-lg bg-linear-to-br from-purple to-cyan flex items-center justify-center shrink-0 shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20" />
            <Music size={24} className="text-white relative z-10" />
            {isPlaying && (
              <div className="absolute inset-0 border-2 border-white/30 rounded-lg animate-pulse" />
            )}
          </div>
          <div className="flex-1 overflow-hidden">
            <h4 className="text-white font-bold text-sm truncate">{tracks[currentTrack].title}</h4>
            <p className="text-gray-400 text-xs truncate">{tracks[currentTrack].artist}</p>
          </div>
        </div>

        {/* Progress bar mock */}
        <div className="mb-4">
          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-linear-to-r from-purple to-cyan w-1/3 rounded-full" />
          </div>
          <div className="flex justify-between text-[10px] text-gray-500 mt-1 font-mono">
            <span>1:15</span>
            <span>{tracks[currentTrack].duration}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <button className="text-gray-400 hover:text-white transition-colors">
            <Volume2 size={16} />
          </button>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setCurrentTrack((prev) => (prev > 0 ? prev - 1 : tracks.length - 1))}
              className="text-gray-300 hover:text-white transition-colors"
            >
              <SkipBack size={20} />
            </button>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 rounded-full bg-white text-navy flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            >
              {isPlaying ? <Pause size={20} className="fill-current" /> : <Play size={20} className="fill-current ml-1" />}
            </button>
            <button 
              onClick={() => setCurrentTrack((prev) => (prev < tracks.length - 1 ? prev + 1 : 0))}
              className="text-gray-300 hover:text-white transition-colors"
            >
              <SkipForward size={20} />
            </button>
          </div>
          
          <div className="w-4" /> {/* Spacer */}
        </div>
      </div>
    </motion.div>
  );
}
