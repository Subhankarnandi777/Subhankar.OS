'use client';
import React, { useState } from 'react';
import { Monitor, Palette, Bell, Image as ImageIcon } from 'lucide-react';
import { useOSStore } from '@/store/osStore';

export default function Settings() {
  const { accentColor, setAccentColor, theme, setTheme, wallpaper, setWallpaper, isNotificationCenterOpen, toggleNotificationCenter } = useOSStore();
  const [activeTab, setActiveTab] = useState('personalization');

  const tabs = [
    { id: 'personalization', label: 'Personalization', icon: Palette },
    { id: 'display', label: 'Display', icon: Monitor },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];
  return (
    <div className="flex h-full text-white bg-navy/50">
      {/* Sidebar */}
      <div className="w-1/3 border-r border-white/10 p-4 space-y-2 bg-black/20">
        <h3 className="text-sm font-semibold text-gray-400 mb-4 px-2">Settings</h3>
        {tabs.map((tab) => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
              activeTab === tab.id ? 'bg-white/10 text-cyan' : 'hover:bg-white/5 text-gray-300'
            }`}
          >
            <tab.icon size={16} /> {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-8 capitalize">{activeTab}</h2>
        
        {activeTab === 'personalization' && (
          <div className="space-y-8">
          <section>
            <h4 className="text-sm font-semibold text-gray-400 mb-4">Accent Color</h4>
            <div className="flex gap-4">
              {['#64ffda', '#b39ddb', '#ff7b72', '#79c0ff'].map((color, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setAccentColor(color)}
                  className={`w-10 h-10 rounded-full border-2 ${accentColor === color ? 'border-white' : 'border-transparent'} hover:scale-110 transition-transform`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </section>

          <section>
            <h4 className="text-sm font-semibold text-gray-400 mb-4">Wallpaper</h4>
            <div className="flex gap-4">
              <button 
                onClick={() => setWallpaper('default')}
                className={`px-4 py-3 border rounded-lg text-sm font-medium transition-colors ${wallpaper === 'default' ? 'bg-white/10 border-cyan' : 'bg-white/5 border-white/10 hover:border-white/30'}`}
              >
                Nebula Default
              </button>
              <button 
                onClick={() => setWallpaper('minimal')}
                className={`px-4 py-3 border rounded-lg text-sm font-medium transition-colors ${wallpaper === 'minimal' ? 'bg-white/10 border-cyan' : 'bg-white/5 border-white/10 hover:border-white/30'}`}
              >
                Deep Black Minimal
              </button>
              <button 
                onClick={() => setWallpaper('ai_core')}
                className={`px-4 py-3 border rounded-lg text-sm font-medium transition-colors ${wallpaper === 'ai_core' ? 'bg-white/10 border-cyan' : 'bg-white/5 border-white/10 hover:border-white/30'}`}
              >
                AI Core Background
              </button>
            </div>
          </section>

          <section>
            <h4 className="text-sm font-semibold text-gray-400 mb-4">Theme Mode</h4>
            <div className="flex gap-4">
              <button 
                onClick={() => setTheme('dark')}
                className={`px-4 py-3 border rounded-lg text-sm font-medium transition-colors ${theme === 'dark' ? 'bg-white/10 border-cyan text-cyan' : 'bg-white/5 border-white/10 hover:border-white/30 text-white/80'}`}
              >
                Dark OS (Modern)
              </button>
              <button 
                onClick={() => setTheme('terminal')}
                className={`px-4 py-3 border rounded-lg text-sm font-medium transition-colors ${theme === 'terminal' ? 'bg-[#002200] border-[#00ff00] text-[#00ff00]' : 'bg-white/5 border-white/10 hover:border-white/30 text-white/80'}`}
              >
                Green Phosphor
              </button>
              <button 
                onClick={() => setTheme('amber')}
                className={`px-4 py-3 border rounded-lg text-sm font-medium transition-colors ${theme === 'amber' ? 'bg-[#332200] border-[#ffb000] text-[#ffb000]' : 'bg-white/5 border-white/10 hover:border-white/30 text-white/80'}`}
              >
                Amber Phosphor
              </button>
            </div>
          </section>

          <section>
            <h4 className="text-sm font-semibold text-gray-400 mb-4">Animations</h4>
            <div className="flex items-center gap-3">
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan"></div>
                <span className="ml-3 text-sm font-medium text-gray-300">Enable Window Animations</span>
              </label>
            </div>
          </section>
        </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-8">
            <section>
              <h4 className="text-sm font-semibold text-gray-400 mb-4">System Alerts</h4>
              <button 
                onClick={toggleNotificationCenter}
                className="px-6 py-3 bg-cyan text-navy font-semibold rounded-lg text-sm transition-transform hover:scale-105"
              >
                {isNotificationCenterOpen ? 'Close Notification Center' : 'Open Notification Center'}
              </button>
            </section>
          </div>
        )}

        {activeTab === 'display' && (
          <div className="text-gray-400">
            Display settings will automatically adjust to your connected neural interface.
          </div>
        )}
      </div>
    </div>
  );
}

