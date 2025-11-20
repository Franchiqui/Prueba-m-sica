"use client";

import { useState, useEffect, useCallback } from 'react';

export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false); // Default to false for server render
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Component has mounted on client
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode !== null) {
      const initialDarkMode = storedDarkMode === 'true';
      setIsDarkMode(initialDarkMode);
      document.documentElement.classList.toggle('dark', initialDarkMode);
    }
  }, []);

  const toggleDarkMode = useCallback(() => {
    if (!mounted) return; // Don't toggle until mounted

    console.log('toggleDarkMode called. Current isDarkMode:', isDarkMode);
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
    document.documentElement.classList.toggle('dark', newDarkMode);
    console.log('Theme toggled to newDarkMode:', newDarkMode);
  }, [isDarkMode, mounted]);

  return { isDarkMode, toggleDarkMode };
};
