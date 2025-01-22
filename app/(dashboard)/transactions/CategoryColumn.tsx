import { useOpenCategory } from "@/features/categories/hooks/useOpenCategory";
import { useOpenTransaction } from "@/features/transactions/hooks/useOpenTransaction";
import { cn } from "@/lib/utils";
import { TriangleAlert } from "lucide-react";

type Props = {
  category: string | null;
  categoryId: string | null;
  id: string;
};

function CategoryColumn({ category, categoryId, id }: Props) {
  const { onOpen: onOpenCategory } = useOpenCategory();
  const { onOpen: OnOpenTransaction } = useOpenTransaction();
  const onClick = () => {
    if (categoryId) {
      onOpenCategory(categoryId);
    } else {
      OnOpenTransaction(id);
    }
  };
  return (
    <span
      className={cn(
        "flex items-center cursor-pointer hover:underline",
        !category && "text-rose-500"
      )}
      onClick={onClick}
      role="button"
    >
      {!category && <TriangleAlert className="mr-2 size-4 shrink-0" />}
      {category ?? "Uncategorized"}
    </span>
  );
}

export default CategoryColumn;
