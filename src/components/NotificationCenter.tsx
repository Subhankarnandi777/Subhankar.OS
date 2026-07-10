'use client';
import React from 'react';
import { useOSStore } from '@/store/osStore';
import { Bell, X, Info, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NotificationCenter() {
  const { isNotificationCenterOpen, toggleNotificationCenter, notifications, removeNotification, clearNotifications } = useOSStore();

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="w-5 h-5 text-green-400" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'error': return <XCircle className="w-5 h-5 text-red-400" />;
      default: return <Info className="w-5 h-5 text-cyan" />;
    }
  };

  return (
    <AnimatePresence>
      {isNotificationCenterOpen && (
        <motion.div 
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed top-12 right-2 bottom-14 w-80 bg-navy/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl z-9000 flex flex-col overflow-hidden"
        >
          <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-white" />
              <h3 className="text-white font-medium">Notifications</h3>
            </div>
            <div className="flex items-center gap-2">
              {notifications.length > 0 && (
                <button onClick={clearNotifications} className="text-xs text-cyan hover:text-white transition-colors">
                  Clear All
                </button>
              )}
              <button onClick={toggleNotificationCenter} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {notifications.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-500 gap-3">
                <Bell className="w-8 h-8 opacity-20" />
                <p className="text-sm">No new notifications</p>
              </div>
            ) : (
              notifications.map((notif) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={notif.id}
                  className="bg-white/5 border border-white/10 rounded-xl p-3 relative group"
                >
                  <button 
                    onClick={() => removeNotification(notif.id)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="flex gap-3 items-start">
                    <div className="mt-0.5 shrink-0">
                      {getIcon(notif.type)}
                    </div>
                    <div>
                      <h4 className="text-white text-sm font-medium">{notif.title}</h4>
                      <p className="text-gray-400 text-xs mt-1 leading-relaxed">{notif.message}</p>
                      <span className="text-[10px] text-gray-500 mt-2 block">
                        {new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
