
import React, { useState, useEffect, useRef } from 'react';
import { Home, Compass, PlusSquare, Heart, User, Search, LogOut, MessageSquare, Mic2, Globe, Loader2, LayoutDashboard, Trophy, ShieldAlert, Settings, ChevronDown, Menu, X, AlertTriangle, CheckCircle, Info, Gamepad2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ViewState } from '../../types';
import { VerificationBadge } from '../ui/VerificationBadge';

export const Navbar: React.FC = () => {
  const { view, setView, currentUser, notifications, logout, searchQuery, setSearchQuery, viewProfile, t, language, setLanguage, systemMessage, adminClearBroadcast } = useApp();
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [isSearching, setIsSearching] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sync local state
  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  // Debounce logic
  useEffect(() => {
    if (localSearch === searchQuery) return;

    setIsSearching(true);
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      setSearchQuery(localSearch);
      if (localSearch.trim().length > 0 && view !== ViewState.EXPLORE) {
        setView(ViewState.EXPLORE);
      }
      setIsSearching(false);
    }, 500);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [localSearch, setSearchQuery, setView, view, searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setSearchQuery(localSearch);
    setIsSearching(false);
    setView(ViewState.EXPLORE);
  };
  
  const handleNavigation = (targetView: ViewState) => {
    setView(targetView);
    setIsProfileMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'sr' : 'en');
  };

  // System Message Icon
  const getSystemIcon = (type: string) => {
    switch (type) {
        case 'error': return <AlertTriangle size={16} />;
        case 'success': return <CheckCircle size={16} />;
        case 'warning': return <AlertTriangle size={16} />;
        default: return <Info size={16} />;
    }
  };

  // System Message Color
  const getSystemColor = (type: string) => {
    switch (type) {
        case 'error': return 'bg-red-600';
        case 'success': return 'bg-green-600';
        case 'warning': return 'bg-amber-600';
        default: return 'bg-blue-600';
    }
  };

  return (
    <>
      {/* System Broadcast Bar */}
      {systemMessage && systemMessage.active && (
        <div className={`fixed top-0 inset-x-0 z-[60] ${getSystemColor(systemMessage.type)} text-white px-4 py-2 flex items-center justify-between text-xs font-bold uppercase tracking-widest animate-slide-in-right`}>
            <div className="flex items-center gap-2">
                {getSystemIcon(systemMessage.type)}
                <span>SYSTEM BROADCAST: {systemMessage.text}</span>
            </div>
            <button onClick={adminClearBroadcast}><X size={16}/></button>
        </div>
      )}

      {/* Desktop Navbar */}
      <nav className={`fixed ${systemMessage ? 'top-8' : 'top-0'} inset-x-0 z-50 bg-[#09090b]/80 backdrop-blur-xl border-b border-white/5 h-16 hidden md:flex items-center justify-between px-6 transition-all duration-300`}>
        
        {/* Left: Logo & Main Links */}
        <div className="flex items-center space-x-8">
            <div 
              className="flex items-center cursor-pointer group select-none"
              onClick={() => handleNavigation(ViewState.FEED)}
            >
              <img 
                src="/assets/logo-white.png" 
                alt="EVLFRQ" 
                className="h-10 w-auto group-hover:opacity-80 transition-opacity"
              />
            </div>

            <div className="h-6 w-px bg-white/10"></div>

            <div className="flex items-center space-x-1">
                <NavButton active={view === ViewState.FEED} onClick={() => handleNavigation(ViewState.FEED)} icon={<Home size={16}/>} label={t('nav_feed')} />
                <NavButton active={view === ViewState.EXPLORE} onClick={() => handleNavigation(ViewState.EXPLORE)} icon={<Compass size={16}/>} label={t('nav_discover')} />
                <NavButton active={view === ViewState.TOURNAMENTS} onClick={() => handleNavigation(ViewState.TOURNAMENTS)} icon={<Trophy size={16}/>} label={t('nav_tournaments')} />
                <NavButton active={view === ViewState.GAME} onClick={() => handleNavigation(ViewState.GAME)} icon={<Gamepad2 size={16}/>} label={t('nav_game')} />
            </div>
        </div>

        {/* Center: Search */}
        <div className="flex-1 max-w-md px-8">
          <form onSubmit={handleSearch} className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {isSearching ? (
                <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />
              ) : (
                <Search className="h-4 w-4 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
              )}
            </div>
            <input 
              type="text" 
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder={t('nav_search_placeholder')} 
              className="w-full bg-surface border border-white/5 rounded-full py-2 pl-10 pr-4 text-sm font-medium text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 focus:bg-surface-highlight transition-all"
            />
          </form>
        </div>

        {/* Right: Actions & Profile */}
        <div className="flex items-center space-x-4">
          <button 
             onClick={() => handleNavigation(ViewState.UPLOAD)} 
             className="flex items-center space-x-2 bg-white text-black hover:bg-blue-500 hover:text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all transform active:scale-95"
          >
             <Mic2 size={14} />
             <span>{t('nav_upload')}</span>
          </button>

          <div className="h-6 w-px bg-white/10 mx-2"></div>

          <button onClick={() => handleNavigation(ViewState.MESSAGES)} className={`p-2 rounded-full transition-colors ${view === ViewState.MESSAGES ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
              <MessageSquare size={20} />
          </button>
          
          <button onClick={() => handleNavigation(ViewState.NOTIFICATIONS)} className={`p-2 rounded-full relative transition-colors ${view === ViewState.NOTIFICATIONS ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
              <Heart size={20} />
              {unreadCount > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full shadow-[0_0_5px_rgba(239,68,68,0.5)]"></span>}
          </button>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileMenuRef}>
            <button 
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className={`flex items-center space-x-2 pl-1 pr-2 py-1 rounded-full border transition-all ${isProfileMenuOpen ? 'border-blue-500/50 bg-white/5' : 'border-transparent hover:bg-white/5'}`}
            >
                <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10 relative">
                    <img src={currentUser?.avatarUrl} alt="Me" className="w-full h-full object-cover" />
                </div>
                <ChevronDown size={12} className={`text-slate-500 transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {isProfileMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-[#121212] border border-white/10 rounded-xl shadow-2xl py-2 animate-in fade-in slide-in-from-top-2 overflow-hidden">
                <div className="px-4 py-3 border-b border-white/5 mb-1">
                  <p className="text-white font-bold text-sm truncate">{currentUser?.displayName}</p>
                  <p className="text-xs text-slate-500 font-mono truncate">@{currentUser?.username}</p>
                </div>
                
                <DropdownItem icon={<User size={16}/>} label={t('nav_profile')} onClick={() => { if(currentUser) viewProfile(currentUser.id); setIsProfileMenuOpen(false); }} />
                <DropdownItem icon={<LayoutDashboard size={16}/>} label={t('nav_dashboard')} onClick={() => handleNavigation(ViewState.DASHBOARD)} />
                <DropdownItem icon={<Settings size={16}/>} label="Settings" onClick={() => handleNavigation(ViewState.DASHBOARD)} />
                
                {currentUser?.verificationTier === 'staff' && (
                  <>
                    <div className="my-1 border-t border-white/5"></div>
                    <DropdownItem icon={<ShieldAlert size={16} className="text-red-500"/>} label={t('nav_admin')} onClick={() => handleNavigation(ViewState.ADMIN)} className="text-red-400 hover:text-red-300" />
                  </>
                )}
                
                <div className="my-1 border-t border-white/5"></div>
                <DropdownItem icon={<Globe size={16}/>} label={`Language: ${language.toUpperCase()}`} onClick={toggleLanguage} />
                <DropdownItem icon={<LogOut size={16}/>} label="Log Out" onClick={logout} />
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Top Bar */}
      <div className={`fixed ${systemMessage ? 'top-8' : 'top-0'} inset-x-0 z-50 bg-[#09090b]/95 border-b border-white/10 h-16 flex md:hidden items-center justify-between px-4 backdrop-blur-md transition-all`}>
         <div className="flex items-center" onClick={() => handleNavigation(ViewState.FEED)}>
            <img 
              src="/assets/logo-white.png" 
              alt="EVLFRQ" 
              className="h-8 w-auto"
            />
         </div>
         <div className="flex items-center space-x-4">
            <button onClick={() => handleNavigation(ViewState.UPLOAD)} className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black">
                <PlusSquare size={18} />
            </button>
            <button onClick={() => setIsMobileMenuOpen(true)} className="text-slate-300">
                <Menu size={24} />
            </button>
         </div>
      </div>

      {/* Mobile Full Screen Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-[#09090b] flex flex-col p-6 animate-in slide-in-from-right">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-white">Menu</h2>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-white/10 rounded-full"><X size={24}/></button>
            </div>
            
            <div className="space-y-2 flex-1">
                <MobileMenuItem icon={<Home size={20}/>} label={t('nav_feed')} onClick={() => handleNavigation(ViewState.FEED)} active={view === ViewState.FEED} />
                <MobileMenuItem icon={<Compass size={20}/>} label={t('nav_discover')} onClick={() => handleNavigation(ViewState.EXPLORE)} active={view === ViewState.EXPLORE} />
                <MobileMenuItem icon={<Trophy size={20}/>} label={t('nav_tournaments')} onClick={() => handleNavigation(ViewState.TOURNAMENTS)} active={view === ViewState.TOURNAMENTS} />
                <MobileMenuItem icon={<Gamepad2 size={20}/>} label={t('nav_game')} onClick={() => handleNavigation(ViewState.GAME)} active={view === ViewState.GAME} />
                <MobileMenuItem icon={<MessageSquare size={20}/>} label={t('nav_messages')} onClick={() => handleNavigation(ViewState.MESSAGES)} active={view === ViewState.MESSAGES} />
                <MobileMenuItem icon={<Heart size={20}/>} label={t('nav_notifications')} onClick={() => handleNavigation(ViewState.NOTIFICATIONS)} active={view === ViewState.NOTIFICATIONS} />
                <div className="h-px bg-white/10 my-4"></div>
                <MobileMenuItem icon={<User size={20}/>} label={t('nav_profile')} onClick={() => { if(currentUser) viewProfile(currentUser.id); setIsMobileMenuOpen(false); }} active={view === ViewState.PROFILE} />
                <MobileMenuItem icon={<LayoutDashboard size={20}/>} label={t('nav_dashboard')} onClick={() => handleNavigation(ViewState.DASHBOARD)} active={view === ViewState.DASHBOARD} />
                 {currentUser?.verificationTier === 'staff' && (
                    <MobileMenuItem icon={<ShieldAlert size={20}/>} label={t('nav_admin')} onClick={() => handleNavigation(ViewState.ADMIN)} active={view === ViewState.ADMIN} className="text-red-500" />
                 )}
            </div>

            <div className="pt-6 border-t border-white/10">
                <button onClick={logout} className="flex items-center space-x-3 text-slate-400 w-full p-4 rounded-xl hover:bg-white/5">
                    <LogOut size={20} />
                    <span className="font-bold">Log Out</span>
                </button>
            </div>
        </div>
      )}

      {/* Mobile Bottom Nav (Quick Access) */}
      <nav className="fixed bottom-0 inset-x-0 z-40 bg-[#09090b]/95 border-t border-white/10 h-16 flex md:hidden items-center justify-around px-2 backdrop-blur-xl pb-safe">
        <MobileBottomItem icon={<Home size={24}/>} active={view === ViewState.FEED} onClick={() => handleNavigation(ViewState.FEED)} />
        <MobileBottomItem icon={<Compass size={24}/>} active={view === ViewState.EXPLORE} onClick={() => handleNavigation(ViewState.EXPLORE)} />
        <MobileBottomItem icon={<Gamepad2 size={24}/>} active={view === ViewState.GAME} onClick={() => handleNavigation(ViewState.GAME)} />
        <MobileBottomItem icon={<MessageSquare size={24}/>} active={view === ViewState.MESSAGES} onClick={() => handleNavigation(ViewState.MESSAGES)} />
        <button onClick={() => { if(currentUser) viewProfile(currentUser.id); }} className={`p-1 rounded-full border-2 ${view === ViewState.PROFILE ? 'border-blue-500' : 'border-transparent'}`}>
            <img src={currentUser?.avatarUrl} className="w-6 h-6 rounded-full" />
        </button>
      </nav>
    </>
  );
};

// Sub-components for cleaner code
const NavButton = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) => (
    <button 
        onClick={onClick} 
        className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${active ? 'bg-white/10 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-white/5 font-medium'}`}
    >
        {icon}
        <span className="text-xs uppercase tracking-wide">{label}</span>
    </button>
);

const DropdownItem = ({ icon, label, onClick, className = '' }: { icon: React.ReactNode, label: string, onClick: () => void, className?: string }) => (
    <button 
        onClick={onClick}
        className={`w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-colors ${className}`}
    >
        {icon}
        <span className="font-medium">{label}</span>
    </button>
);

const MobileMenuItem = ({ icon, label, onClick, active, className = '' }: { icon: React.ReactNode, label: string, onClick: () => void, active: boolean, className?: string }) => (
    <button 
        onClick={onClick}
        className={`w-full flex items-center space-x-4 p-4 rounded-xl transition-colors ${active ? 'bg-blue-600/10 text-blue-500' : 'text-slate-400 hover:bg-white/5 hover:text-white'} ${className}`}
    >
        {icon}
        <span className="font-bold text-lg">{label}</span>
    </button>
);

const MobileBottomItem = ({ icon, active, onClick }: { icon: React.ReactNode, active: boolean, onClick: () => void }) => (
    <button onClick={onClick} className={`p-3 transition-colors ${active ? 'text-blue-500' : 'text-slate-500'}`}>
        {icon}
    </button>
);