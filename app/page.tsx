import { HomeAbout } from "@/app/_components/home/about/about";
import { HomeHero } from "@/app/_components/home/hero/hero";
import { HomePurchase } from "@/app/_components/home/purchase/purchase";
import { HomeTestimonials } from "@/app/_components/home/testimonials/home-testimonials";

export default async function Home() {
  return (
    <>
      <HomeHero />
      <HomeAbout />
      <HomeTestimonials />
      <HomePurchase />
    </>
  );
}
