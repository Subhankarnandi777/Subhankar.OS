'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello! I am Subhankar's AI Assistant. How can I help you learn more about his skills, projects, or experience?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const generateResponse = (query: string): string => {
    const q = query.toLowerCase();
    
    if (q.includes('about') || q.includes('yourself') || q.includes('who are you')) {
      return "I'm Subhankar Nandi, an AI Engineer and Full Stack Developer studying B.Tech CSE (AI & ML) at IEM Kolkata. I love building intelligent software that solves real-world problems!";
    }
    if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('language')) {
      return "Subhankar is skilled in languages like Python, C, C++, Java, and JavaScript. He works with libraries like YOLOv8, PyTorch, and OpenCV, and builds web apps with React, Node.js, HTML, and CSS.";
    }
    if (q.includes('project')) {
      return "He has built many projects including Real-Time Human Detection (YOLOv8), Handwriting Personality Analyzer, and E-Sehat (AI Telemedicine). You can check them out in the Projects section!";
    }
    if (q.includes('yolo') || q.includes('human')) {
      return "His Real-Time Human Detection project uses YOLOv8 to detect humans in real-time. It was built between Aug 2025 and Dec 2025.";
    }
    if (q.includes('handwriting') || q.includes('personality')) {
      return "The Handwriting Personality Analyzer is a Deep Learning application that analyzes handwriting patterns to predict personality characteristics. It was built using Python, OpenCV, and CNNs.";
    }
    if (q.includes('e-sehat') || q.includes('healthcare') || q.includes('telemedicine')) {
      return "E-Sehat is an AI-powered healthcare platform designed to improve access to telemedicine with intelligent symptom analysis and medicine management.";
    }
    if (q.includes('school') || q.includes('10th') || q.includes('12th')) {
      return "Subhankar attended Govt. Sponsored Multipurpose School - (Boy's) Taki House. He completed his Secondary Education (10th) in 2022 with 76.57% and Higher Secondary (12th) in 2024 with 80.8%.";
    }
    if (q.includes('education') || q.includes('degree') || q.includes('study')) {
      return "He is currently a B.Tech Computer Science & Engineering (AI & ML) student at the Institute of Engineering & Management (IEM), Kolkata (2024-2028). He previously completed his schooling under the WBCHSE and WBBSE boards.";
    }
    if (q.includes('intern') || q.includes('experience') || q.includes('work')) {
      return "He worked as a Winter Intern at the Innovation & Entrepreneurship Development Center at IEM Kolkata (Dec 2025 - Apr 2025), working on AI and ML projects.";
    }
    if (q.includes('cert') || q.includes('certification')) {
      return "He holds certifications in Advanced System Security (Univ. of Colorado), Information Theory (CUHK), Azure Fundamentals (Microsoft), and several Cyber Security and Machine Learning credentials.";
    }
    if (q.includes('achievement') || q.includes('award') || q.includes('extra')) {
      return "He secured 2nd Place at the Ureckon Innovation Challenge 2026! He also works as a Script Writer for his college's official drama club.";
    }
    if (q.includes('goal') || q.includes('objective') || q.includes('future') || q.includes('hire')) {
      return "His goal is to work as an AI Engineer or Full Stack Developer where he can build scalable AI solutions and solve meaningful real-world challenges.";
    }
    if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('github') || q.includes('linkedin')) {
      return "You can reach out to him via email at subhankarnandi2006@gmail.com, call him at +91 9433402977, or directly connect with him on LinkedIn (in/subhankarnandi) and GitHub (subhankarnandi).";
    }
    return "That's an interesting question! While I am a simulated AI for this portfolio, you can find most answers by exploring the different apps on this desktop, or by contacting Subhankar directly.";
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setIsTyping(true);
    
    setTimeout(() => {
      const response = generateResponse(userMsg);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  return (
    <div className="flex flex-col h-full bg-[#050505] text-white">
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              msg.role === 'user' ? 'bg-purple' : 'bg-cyan text-navy'
            }`}>
              {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div className={`max-w-[75%] p-3 rounded-2xl ${
              msg.role === 'user' 
                ? 'bg-white/10 text-white rounded-tr-none' 
                : 'bg-cyan/10 border border-cyan/20 text-gray-200 rounded-tl-none'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-cyan text-navy flex items-center justify-center shrink-0">
              <Bot size={16} />
            </div>
            <div className="bg-cyan/10 border border-cyan/20 p-3 rounded-2xl rounded-tl-none flex gap-1 items-center">
              <span className="w-2 h-2 bg-cyan/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-cyan/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-cyan/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-white/10 bg-black/40 backdrop-blur-md">
        <div className="flex gap-2 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about Subhankar..."
            className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm outline-none focus:border-cyan/50 transition-colors"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="w-10 h-10 rounded-full bg-cyan text-navy flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#42b883] transition-colors"
          >
            <Send size={16} className="ml-[-2px]" />
          </button>
        </div>
      </div>
    </div>
  );
}

