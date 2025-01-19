"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteAccount } from "@/features/accounts/api/useDeleteAccount";
import useConfirm from "@/hooks/useConfirm";
import { useOpenAccount } from "@/features/accounts/hooks/useOpenAccount";
import { Edit, MoreVertical, Trash } from "lucide-react";

type Props = {
  id: string;
};
export const Actions = ({ id }: Props) => {
  const { onOpen } = useOpenAccount();
  const [ConfirmationDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this account"
  );
  const { mutate: deleteAccount, isPending: isDeleting } = useDeleteAccount(id);
  const handleDelete = async () => {
    const ok = await confirm();
    if (ok) {
      deleteAccount();
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
