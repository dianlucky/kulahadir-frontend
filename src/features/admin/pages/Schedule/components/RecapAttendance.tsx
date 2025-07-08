import { ScheduleType } from "@/types";
import { Badge, Divider, RingProgress, Text } from "@mantine/core";
import { IconChartBar } from "@tabler/icons-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import React, { useEffect, useState } from "react";

interface RecapAttendanceProps {
  date: Date | null;
  schedules: ScheduleType[];
}

export const RecapAttendance: React.FC<RecapAttendanceProps> = ({
  date,
  schedules,
}) => {
  // 🪐 RING
  const [totalPresent, setTotalPresent] = useState<number>(0);
  const [totalLate, setTotalLate] = useState<number>(0);
  const [totalAbsen, setTotalAbsen] = useState<number>(0);

  useEffect(() => {
    const totalEmployee = schedules
      ? schedules.filter((data) =>
          status == "Semua" ? true : data.employee.account.status == status
        ).length
      : 0;

    const presentCount = schedules
      ? schedules.filter((data) =>
          (data.attendance_status === "Working" ||
            data.attendance_status === "Present") &&
          status === "Semua"
            ? true
            : data.employee.account.status == status
        ).length
      : 0;

    const lateCount = schedules
      ? schedules.filter((data) =>
          data.attendance_status === "Late" && status === "Semua"
            ? true
            : data.employee.account.status == status
        ).length
      : 0;

    const absenCount = schedules
      ? schedules.filter((data) =>
          data.attendance_status === "belum hadir" && status === "Semua"
            ? true
            : data.employee.account.status == status
        ).length
      : 0;

    setTotalPresent((presentCount * 100) / totalEmployee);
    setTotalLate((lateCount * 100) / totalEmployee);
    setTotalAbsen((absenCount * 100) / totalEmployee);
  }, [schedules]);
  // 🔚 END RING
  return (
    <section className="bg-white rounded-sm shadow-sm p-4">
      <div className="flex justify-between mb-1 -mt-3 mb-3">
        <Text fw={700} size="md" c="#343a40">
          Rekap kehadiran
        </Text>
        <IconChartBar />
      </div>
      <Divider />
      <div>
        <div className="mt-2 flex mb-2">
          <Text fw={400} size="sm">
            Tanggal :
          </Text>
          <Text fw={700} size="sm" ml={2}>
            {date && format(date, "EEEE, dd MMMM yyyy", { locale: id })}
          </Text>
        </div>
        <Divider />
        <div className="flex justify-between">
          <RingProgress
            size={120}
            thickness={16}
            label={
              <Text fw={700} size="16px" ta="center">
                {
                  schedules.filter(
                    (data) =>
                      data.attendance_status == "Working" ||
                      data.attendance_status == "Present" ||
                      data.attendance_status == "Late"
                  ).length
                }
                /{schedules.length}
              </Text>
            }
            sections={[
              { value: totalPresent, color: "#8FD14F" },
              { value: totalAbsen, color: "grey" },
              { value: totalLate, color: "yellow" },
            ]}
          />
          <div>
            <div className="mt-6 ml-3">
              <div className="flex">
                <Badge color="#8FD14F" size="md">
                  {
                    schedules.filter(
                      (data) =>
                        data.attendance_status == "Present" ||
                        data.attendance_status == "Working"
                    ).length
                  }
                </Badge>
                <Text fw={"bold"} size="xs" ml={3}>
                  Hadir
                </Text>
              </div>
              <div className="flex mt-2">
                <Badge color="yellow" size="md">
                  {
                    schedules.filter((data) => data.attendance_status == "Late")
                      .length
                  }
                </Badge>
                <Text fw={"bold"} size="xs" ml={3}>
                  Terlambat
                </Text>
              </div>
              <div className="flex mt-2">
                <Badge color="grey" size="md">
                  {
                    schedules.filter(
                      (data) => data.attendance_status == "belum hadir"
                    ).length
                  }
                </Badge>
                <Text fw={"bold"} size="xs" ml={3}>
                  Belum hadir
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
