
import React from 'react';
import { Search, TrendingUp, Music } from 'lucide-react';
import { useApp } from '../context/AppContext';

const GENRES = ['Trap', 'R&B', 'Drill', 'House', 'Techno', 'Lo-Fi', 'Pop', 'Afrobeat'];

export const Discover: React.FC = () => {
  const { searchQuery, setSearchQuery, posts, viewPost, t } = useApp();

  // Simple filtering for demo purposes
  const filteredPosts = searchQuery 
    ? posts.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.hashtags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  return (
    <div className="max-w-4xl mx-auto pt-20 pb-24 px-4">
      {/* Search Header */}
      <div className="mb-8 animate-fade-in-up">
        <h1 className="text-3xl font-bold mb-4">{t('discover_title')}</h1>
        <div className="relative">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('discover_search_placeholder')} 
            className="w-full h-12 bg-surface border border-white/10 rounded-xl px-12 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xl transition-all"
            autoFocus={!!searchQuery}
          />
          <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
        </div>
      </div>

      {searchQuery ? (
        <div className="space-y-6">
           <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wide mb-4 animate-fade-in">{t('discover_results')}</h2>
           {filteredPosts.length > 0 ? (
             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
               {filteredPosts.map((post, index) => (
                 <div 
                   key={post.id} 
                   onClick={() => viewPost(post.id)}
                   className="relative aspect-square rounded-xl overflow-hidden bg-surface group cursor-pointer shadow-lg border border-white/5 animate-scale-in opacity-0 fill-mode-forwards"
                   style={{ animationDelay: `${index * 50}ms` }}
                 >
                    <img src={post.coverArtUrl} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                        <div className="text-center">
                           <h3 className="font-bold text-white text-sm">{post.title}</h3>
                           <p className="text-xs text-slate-300">@{post.user.username}</p>
                        </div>
                    </div>
                 </div>
               ))}
             </div>
           ) : (
             <div className="text-center py-12 text-slate-500 animate-fade-in">
               {t('discover_no_results')} "{searchQuery}"
             </div>
           )}
        </div>
      ) : (
        <>
          {/* Genres */}
          <div className="mb-8">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wide mb-4 animate-fade-in" style={{ animationDelay: '100ms' }}>{t('discover_genres')}</h2>
            <div className="flex flex-wrap gap-3">
              {GENRES.map((genre, i) => (
                <button 
                  key={genre} 
                  onClick={() => setSearchQuery(genre)}
                  className="px-6 py-2 bg-surface hover:bg-surface-highlight hover:border-blue-500/50 rounded-full border border-white/10 text-slate-300 hover:text-white transition-all font-medium text-sm animate-scale-in opacity-0 fill-mode-forwards"
                  style={{ animationDelay: `${i * 50 + 200}ms` }}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Trending Grid */}
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wide mb-4 flex items-center animate-fade-in" style={{ animationDelay: '400ms' }}>
            <TrendingUp size={16} className="mr-2 text-purple-400" />
            {t('discover_trending')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {posts.slice(0, 8).map((post, i) => (
              <div 
                key={post.id} 
                onClick={() => viewPost(post.id)}
                className="relative aspect-[4/5] rounded-xl overflow-hidden bg-surface group cursor-pointer shadow-lg border border-white/5 animate-fade-in-up opacity-0 fill-mode-forwards"
                style={{ animationDelay: `${i * 100 + 500}ms` }}
              >
                <img src={post.coverArtUrl} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                  <h3 className="font-bold text-white leading-tight truncate">{post.title}</h3>
                  <p className="text-xs text-slate-300">{post.user.displayName}</p>
                </div>
                <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-mono text-white border border-white/10">
                  {post.bpm} BPM
                </div>
              </div>
            ))}
          </div>

          {/* New Producers */}
          <div className="bg-gradient-to-r from-blue-900/10 to-purple-900/10 rounded-2xl p-6 border border-white/5 animate-fade-in-up opacity-0 fill-mode-forwards" style={{ animationDelay: '1s' }}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">{t('discover_producers')}</h2>
              <button className="text-sm text-blue-400 hover:underline">{t('discover_see_all')}</button>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((i, index) => (
                <div key={i} className="flex items-center justify-between animate-slide-in-right opacity-0 fill-mode-forwards" style={{ animationDelay: `${index * 100 + 1100}ms` }}>
                  <div className="flex items-center space-x-3">
                    <img src={`https://picsum.photos/id/${80 + i}/100/100`} className="w-12 h-12 rounded-full border border-white/10" alt="user" />
                    <div>
                      <h4 className="font-bold">SynthWizard_{i}</h4>
                      <p className="text-xs text-slate-400">London, UK</p>
                    </div>
                  </div>
                  <button className="px-4 py-1.5 bg-white text-black text-sm font-bold rounded-full hover:bg-slate-200 transition-colors">{t('discover_follow')}</button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};