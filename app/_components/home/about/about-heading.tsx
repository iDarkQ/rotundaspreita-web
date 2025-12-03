import { AboutHeadingDescription } from "@/app/_components/home/about/about-heading-description";
import { AboutHeadingTitle } from "@/app/_components/home/about/about-heading-title";

export const AboutHeading = () => (
  <div className="flex w-full flex-col gap-2">
    <AboutHeadingTitle />
    <AboutHeadingDescription />
  </div>
);
