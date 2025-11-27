import React from 'react';
import { Navbar } from './Navbar';
import { useApp } from '../../context/AppContext';
import { ViewState } from '../../types';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { view } = useApp();

  if (view === ViewState.LANDING) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background text-white selection:bg-blue-500/30">
      <Navbar />
      <main className="min-h-screen">
        {children}
      </main>
    </div>
  );
};