import React, { useState } from 'react';
import { Upload as UploadIcon, Music, Image as ImageIcon, Sparkles, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ViewState, Post } from '../types';
import { Button } from '../components/ui/Button';

export const Upload: React.FC = () => {
  const { setView, addPost, currentUser, t } = useApp();
  const [dragActive, setDragActive] = useState(false);
  const [title, setTitle] = useState('');
  const [generating, setGenerating] = useState(false);
  const [caption, setCaption] = useState('');

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle file drop logic here (simulated)
    setTitle("My_New_Beat_Final.mp3");
  };

  const generateAICaption = () => {
    setGenerating(true);
    // Simulation of Gemini API call
    setTimeout(() => {
      setCaption("Just dropped this absolute heater! 🔥 The 808s are hitting different on this one. Let me know what you think in the comments! #TrapMusic #ProducerLife #FLStudio");
      setGenerating(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const newPost: Post = {
      id: `new_${Date.now()}`,
      userId: currentUser.id,
      user: currentUser,
      title: title || 'Untitled Project',
      coverArtUrl: `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/600/600`,
      audioDuration: 145,
      bpm: 140,
      key: 'Cm',
      genre: 'Trap',
      caption: caption,
      hashtags: ['#new', '#producer'],
      likes: 0,
      commentsCount: 0,
      shares: 0,
      createdAt: 'Just now',
      likedByCurrentUser: false,
      savedByCurrentUser: false,
      comments: []
    };

    addPost(newPost);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-surface w-full max-w-2xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden relative animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">{t('upload_title')}</h2>
          <button onClick={() => setView(ViewState.FEED)} className="text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Col: Files */}
            <div className="space-y-4">
              <div 
                className={`h-48 rounded-xl border-2 border-dashed flex flex-col items-center justify-center transition-colors cursor-pointer
                  ${dragActive ? 'border-blue-500 bg-blue-500/10' : 'border-slate-700 hover:bg-slate-800'}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Music size={40} className={dragActive ? 'text-blue-500' : 'text-slate-500'} />
                <p className="mt-2 text-sm text-slate-400 font-medium">{t('upload_drag')}</p>
                <input type="file" accept="audio/*" className="hidden" />
              </div>

              <div className="h-48 rounded-xl border-2 border-dashed border-slate-700 hover:bg-slate-800 flex flex-col items-center justify-center transition-colors cursor-pointer relative group">
                <ImageIcon size={40} className="text-slate-500 group-hover:text-purple-400" />
                <p className="mt-2 text-sm text-slate-400 font-medium">{t('upload_cover')}</p>
                <input type="file" accept="image/*" className="hidden" />
              </div>
            </div>

            {/* Right Col: Metadata */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1 uppercase">{t('upload_label_title')}</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={t('upload_placeholder_title')}
                  className="w-full bg-[#09090b] border border-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-xs font-medium text-slate-400 mb-1 uppercase">{t('upload_label_bpm')}</label>
                   <input type="number" placeholder="140" className="w-full bg-[#09090b] border border-white/10 rounded-lg px-4 py-2 text-white outline-none" />
                </div>
                <div>
                   <label className="block text-xs font-medium text-slate-400 mb-1 uppercase">{t('upload_label_key')}</label>
                   <select className="w-full bg-[#09090b] border border-white/10 rounded-lg px-4 py-2 text-white outline-none">
                     <option>C Minor</option>
                     <option>A Major</option>
                     <option>F# Minor</option>
                   </select>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-medium text-slate-400 uppercase">{t('upload_label_caption')}</label>
                  <button 
                    type="button" 
                    onClick={generateAICaption}
                    disabled={generating}
                    className="text-xs text-purple-400 hover:text-purple-300 flex items-center space-x-1"
                  >
                    <Sparkles size={12} />
                    <span>{generating ? t('upload_thinking') : t('upload_ai_generate')}</span>
                  </button>
                </div>
                <textarea 
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full bg-[#09090b] border border-white/10 rounded-lg px-4 py-2 text-white h-32 resize-none outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                  placeholder={t('upload_placeholder_caption')}
                ></textarea>
              </div>

              <div className="pt-2">
                <Button fullWidth onClick={(e) => handleSubmit(e)} disabled={!title}>
                  {t('upload_submit')}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};