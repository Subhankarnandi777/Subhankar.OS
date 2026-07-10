'use client';
import React, { useState } from 'react';
import { ExternalLink, Code2, Search, Filter, Cpu, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOSStore } from '@/store/osStore';

const allProjects = [
  {
    title: "SmartSpend AI",
    description: "An AI-powered personal finance assistant that analyzes expenses, classifies transactions, detects fraud, and provides intelligent financial insights.",
    tech: ["React", "FastAPI", "Node.js", "PostgreSQL", "Machine Learning"],
    category: "Full Stack",
    github: "https://github.com/Subhankarnandi777/SmartSpend-AI",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "E-Sehat",
    description: "AI-powered healthcare platform designed to improve access to telemedicine with intelligent symptom analysis, medicine management, and cloud integration.",
    tech: ["React Native", "Node.js", "PostgreSQL", "OpenAI", "Google Cloud"],
    category: "Full Stack",
    github: "https://github.com/Subhankarnandi777/E-Sehat",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Support Ticket Classification",
    description: "Machine Learning system that automatically classifies customer support tickets and predicts priority using Natural Language Processing.",
    tech: ["Python", "Scikit-learn", "Streamlit", "NLP"],
    category: "AI/ML",
    github: "https://github.com/Subhankarnandi777/Support-Ticket-Classification",
    live: "#",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Handwriting Personality Analyzer",
    description: "Deep Learning application that analyzes handwriting patterns to predict personality characteristics.",
    tech: ["Python", "OpenCV", "torch", "Deep Learning","Streamlit"],
    category: "AI/ML",
    github: "https://github.com/Subhankarnandi777/handwriting_personality_ai",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Store-Sales-Forecasting-Demand-Analysis",
    description: "End-to-end sales forecasting project using XGBoost and Power BI to predict retail demand and generate business insights.",
    tech: ["Python", "Scikit-learn", "Power BI", " Matplotlib / Seaborn", "XGBoost"],
    category: "AI/ML",
    github: "https://github.com/Subhankarnandi777/Store-Sales-Forecasting-Demand-Analysis.",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Real-Time-Human-Detection-using-YOLOv8-for-Disaster-Management",
    description: "AI-assisted autonomous drone for disaster response, flood monitoring, victim detection, and medical kit delivery.",
    tech: ["YOLO", "Computer Vision", "Raspberry Pi", "Python", "GPS Navigation"],
    category: "AI/ML",
    github: "https://github.com/Subhankarnandi777/Real-Time-Human-Detection-using-YOLOv8-for-Disaster-Management",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "CyberGuardAI",
    description: "Multi-Agent Cybersecurity Incident Response Operations Hub",
    tech: ["Python", "Multi Agent", "FastAPI",],
    category: "AI/ML",
    github: "https://github.com/Subhankarnandi777/CyberGuardAI",
    image: "https://images.unsplash.com/photo-1620825937374-87fc1a620f8d?q=80&w=1974&auto=format&fit=crop"
  }
];

const categories = ["All", "Full Stack", "AI/ML", "Extension"];

export default function Projects() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const { openApp, addNotification } = useOSStore();

  const filteredProjects = allProjects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesTech = !selectedTech || p.tech.includes(selectedTech);
    return matchesSearch && matchesCategory && matchesTech;
  });

  const handleAskAI = (projectTitle: string) => {
    addNotification({
      title: 'AI Explainer Initializing',
      message: `Analyzing architecture for ${projectTitle}...`,
      type: 'info'
    });
    openApp('assistant');
  };

  return (
    <div className="flex flex-col h-full bg-[#050505] text-white overflow-hidden">
      {/* Header and Controls */}
      <div className="p-6 border-b border-white/10 shrink-0 bg-navy/40 backdrop-blur-md">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold text-cyan">Featured Projects</h2>
          
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search projects..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm focus:border-cyan/50 outline-none transition-colors"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
          <Filter className="w-4 h-4 text-gray-400 shrink-0" />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                activeCategory === cat ? 'bg-cyan text-navy font-semibold' : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
          {selectedTech && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-purple/20 border border-purple/30 text-purple rounded-full text-sm">
              <span>{selectedTech}</span>
              <button onClick={() => setSelectedTech(null)} className="hover:text-white font-bold ml-1">&times;</button>
            </div>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto p-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="h-full flex flex-col items-center justify-center text-gray-500"
            >
              <Search className="w-12 h-12 mb-4 opacity-20" />
              <p>No projects match your criteria.</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProjects.map((project, idx) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={project.title} 
                  className="bg-navy border border-cyan/20 rounded-xl overflow-hidden hover:-translate-y-2 transition-transform duration-300 group flex flex-col h-full shadow-lg"
                >
                  <div className="h-48 bg-linear-to-br from-black to-[#050505] relative overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
                      style={{ backgroundImage: `url('${project.image}')` }}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-navy to-transparent opacity-80" />
                    
                    <button 
                      onClick={() => handleAskAI(project.title)}
                      className="absolute top-3 right-3 bg-black/60 backdrop-blur-md border border-cyan/30 text-cyan text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-2 hover:bg-cyan hover:text-navy transition-colors opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300"
                    >
                      <Cpu size={14} /> Ask AI Explainer
                    </button>
                    
                    <button className="absolute inset-0 m-auto w-12 h-12 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 hover:bg-white/20 text-white">
                      <Play size={20} className="ml-1" />
                    </button>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col bg-linear-to-b from-navy to-[#050505]">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-gray-100 leading-tight">{project.title}</h3>
                    </div>
                    <p className="text-gray-400 text-sm mb-6 flex-1">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((t, i) => (
                        <button 
                          key={i} 
                          onClick={() => setSelectedTech(t)}
                          className="text-xs font-medium text-purple bg-purple/10 border border-purple/20 px-2.5 py-1 rounded hover:bg-purple/20 transition-colors"
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                    
                    <div className="flex gap-4 mt-auto pt-4 border-t border-white/10">
                      <a href={project.github} className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-cyan transition-colors">
                        <Code2 size={16} /> Source Code
                      </a>
                      <a href={project.live} className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-cyan transition-colors ml-auto">
                        <ExternalLink size={16} /> Live Demo
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
