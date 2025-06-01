import { IconChevronLeft } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EmployeeSalaryList, MonthPickerSection } from "../components";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { ScheduleType } from "@/types";
import { useGetScheduleByDate } from "@/features/admin/pages/Schedule";

export const SalaryOwnerPage: React.FC = () => {
  const navigate = useNavigate();
  const [month, setMonth] = useState<string>(
    format(new Date(), "yyyy-MM-dd", { locale: id })
  );
  console.log(month);

  // GET EMPLOYEE FROM SCHEDULE
  const [employees, setEmployees] = useState<ScheduleType[]>([]);
  const { data: DataEmployees } = useGetScheduleByDate(month);
  useEffect(() => {
    if (DataEmployees) {
      setEmployees(DataEmployees);
    } else {
      setEmployees([]);
    }
  }, [DataEmployees]);
  // END FOR GET EMPLOYEE FROM SCHEDULE

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
            <h2 className="font-semibold">Gaji pegawai</h2>
          </div>
          <div></div>
        </div>
      </section>
      <div>
        <div className="mt-2 mx-6">
          <MonthPickerSection setMonth={setMonth} />
        </div>
        <div className=" mx-6 mb-20">
          <EmployeeSalaryList
            employees={employees}
            month={format(month, "yyyy-MM")}
          />
        </div>
      </div>
    </main>
  );
};
