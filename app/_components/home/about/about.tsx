import { AboutBlobs } from "@/app/_components/home/about/about-blobs";
import { AboutFeatureAnalytics } from "@/app/_components/home/about/about-features/about-feature-analytics";
import { AboutFeatureManyQuestions } from "@/app/_components/home/about/about-features/about-feature-many-questions";
import { AboutFeatureTestMenu } from "@/app/_components/home/about/about-features/about-feature-test-menu";
import { AboutHeading } from "@/app/_components/home/about/about-heading";
import { Section } from "@/app/_components/section";

export const HomeAbout = () => (
  <Section>
    <AboutBlobs />
    <AboutHeading />
    <div className="z-1 flex w-full flex-col gap-5">
      <div className="flex w-full flex-col gap-20">
        <AboutFeatureTestMenu />
        <AboutFeatureManyQuestions />
        <AboutFeatureAnalytics />
      </div>
    </div>
  </Section>
);
