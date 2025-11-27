import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, Play, Users, Headphones, TrendingUp, Shield, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Landing: React.FC = () => {
  const { login, authMode, setAuthMode, t, language, setLanguage } = useApp();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      if (authMode === 'signup') {
        login(formData.username);
      } else {
        login();
      }
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#030508] text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-cyan-500/8 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-600/8 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-cyan-500/5 to-transparent rounded-full"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-20 flex justify-between items-center px-6 lg:px-16 py-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/25">
            <img 
              src="/assets/logo-blue.png" 
              alt="EVLFRQ" 
              className="h-6 w-6 brightness-0 invert"
            />
          </div>
          <span className="font-display font-bold text-xl tracking-tight hidden sm:block">
            EVL<span className="text-cyan-400">FRQ</span>
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setLanguage(language === 'en' ? 'sr' : 'en')}
            className="text-xs font-medium text-slate-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5"
          >
            {language === 'sr' ? 'EN' : 'SR'}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 px-6 lg:px-16 py-8 lg:py-0">
        <div className="max-w-7xl mx-auto lg:min-h-[calc(100vh-88px)] lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:items-center">
          
          {/* Left Column - Hero */}
          <div className="lg:py-16">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-cyan-400">{t('landing_version')}</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              Tvoja muzika.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-purple-400">
                Tvoja zajednica.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg lg:text-xl text-slate-400 leading-relaxed mb-10 max-w-xl">
              {t('landing_subtitle')}
            </p>

            {/* Stats Row */}
            <div className="flex flex-wrap gap-8 mb-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  <Users size={20} className="text-cyan-400" />
                </div>
                <div>
                  <div className="text-xl font-bold">10K+</div>
                  <div className="text-sm text-slate-500">Producers</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  <Headphones size={20} className="text-purple-400" />
                </div>
                <div>
                  <div className="text-xl font-bold">50K+</div>
                  <div className="text-sm text-slate-500">Tracks</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  <TrendingUp size={20} className="text-green-400" />
                </div>
                <div>
                  <div className="text-xl font-bold">1M+</div>
                  <div className="text-sm text-slate-500">Plays</div>
                </div>
              </div>
            </div>

            {/* Feature List */}
            <div className="flex flex-wrap gap-3 mb-8">
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/5">
                <Play size={16} className="text-cyan-400" />
                <span className="text-sm text-slate-300">Waveform Streaming</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/5">
                <Zap size={16} className="text-yellow-400" />
                <span className="text-sm text-slate-300">Real-time Collab</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/5">
                <Shield size={16} className="text-green-400" />
                <span className="text-sm text-slate-300">Stem Protection</span>
              </div>
            </div>

            {/* Social Proof - Avatars */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[64, 65, 91, 103, 338].map((id, i) => (
                  <img
                    key={i}
                    src={`https://picsum.photos/id/${id}/200/200`}
                    alt="User"
                    className="w-10 h-10 rounded-full border-2 border-[#030508] object-cover"
                  />
                ))}
              </div>
              <div className="text-sm text-slate-400">
                <span className="text-white font-medium">2,500+</span> producera se pridružilo ovog meseca
              </div>
            </div>
          </div>

          {/* Right Column - Auth Card */}
          <div className="mt-12 lg:mt-0 flex justify-center lg:justify-end">
            <div className="w-full max-w-md">
              {/* Auth Card */}
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-50"></div>
                
                <div className="relative bg-[#0a0d12]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                  {/* Tab Switcher */}
                  <div className="flex bg-white/5">
                    <button 
                      onClick={() => setAuthMode('login')}
                      className={`flex-1 py-4 text-sm font-medium transition-all ${
                        authMode === 'login' 
                          ? 'text-white bg-white/5 border-b-2 border-cyan-400' 
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      {t('landing_login')}
                    </button>
                    <button 
                      onClick={() => setAuthMode('signup')}
                      className={`flex-1 py-4 text-sm font-medium transition-all ${
                        authMode === 'signup' 
                          ? 'text-white bg-white/5 border-b-2 border-cyan-400' 
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      {t('landing_signup')}
                    </button>
                  </div>

                  <div className="p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/20 flex items-center justify-center">
                        <img 
                          src="/assets/logo-blue.png" 
                          alt="EVLFRQ" 
                          className="h-8 w-8"
                        />
                      </div>
                      <h2 className="font-display text-2xl font-bold mb-2">
                        {authMode === 'login' ? t('auth_welcome_back') : t('auth_join')}
                      </h2>
                      <p className="text-slate-500 text-sm">
                        {authMode === 'login' ? 'Uloguj se da nastaviš' : 'Napravi svoj producer profil'}
                      </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                      {authMode === 'signup' && (
                        <div>
                          <label className="block text-xs font-medium text-slate-400 mb-2">Username</label>
                          <div className="relative">
                            <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                            <input 
                              type="text" 
                              placeholder={t('auth_username_placeholder')}
                              value={formData.username}
                              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                              className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/25 transition-all"
                              required
                            />
                          </div>
                        </div>
                      )}

                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-2">Email</label>
                        <div className="relative">
                          <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                          <input 
                            type="email" 
                            placeholder={t('auth_email_placeholder')}
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/25 transition-all"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-2">Password</label>
                        <div className="relative">
                          <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                          <input 
                            type={showPassword ? "text" : "password"}
                            placeholder={t('auth_password_placeholder')}
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-12 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/25 transition-all"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>

                      {authMode === 'login' && (
                        <div className="flex items-center justify-between">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 rounded bg-white/5 border-white/20 text-cyan-500 focus:ring-cyan-500/25" />
                            <span className="text-sm text-slate-400">{t('auth_remember')}</span>
                          </label>
                          <a href="#" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
                            {t('auth_forgot')}
                          </a>
                        </div>
                      )}

                      <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full py-3.5 px-6 bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-black font-semibold rounded-xl shadow-lg shadow-cyan-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <span className="flex items-center justify-center gap-2">
                            <span className="w-2 h-2 bg-black rounded-full animate-bounce"></span>
                            <span className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '0.1s'}}></span>
                            <span className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '0.2s'}}></span>
                          </span>
                        ) : (
                          authMode === 'login' ? t('auth_signin_btn') : t('auth_signup_btn')
                        )}
                      </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/10"></div>
                      </div>
                      <div className="relative flex justify-center">
                        <span className="px-4 text-sm text-slate-500 bg-[#0a0d12]">{t('auth_or')}</span>
                      </div>
                    </div>

                    {/* Social Login */}
                    <div className="grid grid-cols-2 gap-3">
                      <button className="flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl transition-all">
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        <span className="text-sm font-medium text-slate-300">Google</span>
                      </button>
                      <button className="flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl transition-all">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
                        </svg>
                        <span className="text-sm font-medium text-slate-300">Facebook</span>
                      </button>
                    </div>

                    {/* Security Note */}
                    <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
                      <Shield size={14} />
                      <span>Sigurna enkripcija podataka</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms */}
              <p className="text-center text-xs text-slate-500 mt-6">
                Nastavljanjem prihvataš{' '}
                <a href="#" className="text-slate-400 hover:text-white transition-colors">Uslove korišćenja</a>
                {' '}i{' '}
                <a href="#" className="text-slate-400 hover:text-white transition-colors">Politiku privatnosti</a>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 px-6 lg:px-16 mt-8 lg:mt-0">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-600">
          <span>{t('landing_footer')}</span>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
