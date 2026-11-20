import type { ReactNode } from 'react';

/**
 * Themed PageHead for inner routes:
 * Left-aligned Gilda Display title over a blush porcelain band, a Geist Mono kicker label,
 * and matching vessel or tile art set into the right edge, crossing the band's lower border.
 */
export function PageHead({
  eyebrow,
  title,
  children,
  id,
  art,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  id?: string;
  /** Optional vessel or tile artwork anchored to the right edge, crossing the lower border. */
  art?: ReactNode;
}) {
  return (
    <section className="relative border-b border-primary-ink/55 bg-blush">
      <div className="wrap relative grid items-end gap-8 pt-10 pb-10 sm:pt-14 sm:pb-12 md:grid-cols-12">
        <div className="md:col-span-8 lg:col-span-9">
          <p className="specimen-label">{eyebrow}</p>
          <h1
            id={id}
            className="mt-3 max-w-[18ch] font-display text-[clamp(2.35rem,5.4vw,4.15rem)] leading-[1.06] text-ink"
          >
            {title}
          </h1>
          {children ? (
            <div className="mt-4 max-w-(--measure) text-[1.02rem] leading-relaxed text-muted">
              {children}
            </div>
          ) : null}
        </div>

        {art ? (
          <div className="print-hide flex justify-start md:col-span-4 md:justify-end lg:col-span-3">
            {/* Set cleanly into the right edge so the vessel overlaps the band's lower cobalt rule */}
            <div className="relative -mb-14 w-28 sm:w-32 md:-mb-16 md:w-36">{art}</div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
