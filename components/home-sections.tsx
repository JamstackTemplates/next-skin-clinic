import type { ReactNode } from 'react';
import { business } from '../content/business';
import { concerns } from '../content/concerns';
import { caseById, featuredCaseId } from '../content/results';
import {
  featuredTreatmentIds,
  treatmentById,
  treatmentsForConcern,
} from '../content/treatments';
import { ClinicianRoundel } from './art/clinician-roundel';
import { ConcernGlyph } from './art/concern-glyph';
import { PorcelainShelfArt } from './art/porcelain-shelf';
import { TreatmentVessel } from './art/treatment-vessel';
import { RecordCard, UnderglazeBorder } from './art/underglaze-border';
import { GlazeGauge } from './glaze-gauge';
import { HoursTable } from './hours-table';
import { OpenBadge } from './open-badge';
import { SiteLink } from './site-link';

/* ── 1. Hero (split asymmetric on desktop; cropped shelf above heading on 390px) ── */

function HeroRoot({ children }: { children: ReactNode }) {
  return (
    <section className="relative overflow-x-clip border-b border-primary-ink/45 bg-craquelure">
      <div className="wrap py-5 sm:py-10 lg:py-14">
        <div className="grid items-center gap-5 lg:grid-cols-12 lg:gap-0">
          {/* Mobile cropped shelf (tall jar + celadon dish, ~245px) shown above heading at 390px */}
          <div className="print-hide mx-auto w-full max-w-[19rem] lg:hidden">
            <PorcelainShelfArt cropped className="max-h-[245px] w-full object-contain" />
          </div>

          {/* Left columns 1–6: copy, actions and live open-now status */}
          <div className="relative z-20 lg:col-start-1 lg:col-end-7 lg:row-start-1 lg:pr-8">
            <p className="specimen-label mb-3">MARYLEBONE, LONDON · CLINICIAN-LED</p>
            {children}
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-rule pt-4 font-mono text-[0.74rem] tracking-[0.04em] text-muted sm:mt-7">
              <span className="inline-flex items-center gap-2 text-primary-ink">
                <span className="inline-block h-2 w-2 rounded-full bg-celadon-ink" aria-hidden="true" />
                <OpenBadge hours={business.hours} />
              </span>
              <span aria-hidden="true">·</span>
              <span>{business.address.streetAddress}, W1U 2AP</span>
            </div>
          </div>

          {/* Right columns 6–12: full porcelain shelf layered so the tall jar overlaps the heading block edge */}
          <div className="print-hide relative z-10 hidden lg:col-start-6 lg:col-end-13 lg:row-start-1 lg:-ml-10 lg:block">
            <PorcelainShelfArt />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroHeading({ children }: { children: ReactNode }) {
  return (
    <h1 className="max-w-[14ch] font-display text-[clamp(2.35rem,4.9vw,4.25rem)] leading-[1.04] text-ink">
      {children}
    </h1>
  );
}

function HeroIntroduction({ children }: { children: ReactNode }) {
  return (
    <p className="mt-4 max-w-[34rem] text-[1rem] leading-relaxed text-muted sm:mt-5 sm:text-[1.06rem]">
      {children}
    </p>
  );
}

function HeroActions({ children }: { children: ReactNode }) {
  return <div className="mt-6 flex flex-wrap items-center gap-5 sm:mt-7">{children}</div>;
}

function HeroPrimaryAction({ children }: { children: ReactNode }) {
  return (
    <SiteLink href="/contact/" className="button">
      {children}
    </SiteLink>
  );
}

function HeroSecondaryAction({ children }: { children: ReactNode }) {
  return (
    <SiteLink href="/treatments/" className="text-link text-[0.94rem] font-medium">
      {children}
    </SiteLink>
  );
}

export const Hero = Object.assign(HeroRoot, {
  Heading: HeroHeading,
  Introduction: HeroIntroduction,
  Actions: HeroActions,
  PrimaryAction: HeroPrimaryAction,
  SecondaryAction: HeroSecondaryAction,
});

/* ── 2. Concerns kiln shelf row (blush band, snap-scrolling on mobile) ── */

function ConcernsRoot({ children }: { children: ReactNode }) {
  return (
    <section aria-labelledby="home-concerns-heading" className="border-b border-rule bg-blush py-16 sm:py-20">
      <div className="wrap">
        <UnderglazeBorder label="01 · CONCERNS" className="mb-10" />
        <div className="mb-10 grid gap-4 md:grid-cols-12 md:items-end">{children}</div>

        {/* Horizontal row of six glazed test tiles; snaps horizontally at 390px */}
        <ol className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 lg:grid lg:grid-cols-6 lg:overflow-visible lg:pb-0">
          {concerns.map((concern, index) => {
            const matching = treatmentsForConcern(concern.id, true)
              .filter((t) => t.id !== 'skin-consultation')
              .slice(0, 3);
            const fallback = matching.length
              ? matching
              : treatmentsForConcern(concern.id, false).slice(0, 2);

            return (
              <li
                key={concern.id}
                className="w-[15.25rem] shrink-0 snap-start lg:w-auto"
              >
                <SiteLink
                  href={`/treatments/?concern=${concern.id}`}
                  className="group flex h-full flex-col justify-between border border-primary-ink/45 bg-bisque p-4 no-underline transition-colors hover:border-primary-ink hover:no-underline"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <ConcernGlyph concern={concern.id} className="h-11 w-11" />
                      <span className="specimen-label-muted">
                        T·0{index + 1}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-[1.32rem] leading-snug text-ink group-hover:text-primary-ink">
                      {concern.name}
                    </h3>
                    <p className="mt-1.5 text-[0.82rem] leading-relaxed text-muted">
                      {concern.description}
                    </p>
                  </div>

                  <div className="mt-4 border-t border-rule pt-3">
                    <p className="font-mono text-[0.64rem] tracking-[0.11em] text-primary-ink uppercase">
                      Addressed by
                    </p>
                    <p className="mt-1 text-[0.78rem] leading-snug text-ink/90">
                      {fallback.map((t) => t.name).join(' · ')}
                    </p>
                  </div>
                </SiteLink>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function ConcernsHeading({ children }: { children: ReactNode }) {
  return (
    <h2
      id="home-concerns-heading"
      className="font-display text-[clamp(2rem,4vw,3rem)] text-ink md:col-span-5"
    >
      {children}
    </h2>
  );
}

function ConcernsIntro({ children }: { children: ReactNode }) {
  return <p className="text-[0.96rem] text-muted md:col-span-7 md:max-w-xl">{children}</p>;
}

export const ConcernsShelf = Object.assign(ConcernsRoot, {
  Heading: ConcernsHeading,
  Intro: ConcernsIntro,
});

/* ── 3. From crackle to glaze (full-bleed craquelure band + signature GlazeGauge) ── */

function GlazeFeatureRoot({ children }: { children: ReactNode }) {
  const featured = caseById(featuredCaseId)!;

  return (
    <section
      aria-labelledby="home-glaze-heading"
      className="border-b border-rule bg-craquelure py-18 sm:py-22"
    >
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="specimen-label">02 · FROM CRACKLE TO GLAZE</p>
            <p
              aria-hidden="true"
              className="mt-2 font-display text-[clamp(2.8rem,7vw,5.4rem)] leading-[0.96] tracking-[-0.03em] text-primary-ink"
            >
              WK 0 → WK {featured.weeks}
            </p>
            {children}
          </div>

          <div className="border-l border-primary-ink/50 pl-5 lg:col-span-4">
            <p className="specimen-label-muted">
              CASE 01 · AGE {featured.ageBand.toUpperCase()} · FITZPATRICK {featured.skinType}
            </p>
            <h3 className="mt-2 font-display text-[1.48rem] leading-snug text-ink">
              {featured.title}
            </h3>
            <p className="mt-2.5 text-[0.9rem] leading-relaxed text-muted">{featured.summary}</p>
            <p className="mt-3 text-[0.86rem] italic text-ink/85">“{featured.clinicianNote}”</p>
            <SiteLink href="/results/" className="text-link mt-4 inline-block text-[0.9rem] font-medium">
              Read all five case notes →
            </SiteLink>
          </div>
        </div>

        <div className="mt-10 border border-primary-ink/40 bg-bisque p-5 sm:p-7">
          <GlazeGauge
            weeks={featured.weeks}
            sessions={featured.sessions}
            measure={featured.measure}
          />
          <p className="mt-3 font-mono text-[0.7rem] tracking-[0.06em] text-muted">
            {featured.measure.scale.toUpperCase()} · ILLUSTRATED CASE SUMMARY · INDIVIDUAL RESULTS VARY
          </p>
        </div>
      </div>
    </section>
  );
}

function GlazeFeatureHeading({ children }: { children: ReactNode }) {
  return (
    <h2 id="home-glaze-heading" className="mt-4 font-display text-[clamp(1.75rem,3vw,2.35rem)] text-ink">
      {children}
    </h2>
  );
}

function GlazeFeatureIntro({ children }: { children: ReactNode }) {
  return <p className="mt-3 max-w-2xl text-[0.96rem] text-muted">{children}</p>;
}

export const GlazeFeature = Object.assign(GlazeFeatureRoot, {
  Heading: GlazeFeatureHeading,
  Intro: GlazeFeatureIntro,
});

/* ── 4. How a first visit works (record card frame + Dr Hale quote) ── */

function FirstVisitRoot({ children }: { children: ReactNode }) {
  const drHale = business.clinicians[0];

  return (
    <section aria-labelledby="home-visit-steps-heading" className="border-b border-rule bg-blush py-16 sm:py-20">
      <div className="wrap">
        <UnderglazeBorder label="03 · FIRST VISIT" className="mb-10" />
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-8">
            <RecordCard kicker="PATIENT RECORD · FIRST APPOINTMENT">
              {children}
            </RecordCard>
          </div>

          <aside aria-label="Clinician note" className="lg:col-span-4 lg:pt-6">
            <div className="border-t border-b border-primary-ink/50 py-7">
              <div className="flex items-center gap-4">
                <ClinicianRoundel monogram={drHale.monogram} className="h-16 w-16" />
                <div>
                  <p className="font-display text-[1.28rem] text-ink">{drHale.name}</p>
                  <p className="font-mono text-[0.68rem] tracking-[0.1em] text-muted uppercase">
                    Medical director
                  </p>
                </div>
              </div>
              <blockquote className="mt-5 font-display text-[1.32rem] leading-snug text-ink">
                “Good skin care is rarely urgent. Taking forty-five minutes to listen, look under
                daylight and write a clear plan prevents months of trial and error.”
              </blockquote>
              <SiteLink href="/consultation/" className="text-link mt-5 inline-block text-[0.9rem] font-medium">
                See the full five-step consultation →
              </SiteLink>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function FirstVisitHeading({ children }: { children: ReactNode }) {
  return (
    <h2 id="home-visit-steps-heading" className="font-display text-[clamp(1.9rem,3.6vw,2.75rem)] text-ink">
      {children}
    </h2>
  );
}

function FirstVisitSteps({ children }: { children: ReactNode }) {
  return <ol className="mt-6 divide-y divide-rule">{children}</ol>;
}

function FirstVisitStep({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <li className="grid grid-cols-[3.5rem_1fr] items-baseline gap-4 py-4">
      <span className="font-display text-[2.1rem] leading-none text-primary-ink">{number}</span>
      <div>
        <h3 className="font-display text-[1.35rem] text-ink">{title}</h3>
        <p className="mt-1 text-[0.92rem] text-muted">{children}</p>
      </div>
    </li>
  );
}

export const FirstVisit = Object.assign(FirstVisitRoot, {
  Heading: FirstVisitHeading,
  Steps: FirstVisitSteps,
  Step: FirstVisitStep,
});

/* ── 5. Featured treatments: four apothecary jars standing on a dispensary shelf rule ── */

function FeaturedJarsRoot({ children }: { children: ReactNode }) {
  const featured = featuredTreatmentIds
    .map((id) => treatmentById(id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <section aria-labelledby="home-featured-heading" className="bg-porcelain py-16 sm:py-20">
      <div className="wrap">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">{children}</div>

        {/* Four apothecary jars standing directly on a double cobalt shelf rule */}
        <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 border-b-2 border-primary-ink pb-2 lg:grid-cols-4">
          {featured.map((treatment, idx) => (
            <li key={treatment.id} className="jar-shelf-item flex flex-col items-center text-center">
              <SiteLink
                href={`/treatments/#${treatment.id}`}
                className="group flex w-full flex-col items-center no-underline hover:no-underline"
              >
                <TreatmentVessel
                  category={treatment.category}
                  label={`0${idx + 1}`}
                  className="h-28 w-28 sm:h-32 sm:w-32"
                />
                {/* Cobalt dispensary jar label */}
                <div className="mt-4 w-full border border-primary-ink/60 bg-bisque px-3.5 py-3.5 transition-colors group-hover:border-primary-ink">
                  <p className="font-mono text-[0.68rem] tracking-[0.12em] text-primary-ink uppercase">
                    {treatment.minutes} MIN · FROM £{treatment.priceFrom}
                  </p>
                  <h3 className="mt-1.5 font-display text-[1.28rem] leading-snug text-ink group-hover:text-primary-ink">
                    {treatment.name}
                  </h3>
                </div>
              </SiteLink>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="font-mono text-[0.74rem] tracking-[0.06em] text-muted">
            ALL TEN TREATMENTS LISTED WITH SESSION LENGTHS, DOWNTIME AND GBP PRICES
          </p>
          <SiteLink href="/treatments/" className="text-link text-[0.94rem] font-medium">
            Open the full treatment ledger →
          </SiteLink>
        </div>
      </div>
    </section>
  );
}

function FeaturedJarsHeading({ children }: { children: ReactNode }) {
  return (
    <div className="md:col-span-6">
      <p className="specimen-label mb-2">04 · ON THE DISPENSARY SHELF</p>
      <h2 id="home-featured-heading" className="font-display text-[clamp(2rem,4vw,3rem)] text-ink">
        {children}
      </h2>
    </div>
  );
}

function FeaturedJarsIntro({ children }: { children: ReactNode }) {
  return <p className="text-[0.95rem] text-muted md:col-span-6">{children}</p>;
}

export const FeaturedJars = Object.assign(FeaturedJarsRoot, {
  Heading: FeaturedJarsHeading,
  Intro: FeaturedJarsIntro,
});

/* ── 6. Visit band (deep cobalt band: address, landmark, hours table & enquiry CTA) ── */

function VisitBandRoot({ children }: { children: ReactNode }) {
  return (
    <section
      aria-labelledby="home-visit-heading"
      className="border-t border-cobalt-rule bg-cobalt-band py-16 text-cobalt-ink sm:py-20"
    >
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-6">
          <p className="font-mono text-[0.72rem] tracking-[0.14em] text-cobalt-muted uppercase">
            05 · VISIT THE CLINIC
          </p>
          {children}
          <address className="mt-6 not-italic text-[1.02rem] leading-relaxed text-cobalt-ink">
            {business.address.formatted}
          </address>
          <p className="mt-2 text-[0.92rem] text-cobalt-muted">{business.landmark}</p>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-y border-cobalt-rule py-4 font-mono text-[0.86rem]">
            <a
              href={`tel:${business.phone.replace(/[^\d+]/g, '')}`}
              className="text-cobalt-ink no-underline hover:underline"
            >
              {business.phone}
            </a>
            <a
              href={`mailto:${business.email}`}
              className="wrap-anywhere text-cobalt-ink underline decoration-cobalt-muted/60 hover:decoration-cobalt-ink"
            >
              {business.email}
            </a>
          </div>

          <div className="mt-7">
            <SiteLink href="/contact/" className="button button-on-cobalt">
              Enquire about a consultation
            </SiteLink>
          </div>
        </div>

        <div className="border border-cobalt-rule bg-cobalt-band/50 p-6 sm:p-8 lg:col-span-6">
          <HoursTable hours={business.hours} tone="cobalt" />
        </div>
      </div>
    </section>
  );
}

function VisitBandHeading({ children }: { children: ReactNode }) {
  return (
    <h2
      id="home-visit-heading"
      className="mt-2 font-display text-[clamp(2rem,4vw,3rem)] text-cobalt-ink"
    >
      {children}
    </h2>
  );
}

export const VisitBand = Object.assign(VisitBandRoot, {
  Heading: VisitBandHeading,
});
