"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useMount } from "react-use";
import { useCreateLinkToken } from "../api/useCreateLinkToken";
import { usePlaidLink } from "react-plaid-link";
import { useExchangePublicToken } from "../api/useExchangePublicToken";
import { usePaywall } from "@/features/subscriptions/hooks/usePaywall";
function PlaidConnect() {
  const [token, setToken] = useState<string | null>(null);
  const { shouldBlock, triggerPaywall, isLoading } = usePaywall();

  const { mutate: createLinkToken, isPending: isCreating } =
    useCreateLinkToken();
  const { mutate: exchangePublicToken, isPending: isExchanging } =
    useExchangePublicToken();

  useMount(() => {
    createLinkToken(undefined, {
      onSuccess: ({ data }) => {
        setToken(data);
      },
    });
  });
  const plaid = usePlaidLink({
    token,
    onSuccess: (publicToken) => {
      exchangePublicToken({ publicToken });
    },
    env: "sandbox",
  });

  const onClick = () => {
    if (shouldBlock) {
      triggerPaywall();
      return;
    }
    if (plaid.ready) {
      plaid.open();
    }
  };

  const disabled =
    !token || isCreating || isExchanging || !plaid.ready || isLoading;

  return (
    <Button disabled={disabled} size={"sm"} variant={"ghost"} onClick={onClick}>
      Connect
    </Button>
  );
}

export default PlaidConnect;
