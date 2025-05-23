import { useState } from "react";
import { MonthPicker } from "@mantine/dates";
import { Divider, Text } from "@mantine/core";
import { IconCalendar } from "@tabler/icons-react";

export const MonthPickerSection: React.FC = () => {
  const [value, setValue] = useState<Date | null>(new Date());
  return (
    <section className="bg-white shadow-md rounded-lg p-3 pb-10">
      <div className="flex justify-between py-2 px-4">
        <div>
          <Text size="md" fw={"bold"} c={"#222222"}>
            Kalender
          </Text>
        </div>
        <div>
          <IconCalendar color="#222222" />
        </div>
      </div>
      <div className="px-3">
        <Divider size={"md"} />
      </div>
      <div className="w-full flex justify-center mt-2">
        <MonthPicker size="md" value={value} onChange={setValue} />
      </div>
    </section>
  );
};
