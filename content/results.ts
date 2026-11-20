import type { ConcernId } from './concerns.ts';

/**
 * Anonymised case notes for the Results page and Home featured glaze gauge.
 *
 * Frequent owner edits:
 * - Add new cases with a unique URL-safe `id`, valid `concern` and `treatmentIds`,
 *   `consent: true`, `weeks` (1–52), Fitzpatrick `skinType` (`I`–`VI`), and a
 *   clinician-graded `measure` on 0–10 where `after < before`.
 */
export const AGE_BANDS = ['20s', '30s', '40s', '50s', '60s+'] as const;
export const SKIN_TYPES = ['I', 'II', 'III', 'IV', 'V', 'VI'] as const;

export type AgeBand = (typeof AGE_BANDS)[number];
export type FitzpatrickType = (typeof SKIN_TYPES)[number];

export interface CaseMeasure {
  /** Short clinical metric name, e.g. "Redness" or "Active lesions". */
  label: string;
  /** Description of the clinician-graded scale. */
  scale: string;
  /** Baseline score (0–10). */
  before: number;
  /** End-of-course score (0–10), must be strictly less than `before`. */
  after: number;
}

export interface CaseNote {
  /** Stable URL-safe identifier. */
  id: string;
  /** Short clinical summary heading. */
  title: string;
  /** Primary concern ID from `content/concerns.ts`. */
  concern: ConcernId;
  /** One or more treatment IDs from `content/treatments.ts`. */
  treatmentIds: readonly string[];
  /** Total elapsed course duration in weeks (1–52). */
  weeks: number;
  /** Number of in-clinic sessions completed. */
  sessions: number;
  /** Broad age decade for anonymisation. */
  ageBand: AgeBand;
  /** Fitzpatrick phototype I–VI. */
  skinType: FitzpatrickType;
  /** Clinician-graded before/after score on a 0–10 scale. */
  measure: CaseMeasure;
  /** Plain summary of the course and response. */
  summary: string;
  /** Honest clinician reflection including limits and maintenance. */
  clinicianNote: string;
  /** Written patient consent is required for every published case note. */
  consent: true;
}

export const caseNotes: readonly CaseNote[] = [
  {
    id: 'case-redness-cheeks',
    title: 'Persistent redness across both cheeks',
    concern: 'redness',
    treatmentIds: ['barrier-repair', 'ipl-redness'],
    weeks: 14,
    sessions: 5,
    ageBand: '30s',
    skinType: 'II',
    measure: {
      label: 'Redness',
      scale: 'Clinician erythema grade (0–10)',
      before: 7,
      after: 3,
    },
    summary:
      'Two barrier-repair facials settled daily stinging before three spaced IPL sessions addressed persistent background flush across both cheeks.',
    clinicianNote:
      'Flushing triggers such as heat and wind remain relevant; gentle cleansing and daily SPF keep baseline redness steady.',
    consent: true,
  },
  {
    id: 'case-adult-acne',
    title: 'Adult acne along the jaw',
    concern: 'acne',
    treatmentIds: ['acne-programme', 'mandelic-peel'],
    weeks: 12,
    sessions: 7,
    ageBand: '20s',
    skinType: 'V',
    measure: {
      label: 'Active lesions',
      scale: 'Clinician inflammatory count grade (0–10)',
      before: 8,
      after: 3,
    },
    summary:
      'Seven fortnightly sessions combining low-strength mandelic clarity peels and red LED light calmed deep jawline breakouts without provoking post-inflammatory darkening.',
    clinicianNote:
      'Occasional pre-menstrual spots still occur; maintenance relies on simple, non-stripping home care rather than stronger peels.',
    consent: true,
  },
  {
    id: 'case-melasma',
    title: 'Melasma on the upper lip and forehead',
    concern: 'pigmentation',
    treatmentIds: ['mandelic-peel', 'led-therapy'],
    weeks: 16,
    sessions: 8,
    ageBand: '40s',
    skinType: 'IV',
    measure: {
      label: 'Pigment contrast',
      scale: 'Clinician melasma contrast grade (0–10)',
      before: 6,
      after: 4,
    },
    summary:
      'A low-heat protocol of mandelic peels paired with calming LED light softened sharp pigment borders over four months without rebound darkening.',
    clinicianNote: 'Melasma is managed, not cured. Daily SPF keeps the result.',
    consent: true,
  },
  {
    id: 'case-acne-scarring',
    title: 'Rolling acne scars',
    concern: 'texture',
    treatmentIds: ['microneedling'],
    weeks: 20,
    sessions: 3,
    ageBand: '30s',
    skinType: 'III',
    measure: {
      label: 'Scar visibility',
      scale: 'Clinician angled-light texture grade (0–10)',
      before: 7,
      after: 4,
    },
    summary:
      'Three doctor-led medical microneedling sessions spaced six weeks apart softened shallow rolling indents on the outer cheeks when assessed under matching side-lighting.',
    clinicianNote:
      'Deeper ice-pick scars respond less to needling alone; remodelling continues slowly for several months after the final session.',
    consent: true,
  },
  {
    id: 'case-dehydrated',
    title: 'Tight, dehydrated skin after travel',
    concern: 'dehydration',
    treatmentIds: ['hydration-facial', 'glycolic-peel'],
    weeks: 10,
    sessions: 5,
    ageBand: '50s',
    skinType: 'II',
    measure: {
      label: 'Tightness',
      scale: 'Clinician surface dryness and patient comfort grade (0–10)',
      before: 6,
      after: 2,
    },
    summary:
      'An initial hydration facial restored comfort before four light glycolic resurfacing peels smoothed fine dry crinkling and dull patches.',
    clinicianNote:
      'Air-conditioned flights quickly strip surface water; pacing actives and keeping a rich evening moisturiser prevents tightness returning.',
    consent: true,
  },
];

export const featuredCaseId = 'case-redness-cheeks';

export function caseById(id: string): CaseNote | undefined {
  return caseNotes.find((item) => item.id === id);
}
