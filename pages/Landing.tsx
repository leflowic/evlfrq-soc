import React, { useState } from 'react';
import { Activity, Users, Radio, Mail, Lock, User, Chrome, Eye, EyeOff } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/Button';

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
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background text-white flex flex-col relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-cyan-900/10 rounded-full blur-[150px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-900/10 rounded-full blur-[150px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center px-6 py-4 md:px-12 border-b border-white/5 bg-background/50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <img 
            src="/assets/logo-blue.png" 
            alt="EVLFRQ" 
            className="h-10 w-10"
          />
          <span className="font-display font-bold text-xl tracking-tight">
            EVL<span className="text-cyan-400">FRQ</span>
          </span>
        </div>
        <div className="flex items-center">
          <button 
            onClick={() => setLanguage(language === 'en' ? 'sr' : 'en')}
            className="text-xs font-semibold text-slate-400 border border-slate-700 rounded px-2.5 py-1.5 hover:text-white hover:border-slate-500 transition-colors"
          >
            {language.toUpperCase()}
          </button>
        </div>
      </nav>

      {/* Main Content - Split Layout */}
      <main className="flex-1 relative z-10 flex flex-col lg:flex-row">
        {/* Left Side - Hero Content */}
        <div className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-16 py-12 lg:py-0">
          <div className="max-w-xl">
            {/* Large Logo */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/20 flex items-center justify-center shadow-lg shadow-cyan-500/10">
                <img 
                  src="/assets/logo-blue.png" 
                  alt="EVLFRQ" 
                  className="h-10 w-10 md:h-12 md:w-12"
                />
              </div>
              <div className="inline-flex items-center px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-md text-xs font-mono text-cyan-400">
                <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse"></span>
                {t('landing_version')}
              </div>
            </div>
            
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[0.9]">
              {t('landing_title_prefix')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                {t('landing_title_suffix')}
              </span>
            </h1>
            
            <p className="text-lg text-slate-500 max-w-lg mb-8 leading-relaxed font-light">
              {t('landing_subtitle')}
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                <Activity size={16} className="text-cyan-400" />
                <span className="text-sm text-slate-400">{t('landing_feature_1_title')}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                <Users size={16} className="text-purple-500" />
                <span className="text-sm text-slate-400">{t('landing_feature_2_title')}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                <Radio size={16} className="text-pink-500" />
                <span className="text-sm text-slate-400">{t('landing_feature_3_title')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="flex-1 flex items-center justify-center px-6 py-12 lg:py-0 lg:pr-16">
          <div className="w-full max-w-md">
            {/* Auth Card */}
            <div className="bg-[#09090b] border border-white/10 rounded-2xl shadow-2xl relative overflow-hidden backdrop-blur-xl">
              {/* Decorative corners */}
              <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-slate-800 border border-slate-700"></div>
              <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-slate-800 border border-slate-700"></div>
              <div className="absolute bottom-3 left-3 w-2 h-2 rounded-full bg-slate-800 border border-slate-700"></div>
              <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-slate-800 border border-slate-700"></div>

              {/* Tab Switcher */}
              <div className="flex border-b border-white/5">
                <button 
                  onClick={() => setAuthMode('login')}
                  className={`flex-1 py-4 text-sm font-semibold uppercase tracking-wide transition-colors ${authMode === 'login' ? 'text-white bg-white/5 shadow-[inset_0_-2px_0_0_#00D4FF]' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  {t('landing_login')}
                </button>
                <button 
                  onClick={() => setAuthMode('signup')}
                  className={`flex-1 py-4 text-sm font-semibold uppercase tracking-wide transition-colors ${authMode === 'signup' ? 'text-white bg-white/5 shadow-[inset_0_-2px_0_0_#00D4FF]' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  {t('landing_signup')}
                </button>
              </div>

              <div className="p-8">
                <div className="text-center mb-6">
                  <div className="flex justify-center mb-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/20 flex items-center justify-center">
                      <img 
                        src="/assets/logo-blue.png" 
                        alt="EVLFRQ" 
                        className="h-8 w-8"
                      />
                    </div>
                  </div>
                  <h2 className="font-display text-2xl font-bold text-white mb-1">
                    {authMode === 'login' ? t('auth_welcome_back') : t('auth_join')}
                  </h2>
                  <p className="text-slate-500 text-sm font-normal">
                    {authMode === 'login' ? 'Uloguj se da nastaviš' : 'Napravi svoj producer profil'}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {authMode === 'signup' && (
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium uppercase tracking-wide text-slate-400 pl-1">
                        Username
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                          <User size={16} />
                        </div>
                        <input 
                          type="text" 
                          placeholder={t('auth_username_placeholder')}
                          value={formData.username}
                          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                          className="w-full bg-[#050505] border border-white/10 rounded-lg py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors placeholder:text-slate-600"
                          required
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium uppercase tracking-wide text-slate-400 pl-1">Email</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                        <Mail size={16} />
                      </div>
                      <input 
                        type="email" 
                        placeholder={t('auth_email_placeholder')}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#050505] border border-white/10 rounded-lg py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors placeholder:text-slate-600"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium uppercase tracking-wide text-slate-400 pl-1">Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                        <Lock size={16} />
                      </div>
                      <input 
                        type={showPassword ? "text" : "password"}
                        placeholder={t('auth_password_placeholder')}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full bg-[#050505] border border-white/10 rounded-lg py-3 pl-10 pr-12 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors placeholder:text-slate-600"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  {authMode === 'login' && (
                    <div className="flex items-center justify-between pt-1">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-cyan-500 focus:ring-cyan-500/50" />
                        <span className="text-xs text-slate-400">{t('auth_remember')}</span>
                      </label>
                      <a href="#" className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">{t('auth_forgot')}</a>
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    fullWidth 
                    size="lg" 
                    className="mt-4 font-semibold tracking-wide relative overflow-hidden group"
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
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  </Button>
                </form>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/5"></div>
                  </div>
                  <div className="relative flex justify-center text-xs font-medium uppercase tracking-wide">
                    <span className="bg-[#09090b] px-3 text-slate-500">{t('auth_or')}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
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
            </div>

            {/* Terms */}
            <p className="text-center text-xs text-slate-600 mt-4">
              By continuing, you agree to our{' '}
              <a href="#" className="text-slate-400 hover:text-white transition-colors">Terms</a>
              {' '}and{' '}
              <a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</a>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-slate-600 text-xs font-medium tracking-wide border-t border-white/5 bg-[#020202]">
        {t('landing_footer')}
      </footer>
    </div>
  );
};
