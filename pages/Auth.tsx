
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/Button';
import { ViewState } from '../types';
import { Mail, Lock, User, Chrome, ArrowLeft } from 'lucide-react';

export const Auth: React.FC = () => {
  const { login, setView, authMode, setAuthMode, t } = useApp();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate network delay
    setTimeout(() => {
      login();
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
       {/* Animated Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
         <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-blue-900/10 rounded-full blur-[120px] animate-pulse-slow"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-900/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]"></div>
      </div>

      <div className="relative z-10 p-6">
        <button 
          onClick={() => setView(ViewState.LANDING)}
          className="flex items-center space-x-2 text-slate-500 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="font-mono text-xs uppercase tracking-widest">{t('messages_back')}</span>
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-md">
          {/* Hardware Card Container */}
          <div className="bg-[#09090b] border border-white/10 rounded-xl shadow-2xl relative overflow-hidden backdrop-blur-xl">
            {/* Top "Screw" Accents */}
            <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-slate-800 border border-slate-700"></div>
            <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-slate-800 border border-slate-700"></div>
            <div className="absolute bottom-3 left-3 w-2 h-2 rounded-full bg-slate-800 border border-slate-700"></div>
            <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-slate-800 border border-slate-700"></div>

            {/* Header / Tab Switcher */}
            <div className="flex border-b border-white/5">
              <button 
                onClick={() => setAuthMode('login')}
                className={`flex-1 py-4 text-xs font-mono font-bold uppercase tracking-wider transition-colors ${authMode === 'login' ? 'text-white bg-white/5 shadow-[inset_0_-2px_0_0_#3b82f6]' : 'text-slate-500 hover:text-slate-300'}`}
              >
                {t('landing_login')}
              </button>
              <button 
                onClick={() => setAuthMode('signup')}
                className={`flex-1 py-4 text-xs font-mono font-bold uppercase tracking-wider transition-colors ${authMode === 'signup' ? 'text-white bg-white/5 shadow-[inset_0_-2px_0_0_#3b82f6]' : 'text-slate-500 hover:text-slate-300'}`}
              >
                {t('landing_signup')}
              </button>
            </div>

            <div className="p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-600/10 text-blue-500 mb-4 border border-blue-500/20">
                  <Lock size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {authMode === 'login' ? t('auth_welcome_back') : t('auth_join')}
                </h2>
                <p className="text-slate-500 text-sm">
                  {authMode === 'login' ? 'Enter your credentials to access the DAW.' : 'Initialize your producer profile.'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {authMode === 'signup' && (
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-slate-400 pl-1">
                      {t('common_search').replace('SEARCH', 'USERNAME')} 
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                        <User size={16} />
                      </div>
                      <input 
                        type="text" 
                        placeholder={t('auth_username_placeholder')}
                        className="w-full bg-[#050505] border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-700"
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-slate-400 pl-1">Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                      <Mail size={16} />
                    </div>
                    <input 
                      type="email" 
                      placeholder={t('auth_email_placeholder')}
                      defaultValue={authMode === 'login' ? 'admin@evlfrq.com' : ''}
                      className="w-full bg-[#050505] border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-700"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-slate-400 pl-1">{t('auth_password_placeholder').replace('••••••••', 'PASSWORD')}</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                      <Lock size={16} />
                    </div>
                    <input 
                      type="password" 
                      placeholder={t('auth_password_placeholder')}
                      defaultValue={authMode === 'login' ? 'admin123' : ''}
                      className="w-full bg-[#050505] border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-700"
                      required
                    />
                  </div>
                </div>

                {authMode === 'login' && (
                  <div className="flex items-center justify-between pt-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-blue-500/50" />
                      <span className="text-xs text-slate-400">{t('auth_remember')}</span>
                    </label>
                    <a href="#" className="text-xs text-blue-500 hover:text-blue-400 transition-colors">{t('auth_forgot')}</a>
                  </div>
                )}

                <Button 
                  type="submit" 
                  fullWidth 
                  size="lg" 
                  className="mt-6 font-mono tracking-widest relative overflow-hidden group"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s'}}></span>
                      <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s'}}></span>
                    </span>
                  ) : (
                    authMode === 'login' ? t('auth_signin_btn') : t('auth_signup_btn')
                  )}
                  {/* Shiny overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                </Button>
              </form>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/5"></div>
                </div>
                <div className="relative flex justify-center text-[10px] uppercase font-mono tracking-widest">
                  <span className="bg-[#09090b] px-2 text-slate-600">{t('auth_or')}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center space-x-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg py-2.5 transition-all text-sm font-medium text-slate-300 hover:text-white">
                  <Chrome size={18} />
                  <span>Google</span>
                </button>
                <button className="flex items-center justify-center space-x-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg py-2.5 transition-all text-sm font-medium text-slate-300 hover:text-white">
                  <span className="font-bold text-lg">f</span>
                  <span>Facebook</span>
                </button>
              </div>
            </div>

            <div className="bg-[#050505] p-4 text-center border-t border-white/5">
              <p className="text-xs text-slate-500">
                {authMode === 'login' ? t('auth_no_account') : t('auth_have_account')} {' '}
                <button 
                  onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                  className="text-blue-500 hover:text-blue-400 font-bold transition-colors ml-1"
                >
                  {authMode === 'login' ? t('auth_switch_signup') : t('auth_switch_login')}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
