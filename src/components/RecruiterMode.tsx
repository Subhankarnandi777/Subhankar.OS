'use client';
import React from 'react';
import { useOSStore } from '@/store/osStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Download, Sparkles, X, Mail, Phone, ExternalLink } from 'lucide-react';

export default function RecruiterMode() {
  const { isRecruiterMode, toggleRecruiterMode, openApp } = useOSStore();

  const handleDownload = async () => {
    try {
      const response = await fetch('/Subhankar_Nandi_CV.pdf');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Subhankar_Nandi_CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <AnimatePresence>
      {isRecruiterMode && (
        <motion.div
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed top-12 right-0 bottom-12 w-96 bg-navy/95 backdrop-blur-3xl border-l border-white/20 z-9500 shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10 bg-linear-to-r from-purple/20 to-transparent">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple/30 rounded-lg text-purple">
                <Sparkles size={20} />
              </div>
              <h2 className="text-xl font-bold text-white tracking-wide">Recruiter View</h2>
            </div>
            <button onClick={toggleRecruiterMode} className="text-gray-400 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {/* 30 Second Summary */}
            <section>
              <h3 className="text-sm font-bold text-cyan mb-3 uppercase tracking-wider">30-Second Summary</h3>
              <p className="text-sm text-gray-300 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/10 shadow-inner">
                Passionate B.Tech CSE (AI & ML) student with hands-on experience building full-stack AI applications, computer vision systems, and modern web architectures. Strong foundation in Python, TypeScript, and modern frameworks.
              </p>
            </section>

            {/* Quick Actions */}
            <section>
              <h3 className="text-sm font-bold text-purple mb-3 uppercase tracking-wider">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={handleDownload}
                  className="flex flex-col items-center justify-center p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all group cursor-pointer"
                >
                  <Download className="w-6 h-6 text-gray-400 group-hover:text-cyan mb-2 transition-colors" />
                  <span className="text-xs font-medium text-gray-300">Get Resume</span>
                </button>
                <button 
                  onClick={() => openApp('projects')}
                  className="flex flex-col items-center justify-center p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all group"
                >
                  <Briefcase className="w-6 h-6 text-gray-400 group-hover:text-purple mb-2 transition-colors" />
                  <span className="text-xs font-medium text-gray-300">View Portfolio</span>
                </button>
              </div>
            </section>

            {/* Key Achievements */}
            <section>
              <h3 className="text-sm font-bold text-green-400 mb-3 uppercase tracking-wider">Key Highlights</h3>
              <ul className="space-y-3">
                {[
                  "Built production-ready AI Expense Tracker",
                  "Developed YOLOv8 Computer Vision Security System",
                  "Proficient in Next.js, React, and Python Ecosystem",
                  "Strong problem-solving and architectural design skills"
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-gray-300">
                    <span className="text-green-400 shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Footer Contact */}
          <div className="p-6 border-t border-white/10 bg-black/40">
            <h3 className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-wider text-center">Fast-Track Contact</h3>
            <div className="flex gap-2">
              <button 
                onClick={() => {
                  navigator.clipboard.writeText('subhankarnandi2006@gmail.com');
                  alert('Email copied to clipboard!');
                }}
                className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-cyan/20 text-white py-3 rounded-lg border border-white/10 hover:border-cyan/50 transition-all text-sm font-medium"
              >
                <Mail size={16} /> Email
              </button>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText('9433402977');
                  alert('Phone number copied to clipboard!');
                }}
                className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-cyan/20 text-white py-3 rounded-lg border border-white/10 hover:border-cyan/50 transition-all text-sm font-medium"
              >
                <Phone size={16} /> Phone
              </button>
              <button 
                onClick={() => window.open('https://www.linkedin.com/in/subhankar-nandi-/', '_blank')}
                className="flex items-center justify-center w-12 bg-white/10 hover:bg-blue-500/20 text-white py-3 rounded-lg border border-white/10 hover:border-blue-500/50 transition-all"
              >
                <ExternalLink size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
