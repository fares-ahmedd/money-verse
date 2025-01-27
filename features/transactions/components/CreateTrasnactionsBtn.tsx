"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNewTransaction } from "../hooks/useNewTransaction";

function CreateTransactionBtn() {
  const { onOpen } = useNewTransaction();

  return (
    <Button size={"sm"} onClick={onOpen}>
      <Plus />
      Add new
    </Button>
  );
}

export default CreateTransactionBtn;
