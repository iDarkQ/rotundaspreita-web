import { Button } from "@/app/_components/button";
import { Card } from "@/app/_components/card";
import { Link } from "@/app/_components/link";
import { Text } from "@/app/_components/text";
import { Tooltip } from "@/app/_components/tooltip";
import { CategoryProgressDto } from "@/app/_lib/dtos/test-results/readiness.dto";
import { WEAK_AREA_THRESHOLD } from "@/app/_utils/readiness";
import clsx from "clsx";

interface Props {
  studyId: string;
  categories: CategoryProgressDto[];
}

const accuracyStyle = (accuracy: number) => {
  if (accuracy >= 70) return "bg-success-bg text-success";
  if (accuracy >= 40) return "bg-black/5 text-neutral";
  return "bg-error-bg text-error";
};

export const PanelCategoryProgress = ({ studyId, categories }: Props) => {
  if (categories.length === 0) return null;

  return (
    <Card className="gap-5" role="region" aria-label="Áreas exploradas">
      <div className="flex flex-col gap-1">
        <Text as="p">Áreas exploradas</Text>
        <Text className="text-sm opacity-70">
          Perguntas já vistas em cada tema e percentagem de acerto na última
          resposta.
        </Text>
      </div>

      <ul className="flex flex-col gap-5">
        {categories.map((category) => {
          const coverage = Math.round(
            (category.seen / Math.max(category.total, 1)) * 100,
          );
          const practiceParams = new URLSearchParams({
            s: studyId,
            c: category.category,
            d: "weak",
          });

          return (
            <li key={category.category} className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Text as="span" className="font-[800]">
                  {category.category}
                </Text>
                <div className="flex items-center gap-2">
                  <Text as="span" className="text-sm">
                    {category.seen}/{category.total} vistas
                  </Text>
                  {category.seen > 0 ? (
                    <span
                      className={clsx(
                        "rounded-full px-2 py-0.5 text-xs",
                        accuracyStyle(category.accuracy),
                      )}
                    >
                      {category.accuracy}% de acerto
                    </span>
                  ) : (
                    <span className="rounded-full bg-black/5 px-2 py-0.5 text-xs">
                      Por explorar
                    </span>
                  )}
                </div>
              </div>

              <div
                role="progressbar"
                aria-label={`Perguntas vistas em ${category.category}`}
                aria-valuemin={0}
                aria-valuemax={category.total}
                aria-valuenow={category.seen}
                className="h-3 w-full overflow-hidden rounded-full bg-black/10"
              >
                <div
                  className="bg-primary h-3 rounded-full"
                  style={{ width: `${coverage}%` }}
                />
              </div>

              {category.weak && (
                <div className="flex items-center gap-3">
                  <Link link={`/test?${practiceParams.toString()}`}>
                    <Button variant="contained" className="py-1">
                      <Text as="span" className="text-sm text-white!">
                        Praticar esta área
                      </Text>
                    </Button>
                  </Link>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </Card>
  );
};
