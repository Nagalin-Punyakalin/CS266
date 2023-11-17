import React, { createContext, useContext, useState, ReactNode, SetStateAction, Dispatch } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface AuthContextProps {
  role: string;
  setRole: Dispatch<SetStateAction<string>>;
}

interface AuthProviderProps {
    children: ReactNode;
  }

const AuthContext = createContext({} as AuthContextProps)

export function useAuth() {
    return useContext(AuthContext)
  }
export function AuthProvider({ children }: AuthProviderProps) {
  const [role, setRole] = useLocalStorage<string>('role','');

  return (
    <AuthContext.Provider value={{
      role,
      setRole,
    }}>
      {children}
    </AuthContext.Provider>
  );
}


