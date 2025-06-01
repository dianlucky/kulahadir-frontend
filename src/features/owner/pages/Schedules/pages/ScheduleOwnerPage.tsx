import { IconChevronLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { CalendarSection, EmployeeScheduleList } from "../components";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { ScheduleType } from "@/types";
import { useGetScheduleByDate } from "@/features/admin/pages/Schedule";

export const ScheduleOwnerPage: React.FC = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<string | undefined>(
    format(new Date(), "yyyy-MM-dd")
  );

  const [workingEmployees, setWorkingEmployees] = useState<ScheduleType[]>([]);
  const { data: DataWorkingEmployees, refetch: RefetchWorkingEmployees } =
    useGetScheduleByDate(date);
  useEffect(() => {
    if (DataWorkingEmployees) {
      setWorkingEmployees(DataWorkingEmployees);
    }
  }, [DataWorkingEmployees]);

  // console.log("selected date: ", date);
  // console.log("working : ", workingEmployees);
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
          <div className="font-semibold text-brown -ml-3">
            <h2 className="font-semibold">Data Jadwal Pegawai</h2>
          </div>
          <div></div>
        </div>
      </section>
      <div>
        <div className="mt-2 mx-6">
          <CalendarSection setDate={setDate} />
        </div>
        <div className="-mt-2 mx-2 mb-15">
          <EmployeeScheduleList
            workingEmployees={workingEmployees}
            date={date}
            RefetchWorkingEmployees={RefetchWorkingEmployees}
          />
        </div>
      </div>
    </main>
  );
};
