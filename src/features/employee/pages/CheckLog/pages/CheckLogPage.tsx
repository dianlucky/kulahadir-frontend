import { useEffect, useState } from "react";
import {
  AttendanceCardSection,
  DailyTaskSection,
  LocationCard,
} from "../components";
import { AttendanceType, DailyTaskEmployeeType, ScheduleType } from "@/types";
import { useGetScheduleByDateEmployeeId } from "../../schedule/api";
import { format, subDays } from "date-fns";
import { useGetAttendanceByScheduleId } from "../../History";
import {
  useGeoLocation,
  useGetDailyTaskEmployeeByDateEmployeeId,
} from "../api";
import { useAuth } from "@/features/auth";
import { toZonedTime } from "date-fns-tz";

export const CheckLogPage: React.FC = () => {
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
  //=========================================//
  // GET SCHEDULE BY DATE
  const formattedDate = getEffectiveDate();
  const [schedule, setSchedule] = useState<ScheduleType>();
  const { data: DataSchedule, refetch: RefetchSchedule } =
    useGetScheduleByDateEmployeeId(creds?.employee_id, formattedDate);
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
    formattedDate,
    creds?.employee_id
  );
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
      <div className="mb-2 mx-5">
        <LocationCard long={userCoords?.lng} lat={userCoords?.lat} />
      </div>
      <div className="mt-2 mx-5">
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
      <div className="mt-2 mb-20 mx-5">
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
