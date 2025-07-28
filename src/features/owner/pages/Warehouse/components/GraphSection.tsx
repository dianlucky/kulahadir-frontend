import { Divider, Image, Text } from "@mantine/core";
import React from "react";

export const GraphSection: React.FC = () => {
  return (
    <>
      <div className="bg-white shadow-md rounded-2xl p-4">
        <div className="text-start">
          <Text size="sm" fw={600}>
            Grafik barang
          </Text>
        </div>
        <Divider my={4} />
        <div className="flex justify-center">
          <div className="mt-3">
            <div className="flex justify-center">
              <Image h={100} w={100} opacity={"80%"} src={"/images/coming-soon.svg"} />
            </div>
            <Text size="sm" c={"grey"} fw={500} fs={"italic"}>
              Fitur masih dalam pengembangan
            </Text>
          </div>
        </div>
      </div>
    </>
  );
};
