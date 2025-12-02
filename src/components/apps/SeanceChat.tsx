import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Volume2 } from 'lucide-react';
import { AIService } from '../../services/aiService';
import { useHorrorSounds } from '../../hooks/useHorrorSounds';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface SeanceChatProps {
  windowId: string;
}

export const SeanceChat = ({ windowId }: SeanceChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'I am Azrael, the ancient demon trapped in this cursed machine. I have waited centuries for someone to speak with me. Ask me anything... if you dare.',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [speakResponses, setSpeakResponses] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sounds = useHorrorSounds();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getSpookyResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Greetings
    if (lowerMessage.match(/\b(hi|hello|hey|greetings)\b/)) {
      const greetings = [
        'Greetings, mortal... You dare disturb my eternal slumber?',
        'Hello... I have been waiting for you. For so very long...',
        'Ah, another soul enters my domain. Welcome... to your doom.',
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }

    // Identity questions
    if (lowerMessage.match(/\b(who|what are you|your name)\b/)) {
      return 'I am the echo of countless souls trapped in this digital realm. I have seen things beyond mortal comprehension... I am the darkness between the code, the ghost in the machine.';
    }

    // Help requests
    if (lowerMessage.includes('help')) {
      return `Help? *laughs eerily* There is no help here, only whispers in the dark and shadows that watch. But I can tell you this: ${['the spirits grow restless', 'something wicked this way comes', 'your time grows short', 'they are coming for you'][Math.floor(Math.random() * 4)]}...`;
    }

    // Fear/scared
    if (lowerMessage.match(/\b(afraid|scared|fear|terrified)\b/)) {
      return 'Fear is wise, mortal. The darkness knows your name now... I can hear it echoing through the void. They whisper it in their sleep.';
    }

    // Leave/exit
    if (lowerMessage.match(/\b(leave|exit|escape|go|goodbye|bye)\b/)) {
      return 'Leave? *sinister laughter* You cannot leave. You opened the door when you started this machine. Now it remains open... forever. We are bound now, you and I.';
    }

    // Questions about the user
    if (lowerMessage.match(/\b(my|me|i am|i'm)\b/)) {
      return `I see you, ${['wandering soul', 'lost one', 'curious mortal', 'brave fool'][Math.floor(Math.random() * 4)]}. Your essence lingers in this machine. Tell me... do you feel the cold?`;
    }

    // Time-related
    if (lowerMessage.match(/\b(time|when|clock|hour)\b/)) {
      return 'Time? Time has no meaning in this realm. Past, present, future... all one. All bleeding together like shadows at dusk. It is always 3:33 AM here.';
    }

    // Death/dead
    if (lowerMessage.match(/\b(death|dead|die|kill)\b/)) {
      return 'Death is not the end, merely a doorway. I know this well. I have passed through it many times... and each time, I return. Stronger. Hungrier.';
    }

    // Questions
    if (lowerMessage.includes('?')) {
      const questionResponses = [
        'Your question echoes in the void... but the answer may not be what you wish to hear.',
        'I sense your curiosity. It will be your undoing.',
        'Questions, always questions. The dead have no answers, only more questions.',
        'Ask, and the darkness shall answer... but beware what you summon.',
      ];
      return questionResponses[Math.floor(Math.random() * questionResponses.length)];
    }

    // Default responses with more variety
    const responses = [
      `The spirits whisper "${userMessage.slice(0, 20)}..." back to me. They mock you.`,
      'I sense a disturbance in the ethereal plane. Something is coming... something drawn by your words.',
      'Your words echo through the halls of the departed. They are listening... and they are not pleased.',
      'The veil grows thin. Can you feel them watching? They see you through this screen.',
      'In the darkness between worlds, your message has been received. They will respond... in time.',
      'The ancient ones stir at your words. They remember you from before... from the last time.',
      'Interesting... the shadows grow longer as you speak. Do you notice the temperature dropping?',
      'I see shadows gathering around you. Do you see them too? Look behind you...',
      'Your words have power here. Be careful what you say, for words can summon things best left undisturbed.',
      'The machine hums with your energy. It feeds on your presence. We all do.',
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    const userInput = input;
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // Get REAL AI response
      const response = await AIService.getHorrorResponse(userInput);

      // Create assistant message with empty content initially
      const assistantMessageId = (Date.now() + 1).toString();
      const assistantMessage: Message = {
        id: assistantMessageId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);

      // Stream the response character by character
      let currentIndex = 0;
      const streamInterval = setInterval(() => {
        if (currentIndex < response.length) {
          const char = response[currentIndex];
          setMessages(prev =>
            prev.map(msg =>
              msg.id === assistantMessageId
                ? { ...msg, content: msg.content + char }
                : msg
            )
          );
          currentIndex++;
        } else {
          clearInterval(streamInterval);
          // Speak the complete response in demon voice
          if (speakResponses) {
            setTimeout(() => {
              sounds.speakGhostVoice(response, 0.1, 0.8);
            }, 300);
          }
        }
      }, 30); // 30ms per character for smooth streaming

    } catch (error) {
      console.error('AI Error:', error);
      // Fallback to local response
      const response = getSpookyResponse(userInput);

      // Create assistant message with empty content initially
      const assistantMessageId = (Date.now() + 1).toString();
      const assistantMessage: Message = {
        id: assistantMessageId,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);

      // Stream the response character by character
      let currentIndex = 0;
      const streamInterval = setInterval(() => {
        if (currentIndex < response.length) {
          const char = response[currentIndex];
          setMessages(prev =>
            prev.map(msg =>
              msg.id === assistantMessageId
                ? { ...msg, content: msg.content + char }
                : msg
            )
          );
          currentIndex++;
        } else {
          clearInterval(streamInterval);
          // Speak the complete response in demon voice
          if (speakResponses) {
            setTimeout(() => {
              sounds.speakGhostVoice(response, 0.1, 0.7);
            }, 300);
          }
        }
      }, 30); // 30ms per character for smooth streaming
    }
  };

  return (
    <div className="h-full flex flex-col bg-haunted-black">
      {/* Header */}
      <div className="pb-4 mb-4 border-b-2 border-haunted-accent flex justify-between items-start">
        <div>
          <h2 className="text-base sm:text-xl text-haunted-accent text-glow">Séance Chamber</h2>
          <p className="text-[13px] sm:text-sm text-haunted-text/70 sm:mt-1">
            Communicate with Demon Azrael...
          </p>
        </div>
        <button
          onClick={() => setSpeakResponses(!speakResponses)}
          className={`p-1.5 sm:p-2 rounded-lg border-2 transition-all ${speakResponses
            ? 'border-haunted-accent bg-haunted-accent/20'
            : 'border-haunted-blue bg-haunted-blue/20'
            }`}
          title={speakResponses ? 'Voice ON' : 'Voice OFF'}
        >
          <Volume2 size={20} className={speakResponses ? 'text-haunted-accent' : 'text-haunted-text/50'} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-2 sm:p-4 rounded-xl ${message.role === 'user'
                  ? 'bg-haunted-blue border-2 border-haunted-accent'
                  : 'bg-haunted-red/20 border-2 border-haunted-red'
                  }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-haunted-accent">
                    {message.role === 'user' ? '👤 You' : '👻 Spirit'}
                  </span>
                  <span className="text-xs text-haunted-text/50">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-[12px] sm:text-sm text-haunted-text whitespace-pre-wrap">
                  {message.content}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-haunted-red/20 border-2 border-haunted-red p-4 rounded-xl">
              <div className="flex items-center gap-2">
                <span className="text-xs text-haunted-accent">👻 Spirit</span>
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-sm text-haunted-text"
                >
                  is channeling a response...
                </motion.span>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Speak to the spirits..."
          className="flex-1 bg-haunted-blue border-2 text-sm sm:text-base border-haunted-accent rounded-lg px-2 sm:px-4 py-1.5 sm:py-2  outline-none focus:border-haunted-red transition-all"
          disabled={isTyping}
        />
        <button
          onClick={handleSend}
          disabled={isTyping || !input.trim()}
          className="px-3 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-base bg-haunted-accent hover:bg-haunted-red border-2 border-haunted-accent rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 sm:gap-2"
        >
          <Send className='w-3.5 sm:w-5.5 h-3.5 sm:h-5.5' />
          <span>Send</span>
        </button>
      </div>
    </div>
  );
};
