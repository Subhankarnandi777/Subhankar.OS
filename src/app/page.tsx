'use client';
import { useEffect, useState } from 'react';
import { useOSStore } from '@/store/osStore';
import BootScreen from '@/components/BootScreen';
import Desktop from '@/components/Desktop';
import Taskbar from '@/components/Taskbar';
import Window from '@/components/Window';
import CommandPalette from '@/components/CommandPalette';
import NotificationCenter from '@/components/NotificationCenter';
import RecruiterMode from '@/components/RecruiterMode';
import MusicPlayer from '@/components/MusicPlayer';
import MobilePortfolio from '@/components/MobilePortfolio';

// Import apps
import About from '@/apps/About';
import Skills from '@/apps/Skills';
import Projects from '@/apps/Projects';
import Resume from '@/apps/Resume';
import TerminalApp from '@/apps/TerminalApp';
import AIAssistant from '@/apps/AIAssistant';
import Settings from '@/apps/Settings';
import Contact from '@/apps/Contact';
import Dashboard from '@/apps/Dashboard';
import GitHubApp from '@/apps/GitHub';
import CareerAdvisor from '@/apps/CareerAdvisor';
import Blog from '@/apps/Blog';

const appComponents = {
  about: About,
  skills: Skills,
  projects: Projects,
  resume: Resume,
  terminal: TerminalApp,
  assistant: AIAssistant,
  settings: Settings,
  contact: Contact,
  github: GitHubApp,
  dashboard: Dashboard,
  advisor: CareerAdvisor,
  blog: Blog,
};

export default function Home() {
  const { isBooted, openWindows, theme } = useOSStore();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    document.body.classList.remove('theme-terminal', 'theme-amber');
    if (theme === 'terminal') {
      document.body.classList.add('theme-terminal');
    } else if (theme === 'amber') {
      document.body.classList.add('theme-amber');
    }
  }, [theme]);

  // Mobile OS launcher on phones
  if (isMobile) return <MobilePortfolio />;

  if (!isBooted) {
    return <BootScreen />;
  }

  return (
    <main className="w-full h-screen overflow-hidden relative text-white">
      <Desktop>
        {openWindows.map(w => {
          const AppContent = appComponents[w.appId as keyof typeof appComponents];
          if (!AppContent) return null;
          
          return (
            <Window key={w.appId} appId={w.appId}>
              <AppContent />
            </Window>
          );
        })}
      </Desktop>
      <Taskbar />
      <CommandPalette />
      <NotificationCenter />
      <RecruiterMode />
      <MusicPlayer />
      {/* Global CRT Overlay for Terminal Themes */}
      {(theme === 'terminal' || theme === 'amber') && <div className="crt-overlay pointer-events-none fixed inset-0 z-99999" />}
    </main>
  );
}

