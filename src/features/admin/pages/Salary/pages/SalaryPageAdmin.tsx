import { Divider, Text } from "@mantine/core";
import { DetailAttendancesEmployee, EmployeeCardSalary } from "../components";
import { useEffect, useState } from "react";
import { MonthPickerInput } from "@mantine/dates";
import { addDays, format, getDay, startOfMonth } from "date-fns";
import { id } from "date-fns/locale";
import { EmployeeType, ScheduleType } from "@/types";
import { useGetScheduleByDate } from "../../Schedule";

function getFirstSaturday(date: Date): Date {
  const firstOfMonth = startOfMonth(date);
  const day = getDay(firstOfMonth);
  const offset = (6 - day + 7) % 7;
  return addDays(firstOfMonth, offset);
}

export const SalaryPageAdmin: React.FC = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeType>();
  const [month, setMonth] = useState<Date | null>(new Date());
  const [date, setDate] = useState<string>();
  useEffect(() => {
    if (month) {
      const firstSaturday = getFirstSaturday(month);
      setDate(format(firstSaturday, "yyyy-MM-dd", { locale: id }));
    }
  }, [month]);

  // GET EMPLOYEES
  const [employees, setEmployees] = useState<ScheduleType[]>([]);
  const { data: DataEmployees } = useGetScheduleByDate(date);
  useEffect(() => {
    if (DataEmployees) {
      setEmployees(DataEmployees);
    }
  }, [DataEmployees]);
  // END FOR GET EMPLOYEES

  return (
    <section>
      <div className="bg-white shadow-lg p-6 rounded-lg">
        <div className="flex justify-between my-4 px-4">
          <div>
            <Text fw={"bolder"} size="xl" c="#343a40">
              Gaji pegawai {month && format(month, "MMMM yyyy", { locale: id })}
            </Text>
          </div>
          <div className="flex">
            <Text fw={400} size="sm">
              Pilih bulan :
            </Text>
            <MonthPickerInput
              mt={-4}
              ml={5}
              w={200}
              size="xs"
              value={month}
              onChange={setMonth}
            />
          </div>
        </div>
        <Divider />
        <div className="grid grid-cols-12 mt-4 gap-3">
          <div className="col-span-3">
            <EmployeeCardSalary
              employees={employees}
              setSelectedEmployee={setSelectedEmployee}
            />
          </div>
          <div className="col-span-9">
            <DetailAttendancesEmployee
              selectedEmployee={selectedEmployee}
              month={date}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
