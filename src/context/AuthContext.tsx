// context/AuthContext.tsx
import { createContext, useContext, ReactNode, useEffect, useState } from 'react';

interface AuthContextProps {
  children: ReactNode;
}

interface AuthContextValue {
  sessionActive: boolean;
  setSessionActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: AuthContextProps) {
  const [sessionActive, setSessionActive] = useState(false);

  useEffect(() => {
    // Verificar el sessionStorage para determinar si hay una sesión activa
    const isSessionActive = sessionStorage.getItem('currentUser') !== null;
    setSessionActive(isSessionActive);
  }, []);

  return (
    <AuthContext.Provider value={{ sessionActive, setSessionActive }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
