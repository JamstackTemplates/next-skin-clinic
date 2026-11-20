import { validateHours } from '../lib/hours.ts';
import type { Business } from './business.ts';
import { CONCERN_IDS, type Concern } from './concerns.ts';
import { AGE_BANDS, SKIN_TYPES, type CaseNote } from './results.ts';
import { TREATMENT_CATEGORIES, type Treatment } from './treatments.ts';

const URL_SAFE_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function validateBusiness(item: Business): void {
  for (const key of ['name', 'shortName', 'descriptor', 'tagline', 'introduction', 'email', 'phone', 'landmark', 'priceRange'] as const) {
    if (!item[key].trim()) throw new Error(`business.${key}: required`);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(item.email)) {
    throw new Error('business.email: valid public email required');
  }
  if (!item.address.streetAddress.trim() || !item.address.postalCode.trim() || !item.address.formatted.trim()) {
    throw new Error('business.address: streetAddress, postalCode and formatted address are required');
  }
  if (!item.enquiries.title.trim() || !item.enquiries.introduction.trim() || !item.enquiries.privacyNote.trim()) {
    throw new Error('business.enquiries: title, introduction and privacyNote are required');
  }
  if (!item.enquiries.usefulToInclude.length) {
    throw new Error('business.enquiries.usefulToInclude: include message guidance');
  }
  for (const tip of item.enquiries.usefulToInclude) {
    if (!tip.trim()) throw new Error('business.enquiries.usefulToInclude: empty tip');
  }
  validateHours(item.hours);
  if (item.clinicians.length < 1) throw new Error('business.clinicians: at least one clinician required');
  const seen = new Set<string>();
  for (const clinician of item.clinicians) {
    if (!URL_SAFE_ID.test(clinician.id)) throw new Error(`clinician "${clinician.id}": ID must be lowercase URL-safe`);
    if (seen.has(clinician.id)) throw new Error(`clinician "${clinician.id}": duplicate ID`);
    seen.add(clinician.id);
    if (!clinician.name.trim() || !clinician.role.trim() || !clinician.focus.trim() || !clinician.monogram.trim()) {
      throw new Error(`clinician "${clinician.id}": name, role, focus and monogram are required`);
    }
  }
}

export function validateConcerns(items: readonly Concern[]): void {
  const seen = new Set<string>();
  for (const item of items) {
    if (!URL_SAFE_ID.test(item.id)) throw new Error(`concern "${item.id}": ID must be lowercase URL-safe`);
    if (seen.has(item.id)) throw new Error(`concern "${item.id}": duplicate ID`);
    seen.add(item.id);
    if (!item.name.trim() || !item.description.trim()) {
      throw new Error(`concern "${item.id}": name and description are required`);
    }
    if (!CONCERN_IDS.includes(item.icon)) {
      throw new Error(`concern "${item.id}": unknown icon key "${item.icon}"`);
    }
  }
}

export function validateTreatments(
  items: readonly Treatment[],
  knownConcerns: readonly Concern[],
): void {
  const concernIds = new Set<string>(knownConcerns.map((c) => c.id));
  const categoryIds = new Set<string>(TREATMENT_CATEGORIES);
  const seen = new Set<string>();

  for (const item of items) {
    const label = `treatment "${item.id || '(missing id)'}"`;
    if (!URL_SAFE_ID.test(item.id)) {
      throw new Error(`${label}: ID must be lowercase URL-safe`);
    }
    if (seen.has(item.id)) {
      throw new Error(`${label}: duplicate treatment ID`);
    }
    seen.add(item.id);

    if (!item.name.trim() || !item.summary.trim() || !item.downtime.trim()) {
      throw new Error(`${label}: name, summary and downtime are required`);
    }
    if (!categoryIds.has(item.category)) {
      throw new Error(`${label}: unknown category "${item.category}"`);
    }
    if (!item.concerns.length) {
      throw new Error(`${label}: must list at least one concern`);
    }
    for (const concern of item.concerns) {
      if (!concernIds.has(concern)) {
        throw new Error(`${label}: unknown concern "${concern}"`);
      }
    }
    if (!Number.isInteger(item.minutes) || item.minutes < 10 || item.minutes > 180) {
      throw new Error(`${label}: minutes must be a whole number from 10 to 180`);
    }
    if (!Number.isInteger(item.sessions) || item.sessions < 1 || item.sessions > 12) {
      throw new Error(`${label}: sessions must be a whole number from 1 to 12`);
    }
    if (!Number.isInteger(item.priceFrom) || item.priceFrom < 1 || item.priceFrom > 2000) {
      throw new Error(`${label}: priceFrom must be a whole GBP amount from 1 to 2000`);
    }
    if (item.coursePrice !== undefined) {
      if (!Number.isInteger(item.coursePrice) || item.coursePrice < 1) {
        throw new Error(`${label}: coursePrice must be a positive whole GBP amount`);
      }
      if (item.coursePrice >= item.priceFrom * item.sessions) {
        throw new Error(
          `${label}: coursePrice (£${item.coursePrice}) must be less than priceFrom × sessions (£${item.priceFrom * item.sessions})`,
        );
      }
    }
    if (item.availability !== 'available' && !item.availabilityNote?.trim()) {
      throw new Error(`${label}: availabilityNote is required when availability is "${item.availability}"`);
    }
  }

  for (const concern of knownConcerns) {
    const hasAvailable = items.some(
      (item) => item.availability === 'available' && item.concerns.includes(concern.id),
    );
    if (!hasAvailable) {
      throw new Error(`concern "${concern.id}": must be served by at least one available treatment`);
    }
  }
}

export function validateCaseNotes(
  items: readonly CaseNote[],
  knownConcerns: readonly Concern[],
  knownTreatments: readonly Treatment[],
): void {
  const concernIds = new Set<string>(knownConcerns.map((c) => c.id));
  const treatmentIds = new Set<string>(knownTreatments.map((t) => t.id));
  const ageSet = new Set<string>(AGE_BANDS);
  const skinSet = new Set<string>(SKIN_TYPES);
  const seen = new Set<string>();

  for (const item of items) {
    const label = `case "${item.id || '(missing id)'}"`;
    if (!URL_SAFE_ID.test(item.id)) {
      throw new Error(`${label}: ID must be lowercase URL-safe`);
    }
    if (seen.has(item.id)) {
      throw new Error(`${label}: duplicate case ID`);
    }
    seen.add(item.id);

    if (!item.title.trim() || !item.summary.trim() || !item.clinicianNote.trim()) {
      throw new Error(`${label}: title, summary and clinicianNote are required`);
    }
    if (item.consent !== true) {
      throw new Error(`${label}: written consent (consent: true) is required`);
    }
    if (!concernIds.has(item.concern)) {
      throw new Error(`${label}: unknown concern "${item.concern}"`);
    }
    if (!item.treatmentIds.length) {
      throw new Error(`${label}: must reference at least one treatment`);
    }
    for (const id of item.treatmentIds) {
      if (!treatmentIds.has(id)) {
        throw new Error(`${label}: unknown treatment reference "${id}"`);
      }
    }
    if (!Number.isInteger(item.weeks) || item.weeks < 1 || item.weeks > 52) {
      throw new Error(`${label}: weeks must be a whole number from 1 to 52`);
    }
    if (!Number.isInteger(item.sessions) || item.sessions < 1 || item.sessions > 24) {
      throw new Error(`${label}: sessions must be a positive whole number`);
    }
    if (!ageSet.has(item.ageBand)) {
      throw new Error(`${label}: unsupported ageBand "${item.ageBand}"`);
    }
    if (!skinSet.has(item.skinType)) {
      throw new Error(`${label}: skinType must be Fitzpatrick I–VI`);
    }
    const { before, after, label: measureLabel, scale } = item.measure;
    if (!measureLabel.trim() || !scale.trim()) {
      throw new Error(`${label}: measure.label and measure.scale are required`);
    }
    if (
      typeof before !== 'number' ||
      typeof after !== 'number' ||
      before < 0 ||
      before > 10 ||
      after < 0 ||
      after > 10 ||
      after >= before
    ) {
      throw new Error(`${label}: measure must be within 0–10 with after (${after}) < before (${before})`);
    }
  }
}
