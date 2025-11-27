
import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Trophy, Calendar, Users, DollarSign, ChevronRight, Play, Check, X, Zap, Pause, ThumbsUp, MessageSquare } from 'lucide-react';
import { Tournament, Post, TournamentMatch, User } from '../types';
import { Button } from '../components/ui/Button';
import { Waveform } from '../components/ui/Waveform';
import { VerificationBadge } from '../components/ui/VerificationBadge';
import { MOCK_POSTS } from '../constants';

export const Tournaments: React.FC = () => {
  const { currentUser, posts, joinTournament, tournaments, voteTournamentMatch, t } = useApp();
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedBeatId, setSelectedBeatId] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Live Arena State
  const [activeMatch, setActiveMatch] = useState<TournamentMatch | null>(null);
  const [livePlayingSide, setLivePlayingSide] = useState<'player1' | 'player2' | null>(null);
  const [chatMessages, setChatMessages] = useState<{user: string, text: string}[]>([
     { user: 'BeatzPro', text: 'Blue side bass is insane! 🤯' },
     { user: 'TrapLord', text: 'Red side mix is cleaner tho' }
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Simulate chat
  useEffect(() => {
    if (!activeMatch) return;
    
    const interval = setInterval(() => {
       const msgs = ['Voted!', 'Fire 🔥', 'That drop was crazy', 'Blue wins', 'Red wins', 'Sheeeesh'];
       const users = ['User1', 'ProdByMike', 'StudioRat', '808God'];
       const randomMsg = msgs[Math.floor(Math.random() * msgs.length)];
       const randomUser = users[Math.floor(Math.random() * users.length)];
       
       setChatMessages(prev => [...prev.slice(-10), { user: randomUser, text: randomMsg }]);
    }, 3000);

    return () => clearInterval(interval);
  }, [activeMatch]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleApply = (tournament: Tournament) => {
    setSelectedTournament(tournament);
    setShowApplyModal(true);
  };

  const confirmApplication = () => {
    if (selectedTournament && selectedBeatId) {
      joinTournament(selectedTournament.id, selectedBeatId);
      setShowApplyModal(false);
      setShowSuccess(true);
      setTimeout(() => {
         setShowSuccess(false);
         setSelectedTournament(null);
         setSelectedBeatId(null);
      }, 3000);
    }
  };
  
  const handleVote = (match: TournamentMatch, playerId: string) => {
    if (selectedTournament) {
      voteTournamentMatch(selectedTournament.id, match.id, playerId);
    }
  };

  const toggleLivePlay = (side: 'player1' | 'player2') => {
    if (livePlayingSide === side) {
      setLivePlayingSide(null);
    } else {
      setLivePlayingSide(side);
    }
  };

  // Tournament Lobby Logic
  const userBeats = posts.filter(p => p.userId === currentUser?.id);

  // If Live Match is Open
  if (activeMatch && selectedTournament) {
    const p1Track = MOCK_POSTS.find(p => p.userId === activeMatch.player1.id) || MOCK_POSTS[0];
    const p2Track = MOCK_POSTS.find(p => p.userId === activeMatch.player2.id) || MOCK_POSTS[1];

    return (
      <div className="fixed inset-0 z-[60] bg-[#050505] flex flex-col animate-in fade-in duration-300">
         {/* Live Header */}
         <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-[#0a0a0a]">
            <div className="flex items-center space-x-4">
               <div className="flex items-center space-x-2 text-red-500 animate-pulse">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="font-mono font-bold uppercase tracking-widest text-sm">LIVE ARENA</span>
               </div>
               <div className="h-6 w-px bg-white/10"></div>
               <h2 className="font-bold text-white text-sm md:text-lg">{selectedTournament.title}</h2>
            </div>
            <button 
               onClick={() => { setActiveMatch(null); setLivePlayingSide(null); }}
               className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
               <X size={24} className="text-slate-400" />
            </button>
         </div>

         {/* Main Battle Area */}
         <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* Player 1 (Red) */}
            <div className="flex-1 bg-gradient-to-br from-red-900/10 to-black border-r border-white/10 relative p-6 flex flex-col justify-center items-center group">
               <div className={`absolute inset-0 bg-red-500/5 transition-opacity duration-500 ${livePlayingSide === 'player1' ? 'opacity-100' : 'opacity-0'}`}></div>
               
               <div className="relative z-10 text-center w-full max-w-md animate-fade-in-up">
                  <div className="w-32 h-32 mx-auto rounded-2xl border-2 border-red-500/30 overflow-hidden shadow-[0_0_30px_rgba(239,68,68,0.2)] mb-6 relative">
                     <img src={activeMatch.player1.avatarUrl} className="w-full h-full object-cover" />
                     {livePlayingSide === 'player1' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                           <div className="space-y-1">
                              <div className="w-1 bg-red-500 h-4 mx-auto animate-bounce"></div>
                              <div className="w-1 bg-red-500 h-6 mx-auto animate-bounce" style={{ animationDelay: '0.1s'}}></div>
                              <div className="w-1 bg-red-500 h-3 mx-auto animate-bounce" style={{ animationDelay: '0.2s'}}></div>
                           </div>
                        </div>
                     )}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-1">{activeMatch.player1.displayName}</h3>
                  <p className="text-red-400 font-mono text-sm mb-8">{p1Track.title}</p>
                  
                  <div className="flex items-center justify-center space-x-4 mb-8">
                     <button 
                        onClick={() => toggleLivePlay('player1')}
                        className={`w-16 h-16 rounded-full flex items-center justify-center border-2 transition-all ${livePlayingSide === 'player1' ? 'bg-red-600 border-red-500 scale-110 shadow-lg shadow-red-500/40' : 'bg-surface border-white/10 hover:border-red-500/50 hover:bg-white/5'}`}
                     >
                        {livePlayingSide === 'player1' ? <Pause fill="white" /> : <Play fill="white" className="ml-1" />}
                     </button>
                  </div>
                  
                  <div className="bg-black/40 rounded-xl p-4 border border-white/5 mb-6">
                     <Waveform isPlaying={livePlayingSide === 'player1'} color="#ef4444" height={40} />
                  </div>

                  <Button 
                     fullWidth 
                     onClick={() => handleVote(activeMatch, activeMatch.player1.id)}
                     className="bg-red-600 hover:bg-red-500 border-red-500 shadow-red-900/20 py-4 text-lg"
                  >
                     VOTE RED ({activeMatch.score1})
                  </Button>
               </div>
            </div>

            {/* Center Info */}
            <div className="w-full md:w-20 bg-black border-x border-white/10 flex md:flex-col items-center justify-center py-4 space-x-4 md:space-x-0 md:space-y-8 z-20">
               <div className="font-black text-4xl italic text-slate-700">VS</div>
               <div className="h-px w-full bg-white/10 hidden md:block"></div>
               <div className="text-center">
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Time Left</div>
                  <div className="font-mono text-white font-bold">04:20</div>
               </div>
            </div>

            {/* Player 2 (Blue) */}
            <div className="flex-1 bg-gradient-to-bl from-blue-900/10 to-black border-l border-white/10 relative p-6 flex flex-col justify-center items-center">
               <div className={`absolute inset-0 bg-blue-500/5 transition-opacity duration-500 ${livePlayingSide === 'player2' ? 'opacity-100' : 'opacity-0'}`}></div>

               <div className="relative z-10 text-center w-full max-w-md animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                  <div className="w-32 h-32 mx-auto rounded-2xl border-2 border-blue-500/30 overflow-hidden shadow-[0_0_30px_rgba(59,130,246,0.2)] mb-6 relative">
                     <img src={activeMatch.player2.avatarUrl} className="w-full h-full object-cover" />
                     {livePlayingSide === 'player2' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                           <div className="space-y-1">
                              <div className="w-1 bg-blue-500 h-4 mx-auto animate-bounce"></div>
                              <div className="w-1 bg-blue-500 h-6 mx-auto animate-bounce" style={{ animationDelay: '0.1s'}}></div>
                              <div className="w-1 bg-blue-500 h-3 mx-auto animate-bounce" style={{ animationDelay: '0.2s'}}></div>
                           </div>
                        </div>
                     )}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-1">{activeMatch.player2.displayName}</h3>
                  <p className="text-blue-400 font-mono text-sm mb-8">{p2Track.title}</p>
                  
                  <div className="flex items-center justify-center space-x-4 mb-8">
                     <button 
                        onClick={() => toggleLivePlay('player2')}
                        className={`w-16 h-16 rounded-full flex items-center justify-center border-2 transition-all ${livePlayingSide === 'player2' ? 'bg-blue-600 border-blue-500 scale-110 shadow-lg shadow-blue-500/40' : 'bg-surface border-white/10 hover:border-blue-500/50 hover:bg-white/5'}`}
                     >
                        {livePlayingSide === 'player2' ? <Pause fill="white" /> : <Play fill="white" className="ml-1" />}
                     </button>
                  </div>
                  
                   <div className="bg-black/40 rounded-xl p-4 border border-white/5 mb-6">
                     <Waveform isPlaying={livePlayingSide === 'player2'} color="#3b82f6" height={40} />
                  </div>

                  <Button 
                     fullWidth 
                     onClick={() => handleVote(activeMatch, activeMatch.player2.id)}
                     className="bg-blue-600 hover:bg-blue-500 border-blue-500 shadow-blue-900/20 py-4 text-lg"
                  >
                     VOTE BLUE ({activeMatch.score2})
                  </Button>
               </div>
            </div>

            {/* Live Chat Panel (Desktop Only for simplicity) */}
            <div className="hidden lg:flex w-72 bg-[#080808] border-l border-white/10 flex-col">
               <div className="p-4 border-b border-white/10 font-bold font-mono text-sm flex items-center justify-between">
                  <span>LIVE CHAT</span>
                  <div className="flex items-center space-x-1 text-[10px] text-green-500">
                     <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                     <span>245 Online</span>
                  </div>
               </div>
               <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {chatMessages.map((msg, i) => (
                     <div key={i} className="text-xs animate-in slide-in-from-bottom-2 duration-300">
                        <span className={`font-bold mr-2 ${i % 2 === 0 ? 'text-blue-400' : 'text-red-400'}`}>{msg.user}:</span>
                        <span className="text-slate-300">{msg.text}</span>
                     </div>
                  ))}
                  <div ref={chatEndRef} />
               </div>
               <div className="p-3 border-t border-white/10">
                  <input type="text" placeholder="Say something..." className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-xs focus:outline-none focus:border-blue-500" />
               </div>
            </div>
         </div>
      </div>
    );
  }

  // Bracket View
  if (selectedTournament && selectedTournament.status === 'active') {
    return (
      <div className="max-w-7xl mx-auto pt-20 pb-24 px-4">
        <div className="flex items-center space-x-3 mb-6">
           <button onClick={() => setSelectedTournament(null)} className="text-slate-500 hover:text-white flex items-center">
             <ChevronRight size={20} className="rotate-180 mr-1" /> Back
           </button>
           <h1 className="text-2xl font-bold font-mono uppercase text-white animate-fade-in">{selectedTournament.title} - {t('tourn_bracket_title')}</h1>
        </div>
        
        {/* Bracket Scroll Container */}
        <div className="overflow-x-auto pb-8">
          <div className="min-w-[1000px] flex justify-between space-x-12 px-4">
            {selectedTournament.rounds.map((round, rIndex) => (
              <div key={round.id} className="flex flex-col justify-around flex-1 space-y-8 relative animate-fade-in-up opacity-0 fill-mode-forwards" style={{ animationDelay: `${rIndex * 200}ms` }}>
                <h3 className="text-center text-blue-500 font-mono text-sm uppercase font-bold mb-4 tracking-widest">{round.name}</h3>
                
                {round.matches.map((match) => (
                  <div 
                     key={match.id} 
                     onClick={() => match.status === 'active' && setActiveMatch(match)}
                     className={`relative bg-surface border rounded-lg p-3 min-w-[220px] transition-all ${match.status === 'active' ? 'border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.2)] cursor-pointer hover:scale-105' : 'border-white/10 opacity-70'}`}
                  >
                     {/* Live Indicator */}
                     {match.status === 'active' && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 animate-pulse">
                           <Zap size={10} fill="white"/> LIVE
                        </div>
                     )}

                     {/* Connecting Lines Logic */}
                     {rIndex < selectedTournament.rounds.length - 1 && (
                       <div className="absolute top-1/2 -right-12 w-12 h-px bg-white/10"></div>
                     )}

                     {/* Player 1 */}
                     <div className={`flex justify-between items-center mb-2 pb-2 border-b border-white/5 ${match.score1 > match.score2 ? 'text-green-400' : 'text-slate-400'}`}>
                        <div className="flex items-center space-x-2">
                           <div className="w-6 h-6 bg-black rounded-full overflow-hidden">
                             {match.player1.avatarUrl && <img src={match.player1.avatarUrl} className="w-full h-full object-cover"/>}
                           </div>
                           <span className="font-bold text-xs truncate max-w-[100px]">{match.player1.displayName}</span>
                        </div>
                        <span className="font-mono text-xs">{match.score1}</span>
                     </div>

                     {/* Player 2 */}
                     <div className={`flex justify-between items-center ${match.score2 > match.score1 ? 'text-green-400' : 'text-slate-400'}`}>
                        <div className="flex items-center space-x-2">
                           <div className="w-6 h-6 bg-black rounded-full overflow-hidden">
                             {match.player2.avatarUrl && <img src={match.player2.avatarUrl} className="w-full h-full object-cover"/>}
                           </div>
                           <span className="font-bold text-xs truncate max-w-[100px]">{match.player2.displayName}</span>
                        </div>
                        <span className="font-mono text-xs">{match.score2}</span>
                     </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ... (Keep existing Lobby View code same as before below)

  return (
    <div className="max-w-5xl mx-auto pt-20 pb-24 px-4">
      <h1 className="text-3xl font-bold mb-2 uppercase font-mono tracking-tight flex items-center gap-3 animate-fade-in-up">
        <Trophy className="text-yellow-500" />
        {t('tourn_title')}
      </h1>
      <p className="text-slate-500 mb-12 animate-fade-in-up" style={{ animationDelay: '100ms' }}>Compete against the best producers in the community. Win prizes and recognition.</p>

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-24 right-4 bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl z-50 animate-in slide-in-from-right fade-in duration-300 flex items-center gap-3">
          <Check size={24} />
          <div>
            <h4 className="font-bold">{t('tourn_apply_success')}</h4>
            <p className="text-xs text-green-100">Good luck!</p>
          </div>
        </div>
      )}

      {/* Tournament List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {tournaments.map((tournament, index) => (
          <div key={tournament.id} className="bg-surface border border-white/10 rounded-2xl overflow-hidden group hover:border-blue-500/30 transition-all animate-fade-in-up opacity-0 fill-mode-forwards" style={{ animationDelay: `${index * 200 + 200}ms` }}>
            <div className="h-48 relative overflow-hidden">
              <img src={tournament.coverImage} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                 <div className={`inline-flex items-center px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest mb-2 ${tournament.status === 'active' ? 'bg-red-500 text-white' : 'bg-green-500 text-black'}`}>
                   {tournament.status === 'active' ? t('tourn_active') : t('tourn_registration')}
                 </div>
                 <h2 className="text-2xl font-bold text-white font-mono">{tournament.title}</h2>
              </div>
            </div>

            <div className="p-6">
              <p className="text-slate-400 text-sm mb-6 min-h-[40px]">{tournament.description}</p>
              
              <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-white/5">
                 <div>
                    <div className="text-[10px] uppercase text-slate-500 font-bold mb-1">{t('tourn_prize')}</div>
                    <div className="font-mono text-yellow-400 font-bold flex items-center gap-1"><DollarSign size={14}/> {tournament.prizePool}</div>
                 </div>
                 <div>
                    <div className="text-[10px] uppercase text-slate-500 font-bold mb-1">{t('tourn_fee')}</div>
                    <div className="font-mono text-white font-bold">{tournament.entryFee}</div>
                 </div>
                 <div>
                    <div className="text-[10px] uppercase text-slate-500 font-bold mb-1">Participants</div>
                    <div className="font-mono text-white font-bold flex items-center gap-1"><Users size={14}/> {tournament.participantsCount}/{tournament.maxParticipants}</div>
                 </div>
              </div>

              {tournament.status === 'registration' ? (
                <Button fullWidth onClick={() => handleApply(tournament)}>
                   {t('tourn_apply')}
                </Button>
              ) : (
                <Button fullWidth variant="outline" onClick={() => setSelectedTournament(tournament)}>
                   {t('tourn_view_bracket')}
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Application Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
           <div className="bg-surface w-full max-w-lg rounded-2xl border border-white/10 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="p-6 border-b border-white/5 flex justify-between items-center">
                 <h3 className="font-bold text-lg">{t('tourn_modal_title')}</h3>
                 <button onClick={() => setShowApplyModal(false)}><X size={20} className="text-slate-500 hover:text-white"/></button>
              </div>
              <div className="p-6">
                 <p className="text-slate-400 text-sm mb-4">{t('tourn_modal_desc')}</p>
                 
                 <div className="space-y-2 max-h-60 overflow-y-auto pr-2 mb-6">
                    {userBeats.length > 0 ? userBeats.map(post => (
                       <div 
                         key={post.id} 
                         onClick={() => setSelectedBeatId(post.id)}
                         className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${selectedBeatId === post.id ? 'bg-blue-600/10 border-blue-500' : 'bg-black/20 border-white/5 hover:bg-white/5'}`}
                       >
                          <img src={post.coverArtUrl} className="w-10 h-10 rounded object-cover mr-3" />
                          <div className="flex-1">
                             <div className="font-bold text-sm text-white">{post.title}</div>
                             <div className="text-[10px] text-slate-500">{post.bpm} BPM • {post.genre}</div>
                          </div>
                          {selectedBeatId === post.id && <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center"><Check size={12} className="text-white"/></div>}
                       </div>
                    )) : (
                       <div className="text-center py-8 text-slate-500 border border-dashed border-white/10 rounded-lg">
                          No beats found. Upload a beat first.
                       </div>
                    )}
                 </div>

                 <Button fullWidth disabled={!selectedBeatId} onClick={confirmApplication}>
                    Submit Application
                 </Button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};