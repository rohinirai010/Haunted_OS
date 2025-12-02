# 👻 Haunted OS - Kiroween 2024 Submission

A spine-chilling web-based operating system simulation featuring AI-powered interactions, immersive horror aesthetics, and paranormal experiences.

## 🎃 Project Overview

Haunted OS is a fully functional horror-themed operating system that runs in your browser. It features a complete desktop environment with draggable windows, multiple applications, ambient horror effects, and AI-powered interactions. Every element is designed to create an immersive, unsettling experience while maintaining full functionality.

## 🏆 Hackathon Category

**Costume Contest** - Building an app with a haunting, polished user interface that's unforgettable.

## ✨ Key Features

### Core System
- **VHS Boot Sequence**: Retro loading screen with authentic glitch effects
- **Draggable Windows**: Fully interactive window management with minimize/maximize/close
- **Horror Aesthetics**: Dark red/black color scheme with eerie animations throughout
- **Persistent State**: Window positions and app data saved across sessions
- **Ambient Effects**: Screen glitches, moving shadows, atmospheric visuals
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### Horror Elements
- **Animated Background**: Floating ghosts, hanging skulls, crawling spiders, tombstones with glowing-eyed owls
- **VHS Scan Lines**: Authentic retro horror aesthetic overlay
- **Random Glitches**: Unpredictable screen distortions and effects
- **Jump Scares**: Terrifying ghost face appears on first load with multi-layered horror sounds
- **Ambient Sounds**: 15+ different horror sounds (whispers, screams, footsteps, chains, etc.)
- **Dynamic Shadows**: Cursor-following parallax effects

### Applications

#### 👻 Ghost Editor
A haunted text editor where spirits occasionally type messages on their own.
- Auto-save functionality with localStorage
- Export documents as .txt files
- Random ghost typing events with eerie messages
- Typewriter aesthetic with monospace font
- Responsive layout for all screen sizes

#### 🎃 Pumpkin Mail
Email client with pre-loaded spooky messages from beyond.
- Inbox management with unread tracking
- Creepy email templates from spirits
- Horror-themed interface
- Mobile-responsive with adaptive layout
- Email preview and selection

#### 🧟 Zombie Terminal
AI-powered command-line interface with horror-themed responses.
- Custom commands: `haunt`, `summon`, `exorcise`, `whisper`, `help`
- Green phosphor text effect (classic terminal aesthetic)
- System status monitoring
- Easter eggs and hidden commands
- Command history

#### 🗂️ Crypt Files
File manager showing cursed files and folders.
- File browsing interface with icons
- **Cursed file warnings** with custom modal
- Dangerous bomb explosion sound + demonic voice warning
- Shaking, pulsing modal animations
- File preview system with horror warnings

#### 🔮 Séance Chat
AI-powered chat interface for communicating with demon Azrael.
- **Real-time streaming responses** (character-by-character)
- **Context-aware AI** with conversation memory
- Intelligent pattern matching for 15+ question types
- Demon voice synthesis (optional)
- Ouija board aesthetic
- Typing indicators

## 🛠️ Technology Stack

### Frontend Framework
- **React 18** - Modern UI framework with hooks
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool and dev server

### Styling & Animation
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth, performant animations
- **Custom CSS** - VHS effects, glitch animations, horror aesthetics

### State Management
- **Zustand** - Lightweight state management
- **LocalStorage** - Persistent data storage

### UI Components
- **React Draggable** - Window dragging functionality
- **Lucide React** - Beautiful icon library
- **React Portal** - Modal rendering

### Audio & Voice
- **Web Audio API** - Synthesized horror sounds
- **Speech Synthesis API** - Demonic voice warnings
- **Custom Sound Engine** - 20+ layered sound effects

### AI & Intelligence
- **Custom AI Service** - Context-aware response system
- **Pattern Matching** - Intelligent question categorization
- **Conversation Memory** - Maintains chat history

## 📁 Project Structure

```
haunted-os/
├── .kiro/
│   ├── specs/
│   │   └── haunted-os-architecture.md
│   └── steering/
│       └── horror-ui-guidelines.md
├── src/
│   ├── components/
│   │   ├── BootScreen.tsx
│   │   ├── Desktop.tsx
│   │   ├── Taskbar.tsx
│   │   ├── WindowManager.tsx
│   │   └── apps/
│   │       ├── GhostEditor.tsx
│   │       ├── PumpkinMail.tsx
│   │       ├── ZombieTerminal.tsx
│   │       ├── CryptFiles.tsx
│   │       └── SeanceChat.tsx
│   ├── hooks/
│   │   └── useHorrorSounds.ts
│   ├── services/
│   │   └── aiService.ts
│   ├── store/
│   │   ├── windowStore.ts
│   │   └── systemStore.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── package.json
├── README.md
├── KIRO_USAGE.md
└── LICENSE
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd haunted-os

# Install dependencies
npm install

# Run development server
npm run dev
```

## 🎨 Design System

### Color Palette
- **Background**: `#0a0a0a` (deep black)
- **Primary**: `#8b0000` (dark red)
- **Secondary**: `#1a1a2e` (dark blue)
- **Accent**: `#ff6b6b` (blood red)
- **Text**: `#e0e0e0` (off-white)

### Typography
- **Monospace**: Courier New, Consolas (terminal/editor)
- **System**: Arial, Helvetica (UI elements)
- **Display**: Georgia (dramatic text)

### Visual Effects
- VHS scan lines overlay
- Random screen glitches (every 10-30s)
- Cursor-following shadows
- Text glow effects
- Window shadows with red glow
- Parallax background elements

## 🎮 User Experience

### Boot Sequence
1. VHS-style loading screen with glitches
2. System initialization messages
3. Fade to desktop with ambient effects

### Desktop Interaction
1. Click taskbar icons to launch applications
2. Drag windows by title bar
3. Minimize/maximize/close windows
4. Multiple windows can be open simultaneously
5. Windows remember positions (localStorage)

### Horror Elements
- **Ghost Jump Scare**: Appears once on first load
- **Ambient Sounds**: Play randomly throughout session
- **Screen Glitches**: Occasional visual distortions
- **Moving Elements**: Ghosts, bats, spiders animate across screen
- **Cursed Files**: Trigger explosion + demonic voice warning

## 🔮 Special Features

### AI-Powered Séance Chat
- Maintains conversation context
- Responds intelligently to different question types
- Streaming text animation (like ChatGPT)
- Optional demon voice synthesis
- 15+ question categories recognized

### Cursed File System
- Custom haunted modal (not browser alert)
- Massive explosion sound (20+ layered tones)
- Triple demon growl
- Ultra-demonic voice warning
- Shaking, pulsing animations
- Perfectly centered using React Portal

### Responsive Design
- Desktop: Full experience with all effects
- Tablet: Optimized layout with key features
- Mobile: Single-window mode, touch-friendly
- Adaptive window sizing on screen resize

## 🎯 Kiro AI Usage

This project was built extensively using Kiro AI. See [KIRO_USAGE.md](./KIRO_USAGE.md) for detailed documentation on:
- Vibe coding approach
- Spec-driven development
- Steering documents for consistent theming
- Iterative development process
- Problem-solving with AI assistance

## 📝 License

MIT License - feel free to use this project for your own spooky creations!

## 🙏 Acknowledgments

- Built with **Kiro AI** for rapid prototyping and development
- Inspired by classic horror aesthetics and retro computing
- Created for **Kiroween 2025 Hackathon**

## ⚠️ Warning

This OS may be haunted. Use at your own risk. We are not responsible for any paranormal activity 👻 that may occur while using this software.

*"In the digital realm, the spirits never rest..."*

---

**Made with 💀 for Kiroween 2025**
