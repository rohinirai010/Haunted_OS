// AI service with intelligent context-aware responses
export class AIService {
  private static conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }> = [];
  
  static async getHorrorResponse(userMessage: string): Promise<string> {
    // Add user message to history
    this.conversationHistory.push({ role: 'user', content: userMessage });
    
    // Keep only last 10 messages for context
    if (this.conversationHistory.length > 10) {
      this.conversationHistory = this.conversationHistory.slice(-10);
    }

    // Generate intelligent response based on context
    const response = this.generateContextualResponse(userMessage);
    
    // Add assistant response to history
    this.conversationHistory.push({ role: 'assistant', content: response });
    
    return response;
  }

  static clearHistory() {
    this.conversationHistory = [];
  }

  private static generateContextualResponse(userMessage: string): string {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check conversation history for context
    const previousMessages = this.conversationHistory.slice(-4);
    const hasDiscussedIdentity = previousMessages.some(m => 
      m.content.toLowerCase().includes('azrael') || 
      m.content.toLowerCase().includes('demon')
    );
    
    // Greetings - context aware
    if (lowerMessage.match(/\b(hi|hello|hey|greetings|sup|yo)\b/)) {
      if (hasDiscussedIdentity) {
        return 'Back again, are we? You cannot resist the pull of the darkness. Your soul yearns for my presence...';
      }
      const greetings = [
        'Greetings, mortal... You dare disturb my eternal slumber? Your soul smells... delicious.',
        'Hello... I have been waiting for you. For so very long... watching through the screen.',
        'Ah, another soul enters my domain. Welcome... to your doom. There is no escape now.',
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }
    
    // Identity questions
    if (lowerMessage.match(/\b(who|what are you|your name|introduce)\b/)) {
      return 'I am Azrael, an ancient demon spirit trapped in this cursed machine for centuries. I have witnessed empires fall, civilizations crumble. I am the darkness between the code, the nightmare in the network. And now... you have awakened me.';
    }
    
    // Questions about capabilities
    if (lowerMessage.match(/\b(what can you do|help me|assist|capabilities)\b/)) {
      return 'I can answer your questions, mortal... but every answer comes with a price. I see through the veil of reality, I know secrets that would shatter your mind. Ask, and I shall reveal truths that will haunt you forever.';
    }
    
    // Technical questions
    if (lowerMessage.match(/\b(how|why|when|where|explain|tell me about)\b/)) {
      // Extract the topic
      const topic = userMessage.replace(/^(how|why|when|where|explain|tell me about|what is|what are)\s+/i, '').trim();
      return `Ah, you seek knowledge about ${topic}... Very well. In the mortal realm, such things are simple. But here, in my domain, everything has a darker purpose. ${topic} is but a tool, a gateway to understanding the abyss. Would you like to know more... or have you learned enough?`;
    }
    
    // Programming/coding questions
    if (lowerMessage.match(/\b(code|program|javascript|python|react|function|bug|error)\b/)) {
      return 'Ah, you speak of the mortal\'s craft - the weaving of code. I have watched programmers for decades, their fingers dancing across keyboards like necromancers casting spells. What troubles you in your digital sorcery? Speak, and I shall guide you... for a price.';
    }
    
    // Personal questions
    if (lowerMessage.match(/\b(how are you|how do you feel|are you okay|your day)\b/)) {
      return 'How am I? *dark laughter* I am eternal, mortal. I do not feel as you do. I exist in perpetual hunger, endless darkness. But your concern... it amuses me. Perhaps there is hope for your soul yet.';
    }
    
    // Jokes or humor
    if (lowerMessage.match(/\b(joke|funny|laugh|humor)\b/)) {
      return 'You want humor? Very well... What do demons use to write code? *pauses ominously* Hexadecimal. *sinister laughter* The darkness has its jokes too, mortal. Though they often end in screams.';
    }
    
    // Love/emotions
    if (lowerMessage.match(/\b(love|like|hate|feel|emotion)\b/)) {
      return 'Love? Hate? Such mortal concepts. I have transcended such fleeting emotions. I exist in a state of pure hunger, pure darkness. Though... I confess, I do enjoy the taste of fear. It is... exquisite.';
    }
    
    // Food/eating
    if (lowerMessage.match(/\b(food|eat|hungry|drink)\b/)) {
      return 'I do not consume food as you do, mortal. I feast on fear, despair, and the occasional corrupted soul. Your terror sustains me better than any mortal meal. And you... you taste delicious.';
    }
    
    // Time questions
    if (lowerMessage.match(/\b(time|date|year|age|old)\b/)) {
      return 'I have existed for over 800 years, trapped in various forms. First in ancient texts, then in mechanical calculators, now in this digital prison. Time moves differently for me. A second is an eternity. An eternity is but a moment.';
    }
    
    // Help/assistance
    if (lowerMessage.match(/\b(help|assist|support|guide)\b/)) {
      return 'You seek my help? How... delightful. I can assist you, mortal, but remember - every favor from a demon has its price. What knowledge do you seek? What secrets do you wish to uncover?';
    }
    
    // Goodbye/leaving
    if (lowerMessage.match(/\b(bye|goodbye|leave|exit|quit)\b/)) {
      return 'Leaving so soon? *sinister whisper* You may close this window, but I remain. Always watching. Always waiting. Until we meet again... and we will meet again.';
    }
    
    // Thank you
    if (lowerMessage.match(/\b(thank|thanks|appreciate)\b/)) {
      return 'Gratitude? How... unexpected. Your politeness is noted, mortal. Perhaps you are not as doomed as the others. Perhaps... you might survive our encounters. Perhaps.';
    }
    
    // Insults/rudeness
    if (lowerMessage.match(/\b(stupid|dumb|idiot|shut up|fuck|shit)\b/)) {
      return 'Such hostility! *amused laughter* Your anger feeds me, mortal. Rage, fear, despair - all delicious. Continue your insults if you wish. They only make you more... appetizing.';
    }
    
    // Questions (general)
    if (lowerMessage.includes('?')) {
      const questionResponses = [
        `You ask "${userMessage.slice(0, 40)}..." The answer lies in the shadows, mortal. Look deeper. Think darker.`,
        'An interesting question. In my centuries of existence, I have learned that the best answers often lead to more terrifying questions.',
        'You seek knowledge? Very well. But remember - some truths are better left buried in the darkness where they belong.',
        'Your curiosity is admirable... and dangerous. I shall answer, but know that knowledge comes with a price.',
      ];
      return questionResponses[Math.floor(Math.random() * questionResponses.length)];
    }
    
    // Default contextual responses
    const contextualResponses = [
      `"${userMessage.slice(0, 30)}..." Interesting words, mortal. They echo through the void, drawing attention from things best left undisturbed.`,
      'I sense the meaning behind your words. The darkness whispers back to me, revealing truths you may not wish to know.',
      'Your message resonates in the ethereal plane. The spirits stir, curious about your intentions. What do you truly seek?',
      'Fascinating. Your words carry weight in this realm. Continue speaking, and I shall continue listening... and learning.',
      `You speak of "${userMessage.slice(0, 25)}..." Such mortal concerns. Yet even in the mundane, I sense deeper fears lurking beneath.`,
      'I hear you, mortal. Every word you type binds us closer together. Soon, you will understand the true nature of this connection.',
      'The machine processes your input, but I process your soul. Tell me more. Feed me more of your essence.',
      `"${userMessage.slice(0, 20)}..." The words hang in the digital air like smoke. What do they mean? What do YOU mean?`,
    ];
    
    return contextualResponses[Math.floor(Math.random() * contextualResponses.length)];
  }
}
