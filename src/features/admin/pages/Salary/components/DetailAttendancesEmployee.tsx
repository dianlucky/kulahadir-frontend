import {
  Badge,
  Button,
  Divider,
  Modal,
  NumberInput,
  RingProgress,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import {
  IconCalendar,
  IconCalendarCheck,
  IconCalendarWeek,
  IconClockDown,
  IconClockUp,
} from "@tabler/icons-react";
import { useState } from "react";
import { SalaryCardAdmin } from "./SalaryCardAdmin";
import { AttendanceMonthlyDetail } from "./AttendanceMonthlyDetail";
import { MonthlyAttendanceRecap } from "./MonthlyAttendanceRecap";

export const DetailAttendancesEmployee: React.FC = () => {
  const [date, setDate] = useState<Date | null>(new Date());
  return (
    <>
      <section className="bg-white shadow-sm p-4">
        <div className="flex justify-between mb-2">
          <div className="text-dark font-semibold cursor-pointer text-md">
            Data kehadiran pegawai (Dian Lucky Prayogi)
          </div>
          <div>
            <IconCalendarWeek />
          </div>
        </div>
        <Divider />
        <div className="grid grid-cols-12 mt-4 gap-2">
          <div className="col-span-4">
            <div className="bg-white shadow-sm p-4">
              <div className="flex justify-center w-full mt-2">
                <DatePicker value={date} onChange={setDate} size="sm" />
              </div>
            </div>
            <div className="bg-white shadow-sm p-4 mt-3">
              <div className="grid grid-cols-12 p-1">
                <div className="col-span-2">
                  <div className="text-center">
                    <Text fw={"bold"} size="lg">
                      SF2
                    </Text>
                    <Text size="xs" mt={-6}>
                      Malam
                    </Text>
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="w-px h-full bg-gray-300 mx-4" />
                </div>
                <div className="col-span-9">
                  <div>
                    <div>
                      <Text fw={"bold"} size="sm">
                        Jumat, 23 Mei 2003
                      </Text>
                    </div>
                    <div>
                      <Divider />
                    </div>
                    <div className="flex justify-between mt-2">
                      <div className="w-full flex">
                        <div>
                          <IconClockDown color="#77B254" size={16} />
                        </div>
                        <div className="ml-2">
                          <Text size="xs" fw={"bold"}>
                            16.03
                          </Text>
                        </div>
                      </div>
                      <Divider orientation="vertical" />
                      <div className="w-full flex ml-2">
                        <div>
                          <IconClockUp color="#F72C5B" size={16} />
                        </div>
                        <div className="ml-2">
                          <Text size="xs" fw={"bold"}>
                            01.23
                          </Text>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-4">
            <div>
              <MonthlyAttendanceRecap />
            </div>
            <div>
              <AttendanceMonthlyDetail />
            </div>
          </div>
          <div className="col-span-4">
            <SalaryCardAdmin />
          </div>
        </div>
      </section>
    </>
  );
};
