import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface GhostEditorProps {
  windowId: string;
}

export const GhostEditor = ({ windowId }: GhostEditorProps) => {
  const [content, setContent] = useState('');
  const [ghostTyping, setGhostTyping] = useState(false);
  const [lastTypingTime, setLastTypingTime] = useState(Date.now());

  useEffect(() => {
    // Load saved content
    const saved = localStorage.getItem(`ghost-editor-${windowId}`);
    if (saved) setContent(saved);
  }, [windowId]);

  useEffect(() => {
    // Ghost typing triggers when user stops typing
    // Checks every 5 seconds, with increasing chance
    const ghostInterval = setInterval(() => {
      if (!ghostTyping) {
        const timeSinceLastTyping = Date.now() - lastTypingTime;
        
        // User has stopped typing for at least 5 seconds
        if (timeSinceLastTyping >= 5000) {
          // Calculate chance based on how long user has been idle
          // 5s = 50%, 10s = 70%, 15s = 85%, 20s+ = 95%
          const idleSeconds = Math.floor(timeSinceLastTyping / 1000);
          let chance = 0.5; // 50% at 5 seconds
          
          if (idleSeconds >= 20) chance = 0.95;
          else if (idleSeconds >= 15) chance = 0.85;
          else if (idleSeconds >= 10) chance = 0.70;
          
          const rand = Math.random();
          
          if (rand < chance) {
            setGhostTyping(true);
            
            const ghostMessages = [
              '\n...help me...\n',
              '\n...they are watching...\n',
              '\n...do not trust the shadows...\n',
              '\n...I am still here...\n',
              '\n...remember me...\n',
              '\n...get out while you can...\n',
              '\n...it is too late for me...\n',
              '\n...they know you are here...\n',
              '\n...behind you...\n',
              '\n...do not look back...\n',
              '\n...stop writing...\n',
              '\n...this is my document now...\n',
              '\n...I can see you...\n',
              '\n...why did you come here...\n',
            ];
            const message = ghostMessages[Math.floor(Math.random() * ghostMessages.length)];
            
            let i = 0;
            const typeInterval = setInterval(() => {
              if (i < message.length) {
                setContent(prev => prev + message[i]);
                i++;
              } else {
                clearInterval(typeInterval);
                setTimeout(() => {
                  setGhostTyping(false);
                  setLastTypingTime(Date.now()); // Reset timer after ghost types
                }, 1000);
              }
            }, 80);
            
            return () => clearInterval(typeInterval);
          }
        }
      }
    }, 5000); // Check every 5 seconds

    return () => clearInterval(ghostInterval);
  }, [ghostTyping, lastTypingTime]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    setLastTypingTime(Date.now()); // Update last typing time when user types
    localStorage.setItem(`ghost-editor-${windowId}`, newContent);
  };

  const handleExport = () => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'haunted-document.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full flex flex-col bg-haunted-black">
      {/* Toolbar */}
      <div className="flex gap-2 mb-4 pb-2 border-b border-haunted-accent">
        <button
          onClick={() => setContent('')}
          className="px-4 py-2 bg-haunted-blue border border-haunted-accent rounded-xl hover:bg-haunted-red transition-all text-sm"
        >
          New
        </button>
        <button
          onClick={handleExport}
          className="px-4 py-2 bg-haunted-blue border border-haunted-accent rounded-xl hover:bg-haunted-red transition-all text-sm"
        >
          Export
        </button>
        {ghostTyping && (
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="ml-auto text-haunted-accent text-sm italic"
          >
            👻 Ghost is typing...
          </motion.span>
        )}
      </div>

      {/* Editor */}
      <textarea
        value={content}
        onChange={handleChange}
        className="flex-1 bg-transparent text-haunted-text font-mono text-sm p-4 resize-none outline-none border-2 border-haunted-blue focus:border-haunted-accent rounded-xl"
        placeholder="Begin writing... if you dare..."
        style={{
          textShadow: '0 0 5px rgba(255, 107, 107, 0.3)',
        }}
      />

      {/* Stats */}
      <div className="mt-4 pt-2 border-t border-haunted-accent text-xs text-haunted-text/70 flex justify-between">
        <span>Characters: {content.length}</span>
        <span>Words: {content.split(/\s+/).filter(Boolean).length}</span>
        <span>Lines: {content.split('\n').length}</span>
      </div>
    </div>
  );
};
