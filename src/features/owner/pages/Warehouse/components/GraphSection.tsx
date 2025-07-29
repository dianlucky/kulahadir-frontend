import { BarChart } from "@mantine/charts";
import { Divider, Text } from "@mantine/core";
import React from "react";

export const GraphSection: React.FC = () => {
  const data = [
    { month: "Jan", Laptops: 450 },
    { month: "Feb", Laptops: 620 },
    { month: "Mar", Laptops: 800 },
    { month: "Apr", Laptops: 720 },
    { month: "May", Laptops: 300 },
    { month: "Jun", Laptops: 900 },
    { month: "Jul", Laptops: 780 },
    { month: "Aug", Laptops: 670 },
    { month: "Sep", Laptops: 500 },
    { month: "Oct", Laptops: 850 },
    { month: "Nov", Laptops: 430 },
    { month: "Dec", Laptops: 950 },
  ];

  return (
    <>
      <div className="bg-white shadow-md rounded-2xl p-4">
        <div className="text-start">
          <Text size="sm" fw={600}>
            Grafik barang
          </Text>
        </div>
        <Divider my={4} />
        <div className="mt-1 -ml-5">
          <BarChart
            h={200}
            data={data}
            dataKey="month"
            getBarColor={(value) => (value < 700 ? "teal.8" : "red.8")}
            series={[{ name: "Laptops", color: "gray.6" }]}
          />
        </div>
      </div>
    </>
  );
};
