
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Post, Notification, ViewState, Language, VerificationTier, Tournament, BadgeType, SystemMessage, UserBadge } from '../types';
import { CURRENT_USER, MOCK_USERS, MOCK_POSTS, MOCK_NOTIFICATIONS, TRANSLATIONS, MOCK_TOURNAMENTS, BADGE_DEFINITIONS } from '../constants';

interface AppContextType {
  currentUser: User | null;
  posts: Post[];
  notifications: Notification[];
  view: ViewState;
  setView: (view: ViewState) => void;
  authMode: 'login' | 'signup';
  setAuthMode: (mode: 'login' | 'signup') => void;
  login: (username?: string) => void;
  logout: () => void;
  updateUserProfile: (updates: Partial<User>) => void;
  toggleLike: (postId: string) => void;
  toggleSave: (postId: string) => void;
  addPost: (post: Post) => void;
  currentlyPlayingId: string | null;
  setCurrentlyPlayingId: (id: string | null) => void;
  
  // Navigation & Selection
  selectedUser: User | null;
  selectedPost: Post | null;
  viewProfile: (userId: string) => void;
  viewPost: (postId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  addComment: (postId: string, text: string) => void;
  markNotificationRead: (id: string) => void;
  
  // Tournament
  tournaments: Tournament[];
  joinTournament: (tournamentId: string, postId: string) => void;
  voteTournamentMatch: (tournamentId: string, matchId: string, playerId: string) => void;
  
  // Admin & System
  allUsers: User[];
  systemMessage: SystemMessage | null;
  availableBadges: Record<string, UserBadge>;
  adminSetVerification: (userId: string, tier: VerificationTier) => void;
  adminBanUser: (userId: string, isBanned: boolean) => void;
  adminAssignBadge: (userId: string, badgeId: string) => void;
  adminCreateBadge: (badge: UserBadge) => void;
  adminDeletePost: (postId: string) => void;
  adminFeaturePost: (postId: string, isFeatured: boolean) => void;
  adminCreateTournament: (tournament: Tournament) => void;
  adminAdvanceTournament: (tournamentId: string) => void;
  adminBroadcastMessage: (text: string, type: SystemMessage['type']) => void;
  adminClearBroadcast: () => void;
  awardBadge: (userId: string, badgeId: string) => void;
  addPoints: (amount: number) => void;

  // i18n
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof TRANSLATIONS['en']) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [view, setView] = useState<ViewState>(ViewState.LANDING);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>('sr');
  
  // Data for Admin (mock database)
  const [allUsers, setAllUsers] = useState<User[]>(MOCK_USERS);
  const [systemMessage, setSystemMessage] = useState<SystemMessage | null>(null);
  const [availableBadges, setAvailableBadges] = useState<Record<string, UserBadge>>(BADGE_DEFINITIONS);
  
  // Navigation State
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Tournament State (Live)
  const [tournaments, setTournaments] = useState<Tournament[]>(MOCK_TOURNAMENTS);

  // SIMULATE LIVE VOTES
  useEffect(() => {
    const interval = setInterval(() => {
      setTournaments(prevTournaments => {
        return prevTournaments.map(t => {
          if (t.status !== 'active') return t;
          
          return {
            ...t,
            rounds: t.rounds.map(r => ({
              ...r,
              matches: r.matches.map(m => {
                if (m.status === 'active') {
                   // Randomly add votes to simulate live activity
                   const voteP1 = Math.random() > 0.7 ? 1 : 0;
                   const voteP2 = Math.random() > 0.7 ? 1 : 0;
                   return {
                     ...m,
                     score1: m.score1 + voteP1,
                     score2: m.score2 + voteP2
                   };
                }
                return m;
              })
            }))
          };
        });
      });
    }, 2000); // Updates every 2 seconds

    return () => clearInterval(interval);
  }, []);

  const t = (key: keyof typeof TRANSLATIONS['en']) => {
    return TRANSLATIONS[language][key] || key;
  };

  const login = (username?: string) => {
    if (username) {
      // Create new session for signup
      const newUser: User = {
        id: `u_${Date.now()}`,
        username: username,
        displayName: username,
        avatarUrl: `https://ui-avatars.com/api/?name=${username}&background=random`,
        coverUrl: 'https://picsum.photos/800/300',
        bio: 'New producer in town.',
        followers: 0,
        following: 0,
        postsCount: 0,
        verificationTier: 'none', // Default to none
        gallery: [],
        points: 0
      };
      setCurrentUser(newUser);
      setAllUsers([...allUsers, newUser]);
    } else {
      // Default login as admin/mike
      setCurrentUser(CURRENT_USER);
    }
    
    setView(ViewState.FEED);
    window.scrollTo(0, 0);
  };

  const logout = () => {
    setCurrentUser(null);
    setView(ViewState.LANDING);
    setCurrentlyPlayingId(null);
  };

  const updateUserProfile = (updates: Partial<User>) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, ...updates };
    setCurrentUser(updatedUser);
    setAllUsers(prev => prev.map(u => u.id === currentUser.id ? updatedUser : u));
  };
  
  const awardBadge = (userId: string, badgeId: string) => {
    setAllUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const currentBadges = u.badges || [];
        if (!currentBadges.includes(badgeId)) {
          // New badge earned!
          const badgeDef = availableBadges[badgeId];
          
          // If it's the current user, trigger a notification
          if (currentUser && u.id === currentUser.id) {
             const newNotification: Notification = {
                id: `n_b_${Date.now()}`,
                type: 'badge_earned',
                actor: u,
                message: `${t('game_earned_badge')} ${badgeDef.name}`,
                read: false,
                time: 'Just now'
             };
             setNotifications(prevN => [newNotification, ...prevN]);
          }
          
          return { ...u, badges: [...currentBadges, badgeId] };
        }
      }
      return u;
    }));
    
    // Update current user if matches
    if (currentUser?.id === userId) {
        const currentBadges = currentUser.badges || [];
        if (!currentBadges.includes(badgeId)) {
             setCurrentUser(prev => prev ? { ...prev, badges: [...currentBadges, badgeId] } : null);
        }
    }
  };
  
  const addPoints = (amount: number) => {
    if (!currentUser) return;
    const newPoints = (currentUser.points || 0) + amount;
    
    updateUserProfile({ points: newPoints });
    
    // Check for "Score King" (10,000 points)
    if (newPoints >= 10000) {
      awardBadge(currentUser.id, 'b7');
    }
  };

  const toggleLike = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likedByCurrentUser: !post.likedByCurrentUser,
          likes: post.likedByCurrentUser ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
    
    // Also update selected post if it matches
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost(prev => prev ? ({
          ...prev,
          likedByCurrentUser: !prev.likedByCurrentUser,
          likes: prev.likedByCurrentUser ? prev.likes - 1 : prev.likes + 1
      }) : null);
    }
  };

  const toggleSave = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          savedByCurrentUser: !post.savedByCurrentUser
        };
      }
      return post;
    }));
  };

  const addPost = (post: Post) => {
    setPosts([post, ...posts]);
    setView(ViewState.FEED);
    window.scrollTo(0, 0);
  };

  const viewProfile = (userId: string) => {
    const user = allUsers.find(u => u.id === userId) || currentUser;
    if (user) {
      setSelectedUser(user);
      setView(ViewState.PROFILE);
      window.scrollTo(0, 0);
    }
  };

  const viewPost = (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (post) {
      setSelectedPost(post);
      setView(ViewState.POST_DETAIL);
      window.scrollTo(0, 0);
    }
  };

  const addComment = (postId: string, text: string) => {
    if (!currentUser) return;
    
    const newComment = {
      id: `c_${Date.now()}`,
      userId: currentUser.id,
      username: currentUser.username,
      avatarUrl: currentUser.avatarUrl,
      text: text,
      timestamp: 'Just now',
      verificationTier: currentUser.verificationTier
    };

    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, newComment],
          commentsCount: post.commentsCount + 1
        };
      }
      return post;
    }));

    // Update selected post logic
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost(prev => prev ? ({
        ...prev,
        comments: [...prev.comments, newComment],
        commentsCount: prev.commentsCount + 1
      }) : null);
    }

    // Award Badge: Rhythm Commenter (Simulated check)
    awardBadge(currentUser.id, 'b6');
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };
  
  const joinTournament = (tournamentId: string, postId: string) => {
    // Simulate updating count
    setTournaments(prev => prev.map(t => {
      if (t.id === tournamentId) {
        return { ...t, participantsCount: t.participantsCount + 1 };
      }
      return t;
    }));
  };

  const voteTournamentMatch = (tournamentId: string, matchId: string, playerId: string) => {
    setTournaments(prev => prev.map(t => {
      if (t.id !== tournamentId) return t;

      return {
        ...t,
        rounds: t.rounds.map(r => ({
          ...r,
          matches: r.matches.map(m => {
            if (m.id !== matchId) return m;
            
            // Increment score
            if (m.player1.id === playerId) {
              return { ...m, score1: m.score1 + 1 };
            } else {
              return { ...m, score2: m.score2 + 1 };
            }
          })
        }))
      };
    }));
  };

  // ADMIN ACTIONS
  const adminSetVerification = (userId: string, tier: VerificationTier) => {
    setAllUsers(prev => prev.map(u => u.id === userId ? { ...u, verificationTier: tier } : u));
    // Also update current user if it's them
    if (currentUser?.id === userId) {
      setCurrentUser(prev => prev ? { ...prev, verificationTier: tier } : null);
    }
  };

  const adminBanUser = (userId: string, isBanned: boolean) => {
    setAllUsers(prev => prev.map(u => u.id === userId ? { ...u, isBanned } : u));
  };
  
  const adminAssignBadge = (userId: string, badgeId: string) => {
     setAllUsers(prev => prev.map(u => {
        if (u.id === userId) {
           const currentBadges = u.badges || [];
           if (currentBadges.includes(badgeId)) {
             // Toggle off
             return { ...u, badges: currentBadges.filter(b => b !== badgeId) };
           } else {
             // Toggle on
             return { ...u, badges: [...currentBadges, badgeId] };
           }
        }
        return u;
     }));
  };

  const adminCreateBadge = (badge: UserBadge) => {
    setAvailableBadges(prev => ({
      ...prev,
      [badge.id]: badge
    }));
  };

  const adminDeletePost = (postId: string) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
  };

  const adminFeaturePost = (postId: string, isFeatured: boolean) => {
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, isFeatured } : p));
  };
  
  const adminCreateTournament = (tournament: Tournament) => {
     setTournaments([...tournaments, tournament]);
  };

  const adminAdvanceTournament = (tournamentId: string) => {
    setTournaments(prev => prev.map(t => {
      if (t.id !== tournamentId) return t;
      if (t.status === 'registration') return { ...t, status: 'active', startDate: 'Live Now' };
      if (t.status === 'active') return { ...t, status: 'completed' };
      return t;
    }));
  };

  const adminBroadcastMessage = (text: string, type: SystemMessage['type']) => {
    setSystemMessage({
      id: `sys_${Date.now()}`,
      text,
      type,
      active: true
    });
  };

  const adminClearBroadcast = () => {
    setSystemMessage(null);
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      posts,
      notifications,
      view,
      setView,
      authMode,
      setAuthMode,
      login,
      logout,
      updateUserProfile,
      toggleLike,
      toggleSave,
      addPost,
      currentlyPlayingId,
      setCurrentlyPlayingId,
      selectedUser,
      selectedPost,
      viewProfile,
      viewPost,
      searchQuery,
      setSearchQuery,
      addComment,
      markNotificationRead,
      joinTournament,
      tournaments,
      voteTournamentMatch,
      language,
      setLanguage,
      t,
      // Admin
      allUsers,
      systemMessage,
      availableBadges,
      adminSetVerification,
      adminBanUser,
      adminAssignBadge,
      adminCreateBadge,
      adminDeletePost,
      adminFeaturePost,
      adminCreateTournament,
      adminAdvanceTournament,
      adminBroadcastMessage,
      adminClearBroadcast,
      awardBadge,
      addPoints
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};