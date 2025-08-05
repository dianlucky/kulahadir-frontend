import React, { useEffect, useState } from "react";
import { AreaChart } from "@mantine/charts";
import { ItemGraphType } from "@/types";
import { useGetItemStatsWeekly } from "../api";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Text } from "@mantine/core";

interface GraphItemSectionProps {
  itemId: number;
}
export const GraphItemSection: React.FC<GraphItemSectionProps> = ({
  itemId,
}) => {
  const [weeklyData, setWeeklyData] = useState<ItemGraphType[]>([]);
  const { data: WeeklyData } = useGetItemStatsWeekly(
    itemId,
    format(new Date(), "yyyy-MM-dd", { locale: id })
  );
  useEffect(() => {
    if (WeeklyData) {
      setWeeklyData(WeeklyData);
    } else {
      setWeeklyData([]);
    }
  }, [WeeklyData]);
  console.log("Weekly data", weeklyData);

  return (
    <>
      <div className="bg-white shadow-md rounded-md p-2 max-w-sm">
        <div className="mt-2 ml-3">
          <Text size="sm" fw={600}>
            Grafik barang mingguan
          </Text>
        </div>
        <AreaChart
          h={300}
          w={300}
          data={weeklyData}
          dataKey="date"
          withLegend
          xAxisLabel="Tanggal"
          yAxisProps={{ domain: [0, 5] }}
          yAxisLabel="Jumlah"
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
