'use client';
import React, { useState } from 'react';
import { Send, Mail, Code2, Briefcase, MapPin, QrCode, Copy, Check, Phone } from 'lucide-react';

export default function Contact() {
  const [status, setStatus] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');
    setTimeout(() => {
      setStatus('Message sent successfully! Subhankar will get back to you soon.');
    }, 1500);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex h-full bg-[#050505] text-white overflow-hidden">
      <div className="flex-1 p-8 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-2 text-cyan">Get In Touch</h2>
        <p className="text-gray-400 mb-8 text-sm">Have a question or want to work together? Leave a message.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wider">Name</label>
            <input type="text" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-cyan/50 transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wider">Email</label>
            <input type="email" required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-cyan/50 transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wider">Message</label>
            <textarea required rows={4} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-cyan/50 transition-colors resize-none"></textarea>
          </div>
          <button type="submit" className="flex items-center justify-center gap-2 w-full py-2 bg-cyan text-navy font-semibold rounded-lg hover:bg-[#42b883] transition-colors">
            <Send size={16} /> Send Message
          </button>
          {status && (
            <p className="text-xs text-center mt-4 text-purple">{status}</p>
          )}
        </form>
      </div>

      <div className="w-1/3 bg-black/40 border-l border-white/10 p-8 flex flex-col justify-center gap-8 relative overflow-hidden">
        <div className="absolute top-[-50px] right-[-50px] w-[150px] h-[150px] bg-cyan/10 blur-[50px] pointer-events-none" />
        
        <div className="flex items-center justify-between group cursor-pointer bg-white/5 p-4 rounded-xl border border-white/10 hover:border-cyan/30 transition-colors" onClick={() => handleCopy('subhankarnandi2006@gmail.com')}>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <Mail size={18} className="text-cyan" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Email (Click to copy)</p>
              <p className="text-sm text-gray-300">subhankarnandi2006@gmail.com</p>
            </div>
          </div>
          {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} className="text-gray-500 group-hover:text-cyan transition-colors" />}
        </div>

        <div className="flex items-center justify-between group cursor-pointer bg-white/5 p-4 rounded-xl border border-white/10 hover:border-cyan/30 transition-colors" onClick={() => handleCopy('9433402977')}>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <Phone size={18} className="text-cyan" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Phone (Click to copy)</p>
              <p className="text-sm text-gray-300">+91 9433402977</p>
            </div>
          </div>
          {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} className="text-gray-500 group-hover:text-cyan transition-colors" />}
        </div>
        
        <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.open('https://github.com/Subhankarnandi777', '_blank')}>
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-cyan/20 transition-colors">
            <Code2 size={18} className="text-cyan" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">GitHub</p>
            <p className="text-sm text-gray-300">Subhankarnandi777</p>
          </div>
        </div>

        <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.open('https://www.linkedin.com/in/subhankar-nandi-/', '_blank')}>
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-cyan/20 transition-colors">
            <Briefcase size={18} className="text-cyan" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">LinkedIn</p>
            <p className="text-sm text-gray-300">in/subhankar-nandi-</p>
          </div>
        </div>

        <div className="flex items-center gap-4 group">
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-cyan/20 transition-colors">
            <MapPin size={18} className="text-cyan" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Location</p>
            <p className="text-sm text-gray-300">Earth</p>
          </div>
        </div>

        {/* vCard QR Code Simulation */}
        <div className="mt-4 pt-6 border-t border-white/10 flex flex-col items-center">
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-4">Scan to Save Contact</p>
          <div className="p-4 bg-white rounded-xl">
            <QrCode size={80} className="text-black" />
          </div>
        </div>
      </div>
    </div>
  );
}

