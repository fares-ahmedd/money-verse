import { Loader2 } from "lucide-react";
import React from "react";

function CategoryTableSkeleton() {
  return (
    <div className="py-4 space-y-2">
      <div className="skeleton rounded-lg animate-pulse h-[30px] max-w-[384px]"></div>
      <div className="border h-[150px] grid place-items-center">
        <Loader2 className="animate-spin size-[30px] " />
      </div>
    </div>
  );
}

export default CategoryTableSkeleton;
