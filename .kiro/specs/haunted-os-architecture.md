# Haunted Operating System - Architecture Spec

## Overview
A web-based haunted operating system that simulates a cursed computer interface with AI-powered ghost interactions, draggable windows, and immersive horror aesthetics.

## Tech Stack
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Audio**: Howler.js
- **State Management**: Zustand
- **Package Manager**: npm

## Project Structure
```
haunted-os/
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
│   │   ├── useWindowDrag.ts
│   │   ├── useAmbientSound.ts
│   │   └── useGlitchEffect.ts
│   ├── store/
│   │   ├── windowStore.ts
│   │   └── systemStore.ts
│   ├── services/
│   │   └── aiService.ts
│   ├── styles/
│   │   └── globals.css
│   ├── assets/
│   │   ├── sounds/
│   │   └── images/
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   └── main.tsx
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## Core Components

### 1. BootScreen
**Purpose**: VHS-style loading screen that appears on first load

**Features**:
- Animated ASCII art logo
- Glitchy loading bar
- VHS scan lines overlay
- Static noise effect
- Transitions to Desktop after 3-5 seconds

**State**:
- Loading progress (0-100%)
- Boot messages array

### 2. Desktop
**Purpose**: Main OS environment container

**Features**:
- Background with subtle animated fog/mist
- Grid of app icons
- Handles window rendering
- Cursor trail effect
- Random screen glitches

**State**:
- Active windows array
- Background effects toggle

### 3. Taskbar
**Purpose**: Bottom navigation bar

**Features**:
- Start menu button (skull icon)
- Active app indicators
- System clock (shows spooky time)
- Volume control
- Minimize/maximize all windows

**State**:
- Open apps list
- System time
- Audio volume

### 4. WindowManager
**Purpose**: Manages all window instances

**Features**:
- Draggable windows (react-draggable or custom)
- Resizable windows
- Z-index management (bring to front on click)
- Minimize/maximize/close controls
- Window snapping to edges
- Persistent window positions (localStorage)

**State**:
- Window positions {id, x, y, width, height, zIndex, minimized}
- Active window ID
- Window history

### 5. Apps

#### GhostEditor
- Text editor with haunted autocomplete
- AI suggests creepy continuations
- Text occasionally glitches/changes
- Save files to localStorage

#### PumpkinMail
- Email client with messages from "spirits"
- AI-generated spooky emails
- Inbox, sent, trash folders
- Compose with haunted suggestions

#### ZombieTerminal
- Command-line interface
- Custom commands (help, haunt, summon, exorcise)
- AI responds to user commands as a zombie
- Green phosphor text effect

#### CryptFiles
- File explorer showing "cursed" files
- Folder navigation
- File preview with glitch effects
- Create/delete/rename files

#### SeanceChat
- Chat interface with AI ghost
- Real-time typing indicators
- Message history
- Ouija board aesthetic

## State Management (Zustand)

### windowStore
```typescript
interface WindowState {
  windows: Window[];
  activeWindowId: string | null;
  openWindow: (appId: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  updateWindowPosition: (id: string, x: number, y: number) => void;
  setActiveWindow: (id: string) => void;
}
```

### systemStore
```typescript
interface SystemState {
  isBooted: boolean;
  volume: number;
  ambientSoundEnabled: boolean;
  glitchIntensity: number;
  setBooted: (booted: boolean) => void;
  setVolume: (volume: number) => void;
  toggleAmbientSound: () => void;
}
```

## Features Implementation

### Draggable Windows
- Use Framer Motion's drag functionality
- Constrain to viewport bounds
- Save position to localStorage on drag end
- Smooth animations with spring physics

### AI Integration
- API endpoint for AI interactions
- Context-aware responses per app
- Streaming responses for chat
- Error handling with spooky fallbacks

### Audio System
- Ambient background loop (low volume)
- UI interaction sounds (clicks, opens, closes)
- Random scare sounds (low frequency)
- Howler.js for audio management
- Respect user volume settings

### Visual Effects
- VHS scan lines (CSS overlay)
- Screen glitch (random intervals)
- Cursor trail (canvas or CSS)
- Window shadows with red glow
- Text flicker animations

### Persistence
- localStorage for window positions
- IndexedDB for app data (files, emails, chat history)
- Session state restoration on reload

### Responsive Design
- Desktop-first approach
- Mobile: single window at a time
- Tablet: limited window count
- Touch-friendly controls

## Dependencies
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "typescript": "^5.0.0",
  "vite": "^5.0.0",
  "framer-motion": "^10.0.0",
  "zustand": "^4.4.0",
  "howler": "^2.2.3",
  "tailwindcss": "^3.3.0",
  "autoprefixer": "^10.4.0",
  "postcss": "^8.4.0"
}
```

## Implementation Phases

### Phase 1: Foundation
- [ ] Initialize Vite + React + TypeScript project
- [ ] Configure Tailwind CSS
- [ ] Set up project structure
- [ ] Create base types and interfaces
- [ ] Implement Zustand stores

### Phase 2: Core UI
- [ ] Build BootScreen component
- [ ] Create Desktop layout
- [ ] Implement Taskbar
- [ ] Build WindowManager with drag/resize
- [ ] Add VHS effects overlay

### Phase 3: Applications
- [ ] Implement GhostEditor
- [ ] Build PumpkinMail
- [ ] Create ZombieTerminal
- [ ] Develop CryptFiles
- [ ] Build SeanceChat

### Phase 4: Enhancements
- [ ] Integrate AI service
- [ ] Add audio system
- [ ] Implement visual effects
- [ ] Add persistence layer
- [ ] Polish animations

### Phase 5: Testing & Optimization
- [ ] Cross-browser testing
- [ ] Performance optimization
- [ ] Accessibility improvements
- [ ] Mobile responsiveness
- [ ] Bug fixes

## Design Considerations

### Performance
- Lazy load app components
- Throttle glitch effects
- Optimize audio loading
- Use CSS transforms for animations
- Debounce window position saves

### Accessibility
- Keyboard navigation support
- Screen reader compatibility
- Reduced motion option
- High contrast mode
- Focus indicators

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2020+ features
- CSS Grid and Flexbox
- Web Audio API
- LocalStorage and IndexedDB

## API Requirements

### AI Service Endpoint
```typescript
POST /api/chat
{
  "appId": "seance-chat",
  "message": "Hello ghost",
  "context": {...}
}

Response:
{
  "response": "Greetings, mortal...",
  "metadata": {...}
}
```

## Success Criteria
- Smooth window dragging with no lag
- Immersive horror atmosphere
- AI responses feel natural and spooky
- All apps functional and interactive
- State persists across sessions
- Responsive on desktop and tablet
- No console errors
- Accessible to keyboard users
