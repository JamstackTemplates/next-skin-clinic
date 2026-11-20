import assert from 'node:assert/strict';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import { concerns } from '../content/concerns.ts';
import { caseNotes, featuredCaseId, caseById } from '../content/results.ts';
import {
  featuredTreatmentIds,
  treatmentById,
  treatments,
  treatmentsForConcern,
} from '../content/treatments.ts';
import {
  validateBusiness,
  validateCaseNotes,
  validateConcerns,
  validateTreatments,
} from '../content/validation.ts';
import { route } from '../lib/paths.ts';
import { businessStructuredData, jsonLd } from '../lib/structured-data.ts';

test('business, concerns, treatments and case notes pass full validation', () => {
  assert.doesNotThrow(() => validateBusiness(business));
  assert.doesNotThrow(() => validateConcerns(concerns));
  assert.doesNotThrow(() => validateTreatments(treatments, concerns));
  assert.doesNotThrow(() => validateCaseNotes(caseNotes, concerns, treatments));
  assert.ok(caseById(featuredCaseId), `featured case "${featuredCaseId}" must exist`);
  for (const id of featuredTreatmentIds) {
    assert.ok(treatmentById(id), `featured treatment "${id}" must exist`);
  }
});

test('treatment validation catches bad IDs, prices, bounds and missing notes and names the item', () => {
  assert.throws(
    () => validateTreatments([{ ...treatments[0], id: 'Bad ID!' }, ...treatments.slice(1)], concerns),
    /Bad ID!/,
  );
  assert.throws(
    () => validateTreatments([treatments[0], { ...treatments[1], id: treatments[0].id }], concerns),
    new RegExp(treatments[0].id),
  );
  assert.throws(
    () =>
      validateTreatments(
        treatments.map((t) => (t.id === 'mandelic-peel' ? { ...t, category: 'spa' as never } : t)),
        concerns,
      ),
    /mandelic-peel/,
  );
  assert.throws(
    () =>
      validateTreatments(
        treatments.map((t) =>
          t.id === 'mandelic-peel' ? { ...t, concerns: ['unknown-concern' as never] } : t,
        ),
        concerns,
      ),
    /mandelic-peel/,
  );
  assert.throws(
    () =>
      validateTreatments(
        treatments.map((t) => (t.id === 'led-therapy' ? { ...t, minutes: 5 } : t)),
        concerns,
      ),
    /led-therapy/,
  );
  assert.throws(
    () =>
      validateTreatments(
        treatments.map((t) => (t.id === 'led-therapy' ? { ...t, sessions: 13 } : t)),
        concerns,
      ),
    /led-therapy/,
  );
  assert.throws(
    () =>
      validateTreatments(
        treatments.map((t) => (t.id === 'microneedling' ? { ...t, priceFrom: 2500 } : t)),
        concerns,
      ),
    /microneedling/,
  );
  assert.throws(
    () =>
      validateTreatments(
        treatments.map((t) =>
          t.id === 'microneedling' ? { ...t, coursePrice: t.priceFrom * t.sessions } : t,
        ),
        concerns,
      ),
    /microneedling/,
  );
  assert.throws(
    () =>
      validateTreatments(
        treatments.map((t) =>
          t.id === 'ipl-redness' ? { ...t, availability: 'waitlist', availabilityNote: '' } : t,
        ),
        concerns,
      ),
    /ipl-redness/,
  );
  // Every concern must remain served by at least one available treatment
  assert.throws(
    () =>
      validateTreatments(
        treatments.map((t) =>
          t.concerns.includes('pigmentation')
            ? { ...t, availability: 'paused', availabilityNote: 'Temporarily paused.' }
            : t,
        ),
        concerns,
      ),
    /pigmentation/,
  );
});

test('case note validation enforces consent, treatment references, Fitzpatrick types and measure direction', () => {
  assert.throws(
    () =>
      validateCaseNotes(
        caseNotes.map((c) => (c.id === 'case-melasma' ? { ...c, consent: false as never } : c)),
        concerns,
        treatments,
      ),
    /case-melasma/,
  );
  assert.throws(
    () =>
      validateCaseNotes(
        caseNotes.map((c) =>
          c.id === 'case-melasma' ? { ...c, treatmentIds: ['missing-treatment'] } : c,
        ),
        concerns,
        treatments,
      ),
    /case-melasma/,
  );
  assert.throws(
    () =>
      validateCaseNotes(
        caseNotes.map((c) =>
          c.id === 'case-adult-acne' ? { ...c, weeks: 60 } : c,
        ),
        concerns,
        treatments,
      ),
    /case-adult-acne/,
  );
  assert.throws(
    () =>
      validateCaseNotes(
        caseNotes.map((c) =>
          c.id === 'case-adult-acne' ? { ...c, skinType: 'VII' as never } : c,
        ),
        concerns,
        treatments,
      ),
    /case-adult-acne/,
  );
  assert.throws(
    () =>
      validateCaseNotes(
        caseNotes.map((c) =>
          c.id === 'case-redness-cheeks'
            ? { ...c, measure: { ...c.measure, before: 5, after: 6 } }
            : c,
        ),
        concerns,
        treatments,
      ),
    /case-redness-cheeks/,
  );
});

test('common owner edit: opening ipl-redness and adjusting priceFrom passes validation', () => {
  const edited = treatments.map((t) =>
    t.id === 'ipl-redness'
      ? { ...t, availability: 'available' as const, availabilityNote: undefined, priceFrom: 190 }
      : t,
  );
  assert.doesNotThrow(() => validateTreatments(edited, concerns));
  const rednessBefore = treatmentsForConcern('redness', false).length;
  const rednessAfter = edited.filter((t) => t.concerns.includes('redness')).length;
  assert.equal(rednessBefore, rednessAfter);
});

test('structured data emits MedicalClinic derived from business content and escapes script tags', () => {
  const schema = businessStructuredData();
  assert.equal(schema['@type'], 'MedicalClinic');
  assert.equal(schema.medicalSpecialty, 'Dermatologic');
  assert.equal(schema.priceRange, business.priceRange);
  assert.equal(schema.name, business.name);
  assert.equal(schema.email, business.email);
  assert.equal(schema.address['@type'], 'PostalAddress');
  assert.equal(schema.address.postalCode, business.address.postalCode);
  assert.equal(schema.openingHoursSpecification.length, 5);
  const thursday = schema.openingHoursSpecification.find((s) =>
    s.dayOfWeek.endsWith('/Thursday'),
  );
  assert.equal(thursday?.opens, '09:30');
  assert.equal(thursday?.closes, '20:00');

  const value = { name: '</script><script>alert(1)</script>', text: '< & >' };
  const encoded = jsonLd(value);
  assert.ok(!encoded.includes('<'), 'JSON-LD must escape <');
  assert.deepEqual(JSON.parse(encoded), value);
});

test('route helper preserves query parameters and hashes with trailing-slash pathnames', () => {
  assert.equal(route('/treatments/?concern=redness'), '/treatments/?concern=redness');
  assert.equal(route('/treatments?concern=acne'), '/treatments/?concern=acne');
  assert.equal(route('/treatments/#mandelic-peel'), '/treatments/#mandelic-peel');
  assert.equal(route('/contact'), '/contact/');
});
