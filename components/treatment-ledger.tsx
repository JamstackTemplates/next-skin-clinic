'use client';

import { useEffect, useState } from 'react';
import { concernById, type Concern, type ConcernId } from '../content/concerns';
import {
  clinicianLeadLabel,
  type Treatment,
  type TreatmentCategoryMeta,
} from '../content/treatments';
import { ConcernGlyph } from './art/concern-glyph';
import { TreatmentVessel } from './art/treatment-vessel';
import { UnderglazeBorder } from './art/underglaze-border';

function readConcernFromLocation(validConcerns: readonly Concern[]): ConcernId | null {
  if (typeof window === 'undefined') return null;
  const raw = new URLSearchParams(window.location.search).get('concern');
  if (!raw) return null;
  return validConcerns.some((c) => c.id === raw) ? (raw as ConcernId) : null;
}

function writeConcernToLocation(concern: ConcernId | null): void {
  if (typeof window === 'undefined') return;
  const url = new URL(window.location.href);
  if (concern) {
    url.searchParams.set('concern', concern);
  } else {
    url.searchParams.delete('concern');
  }
  window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
}

export function TreatmentLedger({
  categories,
  treatments,
  concerns,
  pricingNote,
  suitabilityHeading,
  suitabilityBody,
}: {
  categories: readonly TreatmentCategoryMeta[];
  treatments: readonly Treatment[];
  concerns: readonly Concern[];
  pricingNote: string;
  suitabilityHeading: string;
  suitabilityBody: string;
}) {
  const [hydrated, setHydrated] = useState(false);
  const [selectedConcern, setSelectedConcern] = useState<ConcernId | null>(null);

  useEffect(() => {
    setHydrated(true);
    setSelectedConcern(readConcernFromLocation(concerns));

    const onPopState = () => {
      setSelectedConcern(readConcernFromLocation(concerns));
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [concerns]);

  function selectConcern(next: ConcernId | null) {
    const resolved = next === selectedConcern ? null : next;
    setSelectedConcern(resolved);
    writeConcernToLocation(resolved);
  }

  const visibleTreatments = selectedConcern
    ? treatments.filter((t) => t.concerns.includes(selectedConcern))
    : treatments;

  const activeConcern = selectedConcern ? concernById(selectedConcern) : undefined;
  const liveMessage = activeConcern
    ? `Showing ${visibleTreatments.length} ${visibleTreatments.length === 1 ? 'treatment' : 'treatments'} for ${activeConcern.name.toLowerCase()}.`
    : `Showing all ${visibleTreatments.length} treatments across ${categories.length} categories.`;

  return (
    <div className="wrap pt-12 pb-8 sm:pt-16">
      {/* Concern filter: progressive enhancement — hidden when JS is absent so static HTML stays clean */}
      {hydrated ? (
        <div className="print-hide mb-12 border-b border-rule pb-8">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <p className="specimen-label">Filter by skin concern</p>
            <p className="specimen-label-muted" role="status" aria-live="polite">
              {liveMessage}
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2.5" role="group" aria-label="Filter treatments by concern">
            <button
              type="button"
              className="glaze-chip"
              aria-pressed={selectedConcern === null}
              onClick={() => selectConcern(null)}
            >
              All concerns ({treatments.length})
            </button>
            {concerns.map((concern) => {
              const count = treatments.filter((t) => t.concerns.includes(concern.id)).length;
              const active = selectedConcern === concern.id;
              return (
                <button
                  key={concern.id}
                  type="button"
                  className="glaze-chip"
                  aria-pressed={active}
                  onClick={() => selectConcern(concern.id)}
                >
                  <span
                    className={`inline-block h-2 w-2 rounded-full ${
                      active ? 'bg-on-primary' : 'bg-celadon-ink'
                    }`}
                    aria-hidden="true"
                  />
                  {concern.name} ({count})
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      {/* Main layout: dispensary shelves + narrow bordered suitability side panel */}
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="space-y-16 lg:col-span-9">
          {categories.map((category) => {
            const rows = visibleTreatments.filter((t) => t.category === category.id);
            if (!rows.length) return null;

            return (
              <section key={category.id} aria-labelledby={`category-${category.id}`}>
                <UnderglazeBorder label={category.code} className="mb-8" />

                <div className="grid gap-8 md:grid-cols-12">
                  {/* Left margin: category apothecary vessel standing on the dispensary shelf */}
                  <div className="md:col-span-3">
                    <div className="flex items-center gap-4 md:block">
                      <TreatmentVessel
                        category={category.id}
                        className="print-hide h-24 w-24 md:h-28 md:w-28"
                      />
                      <div className="md:mt-4">
                        <h2
                          id={`category-${category.id}`}
                          className="font-display text-[1.85rem] leading-tight text-ink"
                        >
                          {category.label}
                        </h2>
                        <p className="mt-2 text-[0.88rem] leading-relaxed text-muted">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right: dispensary price ledger rows with dotted leaders */}
                  <div className="md:col-span-9">
                    <ul className="divide-y divide-rule border-t border-b border-primary-ink/50">
                      {rows.map((treatment) => (
                        <li
                          key={treatment.id}
                          id={treatment.id}
                          className="ledger-row scroll-mt-24 py-6"
                        >
                          {/* Top ledger line: treatment name + dotted leader + price */}
                          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                            <h3 className="font-display text-[1.45rem] leading-snug text-ink sm:text-[1.6rem]">
                              {treatment.name}
                            </h3>

                            {treatment.patchTest ? (
                              <span className="rounded-ui border border-celadon-ink/50 bg-celadon-soft px-2 py-0.5 font-mono text-[0.66rem] font-medium tracking-[0.1em] text-celadon-ink uppercase">
                                Patch test
                              </span>
                            ) : null}

                            <span
                              aria-hidden="true"
                              className="hidden min-w-[2.5rem] flex-1 border-b border-dotted border-primary-ink/45 sm:inline-block"
                            />

                            <span className="ml-auto font-mono text-[1rem] font-medium text-primary-ink tabular-nums sm:ml-0">
                              from £{treatment.priceFrom}
                            </span>
                          </div>

                          {/* Course price note right-aligned beneath */}
                          {treatment.coursePrice !== undefined ? (
                            <p className="mt-1 font-mono text-[0.76rem] text-muted sm:text-right">
                              Course of {treatment.sessions}: £{treatment.coursePrice}
                            </p>
                          ) : null}

                          {/* One-sentence plain explanation */}
                          <p className="mt-2.5 max-w-2xl text-[0.94rem] text-ink/90">
                            {treatment.summary}
                          </p>

                          {/* Mono clinical specification line */}
                          <p className="mt-3 font-mono text-[0.72rem] tracking-[0.09em] text-muted uppercase">
                            {treatment.minutes} MIN · {treatment.sessions}{' '}
                            {treatment.sessions === 1 ? 'SESSION' : 'SESSIONS'} · DOWNTIME:{' '}
                            {treatment.downtime.toUpperCase()} ·{' '}
                            {clinicianLeadLabel(treatment.ledBy).toUpperCase()}
                          </p>

                          {/* Printed concern list (always visible, including without JS) */}
                          <p className="mt-2 text-[0.82rem] text-muted">
                            <span className="font-mono text-[0.68rem] tracking-[0.1em] text-primary-ink uppercase">
                              Helps with:{' '}
                            </span>
                            {treatment.concerns
                              .map((cid) => concernById(cid)?.name ?? cid)
                              .join(', ')}
                          </p>

                          {/* Cobalt stamp when waitlist or paused */}
                          {treatment.availability !== 'available' ? (
                            <div className="mt-3.5 inline-flex flex-wrap items-center gap-2.5 border border-primary-ink/70 bg-blush/70 px-3 py-1.5">
                              <span className="font-mono text-[0.7rem] font-semibold tracking-[0.14em] text-primary-ink uppercase">
                                {treatment.availability === 'waitlist' ? 'Waitlist' : 'Seasonal pause'}
                              </span>
                              <span className="text-[0.84rem] text-ink">
                                {treatment.availabilityNote}
                              </span>
                            </div>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            );
          })}

          {/* Pricing note directly beneath the ledger */}
          <p className="border-l-2 border-primary-ink pl-4 text-[0.9rem] text-muted">
            {pricingNote}
          </p>
        </div>

        {/* Narrow bordered suitability & patch-test side panel */}
        <aside
          aria-label="Patch tests and suitability"
          className="lg:col-span-3"
        >
          <div className="sticky top-8 border border-primary-ink/60 bg-bisque p-6">
            <p className="specimen-label border-b border-rule pb-2">CLINICAL NOTE</p>
            <h2 className="mt-4 font-display text-[1.45rem] leading-snug text-ink">
              {suitabilityHeading}
            </h2>
            <p className="mt-3 text-[0.9rem] leading-relaxed text-muted">
              {suitabilityBody}
            </p>

            <div className="mt-6 border-t border-rule pt-4">
              <p className="specimen-label-muted mb-3">CONCERNS WE ASSESS</p>
              <ul className="space-y-2.5">
                {concerns.map((concern) => (
                  <li key={concern.id} className="flex items-center gap-2.5 text-[0.85rem] text-ink">
                    <ConcernGlyph concern={concern.id} className="h-7 w-7" />
                    <span>{concern.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
