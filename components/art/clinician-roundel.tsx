/**
 * Porcelain roundel monogram for clinicians ("IH", "TW") in cobalt brushwork.
 */
export function ClinicianRoundel({
  monogram,
  className = 'h-20 w-20',
}: {
  monogram: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 88 88"
      className={`block shrink-0 ${className}`}
      aria-hidden="true"
    >
      <circle
        cx="44"
        cy="44"
        r="41"
        fill="var(--bisque)"
        stroke="var(--primary-ink)"
        strokeWidth="1.4"
      />
      <circle
        cx="44"
        cy="44"
        r="35"
        fill="none"
        stroke="var(--primary-ink)"
        strokeWidth="0.75"
        strokeDasharray="2 3"
      />
      {/* Subtle celadon inner wash */}
      <circle cx="44" cy="44" r="28" fill="var(--celadon-soft)" opacity="0.55" />
      {/* Cardinal cobalt dots */}
      <circle cx="44" cy="9" r="1.5" fill="var(--primary-ink)" />
      <circle cx="44" cy="79" r="1.5" fill="var(--primary-ink)" />
      <circle cx="9" cy="44" r="1.5" fill="var(--primary-ink)" />
      <circle cx="79" cy="44" r="1.5" fill="var(--primary-ink)" />
      <text
        x="44"
        y="52"
        textAnchor="middle"
        fill="var(--primary-ink)"
        fontFamily="var(--font-display)"
        fontSize="26"
        letterSpacing="2"
      >
        {monogram}
      </text>
    </svg>
  );
}
