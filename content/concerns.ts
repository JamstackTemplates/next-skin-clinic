/**
 * Skin concerns treated at Porcelain Skin Clinic.
 * Every treatment's `concerns` array and every case's `concern` must reference an ID from this file.
 */
export const CONCERN_IDS = [
  'acne',
  'redness',
  'pigmentation',
  'texture',
  'dehydration',
  'ageing',
] as const;

export type ConcernId = (typeof CONCERN_IDS)[number];

export interface Concern {
  /** Stable URL-safe identifier used in `/treatments/?concern=<id>`. */
  id: ConcernId;
  /** Short public heading for the concern tile and filter chip. */
  name: string;
  /** One-line plain description of how the concern presents. */
  description: string;
  /** Key matching the inline SVG underglaze glyph in `components/art/concern-glyph.tsx`. */
  icon: ConcernId;
}

export const concerns: readonly Concern[] = [
  {
    id: 'acne',
    name: 'Acne',
    description: 'Persistent breakouts, congestion and jawline flare-ups calmed in staged courses.',
    icon: 'acne',
  },
  {
    id: 'redness',
    name: 'Redness',
    description: 'Flushing, visible capillaries and reactive cheeks settled with barrier-first care.',
    icon: 'redness',
  },
  {
    id: 'pigmentation',
    name: 'Pigmentation',
    description: 'Sun spots, post-blemish marks and melasma approached cautiously across all skin tones.',
    icon: 'pigmentation',
  },
  {
    id: 'texture',
    name: 'Texture and scarring',
    description: 'Rolling acne scars, enlarged pores and uneven grain softened gradually between reviews.',
    icon: 'texture',
  },
  {
    id: 'dehydration',
    name: 'Dehydration',
    description: 'Tight, weather-worn or over-exfoliated skin restored before any active resurfacing.',
    icon: 'dehydration',
  },
  {
    id: 'ageing',
    name: 'Early ageing',
    description: 'Fine lines, dullness and early laxity supported with measured collagen stimulation.',
    icon: 'ageing',
  },
];

export function concernById(id: string): Concern | undefined {
  return concerns.find((item) => item.id === id);
}
