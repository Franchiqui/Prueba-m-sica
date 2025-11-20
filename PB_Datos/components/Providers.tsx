"use client";

import * as React from 'react';
import { ThemeProvider } from './theme-provider';
import { Toaster } from '@/components/ui/toaster';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange={false}
    >
      {children}
      <Toaster />
    </ThemeProvider>
  );
};