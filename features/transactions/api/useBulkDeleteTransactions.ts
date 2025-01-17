import { toast } from "@/hooks/use-toast";
import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<
  (typeof client.api.transactions)["bulk-delete"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.transactions)["bulk-delete"]["$post"]
>["json"];

export const useBulkDeleteTransactions = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.transactions["bulk-delete"]["$post"]({
        json,
      });

      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: "Transactions deleted",
      });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      // TODO: Invalidate Summery
    },
    onError: () => {
      toast({
        title: "❌ Failed to delete transactions",
        variant: "destructive",
      });
    },
  });

  return mutation;
};
