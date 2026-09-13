import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { authApi } from '../api/auth.api';
import { TOKEN_KEY } from '../api/axiosClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    const request = token ? authApi.me() : Promise.reject(new Error('no session token'));
    request
      .then((data) => setAdmin(data.admin))
      .catch(() => {
        if (token) localStorage.removeItem(TOKEN_KEY);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const data = await authApi.login(email, password);
    localStorage.setItem(TOKEN_KEY, data.token);
    setAdmin(data.admin);
    return data.admin;
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setAdmin(null);
  };

  const value = useMemo(
    () => ({ admin, loading, isAuthenticated: Boolean(admin), login, logout }),
    [admin, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
