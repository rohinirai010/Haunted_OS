import { motion } from 'framer-motion';
import { useWindowStore } from '../store/windowStore';
import { useSystemStore } from '../store/systemStore';
import { Ghost, Mail, Terminal, FolderOpen, MessageCircle, Volume2, VolumeX } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useHorrorSounds } from '../hooks/useHorrorSounds';

const apps = [
  { id: 'ghost-editor', title: 'Ghost Editor', icon: Ghost },
  { id: 'pumpkin-mail', title: 'Pumpkin Mail', icon: Mail },
  { id: 'zombie-terminal', title: 'Zombie Terminal', icon: Terminal },
  { id: 'crypt-files', title: 'Crypt Files', icon: FolderOpen },
  { id: 'seance-chat', title: 'Séance Chat', icon: MessageCircle },
];

export const Taskbar = () => {
  const { windows, openWindow, setActiveWindow, minimizeWindow } = useWindowStore();
  const { volume, setVolume, ambientSoundEnabled, toggleAmbientSound } = useSystemStore();
  const [time, setTime] = useState(new Date());
  const sounds = useHorrorSounds();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  console.log('Taskbar rendering');

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="fixed bottom-0 left-0 right-0 h-12 sm:h-16 bg-gradient-to-t from-haunted-black to-haunted-blue border-t-2 border-haunted-accent flex items-center justify-between px-2 sm:px-4"
      style={{ zIndex: 300 }}
    >
      {/* Start Menu / App Launcher - Responsive */}
      <div className="flex gap-1 sm:gap-2 overflow-x-auto scrollbar-hide">
        {apps.map((app) => {
          const Icon = app.icon;
          const isOpen = windows.some((w) => w.appId === app.id);

          return (
            <motion.button
              key={app.id}
              
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const existingWindow = windows.find((w) => w.appId === app.id);
                if (existingWindow) {
                  // Random sound on click
                  const clickSounds = [
                    sounds.playClick,
                    sounds.playBonesCrack,
                    sounds.playShush,
                  ];
                  clickSounds[Math.floor(Math.random() * clickSounds.length)]();

                  if (existingWindow.minimized) {
                    minimizeWindow(existingWindow.id); // Toggle minimize
                  }
                  setActiveWindow(existingWindow.id);
                } else {
                  // Random sound on open
                  const openSounds = [
                    sounds.playWindowOpen,
                    sounds.playDoorCreak,
                    sounds.playGhostMoan,
                  ];
                  openSounds[Math.floor(Math.random() * openSounds.length)]();
                  openWindow(app.id, app.title);
                }
              }}
              onMouseEnter={() => sounds.playWhisper()}
              className={`w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                isOpen
                  ? 'bg-haunted-accent border-haunted-accent shadow-[0_0_15px_rgba(139,0,0,0.8)]'
                  : 'bg-haunted-blue border-haunted-accent hover:bg-haunted-red hover:shadow-[0_0_20px_rgba(139,0,0,1)]'
              }`}
              title={app.title}
              style={{
                filter: isOpen ? '' : 'none',
              }}
            >
              <Icon
                size={20}
                className={`sm:w-7 sm:h-7 ${
                  isOpen ? 'text-haunted-black' : 'text-haunted-text'
                }`}
              />
            </motion.button>
          );
        })}
      </div>

      {/* System Tray - Responsive */}
      <div className="flex items-center gap-1 sm:gap-4">
        {/* Volume Control */}
        <div className="flex items-center gap-[3px] sm:gap-2">
          <button
            onClick={toggleAmbientSound}
            className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl border border-haunted-accent hover:bg-haunted-red transition-all flex items-center justify-center"
          >
            {ambientSoundEnabled ? (
              <Volume2 size={14} className="sm:w-4 sm:h-4 text-haunted-text" />
            ) : (
              <VolumeX size={14} className="sm:w-4 sm:h-4 text-haunted-text" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={volume * 100}
            onChange={(e) => setVolume(Number(e.target.value) / 100)}
            className="w-11 sm:w-20 h-1 bg-haunted-blue rounded-xl appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #ff6b6b 0%, #ff6b6b ${
                volume * 100
              }%, #1a1a2e ${volume * 100}%, #1a1a2e 100%)`,
            }}
          />
        </div>

        {/* Clock */}
        <div className="font-mono text-haunted-accent text-[13px] sm:text-lg text-glow">
          {formatTime(time)}
        </div>
      </div>
    </motion.div>
  );
};
