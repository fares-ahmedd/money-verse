import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useNewAccount } from "../hooks/useNewAccount";
import AccountForm from "./AccountForm";
import { insertAccountSchema } from "@/db/schema";
import { z } from "zod";
import { useCreateAccount } from "../api/useCreateAccount";
const formSchema = insertAccountSchema.pick({
  name: true,
});

export type FormValues = z.input<typeof formSchema>;

function NewAccountSheet() {
  const { isOpen, onClose } = useNewAccount();
  const { mutate, isPending: isLoading } = useCreateAccount();
  const onSubmit = (values: FormValues) => {
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
          <SheetTitle>New Account</SheetTitle>
          <SheetDescription>
            Create a new account to track your transactions
          </SheetDescription>
        </SheetHeader>
        <AccountForm
          defaultValues={{ name: "" }}
          disabled={isLoading}
          onSubmit={onSubmit}
        />
      </SheetContent>
    </Sheet>
  );
}

export default NewAccountSheet;
