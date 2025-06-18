import { Divider, Text } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { RecapAttendance } from "./RecapAttendance";
import { AttendanceType, ScheduleType } from "@/types";
import { useGetScheduleByDate } from "../api";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useGetAttendanceByDateAll } from "@/features/employee/pages/History";
import { AttendanceTable } from "./AttendanceTable";

export const WorkerDetailSchedule: React.FC = () => {
  const [date, setDate] = useState<Date | null>(new Date());

  // GET SCHEDULES
  const [schedules, setSchedules] = useState<ScheduleType[]>([]);
  const { data: DataSchedules, isLoading: LoadingSchedules } =
    useGetScheduleByDate(
      format(date ? date : new Date(), "yyyy-MM-dd", { locale: id })
    );
  useEffect(() => {
    if (DataSchedules) {
      setSchedules(DataSchedules);
    }
  }, [DataSchedules, date]);
  console.log("Jadwal : ", schedules);
  // END FOR GET SCHEDULES

  // GET ATTENDANCE
  const [attendances, setAttendances] = useState<AttendanceType[]>([]);
  const { data: DataAttendances, isLoading: LoadingAttendances } =
    useGetAttendanceByDateAll(
      format(date ? date : new Date(), "yyyy-MM-dd", { locale: id })
    );
  useEffect(() => {
    if (DataAttendances) {
      setAttendances(DataAttendances);
    }
  }, [DataAttendances, date]);
  console.log("Kehadiran : ", attendances);
  // END FOR GET ATTENDANCE

  return (
    <section className="bg-white shadow-lg p-6 rounded-lg mt-2">
      <div className="flex justify-center mb-4">
        <Text fw={"bolder"} size="lg" c="#343a40">
          Data Kehadiran Pegawai
        </Text>
      </div>
      <Divider />
      <div className="grid grid-cols-12 mt-5 gap-2">
        <div className="col-span-3 bg-white shadow-sm p-6 rounded-lg h-[370px]">
          <div className="flex justify-between mb-1 -mt-3">
            <Text fw={"bold"} size="md" c="#343a40">
              Kalender
            </Text>
            <IconCalendar />
          </div>
          <Divider />
          <div className="flex justify-center w-full mt-2">
            <DatePicker value={date} onChange={setDate} size="sm" />
          </div>
        </div>
        <div className="col-span-3">
          <RecapAttendance schedules={schedules} date={date} />
        </div>
        {!LoadingAttendances && !LoadingSchedules && (
          <div className="col-span-6">
            <AttendanceTable schedules={schedules} attendances={attendances} />
          </div>
        )}
      </div>
    </section>
  );
};
