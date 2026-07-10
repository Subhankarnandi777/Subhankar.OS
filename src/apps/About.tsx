'use client';
import React, { useState } from 'react';
import { ChevronDown, Download, ExternalLink, Code2, Send, Award, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Data Arrays
const skills = [
  { name: 'HTML', level: 90 },
  { name: 'CSS', level: 85 },
  { name: 'JavaScript', level: 85 },
  { name: 'Python', level: 90 },
  { name: 'React', level: 80 },
  { name: 'Node.js', level: 75 },
  { name: 'Machine Learning', level: 80 },
];

const education = [
  {
    institution: "Institute of Engineering & Management (IEM), Kolkata",
    degree: "B.Tech in Computer Science Engineering (AI & ML)",
    duration: "2024 - 2028",
    score: "CGPA: 8.51 / 10.0",
    description: "Currently pursuing a degree in Computer Science and Engineering with a specialization in Artificial Intelligence and Machine Learning."
  },
  {
    institution: "Govt. Sponsored Multipurpose School - (Boy's) Taki House",
    degree: "Higher Secondary (WBCHSE) - Class 12th",
    duration: "Mar 2024",
    score: "Score: 80.8%",
    description: "Successfully completed the Higher Secondary Examination under the West Bengal Council of Higher Secondary Education in 2024, achieving a score of 80.8%. This milestone demonstrates strong academic performance with focused interest in Science and Mathematics, forming the foundation for pursuing a degree in Computer Science and Engineering (AI & ML specialization)."
  },
  {
    institution: "Govt. Sponsored Multipurpose School - (Boy's) Taki House",
    degree: "Secondary Education (WBBSE) - Class 10th",
    duration: "Mar 2022",
    score: "Score: 76.57%",
    description: "Successfully completed the Secondary School Examination under the West Bengal Board of Secondary Education in 2022, achieving a score of 76.57%. This accomplishment reflects consistent academic performance and a solid foundation in core subjects, fostering an early interest in Science and Technology and paving the way for future studies in Computer Science and Engineering."
  }
];

const experience = [
  {
    company: "Innovation & Entrepreneurship Development Center, IEM Kolkata",
    role: "Winter Intern",
    duration: "Dec 2025 - Apr 2025",
    description: "Worked on AI & AIML projects, contributing to technology solutions in the department."
  }
];

const allProjects = [
  {
    title: "Real-Time Human Detection using YOLOv8",
    description: "Computer vision model for real-time human detection.",
    tech: ["YOLOv8", "Python", "OpenCV"],
    category: "AI/ML",
    github: "https://github.com/Subhankarnandi777",
    live: "#",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Handwriting Personality Analyzer",
    description: "Deep Learning application that analyzes handwriting patterns to predict personality characteristics.",
    tech: ["Python", "OpenCV", "CNN", "Deep Learning"],
    category: "AI/ML",
    github: "https://github.com/Subhankarnandi777",
    live: "#",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "E-Sehat – AI Telemedicine Platform",
    description: "AI-powered healthcare platform designed to improve access to telemedicine with intelligent symptom analysis.",
    tech: ["React Native", "Node.js", "OpenAI"],
    category: "Full Stack",
    github: "https://github.com/Subhankarnandi777",
    live: "#",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop"
  }
];

const certifications = [
  { title: "Advanced System Security Topics", issuer: "University of Colorado" },
  { title: "Information Theory", issuer: "Chinese University of Hong Kong" },
  { title: "Azure Fundamentals", issuer: "Microsoft" },
  { title: "Machine Learning Foundations: Statistics", issuer: "LinkedIn Learning" },
  { title: "Cyber Security Fundamentals", issuer: "Coursera" }
];

const categories = ["All", "Full Stack", "AI/ML"];

export default function About() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [status, setStatus] = useState('');

  const filteredProjects = allProjects.filter(p => activeCategory === 'All' || p.category === activeCategory);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');
    setTimeout(() => setStatus('Message sent successfully!'), 1500);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="h-full overflow-y-auto text-white bg-[#050505] scroll-smooth relative" id="about-container">
      {/* 1. Hero / Landing Section */}
      <div className="min-h-full flex flex-col items-center justify-center relative p-8 text-center border-b border-white/10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-cyan tracking-tight drop-shadow-[0_0_15px_rgba(0,255,255,0.3)]">Subhankar Nandi</h1>
          <h2 className="text-xl md:text-2xl text-purple mb-8 font-mono">AI Engineer • Full Stack Developer • ML Enthusiast</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg">
            Building intelligent systems and scalable web applications to solve real-world problems.
          </p>
          <button 
            onClick={() => scrollToSection('contact-section')}
            className="px-8 py-3 bg-cyan text-navy font-bold rounded-full hover:bg-[#42b883] transition-colors shadow-[0_0_15px_rgba(0,255,255,0.3)] hover:shadow-[0_0_25px_rgba(0,255,255,0.5)]"
          >
            Hire Me
          </button>
        </motion.div>
        
        <div 
          className="absolute bottom-10 animate-bounce cursor-pointer text-gray-500 hover:text-cyan transition-colors"
          onClick={() => scrollToSection('about-section')}
        >
          <ChevronDown size={32} />
        </div>
      </div>

      {/* 2. About Me */}
      <div id="about-section" className="py-20 px-8 max-w-5xl mx-auto border-b border-white/10">
        <h3 className="text-3xl font-bold mb-10 text-cyan flex items-center gap-4">
          <span className="w-8 h-[2px] bg-cyan"></span> About Me
        </h3>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6 text-gray-300 leading-relaxed">
            <p>
              Hello! I'm Subhankar Nandi, a B.Tech Computer Science & Engineering (AI & ML) student at the Institute of Engineering & Management (IEM), Kolkata. I previously completed my schooling at Govt. Sponsored Multipurpose School - (Boy's) Taki House.
            </p>
            <p>
              I enjoy building AI-powered applications, scalable backend systems, and modern web applications. My interests span Artificial Intelligence, Machine Learning, Computer Vision, NLP, Cloud Computing, DevOps, and Full Stack Development.
            </p>
            <p>
              I believe technology should solve real-world problems, and that's what drives every project I build.
            </p>
            
            <a 
              href="/Subhankar_Nandi_(CV).pdf" 
              download="Subhankar_Nandi_(CV).pdf"
              className="inline-flex items-center gap-2 px-6 py-2.5 mt-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white font-medium transition-all shadow-lg backdrop-blur-sm"
            >
              <Download size={18} /> Download CV
            </a>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-6 text-white">Technical Skills</h4>
            <div className="space-y-5">
              {skills.map(skill => (
                <div key={skill.name}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-gray-300">{skill.name}</span>
                    <span className="text-cyan font-mono">{skill.level}%</span>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-linear-to-r from-cyan to-purple rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2.5 Live GitHub Activity */}
      <div className="py-16 px-8 max-w-5xl mx-auto border-b border-white/10">
        <h3 className="text-2xl font-bold mb-8 text-cyan flex items-center gap-4">
          <Activity className="w-6 h-6 text-cyan" /> GitHub Contribution Activity
        </h3>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm overflow-x-auto shadow-lg">
          <div className="min-w-[800px]">
            <img 
              src="https://ghchart.rshah.org/00FFFF/Subhankarnandi777" 
              alt="Subhankar's Github Chart" 
              className="w-full h-auto opacity-90 hover:opacity-100 transition-opacity" 
            />
          </div>
        </div>
      </div>

      {/* 3. Education & Work Experience */}
      <div id="resume-section" className="py-20 px-8 max-w-5xl mx-auto border-b border-white/10">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Education */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-cyan flex items-center gap-4">
              <span className="w-6 h-[2px] bg-cyan"></span> Education
            </h3>
            <div className="space-y-8 border-l-2 border-white/10 pl-6 ml-3 relative">
              {education.map((edu, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute left-[-35px] top-1.5 w-4 h-4 rounded-full bg-navy border-2 border-cyan shadow-[0_0_10px_rgba(0,255,255,0.5)]" />
                  <h4 className="text-lg font-bold text-white">{edu.degree}</h4>
                  <div className="text-cyan text-sm font-mono mb-2">{edu.duration}</div>
                  <div className="text-gray-300 font-medium">{edu.institution}</div>
                  <div className="text-gray-400 text-sm mt-1">{edu.score}</div>
                  {edu.description && (
                    <p className="text-gray-400 text-sm mt-3 leading-relaxed border-l-2 border-cyan/30 pl-3">
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Work Experience */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-cyan flex items-center gap-4">
              <span className="w-6 h-[2px] bg-cyan"></span> Work Experience
            </h3>
            <div className="space-y-8 border-l-2 border-white/10 pl-6 ml-3 relative">
              {experience.map((exp, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute left-[-35px] top-1.5 w-4 h-4 rounded-full bg-navy border-2 border-purple shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                  <h4 className="text-lg font-bold text-white">{exp.role}</h4>
                  <div className="text-purple text-sm font-mono mb-2">{exp.duration}</div>
                  <div className="text-gray-300 font-medium">{exp.company}</div>
                  <p className="text-gray-400 text-sm mt-2">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications Gallery */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold mb-8 text-cyan flex items-center gap-4">
            <Award className="w-6 h-6 text-cyan" /> Certifications & Achievements
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {certifications.map((cert, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-white/5 border border-white/10 p-5 rounded-xl hover:border-cyan/50 transition-colors shadow-lg group cursor-pointer"
              >
                <Award className="w-6 h-6 text-purple mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="text-white font-bold text-sm mb-1 leading-snug">{cert.title}</h4>
                <p className="text-gray-400 text-xs font-mono">{cert.issuer}</p>
              </motion.div>
            ))}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-linear-to-br from-cyan/10 to-purple/10 border border-cyan/30 p-5 rounded-xl transition-colors shadow-lg col-span-1 sm:col-span-2 md:col-span-1 flex flex-col justify-center items-center text-center group cursor-pointer"
            >
              <Award className="w-8 h-8 text-cyan mb-2 group-hover:rotate-12 transition-transform" />
              <h4 className="text-white font-bold text-sm mb-1">2nd Place</h4>
              <p className="text-cyan text-xs font-mono">Ureckon Innovation Challenge 2026</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 4. Projects */}
      <div id="projects-section" className="py-20 px-8 max-w-5xl mx-auto border-b border-white/10">
        <h3 className="text-3xl font-bold mb-8 text-cyan flex items-center gap-4">
          <span className="w-8 h-[2px] bg-cyan"></span> Featured Projects
        </h3>
        
        <div className="flex gap-4 mb-10 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat ? 'bg-cyan text-navy shadow-[0_0_10px_rgba(0,255,255,0.4)]' : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={project.title} 
                className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-cyan/50 transition-colors group flex flex-col shadow-lg backdrop-blur-sm"
              >
                <div className="h-48 relative overflow-hidden bg-black/50">
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500"
                    style={{ backgroundImage: `url('${project.image}')` }}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#111111] to-transparent opacity-90" />
                </div>
                <div className="p-6 flex-1 flex flex-col relative z-10 -mt-10 bg-linear-to-b from-transparent to-[#111111]">
                  <h4 className="text-xl font-bold text-white mb-2">{project.title}</h4>
                  <p className="text-gray-400 text-sm mb-4 flex-1">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((t, i) => (
                      <span key={i} className="text-xs text-purple bg-purple/10 px-2 py-1 rounded border border-purple/20">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4 pt-4 border-t border-white/10">
                    <a href={project.github} className="flex items-center gap-2 text-sm text-gray-300 hover:text-cyan transition-colors">
                      <Code2 size={16} /> Source
                    </a>
                    <a href={project.live} className="flex items-center gap-2 text-sm text-gray-300 hover:text-cyan transition-colors ml-auto">
                      <ExternalLink size={16} /> Live
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* 5. Contact */}
      <div id="contact-section" className="py-20 px-8 max-w-3xl mx-auto pb-32">
        <h3 className="text-3xl font-bold mb-10 text-cyan flex items-center gap-4 justify-center text-center">
          <span className="w-8 h-[2px] bg-cyan"></span> Get In Touch <span className="w-8 h-[2px] bg-cyan"></span>
        </h3>
        
        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm shadow-xl relative overflow-hidden">
          <div className="absolute top-[-50px] right-[-50px] w-[150px] h-[150px] bg-cyan/10 blur-[50px] pointer-events-none" />
          <div className="absolute bottom-[-50px] left-[-50px] w-[150px] h-[150px] bg-purple/10 blur-[50px] pointer-events-none" />
          
          <form onSubmit={handleContactSubmit} className="space-y-5 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Name</label>
                <input type="text" required className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm outline-none focus:border-cyan/50 focus:bg-white/5 transition-all" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Email</label>
                <input type="email" required className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm outline-none focus:border-cyan/50 focus:bg-white/5 transition-all" placeholder="john@example.com" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Subject</label>
              <input type="text" required className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm outline-none focus:border-cyan/50 focus:bg-white/5 transition-all" placeholder="Job Opportunity" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Message</label>
              <textarea required rows={5} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm outline-none focus:border-cyan/50 focus:bg-white/5 transition-all resize-none" placeholder="Hello Subhankar..."></textarea>
            </div>
            <button type="submit" className="w-full py-4 bg-cyan text-navy font-bold rounded-lg hover:bg-[#42b883] transition-colors flex items-center justify-center gap-2 mt-4 text-lg shadow-[0_0_15px_rgba(0,255,255,0.2)] hover:shadow-[0_0_25px_rgba(0,255,255,0.4)]">
              <Send size={20} /> Send Message
            </button>
            {status && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mt-4 text-green-400 font-medium">
                {status}
              </motion.p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
