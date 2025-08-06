import { AnnualTransactionStats, TransactionItemStats } from "@/types";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useGetStatsOfIncomingDataAnnually } from "../../../IncomingStock";
import { format } from "date-fns";
import { BarChart } from "@mantine/charts";
import { Skeleton } from "@mantine/core";

const colorVariants = ["green.6"];

export const AnnualIncomingItemStats: React.FC = () => {
  const { pathname } = useLocation();
  const isFrozen = pathname.includes("frozen");

  //   Get annual stats for incoming item data
  const [barChartData, setBarChartData] = useState<any[]>([]); // Maafkan saya raja typescript saya mengunakan any 🙏
  const [annualData, setAnnualData] = useState<AnnualTransactionStats[]>([]);
  const { data: DataAnnual, isLoading: LoadingAnnual } =
    useGetStatsOfIncomingDataAnnually(
      isFrozen ? "Frozen" : "!Frozen",
      format(new Date(), "yyyy")
    );
  useEffect(() => {
    if (DataAnnual) {
      setAnnualData(DataAnnual);
      const formatted = DataAnnual.map((item: AnnualTransactionStats) => {
        const entry: Record<string, number | string> = { month: item.month };
        item.data.forEach((sub: TransactionItemStats) => {
          entry[sub.name] = sub.amount;
        });
        return entry;
      });

      setBarChartData(formatted);
    } else {
      setAnnualData([]);
    }
  }, [DataAnnual]);
  //  End for annual stats for outgoing data

  //   Dynamic series for annual bar chart
  const allProductNames = Array.from(
    new Set(annualData.flatMap((item) => item.data.map((d) => d.name)))
  );

  const chartSeries = allProductNames.map((name, index) => ({
    name,
    color: colorVariants[index % colorVariants.length],
  }));
  //   End for dynamic series for annual bar chart

  return (
    <>
      {!LoadingAnnual ? (
        <BarChart
          h={300}
          data={barChartData}
          dataKey="month"
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
