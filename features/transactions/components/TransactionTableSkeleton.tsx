import { Loader2 } from "lucide-react";
import React from "react";

function TransactionTableSkeleton() {
  return (
    <div className="py-4 space-y-2">
      <div
        className="skeleton "
        style={{ height: "30px", maxWidth: "384px" }}
      ></div>
      <div
        style={{ height: "150px", display: "grid", placeItems: "center" }}
        className="border h-[150px]"
      >
        <Loader2
          className="animate-spin "
          style={{ height: "30px", width: "30px" }}
        />
      </div>
    </div>
  );
}

export default TransactionTableSkeleton;
