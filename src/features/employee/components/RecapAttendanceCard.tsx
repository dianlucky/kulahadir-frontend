import { useGetScheduleByDate } from "@/features/admin/pages/Schedule";
import { ScheduleType } from "@/types";
import { Badge, Button, Divider, RingProgress, Text } from "@mantine/core";
import { format, subDays } from "date-fns";
import { id } from "date-fns/locale";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toZonedTime } from "date-fns-tz";
export const RecapAttendanceCard: React.FC = () => {
  const navigate = useNavigate();

  // DATE FORMATTER TIME
  const getEffectiveDate = () => {
    const makassarTime = toZonedTime(new Date(), "Asia/Makassar");
    const hour = makassarTime.getHours();

    if (hour < 3) {
      const yesterday = subDays(makassarTime, 1);
      return format(yesterday, "yyyy-MM-dd");
    }

    return format(makassarTime, "yyyy-MM-dd");
  };
  // END FOR DATE FORMATTER TIME

  const formattedDate = getEffectiveDate();
  console.log("Formatted Date : ", formattedDate);
  const [schedules, setSchedules] = useState<ScheduleType[]>([]);
  const { data: DataSchedules } = useGetScheduleByDate(formattedDate);
  useEffect(() => {
    if (DataSchedules) {
      setSchedules(DataSchedules);
    }
  }, [DataSchedules]);

  // 🪐 RING
  const [totalPresent, setTotalPresent] = useState<number>(0);
  const [totalLate, setTotalLate] = useState<number>(0);
  const [totalAbsen, setTotalAbsen] = useState<number>(0);

  useEffect(() => {
    const totalMonth = schedules.length;

    const presentCount = schedules.filter(
      (data) =>
        data.attendance_status === "Working" ||
        data.attendance_status === "Present"
    ).length;

    const lateCount = schedules.filter(
      (data) => data.attendance_status === "Late"
    ).length;

    const absenCount = schedules.filter(
      (data) => data.attendance_status === "belum hadir"
    ).length;

    setTotalPresent((presentCount * 100) / totalMonth);
    setTotalLate((lateCount * 100) / totalMonth);
    setTotalAbsen((absenCount * 100) / totalMonth);
  }, [schedules]);
  // 🔚 END RING
  console.log("Present :", totalPresent);
  console.log("Late :", totalLate);
  console.log("Absen :", totalAbsen);
  return (
    <section className="mx-auto max-w-xs bg-white w-full shadow-lg rounded-xl z-50 relative p-2 px-2 mb-2 -mt-16">
      <div className="px-3">
        <div className="text-center mb-1">
          <Text fw={600} size="sm">
            Rekap absensi{" "}
            {format(new Date(formattedDate), "EEEE, dd MMMM yyyy", { locale: id })}
          </Text>
        </div>
        <Divider />
        <div className="grid grid-cols-12 mt-2 mb-2">
          <div className="col-span-5">
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
          <div className="col-span-1">
            <div className="w-px h-full bg-gray-300 mx-4" />
          </div>
          <div className="col-span-6 my-auto ml-3">
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
        <div className="w-full my-2">
          <Button
            fullWidth
            size="xs"
            color="#654433"
            onClick={() => {
              navigate("/employee-attendances");
            }}
          >
            Cek kehadiran
          </Button>
        </div>
      </div>
    </section>
  );
};
