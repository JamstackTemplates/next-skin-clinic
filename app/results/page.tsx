import type { Metadata } from 'next';
import { EnquiryBand } from '../../components/enquiry-band';
import { PageHead } from '../../components/page-head';
import {
  CaseTileList,
  RecordingMethod,
  ResultsDisclaimer,
  ResultsLimits,
} from '../../components/results-sections';
import { caseNotes } from '../../content/results';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Results',
  description:
    'Anonymised case notes from Porcelain Skin Clinic showing measured progress over weeks across redness, adult acne, melasma, rolling scars and dehydration.',
  alternates: { canonical: absoluteUrl('/results/') },
};

export default function ResultsPage() {
  return (
    <>
      <PageHead
        eyebrow={`CASE NOTES · ${caseNotes.length} RECORDED`}
        title="Results, written up honestly"
        art={
          <svg
            viewBox="0 0 156 132"
            className="block h-32 w-36 sm:h-36 sm:w-40"
            aria-hidden="true"
          >
            {/* Resting porcelain kiln test tile standing on a cobalt shelf line */}
            <line x1="10" y1="122" x2="146" y2="122" stroke="var(--primary-ink)" strokeWidth="1.25" />
            <line x1="18" y1="126" x2="138" y2="126" stroke="var(--primary-ink)" strokeWidth="0.7" opacity="0.5" />
            <g transform="rotate(-8 78 68)">
              <rect
                x="18"
                y="26"
                width="120"
                height="82"
                rx="3"
                fill="var(--bisque)"
                stroke="var(--primary-ink)"
                strokeWidth="1.4"
              />
              {/* Celadon dipped right half */}
              <rect x="78" y="27" width="59" height="80" rx="2" fill="var(--celadon)" opacity="0.85" />
              {/* Crackle left half */}
              <path
                d="M24 44 L44 58 L32 82 M44 58 L64 46 L58 76 L72 96 M26 92 L48 86"
                fill="none"
                stroke="var(--crackle-stroke)"
                strokeWidth="1.15"
                strokeLinecap="round"
              />
              {/* Cobalt session ticks */}
              <line x1="48" y1="26" x2="48" y2="36" stroke="var(--primary-ink)" strokeWidth="1.4" />
              <line x1="78" y1="26" x2="78" y2="38" stroke="var(--primary-ink)" strokeWidth="1.5" />
              <line x1="108" y1="26" x2="108" y2="36" stroke="var(--primary-ink)" strokeWidth="1.4" />
              {/* Crescent glaze sheen */}
              <path d="M88 38 C98 35 116 35 128 38" fill="none" stroke="var(--sheen)" strokeWidth="2.4" strokeLinecap="round" />
              <text
                x="78"
                y="98"
                textAnchor="middle"
                fill="var(--primary-ink)"
                fontFamily="var(--font-mono)"
                fontSize="8.5"
                letterSpacing="1.6"
              >
                WK 0 → WK 14
              </text>
            </g>
          </svg>
        }
      >
        <p>
          How five representative courses unfolded over ten to twenty weeks, including what settled
          and what still needs steady maintenance.
        </p>
      </PageHead>

      <RecordingMethod>
        <RecordingMethod.Intro>How we record results</RecordingMethod.Intro>
        <RecordingMethod.Columns>
          <RecordingMethod.Column title="Clinician-graded scales">
            Each concern is scored on a plain 0–10 clinical scale at baseline, halfway through the
            course and at end-of-plan review rather than relying on memory.
          </RecordingMethod.Column>
          <RecordingMethod.Column title="Written consent">
            No case note is published without separate written consent. Identifying details are
            removed, leaving only decade age band and Fitzpatrick skin type.
          </RecordingMethod.Column>
          <RecordingMethod.Column title="Same daylight lamp">
            Every review takes place in the same room under calibrated north-facing daylight lamps
            so tone, redness and texture are compared honestly.
          </RecordingMethod.Column>
        </RecordingMethod.Columns>
      </RecordingMethod>

      <ResultsDisclaimer>
        Illustrated summaries of real-style case notes. Individual results vary, and no outcome is
        guaranteed. Cases are shared with written consent and anonymised.
      </ResultsDisclaimer>

      <CaseTileList />

      <ResultsLimits>
        <ResultsLimits.Heading>What results can’t tell you</ResultsLimits.Heading>
        <ResultsLimits.Body>
          A case note shows how one person’s skin responded under a specific plan, season and home
          routine — never a promise of what yours will do. Skin biology, hormones, medication, sun
          exposure and barrier sensitivity all shift the pace of change. During your consultation,
          we talk plainly about realistic boundaries before you decide whether to go ahead.
        </ResultsLimits.Body>
      </ResultsLimits>

      <EnquiryBand label="Enquire about a consultation" tone="porcelain">
        <EnquiryBand.Copy>
          <EnquiryBand.Kicker>START WITH AN ASSESSMENT</EnquiryBand.Kicker>
          <EnquiryBand.Heading>Want a realistic view of your own skin?</EnquiryBand.Heading>
          <EnquiryBand.Body>
            Send a brief note about your main concern and a clinician will suggest consultation
            times within two working days.
          </EnquiryBand.Body>
        </EnquiryBand.Copy>
        <EnquiryBand.Action>Enquire about a consultation</EnquiryBand.Action>
      </EnquiryBand>
    </>
  );
}
