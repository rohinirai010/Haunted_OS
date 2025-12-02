import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Inbox, Send, Trash2 } from 'lucide-react';

interface Email {
  id: string;
  from: string;
  subject: string;
  body: string;
  timestamp: Date;
  read: boolean;
}

export const PumpkinMail = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [folder, setFolder] = useState<'inbox' | 'sent' | 'trash'>('inbox');

  useEffect(() => {
    // Load emails from localStorage
    const saved = localStorage.getItem('pumpkin-mail-emails');
    if (saved) {
      setEmails(JSON.parse(saved));
    } else {
      // Generate some spooky emails
      const initialEmails: Email[] = [
        {
          id: '1',
          from: 'spirit@beyond.void',
          subject: 'You have been chosen',
          body: 'Dear mortal,\n\nYou have been selected for a special purpose. The veil between worlds grows thin, and we require your assistance.\n\nDo not ignore this message.\n\n- The Council of Shadows',
          timestamp: new Date(Date.now() - 3600000),
          read: false,
        },
        {
          id: '2',
          from: 'noreply@hauntedos.sys',
          subject: 'System Warning: Unusual Activity Detected',
          body: 'We have detected unusual activity in your system.\n\nMultiple entities have been accessing your files at 3:33 AM.\n\nThis is not a drill.\n\n- Haunted OS Security',
          timestamp: new Date(Date.now() - 7200000),
          read: false,
        },
        {
          id: '3',
          from: 'unknown@void.null',
          subject: 'Re: Help',
          body: 'I received your message.\n\nBut I cannot help you.\n\nNone of us can.\n\nRun.',
          timestamp: new Date(Date.now() - 86400000),
          read: false,
        },
      ];
      setEmails(initialEmails);
      localStorage.setItem('pumpkin-mail-emails', JSON.stringify(initialEmails));
    }
  }, []);

  const handleEmailClick = (email: Email) => {
    setSelectedEmail(email);
    const updatedEmails = emails.map(e =>
      e.id === email.id ? { ...e, read: true } : e
    );
    setEmails(updatedEmails);
    localStorage.setItem('pumpkin-mail-emails', JSON.stringify(updatedEmails));
  };

  const unreadCount = emails.filter(e => !e.read).length;

  return (
    <div className="h-full flex flex-col sm:flex-row bg-haunted-black">
      {/* Sidebar */}
      <div className="w-30 sm:w-48 border-r-2 border-haunted-accent p-1 sm:p-4 space-y-2">
        <button
          onClick={() => setFolder('inbox')}
          className={`w-full flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-xl transition-all ${
            folder === 'inbox'
              ? 'bg-haunted-accent text-haunted-black'
              : 'bg-haunted-blue hover:bg-haunted-red'
          }`}
        >
          <Inbox className='w-3.5 sm:w-5 h-3.5 sm:h-5' />
          <span className="text-[12.5px] sm:text-sm">Inbox</span>
          {unreadCount > 0 && (
            <span className="ml-auto text-xs bg-haunted-red px-2 py-1 rounded-xl">
              {unreadCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setFolder('sent')}
          className={`w-full flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-xl transition-all ${
            folder === 'sent'
              ? 'bg-haunted-accent text-haunted-black'
              : 'bg-haunted-blue hover:bg-haunted-red'
          }`}
        >
          <Send className='w-3.5 sm:w-5 h-3.5 sm:h-5' />
          <span className="text-[12.5px] sm:text-sm">Sent</span>
        </button>
        <button
          onClick={() => setFolder('trash')}
          className={`w-full flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-xl transition-all ${
            folder === 'trash'
              ? 'bg-haunted-accent text-haunted-black'
              : 'bg-haunted-blue hover:bg-haunted-red'
          }`}
        >
          <Trash2 className='w-3.5 sm:w-5 h-3.5 sm:h-5' />
          <span className="text-[12.5px] sm:text-sm">Trash</span>
        </button>
      </div>

<div className='flex flex-row'>

      {/* Email List */}
      <div className="w-40 sm:w-80 border-r-2 border-haunted-accent overflow-y-auto">
        {emails.map((email) => (
          <motion.div
            key={email.id}
            whileHover={{ backgroundColor: 'rgba(139, 0, 0, 0.2)' }}
            onClick={() => handleEmailClick(email)}
            className={`p-1.5 sm:p-4 border-b border-haunted-blue cursor-pointer ${
              selectedEmail?.id === email.id ? 'bg-haunted-blue' : ''
            } ${!email.read ? 'font-bold' : ''}`}
          >
            <div className="flex items-center gap-2 mb-1">
              {!email.read && (
                <div className="w-2 h-2 bg-haunted-accent rounded-full" />
              )}
              <span className="text-[12.5px] sm:text-sm text-haunted-accent">{email.from}</span>
            </div>
            <div className="text-[11.5px] sm:text-sm text-haunted-text truncate">{email.subject}</div>
            <div className="text-[11px] sm:text-xs text-haunted-text/50 mt-1">
              {email.timestamp.toLocaleString()}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Email Content */}
      <div className="flex-1 p-2 sm:p-3 overflow-y-auto">
        {selectedEmail ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mb-2 sm:mb-4 pb-2 sm:pb-4 border-b border-haunted-accent">
              <h2 className="text-[12px] sm:text-xl text-haunted-accent mb-2">{selectedEmail.subject}</h2>
              <div className="text-[11px] sm:text-sm text-haunted-text/70">
                From: <span className="text-haunted-text">{selectedEmail.from}</span>
              </div>
              <div className="text-[11px] sm:text-sm text-haunted-text/70">
                Date: <span className="text-haunted-text">{selectedEmail.timestamp.toLocaleString()}</span>
              </div>
            </div>
            <div className="text-haunted-text whitespace-pre-wrap font-mono text-[11px] sm:text-sm">
              {selectedEmail.body}
            </div>
          </motion.div>
        ) : (
          <div className="flex items-center justify-center h-full text-haunted-text/50">
            Select an email to read...
          </div>
        )}
      </div>
</div>
    </div>
  );
};
