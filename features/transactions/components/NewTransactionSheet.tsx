import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { insertTransactionSchema } from "@/db/schema";
import { z } from "zod";
import { useCreateTransaction } from "../api/useCreateTransaction";
import { useNewTransaction } from "../hooks/useNewTransaction";
import { useCreateCategory } from "@/features/categories/api/useCreateCategory";
import { useGetCategories } from "@/features/categories/api/useGetCategories";
import { useGetAccounts } from "@/features/accounts/api/useGetAccounts";
import { useCreateAccount } from "@/features/accounts/api/useCreateAccount";
import TransactionForm from "./TransactionForm";
import { Loader2 } from "lucide-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchema = insertTransactionSchema.omit({
  id: true,
});

export type FormValues = z.input<typeof formSchema>;

function NewTransactionSheet() {
  const { isOpen, onClose } = useNewTransaction();
  const { mutate, isPending: isCreatingTransaction } = useCreateTransaction();

  // ! categories
  const { data: categories, isLoading: isLoadingCategories } =
    useGetCategories();
  const { mutate: createCategory, isPending: isCreatingCategory } =
    useCreateCategory();
  const onCreateCategory = (name: string) => {
    createCategory({ name });
  };
  const categoryOptions = (categories ?? []).map((category) => ({
    label: category.name,
    value: category.id,
  }));

  // ! accounts
  const { data: accounts, isLoading: isLoadingAccounts } = useGetAccounts();
  const { mutate: createAccount, isPending: isCreatingAccount } =
    useCreateAccount();
  const onCreateAccount = (name: string) => {
    createAccount({ name });
  };
  const accountOptions = (accounts ?? []).map((account) => ({
    label: account.name,
    value: account.id,
  }));

  const onSubmit = (values: FormValues) => {
    mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const isPending =
    isCreatingAccount || isCreatingCategory || isCreatingTransaction;

  const isLoading = isLoadingAccounts || isLoadingCategories;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New transaction</SheetTitle>
          <SheetDescription>
            Add a new transaction to your account
          </SheetDescription>
        </SheetHeader>

        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-4 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <TransactionForm
            onSubmit={onSubmit}
            disabled={isPending}
            categoryOptions={categoryOptions}
            onCreateCategory={onCreateCategory}
            accountOptions={accountOptions}
            onCreateAccount={onCreateAccount}
          />
        )}
      </SheetContent>
    </Sheet>
  );
}

export default NewTransactionSheet;
