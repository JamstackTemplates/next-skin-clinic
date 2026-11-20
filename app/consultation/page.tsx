import type { Metadata } from 'next';
import { TreatmentVessel } from '../../components/art/treatment-vessel';
import {
  ClinicianPair,
  FaqSection,
  FeePanel,
  PreparationChecklist,
  ProcessRecord,
} from '../../components/consultation-sections';
import { EnquiryBand } from '../../components/enquiry-band';
import { PageHead } from '../../components/page-head';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Consultation',
  description:
    'How a 45-minute clinical skin consultation works at Porcelain Skin Clinic: five steps, £60 fee inclusions, our clinicians and common questions.',
  alternates: { canonical: absoluteUrl('/consultation/') },
};

export default function ConsultationPage() {
  return (
    <>
      <PageHead
        eyebrow="FIRST VISIT · 45 MINUTES"
        title="Your consultation, step by step"
        art={<TreatmentVessel category="consultation" className="h-32 w-32 sm:h-36 sm:w-36" />}
      >
        <p>
          We never rush straight to a procedure on the same afternoon. Every patient leaves their
          first visit with a clear written plan and time to decide in their own space.
        </p>
      </PageHead>

      <ProcessRecord>
        <ProcessRecord.Heading>Five stages from assessment to review</ProcessRecord.Heading>
        <ProcessRecord.Steps>
          <ProcessRecord.Step field="01" title="Skin history.">
            Medication, allergies, previous treatments and what you’d like to change.
          </ProcessRecord.Step>
          <ProcessRecord.Step field="02" title="Assessment.">
            A look under magnified daylight lamp and a skin-type check (Fitzpatrick I–VI).
          </ProcessRecord.Step>
          <ProcessRecord.Step field="03" title="Written plan.">
            Recommended treatments, number of sessions, downtime and costs, in writing.
          </ProcessRecord.Step>
          <ProcessRecord.Step field="04" title="Patch test and time to think.">
            A patch test where needed, and at least 48 hours before any first treatment.
          </ProcessRecord.Step>
          <ProcessRecord.Step field="05" title="Treatment and review.">
            Sessions as planned, with a review at the halfway point and the end.
          </ProcessRecord.Step>
        </ProcessRecord.Steps>
      </ProcessRecord>

      <FeePanel>
        <FeePanel.Figure
          amount="£60"
          caption="Redeemable against a first treatment within 60 days"
        />
        <FeePanel.Details>
          <FeePanel.Heading>What the consultation fee includes</FeePanel.Heading>
          <FeePanel.List>
            <li>• A full 45-minute appointment with Dr Imogen Hale or Tomasz Wren.</li>
            <li>• Magnified daylight skin assessment and Fitzpatrick I–VI classification.</li>
            <li>• A written treatment and home-care plan with itemised GBP pricing.</li>
            <li>• Any patch test required ahead of peels, barrier facials or light therapy.</li>
            <li>
              • £60 credited in full toward your first clinic treatment if you choose to proceed
              within 60 days — with no obligation to do so.
            </li>
          </FeePanel.List>
        </FeePanel.Details>
      </FeePanel>

      <ClinicianPair>
        <ClinicianPair.Heading>Who you’ll see</ClinicianPair.Heading>
      </ClinicianPair>

      <PreparationChecklist>
        <PreparationChecklist.Intro>Before you come</PreparationChecklist.Intro>
        <PreparationChecklist.List>
          <PreparationChecklist.Item>
            Arrive with bare skin if comfortable, or we can gently cleanse your face in clinic
            before assessment.
          </PreparationChecklist.Item>
          <PreparationChecklist.Item>
            Bring a short list (or phone photos of the labels) of your current cleanser, moisturiser,
            SPF and any prescribed creams or tablets.
          </PreparationChecklist.Item>
          <PreparationChecklist.Item>
            Pause strong exfoliating acids or at-home retinoids for 48 hours before your appointment
            if a patch test may be helpful.
          </PreparationChecklist.Item>
          <PreparationChecklist.Item>
            Let us know if you have had significant sun exposure or a recent facial procedure in the
            past two weeks.
          </PreparationChecklist.Item>
        </PreparationChecklist.List>
      </PreparationChecklist>

      <FaqSection>
        <FaqSection.Intro>Questions patients ask first</FaqSection.Intro>
        <FaqSection.List>
          <FaqSection.Item question="Do I need a consultation first?">
            Yes, for every course. Even if you have had peels, microneedling or light therapy
            elsewhere, we assess your skin and medical history in person before writing a plan.
          </FaqSection.Item>

          <FaqSection.Item question="Is it suitable for darker skin tones?">
            Yes. Plans are carefully adjusted for Fitzpatrick IV–VI — using gentler acids such as
            mandelic peel, LED phototherapy and measured microneedling where appropriate. IPL is not
            offered for Fitzpatrick V–VI due to pigment safety.
          </FaqSection.Item>

          <FaqSection.Item question="Can I come while pregnant?">
            You are very welcome for a consultation and gentle barrier-focused advice, though most
            active clinic treatments — including peels, microneedling and IPL — are postponed until
            after pregnancy and, where relevant, breastfeeding.
          </FaqSection.Item>

          <FaqSection.Item question="Do you treat under-18s?">
            No. Porcelain Skin Clinic sees adults aged 18 and over only.
          </FaqSection.Item>

          <FaqSection.Item question="What if I change my mind?">
            No deposit is taken for consultations by enquiry, and written plans carry no obligation.
            Every session is paid for individually on the day if you decide to go ahead.
          </FaqSection.Item>

          <FaqSection.Item question="Do you prescribe?">
            Only after an in-person consultation with Dr Hale, where clinically appropriate. No
            medicines are advertised or sold online.
          </FaqSection.Item>
        </FaqSection.List>
      </FaqSection>

      <EnquiryBand label="Enquire about a consultation">
        <EnquiryBand.Copy>
          <EnquiryBand.Kicker>READY WHEN YOU ARE</EnquiryBand.Kicker>
          <EnquiryBand.Heading>Arrange a calm first conversation.</EnquiryBand.Heading>
          <EnquiryBand.Body>
            Send us an enquiry with your main skin concern and preferred days. A clinician will
            reply within two working days.
          </EnquiryBand.Body>
        </EnquiryBand.Copy>
        <EnquiryBand.Action>Enquire about a consultation</EnquiryBand.Action>
      </EnquiryBand>
    </>
  );
}
