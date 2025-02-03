import { toast } from "@/hooks/use-toast";
import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";

type ResponseType = InferResponseType<
  (typeof client.api.subscriptions.checkout)["$post"],
  200
>;

export const useCheckoutSubscription = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.subscriptions.checkout.$post();

      if (!response.ok) {
        throw new Error("Failed to create URL");
      }
      return await response.json();
    },
    onSuccess: ({ data }) => {
      window.location.href = data;
      queryClient.invalidateQueries({ queryKey: ["connected-bank"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: () => {
      toast({
        title: `Failed to create URL`,
        variant: "destructive",
      });
    },
  });

  return mutation;
};
