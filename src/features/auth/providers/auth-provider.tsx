import { FC, PropsWithChildren, createContext, useContext } from 'react';

import { User } from '../model';

interface AuthContextType {
  user: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: FC<PropsWithChildren<{ user: User | null }>> = ({
  children,
  user,
}) => <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export { AuthProvider, useAuth };
