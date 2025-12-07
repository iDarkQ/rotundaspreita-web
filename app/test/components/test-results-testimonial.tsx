import { TestTestimonialDialog } from "@/app/test/components/dialogs/test-testimonial-dialog";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

interface Props {
  finished: boolean;
  percentage: number;
}

export const TestResultsTestimonial = ({ finished, percentage }: Props) => {
  const [openTestimonial, setOpenTestimonial] = useState<boolean | undefined>();

  const shouldOpenTestimonial = finished && percentage > 90 && openTestimonial;

  const delayNextTestimonial = async () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "lastTestimonial",
        dayjs().add(12, "hours").toISOString(),
      );
    }

    setOpenTestimonial(false);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const lastTestimonialISO = localStorage.getItem("lastTestimonial");
      if (!lastTestimonialISO) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setOpenTestimonial(true);
        return;
      }

      const lastTestimonial = dayjs(lastTestimonialISO);

      setOpenTestimonial(dayjs(lastTestimonial).isBefore(dayjs()));
    }
  }, []);

  if (!shouldOpenTestimonial) return;

  return <TestTestimonialDialog onClose={delayNextTestimonial} />;
};
