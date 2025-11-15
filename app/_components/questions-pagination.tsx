import { Divider } from "@/app/_components/divider";
import { PaginationItem } from "@/app/_components/pagination/pagination-item";

interface Props {
  count: number;
  page: number;
  selected?: boolean;
  onChange?: (page: number) => void;
}

export const QuestionsPagination = ({ count, page, onChange }: Props) => {
  return (
    <div className="flex flex-row w-full justify-center overflow-hidden gap-1">
      <PaginationItem
        type="previous"
        disabled={page <= 1}
        onClick={() => onChange?.(page - 1)}
      />
      <Divider orientation="vertical" />

      <div className="flex flex-row overflow-auto gap-1">
        {Array.from({ length: count }, (_, index) => (
          <PaginationItem
            key={index + 1}
            page={index + 1}
            selected={index + 1 === page}
            onClick={() => onChange?.(index + 1)}
          />
        ))}
      </div>
      <Divider orientation="vertical" />

      <PaginationItem
        type="next"
        onClick={() => onChange?.(page + 1)}
        disabled={page >= count}
      />
    </div>
  );
};
