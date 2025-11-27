import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Settings, List, Grid, Bookmark, Tag, MapPin, Link as LinkIcon, Play, MessageSquare, UserPlus, Check, MoreVertical, Heart, Image as ImageIcon, Trophy, Users } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { VerificationBadge } from '../components/ui/VerificationBadge';
import { ViewState } from '../types';

export const Profile: React.FC = () => {
  const { currentUser, selectedUser, posts, viewPost, setView, t } = useApp();
  const [isFollowing, setIsFollowing] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [activeTab, setActiveTab] = useState<'discography' | 'placements' | 'collabs'>('discography');
  
  const profileUser = selectedUser || currentUser;
  
  if (!profileUser) return null;

  const isOwnProfile = currentUser?.id === profileUser.id;
  const userPosts = posts.filter(p => p.userId === profileUser.id);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const handleEditProfile = () => {
    if (isOwnProfile) {
        setView(ViewState.DASHBOARD);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Tech-inspired Cover Image */}
      <div className="h-48 md:h-64 w-full bg-[#18181b] relative overflow-hidden group">
        <img src={profileUser.coverUrl} alt="Cover" className="w-full h-full object-cover opacity-60 mix-blend-overlay animate-scale-in origin-center" style={{ animationDuration: '10s' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative">
        {/* Profile Header Block */}
        <div className="flex flex-col md:flex-row items-end md:justify-between mb-8">
           <div className="flex items-end space-x-5">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg border-2 border-surface-highlight bg-black overflow-hidden shadow-2xl relative z-10 group animate-fade-in-up">
                <img src={profileUser.avatarUrl} alt="Profile" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="mb-2 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                 <h1 className="text-2xl md:text-3xl font-bold font-mono tracking-tighter text-white flex items-center gap-2">
                   {profileUser.displayName}
                   <VerificationBadge tier={profileUser.verificationTier} size={24} />
                 </h1>
                 <p className="text-blue-500 font-mono text-sm">@{profileUser.username}</p>
              </div>
           </div>

           <div className="flex items-center space-x-3 mt-4 md:mt-0 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
             {isOwnProfile ? (
                 <button 
                   onClick={handleEditProfile}
                   className="px-4 py-2 bg-surface hover:bg-surface-highlight border border-white/10 rounded text-xs font-mono uppercase tracking-widest transition-colors flex items-center gap-2 text-white"
                 >
                   <Settings size={14} />
                   {t('profile_edit')}
                 </button>
             ) : (
                 <>
                   <Button onClick={handleFollow} className={isFollowing ? 'bg-surface border border-white/10' : ''}>
                      {isFollowing ? t('profile_connected') : t('profile_connect')}
                   </Button>
                   <button 
                    onClick={() => setView(ViewState.MESSAGES)}
                    className="p-2.5 bg-surface hover:bg-surface-highlight border border-white/10 rounded transition-colors text-white"
                   >
                     <MessageSquare size={18} />
                   </button>
                 </>
             )}
             <button className="p-2.5 text-slate-400 hover:text-white transition-colors"><MoreVertical size={18}/></button>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
           {/* Left: Bio & Stats */}
           <div className="space-y-6 animate-slide-in-right opacity-0 fill-mode-forwards" style={{ animationDelay: '300ms' }}>
              <div className="bg-surface/50 border border-white/5 rounded p-4 backdrop-blur-sm">
                 <p className="text-slate-300 text-sm leading-relaxed font-light mb-4">{profileUser.bio}</p>
                 <div className="flex flex-col space-y-2 text-xs text-slate-500 font-mono">
                    <div className="flex items-center">
                        <MapPin size={12} className="mr-2 text-slate-400"/> 
                        {profileUser.location || 'Unknown Location'}
                    </div>
                    {profileUser.website && (
                        <div className="flex items-center hover:text-blue-400 cursor-pointer">
                            <LinkIcon size={12} className="mr-2 text-slate-400"/> 
                            {profileUser.website}
                        </div>
                    )}
                 </div>
              </div>
              
              <div className="flex justify-between border-y border-white/5 py-4 px-2">
                 <div className="text-center group cursor-pointer">
                    <div className="text-xl font-bold font-mono text-white group-hover:text-blue-500 transition-colors">{userPosts.length}</div>
                    <div className="text-[10px] uppercase tracking-widest text-slate-500">{t('profile_tracks')}</div>
                 </div>
                 <div className="text-center group cursor-pointer">
                    <div className="text-xl font-bold font-mono text-white group-hover:text-blue-500 transition-colors">{profileUser.followers.toLocaleString()}</div>
                    <div className="text-[10px] uppercase tracking-widest text-slate-500">{t('profile_followers')}</div>
                 </div>
                 <div className="text-center group cursor-pointer">
                    <div className="text-xl font-bold font-mono text-white group-hover:text-blue-500 transition-colors">{profileUser.following}</div>
                    <div className="text-[10px] uppercase tracking-widest text-slate-500">{t('profile_following')}</div>
                 </div>
              </div>

              {/* STUDIO GALLERY SECTION */}
              {profileUser.gallery && profileUser.gallery.length > 0 && (
                  <div className="bg-surface/50 border border-white/5 rounded p-4">
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                          <ImageIcon size={12} /> {t('profile_studio_gallery')}
                      </h3>
                      <div className="grid grid-cols-3 gap-2">
                          {profileUser.gallery.slice(0, 6).map((img, i) => (
                              <div key={i} className="aspect-square rounded overflow-hidden cursor-pointer hover:opacity-80 transition-opacity border border-white/10 group">
                                  <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                              </div>
                          ))}
                      </div>
                  </div>
              )}
           </div>

           {/* Right: Content Feed */}
           <div className="lg:col-span-2 animate-fade-in-up opacity-0 fill-mode-forwards" style={{ animationDelay: '400ms' }}>
              {/* Tabs */}
              <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-1">
                 <div className="flex space-x-6">
                    <button 
                        onClick={() => setActiveTab('discography')}
                        className={`text-sm font-medium pb-3 transition-colors border-b-2 ${activeTab === 'discography' ? 'text-white border-blue-500' : 'text-slate-500 border-transparent hover:text-white'}`}
                    >
                        {t('profile_tab_discog')}
                    </button>
                    <button 
                        onClick={() => setActiveTab('placements')}
                        className={`text-sm font-medium pb-3 transition-colors border-b-2 ${activeTab === 'placements' ? 'text-white border-blue-500' : 'text-slate-500 border-transparent hover:text-white'}`}
                    >
                        {t('profile_tab_placements')}
                    </button>
                    <button 
                        onClick={() => setActiveTab('collabs')}
                        className={`text-sm font-medium pb-3 transition-colors border-b-2 ${activeTab === 'collabs' ? 'text-white border-blue-500' : 'text-slate-500 border-transparent hover:text-white'}`}
                    >
                        {t('profile_tab_collabs')}
                    </button>
                 </div>
                 {activeTab === 'discography' && (
                    <div className="flex space-x-2">
                        <button onClick={() => setViewMode('list')} className={`p-1.5 rounded ${viewMode === 'list' ? 'text-white bg-white/10' : 'text-slate-500'}`}><List size={16}/></button>
                        <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded ${viewMode === 'grid' ? 'text-white bg-white/10' : 'text-slate-500'}`}><Grid size={16}/></button>
                    </div>
                 )}
              </div>

              {/* Content Views */}
              {activeTab === 'discography' && (
                  viewMode === 'list' ? (
                    <div className="space-y-2">
                    {userPosts.map((post, i) => (
                        <div 
                        key={post.id}
                        onClick={() => viewPost(post.id)} 
                        className="group flex items-center justify-between p-3 bg-surface hover:bg-surface-highlight border border-transparent hover:border-white/10 rounded transition-all cursor-pointer animate-fade-in-up opacity-0 fill-mode-forwards"
                        style={{ animationDelay: `${i * 50 + 500}ms` }}
                        >
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-black rounded relative overflow-hidden">
                                <img src={post.coverArtUrl} className="w-full h-full object-cover opacity-80 group-hover:opacity-100" />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40">
                                    <Play size={12} fill="white" className="text-white"/>
                                </div>
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-slate-200 group-hover:text-white font-mono">{post.title}</h4>
                                <div className="flex space-x-2 text-[10px] text-slate-500">
                                    <span>{post.bpm} BPM</span>
                                    <span>•</span>
                                    <span>{post.key}</span>
                                    <span>•</span>
                                    <span className="text-blue-500/80">{post.genre}</span>
                                </div>
                            </div>
                        </div>
                        
                        {/* Right Side Stats */}
                        <div className="flex items-center space-x-4 text-xs font-mono text-slate-500">
                            <div className="hidden sm:flex items-center space-x-1">
                                <Play size={10} /> <span>{Math.floor(post.likes * 1.5)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Heart size={10} /> <span>{post.likes}</span>
                            </div>
                            <div className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded border border-white/5">{post.createdAt}</div>
                        </div>
                        </div>
                    ))}
                    </div>
                ) : (
                    // Grid View
                    <div className="grid grid-cols-3 gap-2">
                    {userPosts.map((post, i) => (
                        <div 
                        key={post.id} 
                        onClick={() => viewPost(post.id)} 
                        className="aspect-square bg-surface relative group cursor-pointer border border-white/5 animate-scale-in opacity-0 fill-mode-forwards"
                        style={{ animationDelay: `${i * 50 + 500}ms` }}
                        >
                            <img src={post.coverArtUrl} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute bottom-2 left-2 text-xs font-bold font-mono text-white opacity-0 group-hover:opacity-100 drop-shadow-md">
                            {post.title}
                            </div>
                        </div>
                    ))}
                    </div>
                )
              )}

              {activeTab === 'placements' && (
                  <div className="flex flex-col items-center justify-center py-16 border border-dashed border-white/10 rounded-xl bg-surface/30 animate-fade-in-up">
                      <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/5">
                          <Trophy size={32} className="text-slate-600" />
                      </div>
                      <p className="text-slate-400 font-bold text-sm uppercase tracking-wide">No placements verified</p>
                      <p className="text-slate-600 text-xs mt-1 font-mono">Credits on major label releases will appear here.</p>
                  </div>
              )}

              {activeTab === 'collabs' && (
                  <div className="flex flex-col items-center justify-center py-16 border border-dashed border-white/10 rounded-xl bg-surface/30 animate-fade-in-up">
                      <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 border border-white/5">
                          <Users size={32} className="text-slate-600" />
                      </div>
                      <p className="text-slate-400 font-bold text-sm uppercase tracking-wide">No collaborations found</p>
                      <p className="text-slate-600 text-xs mt-1 font-mono">Connect with other producers to start collaborating.</p>
                  </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};