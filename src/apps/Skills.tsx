'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Database, Globe, Brain, TerminalSquare, Layers } from 'lucide-react';

const skillCategories = [
  {
    id: 'ai',
    title: "AI & ML",
    icon: Brain,
    color: "#b39ddb",
    skills: [
      { name: "Machine Learning", level: 90 },
      { name: "Deep Learning", level: 85 },
      { name: "Computer Vision", level: 85 },
      { name: "NLP", level: 80 },
      { name: "Generative AI", level: 85 },
      { name: "Agentic AI", level: 80 }
    ]
  },
  {
    id: 'frontend',
    title: "Frontend",
    icon: Globe,
    color: "#64ffda",
    skills: [
      { name: "React.js", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Bootstrap", level: 85 },
      { name: "HTML5/CSS3", level: 90 }
    ]
  },
  {
    id: 'backend',
    title: "Backend & DB",
    icon: Database,
    color: "#ff7b72",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 85 },
      { name: "FastAPI", level: 80 },
      { name: "PostgreSQL", level: 80 },
      { name: "MongoDB", level: 85 },
      { name: "MySQL", level: 80 }
    ]
  },
  {
    id: 'languages',
    title: "Languages",
    icon: Code,
    color: "#79c0ff",
    skills: [
      { name: "Python", level: 95 },
      { name: "JavaScript", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "C/C++", level: 80 },
      { name: "Java", level: 75 },
      { name: "SQL", level: 85 }
    ]
  },
  {
    id: 'tools',
    title: "Tools & DevOps",
    icon: TerminalSquare,
    color: "#f0883e",
    skills: [
      { name: "Git/GitHub", level: 90 },
      { name: "Docker", level: 75 },
      { name: "Google Cloud", level: 80 },
      { name: "REST APIs", level: 90 },
      { name: "Jupyter Notebook", level: 95 }
    ]
  }
];

const AnimatedCounter = ({ value, label }: { value: number; label: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1500;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
      <span className="text-4xl font-bold text-cyan font-mono">{count}+</span>
      <span className="text-sm text-gray-400 mt-2 uppercase tracking-wider">{label}</span>
    </div>
  );
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].id);

  const activeData = skillCategories.find(c => c.id === activeCategory);

  return (
    <div className="flex flex-col h-full bg-[#050505] text-white">
      {/* Top Stats */}
      <div className="grid grid-cols-3 gap-4 p-6 border-b border-white/10 bg-navy/40">
        <AnimatedCounter value={25} label="Total Skills" />
        <AnimatedCounter value={15} label="Projects" />
        <AnimatedCounter value={3} label="Years Exp" />
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-1/3 border-r border-white/10 p-4 space-y-2 overflow-y-auto bg-black/20">
          {skillCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive ? 'bg-white/10 shadow-lg scale-105' : 'hover:bg-white/5 opacity-60 hover:opacity-100'
                }`}
                style={{
                  borderLeft: isActive ? `4px solid ${cat.color}` : '4px solid transparent'
                }}
              >
                <Icon size={18} style={{ color: isActive ? cat.color : '#fff' }} />
                <span className={`font-medium ${isActive ? 'text-white' : 'text-gray-300'}`}>{cat.title}</span>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8 overflow-y-auto relative">
          <AnimatePresence mode="wait">
            {activeData && (
              <motion.div
                key={activeData.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8 max-w-2xl mx-auto"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: `${activeData.color}20`, border: `1px solid ${activeData.color}40` }}
                  >
                    <activeData.icon size={24} style={{ color: activeData.color }} />
                  </div>
                  <h3 className="text-3xl font-bold" style={{ color: activeData.color }}>{activeData.title}</h3>
                </div>

                <div className="space-y-6">
                  {activeData.skills.map((skill, idx) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-end mb-2">
                        <span className="font-medium text-gray-200">{skill.name}</span>
                        <span className="text-sm font-mono text-gray-500">{skill.level}%</span>
                      </div>
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: idx * 0.1, type: 'spring' }}
                          className="h-full rounded-full relative"
                          style={{ backgroundColor: activeData.color }}
                        >
                          <div className="absolute inset-0 bg-linear-to-r from-transparent to-white/30" />
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
