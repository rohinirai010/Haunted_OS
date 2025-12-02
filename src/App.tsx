import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BootScreen } from './components/BootScreen';
import { Desktop } from './components/Desktop';
import { useSystemStore } from './store/systemStore';
import './index.css';

function App() {
  const { setBooted } = useSystemStore();
  const [showStart, setShowStart] = useState(true);
  const [showBoot, setShowBoot] = useState(false);

  const handleStart = () => {
    setShowStart(false);
    setShowBoot(true);
  };

  const handleBootComplete = () => {
    setBooted(true);
    setShowBoot(false);
  };

  if (showStart) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-screen h-screen flex flex-col items-center justify-center bg-black cursor-pointer"
        onClick={handleStart}
      >
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="text-center"
        >
          <div className="text-8xl mb-8 filter drop-shadow-[0_0_20px_rgba(139,0,0,1)]">
            ⛧
          </div>
          <h1 className="text-4xl text-haunted-accent font-bold mb-4 text-glow">
            HAUNTED OS
          </h1>
          <p className="text-xl text-haunted-text mb-8">
            Click anywhere to enter...
          </p>
          <p className="text-sm text-haunted-text/50">
            ⚠️ Warning: Contains horror sounds and disturbing content
          </p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="w-screen h-screen overflow-hidden bg-haunted-black">
      <AnimatePresence mode="wait">
        {showBoot ? (
          <BootScreen key="boot" onBootComplete={handleBootComplete} />
        ) : (
          <Desktop key="desktop" />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
