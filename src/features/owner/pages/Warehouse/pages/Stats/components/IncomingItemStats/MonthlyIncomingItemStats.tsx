import { MonthlyTransactionStats, TransactionItemStats } from "@/types";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useGetStatsOfIncomingDataDailyByMonth } from "../../../IncomingStock";
import { format } from "date-fns";
import { BarChart } from "@mantine/charts";
import { Skeleton } from "@mantine/core";

const colorVariants = ["green.6"];

export const MonthlyIncomingItemStats: React.FC = () => {
  const { pathname } = useLocation();
  const isFrozen = pathname.includes("frozen");

  // Get statistic of outgoing data daily per month
  const [barChartData, setBarChartData] = useState<any[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyTransactionStats[]>([]);
  const { data: MonthlyData, isLoading: LoadingMonthlyData } =
    useGetStatsOfIncomingDataDailyByMonth(
      isFrozen ? "Frozen" : "!Frozen",
      format(new Date(), "yyyy-MM")
    );
  useEffect(() => {
    if (MonthlyData) {
      setMonthlyData(MonthlyData);
      const formatted = MonthlyData.map((item: MonthlyTransactionStats) => {
        const entry: Record<string, number | string> = { date: item.date };
        item.data.forEach((sub: TransactionItemStats) => {
          entry[sub.name] = sub.amount;
        });
        return entry;
      });
      setBarChartData(formatted);
    } else {
      setMonthlyData([]);
    }
  }, [MonthlyData]);
  // End for get statistic of outgoing data daily per month

  //   Dynamic series for monthly bar chart
  const allProductNames = Array.from(
    new Set(monthlyData.flatMap((item) => item.data.map((d) => d.name)))
  );

  const chartSeries = allProductNames.map((name, index) => ({
    name,
    color: colorVariants[index % colorVariants.length],
  }));
  //   End for dynamic series for monthly bar chart
  return (
    <>
      {!LoadingMonthlyData ? (
        <BarChart
          h={300}
          data={barChartData}
          dataKey="date"
          type="stacked"
          series={chartSeries}
        />
      ) : (
        <div className="flex gap-2 items-end justify-center my-10">
          <Skeleton width={40} height={60} />
          <Skeleton width={40} height={50} />
          <Skeleton width={40} height={60} />
          <Skeleton width={40} height={70} />
          <Skeleton width={40} height={50} />
          <Skeleton width={40} height={90} />
        </div>
      )}
    </>
  );
};
