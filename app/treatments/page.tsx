import type { Metadata } from 'next';
import { TreatmentVessel } from '../../components/art/treatment-vessel';
import { EnquiryBand } from '../../components/enquiry-band';
import { PageHead } from '../../components/page-head';
import { TreatmentLedger } from '../../components/treatment-ledger';
import { concerns } from '../../content/concerns';
import { treatmentCategories, treatments } from '../../content/treatments';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Treatments',
  description:
    'Dispensary treatment ledger and GBP prices for clinical skin consultations, peels, medical microneedling, LED, IPL and acne programmes in Marylebone.',
  alternates: { canonical: absoluteUrl('/treatments/') },
};

export default function TreatmentsPage() {
  return (
    <>
      <PageHead
        eyebrow={`TREATMENTS · ${treatments.length} LISTED`}
        title="Treatments and prices"
        art={<TreatmentVessel category="peel" label="RX" className="h-32 w-32 sm:h-36 sm:w-36" />}
      >
        <p>
          Every treatment is clinician-led and begins with a 45-minute assessment. Filter by concern
          or read through the full dispensary ledger below.
        </p>
      </PageHead>

      <TreatmentLedger
        categories={treatmentCategories}
        treatments={treatments}
        concerns={concerns}
        pricingNote="Prices are per session in GBP. Your clinician confirms suitability and the final plan at consultation. Courses are paid per session, never in advance."
        suitabilityHeading="Patch tests and suitability"
        suitabilityBody="Treatments marked with a patch-test tag require a small test application at least 48 hours before your first session. IPL is offered for Fitzpatrick skin types I–IV only; mandelic peels, LED therapy and barrier protocols are tailored across skin types I–VI."
      />

      <EnquiryBand label="Enquire about a consultation">
        <EnquiryBand.Copy>
          <EnquiryBand.Kicker>NEXT STEP</EnquiryBand.Kicker>
          <EnquiryBand.Heading>Not sure which treatment fits your skin?</EnquiryBand.Heading>
          <EnquiryBand.Body>
            You do not need to pick a procedure beforehand. Start with a skin consultation enquiry
            and Dr Hale or Tomasz Wren will reply within two working days.
          </EnquiryBand.Body>
        </EnquiryBand.Copy>
        <EnquiryBand.Action>Enquire about a consultation</EnquiryBand.Action>
      </EnquiryBand>
    </>
  );
}
