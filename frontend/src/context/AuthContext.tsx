import React, { createContext, useContext, useState, ReactNode, SetStateAction, Dispatch } from 'react';

interface AuthContextProps {
  isAuthenticated: boolean;
  role: string;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [role, setRole] = useState<string>('');

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      role,
      setIsAuthenticated,
      setRole,
    }}>
      {children}
    </AuthContext.Provider>
  );
}


