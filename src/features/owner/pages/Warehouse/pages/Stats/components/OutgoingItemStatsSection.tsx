import { Divider, Select, Text } from "@mantine/core";
import React, { useState } from "react";
import { AnnualOutgoingItemStats } from "./OutgoingItemStats/AnnualOutgoingItemStats";
import { MonthlyOutgoingItemStats } from "./OutgoingItemStats/MonthlyOutgoingItemStats";

export const OutgoingItemStatsSection: React.FC = () => {
  const [type, setType] = useState<string | null>("Tahunan");
  return (
    <>
      <div className="bg-white shadow-md rounded-xl p-3">
        <div className="grid grid-cols-12 px-2">
          <div className="col-span-8 mt-2">
            <Text size="sm" fw={600}>
              Grafik barang keluar
            </Text>
          </div>
          <div className="col-span-4">
            <Select
              size="xs"
              value={type}
              onChange={setType}
              data={["Tahunan", "Bulanan", "Mingguan"]}
            />
          </div>
        </div>
        <Divider my={8} />
        <div>
          {type == "Tahunan" ? (
            <AnnualOutgoingItemStats />
          ) : (
            <MonthlyOutgoingItemStats />
          )}
        </div>
      </div>
    </>
  );
};
