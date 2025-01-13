import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AccountsTable from "@/features/accounts/components/AccountsTable";
import CreateAccountBtn from "@/features/accounts/components/CreateAccountBtn";

function CategoriesPage() {
  return (
    <div className="max-w-screen-2xl mx-auto pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 flex-row items-center justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Categories page
          </CardTitle>
          <CreateAccountBtn />
        </CardHeader>
        <CardContent>
          <AccountsTable />
        </CardContent>
      </Card>
    </div>
  );
}

export default CategoriesPage;
