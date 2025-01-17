"use client";
import { DataTable } from "@/components/DataTable";
import { useGetAccounts } from "../api/useGetAccounts";
import { columns } from "@/app/(dashboard)/accounts/columns";
import AccountTableSkeleton from "./AccountTableSkeleton";
import { useBulkDeleteAccounts } from "../api/useBulkDeleteAccounts";

function AccountsTable() {
  const { isLoading, data } = useGetAccounts();
  const { isPending, mutate: deleteAccounts } = useBulkDeleteAccounts();
  const accounts = data || [];

  const isDisabled = isLoading || isPending;

  if (isLoading) {
    return <AccountTableSkeleton />;
  }

  return (
    <DataTable
      filterKey="name"
      columns={columns}
      data={accounts}
      onDelete={(row) => {
        const ids = row.map((r) => r.original.id);
        deleteAccounts({ ids });
      }}
      disabled={isDisabled}
    />
  );
}

export default AccountsTable;
