"use client";

import { Button } from "@/components/ui/button";
import { useNewAccount } from "../hooks/useNewCategory";
import { Plus } from "lucide-react";

function CreateAccountBtn() {
  const { onOpen } = useNewAccount();

  return (
    <Button size={"sm"} onClick={onOpen}>
      <Plus />
      Add new account
    </Button>
  );
}

export default CreateAccountBtn;
