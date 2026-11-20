import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import { business } from '../content/business.ts';

function collectFiles(dir: string, exts: string[]): string[] {
  if (!existsSync(dir)) return [];
  const results: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      results.push(...collectFiles(full, exts));
    } else if (exts.some((ext) => entry.endsWith(ext))) {
      results.push(full);
    }
  }
  return results;
}

const DISALLOWED_PATTERNS: Array<{ label: string; regex: RegExp }> = [
  { label: 'prescription-only medicine (botulinum / botox)', regex: /\b(botulinum|botox)\b/i },
  { label: 'prescription-only medicine (tretinoin / isotretinoin / hydroquinone)', regex: /\b(tretinoin|isotretinoin|hydroquinone)\b/i },
  { label: 'unqualified promise ("permanent")', regex: /\bpermanent\b/i },
  { label: 'booking claim ("book now")', regex: /\bbook\s+now\b/i },
  { label: 'standalone "Book" button/heading', regex: />\s*Book\s*</ },
];

function assertResponsibleText(sourceLabel: string, rawText: string) {
  // Strip the single explicit medical disclaimer ("no outcome is guaranteed") before checking for "guaranteed"
  const withoutDisclaimer = rawText.replace(/no outcome is\s+guaranteed/gi, '');
  assert.doesNotMatch(
    withoutDisclaimer,
    /\bguaranteed\b/i,
    `${sourceLabel}: must not claim guaranteed outcomes`,
  );
  for (const { label, regex } of DISALLOWED_PATTERNS) {
    assert.doesNotMatch(rawText, regex, `${sourceLabel}: contains disallowed ${label}`);
  }
}

test('source pages, components and content obey clinical wording standards', () => {
  const files = [
    ...collectFiles('app', ['.tsx', '.ts']),
    ...collectFiles('components', ['.tsx', '.ts']),
    ...collectFiles('content', ['.ts']),
  ];
  assert.ok(files.length > 0);
  for (const file of files) {
    const content = readFileSync(file, 'utf8');
    assertResponsibleText(file, content);
  }

  const resultsPage = readFileSync('app/results/page.tsx', 'utf8');
  assert.match(resultsPage, /Individual results vary/);

  const footer = readFileSync('components/site-footer.tsx', 'utf8');
  assert.match(footer, /18\+/);

  const contactPage = readFileSync('app/contact/page.tsx', 'utf8');
  assert.match(contactPage, /business\.email/);
  assert.match(business.enquiries.introduction, /Nothing is booked until/i);
});

test('built static HTML obeys responsible wording, shows disclaimers and keeps Contact email visible', () => {
  const htmlFiles = collectFiles('out', ['.html']);
  if (!htmlFiles.length) return; // Runs automatically after `npm run build`

  for (const file of htmlFiles) {
    const html = readFileSync(file, 'utf8');
    assertResponsibleText(file, html);
    // Every page carries the footer 18+ notice
    assert.match(html, /18\+/, `${file}: missing 18+ notice in footer`);
  }

  const resultsHtml = readFileSync('out/results/index.html', 'utf8');
  assert.match(resultsHtml, /Individual results vary/);
  assert.match(resultsHtml, /no outcome is\s+guaranteed/i);

  const contactHtml = readFileSync('out/contact/index.html', 'utf8');
  assert.ok(contactHtml.includes(business.email), 'Contact HTML must show the clinic email');
});
