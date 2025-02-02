import { Button } from "@/components/ui/button";
import { useCheckoutSubscription } from "../api/useCheckoutSubscription";
import { useGetSubscription } from "../api/useGetSubscription";

function SubscriptionCheckout() {
  const { mutate: checkout, isPending: isChecking } = useCheckoutSubscription();
  const { data: subscription, isLoading: isLoadingSubscription } =
    useGetSubscription();

  return (
    <Button
      onClick={() => checkout()}
      disabled={isChecking || isLoadingSubscription}
      variant="ghost"
      size="sm"
    >
      {subscription ? "Mange" : "Upgrade"}
    </Button>
  );
}

export default SubscriptionCheckout;
