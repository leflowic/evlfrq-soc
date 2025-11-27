
import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, Play, Pause, MoreHorizontal, Download, Disc, Mic2, Layers } from 'lucide-react';
import { Post } from '../../types';
import { useApp } from '../../context/AppContext';
import { Waveform } from '../ui/Waveform';
import { VerificationBadge } from '../ui/VerificationBadge';

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { toggleLike, toggleSave, currentlyPlayingId, setCurrentlyPlayingId, viewProfile, viewPost, t } = useApp();
  const [copied, setCopied] = useState(false);
  const [isWaveHovered, setIsWaveHovered] = useState(false);

  const isPlaying = currentlyPlayingId === post.id;

  const handlePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) {
      setCurrentlyPlayingId(null);
    } else {
      setCurrentlyPlayingId(post.id);
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className="bg-surface border border-white/5 rounded-xl mb-6 overflow-hidden shadow-lg backdrop-blur-sm group transition-all duration-300 hover:scale-[1.01] hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_10px_40px_rgba(59,130,246,0.15)]">
      
      {/* Top Rack Bar (Metadata) */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#050505] border-b border-white/5">
        <div className="flex items-center space-x-3">
          <div 
             className="flex items-center space-x-2 cursor-pointer hover:bg-white/5 px-2 py-1 -ml-2 rounded-lg transition-colors"
             onClick={(e) => { e.stopPropagation(); viewProfile(post.userId); }}
          >
            <img src={post.user.avatarUrl} alt={post.user.username} className="w-6 h-6 rounded-full object-cover ring-2 ring-black" />
            <span className="text-sm font-bold text-slate-200 hover:text-white flex items-center gap-1.5 tracking-tight">
              {post.user.displayName}
              <VerificationBadge tier={post.user.verificationTier} size={14} />
            </span>
          </div>
          
          {/* Technical Separator */}
          <div className="h-4 w-px bg-white/10 mx-2"></div>

          <div className="hidden sm:flex space-x-3 text-[11px] font-medium text-blue-500/90 items-center">
             <span className="flex items-center bg-blue-500/5 px-2 py-0.5 rounded border border-blue-500/10"><Mic2 size={10} className="mr-1.5"/> {post.software || 'DAW'}</span>
             <span className="text-slate-500">{post.bpm} BPM</span>
             <span className="text-slate-500">{post.key}</span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
            <span className="text-[11px] text-slate-500 font-medium">{post.createdAt}</span>
            <button className="text-slate-500 hover:text-white transition-colors"><MoreHorizontal size={16}/></button>
        </div>
      </div>

      {/* Main Rack Unit (The visual core) */}
      <div className="flex flex-col sm:flex-row h-auto sm:h-44 bg-gradient-to-r from-[#0d0d0d] to-[#141414]">
        
        {/* Left: Artwork / Vinyl */}
        <div className="w-full sm:w-44 h-44 relative flex-shrink-0 border-r border-white/5 bg-black flex items-center justify-center overflow-hidden group/art">
           {/* Background blurred cover */}
           <img src={post.coverArtUrl} className="absolute inset-0 w-full h-full object-cover opacity-30 blur-sm transform group-hover/art:scale-110 transition-transform duration-700" alt="blur" />
           
           {/* Spinning Vinyl Effect */}
           <div className={`relative w-32 h-32 rounded-full shadow-2xl border-4 border-[#1a1a1a] flex items-center justify-center ${isPlaying ? 'animate-spin-slow' : 'transition-transform duration-700'}`} style={{ transform: isPlaying ? '' : 'rotate(0deg)' }}>
              <img src={post.coverArtUrl} className="w-full h-full rounded-full object-cover" alt="art" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/10 to-transparent pointer-events-none"></div>
              {/* Center hole */}
              <div className="absolute w-8 h-8 bg-[#111] rounded-full flex items-center justify-center border border-white/10">
                 <div className="w-2 h-2 bg-black rounded-full"></div>
              </div>
           </div>

           {/* Play Button Overlay */}
           <button 
             onClick={handlePlayPause}
             className="absolute inset-0 flex items-center justify-center z-10 hover:bg-black/20 transition-colors group/play"
           >
             <div className={`w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-lg group-hover/play:scale-110 transition-transform duration-200 ${isPlaying ? 'text-blue-500' : 'text-white'}`}>
                {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
             </div>
           </button>
        </div>

        {/* Center: Waveform & Info */}
        <div className="flex-1 flex flex-col justify-between p-5 relative">
            <div className="flex justify-between items-start mb-2">
               <div>
                  <h3 className="font-bold text-white text-xl leading-tight tracking-tight hover:text-blue-500 transition-colors cursor-pointer" onClick={() => viewPost(post.id)}>{post.title}</h3>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                     <span className="text-[10px] font-bold text-slate-300 bg-white/10 px-2 py-0.5 rounded uppercase tracking-wider">{post.genre}</span>
                     {post.hashtags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-[11px] text-blue-500/80 font-medium">{tag}</span>
                     ))}
                  </div>
               </div>
               {/* Simluated LED Meter */}
               <div className="flex space-x-0.5 h-4 items-end">
                  {[...Array(5)].map((_, i) => (
                      <div key={i} className={`w-1.5 rounded-sm ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-green-900/40'} ${i > 3 ? 'h-full bg-red-500' : 'h-[80%]'}`} style={{ animationDelay: `${i * 0.1}s`}}></div>
                  ))}
               </div>
            </div>

            {/* Visualizer */}
            <div 
               className="h-16 w-full flex items-center cursor-pointer group/wave my-2"
               onClick={handlePlayPause}
               onMouseEnter={() => setIsWaveHovered(true)}
               onMouseLeave={() => setIsWaveHovered(false)}
            >
               <Waveform 
                  isPlaying={isPlaying} 
                  height={56} 
                  color={isPlaying ? '#3B82F6' : (isWaveHovered ? '#71717a' : '#3f3f46')} 
               />
            </div>

            {/* Time */}
            <div className="flex justify-between text-[11px] font-mono text-slate-500 font-medium">
               <span className={isPlaying ? 'text-blue-500' : ''}>{isPlaying ? '0:24' : '0:00'}</span>
               <span>{Math.floor(post.audioDuration / 60)}:{String(post.audioDuration % 60).padStart(2, '0')}</span>
            </div>
        </div>

        {/* Right: Technical Controls (Desktop) */}
        <div className="hidden sm:flex flex-col justify-center items-center w-20 border-l border-white/5 bg-[#101010] space-y-4 py-2">
            {/* Download Stems */}
            <button className="flex flex-col items-center group/btn" title="Download Stems">
               <div className="w-9 h-9 rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-black flex items-center justify-center shadow-lg group-active/btn:translate-y-[1px] group-hover/btn:border-blue-500/30 transition-all">
                  <Download size={16} className="text-slate-400 group-hover/btn:text-blue-500" />
               </div>
               <span className="text-[9px] text-slate-500 mt-1.5 font-bold uppercase tracking-wider">{t('post_stems')}</span>
            </button>
            
            {/* Collab Request */}
            <button className="flex flex-col items-center group/btn" title="Request Collab">
               <div className="w-9 h-9 rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-black flex items-center justify-center shadow-lg group-active/btn:translate-y-[1px] group-hover/btn:border-purple-500/30 transition-all">
                  <Layers size={16} className="text-slate-400 group-hover/btn:text-purple-500" />
               </div>
               <span className="text-[9px] text-slate-500 mt-1.5 font-bold uppercase tracking-wider">{t('post_collab')}</span>
            </button>
        </div>
      </div>

      {/* Bottom Bar: Social Actions */}
      <div className="px-5 py-3 bg-surface flex items-center justify-between border-t border-white/5">
        <div className="flex items-center space-x-6">
           <button 
              onClick={(e) => { e.stopPropagation(); toggleLike(post.id); }}
              className="flex items-center space-x-2 group"
            >
              <Heart size={20} className={`transition-transform group-active:scale-90 ${post.likedByCurrentUser ? 'text-red-500 fill-red-500' : 'text-slate-400 group-hover:text-red-400'}`} />
              <span className={`text-sm font-bold ${post.likedByCurrentUser ? 'text-red-500' : 'text-slate-500'}`}>{post.likes}</span>
           </button>

           <button 
              onClick={() => viewPost(post.id)}
              className="flex items-center space-x-2 group"
            >
              <MessageCircle size={20} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
              <span className="text-sm font-bold text-slate-500">{post.commentsCount}</span>
           </button>

           <button onClick={handleShare} className="relative group">
              <Share2 size={20} className="text-slate-400 group-hover:text-green-400 transition-colors" />
              {copied && <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] bg-green-900/90 text-green-100 px-2 py-1 rounded shadow-lg whitespace-nowrap animate-fade-in-up">{t('post_copied')}</span>}
           </button>
        </div>

        <button 
            onClick={() => toggleSave(post.id)}
            className={`transition-transform active:scale-90 ${post.savedByCurrentUser ? 'text-amber-500' : 'text-slate-400 hover:text-amber-500'}`}
          >
            <Bookmark size={20} fill={post.savedByCurrentUser ? "currentColor" : "none"} />
        </button>
      </div>
      
      {/* Expanded Caption */}
      <div className="px-5 py-3 bg-[#0a0a0a] border-t border-white/5">
         <p className="text-sm text-slate-400 line-clamp-1 hover:line-clamp-none cursor-pointer transition-all">
            <span className="font-bold text-slate-200 mr-2 hover:underline" onClick={(e) => { e.stopPropagation(); viewProfile(post.userId); }}>{post.user.displayName}</span>
            {post.caption}
         </p>
      </div>

    </article>
  );
};