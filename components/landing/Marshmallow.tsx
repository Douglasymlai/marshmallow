/* Kawaii marshmallow mascot — rounded body, little face, blush cheeks and
   a toasted sparkle. Matches the brand illustration. */
export function MarshmallowFace({
  size = 48,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size * 1.3}
      viewBox="0 0 40 52"
      fill="none"
      className={className}
      aria-hidden
    >
      {/* ground shadow */}
      <ellipse cx="20" cy="43" rx="11" ry="2.2" fill="rgba(0,0,0,0.1)" />

      {/* sparkle, top-right */}
      <g
        stroke="#f2c14e"
        strokeWidth="1.6"
        strokeLinecap="round"
      >
        <path d="M32 8 L33.5 5" />
        <path d="M35 11 L38 10" />
        <path d="M34 15 L37 16.5" />
      </g>

      {/* body + face (slight tilt) */}
      <g transform="rotate(-8 20 25)">
        <rect
          x="7"
          y="11"
          width="26"
          height="30"
          rx="9"
          fill="#fdfcf8"
          stroke="#c9b7a4"
          strokeWidth="1.6"
        />
        {/* top rim crease */}
        <path
          d="M12 19 C 16 23, 24 23, 29 18"
          stroke="#c9b7a4"
          strokeWidth="1"
          fill="none"
          opacity="0.7"
        />
        {/* toast creases, lower-left */}
        <g stroke="#c9b7a4" strokeWidth="1" opacity="0.55" strokeLinecap="round">
          <path d="M12 33 q-0.4 2 0 3.4" />
          <path d="M14.2 34.4 q-0.3 1.4 0 2.4" />
        </g>
        {/* cheeks */}
        <ellipse cx="14" cy="30" rx="2.4" ry="1.7" fill="#f4a9c0" />
        <ellipse cx="26" cy="30" rx="2.4" ry="1.7" fill="#f4a9c0" />
        {/* eyes */}
        <circle cx="17" cy="27" r="1.7" fill="#4a3a34" />
        <circle cx="23" cy="27" r="1.7" fill="#4a3a34" />
        {/* smile */}
        <path
          d="M17.4 30.4 Q20 33 22.6 30.4"
          stroke="#4a3a34"
          strokeWidth="1.3"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

/* Small brand glyph (toasted marshmallow square). `dots` toggles the two
   toasted marks inside — off gives a blank marshmallow outline. */
export function BrandGlyph({
  size = 22,
  dots = true,
}: {
  size?: number;
  dots?: boolean;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden>
      <rect
        x="7"
        y="7"
        width="18"
        height="18"
        rx="7"
        stroke="var(--ink)"
        strokeWidth="2.2"
        transform="rotate(-8 16 16)"
      />
      {dots && (
        <>
          <circle
            cx="13"
            cy="13"
            r="1.4"
            fill="var(--ink)"
            transform="rotate(-8 16 16)"
          />
          <circle
            cx="20"
            cy="19"
            r="1.4"
            fill="var(--ink)"
            transform="rotate(-8 16 16)"
          />
        </>
      )}
    </svg>
  );
}
