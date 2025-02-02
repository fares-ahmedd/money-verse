import { toast } from "@/hooks/use-toast";
import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<
  (typeof client.api.plaid)["exchange-public-token"]["$post"],
  200
>;

type RequestType = InferRequestType<
  (typeof client.api.plaid)["exchange-public-token"]["$post"]
>["json"];

export const useExchangePublicToken = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.plaid["exchange-public-token"].$post({
        json,
      });

      if (!response.ok) {
        throw new Error("Failed to exchange public token");
      }
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: "public token exchanged",
      });
      queryClient.invalidateQueries({ queryKey: ["connected-bank"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: () => {
      toast({
        title: `Failed to exchange public token`,
        variant: "destructive",
      });
    },
  });

  return mutation;
};
