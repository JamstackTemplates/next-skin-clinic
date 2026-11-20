import type { Metadata } from 'next';
import {
  ConcernsShelf,
  FeaturedJars,
  FirstVisit,
  GlazeFeature,
  Hero,
  VisitBand,
} from '../components/home-sections';
import { business } from '../content/business';
import { absoluteUrl } from '../lib/paths';
import { businessStructuredData, jsonLd } from '../lib/structured-data';

export const metadata: Metadata = {
  description: business.introduction,
  alternates: { canonical: absoluteUrl('/') },
};

export default function HomePage() {
  return (
    <>
      <Hero>
        <Hero.Heading>Calm, clinical care for skin that needs a plan.</Hero.Heading>
        <Hero.Introduction>
          Every course at Porcelain begins with a consultation with a clinician, and a written plan
          you can take home and think over.
        </Hero.Introduction>
        <Hero.Actions>
          <Hero.PrimaryAction>Enquire about a consultation</Hero.PrimaryAction>
          <Hero.SecondaryAction>See treatments and prices</Hero.SecondaryAction>
        </Hero.Actions>
      </Hero>

      <ConcernsShelf>
        <ConcernsShelf.Heading>What brings you in?</ConcernsShelf.Heading>
        <ConcernsShelf.Intro>
          Select a concern to filter our dispensary ledger. Each course is shaped around your skin
          type, history and daily routine rather than a fixed menu.
        </ConcernsShelf.Intro>
      </ConcernsShelf>

      <GlazeFeature>
        <GlazeFeature.Heading>Measured change, recorded under the same light.</GlazeFeature.Heading>
        <GlazeFeature.Intro>
          Skin settles in stages, never overnight. We grade each concern on a 0–10 clinical scale at
          baseline, midpoint and review so you can see quiet progress across weeks.
        </GlazeFeature.Intro>
      </GlazeFeature>

      <FirstVisit>
        <FirstVisit.Heading>How a first visit works</FirstVisit.Heading>
        <FirstVisit.Steps>
          <FirstVisit.Step number="01" title="Skin history">
            Medication, allergies, previous treatments and what you would like to change, talked
            through without rush.
          </FirstVisit.Step>
          <FirstVisit.Step number="02" title="Daylight assessment">
            An unhurried look under a magnified daylight lamp alongside a Fitzpatrick I–VI skin-type
            check.
          </FirstVisit.Step>
          <FirstVisit.Step number="03" title="Written plan">
            Recommended treatments, expected session count, downtime and full GBP costs handed to
            you in writing.
          </FirstVisit.Step>
          <FirstVisit.Step number="04" title="Patch test and time to think">
            A patch test wherever needed, plus at least 48 hours away from the clinic before any
            first treatment begins.
          </FirstVisit.Step>
        </FirstVisit.Steps>
      </FirstVisit>

      <FeaturedJars>
        <FeaturedJars.Heading>Four places most courses begin</FeaturedJars.Heading>
        <FeaturedJars.Intro>
          Every treatment is paid per session, never in advance. Your clinician confirms suitability
          and spacing at consultation before anything starts.
        </FeaturedJars.Intro>
      </FeaturedJars>

      <VisitBand>
        <VisitBand.Heading>A quiet first-floor clinic off Bentinck Mews.</VisitBand.Heading>
      </VisitBand>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(businessStructuredData()) }}
      />
    </>
  );
}
