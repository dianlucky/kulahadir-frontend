import { useEffect, useState } from "react";
import { MonthPicker } from "@mantine/dates";
import { Divider, Text } from "@mantine/core";
import { IconCalendar } from "@tabler/icons-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface MonthPickerSectionProps {
  setSelectedMonth: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const MonthPickerSection: React.FC<MonthPickerSectionProps> = ({
  setSelectedMonth,
}) => {
  const [value, setValue] = useState<Date | null>(new Date());
  useEffect(() => {
    if (value) {
      setSelectedMonth(format(value, "yyyy-MM", { locale: id }));
    }
  });
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
        <MonthPicker
          size="md"
          value={value}
          onChange={setValue}
          allowDeselect={false}
        />
      </div>
    </section>
  );
};
