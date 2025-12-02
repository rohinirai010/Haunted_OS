import { motion } from 'framer-motion';
import { useEffect } from 'react';
import Draggable from 'react-draggable';
import { useWindowStore } from '../store/windowStore';
import { X, Minus, Square } from 'lucide-react';
import { useHorrorSounds } from '../hooks/useHorrorSounds';

interface WindowManagerProps {
  children: React.ReactNode;
  windowId: string;
}

export const WindowManager = ({ children, windowId }: WindowManagerProps) => {
  const { windows, activeWindowId, closeWindow, minimizeWindow, maximizeWindow, updateWindowPosition, updateWindowSize, setActiveWindow } = useWindowStore();
  const sounds = useHorrorSounds();

  const window = windows.find(w => w.id === windowId);
  const isActive = activeWindowId === windowId;

  // Handle window resize to adapt to screen size changes
  useEffect(() => {
    if (!window) return; // Skip if window doesn't exist
    if (window.minimized) return; // Skip if minimized

    const handleResize = () => {
      if (!window) return;
      if (window.maximized) return; // Don't resize maximized windows

      const isMobile = globalThis.window.innerWidth < 640;
      const isTablet = globalThis.window.innerWidth >= 640 && globalThis.window.innerWidth < 1024;

      let newWidth: number;
      let newHeight: number;

      if (isMobile) {
        newWidth = globalThis.window.innerWidth - 20;
        newHeight = globalThis.window.innerHeight - 80;
      } else if (isTablet) {
        newWidth = Math.min(600, globalThis.window.innerWidth - 100);
        newHeight = Math.min(500, globalThis.window.innerHeight - 120);
      } else {
        newWidth = 800;
        newHeight = 600;
      }

      // Only update if size actually changed
      if (window.width !== newWidth || window.height !== newHeight) {
        updateWindowSize(windowId, newWidth, newHeight);

        // Also adjust position if window is now off-screen
        const maxX = Math.max(0, globalThis.window.innerWidth - newWidth - 20);
        const maxY = Math.max(0, globalThis.window.innerHeight - newHeight - 84);

        if (window.x > maxX || window.y > maxY) {
          updateWindowPosition(
            windowId,
            Math.min(window.x, maxX),
            Math.min(window.y, maxY)
          );
        }
      }
    };

    // Add resize listener
    globalThis.window.addEventListener('resize', handleResize);

    // Initial check
    handleResize();

    return () => {
      globalThis.window.removeEventListener('resize', handleResize);
    };
  }, [windowId, window?.maximized, window?.width, window?.height, window?.x, window?.y, updateWindowSize, updateWindowPosition]);

  const handleDrag = (_e: any, data: { x: number; y: number }) => {
    updateWindowPosition(windowId, data.x, data.y);
  };

  const handleMinimize = () => {
    sounds.playClick();
    setTimeout(() => {
      minimizeWindow(windowId);
    }, 50);
  };

  const handleMaximize = () => {
    sounds.playClick();
    setTimeout(() => {
      maximizeWindow(windowId);
    }, 50);
  };

  const handleClose = () => {
    sounds.playWindowClose();
    setTimeout(() => {
      closeWindow(windowId);
    }, 100);
  };

  // Early return AFTER all hooks to comply with Rules of Hooks
  if (!window || window.minimized) return null;

  return (
    <Draggable
      handle=".window-header"
      position={{ x: window.x, y: window.y }}
      onStop={handleDrag}
      bounds={{
        left: 0,
        top: 0,
        right: window.maximized
          ? 0
          : typeof window.width === 'number'
            ? Math.max(0, globalThis.window.innerWidth - window.width)
            : 0,
        bottom: window.maximized
          ? 0
          : typeof window.height === 'number'
            ? Math.max(0, globalThis.window.innerHeight - window.height - 64)
            : 0,
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 0 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 0 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
        className={`absolute bg-haunted-black/95 border-2 rounded window-shadow backdrop-blur-sm pointer-events-auto ${isActive
          ? 'border-haunted-accent shadow-[0_0_30px_rgba(255,107,107,0.5)]'
          : 'border-haunted-blue'
          }`}
        style={{
          width: window.maximized ? '100vw' : window.width,
          height: window.maximized ? '100vh' : window.height,
          zIndex: window.zIndex,
          left: window.maximized ? 0 : undefined,
          top: window.maximized ? 0 : undefined,
          position: 'absolute',
        }}
        onMouseDown={() => setActiveWindow(windowId)}
      >
        {/* Window Header - Responsive */}
        <div className="window-header bg-gradient-to-b from-haunted-blue to-haunted-black border-b-2 border-haunted-accent p-2 sm:p-2 flex items-center justify-between cursor-move touch-none">
          <span className="text-haunted-text font-mono text-[13px] sm:text-sm text-glow truncate pr-2">
            {window.title}
          </span>
          <div className="flex gap-1 sm:gap-2 flex-shrink-0">
            <button
              onClick={handleMinimize}
              onTouchEnd={(e) => {
                e.preventDefault();
                handleMinimize();
              }}
              className="w-5 h-5 sm:w-6 sm:h-6 bg-haunted-blue hover:bg-haunted-accent active:bg-haunted-accent border border-haunted-accent rounded flex items-center justify-center transition-all active:scale-95 touch-manipulation"
              title="Minimize"
            >
              <Minus size={16} className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-haunted-text" />
            </button>
            <button
              onClick={handleMaximize}
              onTouchEnd={(e) => {
                e.preventDefault();
                handleMaximize();
              }}
              className="w-5 h-5 sm:w-6 sm:h-6 bg-haunted-blue hover:bg-haunted-accent active:bg-haunted-accent border border-haunted-accent rounded flex items-center justify-center transition-all active:scale-95 touch-manipulation"
              title="Maximize"
            >
              <Square size={16} className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-haunted-text" />
            </button>
            <button
              onClick={handleClose}
              onTouchEnd={(e) => {
                e.preventDefault();
                handleClose();
              }}
              className="w-5 h-5 sm:w-6 sm:h-6 bg-haunted-red hover:bg-haunted-accent active:bg-haunted-accent border border-haunted-accent rounded flex items-center justify-center transition-all active:scale-95 touch-manipulation"
              title="Close"
            >
              <X size={16} className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-haunted-text" />
            </button>
          </div>
        </div>

        {/* Window Content - Responsive */}
        <div className="p-2 sm:p-4 h-[calc(100%-48px)] sm:h-[calc(100%-48px)] overflow-auto">
          {children}
        </div>
      </motion.div>
    </Draggable>
  );
};