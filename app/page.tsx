import { HomeAbout } from "@/app/_components/home/about/about";
import { HomeHero } from "@/app/_components/home/hero/hero";
import { HomePurchase } from "@/app/_components/home/purchase/purchase";

export default async function Home() {
  return (
    <>
      <HomeHero />
      <HomeAbout />
      <HomePurchase />
    </>
  );
}
