import { Loader2 } from "lucide-react";
import React from "react";

function AccountTableSkeleton() {
  return (
    <div className="py-4 space-y-2">
      <div className="skeleton h-[30px] max-w-[384px]"></div>
      <div className="border h-[150px] grid place-items-center">
        <Loader2 className="animate-spin size-[30px]" />
      </div>
    </div>
  );
}

export default AccountTableSkeleton;
