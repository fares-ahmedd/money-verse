import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TransactionsTable from "@/features/accounts/components/AccountsTable";
import CreateTransactionBtn from "@/features/transactions/components/CreateTrasnactionsBtn";

export const metadata = {
  title: "Accounts page",
};

function TransactionsPage() {
  return (
    <div className="max-w-screen-2xl mx-auto pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 flex-row items-center justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Transactions History
          </CardTitle>
          <CreateTransactionBtn />
        </CardHeader>
        <CardContent>
          <TransactionsTable />
        </CardContent>
      </Card>
    </div>
  );
}

export default TransactionsPage;
