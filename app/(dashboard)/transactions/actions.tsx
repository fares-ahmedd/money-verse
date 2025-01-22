"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useConfirm from "@/hooks/useConfirm";
import { Edit, MoreVertical, Trash } from "lucide-react";
import { useOpenTransaction } from "@/features/transactions/hooks/useOpenTransaction";
import { useDeleteTransaction } from "@/features/transactions/api/useDeleteTransaction";

type Props = {
  id: string;
};
export const Actions = ({ id }: Props) => {
  const { onOpen } = useOpenTransaction();
  const [ConfirmationDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this transaction"
  );
  const { mutate: deleteTransaction, isPending: isDeleting } =
    useDeleteTransaction(id);
  const handleDelete = async () => {
    const ok = await confirm();
    if (ok) {
      deleteTransaction();
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
