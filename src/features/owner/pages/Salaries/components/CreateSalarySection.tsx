import { Button, Divider, Image, Text } from "@mantine/core";
import React from "react";

export const CreateSalarySection: React.FC = () => {
  return (
    <section className="mx-auto max-w-xs bg-white w-full shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700 mb-30 -mt-2">
      <div className="flex justify-between text-xs items-center p-2 px-2 -mt-1 -mb-1">
        <div>
          <Text fw={600} c="#654433">
            Slip gaji
          </Text>
        </div>
        <div className="flex mb-1 mr-1 gap-1"></div>
      </div>
      <Divider size={"sm"} />
      <div className="text-center mt-10">
        <div className="ml-10">
          <Image
            className="ml-15"
            src="/images/not-found.svg"
            style={{
              width: "120px",
            }}
          />
        </div>
        <div className="px-10">
          <Text fw={"bold"} c="#343a40">
            Hmm..
          </Text>
          <span className="text-slate-600 text-sm  -mt-2">
            Sepertinya slip gaji untuk bulan ini belum dibuat
          </span>
        </div>
        <div className="mt-2 mb-20">
          <Button color="yellow">Buat slip gaji</Button>
        </div>
      </div>
    </section>
  );
};
