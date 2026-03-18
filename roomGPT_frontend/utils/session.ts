const SESSION_STORAGE_KEY = "lumiere-current-session-id";

function createSessionId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `session-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function getCurrentSessionId(): string {
  if (typeof window === "undefined") {
    return "main_session";
  }

  const existing = window.localStorage.getItem(SESSION_STORAGE_KEY);
  if (existing) {
    return existing;
  }

  const sessionId = createSessionId();
  window.localStorage.setItem(SESSION_STORAGE_KEY, sessionId);
  return sessionId;
}

export function setCurrentSessionId(sessionId: string): void {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(SESSION_STORAGE_KEY, sessionId);
}

export function createAndStoreSessionId(): string {
  const sessionId = createSessionId();
  setCurrentSessionId(sessionId);
  return sessionId;
}
