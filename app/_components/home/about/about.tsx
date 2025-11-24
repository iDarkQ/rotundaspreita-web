import { FeatureAnalytics } from "@/app/_components/home/features/feature-analytics";
import { FeatureManyQuestions } from "@/app/_components/home/features/feature-many-questions";
import { FeatureTestMenu } from "@/app/_components/home/features/feature-test-menu";
import { Section } from "@/app/_components/section";
import { Blob1 } from "@/app/_components/svgs/blob-1";
import { Blob2 } from "@/app/_components/svgs/blob-2";
import { Blob4 } from "@/app/_components/svgs/blob-4";
import { PositionedBlob } from "@/app/_components/svgs/positioned-blob";
import { Text } from "@/app/_components/text";

export const HomeAbout = () => (
  <Section>
    <PositionedBlob align="right" className="w-100 h-100 top-[40vh] opacity-50">
      <Blob4 />
    </PositionedBlob>
    <PositionedBlob align="left" className="w-100 h-100 top-[90vh] opacity-50">
      <Blob2 />
    </PositionedBlob>
    <div className="flex flex-col gap-5 w-full z-1">
      <div className="flex flex-col gap-2 w-full">
        <Text as="h2" className="text-center">
          Como funciona
        </Text>
        <Text className="text-center">
          Trabalhe com ciclos curtos, métricas claras e automações inteligentes
          que identificam onde você precisa melhorar.
        </Text>
      </div>
      <div className="flex flex-col w-full gap-20">
        <FeatureTestMenu />
        <FeatureManyQuestions />
        <FeatureAnalytics />
      </div>
    </div>
  </Section>
);
