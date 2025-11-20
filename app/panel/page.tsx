"use client";

import { Button } from "@/app/_components/button";
import { Card } from "@/app/_components/card";
import { Link } from "@/app/_components/link";
import { Section } from "@/app/_components/section";
import { StatisticsCard } from "@/app/_components/statistics-card";
import { Blob1 } from "@/app/_components/svgs/blob-1";
import { Blob4 } from "@/app/_components/svgs/blob-4";
import { PositionedBlob } from "@/app/_components/svgs/positioned-blob";
import { Text } from "@/app/_components/text";
import { fetchLoggedUser } from "@/app/_server/fetch-logged-user";
import { notFound } from "next/navigation";
import { PageTestMenu } from "@/app/panel/page-test-menu";

export default async function Panel() {
  const user = await fetchLoggedUser();

  if (!user) {
    notFound();
  }

  return (
    <Section>
      <PositionedBlob align="left" className="w-100 h-100 top-[90%]">
        <Blob1 />
      </PositionedBlob>
      <PositionedBlob align="right" className="w-100 h-100 top-[10%]">
        <Blob4 />
      </PositionedBlob>
      <div className="w-full flex flex-col items-start gap-5">
        <div>
          <Text as="p" className="text-primary!">
            Welcome back, Łukasz
          </Text>
          <Text as="h1">Let&apos;s Practice!</Text>
        </div>
        <PageTestMenu />
      </div>
      <div className="grid grid-cols-4 gap-5 w-full">
        <StatisticsCard
          name="Tests Completed"
          value="0"
          className="col-span-1"
        />
        <StatisticsCard
          name="Questions Viewed"
          value="0"
          className="col-span-1"
        />
        <StatisticsCard
          name="Correct Answers"
          value="0"
          className="col-span-1 w-full"
        />
        <StatisticsCard name="Wrong Answers" value="0" className="col-span-1" />
      </div>
      <div className="grid grid-cols-2 gap-5 w-full">
        <Card className="flex items-center justify-center col-span-1">
          <Text>Chart Placeholder</Text>
        </Card>
        <Card className="flex items-center justify-center col-span-1">
          <Text>Chart Placeholder</Text>
        </Card>
      </div>
    </Section>
  );
}
