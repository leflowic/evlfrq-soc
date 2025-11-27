import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Send, Phone, Video, Info } from 'lucide-react';
import { MOCK_USERS } from '../constants';
import { VerificationBadge } from '../components/ui/VerificationBadge';

export const Messages: React.FC = () => {
  const { currentUser, t } = useApp();
  const [selectedChatId, setSelectedChatId] = useState<string | null>(MOCK_USERS[1].id); // Default select first chat
  const [messageInput, setMessageInput] = useState('');
  
  // Mock Messages Data
  const [messages, setMessages] = useState([
    { id: 1, senderId: MOCK_USERS[1].id, text: "Yo! That beat you uploaded yesterday was crazy 🔥", time: "10:30 AM", isMe: false },
    { id: 2, senderId: currentUser?.id, text: "Appreciate it fam! Tried something new with the 808s.", time: "10:32 AM", isMe: true },
    { id: 3, senderId: MOCK_USERS[1].id, text: "We should definitely collab. I have some melodies that would fit that style perfectly.", time: "10:35 AM", isMe: false },
  ]);

  const activeUser = MOCK_USERS.find(u => u.id === selectedChatId);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    
    setMessages([...messages, {
      id: Date.now(),
      senderId: currentUser?.id,
      text: messageInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    }]);
    setMessageInput('');
  };

  return (
    <div className="max-w-6xl mx-auto pt-16 h-[calc(100vh)] flex">
      {/* Sidebar - Chat List */}
      <div className={`w-full md:w-80 lg:w-96 border-r border-white/5 flex flex-col ${selectedChatId ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-4 border-b border-white/5">
           <h1 className="text-xl font-bold mb-4">{t('messages_title')}</h1>
           <div className="relative">
             <input type="text" placeholder={t('messages_search')} className="w-full bg-[#050505] border border-white/10 rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-white placeholder:text-slate-600" />
             <Search size={16} className="absolute left-3 top-2.5 text-slate-500" />
           </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
           {MOCK_USERS.filter(u => u.id !== currentUser?.id).map(user => (
             <div 
               key={user.id} 
               onClick={() => setSelectedChatId(user.id)}
               className={`p-4 flex items-center space-x-3 cursor-pointer hover:bg-surface transition-colors ${selectedChatId === user.id ? 'bg-surface-highlight border-r-2 border-blue-500' : ''}`}
             >
                <div className="relative">
                   <img src={user.avatarUrl} alt={user.username} className="w-12 h-12 rounded-full object-cover" />
                   <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                </div>
                <div className="flex-1 min-w-0">
                   <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-semibold text-sm truncate flex items-center gap-1">
                        {user.displayName}
                        <VerificationBadge tier={user.verificationTier} size={12} />
                      </h3>
                      <span className="text-xs text-slate-500">10:35 AM</span>
                   </div>
                   <p className="text-sm text-slate-400 truncate">We should definitely collab...</p>
                </div>
             </div>
           ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className={`flex-1 flex flex-col bg-background ${!selectedChatId ? 'hidden md:flex' : 'flex'}`}>
        {activeUser ? (
          <>
            {/* Header */}
            <div className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-surface/30 backdrop-blur-md">
               <div className="flex items-center space-x-3">
                 <button onClick={() => setSelectedChatId(null)} className="md:hidden text-slate-400 mr-2">
                   {t('messages_back')}
                 </button>
                 <img src={activeUser.avatarUrl} className="w-8 h-8 rounded-full" alt="user" />
                 <div>
                   <h3 className="font-bold text-sm flex items-center gap-1">
                      {activeUser.displayName}
                      <VerificationBadge tier={activeUser.verificationTier} size={14} />
                   </h3>
                   <span className="text-xs text-green-500 flex items-center">● {t('messages_online')}</span>
                 </div>
               </div>
               <div className="flex items-center space-x-4 text-blue-400">
                 <Phone size={20} className="cursor-pointer hover:text-white" />
                 <Video size={20} className="cursor-pointer hover:text-white" />
                 <Info size={20} className="cursor-pointer hover:text-white text-slate-400" />
               </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
               {messages.map((msg) => (
                 <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] rounded-2xl px-4 py-3 ${msg.isMe ? 'bg-blue-600 text-white rounded-tr-sm' : 'bg-surface border border-white/5 text-slate-200 rounded-tl-sm'}`}>
                      <p className="text-sm">{msg.text}</p>
                      <p className={`text-[10px] mt-1 text-right ${msg.isMe ? 'text-blue-200' : 'text-slate-400'}`}>{msg.time}</p>
                    </div>
                 </div>
               ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/5 bg-background">
               <form onSubmit={handleSend} className="flex items-center space-x-3">
                 <input 
                   type="text" 
                   value={messageInput}
                   onChange={(e) => setMessageInput(e.target.value)}
                   placeholder={t('messages_type_placeholder')} 
                   className="flex-1 bg-[#050505] border border-white/10 rounded-full py-3 px-6 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder:text-slate-600"
                 />
                 <button 
                   type="submit" 
                   disabled={!messageInput.trim()}
                   className="p-3 bg-blue-600 rounded-full text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                 >
                   <Send size={20} />
                 </button>
               </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-500">
            <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center mb-4 border border-white/5">
              <Send size={32} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{t('messages_your_messages')}</h3>
            <p>{t('messages_select_chat')}</p>
          </div>
        )}
      </div>
    </div>
  );
};