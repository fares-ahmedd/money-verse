import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  BarChart3,
  FileSearch,
  LineChart,
  Loader2,
} from "lucide-react";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import LineVariant from "./LineVariant";
import { useState } from "react";
import BarVariant from "./BarVariant";
import AreaVariant from "./AreaVariant";
import { useGetSummary } from "@/features/summary/api/useGetSummary";

type ChartType = "area" | "line" | "bar";

const chartComponents = {
  area: AreaVariant,
  line: LineVariant,
  bar: BarVariant,
};

function Chart() {
  const [chartType, setChartType] = useState<ChartType>("area");

  const ChartComponent = chartComponents[chartType];
  const onTypeChange = (type: ChartType) => {
    setChartType(type);
  };
  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between">
        <CardTitle className="line-clamp-1">Transactions</CardTitle>
        <Select defaultValue={chartType} onValueChange={onTypeChange}>
          <SelectTrigger className="lg:w-auto h-9 rounded-md px-3">
            <SelectValue placeholder="Chart type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="area">
              <div className="flex items-center">
                <AreaChart className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Area chart</p>
              </div>
            </SelectItem>
            <SelectItem value="line">
              <div className="flex items-center">
                <LineChart className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Line chart</p>
              </div>
            </SelectItem>{" "}
            <SelectItem value="bar">
              <div className="flex items-center">
                <BarChart3 className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Bar chart</p>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <DataCharts ChartComponent={ChartComponent} />
      </CardContent>
    </Card>
  );
}

export default Chart;

function DataCharts({
  ChartComponent,
}: {
  ChartComponent: React.ComponentType<{ data: any }>;
}) {
  const { data, isLoading } = useGetSummary();

  if (isLoading) {
    return (
      <div className="h-[350px] flex items-center justify-center">
        <Loader2 className="animate-spin text-muted-foreground size-8" />
      </div>
    );
  }
  return (
    <>
      {data && data.days.length === 0 ? (
        <div className="flex flex-col gap-y-4 items-center justify-center h-[350px] w-full">
          <FileSearch className="size-6 text-muted-foreground" />{" "}
          <p className="text-muted-foreground text-sm">
            No data for this period
          </p>
        </div>
      ) : (
        <ChartComponent data={data?.days} />
      )}
    </>
  );
}
