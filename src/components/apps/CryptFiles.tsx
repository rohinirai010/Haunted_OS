import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, FileText, Image, Music, Video, File, Skull, X } from 'lucide-react';
import { useHorrorSounds } from '../../hooks/useHorrorSounds';

interface FileItem {
  name: string;
  type: 'folder' | 'file';
  icon: 'text' | 'image' | 'audio' | 'video' | 'unknown';
  size?: string;
  modified: string;
  cursed?: boolean;
}

export const CryptFiles = () => {
  const [currentPath] = useState('/home/user');
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [showCursedAlert, setShowCursedAlert] = useState(false);
  const [cursedFileName, setCursedFileName] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const sounds = useHorrorSounds();

  // Detect mobile to disable heavy animations
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const files: FileItem[] = [
    { name: 'Documents', type: 'folder', icon: 'unknown', modified: '2024-10-31 03:33' },
    { name: 'Pictures', type: 'folder', icon: 'unknown', modified: '2024-10-31 03:33' },
    { name: 'DO_NOT_OPEN', type: 'folder', icon: 'unknown', modified: '1666-06-06 06:66', cursed: true },
    { name: 'diary.txt', type: 'file', icon: 'text', size: '13 KB', modified: '2024-10-31 03:33' },
    { name: 'last_words.txt', type: 'file', icon: 'text', size: '666 bytes', modified: '2024-10-31 03:33', cursed: true },
    { name: 'family_photo.jpg', type: 'file', icon: 'image', size: '2.3 MB', modified: '2024-10-30 23:59' },
    { name: 'strange_recording.mp3', type: 'file', icon: 'audio', size: '4.4 MB', modified: '2024-10-31 03:33', cursed: true },
    { name: 'security_footage.mp4', type: 'file', icon: 'video', size: '66.6 MB', modified: '2024-10-31 03:33', cursed: true },
  ];

  const getIcon = (item: FileItem) => {
    if (item.type === 'folder') return <Folder size={20} className="text-haunted-accent" />;

    switch (item.icon) {
      case 'text': return <FileText size={20} className="text-haunted-text" />;
      case 'image': return <Image size={20} className="text-haunted-text" />;
      case 'audio': return <Music size={20} className="text-haunted-text" />;
      case 'video': return <Video size={20} className="text-haunted-text" />;
      default: return <File size={20} className="text-haunted-text" />;
    }
  };

  const playDemonicGrowl = () => {
    // Play a demonic growl/roar before the voice
    sounds.playDemonGrowl();
    setTimeout(() => sounds.playDemonGrowl(), 200);
    setTimeout(() => sounds.playDemonGrowl(), 400);
  };

  const speakGhostlyWarning = () => {
    // First play demonic growls
    playDemonicGrowl();

    // Then speak with ultra-demonic voice
    setTimeout(() => {
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(
          "You. opened a cursed file Now no one can save you."
        );

        // ULTRA DEMONIC SETTINGS - Maximum terror!
        utterance.pitch = 0.1; // Absolute minimum pitch (monster-like)
        utterance.rate = 0.5; // Very slow and deliberate
        utterance.volume = 1.0; // Maximum volume

        // Try to find the deepest, most menacing voice
        const voices = speechSynthesis.getVoices();
        const demonicVoice = voices.find(voice =>
          voice.name.toLowerCase().includes('male') ||
          voice.name.includes('David') ||
          voice.name.includes('Daniel') ||
          voice.name.includes('Fred') ||
          voice.lang.includes('en-GB') // British voices tend to be deeper
        );
        if (demonicVoice) {
          utterance.voice = demonicVoice;
        }

        speechSynthesis.speak(utterance);
      }
    }, 600); // Wait for growls to finish
  };

  const handleFileClick = (file: FileItem) => {
    setSelectedFile(file);
    if (file.cursed) {
      setTimeout(() => {
        setCursedFileName(file.name);
        setShowCursedAlert(true);

        // Play bomb blast sound when modal opens
        sounds.playBomb();

        // After bomb sound, play ghostly voice warning
        setTimeout(() => {
          speakGhostlyWarning();
        }, 800); // Wait for bomb to finish
      }, 100);
    }
  };

  return (
    <div className="h-full flex flex-col bg-haunted-black">
      {/* Path Bar */}
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-haunted-accent">
        <span className="text-sm text-haunted-text/70">Path:</span>
        <span className="text-sm text-haunted-accent font-mono">{currentPath}</span>
      </div>

      {/* File List */}
      <div className="flex-1 overflow-y-auto">
        <table className="w-full">
          <thead className="border-b-2 border-haunted-accent">
            <tr className="text-left text-[13px] sm:text-sm text-haunted-text">
              <th className="pb-2 pl-2">Name</th>
              <th className="pb-2">Type</th>
              <th className="pb-2">Size</th>
              <th className="pb-2">Modified</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file, i) => (
              <motion.tr
                key={i}
                whileHover={{ backgroundColor: 'rgba(139, 0, 0, 0.2)' }}
                onClick={() => handleFileClick(file)}
                className={`border-b border-haunted-blue cursor-pointer whitespace-nowrap ${selectedFile?.name === file.name ? 'bg-haunted-blue' : ''
                  } ${file.cursed ? 'text-haunted-accent' : 'text-haunted-text'}`}
              >
                <td className="py-2 pl-2 ">
                  <div className="flex items-center gap-2">
                    {getIcon(file)}
                    <span className={`text-[13px] sm:text-sm ${file.cursed ? 'glitch-text' : ''}`}>
                      {file.name}
                    </span>
                    {file.cursed && (
                      <span className="text-xs text-haunted-accent">⚠️</span>
                    )}
                  </div>
                </td>
                <td className="py-2 pl-2 text-[13px] sm:text-sm">{file.type}</td>
                <td className="py-2 pl-2 text-[13px] sm:text-sm">{file.size || '-'}</td>
                <td className="py-2 pl-2 text-[13px] sm:text-sm font-mono">{file.modified}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* File Preview */}
      {selectedFile && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 border-t-2 border-haunted-accent bg-haunted-blue/20"
        >
          <h3 className="text-sm font-bold text-haunted-accent mb-2">Preview: {selectedFile.name}</h3>
          {selectedFile.cursed ? (
            <div className="text-sm text-haunted-accent font-mono">
              <p className="glitch-text">ERROR: File corrupted by paranormal activity</p>
              <p className="mt-2">Last accessed: Never (file refuses to open)</p>
              <p>Warning: This file may contain malevolent entities</p>
            </div>
          ) : (
            <div className="text-sm text-haunted-text">
              <p>Type: {selectedFile.type}</p>
              {selectedFile.size && <p>Size: {selectedFile.size}</p>}
              <p>Modified: {selectedFile.modified}</p>
            </div>
          )}
        </motion.div>
      )}

      {/* Custom Haunted Alert Modal - Rendered at document body level */}
      {showCursedAlert && createPortal(
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCursedAlert(false)}
            style={{ zIndex: 9998 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          />

          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
              padding: '1rem',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isMobile ? {
                opacity: 1,
                scale: 1,
              } : {
                opacity: 1,
                scale: 1,
                x: [0, -3, 3, -3, 3, -2, 2, -1, 1, 0],
                y: [0, -2, 2, -2, 2, -1, 1, -1, 1, 0],
                rotate: [0, -1, 1, -1, 1, -0.5, 0.5, 0],
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={isMobile ? {
                duration: 0.2,
              } : {
                opacity: { duration: 0.2 },
                scale: { duration: 0.2 },
                x: { duration: 0.6, repeat: Infinity, repeatDelay: 2 },
                y: { duration: 0.6, repeat: Infinity, repeatDelay: 2 },
                rotate: { duration: 0.6, repeat: Infinity, repeatDelay: 2 },
              }}
              style={{
                width: '100%',
                maxWidth: '28rem',
                maxHeight: '90vh',
                overflowY: 'auto',
              }}
            >
              <div className="bg-haunted-black border-4 border-haunted-red rounded-2xl shadow-[0_0_50px_rgba(139,0,0,0.8)] overflow-hidden">
                {/* Skull Header */}
                <div className="bg-gradient-to-b from-haunted-red to-haunted-black p-4 border-b-2 border-haunted-accent relative overflow-hidden">
                  {!isMobile && (
                  <motion.div
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-haunted-accent/10"
                  />
                  )}
                  <div className="relative flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                      <motion.div
                        animate={isMobile ? {} : {
                          rotate: [0, -8, 8, -8, 8, -5, 5, 0],
                          scale: [1, 1.15, 0.95, 1.15, 0.95, 1.1, 1],
                          x: [0, -2, 2, -2, 2, 0],
                          y: [0, -1, 1, -1, 1, 0],
                        }}
                        transition={isMobile ? {} : {
                          duration: 0.8,
                          repeat: Infinity,
                          repeatDelay: 0.5,
                        }}
                        className="flex-shrink-0"
                      >
                        <Skull className="w-6 h-6 sm:w-8 sm:h-8 text-haunted-accent drop-shadow-[0_0_8px_rgba(255,107,107,0.8)]" />
                      </motion.div>
                      <h2 className="text-sm sm:text-lg md:text-xl font-bold text-haunted-accent text-glow truncate">
                        ⚠️ CURSED FILE
                      </h2>
                    </div>
                    <button
                      onClick={() => setShowCursedAlert(false)}
                      className="text-haunted-text hover:text-haunted-accent transition-colors flex-shrink-0"
                    >
                      <X className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                  </div>
                </div>

                {/* Alert Content */}
                <div className="p-3 sm:p-5 space-y-3 sm:space-y-4">
                  <motion.div
                    animate={isMobile ? {} : {
                      opacity: [0.8, 1, 0.8],
                      scale: [1, 1.05, 1],
                      x: [0, -2, 2, -2, 2, 0],
                    }}
                    transition={isMobile ? {} : {
                      opacity: { duration: 1.5, repeat: Infinity },
                      scale: { duration: 1.5, repeat: Infinity },
                      x: { duration: 0.5, repeat: Infinity, repeatDelay: 1 },
                    }}
                    className="text-center"
                  >
                    <motion.p
                      className="text-xl sm:text-2xl mb-2"
                      animate={isMobile ? {} : {
                        rotate: [0, -5, 5, -5, 5, 0],
                      }}
                      transition={isMobile ? {} : { duration: 0.6, repeat: Infinity, repeatDelay: 1.5 }}
                    >
                      💀 ⚰️ 👻
                    </motion.p>
                    <p className="text-sm sm:text-base md:text-lg text-haunted-accent font-bold glitch-text">
                      DANGER: PARANORMAL ACTIVITY DETECTED
                    </p>
                  </motion.div>

                  <motion.div
                    className="bg-haunted-blue/30 border-2 border-haunted-accent rounded-xl p-2 sm:p-3 space-y-2"
                    animate={isMobile ? {} : {
                      borderColor: ['rgba(255,107,107,1)', 'rgba(139,0,0,1)', 'rgba(255,107,107,1)'],
                      boxShadow: [
                        '0 0 10px rgba(255,107,107,0.5)',
                        '0 0 20px rgba(255,107,107,0.8)',
                        '0 0 10px rgba(255,107,107,0.5)',
                      ],
                    }}
                    transition={isMobile ? {} : { duration: 1.5, repeat: Infinity }}
                  >
                    <p className="text-xs sm:text-sm text-haunted-text break-all">
                      <span className="text-haunted-accent font-bold">File:</span>{' '}
                      <span className="font-mono">{cursedFileName}</span>
                    </p>
                    <p className="text-xs sm:text-sm text-haunted-text">
                      <span className="text-haunted-accent font-bold">Status:</span>{' '}
                      <span className="text-haunted-red">CURSED</span>
                    </p>
                    <p className="text-xs sm:text-sm text-haunted-text">
                      <span className="text-haunted-accent font-bold">Threat Level:</span>{' '}
                      <span className="text-haunted-red font-bold">EXTREME</span>
                    </p>
                  </motion.div>

                  <div className="space-y-2 text-xs sm:text-sm text-haunted-text">
                    <p className="flex items-start gap-2">
                      <span className="text-haunted-accent flex-shrink-0">⚠️</span>
                      <span>This file contains malevolent entities</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-haunted-accent flex-shrink-0">⚠️</span>
                      <span>Opening may result in paranormal consequences</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-haunted-accent flex-shrink-0">⚠️</span>
                      <span>Your soul may be at risk</span>
                    </p>
                  </div>

                  <motion.div
                    animate={isMobile ? {} : {
                      boxShadow: [
                        '0 0 10px rgba(139,0,0,0.5)',
                        '0 0 20px rgba(139,0,0,0.8)',
                        '0 0 10px rgba(139,0,0,0.5)',
                      ],
                    }}
                    transition={isMobile ? {} : { duration: 1.5, repeat: Infinity }}
                    className="bg-haunted-red/20 border border-haunted-red rounded-xl p-2 sm:p-3 text-center"
                  >
                    <p className="text-xs sm:text-sm text-haunted-accent font-bold">
                      "The dead do not rest in this file..."
                    </p>
                  </motion.div>

                  {/* Close Button */}
                  <button
                    onClick={() => setShowCursedAlert(false)}
                    className="w-full py-2 sm:py-3 bg-haunted-red hover:bg-haunted-accent border-2 border-haunted-accent rounded-xl text-haunted-text text-sm sm:text-base font-bold transition-all transform hover:scale-105 active:scale-95 touch-manipulation"
                  >
                    I UNDERSTAND THE RISKS
                  </button>
                </div>

                {/* Animated Border Glow - Disabled on mobile */}
                {!isMobile && (
                <motion.div
                  animate={{
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    boxShadow: 'inset 0 0 30px rgba(139,0,0,0.5)',
                  }}
                />
                )}
              </div>
            </motion.div>
          </div>
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
};
