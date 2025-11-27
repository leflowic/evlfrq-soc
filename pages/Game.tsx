import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/Button';
import { Gamepad2, Timer, Award, Music, Play, XCircle, CheckCircle2, Crown, Volume2 } from 'lucide-react';
import { GAME_TRACKS } from '../constants';

export const Game: React.FC = () => {
  const { awardBadge, currentUser, addPoints, t } = useApp();
  const [gameState, setGameState] = useState<'lobby' | 'playing' | 'result'>('lobby');
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15); // Increased to 15s for better loading/gameplay
  
  // Game state uses the simplified GAME_TRACKS structure
  const [currentTrack, setCurrentTrack] = useState<typeof GAME_TRACKS[0] | null>(null);
  
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [startTime, setStartTime] = useState(0);

  // Stats for the result screen
  const totalScoreRef = useRef(0);

  // Timer Logic
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (gameState === 'playing' && timeLeft > 0 && !selectedOption) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !selectedOption && gameState === 'playing') {
      handleTimeOut();
    }

    return () => clearInterval(interval);
  }, [timeLeft, gameState, selectedOption]);

  // Block right click to prevent inspecting audio source
  useEffect(() => {
      const handleContextMenu = (e: MouseEvent) => e.preventDefault();
      document.addEventListener('contextmenu', handleContextMenu);
      return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  const startGame = () => {
    setGameState('playing');
    setCurrentRound(0);
    setScore(0);
    totalScoreRef.current = 0;
    startRound();
  };

  const startRound = () => {
    // Select a random popular hit
    let randomTrack = GAME_TRACKS[Math.floor(Math.random() * GAME_TRACKS.length)];
    
    // Avoid playing the exact same track twice in a row if possible
    if (currentTrack && randomTrack.youtubeId === currentTrack.youtubeId && GAME_TRACKS.length > 1) {
       randomTrack = GAME_TRACKS.find(t => t.youtubeId !== currentTrack.youtubeId) || randomTrack;
    }

    setCurrentTrack(randomTrack);
    
    // Generate Options
    const correctOption = randomTrack.title;
    const wrongOptions = GAME_TRACKS
       .filter(t => t.youtubeId !== randomTrack.youtubeId)
       .sort(() => 0.5 - Math.random())
       .slice(0, 3)
       .map(t => t.title);
    
    const allOptions = [correctOption, ...wrongOptions].sort(() => 0.5 - Math.random());
    setOptions(allOptions);
    
    // Reset state for new round
    setSelectedOption(null);
    setIsCorrect(null);
    setTimeLeft(15); 
    setStartTime(Date.now());
  };

  const handleTimeOut = () => {
    setIsCorrect(false);
    setSelectedOption('TIMEOUT'); // Mark as timeout
    setTimeout(nextRound, 3000);
  };

  const handleGuess = (option: string) => {
    if (selectedOption) return; // Prevent double guessing
    
    setSelectedOption(option);
    const correct = option === currentTrack?.title;
    setIsCorrect(correct);
    
    if (correct) {
       const timeTaken = Date.now() - startTime;
       // Score calculation: More points for faster answers
       const roundPoints = Math.max(100, timeLeft * 100);
       
       setScore(prev => prev + roundPoints);
       totalScoreRef.current += roundPoints;
       
       // Badge Check: Fastest Listener (under 2s)
       if (timeTaken < 2000 && currentUser) {
          awardBadge(currentUser.id, 'b4'); // 'b4' is Flash Ear
       }
    }

    setTimeout(nextRound, 3000); // 3s delay to see result and video
  };

  const nextRound = () => {
    if (currentRound >= 4) { // 5 rounds total (0-4)
       setGameState('result');
       
       if (currentUser) {
         // Add points to user profile
         addPoints(totalScoreRef.current);
         // Badge Check: Loyal Fan (Played a full game)
         awardBadge(currentUser.id, 'b5'); // 'b5' is Loyal Fan
       }
    } else {
       setCurrentRound(prev => prev + 1);
       startRound();
    }
  };

  return (
    <div 
      className="max-w-4xl mx-auto pt-20 pb-24 px-4 min-h-screen flex flex-col items-center justify-center select-none"
      onContextMenu={(e) => e.preventDefault()}
    >
      
      {gameState === 'lobby' && (
        <div className="text-center animate-fade-in-up">
           <div className="w-24 h-24 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-purple-500/50 shadow-[0_0_30px_rgba(147,51,234,0.3)] animate-float">
              <Gamepad2 size={48} className="text-purple-500" />
           </div>
           <h1 className="text-4xl font-black font-mono tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
             {t('game_title')}
           </h1>
           <p className="text-slate-400 mb-8 max-w-md mx-auto">{t('game_subtitle')}</p>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-lg mx-auto">
              <div className="bg-surface border border-white/10 p-4 rounded-xl hover:border-yellow-500/50 transition-colors group">
                 <div className="text-yellow-400 mb-2 flex justify-center group-hover:scale-110 transition-transform"><Award size={24}/></div>
                 <div className="text-[10px] uppercase font-bold text-slate-500">Flash Ear</div>
              </div>
              <div className="bg-surface border border-white/10 p-4 rounded-xl hover:border-pink-500/50 transition-colors group">
                 <div className="text-pink-500 mb-2 flex justify-center group-hover:scale-110 transition-transform"><Award size={24}/></div>
                 <div className="text-[10px] uppercase font-bold text-slate-500">Day One</div>
              </div>
              <div className="bg-surface border border-white/10 p-4 rounded-xl hover:border-blue-500/50 transition-colors group">
                 <div className="text-blue-400 mb-2 flex justify-center group-hover:scale-110 transition-transform"><Award size={24}/></div>
                 <div className="text-[10px] uppercase font-bold text-slate-500">Vibe Check</div>
              </div>
              <div className="bg-surface border border-white/10 p-4 rounded-xl hover:border-amber-500/50 transition-colors group">
                 <div className="text-amber-500 mb-2 flex justify-center group-hover:scale-110 transition-transform"><Crown size={24}/></div>
                 <div className="text-[10px] uppercase font-bold text-slate-500">Score King</div>
              </div>
           </div>

           <Button size="lg" onClick={startGame} className="bg-purple-600 hover:bg-purple-500 shadow-purple-900/20 px-12">
              {t('game_play_btn')}
           </Button>
        </div>
      )}

      {gameState === 'playing' && currentTrack && (
        <div className="w-full max-w-xl animate-scale-in">
           {/* Header Stats */}
           <div className="flex justify-between items-center mb-8 bg-surface p-4 rounded-xl border border-white/5 shadow-lg">
              <div className="flex items-center gap-2">
                 <div className="text-xs text-slate-500 uppercase tracking-widest">{t('game_score')}</div>
                 <div className="text-xl font-bold font-mono text-purple-400">{score}</div>
              </div>
              <div className="flex items-center gap-2">
                 <div className="text-xs text-slate-500 uppercase tracking-widest">{t('game_round')}</div>
                 <div className="text-xl font-bold font-mono text-white">{currentRound + 1}/5</div>
              </div>
           </div>

           {/* UNIFIED PLAYER & VISUALIZER CONTAINER */}
           {/* This container holds both the YouTube iframe (bottom layer) and the Visualizer Overlay (top layer) */}
           <div className={`relative w-full aspect-video bg-black rounded-2xl overflow-hidden mb-8 shadow-2xl transition-all border-4 ${selectedOption ? (isCorrect ? 'border-green-500 shadow-green-900/20' : 'border-red-500 shadow-red-900/20') : 'border-white/10'}`}>
              
              {/* 1. YouTube Iframe - Always playing, covered by blur during game. pointer-events-none prevents clicking title/pausing */}
              <iframe 
                  key={currentTrack.youtubeId + currentRound}
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  // Added origin parameter and enablejsapi to ensure playback authorization on restricted videos
                  src={`https://www.youtube.com/embed/${currentTrack.youtubeId}?autoplay=1&start=30&controls=0&disablekb=1&fs=0&modestbranding=1&rel=0&iv_load_policy=3&origin=${window.location.origin}&enablejsapi=1`} 
                  title="Audio Player" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  tabIndex={-1}
              />

              {/* 2. Visualizer Overlay - Semi-transparent blur hides details/text but shows motion. Removed when guessed. */}
              {!selectedOption && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-md z-10 flex flex-col items-center justify-center p-6 select-none cursor-default">
                      {/* Visualizer Graphics */}
                      <div className="mb-4 flex justify-center">
                         <div className={`w-24 h-24 rounded-full border-4 border-slate-800 bg-slate-900/50 flex items-center justify-center shadow-[0_0_50px_rgba(168,85,247,0.2)] animate-spin-slow`}>
                            <Music size={32} className="text-white" />
                         </div>
                      </div>
                      
                      {/* Fake Equalizer Bars */}
                      <div className="h-12 mb-4 flex items-center justify-center w-full">
                          <div className="flex space-x-1 items-end h-8">
                              {[...Array(12)].map((_, i) => (
                                  <div 
                                     key={i} 
                                     className="w-1.5 bg-purple-500 rounded-t-sm animate-pulse" 
                                     style={{ 
                                         height: `${Math.random() * 100}%`,
                                         animationDuration: `${0.3 + Math.random() * 0.4}s`
                                     }}
                                  ></div>
                              ))}
                          </div>
                      </div>
                      
                      {/* Timer Bar */}
                      <div className="w-full max-w-[200px] h-2 bg-slate-800 rounded-full overflow-hidden relative">
                         <div 
                           className={`h-full transition-all duration-1000 ease-linear ${timeLeft <= 3 ? 'bg-red-500' : 'bg-purple-500'}`}
                           style={{ width: `${(timeLeft / 15) * 100}%` }}
                         ></div>
                      </div>
                      <div className={`mt-2 font-mono text-sm ${timeLeft <= 3 ? 'text-red-500' : 'text-purple-400'}`}>00:{String(timeLeft).padStart(2, '0')}</div>
                  </div>
              )}
           </div>

           {/* Feedback Message */}
           {selectedOption && (
             <div className={`text-center mb-6 font-bold text-xl font-mono animate-bounce ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                {isCorrect ? t('game_correct') : t('game_wrong')}
             </div>
           )}

           {/* Options Grid */}
           <div className="grid grid-cols-1 gap-3">
              {options.map((option, idx) => {
                 let btnClass = "bg-surface hover:bg-surface-highlight border-white/10";
                 
                 // Result State Styling
                 if (selectedOption) {
                    if (option === currentTrack.title) {
                        btnClass = "bg-green-600 border-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.4)]"; // Show correct
                    } else if (option === selectedOption && !isCorrect) {
                        btnClass = "bg-red-600 border-red-500 text-white"; // Show wrong selection
                    } else {
                        btnClass = "bg-surface border-white/5 opacity-30"; // Fade others
                    }
                 }

                 return (
                   <button 
                     key={idx}
                     onClick={() => handleGuess(option)}
                     disabled={!!selectedOption}
                     className={`w-full p-4 rounded-xl border font-bold text-left transition-all transform ${!selectedOption && 'active:scale-[0.98]'} ${btnClass}`}
                   >
                     <div className="flex justify-between items-center">
                        <span>{option}</span>
                        {selectedOption && option === currentTrack.title && <CheckCircle2 size={16}/>}
                        {selectedOption && option === selectedOption && option !== currentTrack.title && <XCircle size={16}/>}
                     </div>
                   </button>
                 );
              })}
           </div>
        </div>
      )}

      {gameState === 'result' && (
        <div className="text-center animate-fade-in-up">
           <h2 className="text-3xl font-bold text-white mb-2">{t('game_game_over')}</h2>
           <div className="text-6xl font-black font-mono text-purple-500 mb-8">{score} PTS</div>
           
           <div className="bg-surface border border-white/10 p-6 rounded-xl mb-8 max-w-md mx-auto">
              <h3 className="text-sm uppercase font-bold text-slate-500 mb-4">Badges Progress</h3>
              <div className="space-y-4">
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <div className="p-2 bg-yellow-500/20 rounded text-yellow-500"><Award size={16}/></div>
                       <div className="text-sm font-bold">Flash Ear</div>
                    </div>
                    {currentUser?.badges?.includes('b4') ? <CheckCircle2 size={18} className="text-green-500"/> : <div className="text-xs text-slate-500">Locked</div>}
                 </div>
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <div className="p-2 bg-pink-500/20 rounded text-pink-500"><Award size={16}/></div>
                       <div className="text-sm font-bold">Day One</div>
                    </div>
                    {currentUser?.badges?.includes('b5') ? <CheckCircle2 size={18} className="text-green-500"/> : <div className="text-xs text-slate-500">Locked</div>}
                 </div>
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <div className="p-2 bg-amber-500/20 rounded text-amber-500"><Crown size={16}/></div>
                       <div className="text-sm font-bold">Score King (10k Pts)</div>
                    </div>
                    {currentUser?.badges?.includes('b7') ? <CheckCircle2 size={18} className="text-green-500"/> : <div className="text-xs text-slate-500">{(currentUser?.points || 0).toLocaleString()} / 10,000</div>}
                 </div>
              </div>
           </div>

           <Button onClick={startGame} className="bg-white text-black hover:bg-slate-200">
              {t('game_play_again')}
           </Button>
        </div>
      )}

    </div>
  );
};