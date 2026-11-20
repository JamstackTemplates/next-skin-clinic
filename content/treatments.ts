import type { ConcernId } from './concerns.ts';

/**
 * Treatments and prices ledger for Porcelain Skin Clinic.
 *
 * Frequent owner edits:
 * - Update `priceFrom` or `coursePrice` (whole GBP).
 * - Switch `availability` between `'available'`, `'waitlist'` and `'paused'`,
 *   providing `availabilityNote` whenever status is not `'available'`.
 * - Add new treatments with a unique URL-safe `id` and valid `concerns` from `content/concerns.ts`.
 */
export const TREATMENT_CATEGORIES = [
  'consultation',
  'peel',
  'device',
  'light',
  'programme',
] as const;

export type TreatmentCategory = (typeof TREATMENT_CATEGORIES)[number];
export type TreatmentAvailability = 'available' | 'waitlist' | 'paused';
export type ClinicianLead = 'doctor' | 'nurse' | 'either';

export interface TreatmentCategoryMeta {
  id: TreatmentCategory;
  code: string;
  label: string;
  description: string;
}

export const treatmentCategories: readonly TreatmentCategoryMeta[] = [
  {
    id: 'consultation',
    code: '01 · ASSESSMENT',
    label: 'Consultation',
    description: 'Every course begins here: skin history, daylight assessment and a written plan.',
  },
  {
    id: 'peel',
    code: '02 · RESURFACING',
    label: 'Peels',
    description: 'Measured alpha-hydroxy and medium-depth peels matched to your skin type and season.',
  },
  {
    id: 'device',
    code: '03 · CLINICAL DEVICES',
    label: 'Devices',
    description: 'Medical microneedling and barrier-first clinical facials with predictable recovery.',
  },
  {
    id: 'light',
    code: '04 · PHOTOTHERAPY',
    label: 'Light',
    description: 'Narrow-band LED phototherapy and doctor-led IPL for redness and sun-induced pigment.',
  },
  {
    id: 'programme',
    code: '05 · STRUCTURED CARE',
    label: 'Programmes',
    description: 'Multi-week plans combining in-clinic sessions, review checks and steady home care.',
  },
];

export interface Treatment {
  /** Stable URL-safe identifier, used for `/treatments/#<id>` anchors and case references. */
  id: string;
  /** Public treatment name shown in the dispensary ledger. */
  name: string;
  /** Dispensary shelf category. */
  category: TreatmentCategory;
  /** One or more concern IDs from `content/concerns.ts`. */
  concerns: readonly ConcernId[];
  /** One-sentence plain explanation of the treatment. */
  summary: string;
  /** Session duration in minutes (10–180). */
  minutes: number;
  /** Typical number of sessions in a course (1–12). */
  sessions: number;
  /** Short downtime description, e.g. "None" or "Redness 24–48 hours". */
  downtime: string;
  /** Whole GBP starting price per session (1–2000). */
  priceFrom: number;
  /** Optional whole GBP full-course price; must be strictly less than `priceFrom * sessions`. */
  coursePrice?: number;
  /** Whether a patch test is required at least 48 hours beforehand. */
  patchTest: boolean;
  /** Current clinic availability. */
  availability: TreatmentAvailability;
  /** Required explanation when availability is `'waitlist'` or `'paused'`. */
  availabilityNote?: string;
  /** Which clinician leads this treatment. */
  ledBy: ClinicianLead;
}

export const treatments: readonly Treatment[] = [
  {
    id: 'skin-consultation',
    name: 'Skin consultation',
    category: 'consultation',
    concerns: ['acne', 'redness', 'pigmentation', 'texture', 'dehydration', 'ageing'],
    summary:
      'A 45-minute appointment covering skin history, magnified daylight assessment and a written treatment plan.',
    minutes: 45,
    sessions: 1,
    downtime: 'None',
    priceFrom: 60,
    patchTest: false,
    availability: 'available',
    ledBy: 'either',
  },
  {
    id: 'glycolic-peel',
    name: 'Glycolic resurfacing peel',
    category: 'peel',
    concerns: ['texture', 'ageing', 'dehydration'],
    summary:
      'A buffered glycolic acid course to lift dull surface scale and smooth uneven grain.',
    minutes: 30,
    sessions: 4,
    downtime: 'Light flaking 1–3 days',
    priceFrom: 95,
    coursePrice: 340,
    patchTest: true,
    availability: 'available',
    ledBy: 'nurse',
  },
  {
    id: 'mandelic-peel',
    name: 'Mandelic clarity peel',
    category: 'peel',
    concerns: ['acne', 'pigmentation'],
    summary:
      'A gentler, larger-molecule acid peel suited to congestion, uneven tone and deeper skin types.',
    minutes: 30,
    sessions: 6,
    downtime: 'Mild tightness 1 day',
    priceFrom: 90,
    coursePrice: 480,
    patchTest: true,
    availability: 'available',
    ledBy: 'nurse',
  },
  {
    id: 'tca-peel',
    name: 'Medium-depth TCA peel',
    category: 'peel',
    concerns: ['pigmentation', 'texture'],
    summary:
      'A doctor-performed trichloroacetic acid peel for stubborn sun marks and surface roughness.',
    minutes: 45,
    sessions: 1,
    downtime: 'Peeling 5–7 days',
    priceFrom: 295,
    patchTest: true,
    availability: 'paused',
    availabilityNote: 'Offered October to March only, when sun exposure is lower.',
    ledBy: 'doctor',
  },
  {
    id: 'microneedling',
    name: 'Medical microneedling',
    category: 'device',
    concerns: ['texture', 'ageing', 'acne'],
    summary:
      'Controlled clinical needling performed by Dr Hale to soften rolling acne scars and refine texture.',
    minutes: 60,
    sessions: 3,
    downtime: 'Redness 24–48 hours',
    priceFrom: 220,
    coursePrice: 600,
    patchTest: false,
    availability: 'available',
    ledBy: 'doctor',
  },
  {
    id: 'hydration-facial',
    name: 'Clinical hydration facial',
    category: 'device',
    concerns: ['dehydration', 'ageing'],
    summary:
      'Humectant infusion, gentle enzymatic clearing and cool-compress finishing for parched skin.',
    minutes: 50,
    sessions: 1,
    downtime: 'None',
    priceFrom: 110,
    patchTest: false,
    availability: 'available',
    ledBy: 'nurse',
  },
  {
    id: 'barrier-repair',
    name: 'Barrier repair facial',
    category: 'device',
    concerns: ['redness', 'dehydration'],
    summary:
      'Fragrance-free lipid replenishment and calming therapy designed for reactive or sensitised skin.',
    minutes: 45,
    sessions: 2,
    downtime: 'None',
    priceFrom: 100,
    coursePrice: 180,
    patchTest: true,
    availability: 'available',
    ledBy: 'nurse',
  },
  {
    id: 'led-therapy',
    name: 'LED light therapy',
    category: 'light',
    concerns: ['acne', 'redness', 'ageing'],
    summary:
      'Non-thermal red and near-infrared light sessions to quiet inflammation and aid recovery.',
    minutes: 20,
    sessions: 8,
    downtime: 'None',
    priceFrom: 45,
    coursePrice: 320,
    patchTest: false,
    availability: 'available',
    ledBy: 'either',
  },
  {
    id: 'ipl-redness',
    name: 'IPL for redness and pigmentation',
    category: 'light',
    concerns: ['redness', 'pigmentation'],
    summary:
      'Targeted broad-band light pulses for diffuse facial redness and sun-induced pigment in Fitzpatrick I–IV.',
    minutes: 45,
    sessions: 3,
    downtime: 'Warmth, darkened spots 7 days',
    priceFrom: 180,
    coursePrice: 495,
    patchTest: true,
    availability: 'waitlist',
    availabilityNote: 'New courses start from January; enquire to join the list.',
    ledBy: 'doctor',
  },
  {
    id: 'acne-programme',
    name: 'Twelve-week acne programme',
    category: 'programme',
    concerns: ['acne'],
    summary:
      'A structured twelve-week sequence of clarity peels, LED sessions and scheduled clinician reviews.',
    minutes: 40,
    sessions: 7,
    downtime: 'Varies by stage',
    priceFrom: 85,
    coursePrice: 560,
    patchTest: true,
    availability: 'available',
    ledBy: 'either',
  },
];

export const featuredTreatmentIds = [
  'skin-consultation',
  'mandelic-peel',
  'microneedling',
  'led-therapy',
] as const;

export function treatmentById(id: string): Treatment | undefined {
  return treatments.find((item) => item.id === id);
}

export function treatmentsForConcern(concernId: ConcernId, onlyAvailable = false): Treatment[] {
  return treatments.filter(
    (item) =>
      item.concerns.includes(concernId) && (!onlyAvailable || item.availability === 'available'),
  );
}

export function clinicianLeadLabel(lead: ClinicianLead): string {
  if (lead === 'doctor') return 'Doctor-led';
  if (lead === 'nurse') return 'Nurse-led';
  return 'Doctor or nurse';
}
