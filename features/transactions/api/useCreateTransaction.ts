import { toast } from "@/hooks/use-toast";
import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<typeof client.api.transactions.$post>;
type RequestType = InferRequestType<
  typeof client.api.transactions.$post
>["json"];

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.transactions.$post({ json });

      if (!response.ok) {
        const errorData = (await response.json()) as { error: string };
        throw new Error(errorData.error || "Failed to create transaction");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: "✅ Transaction created",
      });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    // TODO: Invalidate summery
    onError: (error) => {
      toast({
        title: `❌ ${error.message}`,
        variant: "destructive",
      });
    },
  });

  return mutation;
};
