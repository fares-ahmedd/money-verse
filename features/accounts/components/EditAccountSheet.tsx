import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import AccountForm from "./AccountForm";
import { insertAccountSchema } from "@/db/schema";
import { z } from "zod";
import { useOpenAccount } from "@/hooks/useOpenAccount";
import { useGetAccount } from "../api/useGetAccount";
import { Loader2 } from "lucide-react";
import { useEditAccount } from "../api/useEditAccount";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchema = insertAccountSchema.pick({
  name: true,
});

export type FormValues = z.input<typeof formSchema>;

function EditAccountSheet() {
  const { isOpen, onClose, id } = useOpenAccount();

  const { data: account, isLoading: isLoadingAccount } = useGetAccount(id);
  const { mutate: editAccount, isPending: isEditing } = useEditAccount(id);
  const defaultValues = account
    ? {
        name: account.name,
      }
    : { name: "" };
  const onSubmit = (values: FormValues) => {
    editAccount(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>Edit Account</SheetTitle>
          <SheetDescription>Edit your account</SheetDescription>
        </SheetHeader>
        {isLoadingAccount ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="animate-spin size-4 text-muted-foreground" />
          </div>
        ) : (
          <AccountForm
            defaultValues={defaultValues}
            disabled={isEditing}
            onSubmit={onSubmit}
            id={id}
          />
        )}
      </SheetContent>
    </Sheet>
  );
}

export default EditAccountSheet;
