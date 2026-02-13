"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

const DURATION_MS = 600;

export function ThemeSwitchOverlay() {
  const { resolvedTheme, setTheme, setShowSwitchOverlay } = useTheme();
  const nextTheme = resolvedTheme === "dark" ? "light" : "dark";

  const onAnimationComplete = () => {
    setTheme(nextTheme);
    setShowSwitchOverlay(false);
  };

  return (
    <motion.div
      role="presentation"
      aria-hidden
      className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
      initial={false}
    >
      {/* Expanding circle with *next* theme background so switch feels like a reveal */}
      <motion.div
        className={`absolute inset-0 flex items-center justify-center ${nextTheme === "dark" ? "dark" : ""}`}
        initial={false}
      >
        <motion.div
          className="absolute h-24 w-24 rounded-full bg-background"
          initial={{ scale: 0 }}
          animate={{
            scale: 40,
            transition: {
              duration: DURATION_MS / 1000,
              ease: [0.32, 0.72, 0, 1],
            },
          }}
          onAnimationComplete={onAnimationComplete}
        />
      </motion.div>
      {/* Center icon (target theme) */}
      <motion.div
        className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-foreground text-background shadow-lg"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          transition: {
            duration: 0.25,
            ease: [0.32, 0.72, 0, 1],
          },
        }}
      >
        {nextTheme === "dark" ? (
          <Moon className="h-10 w-10" strokeWidth={1.5} />
        ) : (
          <Sun className="h-10 w-10" strokeWidth={1.5} />
        )}
      </motion.div>
    </motion.div>
  );
}
