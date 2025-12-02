import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SystemStore {
  isBooted: boolean;
  volume: number;
  ambientSoundEnabled: boolean;
  glitchIntensity: number;
  setBooted: (booted: boolean) => void;
  setVolume: (volume: number) => void;
  toggleAmbientSound: () => void;
  setGlitchIntensity: (intensity: number) => void;
}

export const useSystemStore = create<SystemStore>()(
  persist(
    (set) => ({
      isBooted: false,
      volume: 0.3,
      ambientSoundEnabled: true,
      glitchIntensity: 0.5,

      setBooted: (booted: boolean) => set({ isBooted: booted }),
      setVolume: (volume: number) => set({ volume }),
      toggleAmbientSound: () => set(state => ({ ambientSoundEnabled: !state.ambientSoundEnabled })),
      setGlitchIntensity: (intensity: number) => set({ glitchIntensity: intensity }),
    }),
    {
      name: 'haunted-os-system',
    }
  )
);
