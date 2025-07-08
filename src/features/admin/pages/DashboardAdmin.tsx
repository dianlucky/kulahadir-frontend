/* eslint-disable linebreak-style */
import {
  Button,
  Divider,
  Indicator,
  Loader,
  Popover,
  Select,
  Text,
} from "@mantine/core";
import {
  IconAdjustments,
  IconChevronRight,
  IconDashboard,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/features/auth";
import {
  AllEmployeeCard,
  AttendanceCard,
  CalendarSection,
  CashAdvanceTable,
  FulltimeCard,
  ParttimeCard,
  RequestTable,
  WorkerList,
} from "../components";
import { AttendanceType, EmployeeType, ScheduleType } from "@/types";
import { useGetScheduleByDate } from "./Schedule";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useGetAttendanceByDateAll } from "@/features/employee/pages/History";
import { useGetAllEmployee } from "./DataMaster/Employee";

export const DashboardAdmin: React.FC = () => {
  const navigate = useNavigate();
  const { creds } = useAuth();
  if (!creds) navigate("/login");
  const [date, setDate] = useState<string>(
    format(new Date(), "yyyy-MM-dd", { locale: id })
  );

  // GET SCHEDULES
  const [schedules, setSchedules] = useState<ScheduleType[]>([]);
  const {
    data: DataSchedules,
    refetch: RefetchSchedules,
    isLoading: LoadingSchedules,
  } = useGetScheduleByDate(date);
  useEffect(() => {
    if (DataSchedules) {
      setSchedules(DataSchedules);
    } else {
      setSchedules([]);
    }
  }, [DataSchedules, date]);
  // END FOR GET SCHEDULES

  // GET ATTENDANCE
  const [attendances, setAttendances] = useState<AttendanceType[]>([]);
  const { data: DataAttendances, refetch: RefetchAttendances } =
    useGetAttendanceByDateAll(date);
  useEffect(() => {
    if (DataAttendances) {
      setAttendances(DataAttendances);
    } else {
      setAttendances([]);
    }
  }, [DataAttendances, date]);
  // END FOR GET ATTENDANCE

  useEffect(() => {
    RefetchAttendances();
    RefetchSchedules();
  }, [date]);

  // GET EMPLOYEES
  const [employees, setEmployees] = useState<EmployeeType[]>([]);
  const { data: DataEmployees } = useGetAllEmployee();
  useEffect(() => {
    if (DataEmployees) {
      setEmployees(DataEmployees);
    }
  }, [DataEmployees]);
  console.log("Employeeeeeeeessssssss : ", employees);
  // END FOR GET EMPLOYEES

  // FILTER REQUEST
  const [openedCashAdvance, setOpenedCashAdvance] = useState(false);
  const [status, setStatus] = useState<string | null>("pending");
  const [type, setType] = useState<string | null>("Izin");
  // END FOR FILTER REQUEST
  return (
    <main>
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="col-span-5 flex flex-col gap-6">
          <section>
            <AttendanceCard attendances={attendances} schedules={schedules} />
          </section>

          <section className="bg-white shadow-xl -mt-2 p-6 rounded-lg">
            <Popover
              width={250}
              position="bottom"
              withArrow
              shadow="md"
              opened={openedCashAdvance}
              closeOnClickOutside={true}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="font-bold">Data pengajuan {type}</h2>
                  <div className="-mt-1 text-xs text-slate-400 flex gap-2">
                    Pengajuan yang{" "}
                    {status == "pending"
                      ? "Belum disetujui"
                      : status == "accepted"
                      ? "Sudah disetujui"
                      : "Ditolak"}
                  </div>
                </div>

                <Popover.Target>
                  <Indicator inline color="red" size={10} offset={2}>
                    <Button
                      size="xs"
                      onClick={() => setOpenedCashAdvance((prev) => !prev)}
                    >
                      <IconAdjustments color="white" />
                    </Button>
                  </Indicator>
                </Popover.Target>
              </div>

              <Popover.Dropdown>
                <div className="mt-2">
                  <div className="mb-3">
                    <Text size="sm" fw={"bolder"}>
                      Filter
                    </Text>
                    <Divider className="mb-2" />
                    <Select
                      label="Tipe"
                      size="xs"
                      value={type}
                      allowDeselect={false}
                      onChange={setType}
                      data={[
                        { label: "Kasbon", value: "Kasbon" },
                        { label: "Izin", value: "Izin" },
                      ]}
                    />
                    <Select
                      label="status"
                      size="xs"
                      value={status}
                      allowDeselect={false}
                      onChange={setStatus}
                      data={[
                        { label: "pending", value: "pending" },
                        { label: "accepted", value: "accepted" },
                        { label: "rejected", value: "rejected" },
                      ]}
                    />
                  </div>
                  <Divider />
                </div>
              </Popover.Dropdown>
            </Popover>
            <div className="mt-3">
              {type == "Izin" && <RequestTable status={status} />}
              {type == "Kasbon" && <CashAdvanceTable status={status} />}
            </div>
          </section>
        </div>

        {/* Data MASTER SECTION */}
        <div className="col-span-7">
          <div className="mb-2 bg-white shadow-lg px-6 py-3 rounded-lg flex justify-between items-center">
            <div>
              <h2 className="font-bold">Selamat datang, {creds?.username}</h2>
              <div className="-mt-1 text-xs text-slate-400 flex gap-2">
                Aplikasi manajemen absensi kulakita
              </div>
            </div>

            <Button
              leftSection={<IconDashboard size={19} />}
              rightSection={<IconChevronRight size={15} />}
              radius="xl"
              color="yellow"
              onClick={() => navigate("/account")}
            >
              Data Master
            </Button>
          </div>

          <section className="bg-white shadow-lg p-6 rounded-lg">
            {/* Data Karyawan */}
            <div className="mb-2">
              <div className="mb-3">
                <h2 className="font-bold text-sm text-slate-700">
                  Data Karyawan
                </h2>
                <div className="-mt-1 text-xs text-slate-500">
                  Berikut jumlah karyawan yang terdaftar
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 ">
                <AllEmployeeCard employees={employees} />
                <FulltimeCard employees={employees} />
                <ParttimeCard employees={employees} />
              </div>
            </div>

            <Divider my={30} />
          </section>
          <section className="bg-white shadow-lg p-6 rounded-lg mt-2">
            {/* Data Master Perusahaan */}
            <div className="mb-2">
              <div className="mb-3">
                <h2 className="font-bold text-sm text-slate-700">
                  Kehadiran karyawan bulan ini
                </h2>
                <div className="-mt-1 text-xs text-slate-500">
                  Berikut kehadiran karyawan bulan ini
                </div>
              </div>
              <div className="grid grid-cols-12 gap-2 mb-3">
                <div className="col-span-4">
                  <CalendarSection setDate={setDate} />
                </div>
                <div className="col-span-8 mt-2">
                  {LoadingSchedules ? (
                    <div className="mt-30 ml-50">
                      <Loader color="yellow" type="dots" />
                    </div>
                  ) : (
                    <WorkerList
                      schedules={schedules}
                      attendances={attendances}
                    />
                  )}
                </div>
              </div>
              <Button
                fullWidth
                className="mt-5"
                rightSection={<IconChevronRight size={15} />}
                onClick={() => navigate("/schedule")}
                justify="space-between"
              >
                Atur Jadwal Karyawan
              </Button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};
