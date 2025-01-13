import { toast } from "@/hooks/use-toast";
import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<typeof client.api.categories.$post>;
type RequestType = InferRequestType<typeof client.api.categories.$post>["json"];

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.categories.$post({ json });

      if (!response.ok) {
        const errorData = (await response.json()) as { error: string };
        throw new Error(errorData.error || "Failed to create category");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: "✅ Category created",
      });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      toast({
        title: `❌ ${error.message}`,
        variant: "destructive",
      });
    },
  });

  return mutation;
};
