import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { api, API_BASE, ApiError, getToken, setToken } from "../lib/api";

export interface MinecraftProfile {
  uuid: string;
  name: string;
  level: number | null;
  class: string | null;
  rank: string | null;
  guild: { name: string; tag: string } | null;
  playtimeMinutes: number;
  online: boolean;
  profiles: { name: string; class: string; level: number; active: boolean }[];
}

export interface Me {
  id: string;
  name: string;
  avatar: string | null;
  role: "admin" | "editor" | "user";
  minecraft: MinecraftProfile | null;
}

interface AuthValue {
  me: Me | null;
  loading: boolean;
  enabled: boolean;
  canEdit: boolean;
  isAdmin: boolean;
  acceptToken: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [me, setMe] = useState<Me | null>(null);
  const [token, setTokenState] = useState<string | null>(() => getToken());
  const [loading, setLoading] = useState<boolean>(() => Boolean(getToken()) && Boolean(API_BASE));

  useEffect(() => {
    if (!token || !API_BASE) {
      setMe(null);
      setLoading(false);
      return;
    }
    let alive = true;
    setLoading(true);
    api<Me>("/api/me")
      .then((m) => alive && setMe(m))
      .catch((e: unknown) => {
        // wygasly/niewazny token => wyloguj; blad sieci => zostaw token, sprobujemy przy nastepnym wejsciu
        if (alive && e instanceof ApiError && (e.status === 401 || e.status === 403)) {
          setToken(null);
          setTokenState(null);
        }
        if (alive) setMe(null);
      })
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [token]);

  const acceptToken = useCallback((t: string) => {
    setToken(t);
    setTokenState(t);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenState(null);
    setMe(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        me,
        loading,
        enabled: Boolean(API_BASE),
        canEdit: me?.role === "admin" || me?.role === "editor",
        isAdmin: me?.role === "admin",
        acceptToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
