import { ScheduleType } from "@/types";
import { Divider, Indicator, Text } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import { useEffect, useMemo, useState } from "react";
import { useGetScheduleByMonthEmployeeId } from "../api";
import { format } from "date-fns";
import { useAuth } from "@/features/auth";

type DailyCalendarProps = {
  setDate: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export const DailyCalendar: React.FC<DailyCalendarProps> = ({ setDate }) => {
  const { creds } = useAuth();
  const [dateValue, setDateValue] = useState<Date | null>(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  console.log("bulan : ", currentMonth, currentYear);
  const handleMonthChange = (date: Date) => {
    setCurrentMonth(date.getMonth() + 1);
    setCurrentYear(date.getFullYear());
  };
  const handleDateChange = (value: Date | null) => {
    setDateValue(value);
    if (value) {
      const formatted = format(value, "yyyy-MM-dd"); // hasil: "2025-05-27"
      setDate(formatted);
    }
  };

  const [schedules, setSchedules] = useState<ScheduleType[]>([]);
  const {
    data: DataSchedules,
    refetch: RefetchSchedules,
    isLoading: LoadingSchedules,
  } = useGetScheduleByMonthEmployeeId(
    `${currentYear}-${currentMonth}`,
    creds?.employee_id //JANGAN KDINGAT MENGGANTI ID EMPLOYEE <=================================
  );
  useEffect(() => {
    if (DataSchedules) {
      setSchedules(DataSchedules);
    }
  }, [DataSchedules]);

  useEffect(() => {
    RefetchSchedules();
  }, [currentMonth, currentYear]);

  const offDates = useMemo(() => {
    if (LoadingSchedules || !Array.isArray(schedules) || schedules.length === 0)
      return [];

    return schedules
      .filter((schedule) => schedule.status === "off")
      .map((schedule) => {
        const date = new Date(schedule.date);
        return {
          day: date.getDate(),
          month: date.getMonth() + 1,
          year: date.getFullYear(),
        };
      });
  }, [schedules, LoadingSchedules]);

  return (
    <section className="mx-auto max-w-xs bg-white w-full shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700 mb-2 mt-2">
      <div className="flex justify-between text-xs items-center p-2 -mt-1 -mb-1">
        <div>
          <Text fw={700} c="#654433">
            Kalender
          </Text>
        </div>
        <div className="my-auto text-right -mt-2 me-2">
          <IconCalendar />
        </div>
      </div>
      <Divider size={"sm"} />
      <div className="flex justify-center">
        <DatePicker
          value={dateValue}
          onChange={handleDateChange}
          onNextMonth={handleMonthChange}
          onPreviousMonth={handleMonthChange}
          renderDay={(date) => {
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();

            const isOffDay = offDates.some(
              (d: any) => d.day === day && d.month === month && d.year === year
            );

            const bgClass = isOffDay ? "bg-red-400 text-white" : "";

            return (
              <div
                className={`w-full h-full flex items-center justify-center rounded ${bgClass}`}
              >
                {day}
              </div>
            );
          }}
        />
      </div>
      <div className="mt-2 mb-2 px-4">
        <div className="grid grid-cols-9">
          {/* BUAT KETERANGAN INDICATOR   */}
        </div>
      </div>
    </section>
  );
};
