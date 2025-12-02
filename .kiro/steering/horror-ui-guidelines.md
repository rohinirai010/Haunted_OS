# Horror UI Guidelines

## Color Palette

### Primary Colors
- **Background**: `#0a0a0a` (deep black)
- **Primary**: `#8b0000` (dark red)
- **Secondary**: `#1a1a2e` (dark blue)
- **Accent**: `#ff6b6b` (blood red)
- **Text**: `#e0e0e0` (off-white)

### Semantic Colors
- **Success**: `#2d5016` (dark green)
- **Warning**: `#8b4513` (dark orange)
- **Error**: `#8b0000` (dark red)
- **Info**: `#1a1a2e` (dark blue)

### Gradients
- **Window Header**: `linear-gradient(180deg, #1a1a2e 0%, #0a0a0a 100%)`
- **Glow Effect**: `radial-gradient(circle, #ff6b6b 0%, transparent 70%)`
- **Fog**: `linear-gradient(0deg, rgba(139,0,0,0.1) 0%, transparent 100%)`

## Typography

### Font Families
- **Monospace**: `'Courier New', 'Consolas', monospace` (for terminal, editor)
- **System**: `'Arial', 'Helvetica', sans-serif` (for UI elements)
- **Display**: `'Georgia', serif` (for titles, dramatic text)

### Font Sizes
- **xs**: `0.75rem` (12px)
- **sm**: `0.875rem` (14px)
- **base**: `1rem` (16px)
- **lg**: `1.125rem` (18px)
- **xl**: `1.25rem` (20px)
- **2xl**: `1.5rem` (24px)

### Text Effects
```css
/* Glitchy text on hover */
.glitch-text:hover {
  animation: glitch 0.3s infinite;
}

@keyframes glitch {
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
  100% { transform: translate(0); }
}

/* Screen flicker */
.flicker {
  animation: flicker 0.15s infinite;
}

@keyframes flicker {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}
```

## Interactions

### Timing
- **Delay**: Add 50-100ms delay to interactions for "old computer" feel
- **Transition Duration**: 200-300ms for most animations
- **Hover Delay**: 100ms before hover effects trigger
- **Click Feedback**: Immediate (0ms) but with visual lag effect

### Cursor
- Default: Custom cursor with red glow
- Hover: Slightly larger with pulsing effect
- Dragging: Closed hand cursor
- Loading: Spinning skull or hourglass

### Feedback
- **Click**: Subtle screen shake (1-2px)
- **Hover**: Red glow around element
- **Focus**: Pulsing red border
- **Error**: Screen flash red briefly

## Visual Effects

### VHS Scan Lines
```css
.vhs-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.15),
    rgba(0, 0, 0, 0.15) 1px,
    transparent 1px,
    transparent 2px
  );
  z-index: 9999;
}
```

### Screen Glitch
- Trigger randomly every 10-30 seconds
- Duration: 100-300ms
- Effects: horizontal displacement, color shift, static noise
- Intensity: Low (subtle) to High (dramatic)

### Shadows
- **Window Shadow**: `0 10px 40px rgba(139, 0, 0, 0.5)`
- **Text Shadow**: `0 0 10px rgba(255, 107, 107, 0.5)`
- **Glow Shadow**: `0 0 20px rgba(255, 107, 107, 0.8)`

### Parallax
- Cursor-following shadows on windows
- Subtle 3D tilt effect on hover
- Background elements move slower than foreground

## Animation Principles

### Movement
- **Slow and Eerie**: Use ease-in-out with 500-800ms duration
- **Sudden Jumps**: Instant position changes for scare effects
- **Floating**: Subtle up/down movement (2-5px) over 3-4 seconds
- **Breathing**: Scale 1.0 to 1.02 over 2-3 seconds

### Transitions
- **Fade In**: Opacity 0 to 1 with slight scale (0.95 to 1)
- **Fade Out**: Opacity 1 to 0 with distortion effect
- **Slide In**: From off-screen with easing
- **Glitch In**: Multiple rapid position changes before settling

### Framer Motion Variants
```typescript
const windowVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    filter: 'blur(10px)'
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    filter: 'blur(0px)',
    transition: { 
      duration: 0.5,
      ease: 'easeOut'
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.9,
    filter: 'blur(5px)',
    transition: { 
      duration: 0.3 
    }
  }
};

const glitchVariants = {
  normal: { x: 0, y: 0 },
  glitch: {
    x: [-2, 2, -2, 2, 0],
    y: [2, -2, 2, -2, 0],
    transition: { duration: 0.2 }
  }
};
```

## Component Patterns

### Window
- Dark background with subtle red border
- Draggable title bar with close/minimize/maximize buttons
- Drop shadow with red glow
- Rounded corners (4px)
- Slight transparency (95% opacity)

### Button
- Dark background with red border on hover
- Subtle glow effect on hover
- Click animation: scale down to 0.95
- Disabled state: 50% opacity with no hover effects

### Input
- Dark background with light border
- Red focus border with glow
- Monospace font for text inputs
- Placeholder text in dim gray

### Scrollbar
- Thin (8px) dark scrollbar
- Red thumb with glow
- Hidden by default, appears on hover

## Audio Guidelines

### Ambient Sounds
- **Background Loop**: Low-volume (10-20%) continuous ambient sound
- **Wind/Whispers**: Occasional (every 30-60s) subtle effects
- **Heartbeat**: Very low frequency pulse (barely audible)

### UI Sounds
- **Click**: Subtle mechanical click (50ms)
- **Open Window**: Creaking door sound (200ms)
- **Close Window**: Slam or thud (150ms)
- **Error**: Distorted beep (100ms)
- **Notification**: Eerie chime (300ms)

### Scare Sounds
- **Frequency**: Random, 1-2 per session maximum
- **Volume**: Slightly louder than ambient (30-40%)
- **Types**: Sudden whisper, distant scream, door slam
- **Warning**: Always respect user volume settings

## Accessibility

### Reduced Motion
- Detect `prefers-reduced-motion` media query
- Disable glitch effects and screen shakes
- Use simple fade transitions instead
- Keep essential animations only

### High Contrast
- Increase border visibility
- Enhance focus indicators
- Boost text contrast ratios
- Maintain WCAG AA standards

### Keyboard Navigation
- Visible focus indicators (red glow)
- Tab order follows logical flow
- Escape key closes windows
- Arrow keys for window selection

## Performance

### Optimization
- Use CSS transforms for animations (GPU accelerated)
- Throttle glitch effects to max 1 per second
- Lazy load audio files
- Debounce window position updates
- Use `will-change` sparingly

### Loading
- Show boot screen while assets load
- Preload critical audio files
- Lazy load app components
- Progressive enhancement for effects

## Responsive Breakpoints

- **Desktop**: 1024px and up (full experience)
- **Tablet**: 768px - 1023px (limited windows)
- **Mobile**: Below 768px (single window, simplified UI)

## Do's and Don'ts

### Do
✓ Use subtle effects that build atmosphere
✓ Respect user preferences (volume, motion)
✓ Test on different screen sizes
✓ Provide visual feedback for all interactions
✓ Keep performance smooth (60fps)

### Don't
✗ Overuse jump scares or loud sounds
✗ Make text unreadable for aesthetic
✗ Block user interactions with effects
✗ Ignore accessibility requirements
✗ Use effects that cause seizures (rapid flashing)
