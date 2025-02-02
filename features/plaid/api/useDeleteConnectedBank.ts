import { toast } from "@/hooks/use-toast";
import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";

type ResponseType = InferResponseType<
  (typeof client.api.plaid)["connected-bank"]["$delete"],
  200
>;

export const useDeleteConnectedBank = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.plaid["connected-bank"].$delete();

      if (!response.ok) {
        throw new Error("Failed to delete connected bank");
      }
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: "Connected bank deleted",
      });
      queryClient.invalidateQueries({ queryKey: ["connected-bank"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: () => {
      toast({
        title: `Failed to delete connected bank`,
        variant: "destructive",
      });
    },
  });

  return mutation;
};
