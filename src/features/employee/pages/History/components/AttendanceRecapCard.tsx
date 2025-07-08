import { ScheduleType } from "@/types";
import { Divider, Text } from "@mantine/core";
import { IconCalendar } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetScheduleByMonthEmployeeId } from "../../schedule/api";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useAuth } from "@/features/auth";

export const AttendanceRecapCard: React.FC = () => {
  const { creds } = useAuth();

  const [schedules, setSchedules] = useState<ScheduleType[]>([]);
  const { data: DataSchedules } = useGetScheduleByMonthEmployeeId(
    format(new Date(), "yyyy-MM", { locale: id }),
    creds?.employee_id
  );
  useEffect(() => {
    if (DataSchedules) {
      setSchedules(DataSchedules);
    }
  });

  return (
    <section className="bg-white mx-auto max-w-xs w-full -mt-10 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700 ">
      <div className="divide-y divide-gray-300">
        <div className="flex justify-between text-xs items-center p-2">
          <Text fw={700} c="#654433">
            Rekap absensi bulan ini
          </Text>
          <IconCalendar size={22} color="#654433" />
        </div>
        <Divider></Divider>
        <div className="w-full grid grid-cols-5 pb-2 pt-2">
          <Link
            to="#"
            className="px-4 flex flex-col items-center justify-center ml-3"
          >
            <div className="p-2 bg-transparent text-green-600 text-2xl rounded-xl font-bold w-full h-full text-center ">
              {
                schedules.filter(
                  (data) =>
                    data.attendance_status == "Present" ||
                    data.attendance_status == "Late" ||
                    data.attendance_status == "Working"
                ).length
              }
            </div>
            <div className="text-xs -mt-1 ml-6">Hadir</div>
          </Link>
          <Divider
            className="flex flex-col mx-auto"
            orientation="vertical"
          ></Divider>
          <Link
            to="#"
            className="px-4 flex flex-col items-center justify-center"
          >
            <div className="p-2 text-yellow-600 text-2xl  rounded-xl font-bold w-full h-full text-center ">
              {schedules.filter((data) => data.status == "On").length}
            </div>
            <div className="text-xs -mt-1">Libur</div>
          </Link>
          <Divider
            className="flex flex-col mx-auto"
            orientation="vertical"
          ></Divider>
          <Link
            to="#"
            className="px-4 flex flex-col items-center justify-center mr-15 -ml-2"
          >
            <div className="p-2 text-sky-600 text-2xl rounded-xl font-bold w-full h-full text-center ">
              {
                schedules.filter((data) => data.attendance_status == "Leave")
                  .length
              }
            </div>
            <div className="text-xs -mt-1 ml-4">Sakit</div>
          </Link>
        </div>
        <Divider className="mb-4"></Divider>
      </div>
    </section>
  );
};
