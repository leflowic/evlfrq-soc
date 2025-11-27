
import React from 'react';
import { useApp } from '../context/AppContext';
import { PostCard } from '../components/feed/PostCard';

export const Feed: React.FC = () => {
  const { posts, t } = useApp();

  return (
    <div className="max-w-xl mx-auto pt-20 pb-24 px-4 md:px-0">
      
      <div className="space-y-6">
        {posts.map((post, index) => (
          <div 
            key={post.id} 
            className="animate-fade-in-up opacity-0 fill-mode-forwards"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <PostCard post={post} />
          </div>
        ))}
      </div>
      
      <div className="text-center py-8 text-slate-500 text-sm animate-fade-in opacity-0 fill-mode-forwards" style={{ animationDelay: '1s' }}>
        {t('feed_end')}
      </div>
    </div>
  );
};