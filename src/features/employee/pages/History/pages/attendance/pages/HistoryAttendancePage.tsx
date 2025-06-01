import { IconChevronLeft } from "@tabler/icons-react";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AttendanceCard, CalendarSection } from "../components";
import { AttendanceType, ScheduleType } from "@/types";
import {
  useGetAttendanceByDateEmployeeId,
  useGetAttendanceByMonthEmployeeId,
} from "../../../api";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useGetScheduleByMonthEmployeeId } from "@/features/employee/pages/schedule/api";
import { useAuth } from "@/features/auth";

export const HistoryAttendancePage: React.FC = () => {
  const { creds } = useAuth();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<string>(
    format(new Date(), "yyyy-MM-dd", { locale: id })
  );

  // GET SCHEDULES
  const [schedules, setSchedules] = useState<ScheduleType[]>([]);
  const {
    data: DataSchedules,
    refetch: RefetchSchedules,
    isLoading: LoadingSchedules,
  } = useGetScheduleByMonthEmployeeId(
    format(new Date(selectedDate), "yyyy-MM", { locale: id }),
    creds?.employee_id
  );
  useEffect(() => {
    if (DataSchedules) {
      setSchedules(DataSchedules);
    }
  }, [DataSchedules]);
  // END FOR GET SCHEDULES

  // GET ATTENDANCE
  const [attendance, setAttendance] = useState<AttendanceType | undefined>();
  const { data: DataAttendance, refetch: RefecthAttendance } =
    useGetAttendanceByDateEmployeeId(selectedDate, creds?.employee_id);
  useEffect(() => {
    if (DataAttendance) {
      setAttendance(DataAttendance);
    } else {
      setAttendance(undefined); // ⬅️ reset kalau tidak ada data
    }
  }, [DataAttendance]);
  // END FOR GET ATTENDANCE

  useEffect(() => {
    RefetchSchedules();
    RefecthAttendance();
  }, [selectedDate]);

  console.log("TANGGAAAAAALLLLL :", selectedDate);
  console.log("KEHADIRAN :", attendance);
  return (
    <main>
      <section className="w-full h-20 bg-brown rounded-b-3xl"></section>

      <section className="bg-white mx-5 p-3 shadow-md rounded-lg flex flex-col gap-2 -mt-10">
        <div className="flex justify-between">
          <div>
            <IconChevronLeft
              onClick={() => {
                navigate(-1);
              }}
              size={21}
              className="font-bold rounded-md"
            />
          </div>
          <div className="font-semibold text-brown">
            <h2 className="font-semibold">Riwayat absensi</h2>
          </div>
          <div></div>
        </div>
      </section>
      <div className="mt-2 mx-6">
        <CalendarSection
          setSelectedDate={setSelectedDate}
          schedules={schedules}
        />
      </div>
      <div className="mt-2 mx-6 mb-20">
        <AttendanceCard attendance={attendance} />
      </div>
    </main>
  );
};
