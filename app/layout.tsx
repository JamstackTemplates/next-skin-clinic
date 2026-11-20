import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '@fontsource/gilda-display/400.css';
import '@fontsource-variable/sora/index.css';
import '@fontsource-variable/geist-mono/index.css';
import { ThemeProvider } from 'jamstacks';
import { ThemeScript } from 'jamstacks/server';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';
import { business } from '../content/business';
import { asset } from '../lib/paths';
import { site } from '../lib/site';
import './tailwind.input.css';

const ogImage = asset('/og.png');
const metaDescription = business.introduction || site.description;

export const metadata: Metadata = {
  title: { default: business.name, template: `%s — ${business.name}` },
  description: metaDescription,
  ...(site.url ? { metadataBase: new URL(`${site.url}/`) } : {}),
  openGraph: {
    type: 'website',
    siteName: business.name,
    title: business.name,
    description: metaDescription,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: `${business.name} — Marylebone, London`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: business.name,
    description: metaDescription,
    images: [ogImage],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>
        <ThemeProvider>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <SiteHeader />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
