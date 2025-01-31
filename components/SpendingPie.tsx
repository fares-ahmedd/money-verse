import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileSearch, Loader2, PieChart, Radar, Target } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import PieVariant from "./PieVariant";
import RadarVariant from "./RadarVariant";
import RadialVariant from "./RadialVariant";
import { useGetSummary } from "@/features/summary/api/useGetSummary";

type ChartType = "pie" | "radar" | "radial";

const chartComponents = {
  pie: PieVariant,
  radar: RadarVariant,
  radial: RadialVariant,
};

function SpendingPie() {
  const [chartType, setChartType] = useState<ChartType>("pie");

  const ChartComponent = chartComponents[chartType];
  const onTypeChange = (type: ChartType) => {
    setChartType(type);
  };
  return (
    <Card className=" drop-shadow-sm">
      <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between">
        <CardTitle className="line-clamp-1 text-base lg:text-lg">
          Categories
        </CardTitle>
        <Select defaultValue={chartType} onValueChange={onTypeChange}>
          <SelectTrigger className="lg:w-auto h-9 rounded-md px-3 focus:ring-offset-0 focus:ring-transparent">
            <SelectValue placeholder="Chart type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pie">
              <div className="flex items-center">
                <PieChart className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Pie chart</p>
              </div>
            </SelectItem>
            <SelectItem value="radar">
              <div className="flex items-center">
                <Radar className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Radar chart</p>
              </div>
            </SelectItem>{" "}
            <SelectItem value="radial">
              <div className="flex items-center">
                <Target className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Radial chart</p>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <DataGrid ChartComponent={ChartComponent} />
      </CardContent>
    </Card>
  );
}

export default SpendingPie;

function DataGrid({
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
      {data && data.categories.length === 0 ? (
        <div className="flex flex-col gap-y-4 items-center justify-center h-[350px] w-full">
          <FileSearch className="size-6 text-muted-foreground" />{" "}
          <p className="text-muted-foreground text-sm">
            No data for this period
          </p>
        </div>
      ) : (
        <ChartComponent data={data?.categories} />
      )}
    </>
  );
}
