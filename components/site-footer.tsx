import { business } from '../content/business';
import { GlazeGaugeDivider } from './glaze-gauge';
import { OpenBadge } from './open-badge';
import { SiteLink } from './site-link';

export function SiteFooter() {
  return (
    <footer>
      {/* Slim crackle-to-glaze divider along the footer's upper edge */}
      <GlazeGaugeDivider />

      <div className="bg-cobalt-band text-cobalt-ink">
        <div className="wrap py-14">
          <div className="grid gap-10 border-b border-cobalt-rule pb-10 md:grid-cols-12">
            {/* Column 1: Brand, address and landmark */}
            <div className="md:col-span-4">
              <p className="font-display text-[1.75rem] leading-none text-cobalt-ink">
                {business.shortName}
              </p>
              <p className="mt-1 font-mono text-[0.66rem] tracking-[0.22em] text-cobalt-muted uppercase">
                {business.descriptor} · Marylebone
              </p>
              <address className="mt-5 not-italic text-[0.92rem] leading-relaxed text-cobalt-ink/95">
                {business.address.formatted}
              </address>
              <p className="mt-2 text-[0.86rem] text-cobalt-muted">{business.landmark}</p>
            </div>

            {/* Column 2: Clinic hours with live OpenBadge */}
            <div className="md:col-span-4">
              <p className="font-mono text-[0.72rem] tracking-[0.14em] text-cobalt-muted uppercase">
                Clinic hours
              </p>
              <p className="mt-3 inline-flex items-center gap-2 rounded-ui border border-cobalt-rule bg-cobalt-band/40 px-3 py-1.5 font-mono text-[0.76rem] text-cobalt-ink">
                <span className="inline-block h-2 w-2 rounded-full bg-celadon" aria-hidden="true" />
                <OpenBadge hours={business.hours} />
              </p>
              <dl className="mt-4 grid grid-cols-[6.5rem_1fr] gap-y-1.5 text-[0.86rem]">
                {business.hours.map((entry) => (
                  <div key={entry.day} className="contents">
                    <dt className="text-cobalt-muted">{entry.day}</dt>
                    <dd className="font-mono text-[0.82rem] text-cobalt-ink">
                      {entry.opens && entry.closes ? `${entry.opens}–${entry.closes}` : 'Closed'}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Column 3: Email, phone and quick routes */}
            <div className="md:col-span-4">
              <p className="font-mono text-[0.72rem] tracking-[0.14em] text-cobalt-muted uppercase">
                Enquiries &amp; clinic desk
              </p>
              <div className="mt-3 space-y-2 text-[0.94rem]">
                <p>
                  <a
                    href={`mailto:${business.email}`}
                    className="wrap-anywhere text-cobalt-ink underline decoration-cobalt-muted/60 underline-offset-4 hover:decoration-cobalt-ink"
                  >
                    {business.email}
                  </a>
                </p>
                <p>
                  <a
                    href={`tel:${business.phone.replace(/[^\d+]/g, '')}`}
                    className="font-mono text-[0.92rem] text-cobalt-ink no-underline hover:underline"
                  >
                    {business.phone}
                  </a>
                </p>
              </div>
              <nav aria-label="Footer" className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[0.86rem] text-cobalt-muted">
                <SiteLink href="/treatments/" className="text-cobalt-muted hover:text-cobalt-ink">
                  Treatments
                </SiteLink>
                <SiteLink href="/results/" className="text-cobalt-muted hover:text-cobalt-ink">
                  Results
                </SiteLink>
                <SiteLink href="/consultation/" className="text-cobalt-muted hover:text-cobalt-ink">
                  Consultation
                </SiteLink>
                <SiteLink href="/contact/" className="text-cobalt-muted hover:text-cobalt-ink">
                  Contact
                </SiteLink>
              </nav>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-[0.8rem] text-cobalt-muted">
            <p>Treatments for adults 18+. Individual results vary.</p>
            <p className="font-mono text-[0.72rem] tracking-[0.06em]">
              {business.name} ·{' '}
              <a
                href="https://jamstacks.net"
                className="text-cobalt-muted no-underline hover:text-cobalt-ink hover:underline"
              >
                jamstacks.net
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
