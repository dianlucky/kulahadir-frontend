import { AttendanceType, ScheduleType } from "@/types";
import { Badge, Divider, Loader, Text } from "@mantine/core";
import { IconClockHour8 } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useGetScheduleByDateEmployeeId } from "../pages/schedule/api";
import { format, subDays } from "date-fns";
import { id } from "date-fns/locale";
import { useGetAttendanceByScheduleId } from "../pages/History";
import { useAuth } from "@/features/auth";
import { toZonedTime } from "date-fns-tz";

export const ScheduleCard: React.FC = () => {
  const { creds } = useAuth();

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

  // GET SCHEDULE
  const formattedDate = getEffectiveDate();
  const [schedule, setSchedule] = useState<ScheduleType>();
  const { data: DataSchedule, isLoading: LoadingSchedule } =
    useGetScheduleByDateEmployeeId(creds?.employee_id, formattedDate);

  const [attendance, setAttendance] = useState<AttendanceType>();
  const { data: DataAttendance } = useGetAttendanceByScheduleId(schedule?.id);
  useEffect(() => {
    if (DataSchedule) {
      setSchedule(DataSchedule);
    }
  }, [DataSchedule]);

  useEffect(() => {
    if (DataAttendance) {
      setAttendance(DataAttendance);
    }
  }, [DataAttendance]);
  // END FOR GET SCHEDULE

  if (LoadingSchedule) {
    return (
      <div className="w-full flex justify-center">
        <Loader />
      </div>
    );
  }

  console.log("Data Schedule :", schedule);
  console.log("Data attendance :", attendance);

  return (
    <section className="mx-auto max-w-xs bg-white  w-full shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700 mb-2 -mt-16">
      <div className="flex justify-between text-xs items-center p-2 -mt-1 -mb-1">
        <div>
          <Text fw={700} c={"#654433"}>
            Jadwal
          </Text>
        </div>
        <div className="my-auto text-right -mt-2 me-2">
          <Badge
            size="sm"
            className="uppercase"
            style={{
              marginTop: "7px",
              marginLeft: "4px",
              borderRadius: "2px",
            }}
            color={schedule?.status == "on" ? "green" : "red"}
          >
            {schedule?.status}
          </Badge>
        </div>
      </div>
      <Divider size={"sm"} />
      {schedule && (
        <div className="divide-y divide-gray-500">
          <div className="w-full grid grid-cols-12 p-1 -mb-2">
            <div className="col-span-3 text-center m-auto p-1">
              <Text size="35px" fw={700}>
                {schedule?.shift_code}
              </Text>
              <Text style={{ marginTop: "-5px" }} size="sm">
                Malam
              </Text>
            </div>
            <Divider
              orientation="vertical"
              className="col-span-1 ml-2 mb-2"
              style={{ height: "95px" }}
            />
            <div className="col-span-8 ms-2 -ml-2 text-left">
              <div className="ms-2 -mb-2">
                <Text size="xs">Hari & tanggal : </Text>
                <Text size="sm" fw={700}>
                  {schedule?.date &&
                    format(new Date(schedule.date), "EEEE, dd MMMM yyyy", {
                      locale: id,
                    })}
                </Text>
              </div>
              <Divider my="sm" />
              <div className="-mt-2 w-full grid grid-cols-12 mb-1">
                <div className="col-span-6 text-left mt-1 ms-2">
                  <Text size="xs">Jam kerja</Text>
                  <Text size="sm" fw={700}>
                    {schedule?.start_time} - {schedule?.end_time}
                  </Text>
                </div>
                <div className="col-span-6 text-right -mt-1"></div>
              </div>
            </div>
          </div>
          <Divider size={"sm"} />
          <div className="grid grid-cols-2 text-xs p-2">
            <div className="flex gap-2">
              <IconClockHour8 size={15} className="text-green-400" /> Check-in :
              {attendance?.check_in
                ? format(new Date(attendance.check_in), "HH:mm", { locale: id })
                : "--:--"}
            </div>
            <div className="ps-3 flex gap-2">
              <IconClockHour8 size={15} className="text-rose-400" /> Check-out :{" "}
              {attendance?.check_out
                ? format(new Date(attendance.check_out), "HH:mm", {
                    locale: id,
                  })
                : "--:--"}
            </div>
          </div>
        </div>
      )}
      {!schedule && (
        <div className="p-4">
          <div className="px-3 py-2">
            <div className="flex justify-center"></div>
            <div className="flex justify-center">
              <Text fw={700} size="sm" c={"gray"}>
                Ups!
              </Text>
            </div>
            <div className="flex justify-center -mt-1">
              <Text fw={700} size="xs" c={"gray"}>
                Jadwal tidak ditemukan
              </Text>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
