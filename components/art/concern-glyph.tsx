import type { ConcernId } from '../../content/concerns';

/**
 * Six bespoke underglaze concern marks on tiny porcelain tile squares.
 * Drawn in 1.25px cobalt strokes with flat celadon/blush accents.
 */
export function ConcernGlyph({
  concern,
  className = 'h-11 w-11',
}: {
  concern: ConcernId;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={`block shrink-0 ${className}`}
      aria-hidden="true"
    >
      {/* Porcelain glaze tile square */}
      <rect
        x="2"
        y="2"
        width="44"
        height="44"
        rx="3"
        fill="var(--bisque)"
        stroke="var(--primary-ink)"
        strokeWidth="1.2"
      />
      <rect
        x="5"
        y="5"
        width="38"
        height="38"
        rx="1.5"
        fill="none"
        stroke="var(--rule)"
        strokeWidth="0.8"
      />

      {concern === 'acne' && (
        <g>
          {/* Scattered dots inside a calm cobalt circle */}
          <circle cx="24" cy="24" r="13" fill="var(--blush)" stroke="var(--primary-ink)" strokeWidth="1.2" />
          <circle cx="19" cy="20" r="1.8" fill="var(--primary-ink)" />
          <circle cx="27" cy="18" r="1.4" fill="var(--primary-ink)" />
          <circle cx="23" cy="25" r="2.1" fill="var(--primary-ink)" />
          <circle cx="30" cy="26" r="1.5" fill="var(--primary-ink)" />
          <circle cx="19" cy="29" r="1.4" fill="var(--primary-ink)" />
          <circle cx="26" cy="31" r="1.2" fill="var(--primary-ink)" />
        </g>
      )}

      {concern === 'redness' && (
        <g>
          {/* Flushed crescent with cobalt brush arc */}
          <path
            d="M28 11 A13 13 0 1 0 36 33 A10 10 0 1 1 28 11 Z"
            fill="var(--blush)"
            stroke="var(--primary-ink)"
            strokeWidth="1.25"
            strokeLinejoin="round"
          />
          <path
            d="M17 19 C15 23 16 28 19 31"
            fill="none"
            stroke="var(--primary-ink)"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.7"
          />
        </g>
      )}

      {concern === 'pigmentation' && (
        <g>
          {/* Uneven freckle cluster on celadon wash */}
          <ellipse cx="24" cy="24" rx="12" ry="9" fill="var(--celadon-soft)" />
          <circle cx="17" cy="22" r="2.3" fill="var(--primary-ink)" opacity="0.85" />
          <circle cx="24" cy="19" r="3" fill="var(--primary-ink)" opacity="0.45" />
          <circle cx="29" cy="24" r="2.6" fill="var(--primary-ink)" opacity="0.75" />
          <circle cx="21" cy="28" r="1.9" fill="var(--primary-ink)" opacity="0.65" />
          <circle cx="32" cy="18" r="1.3" fill="var(--primary-ink)" opacity="0.9" />
          <circle cx="15" cy="27" r="1.2" fill="var(--primary-ink)" opacity="0.7" />
        </g>
      )}

      {concern === 'texture' && (
        <g fill="none" stroke="var(--primary-ink)" strokeWidth="1.25" strokeLinecap="round">
          {/* Ripple of fine underglaze contour lines */}
          <path d="M11 16 Q17 12 24 16 T37 16" />
          <path d="M11 22 Q17 18 24 22 T37 22" />
          <path d="M11 28 Q17 24 24 28 T37 28" />
          <path d="M11 34 Q17 30 24 34 T37 34" opacity="0.6" />
        </g>
      )}

      {concern === 'dehydration' && (
        <g>
          {/* Cracked porcelain droplet */}
          <path
            d="M24 10 C24 10 34 21 34 28 A10 10 0 1 1 14 28 C14 21 24 10 24 10 Z"
            fill="var(--celadon-soft)"
            stroke="var(--primary-ink)"
            strokeWidth="1.25"
            strokeLinejoin="round"
          />
          <path
            d="M24 17 L21 24 L26 28 L23 34"
            fill="none"
            stroke="var(--primary-ink)"
            strokeWidth="1.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      )}

      {concern === 'ageing' && (
        <g>
          {/* Single soft porcelain fold line */}
          <path
            d="M12 31 C18 20 30 20 36 16"
            fill="none"
            stroke="var(--primary-ink)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d="M15 34 C21 25 31 24 36 21"
            fill="none"
            stroke="var(--celadon-ink)"
            strokeWidth="1.1"
            strokeLinecap="round"
            opacity="0.85"
          />
          <circle cx="36" cy="16" r="1.6" fill="var(--primary-ink)" />
        </g>
      )}
    </svg>
  );
}
