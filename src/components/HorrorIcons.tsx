// TERRIFYING Horror-themed Icons

export const SkullIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* Skull shape - more detailed */}
    <path
      d="M12 2C8 2 5 5 5 9v4c0 2 1 3 2 3h1v3c0 1 1 2 2 2h4c1 0 2-1 2-2v-3h1c1 0 2-1 2-3V9c0-4-3-7-7-7z"
      fill="currentColor"
      opacity="0.95"
      filter="drop-shadow(0 0 4px rgba(139,0,0,0.8))"
    />
    {/* Eye sockets - DEEP HOLLOW with red glow */}
    <ellipse cx="9" cy="11" rx="2.5" ry="3" fill="#000" />
    <circle cx="9" cy="11" r="0.8" fill="#ff0000" opacity="0.9" />
    <ellipse cx="15" cy="11" rx="2.5" ry="3" fill="#000" />
    <circle cx="15" cy="11" r="0.8" fill="#ff0000" opacity="0.9" />
    {/* Nose cavity - triangular and dark */}
    <path d="M12 14 L10 16.5 L12 17.5 L14 16.5 Z" fill="#000" />
    {/* Teeth - jagged and broken */}
    <rect x="8.5" y="18" width="1.5" height="2.5" fill="#000" opacity="0.9" />
    <rect x="10.5" y="18" width="1.5" height="2.2" fill="#000" opacity="0.85" />
    <rect x="12.5" y="18" width="1.5" height="2.5" fill="#000" opacity="0.9" />
    <rect x="14.5" y="18" width="1.5" height="2" fill="#000" opacity="0.8" />
    {/* Deep cracks */}
    <path d="M7 7 L8.5 10" stroke="#000" strokeWidth="0.8" opacity="0.8" />
    <path d="M17 6 L15.5 9" stroke="#000" strokeWidth="0.8" opacity="0.8" />
    <path d="M12 5 L12 8" stroke="#000" strokeWidth="0.6" opacity="0.7" />
    {/* Blood stains */}
    <circle cx="8" cy="9" r="1" fill="#8b0000" opacity="0.6" />
    <circle cx="16" cy="8" r="0.8" fill="#8b0000" opacity="0.5" />
  </svg>
);

export const BloodMailIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* Envelope - stained and damaged */}
    <rect x="3" y="6" width="18" height="12" rx="1" fill="currentColor" opacity="0.95"
      filter="drop-shadow(0 0 3px rgba(139,0,0,0.7))" />
    <path d="M3 6 L12 13 L21 6" stroke="#8b0000" strokeWidth="2" fill="none" opacity="0.9" />
    {/* HEAVY blood drips */}
    <path d="M7 18 L7 21 Q7 22 8 22 Q9 22 9 21 L9 18" fill="#8b0000" opacity="0.95" />
    <path d="M15 18 L15 22" stroke="#8b0000" strokeWidth="2" opacity="0.9" />
    <path d="M11 18 L11 20 Q11 21 11.5 21 Q12 21 12 20 L12 18" fill="#8b0000" opacity="0.85" />
    {/* MASSIVE blood splatter on envelope */}
    <circle cx="16" cy="10" r="2.5" fill="#8b0000" opacity="0.85" />
    <circle cx="17.5" cy="11.5" r="1.2" fill="#8b0000" opacity="0.75" />
    <circle cx="14.5" cy="11" r="1" fill="#8b0000" opacity="0.7" />
    <circle cx="18" cy="9" r="0.8" fill="#8b0000" opacity="0.65" />
    {/* Blood smear */}
    <ellipse cx="10" cy="12" rx="3" ry="1.5" fill="#8b0000" opacity="0.5" />
    {/* Torn edge */}
    <path d="M20 8 L21 9" stroke="#000" strokeWidth="0.5" opacity="0.6" />
  </svg>
);

export const ZombieTerminalIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* Terminal window - corrupted */}
    <rect x="2" y="4" width="20" height="16" rx="1" fill="currentColor" opacity="0.95"
      filter="drop-shadow(0 0 4px rgba(0,255,0,0.5))" />
    <rect x="2" y="4" width="20" height="3" fill="#0a0a0a" />
    {/* Corrupted terminal prompt - GLITCHING */}
    <path d="M5 10 L8 12 L5 14" stroke="#00ff00" strokeWidth="2" fill="none" opacity="0.9" />
    <line x1="10" y1="12" x2="16" y2="12" stroke="#00ff00" strokeWidth="1.5" opacity="0.8" />
    {/* HEAVY glitch lines */}
    <line x1="5" y1="16" x2="12" y2="16" stroke="#ff0000" strokeWidth="1" opacity="0.9" />
    <line x1="14" y1="16" x2="19" y2="16" stroke="#00ff00" strokeWidth="1" opacity="0.9" />
    <line x1="6" y1="17.5" x2="10" y2="17.5" stroke="#ff0000" strokeWidth="0.8" opacity="0.7" />
    <line x1="12" y1="17.5" x2="18" y2="17.5" stroke="#00ff00" strokeWidth="0.8" opacity="0.7" />
    {/* ERROR symbols */}
    <text x="5" y="11" fontSize="2" fill="#ff0000" opacity="0.8">ERR</text>
    {/* Skull cursor - LARGER */}
    <circle cx="18" cy="12" r="2" fill="#ff0000" opacity="0.9" />
    <circle cx="17.5" cy="11.5" r="0.4" fill="#000" />
    <circle cx="18.5" cy="11.5" r="0.4" fill="#000" />
    {/* Static noise */}
    <rect x="15" y="8" width="0.5" height="0.5" fill="#00ff00" opacity="0.6" />
    <rect x="17" y="9" width="0.5" height="0.5" fill="#ff0000" opacity="0.6" />
  </svg>
);

export const CryptIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* Folder/Crypt - DAMAGED */}
    <path
      d="M4 6 L4 18 C4 19 5 20 6 20 L18 20 C19 20 20 19 20 18 L20 8 C20 7 19 6 18 6 L12 6 L10 4 L6 4 C5 4 4 5 4 6 Z"
      fill="currentColor"
      opacity="0.95"
      filter="drop-shadow(0 0 3px rgba(139,0,0,0.6))"
    />
    {/* GLOWING Pentagram on folder */}
    <path
      d="M12 9 L13.5 12.5 L17 12.5 L14 14.5 L15 18 L12 16 L9 18 L10 14.5 L7 12.5 L10.5 12.5 Z"
      stroke="#8b0000"
      strokeWidth="1.2"
      fill="rgba(139,0,0,0.3)"
      opacity="0.95"
      filter="drop-shadow(0 0 2px rgba(139,0,0,0.9))"
    />
    {/* Circle around pentagram */}
    <circle cx="12" cy="13.5" r="5.5" stroke="#8b0000" strokeWidth="0.6" fill="none" opacity="0.7" />
    {/* DEEP cracks */}
    <path d="M7 9 L9 15" stroke="#000" strokeWidth="0.8" opacity="0.7" />
    <path d="M17 10 L15 16" stroke="#000" strokeWidth="0.8" opacity="0.7" />
    <path d="M10 8 L11 12" stroke="#000" strokeWidth="0.6" opacity="0.6" />
    {/* Blood stains */}
    <circle cx="8" cy="11" r="1" fill="#8b0000" opacity="0.6" />
    <circle cx="16" cy="15" r="0.8" fill="#8b0000" opacity="0.5" />
  </svg>
);

export const OuijaIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* Ouija board - ANCIENT */}
    <rect x="3" y="5" width="18" height="14" rx="2" fill="currentColor" opacity="0.95"
      filter="drop-shadow(0 0 4px rgba(139,0,0,0.7))" />
    {/* Planchette (pointer) - GLOWING */}
    <path
      d="M12 8 L15 13 L12 14 L9 13 Z"
      fill="#8b0000"
      opacity="0.95"
      filter="drop-shadow(0 0 3px rgba(139,0,0,0.9))"
    />
    {/* DEMONIC Eye in planchette */}
    <ellipse cx="12" cy="11" rx="2" ry="2.5" fill="#000" />
    <circle cx="12" cy="11" r="0.8" fill="#ff0000" opacity="0.95" />
    <circle cx="12" cy="11" r="0.3" fill="#fff" opacity="0.8" />
    {/* Letters/symbols - GLOWING */}
    <text x="6" y="18" fontSize="3.5" fill="#8b0000" opacity="0.9" fontWeight="bold">YES</text>
    <text x="13.5" y="18" fontSize="3.5" fill="#8b0000" opacity="0.9" fontWeight="bold">NO</text>
    {/* Mystical symbols - PENTAGRAMS */}
    <path d="M6 8 L6.5 9.5 L8 9.5 L6.8 10.3 L7.2 12 L6 11 L4.8 12 L5.2 10.3 L4 9.5 L5.5 9.5 Z"
      fill="#8b0000" opacity="0.8" />
    <path d="M18 8 L18.5 9.5 L20 9.5 L18.8 10.3 L19.2 12 L18 11 L16.8 12 L17.2 10.3 L16 9.5 L17.5 9.5 Z"
      fill="#8b0000" opacity="0.8" />
    {/* Alphabet arc */}
    <path d="M6 10 Q12 8 18 10" stroke="#8b0000" strokeWidth="0.5" fill="none" opacity="0.6" />
    {/* Numbers */}
    <text x="8" y="16" fontSize="2" fill="#8b0000" opacity="0.6">1234567890</text>
    {/* Goodbye */}
    <text x="8.5" y="13" fontSize="2" fill="#8b0000" opacity="0.7">GOODBYE</text>
  </svg>
);
