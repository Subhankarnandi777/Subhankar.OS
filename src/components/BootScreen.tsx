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
        <Terminal size={64} className="text-cyan mb-4" />
        <h1 className="text-2xl font-bold tracking-widest text-white">SUBHANKAR.OS</h1>
        <p className="font-mono text-sm text-purple mt-2">v2.0.26</p>
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

