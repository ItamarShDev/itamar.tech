'use client';

import { createContext, useContext, useState } from 'react';

type FireworksContextType = {
  showFireworks: boolean;
  toggleFireworks: () => void;
};

const FireworksContext = createContext<FireworksContextType | undefined>(undefined);

export function FireworksProvider({ children }: { children: React.ReactNode }) {
  const [showFireworks, setShowFireworks] = useState(false);

  const toggleFireworks = () => {
    setShowFireworks(prev => !prev);
  };

  return (
    <FireworksContext.Provider value={{ showFireworks, toggleFireworks }}>
      {children}
    </FireworksContext.Provider>
  );
}

export function useFireworks() {
  const context = useContext(FireworksContext);
  if (context === undefined) {
    throw new Error('useFireworks must be used within a FireworksProvider');
  }
  return context;
}
