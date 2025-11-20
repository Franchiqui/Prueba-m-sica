"use client";

import { Button } from '@/components/ui/button';
import { Database, X, Move } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface FloatingButtonProps {
  className?: string;
}

export function FloatingButton({ className = '' }: FloatingButtonProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDatabaseApp, setIsDatabaseApp] = useState(false);
  const [showDatabase, setShowDatabase] = useState(false);
  const [hasWindowDimensions, setHasWindowDimensions] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  const updatePosition = () => {
    if (buttonRef.current) {
      const buttonWidth = buttonRef.current.offsetWidth;
      const buttonHeight = buttonRef.current.offsetHeight;
      const initialX = window.innerWidth - buttonWidth - 20;
      const initialY = window.innerHeight - buttonHeight - 20;
      setPosition({ x: initialX, y: initialY });
      setHasWindowDimensions(true); // Set true when dimensions are obtained
    }
  };

  useEffect(() => {
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
    };
  }, []);

  useEffect(() => {
    if (buttonRef.current) {
      requestAnimationFrame(updatePosition);
    }
  }, [buttonRef.current]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;

    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsDragging(true);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;

      const maxX = window.innerWidth - (buttonRef.current?.offsetWidth || 56);
      const maxY = window.innerHeight - (buttonRef.current?.offsetHeight || 56);

      const clampedX = Math.min(Math.max(0, newX), maxX);
      const clampedY = Math.min(Math.max(0, newY), maxY);

      setPosition({
        x: clampedX,
        y: clampedY
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mouseleave', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  // Definimos el estilo del botón
  const buttonStyle = {
    left: position.x,
    top: position.y,
    touchAction: 'none'
  };

  // Definimos la clase del botón, asegurando que className sea una cadena
  const buttonClass = 'h-14 w-14 rounded-full shadow-lg border-2 border-black dark:border-white text-foreground ' + (className || '');


  if (isDatabaseApp) {
    return (
      <div
        ref={buttonRef}
        className="fixed z-50 cursor-move"
        style={buttonStyle}
        onMouseDown={handleMouseDown}
      >
        <Button
          className={buttonClass}
          size="icon"
          variant="ghost"
          onClick={() => {
            window.location.href = 'http://localhost:3000';
          }}
        >
          <X className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <>
      {showDatabase && (
        <iframe
          src="http://localhost:3002"
          className="fixed inset-0 z-50 h-full w-full border-none"
        />
      )}
      <div
        ref={buttonRef}
        className="fixed z-50 cursor-move"
        style={{ ...buttonStyle, visibility: hasWindowDimensions ? 'visible' : 'hidden' }}
        onMouseDown={handleMouseDown}
      >
        <Button
          className={buttonClass}
          size="icon"
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation();
            setShowDatabase(!showDatabase);
          }}
        >
          {showDatabase ? (
            <X className="h-6 w-6" />
          ) : (
            <div className="flex flex-col items-center">
              <Database className="h-5 w-5 text-foreground drop-shadow-[0_0_8px_rgba(0,0,0,0.95)] [text-shadow:0_0_8px_rgba(0,0,0,0.95)]" />
              <Move className="h-3 w-3 mt-0.5 text-foreground/80 drop-shadow-[0_0_8px_rgba(0,0,0,0.95)] [text-shadow:0_0_8px_rgba(0,0,0,0.95)]" />
            </div>
          )}
        </Button>
      </div>
    </>
  );
}