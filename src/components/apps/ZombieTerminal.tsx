import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface ZombieTerminalProps {
  windowId: string;
}

interface CommandHistory {
  command: string;
  output: string;
}

export const ZombieTerminal = ({ windowId }: ZombieTerminalProps) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([
    { command: '', output: 'ZOMBIE TERMINAL v1.0.0\nType "help" for available commands...\n' },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const commands: Record<string, () => string> = {
    help: () => `Available commands:
  help     - Show this help message
  haunt    - Summon a haunting presence
  summon   - Call forth the spirits
  exorcise - Attempt to banish entities
  status   - Check system corruption level
  whisper  - Listen to the voices
  clear    - Clear the terminal
  about    - About this cursed system`,

    haunt: () => {
      const hauntings = [
        'A cold breeze passes through the room...',
        'You hear scratching from inside the walls...',
        'The lights flicker ominously...',
        'Something is watching you from the shadows...',
        'Your reflection in the screen looks... different...',
      ];
      return hauntings[Math.floor(Math.random() * hauntings.length)];
    },

    summon: () => {
      const summons = [
        'The spirits answer your call...\n"What do you seek, mortal?"',
        'A dark presence materializes before you...\n"You dare summon me?"',
        'The room grows cold. Something is here.',
        'ERROR: Too many entities summoned. System overload.',
        'The ritual is complete. They are coming.',
      ];
      return summons[Math.floor(Math.random() * summons.length)];
    },

    exorcise: () => {
      const results = [
        'The entity laughs at your feeble attempt...',
        'It worked! ...or did it?',
        'ERROR: Cannot exorcise system administrator.',
        'The spirits are too strong. They remain.',
        'You feel lighter. Perhaps it worked?',
      ];
      return results[Math.floor(Math.random() * results.length)];
    },

    status: () => {
      const corruption = Math.floor(Math.random() * 100);
      return `System Corruption: ${corruption}%
Active Entities: ${Math.floor(Math.random() * 10)}
Paranormal Activity: ${corruption > 50 ? 'HIGH' : 'MODERATE'}
Recommendation: ${corruption > 75 ? 'ABANDON SYSTEM' : 'PROCEED WITH CAUTION'}`;
    },

    whisper: () => {
      const whispers = [
        '...help... us...',
        '...they are coming...',
        '...do not sleep...',
        '...behind you...',
        '...we are many...',
        '...join us...',
      ];
      return whispers[Math.floor(Math.random() * whispers.length)];
    },

    clear: () => {
      setHistory([{ command: '', output: 'Terminal cleared.\n' }]);
      return '';
    },

    about: () => `ZOMBIE TERMINAL
Version: 1.0.0 (Undead Edition)
Created by: The Departed
Status: Cursed
Warning: Use at your own risk`,
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    let output = '';

    if (commands[cmd]) {
      output = commands[cmd]();
    } else {
      output = `Command not found: ${cmd}\nType "help" for available commands.`;
    }

    if (cmd !== 'clear') {
      setHistory([...history, { command: input, output }]);
    }
    setInput('');
  };

  return (
    <div
      ref={terminalRef}
      className="h-full bg-black text-green-500 font-mono text-sm p-1 sm:p-4 overflow-y-auto"
      onClick={() => inputRef.current?.focus()}
      style={{
        textShadow: '0 0 5px rgba(0, 255, 0, 0.5)',
      }}
    >
      {history.map((item, i) => (
        <div key={i} className="mb-2">
          {item.command && (
            <div className="flex gap-2">
              <span className="text-red-500">$</span>
              <span>{item.command}</span>
            </div>
          )}
          {item.output && (
            <motion.pre
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="whitespace-pre-wrap mt-1"
            >
              {item.output}
            </motion.pre>
          )}
        </div>
      ))}

      <form onSubmit={handleSubmit} className="flex gap-2">
        <span className="text-red-500">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent outline-none text-green-500"
          autoFocus
          style={{
            textShadow: '0 0 5px rgba(0, 255, 0, 0.5)',
          }}
        />
      </form>

      {/* Blinking Cursor */}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-2 h-4 bg-green-500 ml-1"
      />
    </div>
  );
};
