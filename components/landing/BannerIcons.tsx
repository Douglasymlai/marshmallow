/* Tiny illustrated inline items — flat, solid-color stickers used in the
   chapter banners and Brief counters (no emoji, no glyph fonts). */

const base: React.CSSProperties = {
  display: "inline-block",
  verticalAlign: "-4px",
  margin: "0 2px",
};

export function MergedDot({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" style={base} aria-hidden>
      <circle cx="10" cy="10" r="9" fill="#3f8d5c" />
      <path d="M6 10.2 L 9 13 L 14.2 7.4" stroke="#fefefb" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function FlagPennant({ size = 20 }: { size?: number }) {
  return (
    <svg width={size * 1.4} height={size} viewBox="0 0 28 20" style={base} aria-hidden>
      <rect x="2" y="1" width="2.4" height="18" rx="1.2" fill="#8c8780" />
      <path d="M5 2.5 L 26 7 L 5 11.5 Z" fill="#e0537a" />
    </svg>
  );
}

export function NudgeHand({ size = 19 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" style={base} aria-hidden>
      <path
        d="M5 12 C 5 7, 6.6 4, 7.6 4 C 8.6 4, 9 5.5, 9 7 C 9.4 4.5, 10 2.5, 11.2 2.5 C 12.4 2.5, 12.8 4.5, 12.9 6.6 C 13.4 4.8, 14.2 3.4, 15.2 3.6 C 16.2 3.8, 16.4 5.6, 16.4 7.6 C 16.9 6.4, 17.6 5.8, 18.3 6.2 C 19.2 6.8, 18.8 9.5, 18 12.5 C 17 16.5, 14.6 19.5, 11.4 19.5 C 8 19.5, 5 16.5, 5 12 Z"
        fill="#e06e3a"
      />
    </svg>
  );
}

export function FlowerBloom({ size = 19 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" style={base} aria-hidden>
      <g fill="#e0537a">
        <circle cx="11" cy="5" r="4" />
        <circle cx="17" cy="9.5" r="4" />
        <circle cx="14.8" cy="16.4" r="4" />
        <circle cx="7.2" cy="16.4" r="4" />
        <circle cx="5" cy="9.5" r="4" />
      </g>
      <circle cx="11" cy="11.5" r="3.4" fill="#f3c650" />
    </svg>
  );
}

export function ToolsTrio({ size = 19 }: { size?: number }) {
  return (
    <svg width={size * 2.4} height={size} viewBox="0 0 52 22" style={base} aria-hidden>
      {/* pencil */}
      <g transform="rotate(-24 10 11)">
        <rect x="6" y="4" width="7" height="13" fill="#f3c650" />
        <path d="M6 17 L 9.5 21.5 L 13 17 Z" fill="#d3a24c" />
        <rect x="6" y="1.6" width="7" height="3" fill="#cf7a6e" />
      </g>
      {/* scissors */}
      <g stroke="#5c7d9a" strokeWidth="2.2" strokeLinecap="round">
        <path d="M22 4 L 32 18" />
        <path d="M32 4 L 22 18" />
      </g>
      <circle cx="21" cy="19" r="2.6" fill="none" stroke="#5c7d9a" strokeWidth="2" />
      <circle cx="33" cy="19" r="2.6" fill="none" stroke="#5c7d9a" strokeWidth="2" />
      {/* ink bottle */}
      <rect x="40" y="8" width="10" height="11" rx="2" fill="#41564a" />
      <rect x="42.6" y="4.5" width="4.8" height="4.5" fill="#41564a" />
    </svg>
  );
}

export function ClockFace({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" style={base} aria-hidden>
      <circle cx="10" cy="10" r="9" fill="#e06e3a" />
      <path d="M10 5.4 V 10 L 13.4 12.2" stroke="#fefefb" strokeWidth="1.9" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function SpiralCoil({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" style={base} aria-hidden>
      <path
        d="M10 10 m 0 -0.5 a 1.4 1.4 0 0 1 1.4 1.6 a 3 3 0 0 1 -3.3 2.3 a 4.8 4.8 0 0 1 -3.8 -5.2 a 6.6 6.6 0 0 1 7 -5.6 a 8.2 8.2 0 0 1 7.2 8.6"
        fill="none"
        stroke="#8c8780"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function AskCard({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" style={base} aria-hidden>
      <rect x="1.5" y="1.5" width="17" height="17" rx="4" fill="#f3c650" />
      <text x="10" y="14.4" textAnchor="middle" fontSize="12" fontWeight="700" fill="#6d5115" fontFamily="inherit">
        ?
      </text>
    </svg>
  );
}

export function ContactCard({ size = 19 }: { size?: number }) {
  return (
    <svg width={size * 1.3} height={size} viewBox="0 0 26 20" style={base} aria-hidden>
      <rect x="1" y="2" width="24" height="16" rx="2.5" fill="#f3c650" />
      <circle cx="8" cy="9" r="3" fill="#a97c2b" />
      <rect x="4.6" y="13.4" width="6.8" height="2" rx="1" fill="#a97c2b" />
      <rect x="14" y="6" width="8" height="2" rx="1" fill="#a97c2b" />
      <rect x="14" y="10" width="8" height="2" rx="1" fill="#a97c2b" />
    </svg>
  );
}

export function TinyMonitor({ size = 19 }: { size?: number }) {
  return (
    <svg width={size * 1.15} height={size} viewBox="0 0 24 20" style={base} aria-hidden>
      <rect x="1.5" y="1.5" width="21" height="13" rx="2" fill="#9aa7b8" />
      <rect x="4" y="4" width="16" height="8" rx="1" fill="#e6ecf3" />
      <rect x="8" y="15.5" width="8" height="2" fill="#9aa7b8" />
      <rect x="6" y="17.5" width="12" height="1.8" rx="0.9" fill="#9aa7b8" />
    </svg>
  );
}

export function WaveHand({ size = 19 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" style={base} aria-hidden>
      <path
        d="M5 13 C 5 8, 6.6 5, 7.6 5 C 8.6 5, 9 6.5, 9 8 C 9.4 5.5, 10 3.5, 11.2 3.5 C 12.4 3.5, 12.8 5.5, 12.9 7.6 C 13.4 5.8, 14.2 4.4, 15.2 4.6 C 16.2 4.8, 16.4 6.6, 16.4 8.6 C 16.9 7.4, 17.6 6.8, 18.3 7.2 C 19.2 7.8, 18.8 10.5, 18 13.5 C 17 17.5, 14.6 20, 11.4 20 C 8 20, 5 17.5, 5 13 Z"
        fill="#5c7d9a"
      />
      <path d="M3 6 C 2 4.6, 2 3, 3 1.8 M1.6 8.6 C 0.6 8, 0.2 6.8, 0.4 5.6" stroke="#5c7d9a" strokeWidth="1.4" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function SortArrows({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" style={base} aria-hidden>
      <rect x="1" y="1" width="18" height="18" rx="4" fill="#cf4f38" />
      <path d="M7 14.5 V 6 M 4.6 8.4 L 7 5.6 L 9.4 8.4" stroke="#fefefb" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 5.5 V 14 M 10.6 11.6 L 13 14.4 L 15.4 11.6" stroke="#fefefb" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ThreadSpool({ size = 19 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" style={base} aria-hidden>
      <rect x="4" y="2" width="14" height="3.4" rx="1.4" fill="#8a6a52" />
      <rect x="4" y="16.6" width="14" height="3.4" rx="1.4" fill="#8a6a52" />
      <rect x="6.4" y="5.4" width="9.2" height="11.2" fill="#d3b9a8" />
      <g stroke="#a98973" strokeWidth="1.2">
        <path d="M6.4 7.5 H 15.6 M6.4 10 H 15.6 M6.4 12.5 H 15.6 M6.4 15 H 15.6" />
      </g>
      <path d="M15.6 8 C 19 9, 20.5 11, 21.5 14" stroke="#8a6a52" strokeWidth="1.3" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function IdeaBulb({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 22" style={base} aria-hidden>
      <path d="M10 1.5 C 5.6 1.5, 3 4.8, 3 8.2 C 3 11, 5 12.6, 6 14.4 L 14 14.4 C 15 12.6, 17 11, 17 8.2 C 17 4.8, 14.4 1.5, 10 1.5 Z" fill="#f3c650" />
      <rect x="6.8" y="15.6" width="6.4" height="2" rx="1" fill="#b98b2f" />
      <rect x="7.4" y="18.4" width="5.2" height="2" rx="1" fill="#b98b2f" />
    </svg>
  );
}

/* ── Brief counter items ── */

export function BellSm({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" style={base} aria-hidden>
      <path d="M11 2.5 C 6.6 3, 5 7, 4.8 10.6 L 3.4 15 C 3.3 15.8, 4 16.4, 4.8 16.4 L 17.2 16.4 C 18 16.4, 18.7 15.8, 18.6 15 L 17.2 10.6 C 17 7, 15.4 3, 11 2.5 Z" fill="#f0b429" />
      <path d="M8.6 17.6 a 2.5 2 0 0 0 4.8 0 Z" fill="#f0b429" />
    </svg>
  );
}

export function CrateSm({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" style={base} aria-hidden>
      <rect x="2" y="4" width="18" height="16" rx="1.5" fill="#cdb37e" />
      <rect x="2" y="4" width="18" height="3.6" fill="#b89c62" />
      <rect x="9" y="4" width="4" height="9" fill="#a98a4e" />
    </svg>
  );
}

export function DepHexSm({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" style={base} aria-hidden>
      <path d="M11 1.5 L 19.2 6.2 V 15.8 L 11 20.5 L 2.8 15.8 V 6.2 Z" fill="#a79ac4" />
      <circle cx="11" cy="11" r="3.4" fill="#fefefb" />
    </svg>
  );
}

export function TicketSm({ size = 18 }: { size?: number }) {
  return (
    <svg width={size * 1.35} height={size} viewBox="0 0 30 22" style={base} aria-hidden>
      <path
        d="M2 5 H 28 V 9.4 a 2.4 2.4 0 0 0 0 4.8 V 17 H 2 V 13.8 a 2.4 2.4 0 0 0 0 -4.8 Z"
        fill="#d98a9e"
      />
      <path d="M20 5.5 V 16.5" stroke="#fefefb" strokeWidth="1.4" strokeDasharray="2.4 2.4" />
    </svg>
  );
}

export function BotSm({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" style={base} aria-hidden>
      <rect x="3" y="6" width="16" height="12.5" rx="3" fill="#a79ac4" />
      <rect x="9.9" y="2.4" width="2.2" height="4" fill="#a79ac4" />
      <circle cx="11" cy="2.4" r="1.7" fill="#a79ac4" />
      <circle cx="7.6" cy="11" r="1.9" fill="#fefefb" />
      <circle cx="14.4" cy="11" r="1.9" fill="#fefefb" />
      <rect x="7.4" y="14.6" width="7.2" height="1.8" rx="0.9" fill="#fefefb" />
    </svg>
  );
}
