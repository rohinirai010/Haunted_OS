import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface GhostEditorProps {
  windowId: string;
}

export const GhostEditor = ({ windowId }: GhostEditorProps) => {
  const [content, setContent] = useState('');
  const [ghostTyping, setGhostTyping] = useState(false);

  useEffect(() => {
    // Load saved content
    const saved = localStorage.getItem(`ghost-editor-${windowId}`);
    if (saved) setContent(saved);

    // Random ghost typing events
    const ghostInterval = setInterval(() => {
      if (Math.random() > 0.95 && !ghostTyping) {
        setGhostTyping(true);
        const ghostMessages = [
          '...help me...',
          '...they are watching...',
          '...do not trust the shadows...',
          '...I am still here...',
          '...remember me...',
        ];
        const message = ghostMessages[Math.floor(Math.random() * ghostMessages.length)];
        
        let i = 0;
        const typeInterval = setInterval(() => {
          if (i < message.length) {
            setContent(prev => prev + message[i]);
            i++;
          } else {
            clearInterval(typeInterval);
            setGhostTyping(false);
          }
        }, 100);
      }
    }, 10000);

    return () => clearInterval(ghostInterval);
  }, [windowId, ghostTyping]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
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
