import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { insertCategorySchema } from "@/db/schema";
import { z } from "zod";
import { useCreateCategory } from "../api/useCreateCategory";
import { useNewCategory } from "../hooks/useNewCategory";
import CategoryForm from "./CategoryForm";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchema = insertCategorySchema.pick({
  name: true,
});

export type FormValues = z.input<typeof formSchema>;

function NewCategorySheet() {
  const { isOpen, onClose } = useNewCategory();
  const { mutate, isPending: isCreating } = useCreateCategory();
  const onSubmit = (values: FormValues) => {
    if (!values.name.trim()) return;
    mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New category</SheetTitle>
          <SheetDescription>
            Create a new category to organize your transactions
          </SheetDescription>
        </SheetHeader>
        <CategoryForm
          defaultValues={{ name: "" }}
          disabled={isCreating}
          onSubmit={onSubmit}
        />
      </SheetContent>
    </Sheet>
  );
}

export default NewCategorySheet;
