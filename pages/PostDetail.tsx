import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PostCard } from '../components/feed/PostCard';
import { ArrowLeft, Send } from 'lucide-react';
import { ViewState } from '../types';

export const PostDetail: React.FC = () => {
  const { selectedPost, setView, addComment, t } = useApp();
  const [commentText, setCommentText] = useState('');

  if (!selectedPost) return null;

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(selectedPost.id, commentText);
    setCommentText('');
  };

  return (
    <div className="max-w-2xl mx-auto pt-20 pb-24 px-4 min-h-screen">
      <button 
        onClick={() => setView(ViewState.FEED)}
        className="flex items-center space-x-2 text-slate-400 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        <span className="font-medium">{t('post_detail_back')}</span>
      </button>

      <PostCard post={selectedPost} />

      <div className="bg-surface/50 backdrop-blur-sm border border-white/5 rounded-3xl p-6 mt-6">
        <h3 className="font-bold text-lg mb-6">{t('post_detail_comments')} ({selectedPost.commentsCount})</h3>
        
        {/* Comment Input */}
        <form onSubmit={handleSubmitComment} className="flex items-start space-x-3 mb-8">
           <div className="flex-1">
             <input 
               type="text" 
               value={commentText}
               onChange={(e) => setCommentText(e.target.value)}
               placeholder={t('post_detail_add_comment')}
               className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
             />
           </div>
           <button 
             type="submit"
             disabled={!commentText.trim()} 
             className="p-3 bg-blue-600 rounded-xl text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
           >
             <Send size={20} />
           </button>
        </form>

        {/* Comments List */}
        <div className="space-y-6">
          {selectedPost.comments.length > 0 ? selectedPost.comments.map((comment) => (
            <div key={comment.id} className="flex space-x-3">
              <img src={comment.avatarUrl} alt={comment.username} className="w-8 h-8 rounded-full object-cover" />
              <div>
                 <div className="flex items-baseline space-x-2">
                   <span className="font-bold text-sm text-white">{comment.username}</span>
                   <span className="text-xs text-slate-500">{comment.timestamp}</span>
                 </div>
                 <p className="text-sm text-slate-300 mt-0.5">{comment.text}</p>
              </div>
            </div>
          )) : (
            <p className="text-center text-slate-500 py-4">{t('post_detail_no_comments')}</p>
          )}
        </div>
      </div>
    </div>
  );
};