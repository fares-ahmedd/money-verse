import { useGetSubscription } from "../api/useGetSubscription";
import { useSubscriptionModal } from "./useSubscriptionModal";

export function usePaywall() {
  const { onOpen } = useSubscriptionModal();
  const { data: subscription, isLoading: isLoadingSubscription } =
    useGetSubscription();

  const shouldBlock = !subscription || subscription?.status === "expired";

  return {
    isLoading: isLoadingSubscription,
    shouldBlock,
    triggerPaywall: () => {
      onOpen();
    },
  };
}
