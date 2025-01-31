import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { insertCategorySchema } from "@/db/schema";
import { z } from "zod";
import { Loader2 } from "lucide-react";

import useConfirm from "@/hooks/useConfirm";
import { useOpenCategory } from "../hooks/useOpenCategory";
import { useGetCategory } from "../api/useGetCategory";
import { useEditCategory } from "../api/useEditCategory";
import { useDeleteCategory } from "../api/useDeleteCategory";
import CategoryForm from "./CategoryForm";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchema = insertCategorySchema.pick({
  name: true,
});

export type FormValues = z.input<typeof formSchema>;

function EditCategorySheet() {
  const { isOpen, onClose, id } = useOpenCategory();
  const [ConfirmationDialog, confirm] = useConfirm(
    "Are you sure",
    "You are about to delete this category"
  );
  const { data: category, isLoading: isLoadingCategory } = useGetCategory(id);
  const { mutate: editCategory, isPending: isEditing } = useEditCategory(id);
  const { mutate: deleteCategory, isPending: isDeleting } =
    useDeleteCategory(id);
  const defaultValues = category
    ? {
        name: category.name,
      }
    : { name: "" };
  const onSubmit = (values: FormValues) => {
    editCategory(values, {
      onSettled: () => {
        onClose();
      },
    });
  };

  const handelDeleteCategory = async () => {
    const ok = await confirm();
    if (ok) {
      deleteCategory(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };
  return (
    <>
      <ConfirmationDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit category</SheetTitle>
            <SheetDescription>Edit your category</SheetDescription>
          </SheetHeader>
          {isLoadingCategory ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="animate-spin size-4 text-muted-foreground" />
            </div>
          ) : (
            <CategoryForm
              defaultValues={defaultValues}
              disabled={isEditing || isDeleting}
              onSubmit={onSubmit}
              onDelete={handelDeleteCategory}
              id={id}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}

export default EditCategorySheet;
