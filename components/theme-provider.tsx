"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ThemeSwitchOverlay } from "@/components/theme-switch-overlay";

const STORAGE_KEY = "theme";

type Theme = "light" | "dark" | "system";

type ThemeContextValue = {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
  /** Show center animation then toggle between light/dark */
  requestThemeSwitch: () => void;
  showSwitchOverlay: boolean;
  setShowSwitchOverlay: (show: boolean) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getSystemDark(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function getStoredTheme(): Theme | null {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem(STORAGE_KEY);
  if (v === "light" || v === "dark" || v === "system") return v;
  return null;
}

function getResolvedTheme(theme: Theme): "light" | "dark" {
  if (theme === "system") return getSystemDark() ? "dark" : "light";
  return theme;
}

function applyTheme(resolved: "light" | "dark") {
  document.documentElement.classList.toggle("dark", resolved === "dark");
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");
  const [showSwitchOverlay, setShowSwitchOverlay] = useState(false);

  useEffect(() => {
    const stored = getStoredTheme();
    if (stored) setThemeState(stored);
    const resolved = getResolvedTheme(stored ?? "system");
    setResolvedTheme(resolved);
    applyTheme(resolved);
  }, []);

  useEffect(() => {
    const resolved = getResolvedTheme(theme);
    setResolvedTheme(resolved);
    applyTheme(resolved);
    if (theme !== "system") localStorage.setItem(STORAGE_KEY, theme);
    else localStorage.removeItem(STORAGE_KEY);
  }, [theme]);

  useEffect(() => {
    if (theme !== "system") return;
    const m = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      const resolved = getResolvedTheme("system");
      setResolvedTheme(resolved);
      applyTheme(resolved);
    };
    m.addEventListener("change", handler);
    return () => m.removeEventListener("change", handler);
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
  }, []);

  const requestThemeSwitch = useCallback(() => {
    setShowSwitchOverlay(true);
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
      requestThemeSwitch,
      showSwitchOverlay,
      setShowSwitchOverlay,
    }),
    [
      theme,
      resolvedTheme,
      setTheme,
      requestThemeSwitch,
      showSwitchOverlay,
    ]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
      {showSwitchOverlay && <ThemeSwitchOverlay />}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
