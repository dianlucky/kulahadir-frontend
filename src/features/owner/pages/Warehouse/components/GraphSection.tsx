import { MonthlyItemGraphType } from "@/types";
import { BarChart } from "@mantine/charts";
import { Button, Divider, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useGetStatsOfOutgoingDataMonthly } from "../pages/OutgoingStock";
import { format } from "date-fns";
import { useLocation, useNavigate } from "react-router-dom";

export const GraphSection: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [outgoingData, setOutgoingData] = useState<MonthlyItemGraphType[]>([]);
  const { data: OutgoingData } = useGetStatsOfOutgoingDataMonthly(
    format(new Date(), "yyyy-MM")
  );
  useEffect(() => {
    if (OutgoingData) {
      setOutgoingData(OutgoingData);
    } else {
      setOutgoingData([]);
    }
  }, [OutgoingData]);

  return (
    <>
      <div className="bg-white shadow-md rounded-2xl p-4">
        <div className="text-start">
          <Text size="sm" fw={600}>
            Grafik barang keluar bulanan
          </Text>
        </div>
        <Divider my={4} />
        <div className="mt-1 -ml-5">
          <BarChart
            h={200}
            data={outgoingData}
            dataKey="name"
            getBarColor={(data) => (data < 100 ? "teal.8" : "red.8")}
            series={[{ name: "totalAmount", color: "gray.6" }]}
          />
        </div>
        <Divider my={10} />
        <div className="px-1">
          <Button
            size="compact-sm"
            fullWidth
            color="#654433"
            onClick={() => {
              navigate(
                `/${
                  pathname.includes("frozen") ? `frozen` : `warehouse`
                }-inventory/stats`
              );
            }}
          >
            Lihat seluruh grafik
          </Button>
        </div>
      </div>
    </>
  );
};
