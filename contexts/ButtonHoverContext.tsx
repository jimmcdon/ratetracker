'use client';

import { createContext, useContext, useState } from 'react';

interface ButtonHoverContextType {
  isVideoButtonHovered: boolean;
  setIsVideoButtonHovered: (value: boolean) => void;
}

const ButtonHoverContext = createContext<ButtonHoverContextType | undefined>(undefined);

export function ButtonHoverProvider({ children }: { children: React.ReactNode }) {
  const [isVideoButtonHovered, setIsVideoButtonHovered] = useState(false);

  return (
    <ButtonHoverContext.Provider value={{ isVideoButtonHovered, setIsVideoButtonHovered }}>
      {children}
    </ButtonHoverContext.Provider>
  );
}

export function useButtonHover() {
  const context = useContext(ButtonHoverContext);
  if (context === undefined) {
    throw new Error('useButtonHover must be used within a ButtonHoverProvider');
  }
  return context;
} 