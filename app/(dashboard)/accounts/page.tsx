import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AccountsTable from "@/features/accounts/components/AccountsTable";
import AccountTableSkeleton from "@/features/accounts/components/AccountTableSkeleton";
import CreateAccountBtn from "@/features/accounts/components/CreateAccountBtn";
import { Suspense } from "react";

export const metadata = {
  title: "Accounts page",
};

function AccountsPage() {
  return (
    <div className="max-w-screen-2xl mx-auto pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 flex-row items-center justify-between">
          <CardTitle className="text-xl line-clamp-1">Accounts page</CardTitle>
          <CreateAccountBtn />
        </CardHeader>
        <CardContent>
          <Suspense fallback={<AccountTableSkeleton />}>
            <AccountsTable />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}

export default AccountsPage;
