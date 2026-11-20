import { CrackedTeacupArt } from '../components/art/cracked-teacup';
import { SiteLink } from '../components/site-link';

export default function NotFound() {
  return (
    <section className="bg-craquelure py-20 sm:py-28">
      <div className="wrap flex flex-col items-center text-center">
        <CrackedTeacupArt className="h-52 w-72 sm:h-60 sm:w-80" />
        <p className="specimen-label mt-6">404 · PAGE NOT FOUND</p>
        <h1 className="mt-3 font-display text-[clamp(2.2rem,5vw,3.5rem)] text-ink">
          This page has a hairline crack.
        </h1>
        <p className="mt-3 max-w-md text-[0.98rem] text-muted">
          The page you looked for isn’t on the shelf. Try one of the main clinic pages instead.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <SiteLink href="/" className="button">
            Home
          </SiteLink>
          <SiteLink href="/treatments/" className="button button-quiet">
            Treatments
          </SiteLink>
          <SiteLink href="/contact/" className="button button-quiet">
            Contact
          </SiteLink>
        </div>
      </div>
    </section>
  );
}
