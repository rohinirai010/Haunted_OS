import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useHorrorSounds } from '../hooks/useHorrorSounds';

interface BootScreenProps {
  onBootComplete: () => void;
}

const bootMessages = [
  'INITIALIZING HAUNTED OS v6.66...',
  'LOADING CURSED KERNEL...',
  'SUMMONING GHOST PROCESSES...',
  'BINDING SHADOW MEMORY...',
  'AWAKENING DORMANT SPIRITS...',
  'ESTABLISHING ETHEREAL CONNECTION...',
  'BOOT SEQUENCE COMPLETE.',
];

export const BootScreen = ({ onBootComplete }: BootScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [messages, setMessages] = useState<string[]>([]);
  const sounds = useHorrorSounds();

  useEffect(() => {
    let messageIndex = 0;
    let progressValue = 0;

    // Play sounds
    sounds.playDemonGrowl();
    const voiceTimeout = setTimeout(() => {
      sounds.speakGhostVoice('Welcome... to the Haunted Operating System...', 0.1, 0.8);
    }, 1000);
    const laughTimeout = setTimeout(() => {
      sounds.playEvilLaugh();
    }, 5000);

    // Message animation
    const messageInterval = setInterval(() => {
      if (messageIndex < bootMessages.length) {
        setMessages(prev => [...prev, bootMessages[messageIndex]]);
        messageIndex++;
      }
    }, 400);

    // Progress animation
    const progressInterval = setInterval(() => {
      progressValue += Math.random() * 15;
      if (progressValue >= 100) {
        progressValue = 100;
        setProgress(100);
        clearInterval(progressInterval);
        clearInterval(messageInterval);
        setTimeout(() => onBootComplete(), 800);
      } else {
        setProgress(progressValue);
      }
    }, 300);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
      clearTimeout(voiceTimeout);
      clearTimeout(laughTimeout);
    };
    // Only run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-haunted-black flex flex-col items-center justify-center font-mono"
    >
      {/* VHS Static Effect */}
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')]" />

      {/* ASCII Logo - Responsive */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-haunted-accent mb-4 sm:mb-6 md:mb-8 text-center px-2"
      >
        {/* Mobile Logo - HAUNTED on one line, OS on next */}
        <div className="block sm:hidden">
          <pre className="text-glow text-[7px] leading-[0.9]">
            {`
  ██╗  ██╗ █████╗ ██╗   ██╗███╗   ██╗████████╗███████╗██████╗ 
  ██║  ██║██╔══██╗██║   ██║████╗  ██║╚══██╔══╝██╔════╝██╔══██╗
  ███████║███████║██║   ██║██╔██╗ ██║   ██║   █████╗  ██║  ██║
  ██╔══██║██╔══██║██║   ██║██║╚██╗██║   ██║   ██╔══╝  ██║  ██║
  ██║  ██║██║  ██║╚██████╔╝██║ ╚████║   ██║   ███████╗██████╔╝
  ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚═════╝ 
  
                ██████╗ ███████╗
               ██╔═══██╗██╔════╝
               ██║   ██║███████╗
               ██║   ██║╚════██║
               ╚██████╔╝███████║
                ╚═════╝ ╚══════╝
`}
          </pre>
        </div>

        {/* Tablet Logo - Medium */}
        <div className="hidden sm:block md:hidden">
          <pre className="text-glow text-xs sm:text-sm leading-tight">
            {`
  ██╗  ██╗ █████╗ ██╗   ██╗███╗   ██╗████████╗███████╗██████╗ 
  ██║  ██║██╔══██╗██║   ██║████╗  ██║╚══██╔══╝██╔════╝██╔══██╗
  ███████║███████║██║   ██║██╔██╗ ██║   ██║   █████╗  ██║  ██║
  ██╔══██║██╔══██║██║   ██║██║╚██╗██║   ██║   ██╔══╝  ██║  ██║
  ██║  ██║██║  ██║╚██████╔╝██║ ╚████║   ██║   ███████╗██████╔╝
  ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚═════╝ 
                    O P E R A T I N G   S Y S T E M
`}
          </pre>
        </div>

        {/* Desktop Logo - Full */}
        <div className="hidden md:block">
          <pre className="text-glow text-base md:text-lg lg:text-2xl">
            {`
  ██╗  ██╗ █████╗ ██╗   ██╗███╗   ██╗████████╗███████╗██████╗ 
  ██║  ██║██╔══██╗██║   ██║████╗  ██║╚══██╔══╝██╔════╝██╔══██╗
  ███████║███████║██║   ██║██╔██╗ ██║   ██║   █████╗  ██║  ██║
  ██╔══██║██╔══██║██║   ██║██║╚██╗██║   ██║   ██╔══╝  ██║  ██║
  ██║  ██║██║  ██║╚██████╔╝██║ ╚████║   ██║   ███████╗██████╔╝
  ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚═════╝ 
                        O P E R A T I N G   S Y S T E M
`}
          </pre>
        </div>
      </motion.div>

      {/* Boot Messages - Responsive */}
      <div className="w-full max-w-xs sm:max-w-md md:max-w-2xl px-4 sm:px-6 md:px-8 mb-4 sm:mb-6 md:mb-8 space-y-1 sm:space-y-2">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-haunted-text text-xs sm:text-sm break-words"
          >
            <span className="text-haunted-accent">&gt;</span> {msg}
          </motion.div>
        ))}
      </div>

      {/* Progress Bar - Responsive */}
      <div className="w-full max-w-xs sm:max-w-md md:max-w-2xl px-4 sm:px-6 md:px-8">
        <div className="h-5 sm:h-6 bg-haunted-blue border-2 border-haunted-accent relative overflow-hidden">
          <motion.div
            className="h-full bg-haunted-accent"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-xs sm:text-sm font-bold">
            {Math.floor(progress)}%
          </div>
        </div>
      </div>

      {/* Glitch Effect */}
      <motion.div
        animate={{
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 0.1,
          repeat: Infinity,
          repeatDelay: Math.random() * 3 + 2,
        }}
        className="absolute inset-0 bg-haunted-accent opacity-0 pointer-events-none"
      />
    </motion.div>
  );
};
