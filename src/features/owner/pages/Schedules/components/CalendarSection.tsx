import { Divider, Text } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import { format } from "date-fns";
import { useState } from "react";

interface CalendarSectionProps {
  setDate: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const CalendarSection: React.FC<CalendarSectionProps> = ({
  setDate,
}) => {
  const [dateValue, setDateValue] = useState<Date | null>(new Date());
  const handleDateChange = (value: Date | null) => {
    setDateValue(value);
    if (value) {
      const formatted = format(value, "yyyy-MM-dd"); // hasil: "2025-05-27"
      setDate(formatted);
    }
  };

  return (
    <section className="mx-auto max-w-sm bg-white w-full shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700 mb-4 mt-2">
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
      <div className="flex justify-center mb-3">
        <DatePicker value={dateValue} onChange={handleDateChange} />
      </div>
    </section>
  );
};
