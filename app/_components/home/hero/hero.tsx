import { HeroActions } from "@/app/_components/home/hero/hero-actions";
import { HeroBlobs } from "@/app/_components/home/hero/hero-blobs";
import { HeroDescription } from "@/app/_components/home/hero/hero-description";
import { HeroStatistics } from "@/app/_components/home/hero/hero-statistics";
import { HeroTitle } from "@/app/_components/home/hero/hero-title";
import { TestCard } from "@/app/_components/home/test-card";
import { Section } from "@/app/_components/section";

export const HomeHero = () => (
  <Section>
    <HeroBlobs />

    <div className="flex min-h-[65vh] items-center justify-center gap-10 max-xl:mt-20 max-xl:flex-col!">
      <div className="flex w-full flex-5 flex-col gap-5">
        <HeroTitle />
        <HeroDescription />
        <HeroActions />
        <HeroStatistics />
      </div>
      <div className="flex w-full flex-6 flex-col gap-5">
        <TestCard />
      </div>
    </div>
  </Section>
);
