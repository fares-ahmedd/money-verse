"use client";
import { useGetSummary } from "@/features/summary/api/useGetSummary";
import { formatDataRange } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { FaPiggyBank } from "react-icons/fa";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import DataCard from "./DataCard";
import DataGridSkeleton from "./DataGridSkeleton";

function DataGrid() {
  const { data: summary, isLoading } = useGetSummary();
  const params = useSearchParams();
  const to = params.get("to") || undefined;
  const from = params.get("from") || undefined;

  const dateRangeLabel = formatDataRange({ from, to });

  if (isLoading) {
    return <DataGridSkeleton />;
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
      <DataCard
        title="Remaining"
        value={summary?.remainingAmount}
        percentageChange={summary?.remainingChange}
        icon={FaPiggyBank}
        variant={"default"}
        dateRange={dateRangeLabel}
      />{" "}
      <DataCard
        title="Income"
        value={summary?.incomeAmount}
        percentageChange={summary?.incomeChange}
        icon={FaArrowTrendUp}
        variant={"success"}
        dateRange={dateRangeLabel}
      />{" "}
      <DataCard
        title="Expenses"
        value={summary?.expensesAmount}
        percentageChange={summary?.expensesChange}
        icon={FaArrowTrendDown}
        variant={"danger"}
        dateRange={dateRangeLabel}
      />
    </div>
  );
}

export default DataGrid;
