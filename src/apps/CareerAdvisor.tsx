'use client';
import React, { useState } from 'react';
import { Target, Search, ArrowRight, BrainCircuit, LineChart, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const roles = [
  { id: 'swe', title: 'Software Engineer', match: 92, missing: ['System Design (Scale)', 'Advanced Kubernetes'] },
  { id: 'ml', title: 'Machine Learning Engineer', match: 88, missing: ['MLOps pipelines', 'Advanced Data Engineering'] },
  { id: 'fs', title: 'Full Stack Developer', match: 96, missing: ['Advanced GraphQL', 'WebRTC'] }
];

export default function CareerAdvisor() {
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 2000);
  };

  return (
    <div className="flex h-full bg-[#050505] text-white">
      {/* Sidebar Roles */}
      <div className="w-1/3 border-r border-white/10 p-4 space-y-4 bg-navy/40">
        <div className="flex items-center gap-2 mb-6">
          <BrainCircuit className="w-6 h-6 text-purple" />
          <h2 className="text-xl font-bold text-gray-200">AI Advisor</h2>
        </div>
        
        <p className="text-sm text-gray-400 mb-4 px-2">Select a target role to view skill gap analysis and resume mapping.</p>
        
        {roles.map(role => (
          <button
            key={role.id}
            onClick={() => { setSelectedRole(role); handleAnalyze(); }}
            className={`w-full text-left p-4 rounded-xl border transition-all ${
              selectedRole.id === role.id 
                ? 'bg-purple/20 border-purple text-white shadow-lg' 
                : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-gray-200'
            }`}
          >
            <h3 className="font-bold mb-2">{role.title}</h3>
            <div className="flex justify-between items-center text-xs">
              <span>Match Score</span>
              <span className={`font-mono font-bold ${role.match >= 90 ? 'text-green-400' : 'text-yellow-400'}`}>{role.match}%</span>
            </div>
            <div className="w-full bg-black/50 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-current rounded-full" style={{ width: `${role.match}%` }} />
            </div>
          </button>
        ))}
      </div>

      {/* Main Analysis Area */}
      <div className="flex-1 p-8 overflow-y-auto">
        <AnimatePresence mode="wait">
          {isAnalyzing ? (
            <motion.div 
              key="analyzing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col items-center justify-center text-purple"
            >
              <Search className="w-12 h-12 animate-pulse mb-4" />
              <p className="font-mono">Analyzing resume against {selectedRole.title} requirements...</p>
            </motion.div>
          ) : (
            <motion.div 
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8 max-w-3xl"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">{selectedRole.title}</h2>
                  <p className="text-gray-400">Analysis based on current resume and GitHub activity.</p>
                </div>
                <div className="bg-purple/10 border border-purple/30 p-4 rounded-2xl text-center min-w-[120px]">
                  <span className="block text-4xl font-black text-purple">{selectedRole.match}%</span>
                  <span className="text-xs uppercase tracking-wider text-purple font-bold">Fit Score</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-green-400 flex items-center gap-2 mb-4">
                    <Target className="w-5 h-5" /> Strong Alignment
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-300">
                    <li className="flex gap-2"><span className="text-green-400">✓</span> Python & TypeScript mastery</li>
                    <li className="flex gap-2"><span className="text-green-400">✓</span> Modern React / Next.js ecosystem</li>
                    <li className="flex gap-2"><span className="text-green-400">✓</span> Proven ML integration experience</li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-yellow-400 flex items-center gap-2 mb-4">
                    <LineChart className="w-5 h-5" /> Gap Analysis
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-300">
                    {selectedRole.missing.map((item, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span className="text-yellow-400">!</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-linear-to-r from-purple/20 to-transparent border border-purple/30 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                  <Briefcase className="w-5 h-5 text-purple" /> AI Recommendation
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  You are highly qualified for this role. To close the remaining gaps, consider building a quick side project focused on <strong className="text-purple">{selectedRole.missing[0]}</strong>. Highlighting your experience with the Expense Tracker's backend architecture will significantly boost your profile for this specific role.
                </p>
                <button className="bg-purple text-white px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-purple/80 transition-colors">
                  Generate Custom Cover Letter <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
