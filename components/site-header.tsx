'use client';

import { useEffect, useId, useState } from 'react';
import { DarkModeToggle } from 'jamstacks';
import { business } from '../content/business';
import { SiteLink } from './site-link';

const NAV_ITEMS = [
  { href: '/treatments/', label: 'Treatments' },
  { href: '/results/', label: 'Results' },
  { href: '/consultation/', label: 'Consultation' },
  { href: '/contact/', label: 'Contact' },
] as const;

/**
 * Single semantic `<nav>` landmark for both narrow and wide viewports
 * (per modern-web-guidance responsive navigation pattern).
 */
export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <header className="relative z-40 bg-porcelain cobalt-double-rule">
      <div className="wrap flex min-h-[4.5rem] flex-wrap items-center justify-between gap-x-4 gap-y-2 py-3">
        {/* Wordmark: "Porcelain" in Gilda Display + "SKIN CLINIC" in Geist Mono beneath */}
        <SiteLink
          href="/"
          className="group inline-flex flex-col leading-none no-underline hover:no-underline"
        >
          <span className="font-display text-[1.7rem] tracking-[-0.02em] text-ink transition-colors group-hover:text-primary-ink sm:text-[1.9rem]">
            {business.shortName}
          </span>
          <span className="mt-0.5 font-mono text-[0.64rem] font-medium tracking-[0.22em] text-primary-ink uppercase">
            {business.descriptor}
          </span>
        </SiteLink>

        {/* Right utility controls: Enquire CTA + DarkModeToggle + Mobile menu button */}
        <div className="site-header-actions flex items-center gap-2.5 sm:gap-3 md:order-3">
          <SiteLink
            href="/contact/"
            className="button hidden min-h-[2.35rem] px-4 py-1.5 text-[0.84rem] sm:inline-flex"
          >
            Enquire
          </SiteLink>

          <DarkModeToggle />

          <button
            type="button"
            className="inline-flex min-h-[2.35rem] items-center gap-2 rounded-ui border border-primary-ink/60 bg-bisque px-3 py-1.5 font-mono text-[0.72rem] tracking-[0.12em] text-primary-ink uppercase md:hidden"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <svg viewBox="0 0 18 14" className="h-3.5 w-4" aria-hidden="true">
              {menuOpen ? (
                <path
                  d="M3 2 L15 12 M15 2 L3 12"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M1 2.5 H17 M1 7 H17 M1 11.5 H17"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              )}
            </svg>
            <span>Menu</span>
          </button>
        </div>

        {/* Single primary <nav> landmark: inline on desktop, compact disclosure panel below md */}
        <nav
          id={menuId}
          aria-label="Primary"
          className={`${
            menuOpen ? 'block' : 'hidden'
          } w-full border-t border-rule pt-3 pb-2 md:order-2 md:block md:w-auto md:border-0 md:p-0`}
        >
          <ul className="flex flex-col md:flex-row md:items-center md:gap-7">
            {NAV_ITEMS.map((item) => (
              <li key={item.href} className="border-b border-rule/75 md:border-0">
                <SiteLink
                  href={item.href}
                  markCurrent="page"
                  onClick={() => setMenuOpen(false)}
                  className="block py-2.5 font-display text-[1.22rem] text-ink no-underline transition-colors hover:text-primary-ink hover:underline md:py-0 md:font-sans md:text-[0.92rem] md:text-ink/90"
                >
                  {item.label}
                </SiteLink>
              </li>
            ))}
            <li className="pt-3 md:hidden">
              <SiteLink
                href="/contact/"
                onClick={() => setMenuOpen(false)}
                className="button w-full"
              >
                Enquire about a consultation
              </SiteLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
