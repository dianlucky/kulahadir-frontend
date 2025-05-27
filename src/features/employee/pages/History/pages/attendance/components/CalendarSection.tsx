import { ScheduleType } from "@/types";
import { Divider, Indicator, Text } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import React, { useEffect, useMemo, useState } from "react";
interface CalendarSectionProps {
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
  schedules: ScheduleType[];
}

export const CalendarSection: React.FC<CalendarSectionProps> = ({
  setSelectedDate,
  schedules,
}) => {
  const [value, setValue] = useState<Date | null>(new Date());
  useEffect(() => {
    if (value) {
      setSelectedDate(format(value, "yyyy-MM-dd", { locale: id }));
    }
  });

  // DATA FOR DATE INDICATOR
  const statusDates = useMemo(() => {
    if (schedules.length === 0) return [];

    return schedules.map((schedule) => {
      const date = new Date(schedule.date);
      return {
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
        status: schedule.status === "off" ? "off" : schedule.attendance_status,
      };
    });
  }, [schedules]);
  // END FOR DATA INDICATOR

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
        <DatePicker
          size="sm"
          value={value}
          onChange={setValue}
          renderDay={(date) => {
            const day = date.getDate();
            const month = date.getMonth();
            const year = date.getFullYear();

            const isSelected =
              value && date.toDateString() === value.toDateString();

            const statusInfo = statusDates.find(
              (d) => d.day === day && d.month === month && d.year === year
            );

            let bgClass = "";
            if (isSelected) {
              bgClass = "bg-blue-600 text-white";
            } else {
              switch (statusInfo?.status) {
                case "hadir":
                  bgClass = "bg-green-600 text-white";
                  break;
                case "terlambat":
                  bgClass = "bg-yellow-400 text-white";
                  break;
                case "izin":
                  bgClass = "bg-gray-400 text-white";
                  break;
                case "off":
                  bgClass = "bg-red-600 text-white";
                  break;
                default:
                  bgClass = "";
              }
            }

            return (
              <div className="relative">
                <div
                  className={`rounded w-9 h-9 flex items-center justify-center ${bgClass}`}
                >
                  {day}
                </div>
              </div>
            );
          }}
        />
      </div>
      <div className="mt-4 -mb-4 px-2 mt-2 flex justify-center -ml-3 mr-2">
        <div className="grid grid-cols-12">
          <div className="col-span-1">
            <Indicator
              className="mt-2"
              color="#16A34A"
              position="middle-center"
            ></Indicator>
          </div>
          <div className="col-span-2">
            <Text className="" size={"xs"} c="dimmed">
              Hadir
            </Text>
          </div>
          <div className="col-span-1">
            <Indicator
              className="mt-2"
              color="#9CA3AF"
              position="middle-center"
            ></Indicator>
          </div>
          <div className="col-span-2">
            <Text className="" size={"xs"} c="dimmed">
              Izin
            </Text>
          </div>
          <div className="col-span-1">
            <Indicator
              className="mt-2"
              color="#DC2626"
              position="middle-center"
            ></Indicator>
          </div>
          <div className="col-span-2">
            <Text className="" size={"xs"} c="dimmed">
              Libur
            </Text>
          </div>
          <div className="col-span-1">
            <Indicator
              className="mt-2"
              color="#FACC15"
              position="middle-center"
            ></Indicator>
          </div>
          <div className="col-span-2">
            <Text className="" size={"xs"} c="dimmed">
              Terlambat
            </Text>
          </div>
        </div>
      </div>
    </section>
  );
};
