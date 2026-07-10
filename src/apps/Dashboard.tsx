'use client';
import React, { useState, useEffect } from 'react';
import { Activity, Users, Clock, Globe, ArrowUpRight, Cpu, MemoryStick } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const [visitors, setVisitors] = useState(1337);
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setUptime(prev => prev + 1);
      if (Math.random() > 0.7) {
        setVisitors(prev => prev + Math.floor(Math.random() * 3));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatUptime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const statCards = [
    { label: "Total Unique Visitors", value: visitors.toLocaleString(), icon: Users, color: "text-cyan", trend: "+12%" },
    { label: "Avg Session Duration", value: "4m 12s", icon: Clock, color: "text-purple", trend: "+5%" },
    { label: "Global Reach (Countries)", value: "34", icon: Globe, color: "text-blue-400", trend: "+2" },
    { label: "System Uptime", value: formatUptime(uptime + 86400 * 5), icon: Activity, color: "text-green-400", trend: "99.9%" }
  ];

  return (
    <div className="p-8 h-full bg-[#050505] text-white overflow-y-auto">
      <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-cyan flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6" /> System Dashboard
          </h2>
          <p className="text-gray-400 text-sm mt-1">Real-time analytics and performance metrics</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-gray-400 bg-white/5 px-3 py-1.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Live updates active
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg bg-white/5 ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-green-400 flex items-center gap-1 bg-green-400/10 px-2 py-1 rounded-full">
                {stat.trend} <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
            <h4 className="text-3xl font-bold mb-1 font-mono">{stat.value}</h4>
            <p className="text-sm text-gray-400 uppercase tracking-wider">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/5 border border-white/10 rounded-xl p-6"
        >
          <h3 className="text-lg font-bold text-gray-200 mb-6 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan" /> Core Performance
          </h3>
          <div className="space-y-6 font-mono text-sm">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">CPU Usage</span>
                <span className="text-cyan">34%</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-cyan w-[34%] rounded-full" />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Memory Allocation</span>
                <span className="text-purple">1.2GB / 4.0GB</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-purple w-[30%] rounded-full" />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Network Latency</span>
                <span className="text-green-400">24ms</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-green-400 w-[15%] rounded-full" />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/5 border border-white/10 rounded-xl p-6"
        >
          <h3 className="text-lg font-bold text-gray-200 mb-6 flex items-center gap-2">
            <MemoryStick className="w-5 h-5 text-purple" /> Recent Activity Log
          </h3>
          <div className="space-y-4 font-mono text-xs">
            {[
              { time: "10:42:05", event: "User interaction with Desktop UI", status: "OK" },
              { time: "10:41:12", event: "API Request: fetch(/api/github)", status: "OK" },
              { time: "10:35:50", event: "Terminal command executed: 'help'", status: "OK" },
              { time: "10:30:22", event: "Window maximized: Projects", status: "OK" },
              { time: "10:25:01", event: "System Boot Sequence Completed", status: "OK" }
            ].map((log, idx) => (
              <div key={idx} className="flex gap-4 p-3 rounded-lg bg-black/40 border border-white/5">
                <span className="text-gray-500 w-16 shrink-0">{log.time}</span>
                <span className="text-gray-300 flex-1 truncate">{log.event}</span>
                <span className="text-green-400 font-bold shrink-0">[{log.status}]</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Add LayoutDashboard icon locally for the file to prevent import issues if missing from lucide
function LayoutDashboard(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  );
}
