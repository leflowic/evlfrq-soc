
export type Language = 'en' | 'sr';

export type VerificationTier = 'none' | 'verified' | 'superstar' | 'staff';

export interface User {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  coverUrl: string;
  bio: string;
  location?: string;
  website?: string;
  followers: number;
  following: number;
  postsCount: number;
  verificationTier: VerificationTier;
  gallery: string[]; // URLs for studio/gear photos
  badges?: string[]; // IDs of badges
  isBanned?: boolean;
  points?: number; // Total points earned from games/interactions
}

export type BadgeType = 'tournament_winner' | 'og_member' | 'trendsetter' | 'verified_pro' | 'custom' | 'fast_listener' | 'loyal_fan' | 'rhythm_commenter' | 'point_collector';

export interface UserBadge {
  id: string;
  type: BadgeType;
  name: string;
  description: string;
  icon: string; // Lucide icon name or emoji
  color: string;
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  avatarUrl: string;
  text: string;
  timestamp: string;
  verificationTier?: VerificationTier;
}

export interface Post {
  id: string;
  userId: string;
  user: User;
  title: string;
  coverArtUrl: string;
  audioDuration: number; // in seconds
  bpm: number;
  key: string;
  genre: string;
  software?: string; // e.g., 'FL Studio', 'Ableton'
  caption: string;
  hashtags: string[];
  likes: number;
  commentsCount: number;
  shares: number;
  createdAt: string;
  likedByCurrentUser: boolean;
  savedByCurrentUser: boolean;
  comments: Comment[];
  isFeatured?: boolean;
  youtubeId?: string; // ID for the YouTube video (e.g., "jfKfPfyJRdk")
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention' | 'badge_earned';
  actor: User;
  postId?: string;
  message?: string;
  read: boolean;
  time: string;
}

// Tournament Types
export interface TournamentMatch {
  id: string;
  player1: User;
  player2: User;
  score1: number;
  score2: number;
  winnerId?: string;
  status: 'pending' | 'active' | 'completed';
}

export interface TournamentRound {
  id: string;
  name: string; // "Round of 16", "Quarterfinals"
  matches: TournamentMatch[];
}

export interface Tournament {
  id: string;
  title: string;
  status: 'registration' | 'active' | 'completed';
  prizePool: string;
  entryFee: string;
  participantsCount: number;
  maxParticipants: number;
  startDate: string;
  description: string;
  rounds: TournamentRound[];
  coverImage: string;
}

export interface SystemMessage {
  id: string;
  text: string;
  type: 'info' | 'warning' | 'error' | 'success';
  active: boolean;
}

export enum ViewState {
  LANDING,
  AUTH,
  FEED,
  EXPLORE,
  PROFILE,
  UPLOAD,
  NOTIFICATIONS,
  MESSAGES,
  POST_DETAIL,
  DASHBOARD,
  TOURNAMENTS,
  ADMIN,
  GAME
}
