'use client';
import React, { useState, useEffect } from 'react';
import { Star, GitFork, BookOpen, Clock, GitCommit, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const GITHUB_USERNAME = 'Subhankarnandi777';

export default function GitHubApp() {
  const [profile, setProfile] = useState<any>(null);
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        // Fetch Profile
        const profileRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        if (!profileRes.ok) throw new Error('Failed to fetch profile');
        const profileData = await profileRes.json();
        
        // Fetch Repos
        const reposRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);
        if (!reposRes.ok) throw new Error('Failed to fetch repos');
        const reposData = await reposRes.json();
        
        setProfile(profileData);
        setRepos(reposData);
      } catch (error) {
        console.error("GitHub API limit reached or error. Using fallback data.", error);
        // Fallback data for rate limiting
        setProfile({
          name: "Subhankar Nandi",
          login: GITHUB_USERNAME,
          bio: "B.Tech CSE (AI & ML) Student passionate about intelligent applications.",
          avatar_url: "https://github.com/identicons/Subhankarnandi777.png",
          public_repos: 12,
          followers: 45,
          following: 10
        });
        setRepos([
          { id: 1, name: "ai-portfolio-os", description: "A futuristic AI Operating System portfolio built with Next.js", stargazers_count: 120, forks_count: 15, language: "TypeScript", updated_at: new Date().toISOString(), html_url: "#" },
          { id: 2, name: "expense-tracker-ml", description: "ML powered expense tracker with predictive analytics", stargazers_count: 45, forks_count: 8, language: "Python", updated_at: new Date().toISOString(), html_url: "#" },
          { id: 3, name: "vision-security", description: "YOLOv8 based computer vision security system", stargazers_count: 89, forks_count: 22, language: "Python", updated_at: new Date().toISOString(), html_url: "#" },
          { id: 4, name: "nextjs-dashboard", description: "Enterprise dashboard template", stargazers_count: 34, forks_count: 5, language: "TypeScript", updated_at: new Date().toISOString(), html_url: "#" }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  // Generate mock heatmap data (365 days)
  const heatmapData = Array.from({ length: 365 }, () => Math.floor(Math.random() * 5));

  const getHeatmapColor = (level: number) => {
    switch (level) {
      case 1: return 'bg-cyan/20';
      case 2: return 'bg-cyan/40';
      case 3: return 'bg-cyan/60';
      case 4: return 'bg-cyan/80';
      default: return 'bg-white/5';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full bg-[#050505] text-cyan">
        <Activity className="w-8 h-8 animate-spin" />
        <span className="ml-3 font-mono">Connecting to GitHub API...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#050505] text-white overflow-hidden">
      {/* Profile Header */}
      <div className="p-8 border-b border-white/10 bg-linear-to-r from-navy to-[#050505] shrink-0">
        <div className="flex items-center gap-6">
          <img 
            src={profile?.avatar_url} 
            alt="Profile" 
            className="w-24 h-24 rounded-full border-4 border-cyan/30 shadow-[0_0_20px_rgba(100,255,218,0.2)]"
          />
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-white mb-1">{profile?.name}</h2>
            <a href={`https://github.com/${profile?.login}`} target="_blank" rel="noreferrer" className="text-cyan font-mono mb-3 block hover:underline">
              @{profile?.login}
            </a>
            <p className="text-gray-400 max-w-2xl text-sm">{profile?.bio}</p>
          </div>
          <div className="flex gap-4">
            <div className="text-center bg-white/5 px-4 py-2 rounded-lg border border-white/10">
              <span className="block text-2xl font-bold text-white">{profile?.public_repos}</span>
              <span className="text-xs text-gray-500 uppercase tracking-wider">Repos</span>
            </div>
            <div className="text-center bg-white/5 px-4 py-2 rounded-lg border border-white/10">
              <span className="block text-2xl font-bold text-white">{profile?.followers}</span>
              <span className="text-xs text-gray-500 uppercase tracking-wider">Followers</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-8">
        
        {/* Heatmap Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <GitCommit className="w-5 h-5 text-purple" />
            <h3 className="text-lg font-bold text-gray-200">Contribution Activity</h3>
          </div>
          <div className="bg-white/5 border border-white/10 p-4 rounded-xl overflow-x-auto">
            <div className="flex gap-1 min-w-max" style={{ height: '100px' }}>
              {Array.from({ length: 52 }).map((_, col) => (
                <div key={col} className="flex flex-col gap-1">
                  {Array.from({ length: 7 }).map((_, row) => {
                    const dayIdx = col * 7 + row;
                    const level = dayIdx < 365 ? heatmapData[dayIdx] : 0;
                    return (
                      <motion.div 
                        key={row}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: (col + row) * 0.005 }}
                        className={`w-3 h-3 rounded-[2px] ${getHeatmapColor(level)} transition-colors hover:border hover:border-white`}
                        title={`Activity level: ${level}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2 font-mono">
              <span>Less</span>
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4].map(l => (
                  <div key={l} className={`w-3 h-3 rounded-[2px] ${getHeatmapColor(l)}`} />
                ))}
              </div>
              <span>More</span>
            </div>
          </div>
        </section>

        {/* Repositories */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-cyan" />
            <h3 className="text-lg font-bold text-gray-200">Pinned & Recent Repositories</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {repos.map((repo, idx) => (
              <motion.a 
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                key={repo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="block bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 hover:border-cyan/30 transition-all group"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-cyan font-bold text-lg group-hover:underline flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    {repo.name}
                  </h4>
                  <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full border border-white/10 text-gray-300">Public</span>
                </div>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2 h-10">{repo.description || "No description provided."}</p>
                
                <div className="flex items-center gap-4 text-xs font-mono text-gray-500">
                  {repo.language && (
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-purple"></span>
                      {repo.language}
                    </div>
                  )}
                  <div className="flex items-center gap-1 hover:text-cyan transition-colors">
                    <Star className="w-3.5 h-3.5" />
                    {repo.stargazers_count}
                  </div>
                  <div className="flex items-center gap-1 hover:text-cyan transition-colors">
                    <GitFork className="w-3.5 h-3.5" />
                    {repo.forks_count}
                  </div>
                  <div className="flex items-center gap-1 ml-auto">
                    <Clock className="w-3.5 h-3.5" />
                    {new Date(repo.updated_at).toLocaleDateString()}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
