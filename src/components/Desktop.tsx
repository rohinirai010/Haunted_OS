import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useWindowStore } from '../store/windowStore';
import { WindowManager } from './WindowManager';
import { Taskbar } from './Taskbar';
import { GhostEditor } from './apps/GhostEditor';
import { PumpkinMail } from './apps/PumpkinMail';
import { ZombieTerminal } from './apps/ZombieTerminal';
import { CryptFiles } from './apps/CryptFiles';
import { SeanceChat } from './apps/SeanceChat';
import { useHorrorSounds } from '../hooks/useHorrorSounds';

const appComponents = {
  'ghost-editor': GhostEditor,
  'pumpkin-mail': PumpkinMail,
  'zombie-terminal': ZombieTerminal,
  'crypt-files': CryptFiles,
  'seance-chat': SeanceChat,
};

export const Desktop = () => {
  const { windows } = useWindowStore();
  const [glitch, setGlitch] = useState(false);
  const [shake, setShake] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showGhostJumpScare, setShowGhostJumpScare] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sounds = useHorrorSounds();

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // GHOST JUMP SCARE - only on initial desktop load when no apps are open
  useEffect(() => {
    // Only show if no windows are open (first time on desktop)
    if (windows.length === 0) {
      const timer = setTimeout(() => {
        setShowGhostJumpScare(true);

        // ULTIMATE HORROR MOVIE GHOST SOUNDS - Maximum Terror!
        sounds.playHorrorMovieGhostScream(); // Main terrifying ghost scream (multi-layered)
        setTimeout(() => sounds.playDemonicLaugh(), 600); // Evil demonic laughter
        setTimeout(() => sounds.playGhostlyWail(), 1200); // Haunting ghostly wail
        setTimeout(() => sounds.playDemonGrowl(), 1800); // Deep growl finish

        setShake(true);
        setTimeout(() => {
          setShowGhostJumpScare(false);
          setShake(false);
        }, 2500); // Extended to 2.5 seconds for full sound experience
      }, 1500); // Appears 1.5s after desktop loads

      return () => clearTimeout(timer);
    }
  }, []); // Only run once on mount

  useEffect(() => {
    // Random screen glitch effect - less frequent on mobile
    const glitchInterval = setInterval(() => {
      const threshold = isMobile ? 0.98 : 0.95; // Less frequent on mobile
      const rand = Math.random();
      if (rand > threshold) {
        setGlitch(true);
        // Play lighter sound on mobile occasionally
        if (isMobile && rand > 0.99) {
          sounds.playScreech(); // Only 1% chance on mobile
        } else if (!isMobile) {
          sounds.playScreech(); // Always on desktop
        }
        setTimeout(() => setGlitch(false), isMobile ? 50 : 100); // Shorter duration on mobile
      }
    }, isMobile ? 5000 : 2000); // Less frequent on mobile

    // Ambient horror sounds - MAXIMUM SCARY on desktop
    const ambientInterval = setInterval(() => {
      const rand = Math.random();
      
      if (isMobile) {
        // MOBILE - ALWAYS play a lighter sound for atmosphere
        const soundIndex = Math.floor(rand * 7); // 7 different lighter sounds
        
        switch(soundIndex) {
          case 0: sounds.playWhisper(); break;
          case 1: sounds.playDoorCreak(); break;
          case 2: sounds.playFootsteps(); break;
          case 3: sounds.playHeartbeat(); break;
          case 4: sounds.playShush(); break;
          case 5: sounds.playGhostMoan(); break;
          case 6: sounds.playCreepyAmbient(); break;
        }
      } else {
        // DESKTOP - ALWAYS PLAY A SOUND - Maximum horror!
        const soundIndex = Math.floor(rand * 14); // 14 different sounds
        
        switch(soundIndex) {
          case 0: sounds.playDistantScream(); break;
          case 1: sounds.playCrying(); break;
          case 2: sounds.playManiacalLaugh(); break;
          case 3: sounds.playCreepyAmbient(); break;
          case 4: sounds.playWhisper(); break;
          case 5: sounds.playHeartbeat(); break;
          case 6: sounds.playChainRattle(); break;
          case 7: sounds.playDoorCreak(); break;
          case 8: sounds.playFootsteps(); break;
          case 9: sounds.playGhostMoan(); break;
          case 10: sounds.playShush(); break;
          case 11: sounds.playBonesCrack(); break;
          case 12: sounds.playWitchCackle(); break;
          case 13: sounds.playDemonGrowl(); break;
        }
      }
    }, isMobile ? 8000 : 4000); // Every 8 seconds on mobile, 4 seconds on desktop

    // Random jump scares and dramatic effects - MAXIMUM SCARY on desktop
    const jumpScareInterval = setInterval(() => {
      const rand = Math.random();
      
      if (isMobile) {
        // MOBILE - More frequent scary sounds, no shake
        if (rand > 0.85) {
          sounds.playDistantScream(); // Distant scream
        } else if (rand > 0.70) {
          sounds.playChainRattle(); // Chain rattle
        } else if (rand > 0.55) {
          sounds.playBonesCrack(); // Bones cracking
        } else if (rand > 0.40) {
          sounds.playWitchCackle(); // Witch cackle
        } else if (rand > 0.25) {
          sounds.playCrying(); // Crying
        }
      } else {
        // DESKTOP - More frequent and varied jump scares!
        if (rand > 0.95) {
          sounds.playJumpScare();
          setShake(true);
          setTimeout(() => setShake(false), 500);
        } else if (rand > 0.90) {
          sounds.playThunder();
          setShake(true);
          setTimeout(() => setShake(false), 300);
        } else if (rand > 0.85) {
          sounds.playBomb();
          setShake(true);
          setTimeout(() => setShake(false), 400);
        } else if (rand > 0.80) {
          // Additional scary sounds with shake
          sounds.playDistantScream();
          setShake(true);
          setTimeout(() => setShake(false), 300);
        } else if (rand > 0.75) {
          sounds.playManiacalLaugh();
          setShake(true);
          setTimeout(() => setShake(false), 400);
        }
      }
    }, isMobile ? 15000 : 8000); // Every 15 seconds on mobile, 8 seconds on desktop

    return () => {
      clearInterval(glitchInterval);
      clearInterval(ambientInterval);
      clearInterval(jumpScareInterval);
    };
  }, [sounds, isMobile]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={`relative w-screen h-screen overflow-hidden bg-haunted-black ${shake ? 'shake' : ''}`}>
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Dark Grunge Texture */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, transparent 0%, rgba(139, 0, 0, 0.1) 50%, transparent 100%),
                             radial-gradient(circle at 80% 80%, transparent 0%, rgba(139, 0, 0, 0.1) 50%, transparent 100%),
                             repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)`
          }}
        />

        {/* Fog Effect - Disabled on mobile */}
        {!isMobile && (
          <motion.div
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 bg-gradient-to-t from-haunted-red/20 to-transparent"
          />
        )}

        {/* Moving Shadows - Disabled on mobile */}
        {!isMobile && (
          <>
            <motion.div
              animate={{
                x: mousePos.x * 0.02,
                y: mousePos.y * 0.02,
              }}
              transition={{ type: 'spring', stiffness: 50, damping: 20 }}
              className="absolute w-96 h-96 bg-haunted-accent/5 rounded-full blur-3xl"
              style={{ left: '20%', top: '30%' }}
            />
            <motion.div
              animate={{
                x: -mousePos.x * 0.03,
                y: -mousePos.y * 0.03,
              }}
              transition={{ type: 'spring', stiffness: 50, damping: 20 }}
              className="absolute w-96 h-96 bg-haunted-red/5 rounded-full blur-3xl"
              style={{ right: '20%', bottom: '30%' }}
            />
          </>
        )}
      </div>

      {/* VHS Scan Lines */}
      <div className="vhs-overlay" />

      {/* Glitch Effect */}
      <AnimatePresence>
        {glitch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-haunted-accent pointer-events-none z-40"
            style={{
              mixBlendMode: 'overlay',
            }}
          />
        )}
      </AnimatePresence>

      {/* TERRIFYING GHOST JUMP SCARE - Realistic Horror */}
      <AnimatePresence>
        {showGhostJumpScare && (
          <motion.div
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute inset-0 z-50 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at center, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.98) 100%)',
            }}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              {/* HORRIFYING GHOST FACE - Realistic and Terrifying */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{ duration: 0.3, repeat: 2 }}
                className="relative w-[600px] h-[700px]"
              >
                {/* Decayed skin texture */}
                <div className="absolute inset-0" style={{
                  background: `
                    radial-gradient(ellipse 60% 70% at 50% 40%, rgba(180,180,170,0.95) 0%, rgba(140,140,130,0.9) 30%, rgba(100,100,90,0.7) 60%, transparent 80%),
                    radial-gradient(circle at 30% 20%, rgba(120,110,100,0.3), transparent 40%),
                    radial-gradient(circle at 70% 25%, rgba(110,100,90,0.3), transparent 35%)
                  `,
                  filter: 'contrast(1.3) brightness(0.8)',
                }} />

                {/* Veins and decay marks */}
                <div className="absolute top-1/4 left-1/3 w-32 h-1 opacity-40" style={{
                  background: 'linear-gradient(90deg, transparent, rgba(100,0,0,0.8), transparent)',
                  filter: 'blur(0.5px)',
                  transform: 'rotate(-15deg)',
                }} />
                <div className="absolute top-1/3 right-1/3 w-24 h-1 opacity-40" style={{
                  background: 'linear-gradient(90deg, transparent, rgba(100,0,0,0.8), transparent)',
                  filter: 'blur(0.5px)',
                  transform: 'rotate(20deg)',
                }} />

                {/* DEEP HOLLOW EYE SOCKETS - Pitch Black */}
                <div className="absolute top-[28%] left-[22%] w-24 h-32" style={{
                  background: `
                    radial-gradient(ellipse 100% 120% at 50% 40%, rgba(0,0,0,1) 0%, rgba(10,0,0,0.98) 40%, rgba(30,0,0,0.8) 70%, transparent 90%)
                  `,
                  filter: 'blur(1px) contrast(1.5)',
                  boxShadow: 'inset 0 0 30px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.8)',
                  borderRadius: '50% 50% 45% 45%',
                  transform: 'rotate(-5deg)',
                }} />

                <div className="absolute top-[28%] right-[22%] w-24 h-32" style={{
                  background: `
                    radial-gradient(ellipse 100% 120% at 50% 40%, rgba(0,0,0,1) 0%, rgba(10,0,0,0.98) 40%, rgba(30,0,0,0.8) 70%, transparent 90%)
                  `,
                  filter: 'blur(1px) contrast(1.5)',
                  boxShadow: 'inset 0 0 30px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.8)',
                  borderRadius: '50% 50% 45% 45%',
                  transform: 'rotate(5deg)',
                }} />

                {/* GLOWING RED DEMONIC EYES - Deep inside sockets */}
                <motion.div
                  animate={{
                    opacity: [0.7, 1, 0.7],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 0.2, repeat: Infinity }}
                  className="absolute top-[35%] left-[27%] w-8 h-8 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(255,0,0,1) 0%, rgba(200,0,0,0.9) 30%, rgba(139,0,0,0.6) 60%, transparent 80%)',
                    boxShadow: '0 0 40px rgba(255,0,0,1), 0 0 60px rgba(255,0,0,0.8), inset 0 0 10px rgba(255,100,0,0.8)',
                    filter: 'brightness(1.5)',
                  }}
                />
                <motion.div
                  animate={{
                    opacity: [0.7, 1, 0.7],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 0.2, repeat: Infinity }}
                  className="absolute top-[35%] right-[27%] w-8 h-8 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(255,0,0,1) 0%, rgba(200,0,0,0.9) 30%, rgba(139,0,0,0.6) 60%, transparent 80%)',
                    boxShadow: '0 0 40px rgba(255,0,0,1), 0 0 60px rgba(255,0,0,0.8), inset 0 0 10px rgba(255,100,0,0.8)',
                    filter: 'brightness(1.5)',
                  }}
                />

                {/* Eye light beams */}
                <motion.div
                  animate={{ opacity: [0.6, 0.9, 0.6] }}
                  transition={{ duration: 0.3, repeat: Infinity }}
                  className="absolute top-[35%] left-[27%] w-8 h-96"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(255,0,0,0.4) 0%, rgba(255,0,0,0.2) 30%, transparent 60%)',
                    filter: 'blur(8px)',
                    transformOrigin: 'top center',
                  }}
                />
                <motion.div
                  animate={{ opacity: [0.6, 0.9, 0.6] }}
                  transition={{ duration: 0.3, repeat: Infinity }}
                  className="absolute top-[35%] right-[27%] w-8 h-96"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(255,0,0,0.4) 0%, rgba(255,0,0,0.2) 30%, transparent 60%)',
                    filter: 'blur(8px)',
                    transformOrigin: 'top center',
                  }}
                />

                {/* GAPING MOUTH - Screaming in agony */}
                <div className="absolute bottom-[25%] left-1/2 -translate-x-1/2 w-32 h-40" style={{
                  background: `
                    radial-gradient(ellipse 100% 130% at 50% 30%, rgba(0,0,0,1) 0%, rgba(20,0,0,0.95) 50%, rgba(60,0,0,0.7) 80%, transparent 95%)
                  `,
                  filter: 'blur(1px) contrast(1.4)',
                  boxShadow: 'inset 0 0 40px rgba(0,0,0,1), 0 0 30px rgba(100,0,0,0.8)',
                  borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%',
                }} />

                {/* Teeth - jagged and broken */}
                <div className="absolute bottom-[35%] left-1/2 -translate-x-1/2 flex gap-1">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-2 h-4" style={{
                      background: 'linear-gradient(to bottom, rgba(200,200,180,0.9), rgba(180,180,160,0.7))',
                      filter: 'brightness(0.7)',
                      transform: `rotate(${Math.random() * 20 - 10}deg) translateY(${Math.random() * 3}px)`,
                      boxShadow: '0 1px 2px rgba(0,0,0,0.5)',
                    }} />
                  ))}
                </div>

                {/* Blood dripping from mouth */}
                <motion.div
                  animate={{ height: ['0%', '100%'], opacity: [0.9, 0] }}
                  transition={{ duration: 0.6, repeat: 2 }}
                  className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-2"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(120,0,0,0.95) 0%, rgba(100,0,0,0.7) 50%, transparent 100%)',
                    filter: 'blur(0.5px)',
                  }}
                />

                {/* Nose cavity - decayed */}
                <div className="absolute top-[48%] left-1/2 -translate-x-1/2 w-12 h-8" style={{
                  background: 'radial-gradient(ellipse, rgba(0,0,0,0.9) 0%, rgba(30,0,0,0.6) 60%, transparent 80%)',
                  filter: 'blur(1px)',
                  borderRadius: '50% 50% 40% 40%',
                }} />

                {/* Cracked and decayed skin texture */}
                <div className="absolute top-[20%] left-[35%] w-16 h-1 opacity-50" style={{
                  background: 'rgba(60,50,40,0.8)',
                  filter: 'blur(0.3px)',
                  transform: 'rotate(45deg)',
                }} />
                <div className="absolute top-[25%] right-[38%] w-20 h-1 opacity-50" style={{
                  background: 'rgba(60,50,40,0.8)',
                  filter: 'blur(0.3px)',
                  transform: 'rotate(-35deg)',
                }} />

                {/* Ominous glow around entire face */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.4, 0.7, 0.4],
                  }}
                  transition={{ duration: 0.4, repeat: Infinity }}
                  className="absolute inset-0"
                  style={{
                    background: 'radial-gradient(ellipse 70% 80% at 50% 45%, transparent 30%, rgba(139,0,0,0.3) 60%, rgba(100,0,0,0.5) 75%, transparent 90%)',
                    filter: 'blur(30px)',
                  }}
                />

                {/* Ghostly mist emanating */}
                <motion.div
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.6, 0.3],
                    y: [0, -20, 0],
                  }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="absolute inset-0"
                  style={{
                    background: 'radial-gradient(ellipse 80% 90% at 50% 50%, transparent 40%, rgba(150,150,150,0.2) 70%, transparent 90%)',
                    filter: 'blur(40px)',
                  }}
                />
              </motion.div>

              {/* Screen distortion effect */}
              <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 0.2, repeat: Infinity }}
                className="absolute inset-0"
                style={{
                  background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,0,0,0.1) 2px, rgba(255,0,0,0.1) 4px)',
                  mixBlendMode: 'overlay',
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HANGING SKULLS WITH ROPES */}
      <motion.div
        animate={{
          y: [0, 15, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-0 left-1/4 z-20 pointer-events-none"
      >
        {/* Rope */}
        <div className="w-1 h-32 mx-auto" style={{
          background: 'linear-gradient(to bottom, rgba(80,60,40,0.9), rgba(60,40,20,0.8))',
          boxShadow: '1px 0 2px rgba(0,0,0,0.5)',
        }} />
        {/* Skull */}
        <div className="text-6xl filter drop-shadow-[0_0_10px_rgba(139,0,0,0.8)]">💀</div>
      </motion.div>

      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -7, 7, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        className="absolute top-0 right-1/3 z-20 pointer-events-none"
      >
        {/* Rope */}
        <div className="w-1 h-40 mx-auto" style={{
          background: 'linear-gradient(to bottom, rgba(80,60,40,0.9), rgba(60,40,20,0.8))',
          boxShadow: '1px 0 2px rgba(0,0,0,0.5)',
        }} />
        {/* Skull */}
        <div className="text-5xl filter drop-shadow-[0_0_10px_rgba(139,0,0,0.8)]">💀</div>
      </motion.div>

      <motion.div
        animate={{
          y: [0, 12, 0],
          rotate: [0, 6, -6, 0],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="absolute top-0 left-2/3 z-20 pointer-events-none"
      >
        {/* Rope */}
        <div className="w-1 h-36 mx-auto" style={{
          background: 'linear-gradient(to bottom, rgba(80,60,40,0.9), rgba(60,40,20,0.8))',
          boxShadow: '1px 0 2px rgba(0,0,0,0.5)',
        }} />
        {/* Skull */}
        <div className="text-6xl filter drop-shadow-[0_0_10px_rgba(139,0,0,0.8)]">💀</div>
      </motion.div>

      {/* PROMINENT GHOST SHADOW WALKING - Creepy Humanoid Figure */}
      <motion.div
        animate={{
          x: [-400, window.innerWidth + 400],
          opacity: [0, 0.85, 0.85, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute top-1/4 z-12 pointer-events-none"
      >
        {/* Ghost figure with clear humanoid shape */}
        <div className="relative w-64 h-96">
          {/* Head */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-24" style={{
            background: 'radial-gradient(ellipse, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0.6) 80%, transparent 95%)',
            filter: 'blur(8px)',
            borderRadius: '50% 50% 45% 45%',
          }} />

          {/* Glowing eyes */}
          <motion.div
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-3 left-1/2 -translate-x-1/2 flex gap-3"
          >
            <div className="w-2 h-2 rounded-full" style={{
              background: 'rgba(255,0,0,0.9)',
              boxShadow: '0 0 10px rgba(255,0,0,0.8)',
              filter: 'blur(1px)',
            }} />
            <div className="w-2 h-2 rounded-full" style={{
              background: 'rgba(255,0,0,0.9)',
              boxShadow: '0 0 10px rgba(255,0,0,0.8)',
              filter: 'blur(1px)',
            }} />
          </motion.div>

          {/* Neck/shoulders */}
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-24 h-12" style={{
            background: 'radial-gradient(ellipse, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.8) 60%, transparent 90%)',
            filter: 'blur(7px)',
          }} />

          {/* Torso - elongated and ghostly */}
          <div className="absolute top-28 left-1/2 -translate-x-1/2 w-32 h-48" style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.75) 70%, rgba(0,0,0,0.5) 90%, transparent 100%)',
            filter: 'blur(8px)',
            clipPath: 'polygon(20% 0%, 80% 0%, 90% 50%, 85% 100%, 15% 100%, 10% 50%)',
          }} />

          {/* Left arm - reaching out */}
          <motion.div
            animate={{
              rotate: [0, -15, 0],
              x: [0, -10, 0],
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-32 left-4 w-12 h-40"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.7) 60%, transparent 100%)',
              filter: 'blur(6px)',
              transformOrigin: 'top center',
            }}
          />

          {/* Right arm - reaching out */}
          <motion.div
            animate={{
              rotate: [0, 15, 0],
              x: [0, 10, 0],
            }}
            transition={{ duration: 4, repeat: Infinity, delay: 2 }}
            className="absolute top-32 right-4 w-12 h-40"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.7) 60%, transparent 100%)',
              filter: 'blur(6px)',
              transformOrigin: 'top center',
            }}
          />

          {/* Tattered cloak/dress bottom */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-32" style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 50%, transparent 100%)',
            filter: 'blur(10px)',
            clipPath: 'polygon(10% 0%, 90% 0%, 95% 30%, 85% 60%, 90% 100%, 70% 80%, 50% 100%, 30% 80%, 10% 100%, 15% 60%, 5% 30%)',
          }} />

          {/* Ominous aura around figure */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse, rgba(100,0,0,0.3) 0%, rgba(80,0,0,0.2) 40%, transparent 70%)',
              filter: 'blur(20px)',
            }}
          />
        </div>
      </motion.div>

      {/* SECOND GHOST SHADOW - Different path and appearance */}
      <motion.div
        animate={{
          x: [window.innerWidth + 400, -400],
          opacity: [0, 0.75, 0.75, 0],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: 'linear',
          delay: 15,
        }}
        className="absolute bottom-1/4 z-12 pointer-events-none"
      >
        {/* Hunched ghost figure */}
        <div className="relative w-56 h-80">
          {/* Head - tilted */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-16 h-20" style={{
            background: 'radial-gradient(ellipse, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0.5) 80%, transparent 95%)',
            filter: 'blur(7px)',
            borderRadius: '50% 50% 45% 45%',
            transform: 'rotate(-20deg) translateX(-10px)',
          }} />

          {/* Single glowing eye (side view) */}
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="absolute top-12 left-1/2 w-2 h-2 rounded-full"
            style={{
              background: 'rgba(255,0,0,0.9)',
              boxShadow: '0 0 12px rgba(255,0,0,0.9)',
              filter: 'blur(1px)',
            }}
          />

          {/* Hunched back */}
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-28 h-36" style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0.6) 80%, transparent 100%)',
            filter: 'blur(8px)',
            clipPath: 'polygon(30% 0%, 70% 0%, 80% 40%, 70% 100%, 30% 100%, 20% 40%)',
            transform: 'skewY(-5deg)',
          }} />

          {/* Dragging arm */}
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute top-40 left-2 w-10 h-48"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 70%, transparent 100%)',
              filter: 'blur(6px)',
              transform: 'rotate(30deg)',
            }}
          />

          {/* Dark aura */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{ duration: 3.5, repeat: Infinity }}
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse, rgba(80,0,0,0.4) 0%, rgba(60,0,0,0.2) 40%, transparent 70%)',
              filter: 'blur(25px)',
            }}
          />
        </div>
      </motion.div>

      {/* CREEPY CRAWLING SPIDERS - Simple falling - RESPONSIVE */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <motion.div
          key={`spider-${i}`}
          animate={{
            y: [-20, window.innerHeight + 50],
          }}
          transition={{
            duration: 12 + i * 2,
            repeat: Infinity,
            ease: 'linear',
            delay: i * 3,
          }}
          className="absolute z-20 pointer-events-none text-lg sm:text-xl md:text-2xl"
          style={{
            left: `${10 + i * 12}%`,
            top: 0,
            filter: 'drop-shadow(0 0 3px rgba(0,0,0,0.8))',
          }}
        >
          🕷️
        </motion.div>
      ))}

      {/* BIG SCARY SPIDER WEBS - Corner decorations */}
      {/* Top Left Corner Web */}
      <motion.div
        animate={{
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-0 left-0 w-64 h-64 z-15 pointer-events-none"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Radial threads */}
          <line
            x1="10"
            y1="10"
            x2="100"
            y2="100"
            stroke="rgba(200,200,200,0.4)"
            strokeWidth="1"
          />
          <line
            x1="100"
            y1="10"
            x2="100"
            y2="100"
            stroke="rgba(200,200,200,0.4)"
            strokeWidth="1"
          />
          <line
            x1="190"
            y1="10"
            x2="100"
            y2="100"
            stroke="rgba(200,200,200,0.4)"
            strokeWidth="1"
          />
          <line
            x1="10"
            y1="100"
            x2="100"
            y2="100"
            stroke="rgba(200,200,200,0.4)"
            strokeWidth="1"
          />
          <line
            x1="10"
            y1="50"
            x2="100"
            y2="100"
            stroke="rgba(200,200,200,0.4)"
            strokeWidth="1"
          />
          <line
            x1="50"
            y1="10"
            x2="100"
            y2="100"
            stroke="rgba(200,200,200,0.4)"
            strokeWidth="1"
          />
          <line
            x1="150"
            y1="10"
            x2="100"
            y2="100"
            stroke="rgba(200,200,200,0.4)"
            strokeWidth="1"
          />

          {/* Circular threads */}
          <circle
            cx="100"
            cy="100"
            r="20"
            fill="none"
            stroke="rgba(200,200,200,0.5)"
            strokeWidth="1.5"
          />
          <circle
            cx="100"
            cy="100"
            r="40"
            fill="none"
            stroke="rgba(200,200,200,0.4)"
            strokeWidth="1.2"
          />
          <circle
            cx="100"
            cy="100"
            r="60"
            fill="none"
            stroke="rgba(200,200,200,0.35)"
            strokeWidth="1"
          />
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="rgba(200,200,200,0.3)"
            strokeWidth="0.8"
          />

          {/* Spider in center */}
          <circle cx="100" cy="100" r="4" fill="rgba(0,0,0,0.8)" />
        </svg>
        {/* Spider emoji on web */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl">
          🕷️
        </div>
      </motion.div>

      {/* Top Right Corner Web */}
      <motion.div
        animate={{
          opacity: [0.5, 0.75, 0.5],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        className="absolute top-0 right-0 w-56 h-56 z-15 pointer-events-none"
      >
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full"
          style={{ transform: 'scaleX(-1)' }}
        >
          {/* Radial threads */}
          <line
            x1="10"
            y1="10"
            x2="100"
            y2="100"
            stroke="rgba(200,200,200,0.4)"
            strokeWidth="1"
          />
          <line
            x1="100"
            y1="10"
            x2="100"
            y2="100"
            stroke="rgba(200,200,200,0.4)"
            strokeWidth="1"
          />
          <line
            x1="190"
            y1="10"
            x2="100"
            y2="100"
            stroke="rgba(200,200,200,0.4)"
            strokeWidth="1"
          />
          <line
            x1="10"
            y1="100"
            x2="100"
            y2="100"
            stroke="rgba(200,200,200,0.4)"
            strokeWidth="1"
          />
          <line
            x1="10"
            y1="50"
            x2="100"
            y2="100"
            stroke="rgba(200,200,200,0.4)"
            strokeWidth="1"
          />
          <line
            x1="50"
            y1="10"
            x2="100"
            y2="100"
            stroke="rgba(200,200,200,0.4)"
            strokeWidth="1"
          />

          {/* Circular threads */}
          <circle
            cx="100"
            cy="100"
            r="25"
            fill="none"
            stroke="rgba(200,200,200,0.45)"
            strokeWidth="1.5"
          />
          <circle
            cx="100"
            cy="100"
            r="50"
            fill="none"
            stroke="rgba(200,200,200,0.35)"
            strokeWidth="1.2"
          />
          <circle
            cx="100"
            cy="100"
            r="75"
            fill="none"
            stroke="rgba(200,200,200,0.3)"
            strokeWidth="1"
          />
        </svg>
        <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 text-xl">
          🕷️
        </div>
      </motion.div>

      {/* Bottom Left Corner Web */}
      <motion.div
        animate={{
          opacity: [0.55, 0.8, 0.55],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="absolute bottom-0 left-0 w-48 h-48 z-15 pointer-events-none"
      >
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full"
          style={{ transform: 'scaleY(-1)' }}
        >
          {/* Radial threads */}
          <line
            x1="10"
            y1="10"
            x2="100"
            y2="100"
            stroke="rgba(200,200,200,0.4)"
            strokeWidth="1"
          />
          <line
            x1="100"
            y1="10"
            x2="100"
            y2="100"
            stroke="rgba(200,200,200,0.4)"
            strokeWidth="1"
          />
          <line
            x1="190"
            y1="10"
            x2="100"
            y2="100"
            stroke="rgba(200,200,200,0.4)"
            strokeWidth="1"
          />
          <line
            x1="10"
            y1="100"
            x2="100"
            y2="100"
            stroke="rgba(200,200,200,0.4)"
            strokeWidth="1"
          />
          <line
            x1="150"
            y1="10"
            x2="100"
            y2="100"
            stroke="rgba(200,200,200,0.4)"
            strokeWidth="1"
          />

          {/* Circular threads */}
          <circle
            cx="100"
            cy="100"
            r="30"
            fill="none"
            stroke="rgba(200,200,200,0.4)"
            strokeWidth="1.3"
          />
          <circle
            cx="100"
            cy="100"
            r="55"
            fill="none"
            stroke="rgba(200,200,200,0.35)"
            strokeWidth="1.1"
          />
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="rgba(200,200,200,0.3)"
            strokeWidth="0.9"
          />
        </svg>
        <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 text-xl">
          🕷️
        </div>
      </motion.div>

      {/* Center Large Web - Partially visible */}
      <motion.div
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/3 right-1/4 w-80 h-80 z-8 pointer-events-none"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Radial threads - more of them */}
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x = 100 + Math.cos(angle) * 90;
            const y = 100 + Math.sin(angle) * 90;
            return (
              <line
                key={i}
                x1="100"
                y1="100"
                x2={x}
                y2={y}
                stroke="rgba(200,200,200,0.3)"
                strokeWidth="0.8"
              />
            );
          })}

          {/* Circular threads */}
          <circle
            cx="100"
            cy="100"
            r="15"
            fill="none"
            stroke="rgba(200,200,200,0.4)"
            strokeWidth="1.2"
          />
          <circle
            cx="100"
            cy="100"
            r="30"
            fill="none"
            stroke="rgba(200,200,200,0.35)"
            strokeWidth="1.1"
          />
          <circle
            cx="100"
            cy="100"
            r="50"
            fill="none"
            stroke="rgba(200,200,200,0.3)"
            strokeWidth="1"
          />
          <circle
            cx="100"
            cy="100"
            r="70"
            fill="none"
            stroke="rgba(200,200,200,0.25)"
            strokeWidth="0.9"
          />
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="rgba(200,200,200,0.2)"
            strokeWidth="0.8"
          />
        </svg>
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl"
        >
          🕷️
        </motion.div>
      </motion.div>

      {/* BATS FLYING ACROSS - Multiple bats with varying opacity - RESPONSIVE */}
      {/* Bat 1 - Main bat */}
      <motion.div
        animate={{
          x: [-100, window.innerWidth + 100],
          y: [100, 200, 150, 100],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute top-20 z-20 pointer-events-none text-2xl sm:text-3xl md:text-4xl"
        style={{ opacity: 0.8 }}
      >
        🦇
      </motion.div>

      {/* Bat 2 - Opposite direction */}
      <motion.div
        animate={{
          x: [window.innerWidth + 100, -100],
          y: [150, 250, 200, 150],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
          delay: 6,
        }}
        className="absolute top-32 z-20 pointer-events-none text-xl sm:text-2xl md:text-3xl"
        style={{ opacity: 0.7 }}
      >
        🦇
      </motion.div>

      {/* Bat 3 - Background bat (lower opacity) */}
      <motion.div
        animate={{
          x: [-150, window.innerWidth + 150],
          y: [80, 150, 120, 80],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'linear',
          delay: 3,
        }}
        className="absolute top-10 z-15 pointer-events-none text-xl sm:text-2xl md:text-3xl"
        style={{ opacity: 0.4 }}
      >
        🦇
      </motion.div>

      {/* Bat 4 - Small distant bat */}
      <motion.div
        animate={{
          x: [window.innerWidth + 100, -100],
          y: [200, 280, 240, 200],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
          delay: 10,
        }}
        className="absolute top-40 z-15 pointer-events-none text-lg sm:text-xl md:text-2xl"
        style={{ opacity: 0.35 }}
      >
        🦇
      </motion.div>

      {/* Bat 5 - High flying bat */}
      <motion.div
        animate={{
          x: [-80, window.innerWidth + 80],
          y: [50, 120, 90, 50],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'linear',
          delay: 7,
        }}
        className="absolute top-5 z-18 pointer-events-none text-xl sm:text-2xl md:text-3xl"
        style={{ opacity: 0.5 }}
      >
        🦇
      </motion.div>

      {/* Bat 6 - Lower path bat */}
      <motion.div
        animate={{
          x: [window.innerWidth + 120, -120],
          y: [300, 380, 340, 300],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'linear',
          delay: 4,
        }}
        className="absolute top-60 z-15 pointer-events-none text-lg sm:text-xl md:text-2xl"
        style={{ opacity: 0.45 }}
      >
        🦇
      </motion.div>

      {/* GRAVEYARD TOMBSTONES - Realistic stone graves */}
      {/* Tombstone 1 - Left side */}
      <motion.div
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-20 right-16 z-10 pointer-events-none"
      >
        <div className="relative">
          {/* Tombstone */}
          <div className="w-24 h-32 rounded-t-full" style={{
            background: 'linear-gradient(135deg, rgba(80,80,75,0.9) 0%, rgba(60,60,55,0.85) 50%, rgba(40,40,35,0.8) 100%)',
            boxShadow: 'inset -3px -3px 8px rgba(0,0,0,0.6), inset 3px 3px 8px rgba(100,100,100,0.3), 0 8px 20px rgba(0,0,0,0.8)',
            border: '1px solid rgba(50,50,45,0.8)',
          }}>
            {/* RIP text */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 text-center">
              <div className="text-sm font-bold opacity-70" style={{
                color: 'rgba(200,200,200,0.8)',
                textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                fontFamily: 'serif',
              }}>
                R.I.P
              </div>
              <div className="text-xs mt-1 opacity-60" style={{
                color: 'rgba(180,180,180,0.7)',
                textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                fontFamily: 'serif',
              }}>
                1892
              </div>
            </div>
            {/* Cracks */}
            <div className="absolute top-1/3 left-2 w-16 h-px opacity-40" style={{
              background: 'rgba(30,30,30,0.8)',
              transform: 'rotate(-15deg)',
            }} />
          </div>
          {/* Ground/grass */}
          <div className="absolute -bottom-2 left-0 w-full h-4" style={{
            background: 'linear-gradient(to top, rgba(40,60,30,0.6), transparent)',
          }} />
        </div>
      </motion.div>

      {/* Tombstone 2 - Right side, tilted */}
      <motion.div
        animate={{
          y: [0, -3, 0],
          rotate: [8, 10, 8],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-24 right-20 z-10 pointer-events-none"
      >
        <div className="relative">
          {/* Tombstone - rectangular with pointed top */}
          <div
            className="relative w-20 h-28"
            style={{
              background:
                'linear-gradient(135deg, rgba(70,70,65,0.9) 0%, rgba(50,50,45,0.85) 50%, rgba(35,35,30,0.8) 100%)',
              boxShadow:
                'inset -2px -2px 6px rgba(0,0,0,0.6), inset 2px 2px 6px rgba(90,90,90,0.3), 0 6px 15px rgba(0,0,0,0.8)',
              clipPath: 'polygon(0% 15%, 50% 0%, 100% 15%, 100% 100%, 0% 100%)',
              border: '1px solid rgba(45,45,40,0.8)',
            }}
          >
            {/* Cross symbol */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2">
              <div
                className="w-1 h-8 bg-gray-400 opacity-60"
                style={{
                  boxShadow: '0 0 3px rgba(0,0,0,0.8)',
                }}
              />
              <div
                className="absolute top-2 left-1/2 -translate-x-1/2 w-6 h-1 bg-gray-400 opacity-60"
                style={{
                  boxShadow: '0 0 3px rgba(0,0,0,0.8)',
                }}
              />
            </div>
            {/* Date */}
            <div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs opacity-50"
              style={{
                color: 'rgba(180,180,180,0.7)',
                textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                fontFamily: 'serif',
              }}
            >
              1845
            </div>
          </div>
          {/* Moss/decay */}
          <div
            className="absolute top-0 left-0 w-full h-full opacity-30"
            style={{
              background:
                'radial-gradient(circle at 30% 40%, rgba(60,80,40,0.4), transparent 60%)',
            }}
          />

          {/* SCARY OWL ON RIGHT TOMBSTONE - With glowing red eyes */}
          <motion.div
            animate={{
              rotate: [-8, 8, -8],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
            className="absolute -top-8 sm:-top-9 left-1/3 -translate-x-1/2 z-20"
          >
            {/* Owl body */}
            <div className="relative text-2xl sm:text-3xl">🦉</div>

            {/* Glowing red eyes overlay */}
            <motion.div
              animate={{
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
              }}
              className="absolute top-1.5 left-1/2 -translate-x-1/2 flex gap-1.5"
            >
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background:
                    'radial-gradient(circle, rgba(255,0,0,1) 0%, rgba(200,0,0,0.8) 50%, transparent 70%)',
                  boxShadow: '0 0 8px rgba(255,0,0,1), 0 0 16px rgba(255,0,0,0.6)',
                }}
              />
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background:
                    'radial-gradient(circle, rgba(255,0,0,1) 0%, rgba(200,0,0,0.8) 50%, transparent 70%)',
                  boxShadow: '0 0 8px rgba(255,0,0,1), 0 0 16px rgba(255,0,0,0.6)',
                }}
              />
            </motion.div>

            {/* Red glow aura around owl */}
            <motion.div
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
              }}
              className="absolute inset-0 -z-10"
              style={{
                background:
                  'radial-gradient(circle, rgba(255,0,0,0.4) 0%, rgba(139,0,0,0.2) 50%, transparent 70%)',
                filter: 'blur(8px)',
              }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Tombstone 3 - Center, broken */}
      <motion.div
        animate={{
          y: [0, -4, 0],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
      >
        <div className="relative">
          {/* Broken tombstone */}
          <div
            className="w-28 h-36"
            style={{
              background:
                'linear-gradient(135deg, rgba(75,75,70,0.9) 0%, rgba(55,55,50,0.85) 50%, rgba(38,38,33,0.8) 100%)',
              boxShadow:
                'inset -3px -3px 8px rgba(0,0,0,0.6), inset 3px 3px 8px rgba(95,95,95,0.3), 0 8px 20px rgba(0,0,0,0.8)',
              clipPath:
                'polygon(0% 20%, 30% 0%, 70% 5%, 100% 20%, 95% 60%, 100% 100%, 0% 100%, 5% 60%)',
              border: '1px solid rgba(48,48,43,0.8)',
            }}
          >
            {/* Skull symbol */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 text-2xl opacity-60">
              💀
            </div>
            {/* Text */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
              <div
                className="text-xs opacity-50"
                style={{
                  color: 'rgba(180,180,180,0.7)',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                  fontFamily: 'serif',
                }}
              >
                HERE
                <br />
                LIES
              </div>
            </div>
            {/* Large crack */}
            <div
              className="absolute top-0 left-1/2 w-px h-full opacity-50"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(20,20,20,0.9), rgba(30,30,30,0.6))',
                transform: 'rotate(5deg)',
              }}
            />
          </div>
          {/* Dead grass around base */}
          <div
            className="absolute -bottom-3 left-0 w-full h-6"
            style={{
              background: 'linear-gradient(to top, rgba(50,40,30,0.5), transparent)',
            }}
          />

          {/* SCARY OWL ON CENTER TOMBSTONE - With glowing red eyes */}
          <motion.div
            animate={{
              rotate: [-5, 5, -5],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute -top-10 sm:-top-8 left-1/3 -translate-x-1/2 z-20"
          >
            {/* Owl body */}
            <div className="relative text-3xl sm:text-4xl">🦉</div>

            {/* Glowing red eyes overlay */}
            <motion.div
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-2"
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  background:
                    'radial-gradient(circle, rgba(255,0,0,1) 0%, rgba(200,0,0,0.8) 50%, transparent 70%)',
                  boxShadow: '0 0 10px rgba(255,0,0,1), 0 0 20px rgba(255,0,0,0.6)',
                }}
              />
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  background:
                    'radial-gradient(circle, rgba(255,0,0,1) 0%, rgba(200,0,0,0.8) 50%, transparent 70%)',
                  boxShadow: '0 0 10px rgba(255,0,0,1), 0 0 20px rgba(255,0,0,0.6)',
                }}
              />
            </motion.div>

            {/* Red glow aura around owl */}
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
              }}
              className="absolute inset-0 -z-10"
              style={{
                background:
                  'radial-gradient(circle, rgba(255,0,0,0.4) 0%, rgba(139,0,0,0.2) 50%, transparent 70%)',
                filter: 'blur(10px)',
              }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Tombstone 4 - Small, far left */}
      <motion.div
        animate={{
          y: [0, -2, 0],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="absolute bottom-28 left-32 z-10 pointer-events-none"
      >
        <div
          className="w-16 h-20 rounded-t-lg"
          style={{
            background:
              'linear-gradient(135deg, rgba(65,65,60,0.85) 0%, rgba(45,45,40,0.8) 50%, rgba(30,30,25,0.75) 100%)',
            boxShadow:
              'inset -2px -2px 6px rgba(0,0,0,0.6), 0 4px 10px rgba(0,0,0,0.7)',
            border: '1px solid rgba(40,40,35,0.7)',
          }}
        >
          <div
            className="absolute top-3 left-1/2 -translate-x-1/2 text-xs opacity-40"
            style={{
              color: 'rgba(170,170,170,0.7)',
              fontFamily: 'serif',
            }}
          >
            ⚰️
          </div>
        </div>
      </motion.div>

      {/* Tombstone 5 - Far right side */}
      <motion.div
        animate={{
          y: [0, -3, 0],
          rotate: [-5, -3, -5],
        }}
        transition={{
          duration: 4.2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.5,
        }}
        className="absolute bottom-20 right-32 z-10 pointer-events-none"
      >
        <div className="relative">
          {/* Tombstone - old and weathered */}
          <div
            className="w-22 h-30 rounded-t-full"
            style={{
              background:
                'linear-gradient(135deg, rgba(75,75,70,0.9) 0%, rgba(55,55,50,0.85) 50%, rgba(40,40,35,0.8) 100%)',
              boxShadow:
                'inset -3px -3px 8px rgba(0,0,0,0.6), inset 3px 3px 8px rgba(90,90,90,0.3), 0 6px 18px rgba(0,0,0,0.8)',
              border: '1px solid rgba(48,48,43,0.8)',
              width: '88px',
              height: '120px',
            }}
          >
            {/* R.I.P text */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 text-center">
              <div
                className="text-sm font-bold opacity-65"
                style={{
                  color: 'rgba(190,190,190,0.8)',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                  fontFamily: 'serif',
                }}
              >
                R.I.P
              </div>
              <div
                className="text-xs mt-1 opacity-55"
                style={{
                  color: 'rgba(170,170,170,0.7)',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                  fontFamily: 'serif',
                }}
              >
                1867
              </div>
            </div>
            {/* Cracks */}
            <div
              className="absolute top-1/3 left-2 w-14 h-px opacity-35"
              style={{
                background: 'rgba(30,30,30,0.8)',
                transform: 'rotate(-12deg)',
              }}
            />
            <div
              className="absolute top-1/2 right-3 w-10 h-px opacity-30"
              style={{
                background: 'rgba(30,30,30,0.7)',
                transform: 'rotate(18deg)',
              }}
            />
          </div>
          {/* Ground/grass */}
          <div
            className="absolute -bottom-2 left-0 w-full h-4"
            style={{
              background: 'linear-gradient(to top, rgba(40,60,30,0.6), transparent)',
            }}
          />
          {/* Moss on stone */}
          <div
            className="absolute top-0 left-0 w-full h-full opacity-25 rounded-t-full"
            style={{
              background:
                'radial-gradient(circle at 25% 35%, rgba(60,80,40,0.5), transparent 50%)',
            }}
          />
        </div>
      </motion.div>

      {/* Pentagram Background */}
      <motion.div
        animate={{
          rotate: [0, 360],
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[3rem] text-haunted-red z-0 pointer-events-none"
        style={{ filter: 'blur(3px)' }}
      >
        ⛧
      </motion.div>

      {/* Floating Demonic Symbols */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
          opacity: [0.3, 0.7, 0.3],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-20 right-20 text-6xl z-10 pointer-events-none filter drop-shadow-[0_0_10px_rgba(139,0,0,0.8)]"
      >
        👹
      </motion.div>

      <motion.div
        animate={{
          y: [0, 15, 0],
          x: [0, -15, 0],
          opacity: [0.2, 0.6, 0.2],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="absolute bottom-32 left-10 text-5xl z-10 pointer-events-none filter drop-shadow-[0_0_15px_rgba(139,0,0,1)]"
      >
        💀
      </motion.div>

      <motion.div
        animate={{
          y: [0, -25, 0],
          opacity: [0.2, 0.5, 0.2],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 4,
        }}
        className="absolute top-1/2 left-1/4 text-6xl z-10 pointer-events-none"
      >
        ⛧
      </motion.div>



      <motion.div
        animate={{
          y: [0, 10, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 3,
        }}
        className="absolute bottom-1/4 right-1/3 text-4xl z-10 pointer-events-none"
      >
        🕸️
      </motion.div>

      {/* Blood Drips - Static on mobile, animated on desktop */}
      {isMobile ? (
        <>
          <div className="absolute top-0 left-1/4 w-1 h-20 bg-gradient-to-b from-haunted-red to-transparent opacity-40" />
          <div className="absolute top-0 right-1/3 w-1 h-24 bg-gradient-to-b from-haunted-red to-transparent opacity-50" />
        </>
      ) : (
        <>
          <div className="absolute top-0 left-1/4 w-1 h-20 bg-gradient-to-b from-haunted-red to-transparent opacity-60 blood-drip" style={{ animationDelay: '0s' }} />
          <div className="absolute top-0 left-1/2 w-1 h-16 bg-gradient-to-b from-haunted-red to-transparent opacity-50 blood-drip" style={{ animationDelay: '2s' }} />
          <div className="absolute top-0 right-1/3 w-1 h-24 bg-gradient-to-b from-haunted-red to-transparent opacity-70 blood-drip" style={{ animationDelay: '4s' }} />
        </>
      )}



      {/* REALISTIC BLOOD SPLATTER 1 - Impact Pattern - Disabled on mobile */}
      {!isMobile && (
      <motion.div
        animate={{
          scale: [0, 1, 1],
          opacity: [0, 0.85, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 18,
        }}
        className="absolute top-10 right-20 w-80 h-80 z-10 pointer-events-none"
      >
        <div className="relative w-full h-full">
          {/* Main splatter */}
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(circle at 40% 40%, rgba(100,0,0,0.9) 0%, rgba(139,0,0,0.7) 15%, rgba(80,0,0,0.4) 35%, transparent 60%)',
            filter: 'blur(2px) contrast(1.5)',
          }} />
          {/* Splatter droplets */}
          <div className="absolute top-0 left-1/2 w-8 h-8 rounded-full" style={{
            background: 'radial-gradient(circle, rgba(100,0,0,0.8), transparent)',
            filter: 'blur(1px)',
          }} />
          <div className="absolute top-1/4 right-0 w-6 h-6 rounded-full" style={{
            background: 'radial-gradient(circle, rgba(120,0,0,0.7), transparent)',
            filter: 'blur(1px)',
          }} />
          <div className="absolute bottom-1/3 left-1/4 w-10 h-10 rounded-full" style={{
            background: 'radial-gradient(circle, rgba(100,0,0,0.75), transparent)',
            filter: 'blur(1.5px)',
          }} />
        </div>
      </motion.div>
      )}

      {/* REALISTIC BLOOD SPLATTER 2 - Arterial Spray Pattern - Disabled on mobile */}
      {!isMobile && (
      <motion.div
        animate={{
          scale: [0, 1.3, 1],
          opacity: [0, 0.75, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatDelay: 22,
          delay: 8,
        }}
        className="absolute bottom-32 left-32 w-96 h-64 z-10 pointer-events-none"
      >
        <div className="relative w-full h-full">
          {/* Spray pattern */}
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(45deg, rgba(100,0,0,0.85) 0%, rgba(120,0,0,0.6) 30%, rgba(80,0,0,0.3) 60%, transparent 80%)',
            filter: 'blur(3px) contrast(1.3)',
          }} />
          {/* Drip trails */}
          <div className="absolute top-0 left-1/4 w-1 h-32" style={{
            background: 'linear-gradient(to bottom, rgba(100,0,0,0.8), transparent)',
            filter: 'blur(0.5px)',
          }} />
          <div className="absolute top-0 left-1/2 w-2 h-40" style={{
            background: 'linear-gradient(to bottom, rgba(120,0,0,0.9), transparent)',
            filter: 'blur(0.5px)',
          }} />
          <div className="absolute top-0 right-1/3 w-1 h-24" style={{
            background: 'linear-gradient(to bottom, rgba(100,0,0,0.7), transparent)',
            filter: 'blur(0.5px)',
          }} />
        </div>
      </motion.div>
      )}

      {/* REALISTIC BLOOD DRIPS - Multiple streams - Disabled on mobile */}
      {!isMobile && (
      <>
      <motion.div
        animate={{
          height: ['0%', '100%'],
          opacity: [0.9, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatDelay: 16,
        }}
        className="absolute top-0 left-1/4 w-3 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(100,0,0,0.95) 0%, rgba(120,0,0,0.7) 40%, rgba(80,0,0,0.3) 70%, transparent 100%)',
          filter: 'blur(0.8px) contrast(1.2)',
          boxShadow: '0 0 3px rgba(139,0,0,0.5)',
        }}
      />

      <motion.div
        animate={{
          height: ['0%', '85%'],
          opacity: [0.85, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatDelay: 19,
          delay: 6,
        }}
        className="absolute top-0 right-1/3 w-4 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(120,0,0,1) 0%, rgba(100,0,0,0.6) 50%, rgba(80,0,0,0.2) 80%, transparent 100%)',
          filter: 'blur(1px) contrast(1.3)',
          boxShadow: '0 0 4px rgba(139,0,0,0.6)',
        }}
      />

      <motion.div
        animate={{
          height: ['0%', '70%'],
          opacity: [0.8, 0],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          repeatDelay: 20,
          delay: 3,
        }}
        className="absolute top-0 left-1/2 w-2 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(100,0,0,0.9) 0%, rgba(80,0,0,0.5) 60%, transparent 100%)',
          filter: 'blur(0.5px)',
        }}
      />
      </>
      )}

      {/* BLOODY HANDPRINT - Disabled on mobile */}
      {!isMobile && (
      <motion.div
        animate={{
          opacity: [0, 0.7, 0.7, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatDelay: 25,
        }}
        className="absolute top-1/3 right-10 w-32 h-40 z-10 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 20px 25px at 30% 30%, rgba(100,0,0,0.8), transparent 70%),
            radial-gradient(ellipse 15px 20px at 45% 25%, rgba(100,0,0,0.7), transparent 70%),
            radial-gradient(ellipse 15px 22px at 60% 28%, rgba(100,0,0,0.75), transparent 70%),
            radial-gradient(ellipse 12px 18px at 75% 32%, rgba(100,0,0,0.7), transparent 70%),
            radial-gradient(ellipse 40px 50px at 50% 70%, rgba(100,0,0,0.85), transparent 70%)
          `,
          filter: 'blur(1.5px) contrast(1.2)',
          transform: 'rotate(-15deg)',
        }}
      />
      )}

      {/* SCRATCH MARKS - Disabled on mobile */}
      {!isMobile && (
      <motion.div
        animate={{
          opacity: [0, 0.6, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatDelay: 30,
          delay: 10,
        }}
        className="absolute bottom-1/4 left-1/4 w-48 h-2 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(139,0,0,0.8) 20%, rgba(139,0,0,0.8) 80%, transparent)',
          filter: 'blur(0.5px)',
          transform: 'rotate(-25deg)',
          boxShadow: '0 8px 0 rgba(139,0,0,0.6), 0 16px 0 rgba(139,0,0,0.5), 0 24px 0 rgba(139,0,0,0.4)',
        }}
      />
      )}

      {/* CREEPY SHADOW FIGURES - Disabled on mobile */}
      {!isMobile && (
      <>
      <motion.div
        animate={{
          x: [-200, window.innerWidth + 200],
          opacity: [0, 0.4, 0.4, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute bottom-0 w-32 h-64 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
          filter: 'blur(8px)',
        }}
      />

      <motion.div
        animate={{
          x: [window.innerWidth + 200, -200],
          opacity: [0, 0.5, 0.5, 0],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: 'linear',
          delay: 15,
        }}
        className="absolute top-1/4 w-40 h-80 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.9), transparent)',
          filter: 'blur(10px)',
        }}
      />
      </>
      )}

      {/* MOBILE-FRIENDLY SCARY ELEMENTS - Lightweight animations */}
      {isMobile && (
        <>
          {/* Subtle red glow pulse - very light */}
          <motion.div
            animate={{
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-1/4 right-1/4 w-64 h-64 z-5 pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(139,0,0,0.3), transparent 60%)',
              filter: 'blur(20px)',
            }}
          />

          {/* Floating skull - simple animation */}
          <motion.div
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute bottom-32 left-10 text-4xl z-10 pointer-events-none filter drop-shadow-[0_0_10px_rgba(139,0,0,0.8)]"
          >
            💀
          </motion.div>

          {/* Floating ghost - simple animation */}
          <motion.div
            animate={{
              y: [0, -15, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
            className="absolute top-20 right-20 text-4xl z-10 pointer-events-none"
          >
            👻
          </motion.div>

          {/* Static tombstone */}
          <div className="absolute bottom-20 left-1/4 z-10 pointer-events-none opacity-60">
            <div className="text-5xl">🪦</div>
          </div>

          {/* Subtle creeping shadow - very light */}
          <motion.div
            animate={{
              opacity: [0, 0.2, 0],
              x: [-100, window.innerWidth + 100],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute bottom-0 w-24 h-48 z-10 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
              filter: 'blur(8px)',
            }}
          />

          {/* Pentagram - subtle rotation */}
          <motion.div
            animate={{
              rotate: [0, 360],
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{
              rotate: { duration: 40, repeat: Infinity, ease: 'linear' },
              opacity: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[2rem] text-haunted-red z-0 pointer-events-none"
            style={{ filter: 'blur(2px)' }}
          >
            ⛧
          </motion.div>
        </>
      )}

      {/* CREEPING DARKNESS FROM CORNERS - Disabled on mobile */}
      {!isMobile && (
      <>
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-0 left-0 w-96 h-96 z-5 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at top left, rgba(0,0,0,0.8), transparent 70%)',
        }}
      />

      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 3,
        }}
        className="absolute bottom-0 right-0 w-96 h-96 z-5 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at bottom right, rgba(0,0,0,0.9), transparent 70%)',
        }}
      />
      </>
      )}

      {/* GHOSTLY APPARITION - Disabled on mobile */}
      {!isMobile && (
      <motion.div
        animate={{
          opacity: [0, 0.3, 0],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatDelay: 20,
        }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-64 h-96 z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(200,200,200,0.2) 0%, rgba(150,150,150,0.1) 40%, transparent 70%)',
          filter: 'blur(15px)',
        }}
      />
      )}

      {/* OMINOUS RED GLOW PULSES - Disabled on mobile */}
      {!isMobile && (
      <>
      <motion.div
        animate={{
          opacity: [0.1, 0.4, 0.1],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 right-1/4 w-80 h-80 z-5 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(139,0,0,0.4), transparent 60%)',
          filter: 'blur(20px)',
        }}
      />

      <motion.div
        animate={{
          opacity: [0.1, 0.5, 0.1],
          scale: [1, 1.6, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="absolute bottom-1/3 left-1/4 w-96 h-96 z-5 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(139,0,0,0.5), transparent 60%)',
          filter: 'blur(25px)',
        }}
      />
      </>
      )}

      {/* BLOODY FOOTPRINTS - 2 PEOPLE WALKING IN OPPOSITE DIRECTIONS - Disabled on mobile */}
      {!isMobile && (
      <>
      {/* PERSON 1 - Walking LEFT to RIGHT (in front, z-15) */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((step) => {
        const isLeftFoot = step % 2 === 0;
        const xPosition = step * 85; // 85px between steps
        const yOffset = isLeftFoot ? 0 : 28; // Alternate feet

        return (
          <motion.div
            key={`footprint-front-${step}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.85, 0.65, 0.4],
              scale: [0, 1, 1, 1],
            }}
            transition={{
              duration: 0.5,
              delay: step * 0.75, // Each step appears 0.75s after previous
              repeat: Infinity,
              repeatDelay: 12,
            }}
            className="absolute z-15 pointer-events-none"
            style={{
              bottom: `${140 + yOffset}px`,
              left: `${-120 + xPosition}px`,
            }}
          >
            {/* Foot shape */}
            <div className="relative">
              <div
                className="w-10 h-14"
                style={{
                  background: 'radial-gradient(ellipse 50% 80% at 50% 30%, rgba(100,0,0,0.95) 0%, rgba(80,0,0,0.75) 40%, rgba(60,0,0,0.35) 70%, transparent 90%)',
                  filter: 'blur(1px) contrast(1.4)',
                  transform: isLeftFoot ? 'rotate(-10deg)' : 'rotate(10deg)',
                }}
              />
              {/* Toe marks */}
              <div className="absolute top-0 left-2 w-1.5 h-2.5 rounded-full" style={{
                background: 'rgba(100,0,0,0.85)',
                filter: 'blur(0.5px)',
              }} />
              <div className="absolute top-0 left-4 w-1.5 h-2.5 rounded-full" style={{
                background: 'rgba(100,0,0,0.85)',
                filter: 'blur(0.5px)',
              }} />
              <div className="absolute top-0 left-6 w-1.5 h-2.5 rounded-full" style={{
                background: 'rgba(100,0,0,0.85)',
                filter: 'blur(0.5px)',
              }} />
              <div className="absolute top-0 left-7.5 w-1 h-2 rounded-full" style={{
                background: 'rgba(100,0,0,0.75)',
                filter: 'blur(0.5px)',
              }} />
            </div>
          </motion.div>
        );
      })}

      {/* PERSON 2 - Walking RIGHT to LEFT (in back, z-8) */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((step) => {
        const isLeftFoot = step % 2 === 0;
        const xPosition = step * 95; // 95px between steps
        const yOffset = isLeftFoot ? 0 : 32;

        return (
          <motion.div
            key={`footprint-back-${step}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.75, 0.55, 0.35],
              scale: [0, 1, 1, 1],
            }}
            transition={{
              duration: 0.6,
              delay: step * 0.85,
              repeat: Infinity,
              repeatDelay: 14,
            }}
            className="absolute z-8 pointer-events-none"
            style={{
              top: `${220 + yOffset}px`,
              right: `${-130 + xPosition}px`,
            }}
          >
            {/* Foot shape */}
            <div className="relative">
              <div
                className="w-9 h-13"
                style={{
                  background: 'radial-gradient(ellipse 50% 80% at 50% 30%, rgba(120,0,0,0.9) 0%, rgba(100,0,0,0.65) 40%, rgba(80,0,0,0.3) 70%, transparent 90%)',
                  filter: 'blur(1.2px) contrast(1.25)',
                  transform: isLeftFoot ? 'rotate(12deg) scaleX(-1)' : 'rotate(-12deg) scaleX(-1)',
                }}
              />
              {/* Toe marks */}
              <div className="absolute top-0 left-2 w-1.5 h-2 rounded-full" style={{
                background: 'rgba(120,0,0,0.8)',
                filter: 'blur(0.5px)',
              }} />
              <div className="absolute top-0 left-4 w-1.5 h-2 rounded-full" style={{
                background: 'rgba(120,0,0,0.8)',
                filter: 'blur(0.5px)',
              }} />
              <div className="absolute top-0 left-5.5 w-1 h-1.5 rounded-full" style={{
                background: 'rgba(120,0,0,0.75)',
                filter: 'blur(0.5px)',
              }} />
            </div>
          </motion.div>
        );
      })}
      </>
      )}

      {/* Windows - Isolated from shake effect */}
      <div className="absolute inset-0 pointer-events-none shake-immune" style={{ zIndex: 200 }}>
        <AnimatePresence>
          {windows.map((window) => {
            const AppComponent = appComponents[window.appId as keyof typeof appComponents];
            return (
              <WindowManager key={window.id} windowId={window.id}>
                {AppComponent && <AppComponent windowId={window.id} />}
              </WindowManager>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Taskbar */}
      <Taskbar />
    </div>
  );
};