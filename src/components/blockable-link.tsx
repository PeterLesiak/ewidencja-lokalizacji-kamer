'use client';

import NextLink from 'next/link';
import { createContext, useState, useContext, ComponentProps } from 'react';

interface NavigationBlockerContextType {
  isBlocked: boolean;
  setIsBlocked: (isBlocked: boolean) => void;
}

export const NavigationBlockerContext = createContext<NavigationBlockerContextType>({
  isBlocked: false,
  setIsBlocked: () => {},
});

export function NavigationBlockerProvider({ children }: { children: React.ReactNode }) {
  const [isBlocked, setIsBlocked] = useState(false);

  return (
    <NavigationBlockerContext.Provider value={{ isBlocked, setIsBlocked }}>
      {children}
    </NavigationBlockerContext.Provider>
  );
}

export function useNavigationBlocker() {
  return useContext(NavigationBlockerContext);
}

export function Link({ children, ...props }: ComponentProps<typeof NextLink>) {
  const { isBlocked } = useNavigationBlocker();

  return (
    <NextLink
      onNavigate={e => {
        if (isBlocked && !window.confirm('You have unsaved changes. Leave anyway?')) {
          e.preventDefault();
        }
      }}
      {...props}
    >
      {children}
    </NextLink>
  );
}
