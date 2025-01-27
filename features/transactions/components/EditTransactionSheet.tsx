import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { insertTransactionSchema } from "@/db/schema";
import { z } from "zod";
import { Loader2 } from "lucide-react";

import useConfirm from "@/hooks/useConfirm";
import { useOpenTransaction } from "../hooks/useOpenTransaction";
import { useGetTransaction } from "../api/useGetTransaction";
import { useEditTransaction } from "../api/useEditTransaction";
import { useDeleteTransaction } from "../api/useDeleteTransaction";
import TransactionForm from "./TransactionForm";
import { useGetCategories } from "@/features/categories/api/useGetCategories";
import { useCreateCategory } from "@/features/categories/api/useCreateCategory";
import { useGetAccounts } from "@/features/accounts/api/useGetAccounts";
import { useCreateAccount } from "@/features/accounts/api/useCreateAccount";
import { convertAmountFromMelinite } from "@/lib/utils";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchema = insertTransactionSchema.omit({
  id: true,
});

export type FormValues = z.input<typeof formSchema>;

function EditTransactionSheet() {
  const { isOpen, onClose, id } = useOpenTransaction();
  const [ConfirmationDialog, confirm] = useConfirm(
    "Are you sure",
    "You are about to delete this transaction"
  );

  const { data: transaction, isLoading: isLoadingTransaction } =
    useGetTransaction(id);
  const { mutate: editTransaction, isPending: isEditingTransaction } =
    useEditTransaction(id);
  const { mutate: deleteTransaction, isPending: isDeletingTransaction } =
    useDeleteTransaction(id);

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

  const defaultValues = transaction
    ? {
        accountId: transaction.accountId,
        categoryId: transaction.categoryId,
        amount: convertAmountFromMelinite(transaction.amount).toString(),
        date: transaction.date ? new Date(transaction.date) : new Date(),
        payee: transaction.payee,
        notes: transaction.notes,
      }
    : {
        accountId: "",
        categoryId: "",
        amount: "",
        date: new Date(),
        payee: "",
        notes: "",
      };

  const onSubmit = (values: FormValues) => {
    editTransaction(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const handleDeleteTransaction = async () => {
    const ok = await confirm();
    if (ok) {
      deleteTransaction(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const isLoading =
    isLoadingTransaction || isLoadingCategories || isLoadingAccounts;

  const isPending =
    isEditingTransaction ||
    isDeletingTransaction ||
    isCreatingCategory ||
    isCreatingAccount;
  return (
    <>
      <ConfirmationDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Transaction</SheetTitle>
            <SheetDescription>Edit your transaction details </SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="animate-spin size-4 text-muted-foreground" />
            </div>
          ) : (
            <TransactionForm
              id={id}
              defaultValues={defaultValues}
              disabled={isPending}
              onSubmit={onSubmit}
              onDelete={handleDeleteTransaction}
              categoryOptions={categoryOptions}
              onCreateCategory={onCreateCategory}
              accountOptions={accountOptions}
              onCreateAccount={onCreateAccount}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}

export default EditTransactionSheet;
