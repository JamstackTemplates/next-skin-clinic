'use client';

import { useEffect, useId, useState } from 'react';
import type { CaseMeasure } from '../content/results';

/**
 * Compute evenly spaced session tick positions along a 0..weeks course.
 */
function sessionPositions(weeks: number, sessions: number): number[] {
  if (sessions <= 1) return [0.5];
  return Array.from({ length: sessions }, (_, idx) => {
    const ratio = (idx + 0.5) / sessions;
    return Math.min(0.96, Math.max(0.04, ratio));
  });
}

/**
 * Deterministic crackle polyline fragments per segment so the tile looks hand-glazed
 * and renders identically across SSR, hydration and static exports.
 */
function cracklePathsForSegment(x: number, width: number, index: number, height: number): string {
  const x1 = x + width * 0.16;
  const x2 = x + width * 0.52;
  const x3 = x + width * 0.84;
  const yTop = 5 + ((index * 7) % 9);
  const yMid = height * 0.48 + (((index * 11) % 7) - 3);
  const yBot = height - 6 - ((index * 5) % 8);
  return `M${x1.toFixed(1)} ${yTop.toFixed(1)} L${x2.toFixed(1)} ${yMid.toFixed(1)} L${x3.toFixed(1)} ${yBot.toFixed(1)} M${x2.toFixed(1)} ${yMid.toFixed(1)} L${(x + width * 0.25).toFixed(1)} ${(yBot - 2).toFixed(1)}`;
}

interface GaugeGraphicProps {
  weeks: number;
  sessions: number;
  measure: CaseMeasure;
  /** Current scrubbed week (defaults to full course `weeks` for static/no-JS view). */
  activeWeek?: number;
  compact?: boolean;
}

/**
 * Signature visual: the Glaze Gauge porcelain kiln test tile.
 * Weekly segments transition from crackled bisque on the left to smooth celadon glaze on the right,
 * marked with cobalt session ticks and Geist Mono labels.
 */
export function GlazeGaugeTile({
  weeks,
  sessions,
  measure,
  activeWeek,
  compact = false,
}: GaugeGraphicProps) {
  const width = 680;
  const height = compact ? 38 : 66;
  const segCount = Math.min(20, Math.max(6, weeks));
  const segW = (width - 2) / segCount;
  const ticks = sessionPositions(weeks, sessions);
  const ratio = activeWeek === undefined ? 1 : Math.min(1, Math.max(0, activeWeek / weeks));
  const markerX = 1 + ratio * (width - 2);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="block h-auto w-full"
      role="img"
      aria-label={`Glaze gauge over ${weeks} weeks: ${measure.label} moving from ${measure.before} out of 10 to ${measure.after} out of 10 across ${sessions} sessions`}
    >
      {/* Porcelain base tile */}
      <rect
        x="1"
        y="1"
        width={width - 2}
        height={height - 2}
        rx="2"
        fill="var(--bisque)"
        stroke="var(--primary-ink)"
        strokeWidth="1.25"
      />

      {/* Weekly glaze segments: crackle fades out left-to-right, celadon glaze deepens smoothly */}
      {Array.from({ length: segCount }, (_, i) => {
        const segX = 1 + i * segW;
        const progress = (i + 0.5) / segCount;
        // Left-to-right natural crackle-to-glaze fade; scrubbing further fades crackle left of the marker
        const leftOfMarker = activeWeek !== undefined && segX + segW * 0.5 <= markerX;
        const baseCrackleOpacity = Math.max(0, 0.96 - progress * 1.12);
        const crackleOpacity = leftOfMarker ? baseCrackleOpacity * 0.55 : baseCrackleOpacity;
        const celadonOpacity = Math.max(0, (progress - 0.14) * 0.92);

        return (
          <g key={i}>
            {/* Progressive celadon glaze fill (flat opacity steps, no gradient) */}
            {celadonOpacity > 0.04 ? (
              <rect
                x={segX}
                y="2"
                width={segW + 0.4}
                height={height - 4}
                fill="var(--celadon)"
                opacity={Number(celadonOpacity.toFixed(2))}
              />
            ) : null}

            {/* Segment divider hairline */}
            {i > 0 ? (
              <line
                x1={segX}
                y1="2"
                x2={segX}
                y2={height - 2}
                stroke="var(--rule)"
                strokeWidth="0.75"
                opacity="0.75"
              />
            ) : null}

            {/* Crackle polylines fading into smooth glaze */}
            {crackleOpacity > 0.03 ? (
              <path
                d={cracklePathsForSegment(segX, segW, i, height)}
                fill="none"
                stroke="var(--crackle-stroke)"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="glaze-crackle-layer"
                style={{ opacity: Number(crackleOpacity.toFixed(2)) }}
              />
            ) : null}
          </g>
        );
      })}

      {/* Glaze sheen horizontal crescent along smooth right section */}
      <path
        d={`M${(width * 0.54).toFixed(0)} ${compact ? 8 : 11} Q${(width * 0.77).toFixed(0)} ${compact ? 5 : 8} ${(width - 14).toFixed(0)} ${compact ? 9 : 12}`}
        fill="none"
        stroke="var(--sheen)"
        strokeWidth={compact ? 1.8 : 2.6}
        strokeLinecap="round"
        opacity="0.88"
      />

      {/* Cobalt session tick marks along upper & lower border */}
      {ticks.map((pos, idx) => {
        const tx = 1 + pos * (width - 2);
        return (
          <g key={idx}>
            <line
              x1={tx}
              y1="1"
              x2={tx}
              y2={compact ? 10 : 14}
              stroke="var(--primary-ink)"
              strokeWidth="1.6"
            />
            <circle
              cx={tx}
              cy={compact ? 12 : 16}
              r={compact ? 1.7 : 2.2}
              fill="var(--primary-ink)"
            />
          </g>
        );
      })}

      {/* Scrubbed cobalt indicator line when interactive */}
      {activeWeek !== undefined ? (
        <g>
          <line
            x1={markerX}
            y1="1"
            x2={markerX}
            y2={height - 1}
            stroke="var(--primary-ink)"
            strokeWidth="2.4"
          />
          <polygon
            points={`${markerX - 5},1 ${markerX + 5},1 ${markerX},8`}
            fill="var(--primary-ink)"
          />
          <polygon
            points={`${markerX - 5},${height - 1} ${markerX + 5},${height - 1} ${markerX},${height - 8}`}
            fill="var(--primary-ink)"
          />
        </g>
      ) : null}
    </svg>
  );
}

/**
 * Static display Glaze Gauge (used on Home).
 */
export function GlazeGauge({
  weeks,
  sessions,
  measure,
  className = '',
}: {
  weeks: number;
  sessions: number;
  measure: CaseMeasure;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
        <span className="specimen-label">
          WK 0 · {measure.label.toUpperCase()} {measure.before}/10
        </span>
        <span className="specimen-label-muted">
          {sessions} SESSIONS OVER {weeks} WEEKS
        </span>
        <span className="specimen-label text-celadon-ink">
          WK {weeks} · {measure.label.toUpperCase()} {measure.after}/10
        </span>
      </div>
      <GlazeGaugeTile weeks={weeks} sessions={sessions} measure={measure} />
    </div>
  );
}

/**
 * Interactive Glaze Gauge scrubber for Results case tiles.
 * Progressive enhancement: without JavaScript, renders the static full crackle-to-glaze
 * strip with start and end labels and NO range input.
 */
export function GlazeGaugeScrubber({
  weeks,
  sessions,
  measure,
}: {
  weeks: number;
  sessions: number;
  measure: CaseMeasure;
}) {
  const [mounted, setMounted] = useState(false);
  const [week, setWeek] = useState(weeks);
  const inputId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  const progress = weeks > 0 ? week / weeks : 1;
  const currentScore = Number(
    (measure.before + (measure.after - measure.before) * progress).toFixed(1),
  );
  const displayScore = Number.isInteger(currentScore)
    ? `${currentScore}/10`
    : `${currentScore.toFixed(1)}/10`;

  return (
    <div>
      <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
        <span className="specimen-label">
          WK 0 · {measure.before}/10
        </span>
        {mounted ? (
          <span className="specimen-label text-ink" aria-live="polite">
            WK {week} · {measure.label.toUpperCase()} {displayScore}
          </span>
        ) : (
          <span className="specimen-label-muted">
            {measure.label.toUpperCase()} · {measure.before}/10 → {measure.after}/10
          </span>
        )}
        <span className="specimen-label text-celadon-ink">
          WK {weeks} · {measure.after}/10
        </span>
      </div>

      <GlazeGaugeTile
        weeks={weeks}
        sessions={sessions}
        measure={measure}
        activeWeek={mounted ? week : undefined}
      />

      {mounted ? (
        <div className="mt-3 flex items-center gap-3 print-hide">
          <label htmlFor={inputId} className="specimen-label-muted shrink-0">
            Week
          </label>
          <input
            id={inputId}
            type="range"
            min={0}
            max={weeks}
            step={1}
            value={week}
            onChange={(event) => setWeek(Number(event.target.value))}
            aria-label="Week"
            aria-valuetext={`Week ${week} of ${weeks}, ${measure.label} ${displayScore}`}
            className="glaze-scrubber"
            style={{ '--progress': `${Math.round(progress * 100)}%` } as React.CSSProperties}
          />
          <span className="specimen-label shrink-0 tabular-nums">
            {String(week).padStart(2, '0')}/{String(weeks).padStart(2, '0')}
          </span>
        </div>
      ) : null}
    </div>
  );
}

/**
 * Slim crackle-to-glaze divider strip set along the top edge of the footer.
 */
export function GlazeGaugeDivider({ className = '' }: { className?: string }) {
  const width = 1200;
  const height = 18;
  const segCount = 24;
  const segW = width / segCount;

  return (
    <div className={`w-full overflow-hidden border-t border-primary-ink/60 bg-bisque ${className}`} aria-hidden="true">
      <svg viewBox={`0 0 ${width} ${height}`} className="block h-[14px] w-full" preserveAspectRatio="none">
        {Array.from({ length: segCount }, (_, i) => {
          const x = i * segW;
          const p = (i + 0.5) / segCount;
          const crackleOp = Math.max(0, 0.9 - p * 1.25);
          const celadonOp = Math.max(0, (p - 0.18) * 0.9);
          return (
            <g key={i}>
              {celadonOp > 0.04 ? (
                <rect
                  x={x}
                  y="0"
                  width={segW + 0.5}
                  height={height}
                  fill="var(--celadon)"
                  opacity={Number(celadonOp.toFixed(2))}
                />
              ) : null}
              {i > 0 ? (
                <line x1={x} y1="0" x2={x} y2={height} stroke="var(--rule)" strokeWidth="0.7" />
              ) : null}
              {crackleOp > 0.04 ? (
                <path
                  d={`M${(x + 8).toFixed(0)} 2 L${(x + segW * 0.5).toFixed(0)} 10 L${(x + segW - 6).toFixed(0)} 16`}
                  fill="none"
                  stroke="var(--crackle-stroke)"
                  strokeWidth="1.15"
                  opacity={Number(crackleOp.toFixed(2))}
                />
              ) : null}
            </g>
          );
        })}
        {[0.18, 0.36, 0.54, 0.72, 0.88].map((tick, idx) => (
          <line
            key={idx}
            x1={width * tick}
            y1="0"
            x2={width * tick}
            y2="9"
            stroke="var(--primary-ink)"
            strokeWidth="1.6"
          />
        ))}
      </svg>
    </div>
  );
}
