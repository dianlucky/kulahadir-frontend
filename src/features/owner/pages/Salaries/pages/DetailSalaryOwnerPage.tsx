import { IconChevronLeft } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CreateSalarySection,
  DetailEmployeeSection,
  PayslipSection,
} from "../components";
import {
  CashAdvanceType,
  EmployeeType,
  SalaryType,
  ScheduleType,
} from "@/types";
import { useGetSalaryByMonthEmployeeId } from "@/features/employee/pages/Salary/api";
import { useGetScheduleByMonthEmployeeId } from "@/features/employee/pages/schedule/api";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { CalendarSection } from "@/features/employee/pages/History/pages/attendance";
import { useGetCashAdvanceByMonthEmployeeId } from "@/features/employee/pages/CashAdvance";

export const DetailSalaryOwnerPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const employee = location.state.data.employee as EmployeeType;
  const month = location.state.data.month as string;
  const [selectedDate, setSelectedDate] = useState<string>(
    format(new Date(), "yyyy-MM-dd", { locale: id })
  );
  console.log("Data pegawai : ", selectedDate);

  // GET SALARIES
  const [salary, setSalary] = useState<SalaryType>();
  const {
    data: DataSalary,
    refetch: RefetchSalary,
    isLoading: LoadingSalary,
  } = useGetSalaryByMonthEmployeeId(month, employee.id);
  useEffect(() => {
    if (DataSalary) {
      setSalary(DataSalary);
    } else {
      setSalary(undefined);
    }
  }, [DataSalary]);
  console.log("Gaji : ", salary);
  // END FOR GET SALARIES

  // GET SCHEDULES EMPLOYEE
  const [schedules, setSchedules] = useState<ScheduleType[]>([]);
  const { data: DataSchedules } = useGetScheduleByMonthEmployeeId(
    month,
    employee.id
  );
  useEffect(() => {
    if (DataSchedules) {
      setSchedules(DataSchedules);
    }
  }, [DataSchedules]);
  // END FOR GET SCHEDULES EMPLOYEE

  // GET KASBON
  const [cashAdvances, setCashAdvances] = useState<CashAdvanceType[]>([]);
  const { data: DataCashAdvances } = useGetCashAdvanceByMonthEmployeeId(
    month,
    employee.id
  );
  useEffect(() => {
    if (DataCashAdvances) {
      setCashAdvances(DataCashAdvances);
    }
  }, [DataCashAdvances]);
  // console.log("Kasbon :", cashAdvances);
  // END FOR GET KASBON
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
            <h2 className="font-semibold">Detail gaji pegawai</h2>
          </div>
          <div></div>
        </div>
      </section>
      <div>
        <div className="mt-2 mx-6">
          <DetailEmployeeSection employee={employee} />
        </div>
        <div className="-mt-2 mx-6 -mb-4">
          <CalendarSection
            setSelectedDate={setSelectedDate}
            schedules={schedules}
          />
        </div>
        {salary && !LoadingSalary ? (
          <div className="mt-6 mx-6 mb-20">
            <PayslipSection
              salary={salary}
              refetchSalary={RefetchSalary}
              schedules={schedules}
            />
          </div>
        ) : (
          <div className="mt-6 mx-6">
            <CreateSalarySection
              cashAdvances={cashAdvances}
              employee={employee}
              month={month}
              RefetchSalary={RefetchSalary}
              schedules={schedules}
            />
          </div>
        )}
      </div>
    </main>
  );
};
