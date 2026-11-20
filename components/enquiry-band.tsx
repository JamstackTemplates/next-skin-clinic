import type { ReactNode } from 'react';
import { SiteLink } from './site-link';

function Band({
  children,
  label,
  tone = 'blush',
}: {
  children: ReactNode;
  label?: string;
  tone?: 'blush' | 'porcelain';
}) {
  const surface = tone === 'blush' ? 'bg-blush border-t border-rule' : 'bg-craquelure border-t border-rule';
  return (
    <section aria-label={label} className={`mt-14 py-14 sm:py-16 ${surface}`}>
      <div className="wrap">
        <div className="grid items-center gap-8 border border-primary-ink/60 bg-bisque p-7 sm:p-10 md:grid-cols-12">
          {children}
        </div>
      </div>
    </section>
  );
}

function Copy({ children }: { children: ReactNode }) {
  return <div className="md:col-span-8">{children}</div>;
}

function Kicker({ children }: { children: ReactNode }) {
  return <p className="specimen-label">{children}</p>;
}

function Heading({ children }: { children: ReactNode }) {
  return (
    <h2 className="mt-2 font-display text-[clamp(1.85rem,3.4vw,2.65rem)] leading-[1.12] text-ink">
      {children}
    </h2>
  );
}

function Body({ children }: { children: ReactNode }) {
  return <p className="mt-3 max-w-2xl text-[0.96rem] text-muted">{children}</p>;
}

function Action({ href = '/contact/', children }: { href?: string; children: ReactNode }) {
  return (
    <div className="md:col-span-4 md:text-right">
      <SiteLink href={href} className="button">
        {children}
      </SiteLink>
    </div>
  );
}

export const EnquiryBand = Object.assign(Band, { Copy, Kicker, Heading, Body, Action });
