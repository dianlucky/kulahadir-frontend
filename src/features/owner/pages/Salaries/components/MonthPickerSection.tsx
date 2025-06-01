import { Divider, Text } from "@mantine/core";
import { MonthPicker } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import { addDays, format, getDay, startOfMonth } from "date-fns";
import { id } from "date-fns/locale";
import React, { useEffect, useState } from "react";
interface MonthPickerSectionProps {
  setMonth: React.Dispatch<React.SetStateAction<string>>;
}

function getFirstSaturday(date: Date): Date {
  const firstOfMonth = startOfMonth(date); // Tanggal 1 bulan itu
  const day = getDay(firstOfMonth); // 0 = Minggu, 6 = Sabtu
  const offset = (6 - day + 7) % 7; // Jarak ke Sabtu pertama
  return addDays(firstOfMonth, offset);
}

export const MonthPickerSection: React.FC<MonthPickerSectionProps> = ({
  setMonth,
}) => {
  const [value, setValue] = useState<Date | null>(new Date());
  useEffect(() => {
    if (value) {
      const firstSaturday = getFirstSaturday(value);
      setMonth(format(firstSaturday, "yyyy-MM-dd", { locale: id }));
    }
  }, [value]);
  return (
    <section className="mx-auto max-w-xs bg-white w-full rounded-xl z-50 relative p-2 px-2 text-slate-700  mt-2 shadow-md">
      <div className="flex justify-between text-xs items-center p-2 px-2 -mt-1 -mb-1">
        <div>
          <Text fw={700} c="#654433">
            Kalender
          </Text>
        </div>
        <div className="my-auto text-right mb-1 me-2">
          <IconCalendar />
        </div>
      </div>
      <Divider size={"sm"} />
      <div className="flex justify-center mb-5">
        <MonthPicker value={value} onChange={setValue} />
      </div>
    </section>
  );
};
