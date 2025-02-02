"use client";

import { Button } from "@/components/ui/button";
import { useDeleteConnectedBank } from "../api/useDeleteConnectedBank";
import useConfirm from "@/hooks/useConfirm";

function PlaidDisconnect() {
  const [Dialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to disconnect this bank from your account."
  );
  const { mutate: deleteConnectedBank, isPending: isDeleting } =
    useDeleteConnectedBank();

  const onClick = async () => {
    const ok = await confirm();
    if (ok) {
      deleteConnectedBank();
    }
  };

  return (
    <>
      <Dialog />
      <Button
        disabled={isDeleting}
        size={"sm"}
        variant={"ghost"}
        onClick={onClick}
      >
        Disconnect
      </Button>
    </>
  );
}

export default PlaidDisconnect;
