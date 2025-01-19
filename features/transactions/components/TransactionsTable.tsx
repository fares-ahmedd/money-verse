"use client";
import { columns } from "@/app/(dashboard)/accounts/columns";
import { DataTable } from "@/components/DataTable";
import { useBulkCreateTransactions } from "@/features/transactions/api/useBulkCreateTransactions";
import { useGetTransactions } from "@/features/transactions/api/useGetTransactions";
import TransactionTableSkeleton from "./TransactionTableSkeleton";

function TransactionsTable() {
  const { isLoading, data } = useGetTransactions();
  const { isPending, mutate: deleteTransactions } = useBulkCreateTransactions();
  const transactions = data || [];

  const isDisabled = isLoading || isPending;

  if (isLoading) {
    return <TransactionTableSkeleton />;
  }

  return (
    <DataTable
      filterKey="name"
      columns={columns}
      data={transactions}
      onDelete={(row) => {
        const ids = row.map((r) => r.original.id);
        deleteTransactions({ ids });
      }}
      disabled={isDisabled}
    />
  );
}

export default TransactionsTable;
