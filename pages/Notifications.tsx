import React from 'react';
import { useApp } from '../context/AppContext';
import { Heart, MessageCircle, UserPlus, AtSign, Check } from 'lucide-react';
import { VerificationBadge } from '../components/ui/VerificationBadge';

export const Notifications: React.FC = () => {
  const { notifications, markNotificationRead, t } = useApp();

  const getIcon = (type: string) => {
    switch (type) {
      case 'like': return <Heart size={16} className="text-white fill-white" />;
      case 'comment': return <MessageCircle size={16} className="text-white fill-white" />;
      case 'follow': return <UserPlus size={16} className="text-white fill-white" />;
      case 'mention': return <AtSign size={16} className="text-white" />;
      default: return <Heart size={16} />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'like': return 'bg-red-500';
      case 'comment': return 'bg-blue-500';
      case 'follow': return 'bg-purple-500';
      case 'mention': return 'bg-orange-500';
      default: return 'bg-slate-500';
    }
  };

  return (
    <div className="max-w-xl mx-auto pt-20 pb-24 px-4">
      <h1 className="text-2xl font-bold mb-6 px-2">{t('notifications_title')}</h1>
      
      <div className="space-y-2">
        {notifications.length > 0 ? notifications.map(notification => (
          <div 
            key={notification.id} 
            onClick={() => markNotificationRead(notification.id)}
            className={`flex items-center justify-between p-4 rounded-2xl transition-colors cursor-pointer border border-transparent ${notification.read ? 'bg-transparent hover:bg-white/5' : 'bg-white/5 hover:bg-white/10 border-blue-500/20'}`}
          >
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img src={notification.actor.avatarUrl} alt="User" className="w-12 h-12 rounded-full object-cover" />
                <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full ${getBgColor(notification.type)} flex items-center justify-center border-2 border-background`}>
                  {getIcon(notification.type)}
                </div>
              </div>
              <div>
                <p className="text-sm text-slate-200">
                  <span className="font-bold text-white mr-1 flex items-center gap-1 inline-flex">
                    {notification.actor.displayName}
                    <VerificationBadge tier={notification.actor.verificationTier} size={12} />
                  </span>
                  {notification.message}
                </p>
                <p className="text-xs text-slate-500 mt-1">{notification.time}</p>
              </div>
            </div>
            {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
          </div>
        )) : (
            <div className="text-center py-20 text-slate-500">
                <p>{t('notifications_empty')}</p>
            </div>
        )}
      </div>
    </div>
  );
};