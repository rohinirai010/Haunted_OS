import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { WindowState } from '../types';

interface WindowStore {
  windows: WindowState[];
  activeWindowId: string | null;
  nextZIndex: number;
  openWindow: (appId: string, title: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  updateWindowPosition: (id: string, x: number, y: number) => void;
  updateWindowSize: (id: string, width: number, height: number) => void;
  setActiveWindow: (id: string) => void;
}

export const useWindowStore = create<WindowStore>()(
  persist(
    (set, get) => ({
      windows: [],
      activeWindowId: null,
      nextZIndex: 100,

      openWindow: (appId: string, title: string) => {
        const existingWindow = get().windows.find((w) => w.appId === appId);
        if (existingWindow) {
          set({ activeWindowId: existingWindow.id });
          return;
        }

        // Responsive window sizing
        const isMobile = window.innerWidth < 640;
        const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;

        // Calculate safe window positioning to prevent floating off-screen
        const windowWidth = isMobile
          ? window.innerWidth - 20
          : isTablet
          ? Math.min(600, window.innerWidth - 100)
          : 800;
        const windowHeight = isMobile
          ? window.innerHeight - 80
          : isTablet
          ? Math.min(500, window.innerHeight - 120)
          : 600;

        // Ensure window stays within screen bounds
        const minY = isMobile ? 30 : 0; // Extra padding for mobile status bar
        const maxX = Math.max(0, window.innerWidth - windowWidth - 20);
        const maxY = Math.max(minY, window.innerHeight - windowHeight - 84); // 64 for taskbar + 20 padding

        const randomX = isMobile ? 10 : isTablet ? 50 : Math.min(100 + Math.random() * 200, maxX);
        const randomY = isMobile ? 30 : isTablet ? 40 : Math.min(50 + Math.random() * 100, maxY);

        const newWindow: WindowState = {
          id: `${appId}-${Date.now()}`,
          appId,
          title,
          x: randomX,
          y: randomY,
          width: windowWidth,
          height: windowHeight,
          zIndex: get().nextZIndex,
          minimized: false,
          maximized: false,
        };

        set((state) => ({
          windows: [...state.windows, newWindow],
          activeWindowId: newWindow.id,
          nextZIndex: state.nextZIndex + 1,
        }));
      },

      closeWindow: (id: string) => {
        set(state => ({
          windows: state.windows.filter(w => w.id !== id),
          activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
        }));
      },

      minimizeWindow: (id: string) => {
        set(state => ({
          windows: state.windows.map(w =>
            w.id === id ? { ...w, minimized: !w.minimized } : w
          ),
        }));
      },

      maximizeWindow: (id: string) => {
        set(state => ({
          windows: state.windows.map(w =>
            w.id === id ? { ...w, maximized: !w.maximized } : w
          ),
        }));
      },

      updateWindowPosition: (id: string, x: number, y: number) => {
        set(state => ({
          windows: state.windows.map(w =>
            w.id === id ? { ...w, x, y } : w
          ),
        }));
      },

      updateWindowSize: (id: string, width: number, height: number) => {
        set(state => ({
          windows: state.windows.map(w =>
            w.id === id ? { ...w, width, height } : w
          ),
        }));
      },

      setActiveWindow: (id: string) => {
        set(state => ({
          activeWindowId: id,
          windows: state.windows.map(w =>
            w.id === id ? { ...w, zIndex: state.nextZIndex } : w
          ),
          nextZIndex: state.nextZIndex + 1,
        }));
      },
    }),
    {
      name: 'haunted-os-windows',
      partialize: (state) => ({
        windows: state.windows.map(w => ({
          ...w,
          minimized: false,
        })),
      }),
    }
  )
);
