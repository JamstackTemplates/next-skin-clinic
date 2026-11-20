import type { Metadata } from 'next';
import { RecordCard } from '../../components/art/underglaze-border';
import { CopyEmail } from '../../components/copy-email';
import { GoogleMap } from '../../components/google-map';
import { HoursTable } from '../../components/hours-table';
import { JamstacksSupportForm } from '../../components/jamstacks-support-form';
import { business } from '../../content/business';
import { absoluteUrl } from '../../lib/paths';
import { site } from '../../lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: business.enquiries.introduction,
  alternates: { canonical: absoluteUrl('/contact/') },
};

export default function ContactPage() {
  const hosted = Boolean(site.jamstacksSite && site.jamstacksEmbedUrl);

  return (
    <div className="wrap py-12 pb-20 sm:py-16 sm:pb-24">
      <div className="grid items-start gap-12 lg:grid-cols-12">
        {/* Left column: page head, intro, useful-to-include record card, no-photos note, form or fallback */}
        <div className="lg:col-span-7">
          <header className="border-b border-primary-ink/55 pb-8">
            <p className="specimen-label">ENQUIRIES · MARYLEBONE</p>
            <h1 className="mt-3 font-display text-[clamp(2.35rem,5.2vw,3.9rem)] leading-[1.06] text-ink">
              {business.enquiries.title}
            </h1>
            <p className="mt-4 max-w-2xl text-[1.02rem] leading-relaxed text-muted">
              {business.enquiries.introduction}
            </p>
          </header>

          <div className="mt-8">
            <RecordCard kicker="USEFUL TO INCLUDE IN YOUR MESSAGE">
              <ul className="space-y-2.5 text-[0.94rem] text-ink/90">
                {business.enquiries.usefulToInclude.map((tip, index) => (
                  <li key={tip} className="flex items-baseline gap-3">
                    <span className="font-mono text-[0.72rem] text-primary-ink">
                      0{index + 1}
                    </span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-rule pt-4 text-[0.88rem] text-muted">
                {business.enquiries.privacyNote}
              </p>
            </RecordCard>
          </div>

          <section aria-label="Enquiry form" className="mt-8">
            {hosted ? (
              <div className="border border-primary-ink/45 bg-bisque p-6 sm:p-8">
                <p className="specimen-label mb-4">SEND AN ENQUIRY</p>
                <JamstacksSupportForm
                  siteId={site.jamstacksSite}
                  embedUrl={site.jamstacksEmbedUrl}
                  email={business.email}
                />
              </div>
            ) : (
              <div className="border border-primary-ink/45 bg-bisque p-6 sm:p-8">
                <p className="specimen-label">DIRECT EMAIL ENQUIRY</p>
                <h2 className="mt-2 font-display text-[1.7rem] text-ink">Write to the clinic</h2>
                <p className="mt-3 text-[0.95rem] text-muted">
                  The online enquiry form is not connected on this preview. Please send your note
                  directly to{' '}
                  <a className="text-link wrap-anywhere" href={`mailto:${business.email}`}>
                    {business.email}
                  </a>{' '}
                  and a clinician will reply within two working days.
                </p>
              </div>
            )}
          </section>
        </div>

        {/* Right column: tall bisque panel with email + copy control, phone, address, landmark, hours, map */}
        <aside
          aria-label="Clinic contact details, hours and map"
          className="border border-primary-ink/60 bg-bisque p-6 sm:p-8 lg:col-span-5"
        >
          <p className="specimen-label border-b border-rule pb-2.5">CLINIC DESK</p>

          <div className="mt-5 space-y-6">
            <div>
              <h2 className="font-display text-[1.35rem] text-ink">Email</h2>
              <p className="mt-1">
                <a className="text-link wrap-anywhere text-[1rem]" href={`mailto:${business.email}`}>
                  {business.email}
                </a>
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <CopyEmail email={business.email} />
              </div>
            </div>

            <div className="border-t border-rule pt-5">
              <h2 className="font-display text-[1.35rem] text-ink">Telephone</h2>
              <p className="mt-1 font-mono text-[0.98rem] text-ink">
                <a
                  className="text-link"
                  href={`tel:${business.phone.replace(/[^\d+]/g, '')}`}
                >
                  {business.phone}
                </a>
              </p>
            </div>

            <div className="border-t border-rule pt-5">
              <h2 className="font-display text-[1.35rem] text-ink">Address</h2>
              <address className="mt-1.5 not-italic text-[0.95rem] leading-relaxed text-ink">
                {business.address.formatted}
              </address>
              <p className="mt-1.5 text-[0.88rem] text-muted">{business.landmark}</p>
            </div>

            <div className="border-t border-rule pt-5">
              <h2 className="mb-3 font-display text-[1.35rem] text-ink">Opening hours</h2>
              <HoursTable hours={business.hours} tone="light" />
            </div>

            <div className="pt-2">
              {/* Cobalt double rule above the map */}
              <div className="mb-4">
                <div className="h-px bg-primary-ink/75" />
                <div className="mt-[3px] h-px bg-primary-ink/35" />
              </div>
              <GoogleMap
                address={business.address.formatted}
                title="Map showing Porcelain Skin Clinic, Bentinck Mews"
                className="overflow-hidden border border-rule"
              />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
