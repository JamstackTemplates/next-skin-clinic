/**
 * 404 illustration: porcelain teacup and saucer with a hairline crack repaired
 * by a celadon kintsugi-style seam and calm rising steam lines.
 */
export function CrackedTeacupArt({ className = 'h-48 w-64' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 260 190"
      className={`block ${className}`}
      role="img"
      aria-label="Porcelain teacup and saucer with a single hairline crack repaired in celadon glaze"
    >
      {/* Calm steam lines rising */}
      <g fill="none" stroke="var(--primary-ink)" strokeWidth="1.1" strokeLinecap="round" opacity="0.5">
        <path d="M108 56 C104 42 114 34 110 20" />
        <path d="M130 50 C126 34 136 26 132 10" />
        <path d="M150 56 C146 42 156 36 152 24" />
      </g>

      {/* Teacup handle */}
      <path
        d="M178 86 C204 86 206 122 174 126"
        fill="none"
        stroke="var(--primary-ink)"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M178 86 C204 86 206 122 174 126"
        fill="none"
        stroke="var(--bisque)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />

      {/* Saucer */}
      <ellipse cx="130" cy="158" rx="92" ry="13" fill="var(--porcelain)" stroke="var(--primary-ink)" strokeWidth="1.4" />
      <ellipse cx="130" cy="154" rx="76" ry="8" fill="var(--bisque)" stroke="var(--primary-ink)" strokeWidth="0.9" opacity="0.7" />
      <ellipse cx="130" cy="153" rx="34" ry="4" fill="var(--blush)" stroke="var(--primary-ink)" strokeWidth="0.8" opacity="0.6" />

      {/* Teacup body */}
      <path
        d="M74 72 L182 72 L176 122 C173 142 156 153 128 153 C100 153 83 142 80 122 Z"
        fill="var(--bisque)"
        stroke="var(--primary-ink)"
        strokeWidth="1.45"
        strokeLinejoin="round"
      />
      {/* Cup rim ellipse */}
      <ellipse cx="128" cy="72" rx="54" ry="8" fill="var(--blush)" stroke="var(--primary-ink)" strokeWidth="1.35" />

      {/* Subtle cobalt underglaze band near rim */}
      <path d="M76 83 Q128 90 180 83" fill="none" stroke="var(--primary-ink)" strokeWidth="0.9" opacity="0.65" />

      {/* Glaze sheen crescent */}
      <path
        d="M87 92 C86 108 88 124 94 136 C91 122 90 108 91 94 Z"
        fill="var(--sheen)"
        opacity="0.9"
      />

      {/* Hairline crack repaired with a celadon seam */}
      <path
        d="M138 78 L131 96 L140 112 L132 132 L136 151"
        fill="none"
        stroke="var(--celadon)"
        strokeWidth="4.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M138 78 L131 96 L140 112 L132 132 L136 151"
        fill="none"
        stroke="var(--celadon-ink)"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M131 96 L120 104"
        fill="none"
        stroke="var(--celadon-ink)"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}
