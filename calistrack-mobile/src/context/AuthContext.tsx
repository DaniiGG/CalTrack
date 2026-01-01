import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: any) {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  const checkAuth = async () => {
    const token = await AsyncStorage.getItem('token');
    setAuthenticated(!!token);
  };

  const logout = async () => {
  await AsyncStorage.removeItem('token');
  setAuthenticated(false);
};

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ authenticated, setAuthenticated, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
