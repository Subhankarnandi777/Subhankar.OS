import { create } from 'zustand';

export type AppId = 'about' | 'projects' | 'skills' | 'resume' | 'experience' | 'certifications' | 'terminal' | 'assistant' | 'settings' | 'contact' | 'github' | 'linkedin' | 'music' | 'dashboard' | 'advisor' | 'blog';
export type Theme = 'dark' | 'terminal' | 'amber';

export interface WindowState {
  appId: AppId;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

export interface OSNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: number;
}

interface OSState {
  isBooted: boolean;
  setBooted: (val: boolean) => void;
  openWindows: WindowState[];
  activeAppId: AppId | null;
  highestZIndex: number;
  openApp: (id: AppId) => void;
  closeApp: (id: AppId) => void;
  minimizeApp: (id: AppId) => void;
  maximizeApp: (id: AppId) => void;
  focusApp: (id: AppId) => void;

  wallpaper: string;
  theme: string;
  accentColor: string;
  setWallpaper: (val: string) => void;
  setTheme: (val: string) => void;
  setAccentColor: (val: string) => void;

  isCommandPaletteOpen: boolean;
  toggleCommandPalette: () => void;

  isNotificationCenterOpen: boolean;
  toggleNotificationCenter: () => void;

  isRecruiterMode: boolean;
  toggleRecruiterMode: () => void;

  notifications: OSNotification[];
  addNotification: (notification: Omit<OSNotification, 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export const useOSStore = create<OSState>((set, get) => ({
  isBooted: false,
  setBooted: (val) => set({ isBooted: val }),
  openWindows: [],
  activeAppId: null,
  highestZIndex: 10,
  
  wallpaper: 'default',
  theme: 'dark',
  accentColor: '#64ffda',
  setWallpaper: (val) => set({ wallpaper: val }),
  setTheme: (val) => set({ theme: val }),
  setAccentColor: (val) => set({ accentColor: val }),

  isCommandPaletteOpen: false,
  toggleCommandPalette: () => set((state) => ({ isCommandPaletteOpen: !state.isCommandPaletteOpen })),

  isNotificationCenterOpen: false,
  toggleNotificationCenter: () => set((state) => ({ isNotificationCenterOpen: !state.isNotificationCenterOpen })),

  isRecruiterMode: false,
  toggleRecruiterMode: () => set((state) => ({ isRecruiterMode: !state.isRecruiterMode })),

  notifications: [],
  addNotification: (notification) => set((state) => ({
    notifications: [{
      ...notification,
      id: Math.random().toString(36).substring(2, 9),
      timestamp: Date.now()
    }, ...state.notifications]
  })),
  removeNotification: (id) => set((state) => ({
    notifications: state.notifications.filter(n => n.id !== id)
  })),
  clearNotifications: () => set({ notifications: [] }),
  
  openApp: (id) => {
    const { openWindows, highestZIndex } = get();
    const existingWindow = openWindows.find(w => w.appId === id);
    
    if (existingWindow) {
      if (existingWindow.isMinimized) {
        set({
          openWindows: openWindows.map(w => 
            w.appId === id ? { ...w, isMinimized: false, zIndex: highestZIndex + 1 } : w
          ),
          activeAppId: id,
          highestZIndex: highestZIndex + 1,
        });
      } else {
        get().focusApp(id);
      }
    } else {
      set({
        openWindows: [...openWindows, { appId: id, isMinimized: false, isMaximized: false, zIndex: highestZIndex + 1 }],
        activeAppId: id,
        highestZIndex: highestZIndex + 1,
      });
    }
  },
  
  closeApp: (id) => {
    const { openWindows, activeAppId } = get();
    const remaining = openWindows.filter(w => w.appId !== id);
    // Find the window with the highest zIndex among remaining windows that are not minimized
    const visibleWindows = remaining.filter(w => !w.isMinimized);
    const nextActive = visibleWindows.length > 0 
      ? visibleWindows.reduce((prev, current) => (prev.zIndex > current.zIndex) ? prev : current).appId 
      : null;

    set({
      openWindows: remaining,
      activeAppId: activeAppId === id ? nextActive : activeAppId,
    });
  },
  
  minimizeApp: (id) => {
    const { openWindows } = get();
    const remainingVisible = openWindows.filter(w => w.appId !== id && !w.isMinimized);
    const nextActive = remainingVisible.length > 0 
      ? remainingVisible.reduce((prev, current) => (prev.zIndex > current.zIndex) ? prev : current).appId 
      : null;

    set((state) => ({
      openWindows: state.openWindows.map(w => w.appId === id ? { ...w, isMinimized: true } : w),
      activeAppId: state.activeAppId === id ? nextActive : state.activeAppId
    }));
  },
  
  maximizeApp: (id) => {
    set((state) => ({
      openWindows: state.openWindows.map(w => w.appId === id ? { ...w, isMaximized: !w.isMaximized, zIndex: state.highestZIndex + 1 } : w),
      highestZIndex: state.highestZIndex + 1,
      activeAppId: id,
    }));
  },
  
  focusApp: (id) => {
    set((state) => ({
      openWindows: state.openWindows.map(w => w.appId === id ? { ...w, zIndex: state.highestZIndex + 1 } : w),
      highestZIndex: state.highestZIndex + 1,
      activeAppId: id,
    }));
  },
}));
