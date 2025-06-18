import { ScheduleType } from "@/types";
import { Badge, Divider, RingProgress, Text } from "@mantine/core";
import { IconCalendarCheck } from "@tabler/icons-react";
import { useEffect, useState } from "react";

interface MonthlyAttendanceRecapProps {
  schedules: ScheduleType[];
}

export const MonthlyAttendanceRecap: React.FC<MonthlyAttendanceRecapProps> = ({
  schedules,
}) => {
  // 🪐 RING
  const [totalPresent, setTotalPresent] = useState<number>(0);
  const [totalLate, setTotalLate] = useState<number>(0);
  const [totalAbsen, setTotalAbsen] = useState<number>(0);

  useEffect(() => {
    const totalMonth = schedules?.length;

    const presentCount = schedules?.filter(
      (data) =>
        data.attendance_status === "Working" ||
        data.attendance_status === "Present"
    ).length;

    const lateCount = schedules?.filter(
      (data) => data.attendance_status === "Late"
    ).length;

    const absenCount = schedules?.filter(
      (data) => data.attendance_status === "belum hadir"
    ).length;

    setTotalPresent((presentCount * 100) / totalMonth);
    setTotalLate((lateCount * 100) / totalMonth);
    setTotalAbsen((absenCount * 100) / totalMonth);
  }, [schedules]);
  // 🔚 END RING
  return (
    <>
      <div className="bg-white shadow-sm p-4">
        <div className="flex justify-between mb-1">
          <div className="text-dark font-semibold cursor-pointer text-sm">
            Rekap Kehadiran Bulanan
          </div>
          <div>
            <IconCalendarCheck size={20} />
          </div>
        </div>
        <Divider />
        <div className="mt-2 grid grid-cols-12">
          <div className="col-span-7 flex justify-center">
            <RingProgress
              size={130}
              thickness={20}
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
                { value: totalLate, color: "yellow" },
                { value: totalAbsen, color: "grey" },
              ]}
            />
          </div>
          <div className="col-span-5 mt-6">
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
        <Divider />
      </div>
    </>
  );
};
