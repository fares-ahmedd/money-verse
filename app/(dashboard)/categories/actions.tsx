"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteCategory } from "@/features/categories/api/useDeleteCategory";
import { useOpenCategory } from "@/features/categories/hooks/useOpenCategory";
import useConfirm from "@/hooks/useConfirm";
import { Edit, MoreVertical, Trash } from "lucide-react";

type Props = {
  id: string;
};
export const Actions = ({ id }: Props) => {
  const { onOpen } = useOpenCategory();
  const [ConfirmationDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this category"
  );
  const { mutate: deleteCategory, isPending: isDeleting } =
    useDeleteCategory(id);
  const handleDelete = async () => {
    const ok = await confirm();
    if (ok) {
      deleteCategory();
    }
  };
  return (
    <>
      <ConfirmationDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="size-8 p-0">
            <MoreVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          <DropdownMenuItem onClick={() => onOpen(id)} disabled={isDeleting}>
            <Edit />
            Edit
          </DropdownMenuItem>{" "}
          <DropdownMenuItem onClick={handleDelete} disabled={isDeleting}>
            <Trash />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
