import { client } from "@/lib/hono";
import { convertAmountFromMelinite } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export const useGetSummary = () => {
  const params = useSearchParams();
  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const accountId = params.get("accountId") || "";
  const query = useQuery({
    queryKey: ["summary", { from, to, accountId }],
    queryFn: async () => {
      const response = await client.api.summary.$get({
        query: {
          from,
          to,
          accountId,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch summary");
      }
      const { data } = await response.json();
      return {
        ...data,
        incomeAmount: convertAmountFromMelinite(data.incomeAmount),
        expensesAmount: convertAmountFromMelinite(data.expensesAmount),
        remainingAmount: convertAmountFromMelinite(data.remainingAmount),
        categories: data.categories.map((category) => ({
          ...category,
          value: convertAmountFromMelinite(category.value),
        })),
        days: data.days.map((day) => ({
          ...day,
          income: convertAmountFromMelinite(day.income),
          expenses: convertAmountFromMelinite(day.expenses),
        })),
      };
    },
  });

  return query;
};
