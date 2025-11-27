import React from 'react';
import { Activity, Users, Radio } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/Button';
import { ViewState } from '../types';

export const Landing: React.FC = () => {
  const { setView, setAuthMode, t, language, setLanguage } = useApp();

  const handleLoginClick = () => {
    setAuthMode('login');
    setView(ViewState.AUTH);
  };

  const handleSignupClick = () => {
    setAuthMode('signup');
    setView(ViewState.AUTH);
  };

  return (
    <div className="min-h-screen bg-background text-white flex flex-col relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
         <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-900/10 rounded-full blur-[150px] animate-pulse-slow"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-900/10 rounded-full blur-[150px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]"></div>
      </div>

      <nav className="relative z-10 flex justify-between items-center px-6 py-6 md:px-12 border-b border-white/5 bg-background/50 backdrop-blur-sm">
        <div className="flex items-center">
            <img 
              src="/assets/logo-white.png" 
              alt="EVLFRQ" 
              className="h-10 w-auto"
            />
        </div>
        <div className="space-x-4 flex items-center">
          <button 
             onClick={() => setLanguage(language === 'en' ? 'sr' : 'en')}
             className="text-xs font-mono font-bold text-slate-400 border border-slate-700 rounded px-2 py-1 hover:text-white transition-colors"
          >
             {language.toUpperCase()}
          </button>
          <button className="text-sm font-medium text-slate-400 hover:text-white transition-colors" onClick={handleLoginClick}>{t('landing_login')}</button>
          <Button size="sm" onClick={handleSignupClick}>{t('landing_signup')}</Button>
        </div>
      </nav>

      <main className="flex-1 relative z-10 flex flex-col justify-center items-center px-6 text-center">
        <div className="inline-flex items-center px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 backdrop-blur-md text-xs font-mono text-blue-400 mb-8">
          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
          {t('landing_version')}
        </div>
        
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 leading-none">
          {t('landing_title_prefix')} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
            {t('landing_title_suffix')}
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-500 max-w-2xl mb-12 leading-relaxed font-light">
          {t('landing_subtitle')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Button size="lg" onClick={handleSignupClick} className="shadow-lg shadow-blue-900/20">
            {t('landing_enter')}
          </Button>
          <Button variant="outline" size="lg" onClick={handleLoginClick}>
            {t('landing_demo')}
          </Button>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 max-w-6xl text-left w-full">
          <div className="p-8 rounded-xl bg-[#0A0A0A] border border-white/5 hover:border-blue-500/30 transition-all group">
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-6 text-blue-500 group-hover:scale-110 transition-transform">
              <Activity size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-slate-200">{t('landing_feature_1_title')}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">{t('landing_feature_1_desc')}</p>
          </div>
          <div className="p-8 rounded-xl bg-[#0A0A0A] border border-white/5 hover:border-purple-500/30 transition-all group">
            <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-6 text-purple-500 group-hover:scale-110 transition-transform">
              <Users size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-slate-200">{t('landing_feature_2_title')}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">{t('landing_feature_2_desc')}</p>
          </div>
           <div className="p-8 rounded-xl bg-[#0A0A0A] border border-white/5 hover:border-pink-500/30 transition-all group">
            <div className="w-12 h-12 bg-pink-500/10 rounded-lg flex items-center justify-center mb-6 text-pink-500 group-hover:scale-110 transition-transform">
              <Radio size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-slate-200">{t('landing_feature_3_title')}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">{t('landing_feature_3_desc')}</p>
          </div>
        </div>
      </main>

      <footer className="relative z-10 py-8 text-center text-slate-700 text-xs font-mono uppercase tracking-widest border-t border-white/5 mt-12 bg-[#020202]">
        {t('landing_footer')}
      </footer>
    </div>
  );
};