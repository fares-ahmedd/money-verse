import { toast } from "@/hooks/use-toast";
import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<typeof client.api.accounts.$post>;
type RequestType = InferRequestType<typeof client.api.accounts.$post>["json"];

export const useCreateAccount = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.accounts.$post({ json });

      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: "Account created!",
        description: "Your account have been created Successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
    onError: () => {},
  });
};
