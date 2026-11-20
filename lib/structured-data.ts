import { business } from '../content/business.ts';
import { absoluteUrl } from './paths.ts';

/**
 * MedicalClinic JSON-LD derived strictly from `content/business.ts`.
 * Uses PostalAddress, openingHoursSpecification, medicalSpecialty and priceRange.
 */
export function businessStructuredData() {
  const url = absoluteUrl('/');
  const openingHoursSpecification = business.hours
    .filter((entry) => entry.opens && entry.closes)
    .map((entry) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: `https://schema.org/${entry.day}`,
      opens: entry.opens,
      closes: entry.closes,
    }));

  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name: business.name,
    description: business.introduction,
    medicalSpecialty: 'Dermatologic',
    priceRange: business.priceRange,
    email: business.email,
    ...(business.phone ? { telephone: business.phone } : {}),
    ...(url ? { url } : {}),
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.streetAddress,
      addressLocality: business.address.addressLocality,
      addressRegion: business.address.addressRegion,
      postalCode: business.address.postalCode,
      addressCountry: business.address.addressCountry,
    },
    openingHoursSpecification,
  };
}

/** Prevent content containing a closing script tag from escaping JSON-LD. */
export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
