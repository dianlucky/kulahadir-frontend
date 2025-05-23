import { Divider, Text } from "@mantine/core";
import { MonthPicker } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import React, { useState } from "react";

export const MonthPickerSection: React.FC = () => {
  const [value, setValue] = useState<Date | null>(new Date());

  return (
    <section className="mx-auto max-w-xs bg-white w-full rounded-xl z-50 relative p-2 px-2 text-slate-700  mt-2">
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
