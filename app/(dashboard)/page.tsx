import DataCharts from "@/components/DataCharts";
import DataGrid from "@/components/DataGrid";
import DataGridSkeleton from "@/components/DataGridSkeleton";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

export default function SummaryPage() {
  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Suspense fallback={<DataGridSkeleton />}>
        <DataGrid />
      </Suspense>
      <Suspense
        fallback={
          <div className="h-[350px] flex items-center justify-center">
            <Loader2 className="animate-spin text-muted-foreground size-8" />
          </div>
        }
      >
        <DataCharts />
      </Suspense>
    </div>
  );
}
