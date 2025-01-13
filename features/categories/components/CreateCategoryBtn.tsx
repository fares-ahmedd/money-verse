"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNewCategory } from "../hooks/useNewCategory";

function CreateCategoryBtn() {
  const { onOpen } = useNewCategory();

  return (
    <Button size={"sm"} onClick={onOpen}>
      <Plus />
      Add new category
    </Button>
  );
}

export default CreateCategoryBtn;
