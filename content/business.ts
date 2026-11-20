import type { OpeningHours } from '../lib/hours.ts';

export interface Clinician {
  /** Stable URL-safe identifier. */
  id: string;
  /** Two-letter porcelain roundel monogram. */
  monogram: string;
  /** Full name and title. */
  name: string;
  /** Clinical role at Porcelain Skin Clinic. */
  role: string;
  /** Clinical focus and training summary. */
  focus: string;
}

export interface PostalAddress {
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
  /** Single-line formatted address for display and maps. */
  formatted: string;
}

export interface Business {
  /** Public display name; also update site.config.json's name when renaming. */
  name: string;
  /** Short wordmark lead line. */
  shortName: string;
  /** Wordmark descriptor beneath the lead line. */
  descriptor: string;
  /** Short headline for the home page and metadata fallback. */
  tagline: string;
  /** Plain-text meta description and fallback introduction. */
  introduction: string;
  /** Public contact email, never a private notification destination. */
  email: string;
  /** Public telephone number (fictitious Ofcom drama range). */
  phone: string;
  /** Clinic postal address (fictitious). */
  address: PostalAddress;
  /** Plain-language walking directions and nearest Tube. */
  landmark: string;
  /** Price band for structured data. */
  priceRange: string;
  /** Seven same-day weekly opening-hours records in Europe/London. */
  hours: readonly OpeningHours[];
  /** Clinic practitioners. */
  clinicians: readonly Clinician[];
  /** Contact copy; the hosted form supports name, email and message only. */
  enquiries: {
    /** Contact page heading. */
    title: string;
    /** No booking, payment or delivery promises. */
    introduction: string;
    /** Suggestions for the message, not additional form inputs. */
    usefulToInclude: readonly string[];
    /** Privacy reminder shown beside the suggestions. */
    privacyNote: string;
  };
}

export const business: Business = {
  name: 'Porcelain Skin Clinic',
  shortName: 'Porcelain',
  descriptor: 'Skin Clinic',
  tagline: 'Calm, clinical care for skin that needs a plan.',
  introduction:
    'Clinician-led skin clinic in Marylebone, London. Consultations, peels, microneedling and light treatments for acne, redness, pigmentation and texture, each planned in writing first.',
  email: 'hello@porcelainskinclinic.co.uk',
  phone: '020 7946 0532',
  address: {
    streetAddress: 'First floor, 9 Bentinck Mews',
    addressLocality: 'Marylebone',
    addressRegion: 'London',
    postalCode: 'W1U 2AP',
    addressCountry: 'GB',
    formatted: 'First floor, 9 Bentinck Mews, Marylebone, London W1U 2AP',
  },
  landmark: "Two minutes' walk from Wigmore Hall; nearest Tube Bond Street.",
  priceRange: '££',
  hours: [
    { day: 'Monday' },
    { day: 'Tuesday', opens: '09:30', closes: '19:00' },
    { day: 'Wednesday', opens: '09:30', closes: '19:00' },
    { day: 'Thursday', opens: '09:30', closes: '20:00' },
    { day: 'Friday', opens: '09:30', closes: '18:00' },
    { day: 'Saturday', opens: '09:00', closes: '16:00' },
    { day: 'Sunday' },
  ],
  clinicians: [
    {
      id: 'imogen-hale',
      monogram: 'IH',
      name: 'Dr Imogen Hale',
      role: 'Medical director · GP with a special interest in skin',
      focus:
        'Leads skin consultations, medical microneedling, medium-depth peels and IPL light plans, with a focus on acne, rosacea-prone redness and skin-of-colour safety.',
    },
    {
      id: 'tomasz-wren',
      monogram: 'TW',
      name: 'Tomasz Wren',
      role: 'Clinical nurse specialist in skin',
      focus:
        'Leads mandelic and glycolic peel courses, barrier-repair protocols, LED light therapy and mid-course clinical photography reviews.',
    },
  ],
  enquiries: {
    title: 'Enquire about a consultation.',
    introduction:
      "Send us a note and a clinician will reply within two working days to suggest a consultation time. Nothing is booked until we've confirmed it with you by email or phone.",
    usefulToInclude: [
      "your main skin concern and how long you've had it",
      'any treatments or prescription skincare you’ve used',
      "whether you're pregnant or breastfeeding",
      'days and times that usually suit you',
      'the treatment you’re asking about, if any',
    ],
    privacyNote:
      "Please don't send photos or detailed medical history by email; we'll go through that together at consultation.",
  },
};
