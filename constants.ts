
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
    nav_messages: "Poruke",
    nav_notifications: "Notifikacije",
    nav_profile: "Profil",
    nav_dashboard: "Dashboard", // Changed
    nav_tournaments: "Turniri",
    nav_admin: "Admin",
    nav_game: "Arcade",
    nav_search_placeholder: "PRETRAGA...",
    
    // Landing
    landing_login: "Login",
    landing_signup: "Sign Up",
    landing_version: "V 1.0.0 LIVE",
    landing_title_prefix: "EVL",
    landing_title_suffix: "FRQ",
    landing_subtitle: "Frekvencija za producente. Deli projekte, vizualizuj trake i kolaboriraj u realnom vremenu.",
    landing_enter: "Enter Frequency",
    landing_demo: "Vidi Demo",
    landing_feature_1_title: "Waveform Viz",
    landing_feature_1_desc: "High-fidelity audio vizualizacija renderovana direktno u browseru.",
    landing_feature_2_title: "Sync & Collab",
    landing_feature_2_desc: "Pronađi missing link. Upari po Key-u, BPM-u i vajbu.",
    landing_feature_3_title: "Signal Boost",
    landing_feature_3_desc: "Algoritamski discovery podešen za raw talenat i produkcijski kvalitet.",
    landing_footer: "© 2024 EVLFRQ. Audio Engine Active.",

    // Auth
    auth_welcome_back: "EVLFRQ Access",
    auth_join: "Join EVLFRQ",
    auth_email_placeholder: "producer@evlfrq.com",
    auth_password_placeholder: "••••••••",
    auth_username_placeholder: "stage_name",
    auth_remember: "Zapamti me",
    auth_forgot: "Zaboravljena lozinka?",
    auth_signin_btn: "Start Session",
    auth_signup_btn: "Create Artist ID",
    auth_or: "ILI SE POVEŽI PREKO",
    auth_no_account: "Nemaš access key?",
    auth_have_account: "Već imaš ID?",
    auth_switch_signup: "Sign Up",
    auth_switch_login: "Login",

    // Feed
    feed_add_beat: "Upload Beat",
    feed_end: "Kraj trake 📼",
    
    // Post Card
    post_stems: "STEMS",
    post_collab: "COLLAB",
    post_copied: "Kopirano",
    
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
    profile_studio_gallery: "Oprema i Studio",
    
    // Dashboard
    dash_title: "Dashboard", // Changed
    dash_tab_overview: "Pregled",
    dash_tab_studio: "Moj Studio",
    dash_tab_settings: "Podešavanja",
    dash_stats_plays: "Ukupno Plays",
    dash_stats_downloads: "Downloads",
    dash_stats_followers: "Novi Pratioci",
    dash_stats_likes: "Ukupno Lajkova",
    dash_activity: "Nedavna Aktivnost",
    dash_settings_social: "Društvene Mreže",
    dash_settings_notifications: "Notifikacije",
    dash_settings_account: "Bezbednost Naloga",
    dash_stats_revenue: "Zarada",
    dash_upload_gear: "Dodaj Sliku Studija",
    dash_profile_info: "Informacije Profila",
    dash_save_changes: "Sačuvaj Izmene",
    dash_saved: "Sačuvano",
    dash_name: "Ime Profila",
    dash_bio: "Biografija",
    dash_location: "Lokacija",
    
    // Upload
    upload_title: "Upload New Beat",
    upload_drag: "Prevuci audio ovde ili klikni",
    upload_cover: "Upload Cover Art",
    upload_label_title: "TITLE",
    upload_label_bpm: "BPM",
    upload_label_key: "KEY",
    upload_label_caption: "CAPTION",
    upload_ai_generate: "AI Generate",
    upload_thinking: "Procesuiram...",
    upload_submit: "Objavi na Feed",
    upload_placeholder_title: "Ime Projekta",
    upload_placeholder_caption: "Ispričaj priču iza ovog beata...",
    
    // Discover
    discover_title: "Discover",
    discover_search_placeholder: "Traži artiste, beatove ili zvuk...",
    discover_results: "Rezultati",
    discover_no_results: "Nema rezultata za",
    discover_genres: "Pretraži po Žanru",
    discover_trending: "Trending",
    discover_producers: "Producers on the Rise",
    discover_see_all: "Vidi Sve",
    discover_follow: "Follow",
    
    // Notifications
    notifications_title: "Notifikacije",
    notifications_empty: "Nemaš novih notifikacija.",
    
    // Messages
    messages_title: "Poruke",
    messages_search: "Pretraži...",
    messages_type_placeholder: "Napiši poruku...",
    messages_select_chat: "Izaberi chat",
    messages_your_messages: "Tvoje Poruke",
    messages_back: "Nazad",
    messages_online: "Online",
    
    // Post Detail
    post_detail_back: "Nazad na Feed",
    post_detail_comments: "Komentari",
    post_detail_add_comment: "Baci komentar...",
    post_detail_no_comments: "Nema komentara. Budi prvi!",

    // Tournaments
    tourn_title: "Beat Turniri",
    tourn_active: "Aktivan",
    tourn_registration: "Registracija",
    tourn_prize: "Nagradni Fond",
    tourn_fee: "Učešće",
    tourn_apply: "Prijavi Traku",
    tourn_view_bracket: "Vidi Kostur",
    tourn_modal_title: "Izaberi Takmičarsku Traku",
    tourn_modal_desc: "Izaberi jednu od tvojih uploadovanih traka za ovaj turnir.",
    tourn_apply_success: "Prijava Poslata!",
    tourn_bracket_title: "Kostur Turnira",

    // Admin
    admin_title: "Sistemska Administracija",
    admin_tab_dashboard: "Dashboard",
    admin_tab_users: "Korisnici",
    admin_tab_tournaments: "Turniri",
    admin_tab_content: "Moderacija Sadržaja",
    admin_tab_badges: "Badge Fabrika",
    admin_tab_system: "Sistemska Kontrola",
    admin_action_ban: "Banuj Korisnika",
    admin_action_unban: "Odbanuj",
    admin_action_verify: "Verifikuj",
    admin_action_badge: "Dodeli Bedž",
    admin_action_delete: "Obriši Traku",
    admin_action_feature: "Pinuj Traku",
    admin_action_create_tourn: "Kreiraj Turnir",
    admin_create_tourn_title: "Novi Turnir",
    
    // Game
    game_title: "Sonic Instinct",
    game_subtitle: "Testiraj sluh. Pogodi beat. Osvoji bedževe.",
    game_play_btn: "Startuj Izazov",
    game_score: "Bodovi",
    game_time: "Vreme",
    game_round: "Runda",
    game_correct: "Tačno!",
    game_wrong: "Pogrešno!",
    game_game_over: "Kraj Sesije",
    game_final_score: "Finalni Rezultat",
    game_play_again: "Igraj Ponovo",
    game_earned_badge: "Novi Bedž Otključan!",

    // Common
    common_search: "Search"
  }
};
