import { IconChevronLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { CalendarSection, EmployeeSection } from "../components";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { AttendanceType } from "@/types";
import { useGetAttendanceByDateAll } from "@/features/employee/pages/History";

export const AttendancesOwnerPages: React.FC = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<string | undefined>(
    format(new Date(), "yyyy-MM-dd")
  );

  // GET ATTENDANCE
  const [attendances, setAttendances] = useState<AttendanceType[]>([]);
  const { data: DataAttendances, isLoading: LoadingAttendances } =
    useGetAttendanceByDateAll(date);
  useEffect(() => {
    if (DataAttendances) {
      setAttendances(DataAttendances);
    }
  }, [DataAttendances]);
  // END FOR GET ATTENDANCE
  console.log("Data Attendances :", attendances);
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
            <h2 className="font-semibold">Data kehadiran pegawai</h2>
          </div>
          <div></div>
        </div>
      </section>
      <div>
        <div className="mt-2 mx-6">
          <CalendarSection setDate={setDate} />
        </div>
        <div className="-mt-2 mx-6 mb-20">
          {!LoadingAttendances && <EmployeeSection attendances={attendances} />}
        </div>
      </div>
    </main>
  );
};
