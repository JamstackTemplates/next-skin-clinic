# Porcelain Skin Clinic (`next-skin-clinic`)

A clinician-led skin clinic website template for Next.js static export, styled in the **Underglaze and Crackle** direction: porcelain grounds, cobalt underglaze rules, celadon glaze accents, bespoke inline SVG vessels and the signature **glaze gauge**.

All clinic details, clinicians, prices and case notes in this gallery template are fictitious. Replace them with your own details before publishing.

## Local preview

Local development requires Node 24 or later and npm.

```sh
npm ci
npm run dev
```

Run the full validation suite and static build:

```sh
npm run check
```

Preview the static export locally:

```sh
npm start
```

Project-path export preview (for testing base paths and canonical URLs):

```sh
PAGES_BASE_PATH=/preview PAGES_BASE_URL=https://owner.github.io/preview npm run build
npm start -- --base /preview --port 3000
```

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Home: porcelain dispensary shelf hero, concerns kiln shelf, featured glaze gauge, first-visit record card, featured jars, Marylebone visit band and `MedicalClinic` JSON-LD |
| `/treatments/` | Dispensary treatment ledger grouped by category with concern filter (`?concern=`), GBP pricing, patch-test tags and availability stamps |
| `/results/` | Five anonymised case notes with interactive week-by-week glaze gauge scrubbers and clinical disclaimers |
| `/consultation/` | Five-step consultation record form, £60 fee inclusions, clinicians (Dr Imogen Hale & Tomasz Wren), preparation checklist and native `<details>` FAQs |
| `/contact/` | Consultation enquiry page with hosted Jamstacks support form (when configured) or direct email fallback, hours with live `OpenBadge` and Google Map |
| `/404.html` | Cracked porcelain teacup error page with links to Home, Treatments and Contact |

## Where to edit content

| File | Owns |
| --- | --- |
| `content/treatments.ts` | Treatments, categories, durations, downtime, GBP `priceFrom` / `coursePrice`, `patchTest` flag, `availability` (`available`, `waitlist`, `paused`) and `availabilityNote` |
| `content/concerns.ts` | The six skin concern IDs, titles, descriptions and underglaze glyph keys |
| `content/results.ts` | Anonymised case notes, Fitzpatrick types, weeks, sessions, 0–10 clinician measures, summaries and clinician notes |
| `content/business.ts` | Clinic name, email, phone, Marylebone address, landmark, weekly `OpeningHours`, clinicians and Contact guidance copy |
| `app/page.tsx` | Home page headings, introduction and first-visit prose |
| `app/treatments/page.tsx` | Treatments page heading, pricing note and suitability side-panel copy |
| `app/results/page.tsx` | Results page heading, recording-method copy, required disclaimer and limits note |
| `app/consultation/page.tsx` | Consultation page heading, five process steps, £60 fee list, preparation checklist and FAQs |
| `app/contact/page.tsx` | Contact page layout, email fallback copy and map heading |
| `site.config.json` | Public site name, description, domain, IANA `timeZone` (`Europe/London`) and Jamstacks form ID/CDN |
| `app/tailwind.input.css` | Light ("glazed porcelain") and dark ("kiln at night") palette tokens, typography, craquelure texture, FAQ accordion and print rules |
| `lib/structured-data.ts` | `MedicalClinic` JSON-LD derived from `content/business.ts` |
| `app/sitemap.ts` | Static sitemap routes |

### Common owner edit: updating a treatment’s availability and price

To open **IPL for redness and pigmentation** from waitlist and update its session price:

1. Open `content/treatments.ts` and locate the entry with `id: 'ipl-redness'`.
2. Change `availability: 'waitlist'` to `availability: 'available'` and remove `availabilityNote`.
3. Change `priceFrom: 180` to `priceFrom: 190` (making sure `coursePrice` stays less than `priceFrom × sessions`).
4. Run `npm run check` to verify content rules, type safety and the static build.

After rebuilding, the **Waitlist** cobalt stamp disappears from the Treatments ledger, the row shows **from £190**, and the concern filter count for **Redness** remains accurate.

## Typography and licences

All fonts are self-hosted via npm packages with no third-party font CDN requests:

- **Gilda Display** (`@fontsource/gilda-display`, SIL Open Font License 1.1) — display headings and wordmark
- **Sora** (`@fontsource-variable/sora`, SIL Open Font License 1.1) — body prose and navigation
- **Geist Mono** (`@fontsource-variable/geist-mono`, SIL Open Font License 1.1) — kiln-tile specimen labels, prices and measures

## Public configuration and Contact form

`site.config.json` keeps the Jamstacks provisioner shape (`name`, `description`, `domain`, `timeZone`, `jamstacks.siteId`, `jamstacks.cdnUrl`, optional `provisioningId`). Never add private tokens or business content there.

| Environment variable | Public build-time meaning |
| --- | --- |
| `JAMSTACKS_SITE` | Website ID; blank retains file default, absent ID renders the direct email fallback |
| `NEXT_PUBLIC_JAMSTACKS_CDN_URL` | CDN asset base; default `https://cdn.jamstacks.net` |
| `NEXT_PUBLIC_SITE_DOMAIN` | Hostname overriding config domain |
| `SITE_TIME_ZONE` | IANA time zone overriding `site.config.json` (`Europe/London`) |
| `PAGES_BASE_PATH` | Project path such as `/preview`; blank for root/custom domain |
| `PAGES_BASE_URL` | Deployed Pages origin and path; takes precedence for canonical URLs |
| `JAMSTACKS_ALLOW_LOCAL_CDN` | Localhost-only CDN testing opt-in; rejected in GitHub Actions |

When `JAMSTACKS_SITE` is configured, `/contact/` renders one `<jamstacks-support-form>` host and one `{cdn}/sites/{siteId}/embed.js` bootstrap while keeping `hello@porcelainskinclinic.co.uk` visible. Without an ID, no embed script loads and the direct email fallback is shown. Contact navigation always uses full-document loads via `SiteLink`.

## Publishing assets

The `jamstacks/` directory holds gallery-only metadata and captures and can be deleted cleanly without affecting builds, tests or GitHub Pages. To verify gallery publishing metadata separately:

```sh
node --test jamstacks/config.test.mjs
```
