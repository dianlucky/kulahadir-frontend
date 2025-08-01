import React, { useEffect, useState } from "react";
import { AreaChart } from "@mantine/charts";
import { ItemGraphType } from "@/types";
import { useGetItemStatsWeekly } from "../api";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface GraphItemSectionProps {
  itemId: number;
}
export const GraphItemSection: React.FC<GraphItemSectionProps> = ({
  itemId,
}) => {
  const [weeklyData, setWeeklyData] = useState<ItemGraphType[]>([]);
  const { data: WeeklyData, isLoading: LoadingWeekly } = useGetItemStatsWeekly(
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
  const data = [
    { date: "01", Masuk: 12, Keluar: 7 },
    { date: "02", Masuk: 5, Keluar: 9 },
    { date: "03", Masuk: 18, Keluar: 3 },
    { date: "04", Masuk: 10, Keluar: 6 },
    { date: "05", Masuk: 7, Keluar: 14 },
    { date: "06", Masuk: 15, Keluar: 8 },
    { date: "07", Masuk: 9, Keluar: 11 },
    { date: "08", Masuk: 16, Keluar: 5 },
    { date: "09", Masuk: 8, Keluar: 10 },
    { date: "10", Masuk: 0, Keluar: 12 },
    { date: "11", Masuk: 14, Keluar: 6 },
    { date: "12", Masuk: 13, Keluar: 4 },
    { date: "13", Masuk: 17, Keluar: 3 },
    { date: "14", Masuk: 0, Keluar: 15 },
    { date: "15", Masuk: 20, Keluar: 1 },
    { date: "16", Masuk: 4, Keluar: 13 },
    { date: "17", Masuk: 3, Keluar: 17 },
    { date: "18", Masuk: 0, Keluar: 2 },
    { date: "19", Masuk: 2, Keluar: 18 },
    { date: "20", Masuk: 7, Keluar: 11 },
    { date: "21", Masuk: 0, Keluar: 9 },
    { date: "22", Masuk: 11, Keluar: 7 },
    { date: "23", Masuk: 0, Keluar: 6 },
    { date: "24", Masuk: 8, Keluar: 12 },
    { date: "25", Masuk: 5, Keluar: 14 },
    { date: "26", Masuk: 6, Keluar: 10 },
    { date: "27", Masuk: 9, Keluar: 8 },
    { date: "28", Masuk: 17, Keluar: 3 },
    { date: "29", Masuk: 14, Keluar: 4 },
    { date: "30", Masuk: 15, Keluar: 5 },
  ];

  return (
    <>
      <div className="bg-white shadow-md rounded-md p-2 max-w-sm">
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
