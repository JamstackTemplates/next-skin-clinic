import type { ReactNode } from 'react';

/**
 * Underglaze section border: double cobalt hairline rule with a subtle
 * repeating scroll and centred cartouche label.
 */
export function UnderglazeBorder({
  label,
  className = '',
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-4 ${className}`} aria-hidden={label ? undefined : true}>
      <div className="flex-1">
        <div className="h-px bg-primary-ink/70" />
        <div className="mt-[3px] h-px bg-primary-ink/30" />
      </div>

      {/* Left brush scroll */}
      <svg viewBox="0 0 28 12" className="h-3 w-7 shrink-0 text-primary-ink" aria-hidden="true">
        <path
          d="M2 6 C7 1 13 1 18 6 C21 9 24 8 26 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.15"
          strokeLinecap="round"
        />
      </svg>

      {label ? (
        <span className="specimen-label border border-primary-ink/60 bg-bisque px-3 py-1">
          {label}
        </span>
      ) : (
        <svg viewBox="0 0 24 16" className="h-4 w-6 shrink-0 text-primary-ink" aria-hidden="true">
          <path
            d="M12 2 L21 8 L12 14 L3 8 Z"
            fill="var(--bisque)"
            stroke="currentColor"
            strokeWidth="1.15"
          />
          <circle cx="12" cy="8" r="2" fill="currentColor" />
        </svg>
      )}

      {/* Right brush scroll */}
      <svg viewBox="0 0 28 12" className="h-3 w-7 shrink-0 text-primary-ink" aria-hidden="true">
        <path
          d="M26 6 C21 1 15 1 10 6 C7 9 4 8 2 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.15"
          strokeLinecap="round"
        />
      </svg>

      <div className="flex-1">
        <div className="h-px bg-primary-ink/70" />
        <div className="mt-[3px] h-px bg-primary-ink/30" />
      </div>
    </div>
  );
}

/**
 * Consultation record-card porcelain plaque: cobalt double border with subtle corner flourishes.
 */
export function RecordCard({
  children,
  className = '',
  kicker,
}: {
  children: ReactNode;
  className?: string;
  kicker?: string;
}) {
  return (
    <div
      className={`relative border border-primary-ink/75 bg-bisque p-6 sm:p-8 ${className}`}
    >
      {/* Inner hairline frame */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[5px] border border-primary-ink/30"
      />
      {/* Corner cobalt underglaze flourishes */}
      <CornerFlourish position="top-2 left-2" />
      <CornerFlourish position="top-2 right-2 -scale-x-100" />
      <CornerFlourish position="bottom-2 left-2 -scale-y-100" />
      <CornerFlourish position="bottom-2 right-2 -scale-x-100 -scale-y-100" />

      {kicker ? (
        <p className="specimen-label relative mb-4 border-b border-rule pb-2.5">{kicker}</p>
      ) : null}
      <div className="relative">{children}</div>
    </div>
  );
}

function CornerFlourish({ position }: { position: string }) {
  return (
    <svg
      viewBox="0 0 18 18"
      className={`pointer-events-none absolute h-3.5 w-3.5 text-primary-ink ${position}`}
      aria-hidden="true"
    >
      <path
        d="M2 14 L2 4 C2 2.8 2.8 2 4 2 L14 2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <circle cx="6" cy="6" r="1.2" fill="currentColor" />
    </svg>
  );
}
