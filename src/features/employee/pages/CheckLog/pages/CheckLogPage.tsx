import { useEffect, useState } from "react";
import {
  AttendanceCardSection,
  DailyTaskSection,
  LocationCard,
} from "../components";
import { AttendanceType, DailyTaskEmployeeType, ScheduleType } from "@/types";
import { useGetScheduleByDateEmployeeId } from "../../schedule/api";
import { format } from "date-fns";
import { useGetAttendanceByScheduleId } from "../../History";
import {
  useGeoLocation,
  useGetDailyTaskEmployeeByDateEmployeeId,
} from "../api";
import { useAuth } from "@/features/auth";

export const CheckLogPage: React.FC = () => {
  const { creds } = useAuth();
  //=========================================//
  // GET SCHEDULE BY DATE
  const [schedule, setSchedule] = useState<ScheduleType>();
  const { data: DataSchedule, refetch: RefetchSchedule } =
    useGetScheduleByDateEmployeeId(
      creds?.employee_id,
      format(new Date(), "yyyy-MM-dd")
    );
  useEffect(() => {
    if (DataSchedule) {
      setSchedule(DataSchedule);
    }
  }, [DataSchedule]);
  // END FOR GET SCHEDULE BY DATE
  //=========================================//

  //=========================================//
  // GET ATTENDANCE BY SCHEDULE ID
  const [attendance, setAttendance] = useState<AttendanceType>();
  const { data: DataAttendance, refetch: RefetchAttendance } =
    useGetAttendanceByScheduleId(schedule?.id);
  useEffect(() => {
    if (DataAttendance) {
      setAttendance(DataAttendance);
    }
  }, [DataAttendance]);
  console.log("Kehadiran :", attendance);
  // END FOR GET ATTENDANCE BY SCHEDULE ID
  //=========================================//

  //=========================================//
  // LOCATION
  const { statusLocation, userCoords, distanceToOffice } = useGeoLocation();
  useEffect(() => {
    if (statusLocation) {
      console.log("✅ User berada di lokasi absen");
    } else {
      console.log("❌ User di luar jangkauan lokasi absen");
    }
    console.log("📏 Jarak ke kantor:", distanceToOffice, "meter");
  }, [statusLocation, distanceToOffice]);
  // END FOR LOCATION
  //=========================================//

  //=========================================//
  // GET DAILY TASK
  const [dailyTask, setDailyTask] = useState<DailyTaskEmployeeType[]>([]);
  const {
    data: DataDailyTaskEmployee,
    isLoading: LoadingDailyTaskEmployee,
    refetch: RefetchDailyTaskEmployee,
  } = useGetDailyTaskEmployeeByDateEmployeeId(
    format(new Date(), "yyyy-MM-dd"),
    creds?.employee_id
  );
  useEffect(() => {
    if (DataDailyTaskEmployee) {
      setDailyTask(DataDailyTaskEmployee);
    }
  }, [DataDailyTaskEmployee]);
  // END FOR GET DAILY TASK
  //=========================================//

  console.log("Daily task: ", dailyTask);

  return (
    <main>
      <section className="w-full h-20 bg-brown rounded-b-3xl"></section>
      <div className="mb-2">
        <LocationCard long={userCoords?.lng} lat={userCoords?.lat} />
      </div>
      <div className="mt-2">
        <AttendanceCardSection
          dailyTask={dailyTask}
          RefetchSchedule={RefetchSchedule}
          RefetchAttendance={RefetchAttendance}
          schedule={schedule}
          attendance={attendance}
          statusLocation={statusLocation}
          long={userCoords?.lng}
          lat={userCoords?.lat}
        />
      </div>
      <div className="mt-2 mb-20">
        {!LoadingDailyTaskEmployee && (
          <DailyTaskSection
            dailyTask={dailyTask}
            RefetchDailyTaskEmployee={RefetchDailyTaskEmployee}
            schedule={schedule}
          />
        )}
      </div>
    </main>
  );
};
