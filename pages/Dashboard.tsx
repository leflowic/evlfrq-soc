
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ViewState } from '../types';
import { Button } from '../components/ui/Button';
import { VerificationBadge } from '../components/ui/VerificationBadge';
import { Camera, Upload, BarChart, Settings, Image as ImageIcon, Trash2, Save, MapPin, Check, Heart, Users, Activity, Bell, Lock, Globe, Instagram, Music, User } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { currentUser, updateUserProfile, t, setView } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'studio' | 'settings'>('overview');
  
  // Local state for editing
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [location, setLocation] = useState(currentUser?.location || '');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!currentUser) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);
    setTimeout(() => {
        updateUserProfile({ displayName, bio, location });
        setIsSaving(false);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 2000);
    }, 1000);
  };

  const handleImageUpload = (type: 'avatar' | 'cover' | 'gallery', e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target?.result) {
            const url = event.target.result as string;
            
            if (type === 'gallery') {
                updateUserProfile({ gallery: [...(currentUser.gallery || []), url] });
            } else if (type === 'avatar') {
                updateUserProfile({ avatarUrl: url });
            } else if (type === 'cover') {
                updateUserProfile({ coverUrl: url });
            }
        }
      };
      
      reader.readAsDataURL(file);
    }
  };

  const removeGalleryImage = (index: number) => {
     const newGallery = [...(currentUser.gallery || [])];
     newGallery.splice(index, 1);
     updateUserProfile({ gallery: newGallery });
  };

  return (
    <div className="max-w-5xl mx-auto pt-20 pb-24 px-4">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-surface border border-white/5 rounded-2xl p-6 sticky top-24">
            <div className="flex items-center space-x-3 mb-8">
                <img src={currentUser.avatarUrl} className="w-12 h-12 rounded-lg object-cover" />
                <div>
                    <h2 className="font-bold text-sm text-white">{currentUser.displayName}</h2>
                    <VerificationBadge tier={currentUser.verificationTier} size={12} />
                    <p className="text-xs text-slate-500 font-mono">@{currentUser.username}</p>
                </div>
            </div>

            <nav className="space-y-2">
                <button 
                    onClick={() => setActiveTab('overview')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === 'overview' ? 'bg-blue-600/10 text-blue-500 border border-blue-600/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                >
                    <BarChart size={18} />
                    <span>{t('dash_tab_overview')}</span>
                </button>
                <button 
                    onClick={() => setActiveTab('studio')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === 'studio' ? 'bg-blue-600/10 text-blue-500 border border-blue-600/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                >
                    <ImageIcon size={18} />
                    <span>{t('dash_tab_studio')}</span>
                </button>
                <button 
                    onClick={() => setActiveTab('settings')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === 'settings' ? 'bg-blue-600/10 text-blue-500 border border-blue-600/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                >
                    <Settings size={18} />
                    <span>{t('dash_tab_settings')}</span>
                </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
            <h1 className="text-2xl font-bold font-mono uppercase tracking-tight mb-6">{t('dash_title')}</h1>

            {activeTab === 'overview' && (
                <div className="space-y-6">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-surface border border-white/5 p-6 rounded-2xl">
                            <div className="text-slate-500 text-xs font-mono uppercase tracking-widest mb-2">{t('dash_stats_plays')}</div>
                            <div className="text-2xl font-bold text-white">24.5k</div>
                            <div className="text-green-500 text-xs mt-1 flex items-center">▲ 12%</div>
                        </div>
                        <div className="bg-surface border border-white/5 p-6 rounded-2xl">
                            <div className="text-slate-500 text-xs font-mono uppercase tracking-widest mb-2">{t('dash_stats_downloads')}</div>
                            <div className="text-2xl font-bold text-white">842</div>
                            <div className="text-green-500 text-xs mt-1 flex items-center">▲ 5%</div>
                        </div>
                        <div className="bg-surface border border-white/5 p-6 rounded-2xl">
                            <div className="text-slate-500 text-xs font-mono uppercase tracking-widest mb-2">{t('dash_stats_followers')}</div>
                            <div className="text-2xl font-bold text-white">128</div>
                            <div className="text-green-500 text-xs mt-1 flex items-center">▲ 24%</div>
                        </div>
                        <div className="bg-surface border border-white/5 p-6 rounded-2xl">
                            <div className="text-slate-500 text-xs font-mono uppercase tracking-widest mb-2">{t('dash_stats_likes')}</div>
                            <div className="text-2xl font-bold text-white">3.2k</div>
                            <div className="text-green-500 text-xs mt-1 flex items-center">▲ 8%</div>
                        </div>
                    </div>

                    {/* Chart */}
                    <div className="bg-surface border border-white/5 p-6 rounded-2xl h-64 flex items-end justify-between gap-2">
                        {[40, 65, 30, 80, 55, 90, 70, 45, 60, 85, 50, 75, 60, 95, 80].map((h, i) => (
                            <div key={i} className="w-full bg-blue-600/20 hover:bg-blue-500 transition-colors rounded-t-sm relative group" style={{ height: `${h}%` }}>
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    {h * 10} Plays
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-surface border border-white/5 rounded-2xl p-6">
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                           <Activity size={16} className="text-blue-500"/> {t('dash_activity')}
                        </h3>
                        <div className="space-y-4">
                           <div className="flex items-center gap-4 p-3 hover:bg-white/5 rounded-lg transition-colors">
                              <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center"><Users size={16}/></div>
                              <div className="flex-1">
                                 <div className="text-sm text-white"><span className="font-bold">Sarah Synth</span> started following you.</div>
                                 <div className="text-xs text-slate-500">2 hours ago</div>
                              </div>
                           </div>
                           <div className="flex items-center gap-4 p-3 hover:bg-white/5 rounded-lg transition-colors">
                              <div className="w-8 h-8 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center"><Heart size={16}/></div>
                              <div className="flex-1">
                                 <div className="text-sm text-white">Your beat <span className="text-blue-400">Midnight Run</span> reached 1k plays!</div>
                                 <div className="text-xs text-slate-500">5 hours ago</div>
                              </div>
                           </div>
                           <div className="flex items-center gap-4 p-3 hover:bg-white/5 rounded-lg transition-colors">
                              <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center"><Upload size={16}/></div>
                              <div className="flex-1">
                                 <div className="text-sm text-white">Upload complete: <span className="font-mono text-xs">Project_V3_Final.mp3</span></div>
                                 <div className="text-xs text-slate-500">1 day ago</div>
                              </div>
                           </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'studio' && (
                <div className="bg-surface border border-white/5 rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold">{t('profile_studio_gallery')}</h2>
                        <label className="cursor-pointer bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors">
                            <Upload size={16} />
                            {t('dash_upload_gear')}
                            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload('gallery', e)} />
                        </label>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {currentUser.gallery && currentUser.gallery.length > 0 ? (
                            currentUser.gallery.map((img, index) => (
                                <div key={index} className="aspect-square relative group rounded-xl overflow-hidden border border-white/10">
                                    <img src={img} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <button 
                                            onClick={() => removeGalleryImage(index)}
                                            className="p-2 bg-red-500/80 text-white rounded-full hover:bg-red-500"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-12 text-center text-slate-500 border-2 border-dashed border-slate-800 rounded-xl">
                                <ImageIcon size={48} className="mx-auto mb-4 opacity-50" />
                                <p>Upload photos of your studio setup to show off your gear.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {activeTab === 'settings' && (
                <div className="space-y-8 animate-fade-in-up">
                    {/* Profile Information */}
                    <div className="bg-surface border border-white/5 rounded-2xl p-6">
                         <h3 className="font-bold text-white mb-6 text-sm uppercase tracking-wider flex items-center gap-2"><User size={16} className="text-blue-500"/> {t('dash_profile_info')}</h3>
                         <form onSubmit={handleSaveProfile} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-xs font-mono text-slate-500 uppercase mb-2">Cover Image</label>
                                    <div className="h-32 w-full rounded-xl bg-slate-900 overflow-hidden relative group border border-white/10">
                                        <img src={currentUser.coverUrl} className="w-full h-full object-cover opacity-60" />
                                        <label className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="bg-black/60 px-4 py-2 rounded-lg text-sm text-white flex items-center gap-2">
                                                <Camera size={16} /> Change
                                            </div>
                                            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload('cover', e)} />
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-mono text-slate-500 uppercase mb-2">Avatar</label>
                                    <div className="flex items-center gap-4">
                                        <div className="w-20 h-20 rounded-full bg-slate-900 overflow-hidden relative group border border-white/10">
                                            <img src={currentUser.avatarUrl} className="w-full h-full object-cover" />
                                            <label className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Camera size={20} className="text-white" />
                                                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload('avatar', e)} />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-mono text-slate-500 uppercase mb-1">{t('dash_name')}</label>
                                <input 
                                    type="text" 
                                    value={displayName} 
                                    onChange={e => setDisplayName(e.target.value)}
                                    className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-mono text-slate-500 uppercase mb-1">{t('dash_location')}</label>
                                <div className="relative">
                                    <MapPin size={16} className="absolute left-3 top-2.5 text-slate-500" />
                                    <input 
                                        type="text" 
                                        value={location} 
                                        onChange={e => setLocation(e.target.value)}
                                        className="w-full bg-[#050505] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-mono text-slate-500 uppercase mb-1">{t('dash_bio')}</label>
                                <textarea 
                                    value={bio} 
                                    onChange={e => setBio(e.target.value)}
                                    rows={4}
                                    className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                                />
                            </div>

                            <div className="pt-4 flex justify-end">
                                <Button 
                                  type="submit" 
                                  disabled={isSaving || saveSuccess}
                                  className={saveSuccess ? 'bg-green-600 border-green-500 hover:bg-green-600' : ''}
                                >
                                    {isSaving ? (
                                        <span className="animate-pulse">Saving...</span>
                                    ) : saveSuccess ? (
                                        <span className="flex items-center gap-2"><Check size={16} /> {t('dash_saved')}</span>
                                    ) : (
                                        <span className="flex items-center gap-2"><Save size={16} /> {t('dash_save_changes')}</span>
                                    )}
                                </Button>
                            </div>
                         </form>
                    </div>

                    {/* Social Links */}
                    <div className="bg-surface border border-white/5 rounded-2xl p-6">
                        <h3 className="font-bold text-white mb-6 text-sm uppercase tracking-wider flex items-center gap-2"><Globe size={16} className="text-purple-500"/> {t('dash_settings_social')}</h3>
                        <div className="space-y-4">
                            <div className="relative">
                                <Music size={16} className="absolute left-3 top-2.5 text-slate-500" />
                                <input type="text" placeholder="SoundCloud URL" className="w-full bg-[#050505] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-purple-500" />
                            </div>
                            <div className="relative">
                                <Instagram size={16} className="absolute left-3 top-2.5 text-slate-500" />
                                <input type="text" placeholder="Instagram Handle" className="w-full bg-[#050505] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-purple-500" />
                            </div>
                             <div className="relative">
                                <Globe size={16} className="absolute left-3 top-2.5 text-slate-500" />
                                <input type="text" placeholder="Personal Website" className="w-full bg-[#050505] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-purple-500" />
                            </div>
                        </div>
                    </div>

                    {/* Notifications & Security */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-surface border border-white/5 rounded-2xl p-6">
                            <h3 className="font-bold text-white mb-6 text-sm uppercase tracking-wider flex items-center gap-2"><Bell size={16} className="text-yellow-500"/> {t('dash_settings_notifications')}</h3>
                            <div className="space-y-4">
                                <label className="flex items-center justify-between cursor-pointer">
                                    <span className="text-sm text-slate-300">New Follower Alerts</span>
                                    <input type="checkbox" className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-blue-500" defaultChecked />
                                </label>
                                <label className="flex items-center justify-between cursor-pointer">
                                    <span className="text-sm text-slate-300">Comment Notifications</span>
                                    <input type="checkbox" className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-blue-500" defaultChecked />
                                </label>
                                <label className="flex items-center justify-between cursor-pointer">
                                    <span className="text-sm text-slate-300">Tournament Updates</span>
                                    <input type="checkbox" className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-blue-500" defaultChecked />
                                </label>
                                <label className="flex items-center justify-between cursor-pointer">
                                    <span className="text-sm text-slate-300">Marketing Emails</span>
                                    <input type="checkbox" className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-blue-500" />
                                </label>
                            </div>
                        </div>

                        <div className="bg-surface border border-white/5 rounded-2xl p-6">
                            <h3 className="font-bold text-white mb-6 text-sm uppercase tracking-wider flex items-center gap-2"><Lock size={16} className="text-red-500"/> {t('dash_settings_account')}</h3>
                            <div className="space-y-4">
                                <button className="w-full text-left px-4 py-3 bg-[#050505] hover:bg-white/5 border border-white/10 rounded-lg text-sm transition-colors flex justify-between items-center">
                                    Change Password
                                    <Settings size={14} className="text-slate-500"/>
                                </button>
                                <button className="w-full text-left px-4 py-3 bg-[#050505] hover:bg-white/5 border border-white/10 rounded-lg text-sm transition-colors flex justify-between items-center">
                                    Two-Factor Authentication
                                    <div className="text-[10px] bg-red-500/20 text-red-500 px-2 py-0.5 rounded uppercase font-bold">Disabled</div>
                                </button>
                                <div className="pt-2">
                                    <button className="text-xs text-red-500 hover:text-red-400 font-bold uppercase tracking-wider flex items-center gap-2">
                                        <Trash2 size={12}/> Delete Account
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};
