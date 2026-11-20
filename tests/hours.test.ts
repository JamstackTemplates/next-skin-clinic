import assert from 'node:assert/strict';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import { DAYS, openingLabel, validateHours, type OpeningHours } from '../lib/hours.ts';

const clinicAt = (isoUtc: string) => openingLabel(business.hours, 'Europe/London', new Date(isoUtc));

test('Porcelain Skin Clinic weekday boundaries: 09:30 open, 19:00 Tue/Wed close, 20:00 Thu close', () => {
  // Winter (GMT = UTC+0): Tuesday 2026-11-17
  assert.equal(clinicAt('2026-11-17T09:29:00Z'), 'Closed · opens today at 09:30');
  assert.equal(clinicAt('2026-11-17T09:30:00Z'), 'Open now · until 19:00');
  assert.equal(clinicAt('2026-11-17T18:59:00Z'), 'Open now · until 19:00');
  assert.equal(clinicAt('2026-11-17T19:00:00Z'), 'Closed · opens Wednesday at 09:30');

  // Thursday late evening close at 20:00: 2026-11-19 (GMT)
  assert.equal(clinicAt('2026-11-19T19:59:00Z'), 'Open now · until 20:00');
  assert.equal(clinicAt('2026-11-19T20:00:00Z'), 'Closed · opens Friday at 09:30');

  // Saturday 09:00–16:00: 2026-11-21 (GMT)
  assert.equal(clinicAt('2026-11-21T08:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(clinicAt('2026-11-21T09:00:00Z'), 'Open now · until 16:00');
  assert.equal(clinicAt('2026-11-21T16:00:00Z'), 'Closed · opens Tuesday at 09:30');
});

test('Monday and Sunday are closed and roll forward to Tuesday 09:30', () => {
  // Sunday 2026-11-22 (GMT)
  assert.equal(clinicAt('2026-11-22T12:00:00Z'), 'Closed · opens Tuesday at 09:30');
  // Monday 2026-11-23 (GMT)
  assert.equal(clinicAt('2026-11-23T11:00:00Z'), 'Closed · opens Tuesday at 09:30');
  // All-closed schedule stays safe
  assert.equal(openingLabel(DAYS.map((day) => ({ day })), 'Europe/London'), 'Closed · see opening hours');
});

test('UK DST transitions in Europe/London (last Sunday of March and October) preserve local clinic times', () => {
  // Spring forward: Sunday 2026-03-29 01:00 UTC (GMT → BST, UTC+1)
  // Saturday 2026-03-28 is still GMT: opens 09:00 UTC
  assert.equal(clinicAt('2026-03-28T08:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(clinicAt('2026-03-28T09:00:00Z'), 'Open now · until 16:00');
  // Sunday 2026-03-29 (DST switch day): closed -> Tuesday 09:30
  assert.equal(clinicAt('2026-03-29T10:00:00Z'), 'Closed · opens Tuesday at 09:30');
  // Tuesday 2026-03-31 is BST (UTC+1): 09:30 local = 08:30 UTC, 19:00 local = 18:00 UTC
  assert.equal(clinicAt('2026-03-31T08:29:00Z'), 'Closed · opens today at 09:30');
  assert.equal(clinicAt('2026-03-31T08:30:00Z'), 'Open now · until 19:00');
  assert.equal(clinicAt('2026-03-31T17:59:00Z'), 'Open now · until 19:00');
  assert.equal(clinicAt('2026-03-31T18:00:00Z'), 'Closed · opens Wednesday at 09:30');

  // Autumn fall back: Sunday 2026-10-25 01:00 UTC (BST → GMT, UTC+0)
  // Saturday 2026-10-24 is still BST (UTC+1): 09:00 local = 08:00 UTC
  assert.equal(clinicAt('2026-10-24T07:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(clinicAt('2026-10-24T08:00:00Z'), 'Open now · until 16:00');
  // Sunday 2026-10-25 (DST switch day): closed -> Tuesday 09:30
  assert.equal(clinicAt('2026-10-25T10:00:00Z'), 'Closed · opens Tuesday at 09:30');
  // Tuesday 2026-10-27 is GMT (UTC+0): 09:30 local = 09:30 UTC, 19:00 local = 19:00 UTC
  assert.equal(clinicAt('2026-10-27T09:29:00Z'), 'Closed · opens today at 09:30');
  assert.equal(clinicAt('2026-10-27T09:30:00Z'), 'Open now · until 19:00');
  assert.equal(clinicAt('2026-10-27T18:59:00Z'), 'Open now · until 19:00');
  assert.equal(clinicAt('2026-10-27T19:00:00Z'), 'Closed · opens Wednesday at 09:30');
});

test('missing or invalid zones stay neutral and bad intervals name the weekday to fix', () => {
  assert.equal(openingLabel(business.hours, '', new Date('2026-11-17T11:00:00Z')), 'See opening hours');
  assert.equal(openingLabel(business.hours, 'Mars/Base', new Date('2026-11-17T11:00:00Z')), 'See opening hours');
  assert.doesNotThrow(() => validateHours(business.hours));

  const sample: OpeningHours[] = [...business.hours];
  for (const opens of ['24:00', '9:30', '20:00']) {
    assert.throws(
      () => validateHours(sample.map((x) => (x.day === 'Tuesday' ? { ...x, opens } : x))),
      /Tuesday/,
    );
  }
  assert.throws(() => validateHours(sample.slice(1)), /Monday/);
  assert.throws(
    () => validateHours(sample.map((x) => (x.day === 'Tuesday' ? { ...x, closes: undefined } : x))),
    /Tuesday/,
  );
});
