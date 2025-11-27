
import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Layout } from './components/layout/Layout';
import { ViewState } from './types';

// Pages
import { Landing } from './pages/Landing';
import { Feed } from './pages/Feed';
import { Profile } from './pages/Profile';
import { Discover } from './pages/Discover';
import { Upload } from './pages/Upload';
import { Notifications } from './pages/Notifications';
import { Messages } from './pages/Messages';
import { PostDetail } from './pages/PostDetail';
import { Auth } from './pages/Auth';
import { Dashboard } from './pages/Dashboard';
import { Tournaments } from './pages/Tournaments';
import { Admin } from './pages/Admin';
import { Game } from './pages/Game';

const AppContent: React.FC = () => {
  const { view } = useApp();

  // Route Rendering Logic (simulating Router)
  const renderView = () => {
    switch (view) {
      case ViewState.LANDING:
        return <Landing />;
      case ViewState.AUTH:
        return <Auth />;
      case ViewState.FEED:
        return <Feed />;
      case ViewState.PROFILE:
        return <Profile />;
      case ViewState.EXPLORE:
        return <Discover />;
      case ViewState.UPLOAD:
        return (
          <>
            <Feed /> {/* Show Feed in background */}
            <Upload />
          </>
        );
      case ViewState.NOTIFICATIONS:
        return <Notifications />;
      case ViewState.MESSAGES:
        return <Messages />;
      case ViewState.POST_DETAIL:
        return <PostDetail />;
      case ViewState.DASHBOARD:
        return <Dashboard />;
      case ViewState.TOURNAMENTS:
        return <Tournaments />;
      case ViewState.ADMIN:
        return <Admin />;
      case ViewState.GAME:
        return <Game />;
      default:
        return <Landing />;
    }
  };

  return (
    <Layout>
      <div key={view} className="animate-fade-in-up">
        {renderView()}
      </div>
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;