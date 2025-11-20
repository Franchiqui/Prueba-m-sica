"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import PocketBase from 'pocketbase';

interface PocketBaseContextType {
  pb: PocketBase;
  user: any;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const PocketBaseContext = createContext<PocketBaseContextType | undefined>(undefined);

export function PocketBaseProvider({ 
  children, 
  pocketbaseUrl 
}: { 
  children: ReactNode; 
  pocketbaseUrl: string;
}) {
  const [pb] = useState(() => new PocketBase(pocketbaseUrl));
  const [user, setUser] = useState(pb.authStore.model);
  const [isAuthenticated, setIsAuthenticated] = useState(!!pb.authStore.model);

  useEffect(() => {
    const unsubscribe = pb.authStore.onChange((token, model) => {
      setUser(model);
      setIsAuthenticated(!!model);
    });

    return () => {
      unsubscribe();
    };
  }, [pb]);

  const login = async (email: string, password: string) => {
    await pb.collection('users').authWithPassword(email, password);
  };

  const register = async (email: string, password: string) => {
    const data = {
      email,
      password,
      passwordConfirm: password,
    };
    await pb.collection('users').create(data);
    await login(email, password);
  };

  const logout = () => {
    pb.authStore.clear();
  };

  return (
    <PocketBaseContext.Provider value={{ pb, user, login, register, logout, isAuthenticated }}>
      {children}
    </PocketBaseContext.Provider>
  );
}

export function usePocketBase() {
  const context = useContext(PocketBaseContext);
  if (context === undefined) {
    throw new Error('usePocketBase must be used within a PocketBaseProvider');
  }
  return context;
}
