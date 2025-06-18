import { IconChevronLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { DailyCalendar, DailySchedule, DailyTaskSection } from "../components";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { AttendanceType, DailyTaskEmployeeType, ScheduleType } from "@/types";
import { useGetScheduleByDateEmployeeId } from "../api";
import { useAuth } from "@/features/auth";
import { useGetAttendanceByScheduleId } from "../../History";
import { useGetDailyTaskEmployeeByDateEmployeeId } from "../../CheckLog/api";

export const SchedulePage: React.FC = () => {
  const { creds } = useAuth();
  const navigate = useNavigate();

  const [date, setDate] = useState<string | undefined>(
    format(new Date(), "yyyy-MM-dd")
  );

  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleType>();
  const { data: DataSelectedSchedule, refetch: RefetchSchedule } =
    useGetScheduleByDateEmployeeId(creds?.employee_id, date);

  useEffect(() => {
    RefetchSchedule(); // panggil saat date berubah
  }, [date]);

  useEffect(() => {
    if (DataSelectedSchedule) {
      setSelectedSchedule(DataSelectedSchedule);
    } else {
      setSelectedSchedule(undefined);
    }
  }, [DataSelectedSchedule]);

  const [attendance, setAttendance] = useState<AttendanceType | undefined>();
  const { data: DataAttendance, refetch: RefetchAttendance } =
    useGetAttendanceByScheduleId(selectedSchedule?.id);

  useEffect(() => {
    if (selectedSchedule?.id) {
      RefetchAttendance();
    }
  }, [selectedSchedule]);

  useEffect(() => {
    if (DataAttendance) {
      setAttendance(DataAttendance);
    } else {
      setAttendance(undefined);
    }
  }, [DataAttendance]);

  //=========================================//
  // GET DAILY TASK
  const [dailyTask, setDailyTask] = useState<DailyTaskEmployeeType[]>([]);
  const { data: DataDailyTaskEmployee } =
    useGetDailyTaskEmployeeByDateEmployeeId(date, creds?.employee_id);
  useEffect(() => {
    if (DataDailyTaskEmployee) {
      setDailyTask(DataDailyTaskEmployee);
    }
  }, [DataDailyTaskEmployee]);
  // END FOR GET DAILY TASK
  //=========================================//

  return (
    <main>
      <section className="w-full h-20 bg-brown rounded-b-3xl"></section>

      <section className="bg-white mx-5 p-3 shadow-md rounded-lg flex flex-col gap-2 -mt-10">
        <div className="grid grid-cols-12">
          <div className="col-span-1">
            <IconChevronLeft
              onClick={() => {
                navigate(-1);
              }}
              size={21}
              className="font-bold rounded-md"
            />
          </div>
          <div className="col-span-11 text-center -ml-4 font-semibold text-brown">
            <h2 className="font-semibold">Jadwal bulanan</h2>
          </div>
          {/* </div> */}
        </div>
      </section>
      <div className="mx-5">
        <DailyCalendar setDate={setDate} />
      </div>
      <div className="mx-5">
        <DailySchedule
          selectedSchedule={selectedSchedule}
          attendance={attendance}
        />
      </div>
      <div className="mb-20 -mt-2 mx-5">
        <DailyTaskSection dailyTask={dailyTask} />
      </div>
    </main>
  );
};
