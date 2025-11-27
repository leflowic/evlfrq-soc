
// ... existing imports
import { Post, User, Notification, Language, Tournament, UserBadge } from './types';

// Updated Mock Users with 3 Levels of Verification
export const CURRENT_USER: User = {
  id: 'u1',
  username: 'evil_admin',
  displayName: 'Mike The Maker',
  avatarUrl: 'https://picsum.photos/id/64/200/200',
  coverUrl: 'https://picsum.photos/id/48/800/300',
  bio: 'Lead Developer @ EVLFRQ. Making beats since 2010. FL Studio veteran.',
  location: 'Belgrade, Serbia',
  website: 'evlfrq.com',
  followers: 1250,
  following: 420,
  postsCount: 15,
  verificationTier: 'staff', // Level 3: Red (Staff)
  gallery: [
    'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1598653222000-6b7b7a552625?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1516280440614-6697288d5d38?auto=format&fit=crop&q=80&w=600'
  ],
  badges: ['b1', 'b2'],
  points: 12500
};

export const BADGE_DEFINITIONS: Record<string, UserBadge> = {
  'b1': { id: 'b1', type: 'tournament_winner', name: 'Winter Clash Champion', description: 'Winner of Winter Clash 2024', icon: 'trophy', color: 'text-yellow-400' },
  'b2': { id: 'b2', type: 'og_member', name: 'Original Frequency', description: 'Joined during Beta', icon: 'zap', color: 'text-blue-400' },
  'b3': { id: 'b3', type: 'trendsetter', name: 'Trendsetter', description: 'Had a post reach #1 Trending', icon: 'flame', color: 'text-red-500' },
  // New Fan Badges
  'b4': { id: 'b4', type: 'fast_listener', name: 'Flash Ear', description: 'Identified a track in under 2 seconds', icon: 'zap', color: 'text-yellow-300' },
  'b5': { id: 'b5', type: 'loyal_fan', name: 'Day One Fan', description: 'Streamed over 100 tracks', icon: 'heart', color: 'text-pink-500' },
  'b6': { id: 'b6', type: 'rhythm_commenter', name: 'Vibe Checker', description: 'Active community feedback', icon: 'message-circle', color: 'text-blue-300' },
  // Point Badge
  'b7': { id: 'b7', type: 'point_collector', name: 'Score King', description: 'Accumulated 10,000 points in Arcade', icon: 'crown', color: 'text-amber-500' },
};

const GENRES = ['Trap', 'Lo-Fi', 'Hip Hop', 'House', 'Techno', 'Drill', 'R&B'];
const KEYS = ['Cm', 'Am', 'F#m', 'Gm', 'Eb', 'Bm'];
const DAWS = ['FL Studio', 'Ableton Live', 'Logic Pro', 'Pro Tools', 'Reason'];
const YT_IDS = ['5yx6BWlEVcY', 'jfKfPfyJRdk', 'C92JtA5uQj4', 'lTRiuFIWV54', 'D9G1VOjN_84', 'hC8CH0Z3L54', 'cgJ26K72Eag', 'm7Bc3pLyij0'];

// CURATED GAME TRACKS (Updated with embed-safe 'Official Audio' or 'Lyric' versions to fix Error 153)
export const GAME_TRACKS = [
  { title: "The Weeknd - Blinding Lights", youtubeId: "fHI8X4OXluQ" }, // Official Audio
  { title: "Daft Punk - Get Lucky", youtubeId: "5NV6Rdv1a3I" }, // Official Audio
  { title: "Pharrell Williams - Happy", youtubeId: "ZbZSe6N_HXs" }, // Official Video (Usually safe)
  { title: "OutKast - Hey Ya!", youtubeId: "PWgvGjAhvIw" }, // Official Video (Usually safe)
  { title: "Rick Astley - Never Gonna Give You Up", youtubeId: "dQw4w9WgXcQ" }, // Official Video (Always Safe)
  { title: "Toto - Africa", youtubeId: "FTQbiNvZqaY" }, // Official Audio
  { title: "A-ha - Take On Me", youtubeId: "djV11Xbc914" }, // Official Video
  { title: "Queen - Bohemian Rhapsody", youtubeId: "fJ9rUzIMcZQ" }, // Official Video
  { title: "Michael Jackson - Billie Jean", youtubeId: "Zi_XLOBDo_Y" }, // Official Audio
  { title: "Eminem - Lose Yourself", youtubeId: "_Yhyp-_hX2s" }, // Official Audio
  { title: "Foster The People - Pumped Up Kicks", youtubeId: "SDTZ7iX4vTQ" }, // Official Video
  { title: "Gnarls Barkley - Crazy", youtubeId: "bd2B6SjMh_w" }, // Official Video
  { title: "Journey - Don't Stop Believin'", youtubeId: "1k8craCGpgs" }, // Official Audio
  { title: "Earth, Wind & Fire - September", youtubeId: "Gs069dndIYk" }, // Official Video
  { title: "Gorillaz - Feel Good Inc.", youtubeId: "HyHNuVaZJ-k" }, // Official Video
  { title: "Arctic Monkeys - Do I Wanna Know?", youtubeId: "bpOSxM0rNPM" }, // Official Video
  { title: "Survivor - Eye of the Tiger", youtubeId: "btPJPFnesV4" }, // Official Video
  { title: "Bon Jovi - Livin' On A Prayer", youtubeId: "lDK9QqIzhwk" }, // Official Video
  { title: "Whitney Houston - I Wanna Dance With Somebody", youtubeId: "eH3giaIzONA" }, // Official Video
  { title: "Cyndi Lauper - Girls Just Want To Have Fun", youtubeId: "PIb6AZdTr-A" } // Official Video
];

export const MOCK_USERS: User[] = [
  { ...CURRENT_USER },
  {
    id: 'u2',
    username: 'beatwitch',
    displayName: 'Sarah Synth',
    avatarUrl: 'https://picsum.photos/id/65/200/200',
    coverUrl: 'https://picsum.photos/id/49/800/300',
    bio: 'Analog soul in a digital world.',
    followers: 8500,
    following: 120,
    postsCount: 82,
    verificationTier: 'verified', // Level 1: Blue (Standard)
    gallery: [],
    badges: ['b2', 'b4'],
    points: 8500
  },
  {
    id: 'u3',
    username: '808king',
    displayName: 'Marcus Bass',
    avatarUrl: 'https://picsum.photos/id/91/200/200',
    coverUrl: 'https://picsum.photos/id/50/800/300',
    bio: 'Multi-Platinum Producer. If it doesn\'t shake the trunk, I don\'t want it.',
    followers: 1500000, // Millions
    following: 50,
    postsCount: 45,
    verificationTier: 'superstar', // Level 2: Orange (Superstar)
    gallery: [],
    badges: ['b3', 'b5'],
    points: 42000
  },
  {
    id: 'u4',
    username: 'lofi_girl_fan',
    displayName: 'Chill Vibes',
    avatarUrl: 'https://picsum.photos/id/103/200/200',
    coverUrl: 'https://picsum.photos/id/51/800/300',
    bio: 'Study beats and tea.',
    followers: 12000,
    following: 20,
    postsCount: 150,
    verificationTier: 'none',
    gallery: [],
    points: 3200
  },
  {
    id: 'u5',
    username: 'driller',
    displayName: 'UK Drillaz',
    avatarUrl: 'https://picsum.photos/id/338/200/200',
    coverUrl: 'https://picsum.photos/id/52/800/300',
    bio: 'London sound.',
    followers: 5000,
    following: 100,
    postsCount: 30,
    verificationTier: 'none',
    gallery: [],
    points: 1500
  },
  {
    id: 'u6',
    username: 'metro_fan',
    displayName: 'Boomin Want Some',
    avatarUrl: 'https://picsum.photos/id/334/200/200',
    coverUrl: 'https://picsum.photos/id/53/800/300',
    bio: 'Trust me.',
    followers: 200,
    following: 500,
    postsCount: 5,
    verificationTier: 'none',
    gallery: [],
    points: 200
  },
  {
    id: 'u7',
    username: 'techno_bunker',
    displayName: 'Berlin Deep',
    avatarUrl: 'https://picsum.photos/id/400/200/200',
    coverUrl: 'https://picsum.photos/id/54/800/300',
    bio: 'Underground sounds only.',
    followers: 8900,
    following: 40,
    postsCount: 120,
    verificationTier: 'verified',
    gallery: [],
    badges: [],
    points: 5600
  },
  {
    id: 'u8',
    username: 'hyperpop_princess',
    displayName: 'Glitched Out',
    avatarUrl: 'https://picsum.photos/id/401/200/200',
    coverUrl: 'https://picsum.photos/id/55/800/300',
    bio: '100 gecs type beat.',
    followers: 3400,
    following: 800,
    postsCount: 12,
    verificationTier: 'none',
    gallery: [],
    badges: [],
    points: 1100
  }
];

export const MOCK_POSTS: Post[] = Array.from({ length: 15 }).map((_, i) => {
  const user = MOCK_USERS[Math.floor(Math.random() * MOCK_USERS.length)];
  return {
    id: `p${i}`,
    userId: user.id,
    user: user,
    title: `Project_V${i + 1}_Final_Final`,
    coverArtUrl: `https://picsum.photos/id/${10 + i}/600/600`,
    audioDuration: 120 + Math.floor(Math.random() * 180),
    bpm: 80 + Math.floor(Math.random() * 80),
    key: KEYS[Math.floor(Math.random() * KEYS.length)],
    genre: GENRES[Math.floor(Math.random() * GENRES.length)],
    software: DAWS[Math.floor(Math.random() * DAWS.length)],
    caption: 'Cooked this up last night. What do you think about the snare placement? 🔥🎹',
    hashtags: ['#producer', '#beats', '#flstudio', '#newmusic'],
    likes: Math.floor(Math.random() * 500),
    commentsCount: Math.floor(Math.random() * 50),
    shares: Math.floor(Math.random() * 20),
    createdAt: `${Math.floor(Math.random() * 23) + 1}h ago`,
    likedByCurrentUser: Math.random() > 0.8,
    savedByCurrentUser: Math.random() > 0.9,
    isFeatured: Math.random() > 0.95,
    youtubeId: YT_IDS[i % YT_IDS.length], // Assign random real YouTube ID
    comments: [
      {
        id: `c${i}_1`,
        userId: 'u2',
        username: 'beatwitch',
        avatarUrl: 'https://picsum.photos/id/65/200/200',
        text: 'That bassline is nasty! 😤',
        timestamp: '2h',
        verificationTier: 'verified'
      }
    ]
  };
});

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    type: 'like',
    actor: MOCK_USERS[1],
    postId: 'p1',
    message: 'liked your beat "Midnight Run"',
    read: false,
    time: '2m ago'
  },
  {
    id: 'n2',
    type: 'comment',
    actor: MOCK_USERS[2], // Superstar
    postId: 'p3',
    message: 'commented: "This is fire! 🔥"',
    read: false,
    time: '1h ago'
  },
  {
    id: 'n3',
    type: 'follow',
    actor: MOCK_USERS[3],
    message: 'started following you',
    read: true,
    time: '1d ago'
  }
];

export const MOCK_TOURNAMENTS: Tournament[] = [
  {
    id: 't1',
    title: 'WINTER CLASH 2024',
    status: 'active',
    prizePool: '$1,000 + VST Bundle',
    entryFee: 'FREE',
    participantsCount: 16,
    maxParticipants: 16,
    startDate: 'Started 2 days ago',
    description: 'The ultimate beat battle for Trap producers. 16 producers enter, 1 leaves with the bag.',
    coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1000',
    rounds: [
      {
        id: 'r1',
        name: 'Quarterfinals',
        matches: [
          { id: 'm1', player1: MOCK_USERS[1], player2: MOCK_USERS[2], score1: 450, score2: 620, winnerId: 'u3', status: 'completed' },
          { id: 'm2', player1: MOCK_USERS[3], player2: MOCK_USERS[4], score1: 300, score2: 210, winnerId: 'u4', status: 'completed' },
          { id: 'm3', player1: MOCK_USERS[5], player2: MOCK_USERS[1], score1: 0, score2: 0, status: 'active' },
          { id: 'm4', player1: MOCK_USERS[2], player2: MOCK_USERS[3], score1: 0, score2: 0, status: 'active' },
        ]
      },
      {
        id: 'r2',
        name: 'Semifinals',
        matches: [
          { id: 'm5', player1: MOCK_USERS[2], player2: MOCK_USERS[3], score1: 0, score2: 0, status: 'pending' },
          { id: 'm6', player1: { ...MOCK_USERS[0], displayName: 'TBD' }, player2: { ...MOCK_USERS[0], displayName: 'TBD' }, score1: 0, score2: 0, status: 'pending' }
        ]
      },
      {
        id: 'r3',
        name: 'Grand Finals',
        matches: [
          { id: 'm7', player1: { ...MOCK_USERS[0], displayName: 'TBD' }, player2: { ...MOCK_USERS[0], displayName: 'TBD' }, score1: 0, score2: 0, status: 'pending' }
        ]
      }
    ]
  },
  {
    id: 't2',
    title: 'LO-FI SUNDAYS',
    status: 'registration',
    prizePool: '$250',
    entryFee: 'FREE',
    participantsCount: 8,
    maxParticipants: 32,
    startDate: 'Starts in 4 days',
    description: 'Chill vibes only. Submit your smoothest Lo-Fi track.',
    coverImage: 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?auto=format&fit=crop&q=80&w=1000',
    rounds: []
  }
];

export const TRANSLATIONS = {
  en: {
    // Navbar
    nav_feed: "Feed",
    nav_discover: "Discover",
    nav_upload: "Upload",
    nav_messages: "Messages",
    nav_notifications: "Notifications",
    nav_profile: "Profile",
    nav_dashboard: "Dashboard", // Changed from "Studio Panel"
    nav_tournaments: "Tournaments",
    nav_admin: "Admin",
    nav_game: "Arcade",
    nav_search_placeholder: "SEARCH_DB...",
    
    // Landing
    landing_login: "Log In",
    landing_signup: "Sign Up",
    landing_version: "V 1.0.0 NOW LIVE",
    landing_title_prefix: "EVL",
    landing_title_suffix: "FRQ",
    landing_subtitle: "A dedicated frequency for producers. Share projects, visualize stems, and collaborate in real-time.",
    landing_enter: "Enter Frequency",
    landing_demo: "View Demo",
    landing_feature_1_title: "Waveform Viz",
    landing_feature_1_desc: "High-fidelity audio visualization rendered natively in the browser.",
    landing_feature_2_title: "Sync & Collab",
    landing_feature_2_desc: "Find your missing track. Match by Key, BPM, and Vibe instantly.",
    landing_feature_3_title: "Signal Boost",
    landing_feature_3_desc: "Algorithmic discovery tuned for raw talent and production quality.",
    landing_footer: "© 2024 EVLFRQ. Audio Engine Active.",

    // Auth
    auth_welcome_back: "EVLFRQ Access",
    auth_join: "Join EVLFRQ",
    auth_email_placeholder: "producer@evlfrq.com",
    auth_password_placeholder: "••••••••",
    auth_username_placeholder: "stage_name",
    auth_remember: "Keep me logged in",
    auth_forgot: "Forgot password?",
    auth_signin_btn: "Initialize Session",
    auth_signup_btn: "Create Artist ID",
    auth_or: "OR CONNECT WITH",
    auth_no_account: "No access key?",
    auth_have_account: "Already have an ID?",
    auth_switch_signup: "Register Now",
    auth_switch_login: "Log In",

    // Feed
    feed_add_beat: "Add Beat",
    feed_end: "You've reached the end of the tape 📼",
    
    // Post Card
    post_stems: "STEMS",
    post_collab: "COLLAB",
    post_copied: "Copied",
    
    // Profile
    profile_edit: "Edit Profile",
    profile_connect: "Connect",
    profile_connected: "Connected",
    profile_tracks: "Tracks",
    profile_followers: "Followers",
    profile_following: "Following",
    profile_tab_discog: "Discography",
    profile_tab_placements: "Placements",
    profile_tab_collabs: "Collabs",
    profile_studio_gallery: "Studio Gear",
    
    // Dashboard
    dash_title: "Dashboard", // Changed from "Studio Control Panel"
    dash_tab_overview: "Overview",
    dash_tab_studio: "My Studio",
    dash_tab_settings: "Settings",
    dash_stats_plays: "Total Plays",
    dash_stats_downloads: "Downloads",
    dash_stats_followers: "New Followers",
    dash_stats_likes: "Total Likes",
    dash_activity: "Recent Activity",
    dash_settings_social: "Social Links",
    dash_settings_notifications: "Notifications",
    dash_settings_account: "Account Security",
    dash_stats_revenue: "Revenue",
    dash_upload_gear: "Upload Studio Photo",
    dash_profile_info: "Profile Information",
    dash_save_changes: "Save Changes",
    dash_saved: "Saved",
    dash_name: "Display Name",
    dash_bio: "Bio",
    dash_location: "Location",
    
    // Upload
    upload_title: "Upload New Beat",
    upload_drag: "Drag audio here or click to browse",
    upload_cover: "Upload Cover Art",
    upload_label_title: "TITLE",
    upload_label_bpm: "BPM",
    upload_label_key: "KEY",
    upload_label_caption: "CAPTION",
    upload_ai_generate: "AI Generate",
    upload_thinking: "Thinking...",
    upload_submit: "Share to Feed",
    upload_placeholder_title: "Project Name",
    upload_placeholder_caption: "Tell the story behind this beat...",
    
    // Discover
    discover_title: "Discover",
    discover_search_placeholder: "Search artists, beats, or sounds...",
    discover_results: "Search Results",
    discover_no_results: "No results found for",
    discover_genres: "Browse by Genre",
    discover_trending: "Trending Now",
    discover_producers: "Producers on the Rise",
    discover_see_all: "See All",
    discover_follow: "Follow",
    
    // Notifications
    notifications_title: "Notifications",
    notifications_empty: "No notifications yet.",
    
    // Messages
    messages_title: "Messages",
    messages_search: "Search messages",
    messages_type_placeholder: "Type a message...",
    messages_select_chat: "Select a chat to start messaging",
    messages_your_messages: "Your Messages",
    messages_back: "Back",
    messages_online: "Online",
    
    // Post Detail
    post_detail_back: "Back to Feed",
    post_detail_comments: "Comments",
    post_detail_add_comment: "Add a comment...",
    post_detail_no_comments: "No comments yet. Be the first to vibe!",

    // Tournaments
    tourn_title: "Beat Tournaments",
    tourn_active: "Active",
    tourn_registration: "Registration Open",
    tourn_prize: "Prize Pool",
    tourn_fee: "Entry Fee",
    tourn_apply: "Register Beat",
    tourn_view_bracket: "View Bracket",
    tourn_modal_title: "Select Submission",
    tourn_modal_desc: "Choose one of your uploaded beats to enter this tournament.",
    tourn_apply_success: "Application Submitted!",
    tourn_bracket_title: "Tournament Bracket",

    // Admin
    admin_title: "System Administration",
    admin_tab_dashboard: "Dashboard",
    admin_tab_users: "User Management",
    admin_tab_tournaments: "Tournaments",
    admin_tab_content: "Content Moderation",
    admin_tab_badges: "Badge Factory",
    admin_tab_system: "System Control",
    admin_action_ban: "Ban User",
    admin_action_unban: "Unban User",
    admin_action_verify: "Set Verification",
    admin_action_badge: "Award Badge",
    admin_action_delete: "Delete Post",
    admin_action_feature: "Feature Post",
    admin_action_create_tourn: "Create Tournament",
    admin_create_tourn_title: "New Tournament",

    // Game
    game_title: "Sonic Instinct",
    game_subtitle: "Test your ears. Guess the beat. Earn badges.",
    game_play_btn: "Start Challenge",
    game_score: "Score",
    game_time: "Time",
    game_round: "Round",
    game_correct: "Correct!",
    game_wrong: "Wrong!",
    game_game_over: "Session Ended",
    game_final_score: "Final Score",
    game_play_again: "Replay Session",
    game_earned_badge: "Badge Unlocked!",
    
    // Common
    common_search: "Search"
  },
  sr: {
    // Navbar
    nav_feed: "Feed",
    nav_discover: "Discover",
    nav_upload: "Upload",
    nav_messages: "Messages",
    nav_notifications: "Notifications",
    nav_profile: "Profile",
    nav_dashboard: "Dashboard",
    nav_tournaments: "Tournaments",
    nav_admin: "Admin",
    nav_game: "Arcade",
    nav_search_placeholder: "Search...",
    
    // Landing
    landing_login: "Log In",
    landing_signup: "Sign Up",
    landing_version: "V 1.0.0 LIVE",
    landing_title_prefix: "EVL",
    landing_title_suffix: "FRQ",
    landing_subtitle: "Platforma za producente. Deli projekte, vizualizuj stems i sarađuj u realnom vremenu.",
    landing_enter: "Uđi",
    landing_demo: "Demo",
    landing_feature_1_title: "Waveform Viz",
    landing_feature_1_desc: "Audio vizualizacija direktno u browseru.",
    landing_feature_2_title: "Sync & Collab",
    landing_feature_2_desc: "Pronađi svoj sound. Match po Key, BPM i vibe.",
    landing_feature_3_title: "Signal Boost",
    landing_feature_3_desc: "Algoritamski discovery za pravi talenat.",
    landing_footer: "© 2024 EVLFRQ. Audio Engine Active.",

    // Auth
    auth_welcome_back: "Dobrodošao nazad",
    auth_join: "Napravi nalog",
    auth_email_placeholder: "tvoj@email.com",
    auth_password_placeholder: "••••••••",
    auth_username_placeholder: "username",
    auth_remember: "Zapamti me",
    auth_forgot: "Zaboravio lozinku?",
    auth_signin_btn: "Uloguj se",
    auth_signup_btn: "Registruj se",
    auth_or: "ILI NASTAVI SA",
    auth_no_account: "Nemaš nalog?",
    auth_have_account: "Već imaš nalog?",
    auth_switch_signup: "Sign Up",
    auth_switch_login: "Log In",

    // Feed
    feed_add_beat: "Upload Beat",
    feed_end: "Nema više sadržaja 📼",
    
    // Post Card
    post_stems: "STEMS",
    post_collab: "COLLAB",
    post_copied: "Copied",
    
    // Profile
    profile_edit: "Edit Profile",
    profile_connect: "Follow",
    profile_connected: "Following",
    profile_tracks: "Tracks",
    profile_followers: "Followers",
    profile_following: "Following",
    profile_tab_discog: "Releases",
    profile_tab_placements: "Placements",
    profile_tab_collabs: "Collabs",
    profile_studio_gallery: "Studio Setup",
    
    // Dashboard
    dash_title: "Dashboard",
    dash_tab_overview: "Overview",
    dash_tab_studio: "Studio",
    dash_tab_settings: "Settings",
    dash_stats_plays: "Total Plays",
    dash_stats_downloads: "Downloads",
    dash_stats_followers: "New Followers",
    dash_stats_likes: "Total Likes",
    dash_activity: "Recent Activity",
    dash_settings_social: "Social Links",
    dash_settings_notifications: "Notifications",
    dash_settings_account: "Account Security",
    dash_stats_revenue: "Revenue",
    dash_upload_gear: "Upload Studio Photo",
    dash_profile_info: "Profile Info",
    dash_save_changes: "Save Changes",
    dash_saved: "Saved",
    dash_name: "Display Name",
    dash_bio: "Bio",
    dash_location: "Location",
    
    // Upload
    upload_title: "Upload Beat",
    upload_drag: "Prevuci audio ovde ili klikni",
    upload_cover: "Cover Art",
    upload_label_title: "TITLE",
    upload_label_bpm: "BPM",
    upload_label_key: "KEY",
    upload_label_caption: "CAPTION",
    upload_ai_generate: "AI Generate",
    upload_thinking: "Thinking...",
    upload_submit: "Share",
    upload_placeholder_title: "Ime projekta",
    upload_placeholder_caption: "Reci nešto o ovom beatu...",
    
    // Discover
    discover_title: "Discover",
    discover_search_placeholder: "Traži artiste, beats, sounds...",
    discover_results: "Results",
    discover_no_results: "Nema rezultata za",
    discover_genres: "Browse by Genre",
    discover_trending: "Trending",
    discover_producers: "Rising Producers",
    discover_see_all: "See All",
    discover_follow: "Follow",
    
    // Notifications
    notifications_title: "Notifications",
    notifications_empty: "Nema novih notifikacija.",
    
    // Messages
    messages_title: "Messages",
    messages_search: "Search...",
    messages_type_placeholder: "Napiši poruku...",
    messages_select_chat: "Izaberi chat",
    messages_your_messages: "Messages",
    messages_back: "Back",
    messages_online: "Online",
    
    // Post Detail
    post_detail_back: "Back",
    post_detail_comments: "Comments",
    post_detail_add_comment: "Ostavi komentar...",
    post_detail_no_comments: "Nema komentara. Budi prvi!",

    // Tournaments
    tourn_title: "Tournaments",
    tourn_active: "Active",
    tourn_registration: "Open",
    tourn_prize: "Prize Pool",
    tourn_fee: "Entry",
    tourn_apply: "Submit Beat",
    tourn_view_bracket: "View Bracket",
    tourn_modal_title: "Izaberi beat",
    tourn_modal_desc: "Izaberi jedan od tvojih beats za ovaj turnir.",
    tourn_apply_success: "Submitted!",
    tourn_bracket_title: "Bracket",

    // Admin
    admin_title: "Admin Panel",
    admin_tab_dashboard: "Dashboard",
    admin_tab_users: "Users",
    admin_tab_tournaments: "Tournaments",
    admin_tab_content: "Content",
    admin_tab_badges: "Badges",
    admin_tab_system: "System",
    admin_action_ban: "Ban",
    admin_action_unban: "Unban",
    admin_action_verify: "Verify",
    admin_action_badge: "Give Badge",
    admin_action_delete: "Delete",
    admin_action_feature: "Feature",
    admin_action_create_tourn: "Create Tournament",
    admin_create_tourn_title: "New Tournament",
    
    // Game
    game_title: "Sonic Instinct",
    game_subtitle: "Testiraj uši. Pogodi beat. Osvoji badge.",
    game_play_btn: "Start",
    game_score: "Score",
    game_time: "Time",
    game_round: "Round",
    game_correct: "Correct!",
    game_wrong: "Wrong!",
    game_game_over: "Game Over",
    game_final_score: "Final Score",
    game_play_again: "Play Again",
    game_earned_badge: "Badge Unlocked!",

    // Common
    common_search: "Search"
  }
};
