"use client";

import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/Providers';
import { FloatingButton } from '@/components/ui/floating-button';

import { FloatingChatButton } from '@/src/components/ui/floating-chat-button';
import { FloatingChat } from '@/FloatingChat/Chat';
import { DraggableFloatingChat } from '@/FloatingChat/Chat/DraggableFloatingChat';
import { useState } from 'react';
import { MessageSquare } from 'lucide-react';


const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isChatOpen, setIsChatOpen] = useState(false);

 const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleToggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  // Check if we're in the main application context and prevent rendering
  // if we're not supposed to show the floating chat
  const isMainApp = typeof window !== 'undefined' && (
    new URLSearchParams(window.location.search).get('mainApp') === 'true' ||
    window.location.pathname === '/editor'
  );

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
          <FloatingButton />
          
          
          {!isMainApp && (
            <>
              <FloatingChatButton onClick={handleToggleChat}>
                <MessageSquare className="w-6 h-6" />
              </FloatingChatButton>

              {isChatOpen && (
                <DraggableFloatingChat
                  isOpen={isChatOpen}
                  onClose={handleCloseChat}
                >
                  <FloatingChat
                    config={{ pocketbaseUrl: process.env.NEXT_PUBLIC_POCKETBASE_URL || 'https://zeus-basedatos-2.fly.dev' }}
                    isOpen={true}
                    onClose={handleCloseChat}
                    isAuthenticated={isAuthenticated}
                    setIsAuthenticated={setIsAuthenticated}
                  />
                </DraggableFloatingChat>
              )}
            </>
          )}
        </Providers>
      </body>
    </html>
  );
}