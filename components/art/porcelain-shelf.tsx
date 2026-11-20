/**
 * Hero scene: the Porcelain dispensary shelf.
 * Tall lidded apothecary jar ("PSC" cartouche, crackled base easing to smooth shoulder),
 * dropper bottle, ribbed porcelain vase with single eucalyptus stem, and shallow celadon dish
 * cradling a kiln test tile, backed by a soft window-light parallelogram.
 *
 * Uses theme tokens exclusively; zero photography or gradients.
 */
export function PorcelainShelfArt({
  className = '',
  cropped = false,
}: {
  className?: string;
  /** Mobile view frames the tall jar and celadon dish cleanly at ~240–260px height. */
  cropped?: boolean;
}) {
  return (
    <svg
      viewBox={cropped ? '56 64 338 358' : '0 0 640 490'}
      className={`block h-auto w-full ${className}`}
      role="img"
      aria-label="Illustrated porcelain dispensary shelf with a lidded apothecary jar labelled PSC, a dropper bottle, a ribbed vase holding a eucalyptus stem, and a celadon dish holding a glaze test tile"
    >
      {/* Window-light parallelogram cast across the studio wall */}
      <polygon
        points="115,18 590,18 522,386 48,386"
        fill="var(--bisque)"
        opacity="0.82"
      />
      <polygon
        points="160,18 320,18 260,386 100,386"
        fill="var(--blush)"
        opacity="0.42"
      />
      <line
        x1="115"
        y1="18"
        x2="48"
        y2="386"
        stroke="var(--rule)"
        strokeWidth="1"
        strokeDasharray="3 5"
      />

      {/* Subtle architectural glaze tile lines behind shelf */}
      <line x1="20" y1="386" x2="620" y2="386" stroke="var(--primary-ink)" strokeWidth="1.4" />
      <line x1="20" y1="391" x2="620" y2="391" stroke="var(--primary-ink)" strokeWidth="0.9" opacity="0.6" />

      {/* Shelf thickness & cobalt-ruled edge */}
      <rect x="20" y="386" width="600" height="22" fill="var(--bisque)" />
      <line x1="20" y1="386" x2="620" y2="386" stroke="var(--primary-ink)" strokeWidth="1.5" />
      <line x1="20" y1="391" x2="620" y2="391" stroke="var(--primary-ink)" strokeWidth="0.85" />
      <line x1="20" y1="408" x2="620" y2="408" stroke="var(--primary-ink)" strokeWidth="1.25" />

      {/* Shelf underglaze brackets */}
      <path
        d="M92 408 L92 442 C92 426 106 416 124 414 L124 408 Z"
        fill="var(--blush)"
        stroke="var(--primary-ink)"
        strokeWidth="1.2"
      />
      <path
        d="M548 408 L548 442 C548 426 534 416 516 414 L516 408 Z"
        fill="var(--blush)"
        stroke="var(--primary-ink)"
        strokeWidth="1.2"
      />

      {/* ── 1. Tall lidded apothecary jar ("PSC") — crackled base to smooth shoulder ── */}
      <g>
        {/* Soft cast shadow on shelf */}
        <ellipse cx="164" cy="386" rx="74" ry="5" fill="var(--crackle)" opacity="0.55" />

        {/* Jar body */}
        <path
          d="M118 148 C96 164 92 188 92 214 L92 362 C92 376 104 385 118 385 L210 385 C224 385 236 376 236 362 L236 214 C236 188 232 164 210 148 Z"
          fill="var(--porcelain)"
          stroke="var(--primary-ink)"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />

        {/* Smooth upper shoulder glaze tint */}
        <path
          d="M118 150 C98 166 94 188 94 214 L94 246 L234 246 L234 214 C234 188 230 166 210 150 Z"
          fill="var(--bisque)"
          opacity="0.88"
        />

        {/* Underglaze shoulder double ring */}
        <path d="M94 196 Q164 203 234 196" fill="none" stroke="var(--primary-ink)" strokeWidth="1" opacity="0.65" />
        <path d="M93 201 Q164 208 235 201" fill="none" stroke="var(--primary-ink)" strokeWidth="0.7" opacity="0.45" />

        {/* Craquelure network concentrated at the jar's base, fading upward toward the smooth shoulder */}
        <g
          className="crackle-fade-in"
          fill="none"
          stroke="var(--crackle-stroke)"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Denser lower base crackle */}
          <path d="M96 356 L124 344 L150 362 L180 348 L210 365 L232 352" strokeWidth="1.05" />
          <path d="M124 344 L112 318 L142 308 L166 326 L194 314 L224 328" strokeWidth="0.95" />
          <path d="M150 362 L140 383 M180 348 L192 383 M112 318 L96 302 M194 314 L212 292" strokeWidth="0.9" />
          {/* Fading mid-jar crackle */}
          <path d="M104 294 L126 280 L142 308 M188 286 L212 292 L232 280" strokeWidth="0.7" opacity="0.62" />
          <path d="M126 280 L118 256 M212 292 L222 262" strokeWidth="0.55" opacity="0.32" />
        </g>

        {/* Foot rim */}
        <path
          d="M108 378 L220 378"
          stroke="var(--primary-ink)"
          strokeWidth="1.1"
          opacity="0.75"
        />

        {/* Jar neck */}
        <rect
          x="126"
          y="124"
          width="76"
          height="24"
          rx="2"
          fill="var(--bisque)"
          stroke="var(--primary-ink)"
          strokeWidth="1.35"
        />
        <line x1="126" y1="136" x2="202" y2="136" stroke="var(--primary-ink)" strokeWidth="0.85" opacity="0.55" />

        {/* Domed porcelain lid + finial */}
        <path
          d="M118 124 C118 104 138 92 164 92 C190 92 210 104 210 124 Z"
          fill="var(--porcelain)"
          stroke="var(--primary-ink)"
          strokeWidth="1.35"
        />
        <path
          d="M124 117 Q164 122 204 117"
          fill="none"
          stroke="var(--primary-ink)"
          strokeWidth="0.85"
          opacity="0.6"
        />
        <circle
          cx="164"
          cy="79"
          r="11"
          fill="var(--bisque)"
          stroke="var(--primary-ink)"
          strokeWidth="1.35"
        />
        <path d="M159 75 C159 72 162 71 164 71" fill="none" stroke="var(--sheen)" strokeWidth="2.2" strokeLinecap="round" />

        {/* Crisp white crescent glaze sheen (flat shape, no gradient) */}
        <path
          d="M111 174 C103 196 102 238 104 282 C108 242 110 202 117 177 Z"
          fill="var(--sheen)"
          opacity="0.92"
        />

        {/* Cobalt underglaze cartouche label reading "PSC" */}
        <g>
          <rect
            x="121"
            y="220"
            width="86"
            height="60"
            rx="4"
            fill="var(--bisque)"
            stroke="var(--primary-ink)"
            strokeWidth="1.35"
          />
          <rect
            x="126"
            y="225"
            width="76"
            height="50"
            rx="2"
            fill="none"
            stroke="var(--primary-ink)"
            strokeWidth="0.75"
          />
          {/* Tiny corner dots */}
          <circle cx="131" cy="230" r="1.2" fill="var(--primary-ink)" />
          <circle cx="197" cy="230" r="1.2" fill="var(--primary-ink)" />
          <circle cx="131" cy="270" r="1.2" fill="var(--primary-ink)" />
          <circle cx="197" cy="270" r="1.2" fill="var(--primary-ink)" />
          <text
            x="164"
            y="251"
            textAnchor="middle"
            fill="var(--primary-ink)"
            fontFamily="var(--font-display)"
            fontSize="20"
            letterSpacing="3"
          >
            PSC
          </text>
          <line x1="138" y1="259" x2="190" y2="259" stroke="var(--primary-ink)" strokeWidth="0.7" opacity="0.65" />
          <text
            x="164"
            y="267"
            textAnchor="middle"
            fill="var(--muted)"
            fontFamily="var(--font-mono)"
            fontSize="6.4"
            letterSpacing="1.4"
          >
            NO. 01 · W1U
          </text>
        </g>
      </g>

      {/* ── 2. Shallow celadon dish cradling a glazed test tile ── */}
      <g>
        <ellipse cx="322" cy="386" rx="64" ry="4.5" fill="var(--crackle)" opacity="0.5" />
        {/* Kiln test tile resting at an angle inside dish */}
        <g transform="rotate(-11 324 342)">
          <rect
            x="284"
            y="328"
            width="82"
            height="28"
            rx="2"
            fill="var(--bisque)"
            stroke="var(--primary-ink)"
            strokeWidth="1.25"
          />
          {/* Right half dipped in celadon glaze */}
          <rect x="325" y="329" width="40" height="26" rx="1" fill="var(--celadon)" opacity="0.88" />
          {/* Left half fine crackle */}
          <path
            d="M289 336 L300 342 L294 352 M300 342 L314 334 L318 350"
            fill="none"
            stroke="var(--crackle)"
            strokeWidth="0.9"
          />
          {/* Cobalt test tick marks */}
          <line x1="305" y1="328" x2="305" y2="334" stroke="var(--primary-ink)" strokeWidth="1" />
          <line x1="325" y1="328" x2="325" y2="336" stroke="var(--primary-ink)" strokeWidth="1.2" />
          <line x1="345" y1="328" x2="345" y2="334" stroke="var(--primary-ink)" strokeWidth="1" />
        </g>

        {/* Shallow celadon bowl body */}
        <path
          d="M256 355 C262 376 284 385 322 385 C360 385 382 376 388 355 Z"
          fill="var(--celadon)"
          stroke="var(--primary-ink)"
          strokeWidth="1.35"
          strokeLinejoin="round"
        />
        <ellipse
          cx="322"
          cy="355"
          rx="66"
          ry="7.5"
          fill="var(--bisque)"
          stroke="var(--primary-ink)"
          strokeWidth="1.25"
        />
        {/* Rim glaze crescent sheen */}
        <path
          d="M268 363 C278 374 294 378 312 379 C294 376 280 371 271 362 Z"
          fill="var(--sheen)"
          opacity="0.85"
        />
      </g>

      {/* ── 3. Dropper bottle with pipette bulb ── */}
      <g>
        <ellipse cx="436" cy="386" rx="34" ry="4" fill="var(--crackle)" opacity="0.5" />
        {/* Bottle body */}
        <path
          d="M416 254 C406 262 404 272 404 286 L404 373 C404 380 410 385 418 385 L454 385 C462 385 468 380 468 373 L468 286 C468 272 466 262 456 254 Z"
          fill="var(--blush)"
          stroke="var(--primary-ink)"
          strokeWidth="1.3"
        />
        {/* Collar */}
        <rect
          x="420"
          y="236"
          width="32"
          height="18"
          rx="2"
          fill="var(--bisque)"
          stroke="var(--primary-ink)"
          strokeWidth="1.25"
        />
        <line x1="420" y1="242" x2="452" y2="242" stroke="var(--primary-ink)" strokeWidth="0.8" />
        <line x1="420" y1="248" x2="452" y2="248" stroke="var(--primary-ink)" strokeWidth="0.8" />
        {/* Dropper bulb */}
        <path
          d="M427 236 L427 210 C427 201 445 201 445 210 L445 236 Z"
          fill="var(--primary)"
          stroke="var(--primary-ink)"
          strokeWidth="1.2"
        />
        {/* Label */}
        <rect
          x="413"
          y="296"
          width="46"
          height="54"
          rx="2"
          fill="var(--bisque)"
          stroke="var(--primary-ink)"
          strokeWidth="1"
        />
        <line x1="421" y1="312" x2="451" y2="312" stroke="var(--primary-ink)" strokeWidth="1" />
        <line x1="421" y1="322" x2="447" y2="322" stroke="var(--primary-ink)" strokeWidth="0.8" opacity="0.65" />
        <line x1="421" y1="332" x2="443" y2="332" stroke="var(--primary-ink)" strokeWidth="0.8" opacity="0.5" />
        {/* Crescent glaze highlight */}
        <path
          d="M412 270 C409 286 409 320 411 350 C413 320 413 288 415 272 Z"
          fill="var(--sheen)"
          opacity="0.85"
        />
      </g>

      {/* ── 4. Ribbed porcelain vase with a single eucalyptus stem ── */}
      <g>
        <ellipse cx="536" cy="386" rx="38" ry="4" fill="var(--crackle)" opacity="0.5" />

        {/* Eucalyptus stem & celadon leaves */}
        <path
          d="M534 224 C532 172 544 114 574 52"
          fill="none"
          stroke="var(--primary-ink)"
          strokeWidth="1.35"
          strokeLinecap="round"
        />
        {/* Leaves along the stem */}
        <ellipse cx="520" cy="176" rx="16" ry="10" transform="rotate(-32 520 176)" fill="var(--celadon)" stroke="var(--primary-ink)" strokeWidth="1.15" />
        <ellipse cx="556" cy="158" rx="17" ry="10.5" transform="rotate(24 556 158)" fill="var(--celadon)" stroke="var(--primary-ink)" strokeWidth="1.15" />
        <ellipse cx="526" cy="126" rx="15" ry="9.5" transform="rotate(-28 526 126)" fill="var(--celadon)" stroke="var(--primary-ink)" strokeWidth="1.15" />
        <ellipse cx="566" cy="110" rx="15" ry="9" transform="rotate(20 566 110)" fill="var(--celadon)" stroke="var(--primary-ink)" strokeWidth="1.15" />
        <ellipse cx="546" cy="78" rx="13" ry="8" transform="rotate(-24 546 78)" fill="var(--celadon)" stroke="var(--primary-ink)" strokeWidth="1.15" />
        <ellipse cx="578" cy="64" rx="11" ry="7" transform="rotate(14 578 64)" fill="var(--celadon)" stroke="var(--primary-ink)" strokeWidth="1.1" />

        {/* Ribbed porcelain vase silhouette */}
        <path
          d="M518 224 L554 224 L550 250 C570 268 576 294 574 328 C572 356 562 376 554 385 L518 385 C510 376 500 356 498 328 C496 294 502 268 522 250 Z"
          fill="var(--porcelain)"
          stroke="var(--primary-ink)"
          strokeWidth="1.35"
          strokeLinejoin="round"
        />
        {/* Vertical ceramic ribs */}
        <path d="M524 252 C516 286 516 346 524 384" fill="none" stroke="var(--primary-ink)" strokeWidth="0.8" opacity="0.55" />
        <path d="M536 250 L536 384" fill="none" stroke="var(--primary-ink)" strokeWidth="0.85" opacity="0.6" />
        <path d="M548 252 C556 286 556 346 548 384" fill="none" stroke="var(--primary-ink)" strokeWidth="0.8" opacity="0.55" />
        {/* Lip rim */}
        <ellipse cx="536" cy="224" rx="18" ry="4" fill="var(--bisque)" stroke="var(--primary-ink)" strokeWidth="1.25" />
        {/* Glaze sheen crescent */}
        <path
          d="M510 278 C504 300 505 334 510 356 C509 332 509 302 514 282 Z"
          fill="var(--sheen)"
          opacity="0.9"
        />
      </g>
    </svg>
  );
}
