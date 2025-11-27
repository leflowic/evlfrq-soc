# EVLFRQ - Producer Social Platform

## Overview
EVLFRQ is a social platform designed for music producers. It allows users to share projects, visualize stems, and collaborate in real-time. The application features a feed, discovery page, user profiles, tournaments, messaging, and an arcade game.

## Project Architecture

### Tech Stack
- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS (via CDN)
- **Icons**: Lucide React

### Directory Structure
```
├── App.tsx              # Main app component with routing
├── index.tsx            # React entry point
├── index.html           # HTML template
├── types.ts             # TypeScript type definitions
├── constants.ts         # Mock data and constants
├── vite.config.ts       # Vite configuration
├── components/
│   ├── feed/            # Feed-related components
│   ├── layout/          # Layout components (Navbar, Layout)
│   └── ui/              # Reusable UI components
├── context/
│   └── AppContext.tsx   # Global app state management
└── pages/               # Page components
    ├── Landing.tsx      # Landing page
    ├── Auth.tsx         # Login/Signup
    ├── Feed.tsx         # Main feed
    ├── Profile.tsx      # User profile
    ├── Discover.tsx     # Discovery/search
    ├── Upload.tsx       # Upload beats
    ├── Messages.tsx     # Direct messages
    ├── Notifications.tsx
    ├── Dashboard.tsx    # User dashboard
    ├── Tournaments.tsx  # Beat tournaments
    ├── Admin.tsx        # Admin panel
    └── Game.tsx         # Arcade game
```

### Key Features
1. **Feed System**: View and interact with producer posts
2. **User Profiles**: Follow producers, view discography
3. **Discovery**: Search and browse by genre
4. **Upload**: Share beats with AI-generated captions (simulated)
5. **Tournaments**: Beat battle competitions
6. **Messaging**: Direct messaging between users
7. **Arcade Game**: "Sonic Instinct" - guess the beat game
8. **i18n**: English and Serbian language support

## Recent Changes
- **Nov 27, 2025**: Initial Replit setup
  - Configured Vite for port 5000
  - Removed AI Studio importmap from index.html
  - Added Vite entry point script
  - Set up static deployment configuration
  - Added official EVLFRQ logos (white logo for dark theme, blue for favicon)
  - Logos stored in public/assets/

## Running the Project

### Development
```bash
npm run dev
```
The app runs on port 5000.

### Production Build
```bash
npm run build
```
Output is in the `dist` directory.

## Notes
- The Gemini API key configuration exists in vite.config.ts but the AI features are currently simulated (not calling real API)
- Uses Tailwind CSS via CDN - consider installing as PostCSS plugin for production
- All data is mock data stored in constants.ts
