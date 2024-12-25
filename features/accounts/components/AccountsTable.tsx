"use client";
import { DataTable } from "@/components/DataTable";
import { useGetAccounts } from "../api/useGetAccounts";
import { columns } from "@/app/(dashboard)/accounts/columns";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

function AccountsTable() {
  const accountsQuery = useGetAccounts();
  const accounts = accountsQuery.data || [];

  if (accountsQuery.isLoading) {
    return (
      <div className="py-4 space-y-2">
        <div
          className="skeleton rounded-lg animate-pulse"
          style={{ height: "20px", maxWidth: "384px" }}
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

  return (
    <DataTable
      filterKey="email"
      columns={columns}
      data={accounts}
      onDelete={() => {}}
      disabled={false}
    />
  );
}

export default AccountsTable;
