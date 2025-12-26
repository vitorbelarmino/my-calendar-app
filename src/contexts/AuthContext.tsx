import { createContext, useState, useEffect, type ReactNode } from "react";
import Cookies from "js-cookie";
import api from "../services/api";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextData {
  user: User | null;
  token: string | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
}

interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

const COOKIE_OPTIONS = { expires: 7, secure: true, sameSite: "strict" as const };

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => Cookies.get("calendar_token") || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const storedToken = Cookies.get("calendar_token");

      if (storedToken) {
        try {
          const { data } = await api.get<User>("/auth/me");
          setUser(data);
        } catch {
          Cookies.remove("calendar_token");
          Cookies.remove("calendar_refresh_token");
        }
      }

      setLoading(false);
    };

    loadUser();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { data } = await api.post<AuthResponse>("/auth/login", { email, password });

    Cookies.set("calendar_token", data.accessToken, COOKIE_OPTIONS);
    Cookies.set("calendar_refresh_token", data.refreshToken, COOKIE_OPTIONS);

    setToken(data.accessToken);
    setUser(data.user);
  };

  const signUp = async (name: string, email: string, password: string) => {
    const { data } = await api.post<AuthResponse>("/auth/register", { name, email, password });

    Cookies.set("calendar_token", data.accessToken, COOKIE_OPTIONS);
    Cookies.set("calendar_refresh_token", data.refreshToken, COOKIE_OPTIONS);

    setToken(data.accessToken);
    setUser(data.user);
  };

  const signOut = () => {
    Cookies.remove("calendar_token");
    Cookies.remove("calendar_refresh_token");

    setToken(null);
    setUser(null);
  };

  const isPublicRoute = ["/login", "/register"].includes(window.location.pathname);

  if (loading && !isPublicRoute) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
