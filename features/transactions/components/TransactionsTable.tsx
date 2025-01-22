"use client";
import { DataTable } from "@/components/DataTable";
import { useGetTransactions } from "@/features/transactions/api/useGetTransactions";
import TransactionTableSkeleton from "./TransactionTableSkeleton";
import { useBulkDeleteTransactions } from "../api/useBulkDeleteTransactions";
import { columns } from "@/app/(dashboard)/transactions/columns";

function TransactionsTable() {
  const { isLoading, data } = useGetTransactions();
  const { isPending, mutate: deleteTransactions } = useBulkDeleteTransactions();
  const transactions = data || [];

  const isDisabled = isLoading || isPending;

  if (isLoading) {
    return <TransactionTableSkeleton />;
  }

  return (
    <DataTable
      filterKey="payee"
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
