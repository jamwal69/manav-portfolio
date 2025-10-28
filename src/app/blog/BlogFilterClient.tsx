"use client";
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Calendar, Clock, Tag } from 'lucide-react';

interface Post { slug:string; title:string; date:string; summary?:string; tags?:string[]; readingMinutes:number }

export default function BlogFilterClient({ posts }:{ posts: Post[] }) {
  const [tag, setTag] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const allTags = useMemo(()=> Array.from(new Set(posts.flatMap(p=>p.tags||[]))).sort(), [posts]);
  
  const filtered = useMemo(() => {
    let result = posts;
    
    // Filter by tag
    if (tag) {
      result = result.filter(p => p.tags?.includes(tag));
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(query) ||
        (p.summary && p.summary.toLowerCase().includes(query)) ||
        (p.tags && p.tags.some(t => t.toLowerCase().includes(query)))
      );
    }
    
    return result;
  }, [posts, tag, searchQuery]);
  
  return (
    <div>
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles by title, content, or tags..."
            className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </div>
      </div>

      {/* Tag Filters */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Tag className="w-4 h-4 text-cyan-400" />
          <span className="text-sm text-slate-400 font-mono">Filter by tag:</span>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button 
            onClick={()=>setTag('')} 
            className={`px-4 py-2 rounded-lg text-sm font-mono border transition-all ${tag===''?'bg-cyan-600 text-white border-cyan-400 shadow-lg shadow-cyan-500/20':'border-cyan-500/30 text-cyan-300 hover:border-cyan-400/60 hover:bg-cyan-500/10'}`}
          >
            ALL ({posts.length})
          </button>
          {allTags.map(t=> {
            const count = posts.filter(p => p.tags?.includes(t)).length;
            return (
              <button 
                key={t} 
                onClick={()=>setTag(t)} 
                className={`px-4 py-2 rounded-lg text-sm font-mono border transition-all ${tag===t?'bg-cyan-600 text-white border-cyan-400 shadow-lg shadow-cyan-500/20':'border-cyan-500/30 text-cyan-300 hover:border-cyan-400/60 hover:bg-cyan-500/10'}`}
              >
                {t} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-slate-400 font-mono">
          Showing <span className="text-cyan-400 font-semibold">{filtered.length}</span> of <span className="text-cyan-400 font-semibold">{posts.length}</span> articles
        </p>
        {(tag || searchQuery) && (
          <button
            onClick={() => { setTag(''); setSearchQuery(''); }}
            className="text-sm text-cyan-400 hover:text-cyan-300 underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Posts List */}
      {filtered.length === 0 && (
        <div className="text-center py-12 border border-cyan-500/20 rounded-lg">
          <p className="text-slate-400 mb-2">No articles found matching your criteria</p>
          <button
            onClick={() => { setTag(''); setSearchQuery(''); }}
            className="text-cyan-400 hover:text-cyan-300 text-sm underline"
          >
            Clear all filters
          </button>
        </div>
      )}
      
      <ul className="space-y-6">
        {filtered.map(p => (
          <li key={p.slug} className="group border border-cyan-500/20 rounded-lg p-6 hover:border-cyan-400/50 hover:bg-cyan-500/5 transition-all">
            <Link href={`/blog/${p.slug}`} className="block">
              <h2 className="text-2xl font-bold text-cyan-300 mb-3 group-hover:text-cyan-200 transition-colors">
                {p.title}
              </h2>
              
              <div className="flex flex-wrap gap-4 mb-3 text-xs text-slate-400 font-mono">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {p.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {p.readingMinutes} min read
                </span>
              </div>
              
              {p.summary && (
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  {p.summary}
                </p>
              )}
              
              {p.tags && p.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {p.tags.map(t => (
                    <span 
                      key={t} 
                      className="px-3 py-1 bg-slate-800/60 border border-cyan-500/30 rounded-full text-cyan-300 text-xs uppercase tracking-wide hover:bg-cyan-500/10 hover:border-cyan-400/50 transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

