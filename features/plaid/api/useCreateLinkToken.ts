import { toast } from "@/hooks/use-toast";
import { client } from "@/lib/hono";
import { useMutation } from "@tanstack/react-query";
import { InferResponseType } from "hono";

type ResponseType = InferResponseType<
  (typeof client.api.plaid)["create-link-token"]["$post"],
  200
>;

export const useCreateLinkToken = () => {
  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.plaid["create-link-token"].$post();

      if (!response.ok) {
        throw new Error("Failed to create link token");
      }
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: "Link token created",
      });
    },
    onError: () => {
      toast({
        title: `Failed to create link token`,
        variant: "destructive",
      });
    },
  });

  return mutation;
};
