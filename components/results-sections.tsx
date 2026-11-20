import type { ReactNode } from 'react';
import { concernById } from '../content/concerns';
import { caseNotes } from '../content/results';
import { treatmentById } from '../content/treatments';
import { ConcernGlyph } from './art/concern-glyph';
import { GlazeGaugeScrubber } from './glaze-gauge';
import { SiteLink } from './site-link';

/* ── How we record results: three columns separated by vertical cobalt underglaze rules ── */

function RecordingRoot({ children }: { children: ReactNode }) {
  return (
    <section aria-labelledby="recording-heading" className="wrap pt-14 pb-10 sm:pt-18">
      <div className="grid gap-8 md:grid-cols-12">{children}</div>
    </section>
  );
}

function RecordingIntro({ children }: { children: ReactNode }) {
  return (
    <div className="md:col-span-3">
      <p className="specimen-label">CLINICAL METHOD</p>
      <h2 id="recording-heading" className="mt-2 font-display text-[1.9rem] leading-tight text-ink">
        {children}
      </h2>
    </div>
  );
}

function RecordingColumns({ children }: { children: ReactNode }) {
  return (
    <div className="grid gap-8 md:col-span-9 md:grid-cols-3 md:gap-0 md:divide-x md:divide-primary-ink/45">
      {children}
    </div>
  );
}

function RecordingColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="md:px-6 md:first:pl-0 md:last:pr-0">
      <h3 className="font-display text-[1.32rem] text-ink">{title}</h3>
      <p className="mt-2 text-[0.9rem] leading-relaxed text-muted">{children}</p>
    </div>
  );
}

export const RecordingMethod = Object.assign(RecordingRoot, {
  Intro: RecordingIntro,
  Columns: RecordingColumns,
  Column: RecordingColumn,
});

/* ── Required clinical disclaimer directly above the case tiles ── */

export function ResultsDisclaimer({ children }: { children: ReactNode }) {
  return (
    <div className="wrap my-6">
      <p className="border-y border-primary-ink/45 bg-bisque px-5 py-4 font-mono text-[0.78rem] leading-relaxed text-ink">
        {children}
      </p>
    </div>
  );
}

/* ── Wide kiln test tiles alternating left/right offset with oversized CASE numerals ── */

export function CaseTileList() {
  return (
    <section aria-label="Anonymised case notes" className="wrap space-y-12 py-10 sm:space-y-16">
      {caseNotes.map((entry, idx) => {
        const number = String(idx + 1).padStart(2, '0');
        const offsetRight = idx % 2 === 1;
        const concern = concernById(entry.concern);

        return (
          <article
            key={entry.id}
            id={entry.id}
            className="grid items-start gap-6 lg:grid-cols-12"
          >
            {/* Margin oversized CASE numeral */}
            <div
              className={`flex items-baseline gap-3 lg:col-span-2 lg:flex-col ${
                offsetRight ? 'lg:order-2 lg:items-end lg:text-right' : 'lg:order-1'
              }`}
            >
              <span className="specimen-label">CASE</span>
              <span className="font-display text-[clamp(2.8rem,5vw,4.2rem)] leading-none text-primary-ink">
                {number}
              </span>
              <span className="specimen-label-muted">
                AGE {entry.ageBand} · TYPE {entry.skinType}
              </span>
            </div>

            {/* Wide kiln test tile */}
            <div
              className={`border border-primary-ink/60 bg-bisque p-6 sm:p-8 lg:col-span-10 ${
                offsetRight ? 'lg:order-1' : 'lg:order-2'
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-rule pb-5">
                <div className="flex items-start gap-4">
                  <ConcernGlyph concern={entry.concern} className="h-12 w-12" />
                  <div>
                    <p className="specimen-label-muted">
                      {concern ? concern.name.toUpperCase() : entry.concern.toUpperCase()} ·{' '}
                      {entry.weeks} WEEKS · {entry.sessions} SESSIONS
                    </p>
                    <h2 className="mt-1 font-display text-[clamp(1.55rem,3vw,2.2rem)] leading-snug text-ink">
                      {entry.title}
                    </h2>
                  </div>
                </div>
                <p className="font-mono text-[0.76rem] text-primary-ink">
                  {entry.measure.label.toUpperCase()}: {entry.measure.before}/10 →{' '}
                  {entry.measure.after}/10
                </p>
              </div>

              {/* Interactive Glaze Gauge scrubber */}
              <div className="mt-6">
                <GlazeGaugeScrubber
                  weeks={entry.weeks}
                  sessions={entry.sessions}
                  measure={entry.measure}
                />
                <p className="mt-2 font-mono text-[0.7rem] tracking-[0.06em] text-muted uppercase">
                  Scale: {entry.measure.scale}
                </p>
              </div>

              {/* Narrative summary, treatments and honest clinician reflection */}
              <div className="mt-6 grid gap-6 border-t border-rule pt-6 md:grid-cols-12">
                <div className="md:col-span-7">
                  <p className="text-[0.95rem] leading-relaxed text-ink/95">{entry.summary}</p>
                  <p className="mt-3 text-[0.92rem] italic text-muted">
                    Clinician note: “{entry.clinicianNote}”
                  </p>
                </div>

                <div className="md:col-span-5 md:border-l md:border-rule md:pl-6">
                  <p className="specimen-label-muted">TREATMENTS USED</p>
                  <ul className="mt-2.5 space-y-2">
                    {entry.treatmentIds.map((tid) => {
                      const t = treatmentById(tid);
                      return (
                        <li key={tid}>
                          <SiteLink
                            href={`/treatments/#${tid}`}
                            className="text-link text-[0.92rem]"
                          >
                            {t ? t.name : tid}
                          </SiteLink>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}

/* ── Blush band: "What results can't tell you" ── */

function LimitsRoot({ children }: { children: ReactNode }) {
  return (
    <section aria-labelledby="limits-heading" className="mt-10 border-y border-rule bg-blush py-14">
      <div className="wrap grid gap-6 md:grid-cols-12 md:items-baseline">{children}</div>
    </section>
  );
}

function LimitsHeading({ children }: { children: ReactNode }) {
  return (
    <h2
      id="limits-heading"
      className="font-display text-[clamp(1.75rem,3.2vw,2.45rem)] text-ink md:col-span-4"
    >
      {children}
    </h2>
  );
}

function LimitsBody({ children }: { children: ReactNode }) {
  return <p className="text-[0.98rem] leading-relaxed text-muted md:col-span-8">{children}</p>;
}

export const ResultsLimits = Object.assign(LimitsRoot, {
  Heading: LimitsHeading,
  Body: LimitsBody,
});
