"use client";

import Chart from "./Chart";
import SpendingPie from "./SpendingPie";

function DataCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
      <div className="col-span-1 lg:col-span-3 xl:col-span-4">
        <Chart />
      </div>

      <div className="col-span-1 lg:col-span-3 xl:col-span-2">
        <SpendingPie />
      </div>
    </div>
  );
}

export default DataCharts;
