import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ImportTransactionsBtn from "@/features/transactions/components/ImportTransactionsBtn";
import CreateTransactionBtn from "@/features/transactions/components/CreateTrasnactionsBtn";
import TransactionsTable from "@/features/transactions/components/TransactionsTable";

export const metadata = {
  title: "Transactions page",
};

function TransactionsPage() {
  return (
    <div className="max-w-screen-2xl mx-auto pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 flex-row items-center justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Transactions History
          </CardTitle>
          <div className="flex items-center gap-2">
            <CreateTransactionBtn />
            <ImportTransactionsBtn />
          </div>
        </CardHeader>
        <CardContent>
          <TransactionsTable />
        </CardContent>
      </Card>
    </div>
  );
}

export default TransactionsPage;
