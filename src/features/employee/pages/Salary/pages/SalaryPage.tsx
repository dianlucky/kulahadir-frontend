import { IconChevronLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { MonthPickerSection } from "../../CashAdvance";
import { SalaryNotFound, SalarySection } from "../components";
import { useEffect, useState } from "react";
import { id } from "date-fns/locale";
import { format } from "date-fns";
import { SalaryType } from "@/types";
import { useGetSalaryByMonthEmployeeId } from "../api";
import { useAuth } from "@/features/auth";

export const SalaryPage: React.FC = () => {
  const { creds } = useAuth();
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState<string | undefined>(
    format(new Date(), "yyyy-MM", { locale: id })
  );
  const [salary, setSalary] = useState<SalaryType>();
  const { data: DataSalary, refetch: RefetchSalary } =
    useGetSalaryByMonthEmployeeId(selectedMonth, creds?.employee_id);
  useEffect(() => {
    if (DataSalary) {
      setSalary(DataSalary);
    } else {
      setSalary(undefined);
    }
  }, [DataSalary]);
  useEffect(() => {
    RefetchSalary();
  }, [selectedMonth]);
  console.log("Gaji :", salary);
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
            <h2 className="font-semibold">Gaji</h2>
          </div>
          {/* </div> */}
        </div>
      </section>

      <div className="mt-2 mx-6">
        <MonthPickerSection setSelectedMonth={setSelectedMonth} />
      </div>
      <div className="mt-2 mx-6 mb-20">
        {salary ? <SalarySection salary={salary} /> : <SalaryNotFound />}
      </div>
    </main>
  );
};
