"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetConnectedBank } from "@/features/plaid/api/useGetConnectedBank";
import PlaidConnect from "@/features/plaid/components/PlaidConnect";
import PlaidDisconnect from "@/features/plaid/components/PlaidDisconnect";
import SettingsSkeleton from "@/features/plaid/components/SettingsSkeleton";
import { useGetSubscription } from "@/features/subscriptions/api/useGetSubscription";
import SubscriptionCheckout from "@/features/subscriptions/components/SubscriptionCheckout";
import { cn } from "@/lib/utils";

function SettingsCard() {
  const { data: connectedBank, isLoading: isLoadingConnectedBank } =
    useGetConnectedBank();
  const { data: subscription, isLoading: isLoadingSubscription } =
    useGetSubscription();

  if (isLoadingConnectedBank || isLoadingSubscription) {
    return <SettingsSkeleton />;
  }
  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl line-clamp-1">Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <Separator />
        <div className="flex flex-col gap-y-2 lg:flex-row items-center py-4">
          <p className="text-sm font-medium w-full lg:w-[16.5rem]">
            Bank account
          </p>
          <div className="w-full flex items-center justify-between">
            <div
              className={cn(
                "text-sm truncate flex items-center",
                !connectedBank && "text-muted-foreground"
              )}
            >
              {connectedBank
                ? "Bank account connected"
                : "No bank account connected"}
            </div>
            {connectedBank ? <PlaidDisconnect /> : <PlaidConnect />}
          </div>
        </div>

        <Separator />
        <div className="flex flex-col gap-y-2 lg:flex-row items-center py-4">
          <p className="text-sm font-medium w-full lg:w-[16.5rem]">
            Subscription
          </p>
          <div className="w-full flex items-center justify-between">
            <div
              className={cn(
                "text-sm truncate flex items-center",
                !subscription && "text-muted-foreground"
              )}
            >
              {subscription
                ? `Subscription ${subscription.status}`
                : "No subscription active"}
            </div>
            <SubscriptionCheckout />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default SettingsCard;
