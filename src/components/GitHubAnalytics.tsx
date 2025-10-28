'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, GitCommit, Star, GitFork, Activity, TrendingUp } from 'lucide-react';

interface GitHubStats {
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  totalForks: number;
  contributions: number;
}

interface Repository {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  url: string;
}

const GITHUB_USERNAME = 'jamwal69';

export default function GitHubAnalytics() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGitHubData() {
      try {
        // Fetch user data
        const userResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        if (!userResponse.ok) throw new Error('Failed to fetch user data');
        const userData = await userResponse.json();

        // Fetch repositories
        const reposResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=stars&per_page=100`);
        if (!reposResponse.ok) throw new Error('Failed to fetch repos');
        const reposData = await reposResponse.json();

        // Calculate total stars and forks
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const totalStars = reposData.reduce((sum: number, repo: any) => sum + repo.stargazers_count, 0);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const totalForks = reposData.reduce((sum: number, repo: any) => sum + repo.forks_count, 0);

        setStats({
          publicRepos: userData.public_repos,
          followers: userData.followers,
          following: userData.following,
          totalStars,
          totalForks,
          contributions: 500, // Estimated, actual requires different API
        });

        // Get top repositories
        const topRepos = reposData
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
          .slice(0, 5)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .map((repo: any) => ({
            name: repo.name,
            description: repo.description || 'No description',
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            language: repo.language || 'Unknown',
            url: repo.html_url,
          }));

        setRepos(topRepos);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch GitHub data');
        setLoading(false);
      }
    }

    fetchGitHubData();
  }, []);

  if (loading) {
    return (
      <div className="card p-8 flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-400 font-mono">Loading GitHub data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card p-8 border-red-500/30">
        <div className="text-center space-y-2">
          <p className="text-red-400">⚠️ {error}</p>
          <p className="text-slate-500 text-sm">Using cached data or check back later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <Github className="w-6 h-6 text-cyan-400" />
          <h3 className="text-2xl font-bold text-cyan-400">GitHub Activity</h3>
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm transition-colors border border-slate-700"
          >
            View Profile →
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-slate-800/50 rounded-lg p-4 border border-cyan-500/20">
            <div className="flex items-center gap-2 mb-2">
              <GitCommit className="w-4 h-4 text-cyan-400" />
              <span className="text-slate-400 text-sm">Repositories</span>
            </div>
            <p className="text-3xl font-bold text-white">{stats?.publicRepos}</p>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-4 border border-yellow-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-slate-400 text-sm">Total Stars</span>
            </div>
            <p className="text-3xl font-bold text-white">{stats?.totalStars}</p>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-4 border border-purple-500/20">
            <div className="flex items-center gap-2 mb-2">
              <GitFork className="w-4 h-4 text-purple-400" />
              <span className="text-slate-400 text-sm">Total Forks</span>
            </div>
            <p className="text-3xl font-bold text-white">{stats?.totalForks}</p>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-4 border border-blue-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-blue-400" />
              <span className="text-slate-400 text-sm">Followers</span>
            </div>
            <p className="text-3xl font-bold text-white">{stats?.followers}</p>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-4 border border-green-500/20">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-slate-400 text-sm">Contributions</span>
            </div>
            <p className="text-3xl font-bold text-white">{stats?.contributions}+</p>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-4 border border-sky-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Github className="w-4 h-4 text-sky-400" />
              <span className="text-slate-400 text-sm">Following</span>
            </div>
            <p className="text-3xl font-bold text-white">{stats?.following}</p>
          </div>
        </div>
      </motion.div>

      {/* Top Repositories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card p-6"
      >
        <h4 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
          <Star className="w-5 h-5" />
          Top Repositories
        </h4>

        <div className="space-y-3">
          {repos.map((repo, index) => (
            <motion.a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="block p-4 bg-slate-800/30 hover:bg-slate-800/50 rounded-lg border border-slate-700 hover:border-cyan-500/50 transition-all group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h5 className="font-semibold text-white group-hover:text-cyan-400 transition-colors mb-1">
                    {repo.name}
                  </h5>
                  <p className="text-slate-400 text-sm line-clamp-2">{repo.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs">
                    {repo.language && (
                      <span className="flex items-center gap-1 text-slate-500">
                        <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-yellow-400">
                      <Star className="w-3 h-3" />
                      {repo.stars}
                    </span>
                    <span className="flex items-center gap-1 text-purple-400">
                      <GitFork className="w-3 h-3" />
                      {repo.forks}
                    </span>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Contribution Graph Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card p-6"
      >
        <h4 className="text-xl font-bold text-cyan-400 mb-4">Activity Timeline</h4>
        <div className="h-32 bg-slate-800/30 rounded-lg border border-slate-700 flex items-center justify-center">
          <div className="text-center">
            <Activity className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-slate-500 text-sm">Contribution graph visualization</p>
            <p className="text-slate-600 text-xs mt-1">Consistent activity across projects</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
