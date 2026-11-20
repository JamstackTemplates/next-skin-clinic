import type { ReactNode } from 'react';
import { business } from '../content/business';
import { ClinicianRoundel } from './art/clinician-roundel';
import { RecordCard, UnderglazeBorder } from './art/underglaze-border';

/* ── 5-step consultation record card styled like a clinical form ── */

function ProcessRoot({ children }: { children: ReactNode }) {
  return (
    <section aria-labelledby="process-heading" className="wrap pt-14 pb-12 sm:pt-18">
      <RecordCard kicker="PORCELAIN SKIN CLINIC · CONSULTATION RECORD FORM">
        {children}
      </RecordCard>
    </section>
  );
}

function ProcessHeading({ children }: { children: ReactNode }) {
  return (
    <h2 id="process-heading" className="font-display text-[clamp(1.85rem,3.4vw,2.6rem)] text-ink">
      {children}
    </h2>
  );
}

function ProcessSteps({ children }: { children: ReactNode }) {
  return <ol className="mt-7 divide-y divide-rule border-t border-rule">{children}</ol>;
}

function ProcessStep({
  field,
  title,
  children,
}: {
  field: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <li className="grid gap-3 py-5 sm:grid-cols-12 sm:items-baseline">
      <span className="specimen-label sm:col-span-3">FIELD {field}</span>
      <div className="sm:col-span-9">
        <h3 className="font-display text-[1.42rem] text-ink">{title}</h3>
        <p className="mt-1.5 text-[0.94rem] leading-relaxed text-muted">{children}</p>
      </div>
    </li>
  );
}

export const ProcessRecord = Object.assign(ProcessRoot, {
  Heading: ProcessHeading,
  Steps: ProcessSteps,
  Step: ProcessStep,
});

/* ── Split fee panel: oversized £60 on the left, inclusions on the right ── */

function FeeRoot({ children }: { children: ReactNode }) {
  return (
    <section aria-labelledby="fee-heading" className="border-y border-rule bg-blush py-14 sm:py-16">
      <div className="wrap grid items-center gap-8 md:grid-cols-12">{children}</div>
    </section>
  );
}

function FeeFigure({ amount, caption }: { amount: string; caption: string }) {
  return (
    <div className="border-b border-primary-ink/45 pb-6 md:col-span-4 md:border-r md:border-b-0 md:pr-8 md:pb-0">
      <p className="specimen-label">CONSULTATION FEE</p>
      <p className="mt-2 font-display text-[clamp(3.8rem,8vw,5.75rem)] leading-none text-primary-ink">
        {amount}
      </p>
      <p className="mt-3 font-mono text-[0.74rem] tracking-[0.06em] text-muted uppercase">
        {caption}
      </p>
    </div>
  );
}

function FeeDetails({ children }: { children: ReactNode }) {
  return <div className="md:col-span-8 md:pl-4">{children}</div>;
}

function FeeHeading({ children }: { children: ReactNode }) {
  return (
    <h2 id="fee-heading" className="font-display text-[clamp(1.7rem,3vw,2.3rem)] text-ink">
      {children}
    </h2>
  );
}

function FeeList({ children }: { children: ReactNode }) {
  return <ul className="mt-4 space-y-2.5 text-[0.95rem] text-muted">{children}</ul>;
}

export const FeePanel = Object.assign(FeeRoot, {
  Figure: FeeFigure,
  Details: FeeDetails,
  Heading: FeeHeading,
  List: FeeList,
});

/* ── Who you'll see: two porcelain roundel monograms side by side ── */

function CliniciansRoot({ children }: { children: ReactNode }) {
  return (
    <section aria-labelledby="clinicians-heading" className="wrap py-16">
      <UnderglazeBorder label="CLINICIANS" className="mb-10" />
      <div className="mb-8">{children}</div>
      <div className="grid gap-8 md:grid-cols-2">
        {business.clinicians.map((clinician) => (
          <article
            key={clinician.id}
            className="flex flex-col gap-5 border border-primary-ink/45 bg-bisque p-6 sm:flex-row sm:items-start sm:p-8"
          >
            <ClinicianRoundel monogram={clinician.monogram} className="h-20 w-20" />
            <div>
              <h3 className="font-display text-[1.6rem] text-ink">{clinician.name}</h3>
              <p className="mt-1 font-mono text-[0.72rem] tracking-[0.09em] text-primary-ink uppercase">
                {clinician.role}
              </p>
              <p className="mt-3 text-[0.92rem] leading-relaxed text-muted">{clinician.focus}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function CliniciansHeading({ children }: { children: ReactNode }) {
  return (
    <h2 id="clinicians-heading" className="font-display text-[clamp(1.9rem,3.6vw,2.75rem)] text-ink">
      {children}
    </h2>
  );
}

export const ClinicianPair = Object.assign(CliniciansRoot, {
  Heading: CliniciansHeading,
});

/* ── Before you come: preparation checklist with underglaze tick glyphs ── */

function PrepRoot({ children }: { children: ReactNode }) {
  return (
    <section aria-labelledby="prep-heading" className="border-y border-rule bg-craquelure py-16">
      <div className="wrap grid gap-8 md:grid-cols-12">{children}</div>
    </section>
  );
}

function PrepIntro({ children }: { children: ReactNode }) {
  return (
    <div className="md:col-span-4">
      <p className="specimen-label">PREPARATION</p>
      <h2 id="prep-heading" className="mt-2 font-display text-[clamp(1.85rem,3.4vw,2.55rem)] text-ink">
        {children}
      </h2>
    </div>
  );
}

function PrepList({ children }: { children: ReactNode }) {
  return <ul className="space-y-4 md:col-span-8">{children}</ul>;
}

function PrepItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-3.5 border-b border-rule pb-4 text-[0.96rem] text-ink">
      <svg
        viewBox="0 0 20 20"
        className="mt-0.5 h-5 w-5 shrink-0 text-primary-ink"
        aria-hidden="true"
      >
        <rect
          x="1.5"
          y="1.5"
          width="17"
          height="17"
          rx="2"
          fill="var(--bisque)"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M5.5 10.2 L8.6 13.2 L14.8 6.8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>{children}</span>
    </li>
  );
}

export const PreparationChecklist = Object.assign(PrepRoot, {
  Intro: PrepIntro,
  List: PrepList,
  Item: PrepItem,
});

/* ── Native <details> FAQ accordion (per modern-web-guidance: no headings inside <summary>) ── */

function FaqRoot({ children }: { children: ReactNode }) {
  return (
    <section aria-labelledby="faq-heading" className="clinic-faq wrap pt-16 pb-6">
      <div className="grid gap-8 md:grid-cols-12">{children}</div>
    </section>
  );
}

function FaqIntro({ children }: { children: ReactNode }) {
  return (
    <div className="md:col-span-4">
      <p className="specimen-label">COMMON QUESTIONS</p>
      <h2 id="faq-heading" className="mt-2 font-display text-[clamp(1.85rem,3.4vw,2.55rem)] text-ink">
        {children}
      </h2>
    </div>
  );
}

function FaqList({ children }: { children: ReactNode }) {
  return <div className="border-t border-rule md:col-span-8">{children}</div>;
}

function FaqItem({ question, children }: { question: string; children: ReactNode }) {
  return (
    <details>
      <summary>{question}</summary>
      <div className="pb-5 pl-10 text-[0.94rem] leading-relaxed text-muted">{children}</div>
    </details>
  );
}

export const FaqSection = Object.assign(FaqRoot, {
  Intro: FaqIntro,
  List: FaqList,
  Item: FaqItem,
});
