import { Divider, Text } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import { useState } from "react";

export const WorkerDetailSchedule: React.FC = () => {
  const [date, setDate] = useState<Date | null>(new Date());
  return (
    <section className="bg-white shadow-lg p-6 rounded-lg mt-2">
      <div className="flex justify-center mb-4">
        <Text fw={"bolder"} size="lg" c="#343a40">
          Data Kehadiran Pegawai
        </Text>
      </div>
      <Divider />
      <div className="grid grid-cols-12 mt-5 gap-2">
        <div className="col-span-3 bg-white shadow-sm p-6 rounded-lg h-[370px]">
          <div className="flex justify-between mb-1 -mt-3">
            <Text fw={"bold"} size="md" c="#343a40">
              Kalender
            </Text>
            <IconCalendar />
          </div>
          <Divider />
          <div className="flex justify-center w-full mt-2">
            <DatePicker value={date} onChange={setDate} size="sm" />
          </div>
        </div>
      </div>
    </section>
  );
};
