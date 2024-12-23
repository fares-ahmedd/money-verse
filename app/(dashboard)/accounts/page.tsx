"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNewAccount } from "@/features/accounts/hooks/useNewAccount";
import { Plus } from "lucide-react";
import { columns, Payment } from "./columns";
import { DataTable } from "@/components/DataTable";

const data: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "728ed52f",
    amount: 50,
    status: "success",
    email: "a@example.com",
  },
  // ...
];
function AccountsPage() {
  const { onOpen } = useNewAccount();
  return (
    <div className="max-w-screen-2xl mx-auto pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Accounts page</CardTitle>
          <Button size={"sm"} onClick={onOpen}>
            <Plus />
            Add new account
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable filterKey="email" columns={columns} data={data} />
        </CardContent>
      </Card>
    </div>
  );
}

export default AccountsPage;
