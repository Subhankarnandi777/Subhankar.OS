'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useOSStore } from '@/store/osStore';
import { Terminal } from 'lucide-react';

const bootSequence = [
  "Initializing AI Portfolio...",
  "Loading Profile...",
  "Loading Projects...",
  "Loading Skills...",
  "Connecting AI Assistant...",
  "System Ready."
];

export default function BootScreen() {
  const { setBooted } = useOSStore();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep < bootSequence.length) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 600);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setBooted(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentStep, setBooted]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-[#050505] text-cyan-400 font-mono absolute inset-0 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="mb-8 flex flex-col items-center"
      >
        <svg width="64" height="64" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-6 drop-shadow-[0_0_15px_rgba(100,255,218,0.5)]">
          <defs>
            <linearGradient id="osGradBoot" x1="0" y1="0" x2="20" y2="20" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#64ffda" />
              <stop offset="100%" stopColor="#42b883" />
            </linearGradient>
          </defs>
          <rect x="1" y="2" width="18" height="12" rx="2" stroke="url(#osGradBoot)" strokeWidth="1.2" fill="none" />
          <rect x="3.5" y="4.5" width="13" height="7" rx="1" fill="url(#osGradBoot)" opacity="0.15" />
          <rect x="5.5" y="7" width="1.5" height="2.5" rx="0.5" fill="url(#osGradBoot)" />
          <rect x="8.5" y="7.5" width="5" height="1" rx="0.5" fill="url(#osGradBoot)" opacity="0.6" />
          <rect x="8.5" y="9.5" width="3" height="1" rx="0.5" fill="url(#osGradBoot)" opacity="0.4" />
          <path d="M8 14h4" stroke="url(#osGradBoot)" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M10 14v2.5" stroke="url(#osGradBoot)" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M7.5 17.5h5" stroke="url(#osGradBoot)" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        <h1 className="text-3xl font-bold tracking-[0.2em] text-white uppercase drop-shadow-lg">SUBHANKAR.OS</h1>
        <p className="font-mono text-sm text-[#42b883] mt-2 tracking-widest">v3.1.0</p>
      </motion.div>

      <div className="w-16 h-16 border-4 border-navy border-t-cyan rounded-full animate-spin shadow-[0_0_15px_rgba(100,255,218,0.5)]" />

      <div className="w-80 h-48 bg-black/50 border border-navy p-4 rounded text-sm overflow-hidden flex flex-col justify-end mt-8">
        {bootSequence.slice(0, currentStep).map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-1"
          >
            <span className="text-purple">{'>'}</span> {msg}
          </motion.div>
        ))}
        {currentStep < bootSequence.length && (
          <motion.div
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block w-2 h-4 bg-cyan mt-1"
          />
        )}
      </div>
    </div>
  );
}

