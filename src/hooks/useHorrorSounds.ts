import { useEffect, useRef } from 'react';
import { useSystemStore } from '../store/systemStore';

export const useHorrorSounds = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const { volume, ambientSoundEnabled } = useSystemStore();
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (!synthRef.current && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  const playTone = (frequency: number, duration: number, type: OscillatorType = 'sine', volumeMultiplier: number = 0.3) => {
    if (!ambientSoundEnabled || !audioContextRef.current) return;

    const ctx = audioContextRef.current;
    
    // Resume AudioContext if suspended (browser autoplay policy)
    if (ctx.state === 'suspended') {
      ctx.resume().catch(err => console.log('Audio resume failed:', err));
    }

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;
    gainNode.gain.value = volume * volumeMultiplier;

    oscillator.start(ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
    oscillator.stop(ctx.currentTime + duration);
  };

  const playCreepyAmbient = () => {
    if (!ambientSoundEnabled) return;
    // MENACING low frequency drone - multiple layers
    playTone(45, 4, 'sawtooth', 0.4);
    setTimeout(() => playTone(55, 3.5, 'square', 0.35), 300);
    setTimeout(() => playTone(65, 3, 'triangle', 0.3), 800);
    setTimeout(() => playTone(50, 2.5, 'sawtooth', 0.25), 1500);
  };

  const playWhisper = () => {
    if (!ambientSoundEnabled) return;
    // MENACING whisper - layered and distorted
    playTone(3200 + Math.random() * 800, 0.4, 'sine', 0.25);
    setTimeout(() => playTone(2800 + Math.random() * 600, 0.35, 'triangle', 0.2), 100);
    setTimeout(() => playTone(3500 + Math.random() * 700, 0.3, 'sine', 0.15), 200);
  };

  const playHeartbeat = () => {
    if (!ambientSoundEnabled) return;
    // INTENSE heartbeat - deeper and more menacing
    playTone(50, 0.15, 'sine', 0.5);
    setTimeout(() => playTone(55, 0.12, 'sine', 0.45), 80);
    setTimeout(() => playTone(50, 0.15, 'sine', 0.5), 200);
    setTimeout(() => playTone(55, 0.12, 'sine', 0.45), 280);
  };

  const playScreech = () => {
    if (!ambientSoundEnabled) return;
    // HORRIFYING screech - multiple dissonant layers
    playTone(900 + Math.random() * 500, 0.6, 'square', 0.5);
    setTimeout(() => playTone(1200 + Math.random() * 400, 0.5, 'sawtooth', 0.45), 50);
    setTimeout(() => playTone(700 + Math.random() * 300, 0.4, 'square', 0.4), 100);
  };

  const playDemonGrowl = () => {
    if (!ambientSoundEnabled) return;
    // DEEP demonic growl - multiple layers
    playTone(35, 2, 'sawtooth', 0.5);
    setTimeout(() => playTone(45, 1.8, 'square', 0.4), 200);
    setTimeout(() => playTone(50, 1.5, 'sawtooth', 0.3), 400);
  };

  const playWindowOpen = () => {
    if (!ambientSoundEnabled) return;
    playTone(200, 0.2, 'sine');
    setTimeout(() => playTone(150, 0.2, 'sine'), 100);
  };

  const playWindowClose = () => {
    if (!ambientSoundEnabled) return;
    playTone(150, 0.2, 'sine');
    setTimeout(() => playTone(100, 0.3, 'sine'), 100);
  };

  const playClick = () => {
    if (!ambientSoundEnabled) return;
    playTone(400, 0.05, 'square');
  };

  const speakGhostVoice = (text: string, pitch: number = 0.1, rate: number = 0.7) => {
    if (!ambientSoundEnabled || !synthRef.current) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = pitch; // Very low pitch for demonic voice
    utterance.rate = rate; // Slow speech
    utterance.volume = volume;
    
    // Try to find a deep/male voice
    const voices = synthRef.current.getVoices();
    const deepVoice = voices.find(v => 
      v.name.includes('Male') || 
      v.name.includes('Deep') ||
      v.name.includes('Bass')
    ) || voices[0];
    
    if (deepVoice) {
      utterance.voice = deepVoice;
    }

    synthRef.current.speak(utterance);
  };

  const playEvilLaugh = () => {
    if (!ambientSoundEnabled) return;
    
    // Create evil laugh sound effect
    const ctx = audioContextRef.current;
    if (!ctx) return;

    // Multiple overlapping tones for chaotic laugh
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        playTone(200 + Math.random() * 300, 0.2, 'sawtooth');
        playTone(400 + Math.random() * 200, 0.15, 'square');
      }, i * 150);
    }
  };

  const playJumpScare = () => {
    if (!ambientSoundEnabled) return;
    
    // TERRIFYING jump scare - VERY LOUD
    playTone(1800, 0.4, 'square', 0.8);
    setTimeout(() => playTone(1200, 0.5, 'sawtooth', 0.7), 50);
    setTimeout(() => playTone(600, 0.6, 'square', 0.6), 150);
  };

  const playChainRattle = () => {
    if (!ambientSoundEnabled) return;
    
    // Metallic chain sound
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        playTone(300 + Math.random() * 200, 0.1, 'square');
      }, i * 80);
    }
  };

  const playDistantScream = () => {
    if (!ambientSoundEnabled) return;
    
    // INTENSE scream - multiple layers
    playTone(2200, 2.5, 'square', 0.5);
    setTimeout(() => playTone(1900, 2, 'sawtooth', 0.4), 100);
    setTimeout(() => playTone(1600, 1.5, 'sine', 0.3), 300);
  };

  const playDoorCreak = () => {
    if (!ambientSoundEnabled) return;
    
    // Slow creaking sound
    playTone(150, 1, 'sawtooth');
    setTimeout(() => playTone(120, 0.8, 'sawtooth'), 500);
  };

  const playCrying = () => {
    if (!ambientSoundEnabled) return;
    
    // Crying/sobbing sound
    for (let i = 0; i < 6; i++) {
      setTimeout(() => {
        playTone(400 + Math.random() * 200, 0.3, 'sine');
        setTimeout(() => playTone(300, 0.2, 'sine'), 100);
      }, i * 400);
    }
  };

  const playBomb = () => {
    if (!ambientSoundEnabled) return;
    
    // ULTRA DANGEROUS EXPLOSION - Maximum terror!
    // Initial impact - multiple simultaneous explosions
    playTone(30, 1.0, 'sawtooth'); // Ultra deep bass
    playTone(45, 1.0, 'sawtooth'); // Deep boom
    playTone(200, 0.9, 'square'); // High crack
    
    // Shockwave layers
    setTimeout(() => {
      playTone(20, 1.0, 'sawtooth'); // Sub-bass rumble
      playTone(100, 1.0, 'square'); // Mid explosion
      playTone(300, 0.9, 'square'); // High frequency crack
    }, 40);
    
    setTimeout(() => {
      playTone(35, 1.0, 'sawtooth'); // Deep rumble
      playTone(150, 0.95, 'square'); // Sharp crack
      playTone(400, 0.85, 'square'); // Very high crack
    }, 80);
    
    setTimeout(() => {
      playTone(50, 0.95, 'sawtooth'); // Continuing boom
      playTone(120, 0.9, 'square'); // Mid crack
    }, 120);
    
    setTimeout(() => {
      playTone(40, 0.9, 'sawtooth'); // Aftershock
      playTone(180, 0.8, 'square'); // Echo
    }, 160);
    
    setTimeout(() => {
      playTone(30, 0.85, 'sawtooth'); // Deep echo
      playTone(90, 0.75, 'square'); // Fading crack
    }, 200);
    
    setTimeout(() => {
      playTone(25, 0.75, 'sawtooth'); // Final rumble
      playTone(60, 0.65, 'square'); // Last echo
    }, 250);
    
    setTimeout(() => {
      playTone(20, 0.6, 'sawtooth'); // Distant rumble
    }, 300);
  };

  const playManiacalLaugh = () => {
    if (!ambientSoundEnabled) return;
    
    // Crazy laughter
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        playTone(300 + Math.random() * 400, 0.15, 'square');
      }, i * 120);
    }
  };

  const playShush = () => {
    if (!ambientSoundEnabled) return;
    
    // Shushing sound
    playTone(4000, 0.8, 'sine');
    setTimeout(() => playTone(3500, 0.6, 'sine'), 200);
  };

  const playFootsteps = () => {
    if (!ambientSoundEnabled) return;
    
    // Walking footsteps
    for (let i = 0; i < 6; i++) {
      setTimeout(() => {
        playTone(80 + Math.random() * 40, 0.1, 'square');
      }, i * 300);
    }
  };

  const playGhostMoan = () => {
    if (!ambientSoundEnabled) return;
    
    // Ghostly moaning
    playTone(200, 2, 'sine');
    setTimeout(() => playTone(180, 1.5, 'sine'), 500);
  };

  const playThunder = () => {
    if (!ambientSoundEnabled) return;
    
    // Thunder crash
    playTone(40, 0.2, 'sawtooth');
    setTimeout(() => playTone(60, 1.5, 'sawtooth'), 100);
  };

  const playBonesCrack = () => {
    if (!ambientSoundEnabled) return;
    
    // Bones cracking
    for (let i = 0; i < 4; i++) {
      setTimeout(() => {
        playTone(200 + Math.random() * 100, 0.08, 'square');
      }, i * 150);
    }
  };

  const playWitchCackle = () => {
    if (!ambientSoundEnabled) return;
    
    // Witch cackling
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        playTone(600 + Math.random() * 400, 0.1, 'square');
      }, i * 100);
    }
  };

  const playHorrorMovieGhostScream = () => {
    if (!ambientSoundEnabled) return;
    
    // TERRIFYING HORROR MOVIE GHOST SCREAM - Multiple layers
    // Deep demonic growl foundation
    playTone(35, 2.5, 'sawtooth', 0.7);
    playTone(42, 2.3, 'square', 0.65);
    
    // Mid-range demonic voice
    setTimeout(() => {
      playTone(180, 2, 'sawtooth', 0.6);
      playTone(220, 1.8, 'square', 0.55);
    }, 100);
    
    // High-pitched banshee scream
    setTimeout(() => {
      playTone(2400, 1.5, 'square', 0.75);
      playTone(2800, 1.3, 'sawtooth', 0.7);
      playTone(3200, 1.2, 'sine', 0.65);
    }, 200);
    
    // Chaotic distortion layers
    setTimeout(() => {
      playTone(800, 1, 'square', 0.5);
      playTone(1200, 0.9, 'sawtooth', 0.45);
    }, 300);
    
    // Final demonic roar
    setTimeout(() => {
      playTone(50, 1.5, 'sawtooth', 0.8);
      playTone(65, 1.3, 'square', 0.75);
    }, 500);
  };

  const playDemonicLaugh = () => {
    if (!ambientSoundEnabled) return;
    
    // EVIL DEMONIC LAUGHTER - Deep and terrifying
    const laughPattern = [
      { freq: 150, dur: 0.15 },
      { freq: 180, dur: 0.12 },
      { freq: 150, dur: 0.15 },
      { freq: 200, dur: 0.18 },
      { freq: 150, dur: 0.15 },
      { freq: 180, dur: 0.12 },
      { freq: 220, dur: 0.2 },
      { freq: 150, dur: 0.15 },
    ];
    
    laughPattern.forEach((note, i) => {
      setTimeout(() => {
        playTone(note.freq, note.dur, 'sawtooth', 0.6);
        playTone(note.freq * 0.5, note.dur, 'square', 0.5); // Sub-bass layer
      }, i * 180);
    });
  };

  const playGhostlyWail = () => {
    if (!ambientSoundEnabled) return;
    
    // GHOSTLY WAILING - Haunting and eerie
    // Rising wail
    playTone(300, 2, 'sine', 0.5);
    setTimeout(() => playTone(400, 1.8, 'sine', 0.55), 200);
    setTimeout(() => playTone(500, 1.5, 'sine', 0.6), 400);
    setTimeout(() => playTone(600, 1.2, 'sine', 0.55), 600);
    
    // Falling wail
    setTimeout(() => playTone(550, 1, 'sine', 0.5), 800);
    setTimeout(() => playTone(450, 0.8, 'sine', 0.45), 1000);
    setTimeout(() => playTone(350, 0.6, 'sine', 0.4), 1200);
  };

  return {
    playCreepyAmbient,
    playWhisper,
    playHeartbeat,
    playScreech,
    playDemonGrowl,
    playWindowOpen,
    playWindowClose,
    playClick,
    speakGhostVoice,
    playEvilLaugh,
    playJumpScare,
    playChainRattle,
    playDistantScream,
    playDoorCreak,
    playCrying,
    playBomb,
    playManiacalLaugh,
    playShush,
    playFootsteps,
    playGhostMoan,
    playThunder,
    playBonesCrack,
    playWitchCackle,
    playHorrorMovieGhostScream,
    playDemonicLaugh,
    playGhostlyWail,
  };
};
