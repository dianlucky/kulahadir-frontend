import React from "react";
import { AreaChart } from "@mantine/charts";
export const GraphItemSection: React.FC = () => {
  const data = [
    { date: "01", Masuk: 10, Keluar: 5 },
    { date: "02", Masuk: 15, Keluar: 8 },
    { date: "03", Masuk: 12, Keluar: 10 },
    { date: "04", Masuk: 18, Keluar: 7 },
    { date: "05", Masuk: 21, Keluar: 4 },
    { date: "06", Masuk: 17, Keluar: 5 },
    { date: "07", Masuk: 12, Keluar: 2 },
  ];
  return (
    <>
      <div className="bg-white shadow-md rounded-md p-2">
        <AreaChart
          h={300}
          w={300}
          data={data}
          dataKey="date"
          withLegend
          withPointLabels
          series={[
            { name: "Masuk", color: "green.6" },
            { name: "Keluar", color: "red.6" },
          ]}
        />
      </div>
    </>
  );
};
