"use client";

import { useState, useEffect } from 'react';
import { PocketBaseProvider } from './PocketBaseContext';
import { LanguageProvider } from './LanguageContext';
import { AuthForm } from './AuthForm';
import { X, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FloatingChatProps {
  config: {
    pocketbaseUrl: string;
  };
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

export function FloatingChat({ 
  config, 
  isOpen, 
  onClose, 
  isAuthenticated, 
  setIsAuthenticated 
}: FloatingChatProps) {
  const [localAuth, setLocalAuth] = useState(isAuthenticated);

  useEffect(() => {
    setLocalAuth(isAuthenticated);
  }, [isAuthenticated]);

  const handleAuthenticated = () => {
    setLocalAuth(true);
    setIsAuthenticated(true);
  };

  if (!isOpen) return null;

  return (
    <PocketBaseProvider pocketbaseUrl={config.pocketbaseUrl}>
      <LanguageProvider>
        <div className="flex flex-col h-full bg-white dark:bg-gray-800">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Chat</h2>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
              >
                <Settings className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            {!localAuth ? (
              <AuthForm onAuthenticated={handleAuthenticated} />
            ) : (
              <div className="flex items-center justify-center h-full p-4">
                <p className="text-gray-600 dark:text-gray-400">
                  Chat interface coming soon...
                </p>
              </div>
            )}
          </div>
        </div>
      </LanguageProvider>
    </PocketBaseProvider>
  );
}
