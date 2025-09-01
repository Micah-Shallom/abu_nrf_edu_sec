"use client"

import { createContext, useContext, useState, useEffect } from 'react';
import { profileService } from '@/services/authService';
import { User } from '@/types/auth';

interface Session {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const SessionContext = createContext<Session | undefined>(undefined);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      profileService.getProfile(token)
        .then(({ profile, error }) => {
          if (profile) {
            setUser(profile as User);
          } else {
            // Handle error or invalid token
            logout();
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, [token]);

  const login = (newToken: string) => {
    localStorage.setItem('authToken', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    setToken(null);
  };

  return (
    <SessionContext.Provider value={{ user, token, isLoading, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}
