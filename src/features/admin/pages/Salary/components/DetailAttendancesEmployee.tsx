import { Divider, Image, Text } from "@mantine/core";
import { IconCalendarWeek } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { SalaryCardAdmin } from "./SalaryCardAdmin";
import { AttendanceMonthlyDetail } from "./AttendanceMonthlyDetail";
import { MonthlyAttendanceRecap } from "./MonthlyAttendanceRecap";
import {
  AttendanceType,
  CashAdvanceType,
  EmployeeType,
  SalaryType,
  ScheduleType,
} from "@/types";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useGetScheduleByMonthEmployeeId } from "@/features/employee/pages/schedule/api";
import { useGetAttendanceByDateEmployeeId } from "@/features/employee/pages/History";
import {
  AttendanceCard,
  CalendarSection,
} from "@/features/employee/pages/History/pages/attendance";
import { useGetCashAdvanceByMonthEmployeeId } from "@/features/employee/pages/CashAdvance";
import { useGetSalaryByMonthEmployeeId } from "@/features/employee/pages/Salary/api";

interface DetailAttendancesEmployeeProps {
  selectedEmployee?: EmployeeType;
  month?: string;
}

export const DetailAttendancesEmployee: React.FC<
  DetailAttendancesEmployeeProps
> = ({ selectedEmployee, month }) => {
  const [selectedDate, setSelectedDate] = useState<string>(
    format(new Date(), "yyyy-MM-dd", { locale: id })
  );

  // GET SCHEDULES
  const [schedules, setSchedules] = useState<ScheduleType[]>([]);
  const {
    data: DataSchedules,
    refetch: RefetchSchedules,
  } = useGetScheduleByMonthEmployeeId(
    format(new Date(selectedDate), "yyyy-MM", { locale: id }),
    selectedEmployee?.id
  );
  useEffect(() => {
    if (DataSchedules) {
      setSchedules(DataSchedules);
    }
  }, [DataSchedules, selectedEmployee]);
  // END FOR GET SCHEDULES

  // GET ATTENDANCE
  const [attendance, setAttendance] = useState<AttendanceType | undefined>();
  const { data: DataAttendance, refetch: RefecthAttendance } =
    useGetAttendanceByDateEmployeeId(selectedDate, selectedEmployee?.id);
  useEffect(() => {
    if (DataAttendance) {
      setAttendance(DataAttendance);
    } else {
      setAttendance(undefined); // ⬅️ reset kalau tidak ada data
    }
  }, [DataAttendance, selectedEmployee]);
  // END FOR GET ATTENDANCE

  // GET CASH ADVANCE
  const [cashAdvances, setCashAdvances] = useState<CashAdvanceType[]>([]);
  const { data: DataCashAdvances } = useGetCashAdvanceByMonthEmployeeId(
    format(month ? month : new Date(), "yyyy-MM", { locale: id })
  );
  useEffect(() => {
    if (DataCashAdvances) {
      setCashAdvances(DataCashAdvances);
    } else {
      setCashAdvances([]);
    }
  }, [DataCashAdvances, selectedEmployee, selectedDate]);
  // END FOR GET CASH ADVANCE

  // GET SALARY
  const [salary, setSalary] = useState<SalaryType>();
  const { data: DataSalary, refetch: RefetchSalary } =
    useGetSalaryByMonthEmployeeId(month, selectedEmployee?.id);
  useEffect(() => {
    if (DataSalary) {
      setSalary(DataSalary);
    } else {
      setSalary(undefined);
    }
  }, [DataSalary, selectedEmployee]);
  console.log("GAJIIIIIIIII :", salary);
  // END FOR GET SALARY

  useEffect(() => {
    RefetchSchedules();
    RefecthAttendance();
    RefetchSalary();
  }, [selectedDate, selectedEmployee]);

  return (
    <>
      <section className="bg-slate-50 shadow-sm p-4">
        <div className="flex justify-between mb-2">
          <div className="text-dark font-semibold cursor-pointer text-md">
            Data kehadiran pegawai {selectedEmployee?.name}
          </div>
          <div>
            <IconCalendarWeek />
          </div>
        </div>
        <Divider />
        {selectedEmployee && (
          <div className="grid grid-cols-12 mt-4 gap-2">
            <div className="col-span-4">
              <div className="">
                <div className="flex justify-center w-full">
                  <CalendarSection
                    setSelectedDate={setSelectedDate}
                    schedules={schedules}
                  />
                </div>
              </div>
              <div>
                <AttendanceCard attendance={attendance} />
              </div>
            </div>
            <div className="col-span-4">
              <div>
                <MonthlyAttendanceRecap schedules={schedules} />
              </div>
              <div>
                <AttendanceMonthlyDetail
                  salary={salary}
                  RefetchSalary={RefetchSalary}
                  selectedEmployee={selectedEmployee}
                  month={month}
                  schedules={schedules}
                  cashAdvances={cashAdvances}
                />
              </div>
            </div>
            <div className="col-span-4">
              {salary != undefined && (
                <SalaryCardAdmin salary={salary} schedules={schedules} />
              )}
              {salary == undefined && (
                <div className="bg-white shadow-sm p-4 rounded-xl">
                  <div className="mt-2 px-3 py-2 mt-40 mb-70">
                    <div className="flex justify-center">
                      <Image
                        src="/images/not-found.svg"
                        style={{
                          width: "120px",
                        }}
                      />
                    </div>
                    <div className="flex justify-center">
                      <Text fw={700} size="md">
                        Ups!
                      </Text>
                    </div>
                    <div className="flex justify-center -mt-1">
                      <Text fw={700} size="sm">
                        Gaji masih belum diterbitkan
                      </Text>
                    </div>
                    <div className="flex justify-center -mt-1">
                      <Text fw={400} size="xs"></Text>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {!selectedEmployee && (
          <div className="p-4 rounded-xl mt-20 mb-50">
            <div className="mt-2 px-3 py-2">
              <div className="flex justify-center">
                <Image
                  src="/images/not-found.svg"
                  style={{
                    width: "200px",
                  }}
                />
              </div>
              <div className="flex justify-center">
                <Text fw={700} size="md">
                  Ups!
                </Text>
              </div>
              <div className="flex justify-center -mt-1">
                <Text fw={700} size="sm">
                  Kamu belum memilih pegawai
                </Text>
              </div>
              <div className="flex justify-center -mt-1">
                <Text fw={400} size="xs">
                  Tekan tombol info yang ada di list pegawai
                </Text>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};
