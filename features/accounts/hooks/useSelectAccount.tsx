import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";
import { useRef, useState } from "react";
import { useGetAccounts } from "../api/useGetAccounts";
import { useCreateAccount } from "../api/useCreateAccount";
import Select from "@/components/Select";

export default function useSelectAccount(): [
  () => JSX.Element,
  () => Promise<unknown>
] {
  const { data: accounts, isLoading } = useGetAccounts();
  const { mutate: createAccount, isPending } = useCreateAccount();

  const selectValue = useRef<string>();

  const disabled = isLoading || isPending;
  const onCreateAccount = (name: string) => {
    createAccount({ name });
  };

  const accountsOptions = (accounts ?? []).map((account) => ({
    label: account.name,
    value: account.id,
  }));

  const [promise, setPromise] = useState<{
    resolve: (value: string | undefined) => void;
  } | null>(null);

  const confirm = () =>
    new Promise((resolve) => {
      setPromise({ resolve });
    });

  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(selectValue.current);
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(undefined);
    handleClose();
  };

  const ConfirmationDialog = () => (
    <Dialog open={promise !== null}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Account</DialogTitle>
          <DialogDescription>
            Please select an account to continue
          </DialogDescription>
        </DialogHeader>

        <Select
          placeholder="Select an account"
          options={accountsOptions}
          onCreate={onCreateAccount}
          onChange={(value) => (selectValue.current = value)}
          disabled={disabled}
        />

        <DialogFooter className="pt-2 gap-1">
          <Button onClick={handleCancel} variant={"outline"}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
  return [ConfirmationDialog, confirm];
}
