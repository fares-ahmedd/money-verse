"use client";
import EditAccountSheet from "@/features/accounts/components/EditAccountSheet";
import NewAccountSheet from "@/features/accounts/components/NewAccountSheet";
import EditCategorySheet from "@/features/categories/components/EditCategorySheet";
import NewCategorySheet from "@/features/categories/components/NewCategorySheet";
import SubscriptionModal from "@/features/subscriptions/components/SubscriptionModal";
import EditTransactionSheet from "@/features/transactions/components/EditTransactionSheet";
import NewTransactionSheet from "@/features/transactions/components/NewTransactionSheet";
import { useMountedState } from "react-use";

function SheetProvider() {
  const isMounted = useMountedState();
  if (!isMounted) return null;
  return (
    <>
      <NewAccountSheet />
      <EditAccountSheet />

      <NewCategorySheet />
      <EditCategorySheet />

      <NewTransactionSheet />
      <EditTransactionSheet />

      <SubscriptionModal />
    </>
  );
}

export default SheetProvider;
