import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/Button';
import { ShieldAlert, Users, Trophy, Flag, Trash2, CheckCircle, AlertTriangle, Plus, Search, Play, StopCircle, SkipForward, BadgeCheck, BarChart, Server, Activity, MessageSquare, Zap, Star, Pin } from 'lucide-react';
import { Tournament, UserBadge } from '../types';

export const Admin: React.FC = () => {
  const { 
    currentUser, 
    allUsers, 
    posts,
    tournaments, 
    availableBadges,
    adminSetVerification, 
    adminBanUser, 
    adminDeletePost, 
    adminFeaturePost,
    adminCreateTournament,
    adminAdvanceTournament,
    adminAssignBadge,
    adminCreateBadge,
    adminBroadcastMessage,
    t 
  } = useApp();
  
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'tournaments' | 'content' | 'badges' | 'system'>('dashboard');
  const [tournamentForm, setTournamentForm] = useState({ title: '', prize: '' });
  const [userSearch, setUserSearch] = useState('');
  const [badgeForm, setBadgeForm] = useState({ name: '', description: '', icon: 'star', color: 'text-yellow-400' });
  const [broadcastText, setBroadcastText] = useState('');

  // Live Stats Simulation
  const [serverLoad, setServerLoad] = useState(24);
  useEffect(() => {
    const interval = setInterval(() => {
        setServerLoad(prev => Math.max(10, Math.min(90, prev + (Math.random() - 0.5) * 10)));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Security Check
  if (currentUser?.verificationTier !== 'staff') {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 font-mono">
        <ShieldAlert size={48} className="mb-4" />
        <h1 className="text-2xl font-bold">ACCESS DENIED: LEVEL 4 CLEARANCE REQUIRED</h1>
      </div>
    );
  }

  const handleCreateTournament = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tournamentForm.title) return;

    const newTournament: Tournament = {
        id: `t_${Date.now()}`,
        title: tournamentForm.title,
        status: 'registration',
        prizePool: tournamentForm.prize || 'Pride',
        entryFee: 'FREE',
        participantsCount: 0,
        maxParticipants: 16,
        startDate: 'Coming Soon',
        description: 'New official tournament.',
        coverImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=1000',
        rounds: []
    };
    adminCreateTournament(newTournament);
    setTournamentForm({ title: '', prize: '' });
  };

  const handleCreateBadge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!badgeForm.name) return;
    
    const newBadge: UserBadge = {
        id: `b_${Date.now()}`,
        type: 'custom',
        name: badgeForm.name,
        description: badgeForm.description,
        icon: badgeForm.icon,
        color: badgeForm.color
    };
    adminCreateBadge(newBadge);
    setBadgeForm({ name: '', description: '', icon: 'star', color: 'text-yellow-400' });
  };

  const handleBroadcast = () => {
    if (!broadcastText) return;
    adminBroadcastMessage(broadcastText, 'info');
    setBroadcastText('');
  };

  const filteredUsers = allUsers.filter(u => 
    u.username.toLowerCase().includes(userSearch.toLowerCase()) || 
    u.displayName.toLowerCase().includes(userSearch.toLowerCase())
  );

  return (
    <div className="max-w-[1600px] mx-auto pt-24 pb-24 px-6">
       <div className="flex items-center space-x-3 mb-8 border-b border-white/10 pb-4">
          <ShieldAlert className="text-red-500 animate-pulse" size={32} />
          <div>
              <h1 className="text-2xl font-bold text-white font-mono uppercase tracking-widest">{t('admin_title')}</h1>
              <p className="text-xs text-red-400 font-mono">AUTHORIZED PERSONNEL: {currentUser.username.toUpperCase()} // SESSION ACTIVE</p>
          </div>
       </div>

       <div className="flex flex-col xl:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full xl:w-64 space-y-2">
             <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded text-sm font-bold uppercase tracking-wider transition-all ${activeTab === 'dashboard' ? 'bg-red-900/20 text-red-500 border border-red-900/40' : 'text-slate-500 hover:text-white bg-surface border border-white/5'}`}>
                <Activity size={18} /> <span>{t('admin_tab_dashboard')}</span>
             </button>
             <button onClick={() => setActiveTab('users')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded text-sm font-bold uppercase tracking-wider transition-all ${activeTab === 'users' ? 'bg-red-900/20 text-red-500 border border-red-900/40' : 'text-slate-500 hover:text-white bg-surface border border-white/5'}`}>
                <Users size={18} /> <span>{t('admin_tab_users')}</span>
             </button>
             <button onClick={() => setActiveTab('tournaments')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded text-sm font-bold uppercase tracking-wider transition-all ${activeTab === 'tournaments' ? 'bg-red-900/20 text-red-500 border border-red-900/40' : 'text-slate-500 hover:text-white bg-surface border border-white/5'}`}>
                <Trophy size={18} /> <span>{t('admin_tab_tournaments')}</span>
             </button>
             <button onClick={() => setActiveTab('content')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded text-sm font-bold uppercase tracking-wider transition-all ${activeTab === 'content' ? 'bg-red-900/20 text-red-500 border border-red-900/40' : 'text-slate-500 hover:text-white bg-surface border border-white/5'}`}>
                <Flag size={18} /> <span>{t('admin_tab_content')}</span>
             </button>
             <button onClick={() => setActiveTab('badges')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded text-sm font-bold uppercase tracking-wider transition-all ${activeTab === 'badges' ? 'bg-red-900/20 text-red-500 border border-red-900/40' : 'text-slate-500 hover:text-white bg-surface border border-white/5'}`}>
                <BadgeCheck size={18} /> <span>{t('admin_tab_badges')}</span>
             </button>
             <button onClick={() => setActiveTab('system')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded text-sm font-bold uppercase tracking-wider transition-all ${activeTab === 'system' ? 'bg-red-900/20 text-red-500 border border-red-900/40' : 'text-slate-500 hover:text-white bg-surface border border-white/5'}`}>
                <Server size={18} /> <span>{t('admin_tab_system')}</span>
             </button>
          </div>

          {/* Main Panel */}
          <div className="flex-1 bg-surface border border-white/10 rounded-xl p-6 min-h-[600px]">
             
             {/* DASHBOARD TAB */}
             {activeTab === 'dashboard' && (
                <div className="space-y-6 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-[#050505] border border-white/10 p-6 rounded-xl relative overflow-hidden">
                            <h3 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">Active Users</h3>
                            <div className="text-4xl font-bold text-white">{allUsers.length * 142}</div>
                            <div className="absolute right-0 bottom-0 opacity-10 text-white"><Users size={100} /></div>
                        </div>
                        <div className="bg-[#050505] border border-white/10 p-6 rounded-xl relative overflow-hidden">
                            <h3 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">Total Posts</h3>
                            <div className="text-4xl font-bold text-white">{posts.length * 89}</div>
                            <div className="absolute right-0 bottom-0 opacity-10 text-white"><Flag size={100} /></div>
                        </div>
                        <div className="bg-[#050505] border border-white/10 p-6 rounded-xl relative overflow-hidden">
                            <h3 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">Server Load</h3>
                            <div className="text-4xl font-bold text-red-500 flex items-center gap-2">
                                {Math.floor(serverLoad)}% 
                                <span className={`w-3 h-3 rounded-full ${serverLoad > 80 ? 'bg-red-500' : 'bg-green-500'} animate-pulse`}></span>
                            </div>
                            <div className="w-full bg-slate-800 h-1 mt-4 rounded-full overflow-hidden">
                                <div className="h-full bg-red-500 transition-all duration-1000" style={{ width: `${serverLoad}%` }}></div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#050505] border border-white/10 p-6 rounded-xl">
                        <h3 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">Real-Time Traffic</h3>
                        <div className="flex items-end space-x-1 h-48">
                            {Array.from({length: 40}).map((_, i) => (
                                <div 
                                    key={i} 
                                    className="flex-1 bg-blue-600/20 rounded-t-sm transition-all duration-500" 
                                    style={{ height: `${Math.random() * 80 + 20}%` }}
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>
             )}

             {/* USERS TAB */}
             {activeTab === 'users' && (
                <div className="space-y-6 animate-fade-in">
                   <div className="flex justify-between items-center bg-black/20 p-4 rounded-lg border border-white/10">
                      <div className="relative flex-1">
                          <input 
                             type="text" 
                             placeholder="Search users by ID, username..." 
                             value={userSearch}
                             onChange={(e) => setUserSearch(e.target.value)}
                             className="w-full bg-[#050505] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:ring-1 focus:ring-red-500 outline-none" 
                          />
                          <Search size={16} className="absolute left-3 top-2.5 text-slate-500" />
                      </div>
                      <div className="ml-4 text-xs font-mono text-slate-500">
                          TOTAL: {allUsers.length}
                      </div>
                   </div>

                   <div className="overflow-x-auto border border-white/10 rounded-lg">
                      <table className="w-full text-left text-sm">
                         <thead className="text-xs text-slate-500 font-mono uppercase bg-white/5 border-b border-white/10">
                            <tr>
                               <th className="p-3">User</th>
                               <th className="p-3 text-center">Verification</th>
                               <th className="p-3 text-center">Badges</th>
                               <th className="p-3 text-right">Moderation</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-white/5">
                            {filteredUsers.map(user => (
                               <tr key={user.id} className="hover:bg-white/5 transition-colors">
                                  <td className="p-3">
                                     <div className="flex items-center gap-3">
                                        <img src={user.avatarUrl} className="w-10 h-10 rounded-lg bg-black border border-white/10" />
                                        <div>
                                           <div className="font-bold text-white flex items-center gap-1.5">
                                               {user.displayName}
                                               {user.isBanned && <span className="text-[9px] bg-red-600 text-white px-1.5 py-0.5 rounded font-bold">BANNED</span>}
                                           </div>
                                           <div className="font-mono text-xs text-slate-500">@{user.username}</div>
                                        </div>
                                     </div>
                                  </td>
                                  <td className="p-3">
                                     {/* SAME ICON DIFFERENT COLORS - USING CheckCircle for Ticks */}
                                     <div className="flex justify-center gap-2 bg-black/20 p-1.5 rounded-lg w-fit mx-auto border border-white/5">
                                       <button onClick={() => adminSetVerification(user.id, 'none')} className={`p-1.5 rounded transition-all ${user.verificationTier === 'none' ? 'bg-slate-700 text-white' : 'text-slate-600 hover:text-white'}`} title="None"><CheckCircle size={16}/></button>
                                       <button onClick={() => adminSetVerification(user.id, 'verified')} className={`p-1.5 rounded transition-all ${user.verificationTier === 'verified' ? 'bg-blue-600/20 text-blue-500 border border-blue-500/50' : 'text-slate-600 hover:text-blue-500'}`} title="Verified"><CheckCircle size={16}/></button>
                                       <button onClick={() => adminSetVerification(user.id, 'superstar')} className={`p-1.5 rounded transition-all ${user.verificationTier === 'superstar' ? 'bg-amber-500/20 text-amber-500 border border-amber-500/50' : 'text-slate-600 hover:text-amber-500'}`} title="Superstar"><CheckCircle size={16}/></button>
                                       <button onClick={() => adminSetVerification(user.id, 'staff')} className={`p-1.5 rounded transition-all ${user.verificationTier === 'staff' ? 'bg-red-600/20 text-red-500 border border-red-500/50' : 'text-slate-600 hover:text-red-500'}`} title="Staff"><CheckCircle size={16}/></button>
                                     </div>
                                  </td>
                                  <td className="p-3">
                                     <div className="flex justify-center flex-wrap gap-1 max-w-[150px] mx-auto">
                                       {Object.values(availableBadges).map(badge => (
                                           <button 
                                               key={badge.id}
                                               onClick={() => adminAssignBadge(user.id, badge.id)}
                                               className={`w-6 h-6 rounded flex items-center justify-center border transition-all ${user.badges?.includes(badge.id) ? 'bg-white/10 border-white/50 text-white' : 'border-transparent text-slate-700 hover:text-slate-400 hover:bg-white/5'}`}
                                               title={`Toggle ${badge.name}`}
                                           >
                                              <div className={`w-2 h-2 rounded-full ${user.badges?.includes(badge.id) ? 'bg-green-500 shadow-[0_0_5px_lime]' : 'bg-slate-800'}`}></div>
                                           </button>
                                       ))}
                                     </div>
                                  </td>
                                  <td className="p-3 text-right">
                                     {user.isBanned ? (
                                        <Button size="sm" onClick={() => adminBanUser(user.id, false)} className="bg-green-600 hover:bg-green-500 border-none h-8 text-xs w-24">UNBAN</Button>
                                     ) : (
                                        <Button size="sm" onClick={() => adminBanUser(user.id, true)} className="bg-red-900/50 text-red-500 border-red-900 hover:bg-red-600 hover:text-white h-8 text-xs w-24">BAN HAMMER</Button>
                                     )}
                                  </td>
                               </tr>
                            ))}
                         </tbody>
                      </table>
                   </div>
                </div>
             )}

             {/* BADGE FACTORY TAB */}
             {activeTab === 'badges' && (
                <div className="space-y-8 animate-fade-in">
                    <div className="bg-black/20 p-6 rounded-xl border border-white/10">
                        <h3 className="font-bold text-sm text-white uppercase tracking-wider mb-6 flex items-center gap-2"><Plus size={16} className="text-green-500"/> Badge Factory</h3>
                        <form onSubmit={handleCreateBadge} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="text-[10px] uppercase font-bold text-slate-500 mb-1 block">Badge Name</label>
                                <input value={badgeForm.name} onChange={e => setBadgeForm({...badgeForm, name: e.target.value})} className="w-full bg-[#050505] border border-white/10 rounded px-3 py-2 text-white outline-none focus:border-blue-500" placeholder="e.g. Code Wizard" />
                            </div>
                            <div>
                                <label className="text-[10px] uppercase font-bold text-slate-500 mb-1 block">Icon (Lucide)</label>
                                <select value={badgeForm.icon} onChange={e => setBadgeForm({...badgeForm, icon: e.target.value})} className="w-full bg-[#050505] border border-white/10 rounded px-3 py-2 text-white outline-none focus:border-blue-500">
                                    <option value="star">Star</option>
                                    <option value="zap">Zap</option>
                                    <option value="trophy">Trophy</option>
                                    <option value="flame">Flame</option>
                                    <option value="heart">Heart</option>
                                    <option value="music">Music</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-[10px] uppercase font-bold text-slate-500 mb-1 block">Description</label>
                                <input value={badgeForm.description} onChange={e => setBadgeForm({...badgeForm, description: e.target.value})} className="w-full bg-[#050505] border border-white/10 rounded px-3 py-2 text-white outline-none focus:border-blue-500" placeholder="e.g. 100 Commits" />
                            </div>
                            <div>
                                <label className="text-[10px] uppercase font-bold text-slate-500 mb-1 block">Color Class</label>
                                <input value={badgeForm.color} onChange={e => setBadgeForm({...badgeForm, color: e.target.value})} className="w-full bg-[#050505] border border-white/10 rounded px-3 py-2 text-white outline-none focus:border-blue-500" placeholder="text-red-500" />
                            </div>
                            <div className="md:col-span-2">
                                <Button type="submit" fullWidth className="bg-blue-600">Forge Badge</Button>
                            </div>
                        </form>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Object.values(availableBadges).map(badge => (
                            <div key={badge.id} className="bg-[#050505] border border-white/10 p-4 rounded-xl flex items-center gap-3">
                                <div className={`p-2 rounded-lg bg-white/5 ${badge.color}`}>
                                    <Star size={20} />
                                </div>
                                <div>
                                    <div className="font-bold text-white text-sm">{badge.name}</div>
                                    <div className="text-[10px] text-slate-500">{badge.description}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
             )}

             {/* SYSTEM TAB */}
             {activeTab === 'system' && (
                <div className="space-y-8 animate-fade-in">
                    <div className="bg-red-900/10 border border-red-900/30 p-6 rounded-xl">
                        <h3 className="font-bold text-sm text-red-500 uppercase tracking-wider mb-4 flex items-center gap-2"><Zap size={16}/> Emergency Broadcast System</h3>
                        <p className="text-xs text-slate-400 mb-4">This message will be displayed to ALL connected users immediately.</p>
                        <div className="flex gap-4">
                            <input 
                                value={broadcastText}
                                onChange={e => setBroadcastText(e.target.value)}
                                className="flex-1 bg-black border border-white/10 rounded px-4 py-2 text-white outline-none focus:border-red-500"
                                placeholder="TYPE ALERT MESSAGE..."
                            />
                            <Button onClick={handleBroadcast} className="bg-red-600 hover:bg-red-500 border-none">BROADCAST</Button>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-[#050505] border border-white/10 p-6 rounded-xl flex items-center justify-between">
                            <div>
                                <div className="font-bold text-white">Maintenance Mode</div>
                                <div className="text-xs text-slate-500">Lock all non-admin access.</div>
                            </div>
                            <div className="w-12 h-6 bg-slate-800 rounded-full relative cursor-pointer">
                                <div className="w-4 h-4 bg-slate-500 rounded-full absolute top-1 left-1"></div>
                            </div>
                        </div>
                        <div className="bg-[#050505] border border-white/10 p-6 rounded-xl flex items-center justify-between">
                            <div>
                                <div className="font-bold text-white">Registration Lock</div>
                                <div className="text-xs text-slate-500">Prevent new user signups.</div>
                            </div>
                            <div className="w-12 h-6 bg-slate-800 rounded-full relative cursor-pointer">
                                <div className="w-4 h-4 bg-slate-500 rounded-full absolute top-1 left-1"></div>
                            </div>
                        </div>
                    </div>
                </div>
             )}

             {/* TOURNAMENTS TAB */}
             {activeTab === 'tournaments' && (
                <div className="space-y-8 animate-fade-in">
                   {/* Create New */}
                   <div className="bg-black/20 p-5 rounded-xl border border-white/10">
                      <h3 className="font-bold text-sm text-white uppercase tracking-wider mb-4 flex items-center gap-2"><Plus size={16} className="text-green-500"/> {t('admin_create_tourn_title')}</h3>
                      <form onSubmit={handleCreateTournament} className="flex flex-col md:flex-row gap-4 items-end">
                         <div className="flex-1 w-full">
                            <label className="text-[10px] uppercase font-bold text-slate-500 mb-1 block">Tournament Title</label>
                            <input 
                                value={tournamentForm.title}
                                onChange={(e) => setTournamentForm({...tournamentForm, title: e.target.value})}
                                placeholder="e.g. Summer Smash 2025"
                                className="w-full bg-[#050505] border border-white/10 rounded px-3 py-2 text-white focus:ring-1 focus:ring-green-500 outline-none" 
                            />
                         </div>
                         <div className="w-full md:w-48">
                            <label className="text-[10px] uppercase font-bold text-slate-500 mb-1 block">Prize Pool</label>
                            <input 
                                value={tournamentForm.prize}
                                onChange={(e) => setTournamentForm({...tournamentForm, prize: e.target.value})}
                                placeholder="$1000 + VSTs"
                                className="w-full bg-[#050505] border border-white/10 rounded px-3 py-2 text-white focus:ring-1 focus:ring-green-500 outline-none" 
                            />
                         </div>
                         <Button type="submit" className="bg-green-600 hover:bg-green-500 border-green-500 text-white w-full md:w-auto">Initialize Event</Button>
                      </form>
                   </div>

                   {/* Active List */}
                   <div>
                      <h3 className="font-bold text-sm text-slate-500 uppercase tracking-wider mb-4">Active Operations</h3>
                      <div className="grid grid-cols-1 gap-4">
                        {tournaments.map(t => (
                           <div key={t.id} className="bg-surface p-0 rounded-lg border border-white/10 overflow-hidden flex flex-col md:flex-row">
                              <div className="w-full md:w-32 h-32 relative">
                                <img src={t.coverImage} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                    <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${t.status === 'active' ? 'bg-red-600 text-white animate-pulse' : t.status === 'completed' ? 'bg-slate-700 text-slate-400' : 'bg-green-600 text-white'}`}>
                                        {t.status}
                                    </div>
                                </div>
                              </div>
                              <div className="flex-1 p-4 flex flex-col justify-between">
                                 <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-bold text-lg text-white">{t.title}</h4>
                                        <div className="flex gap-4 text-xs font-mono text-slate-400 mt-1">
                                            <span className="flex items-center gap-1"><Users size={12}/> {t.participantsCount}/{t.maxParticipants}</span>
                                            <span className="flex items-center gap-1"><Trophy size={12}/> {t.prizePool}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs text-slate-500 font-mono">ROUND</div>
                                        <div className="font-bold text-blue-500">{t.rounds.length > 0 ? t.rounds[t.rounds.length-1].name : 'N/A'}</div>
                                    </div>
                                 </div>
                                 
                                 <div className="flex gap-3 mt-4 pt-4 border-t border-white/5">
                                    {t.status === 'registration' && (
                                        <Button size="sm" onClick={() => adminAdvanceTournament(t.id)} className="bg-green-600 hover:bg-green-500 border-none">
                                            <Play size={14} className="mr-2"/> START TOURNAMENT
                                        </Button>
                                    )}
                                    {t.status === 'active' && (
                                        <>
                                            <Button size="sm" onClick={() => adminAdvanceTournament(t.id)} className="bg-blue-600 hover:bg-blue-500 border-none">
                                                <SkipForward size={14} className="mr-2"/> ADVANCE ROUND
                                            </Button>
                                            <Button size="sm" onClick={() => adminAdvanceTournament(t.id)} variant="outline" className="border-red-900 text-red-500 hover:bg-red-900/20">
                                                <StopCircle size={14} className="mr-2"/> END EVENT
                                            </Button>
                                        </>
                                    )}
                                    {t.status === 'completed' && (
                                        <div className="text-xs text-slate-500 font-mono py-2">Event Concluded. Winner: <span className="text-yellow-500 font-bold">@beatwitch</span></div>
                                    )}
                                 </div>
                              </div>
                           </div>
                        ))}
                      </div>
                   </div>
                </div>
             )}

             {/* CONTENT TAB */}
             {activeTab === 'content' && (
                <div className="space-y-6 animate-fade-in">
                   <div className="flex items-center gap-3 bg-red-900/10 border border-red-900/30 p-4 rounded-xl">
                      <AlertTriangle size={24} className="text-red-500" />
                      <div>
                         <h3 className="font-bold text-white text-sm">Flagged Content Queue</h3>
                         <p className="text-xs text-slate-400">Review user reports. Actions are irreversible.</p>
                      </div>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {posts.slice(0, 6).map(post => (
                        <div key={post.id} className="flex bg-[#050505] border border-white/10 rounded-lg overflow-hidden group hover:border-white/20 transition-all">
                           <div className="w-24 h-full relative">
                                <img src={post.coverArtUrl} className="w-full h-full object-cover" />
                                <div className="absolute top-1 left-1 bg-black/60 text-white text-[9px] font-bold px-1.5 rounded">REPORTED</div>
                                {post.isFeatured && <div className="absolute bottom-1 left-1 bg-yellow-500 text-black text-[9px] font-bold px-1.5 rounded flex items-center gap-1"><Star size={8} fill="black"/> PINNED</div>}
                           </div>
                           <div className="flex-1 p-3 flex flex-col justify-between">
                               <div>
                                  <div className="flex justify-between items-start">
                                     <h4 className="font-bold text-sm text-white line-clamp-1">{post.title}</h4>
                                     <span className="text-[10px] text-slate-500">{post.createdAt}</span>
                                  </div>
                                  <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">by <span className="text-blue-400">@{post.user.username}</span></div>
                                  <p className="text-[11px] text-slate-500 mt-2 line-clamp-1 italic">"User Report: Copyright infringement..."</p>
                               </div>
                               
                               <div className="flex gap-2 mt-3">
                                  <button 
                                     onClick={() => adminDeletePost(post.id)}
                                     className="flex-1 bg-red-900/20 hover:bg-red-600 hover:text-white text-red-500 border border-red-900/30 rounded py-1.5 text-[10px] font-bold uppercase transition-colors flex items-center justify-center gap-1"
                                  >
                                     <Trash2 size={12} /> NUKE
                                  </button>
                                  <button 
                                    onClick={() => adminFeaturePost(post.id, !post.isFeatured)}
                                    className={`flex-1 border rounded py-1.5 text-[10px] font-bold uppercase transition-colors flex items-center justify-center gap-1 ${post.isFeatured ? 'bg-yellow-500/20 border-yellow-500 text-yellow-500' : 'bg-surface border-white/10 text-slate-400 hover:text-white'}`}
                                  >
                                     <Pin size={12} /> {post.isFeatured ? 'UNPIN' : 'FEATURE'}
                                  </button>
                               </div>
                           </div>
                        </div>
                     ))}
                   </div>
                </div>
             )}

          </div>
       </div>
    </div>
  );
};