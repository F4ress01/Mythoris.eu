// Klient API bota (VITE_PROFILE_API). Token logowania Discord trzymany w localStorage (z try/catch).
export const API_BASE = ((import.meta.env.VITE_PROFILE_API as string | undefined) ?? "").replace(/\/$/, "");
const TOKEN_KEY = "mythoris_token";

export class ApiError extends Error {
  status: number;
  code: string;
  constructor(status: number, code: string) {
    super(code);
    this.status = status;
    this.code = code;
  }
}

export function getToken(): string | null {
  try {
    return window.localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token: string | null) {
  try {
    if (token) window.localStorage.setItem(TOKEN_KEY, token);
    else window.localStorage.removeItem(TOKEN_KEY);
  } catch {
    // brak localStorage - sesja tylko do odswiezenia
  }
}

export function loginUrl(): string {
  return `${API_BASE}/auth/discord?return=${encodeURIComponent(window.location.origin)}`;
}

/** Zapytanie JSON; rzuca ApiError (status 0 = brak odpowiedzi/siec, np. bot sie budzi). */
export async function api<T>(path: string, init: { method?: string; body?: unknown; signal?: AbortSignal } = {}): Promise<T> {
  if (!API_BASE) throw new ApiError(0, "unconfigured");
  const headers: Record<string, string> = {};
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  if (init.body !== undefined) headers["Content-Type"] = "application/json";
  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      method: init.method ?? "GET",
      headers,
      body: init.body !== undefined ? JSON.stringify(init.body) : undefined,
      signal: init.signal,
    });
  } catch (e) {
    if ((e as Error).name === "AbortError") throw e;
    throw new ApiError(0, "network");
  }
  if (!res.ok) {
    let code = String(res.status);
    try {
      code = ((await res.json()) as { error?: string }).error ?? code;
    } catch {
      // brak JSON
    }
    throw new ApiError(res.status, code);
  }
  return (await res.json()) as T;
}
