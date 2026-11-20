import type { TreatmentCategory } from '../../content/treatments';

/**
 * Five apothecary vessel silhouettes — one per treatment category.
 * consultation: lidded record tin
 * peel: squat wide-mouth jar
 * device: slim pen-shaped vial
 * light: glass jar with radiating glaze lines
 * programme: stacked pair of jars
 */
export function TreatmentVessel({
  category,
  className = 'h-24 w-24',
  label,
}: {
  category: TreatmentCategory;
  className?: string;
  /** Optional tiny mono code printed on the vessel's cobalt label. */
  label?: string;
}) {
  return (
    <svg
      viewBox="0 0 120 132"
      className={`block shrink-0 ${className}`}
      aria-hidden="true"
    >
      {/* Subtle porcelain shelf ground line */}
      <line x1="12" y1="122" x2="108" y2="122" stroke="var(--primary-ink)" strokeWidth="1.25" />
      <line x1="18" y1="126" x2="102" y2="126" stroke="var(--primary-ink)" strokeWidth="0.7" opacity="0.5" />

      {category === 'consultation' && (
        <g>
          {/* Lidded porcelain record tin */}
          <rect
            x="24"
            y="46"
            width="72"
            height="75"
            rx="4"
            fill="var(--bisque)"
            stroke="var(--primary-ink)"
            strokeWidth="1.4"
          />
          {/* Lid overhang */}
          <rect
            x="20"
            y="34"
            width="80"
            height="13"
            rx="3"
            fill="var(--porcelain)"
            stroke="var(--primary-ink)"
            strokeWidth="1.4"
          />
          {/* Small top handle loop */}
          <path
            d="M48 34 C48 25 72 25 72 34"
            fill="none"
            stroke="var(--primary-ink)"
            strokeWidth="1.4"
          />
          {/* Cobalt clasp & record plaque */}
          <rect x="55" y="42" width="10" height="10" rx="1.5" fill="var(--primary)" />
          <rect
            x="36"
            y="64"
            width="48"
            height="34"
            rx="2"
            fill="var(--porcelain)"
            stroke="var(--primary-ink)"
            strokeWidth="1"
          />
          <line x1="44" y1="76" x2="76" y2="76" stroke="var(--primary-ink)" strokeWidth="1" />
          <line x1="44" y1="84" x2="70" y2="84" stroke="var(--primary-ink)" strokeWidth="0.8" opacity="0.65" />
          <line x1="44" y1="91" x2="64" y2="91" stroke="var(--primary-ink)" strokeWidth="0.8" opacity="0.5" />
          {/* Sheen crescent */}
          <path d="M30 56 C29 70 29 94 31 108" fill="none" stroke="var(--sheen)" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}

      {category === 'peel' && (
        <g>
          {/* Squat wide-mouth apothecary jar */}
          <path
            d="M32 48 C22 54 18 66 18 82 L18 108 C18 116 24 121 34 121 L86 121 C96 121 102 116 102 108 L102 82 C102 66 98 54 88 48 Z"
            fill="var(--blush)"
            stroke="var(--primary-ink)"
            strokeWidth="1.4"
          />
          {/* Wide porcelain lid */}
          <rect
            x="28"
            y="34"
            width="64"
            height="14"
            rx="3"
            fill="var(--bisque)"
            stroke="var(--primary-ink)"
            strokeWidth="1.35"
          />
          <circle cx="60" cy="27" r="6" fill="var(--porcelain)" stroke="var(--primary-ink)" strokeWidth="1.35" />
          {/* Cobalt specimen label */}
          <rect
            x="34"
            y="68"
            width="52"
            height="34"
            rx="2"
            fill="var(--bisque)"
            stroke="var(--primary-ink)"
            strokeWidth="1.15"
          />
          <rect x="38" y="72" width="44" height="26" rx="1" fill="none" stroke="var(--primary-ink)" strokeWidth="0.65" />
          <text
            x="60"
            y="88"
            textAnchor="middle"
            fill="var(--primary-ink)"
            fontFamily="var(--font-mono)"
            fontSize="8.5"
            letterSpacing="1.2"
          >
            {label ?? 'AHA'}
          </text>
          {/* Crescent sheen */}
          <path d="M26 64 C23 76 23 94 26 107" fill="none" stroke="var(--sheen)" strokeWidth="2.8" strokeLinecap="round" />
        </g>
      )}

      {category === 'device' && (
        <g>
          {/* Slim pen-shaped clinical vial */}
          <path
            d="M46 42 L74 42 L76 108 C76 116 70 121 60 121 C50 121 44 116 44 108 Z"
            fill="var(--bisque)"
            stroke="var(--primary-ink)"
            strokeWidth="1.4"
          />
          {/* Precision cap */}
          <path
            d="M49 42 L53 18 L67 18 L71 42 Z"
            fill="var(--primary)"
            stroke="var(--primary-ink)"
            strokeWidth="1.3"
          />
          <line x1="60" y1="12" x2="60" y2="18" stroke="var(--primary-ink)" strokeWidth="1.5" strokeLinecap="round" />
          {/* Measurement graduations */}
          <line x1="66" y1="58" x2="73" y2="58" stroke="var(--primary-ink)" strokeWidth="0.9" />
          <line x1="68" y1="68" x2="73" y2="68" stroke="var(--primary-ink)" strokeWidth="0.9" />
          <line x1="66" y1="78" x2="73" y2="78" stroke="var(--primary-ink)" strokeWidth="0.9" />
          <line x1="68" y1="88" x2="73" y2="88" stroke="var(--primary-ink)" strokeWidth="0.9" />
          <line x1="66" y1="98" x2="73" y2="98" stroke="var(--primary-ink)" strokeWidth="0.9" />
          {/* Celadon lower band */}
          <path
            d="M45 96 L75 96 L76 108 C76 115 70 120 60 120 C50 120 44 115 44 108 Z"
            fill="var(--celadon)"
            opacity="0.7"
          />
          {/* Sheen */}
          <path d="M51 52 L50 104" stroke="var(--sheen)" strokeWidth="2.4" strokeLinecap="round" />
        </g>
      )}

      {category === 'light' && (
        <g>
          {/* Radiating underglaze light lines */}
          <g stroke="var(--primary-ink)" strokeWidth="1" strokeLinecap="round" opacity="0.65">
            <line x1="60" y1="12" x2="60" y2="23" />
            <line x1="33" y1="22" x2="41" y2="30" />
            <line x1="87" y1="22" x2="79" y2="30" />
            <line x1="18" y1="48" x2="29" y2="52" />
            <line x1="102" y1="48" x2="91" y2="52" />
          </g>
          {/* Bell-shaped glass vessel */}
          <path
            d="M44 38 L76 38 L76 50 C88 58 92 72 92 88 L92 108 C92 116 86 121 76 121 L44 121 C34 121 28 116 28 108 L28 88 C28 72 32 58 44 50 Z"
            fill="var(--celadon-soft)"
            stroke="var(--primary-ink)"
            strokeWidth="1.4"
          />
          <rect
            x="40"
            y="29"
            width="40"
            height="10"
            rx="2"
            fill="var(--bisque)"
            stroke="var(--primary-ink)"
            strokeWidth="1.3"
          />
          {/* Inner light disc */}
          <circle
            cx="60"
            cy="84"
            r="16"
            fill="var(--bisque)"
            stroke="var(--primary-ink)"
            strokeWidth="1.1"
          />
          <circle cx="60" cy="84" r="6" fill="var(--celadon)" />
          {/* Sheen crescent */}
          <path d="M36 66 C33 78 33 96 36 108" fill="none" stroke="var(--sheen)" strokeWidth="2.6" strokeLinecap="round" />
        </g>
      )}

      {category === 'programme' && (
        <g>
          {/* Lower wider jar */}
          <rect
            x="24"
            y="78"
            width="72"
            height="43"
            rx="5"
            fill="var(--porcelain)"
            stroke="var(--primary-ink)"
            strokeWidth="1.4"
          />
          <rect
            x="38"
            y="90"
            width="44"
            height="19"
            rx="1.5"
            fill="var(--bisque)"
            stroke="var(--primary-ink)"
            strokeWidth="0.95"
          />
          <line x1="46" y1="99.5" x2="74" y2="99.5" stroke="var(--primary-ink)" strokeWidth="1" />

          {/* Upper stacked celadon jar */}
          <rect
            x="34"
            y="38"
            width="52"
            height="40"
            rx="4"
            fill="var(--celadon)"
            stroke="var(--primary-ink)"
            strokeWidth="1.4"
          />
          <rect
            x="38"
            y="28"
            width="44"
            height="10"
            rx="2"
            fill="var(--bisque)"
            stroke="var(--primary-ink)"
            strokeWidth="1.3"
          />
          <circle cx="60" cy="22" r="5" fill="var(--porcelain)" stroke="var(--primary-ink)" strokeWidth="1.3" />
          {/* Glaze sheen on both stacked jars */}
          <path d="M40 46 L40 70" stroke="var(--sheen)" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M31 86 L31 112" stroke="var(--sheen)" strokeWidth="2.4" strokeLinecap="round" />
        </g>
      )}
    </svg>
  );
}
