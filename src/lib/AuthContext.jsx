import React, { createContext, useContext, useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const bootstrap = async () => {
      try {
        await base44.app.getPublicSettings();
      } catch {
        // Local/dev without a configured backend should still render the UI.
      } finally {
        if (!cancelled) setIsLoadingPublicSettings(false);
      }

      try {
        const me = await base44.auth.me();
        if (!cancelled) setUser(me);
      } catch {
        // requiresAuth is false; continue as a guest.
      } finally {
        if (!cancelled) setIsLoadingAuth(false);
      }
    };

    bootstrap();
    return () => {
      cancelled = true;
    };
  }, []);

  const navigateToLogin = () => {
    if (typeof base44.auth.redirectToLogin === "function") {
      base44.auth.redirectToLogin(window.location.href);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoadingAuth,
        isLoadingPublicSettings,
        authError,
        setAuthError,
        navigateToLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
