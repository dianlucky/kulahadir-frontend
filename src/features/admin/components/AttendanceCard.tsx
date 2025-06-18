/* eslint-disable linebreak-style */
import {
  Badge,
  Button,
  Divider,
  RingProgress,
  Select,
  Text,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useTitleContext } from "@/components/providers/TitleProvider";
import { useAuth } from "@/features/auth";
import { AttendanceType, ScheduleType } from "@/types";
interface AttendanceCardProps {
  attendances?: AttendanceType[];
  schedules?: ScheduleType[];
}
export const AttendanceCard: React.FC<AttendanceCardProps> = ({
  attendances,
  schedules,
}) => {
  const { setTitle } = useTitleContext();
  const navigate = useNavigate();
  const { creds } = useAuth();
  if (!creds) navigate("/login");
  const [status, setStatus] = useState<string | null>("Semua");

  // MAKE WORKER ARRAY
  const workers = schedules?.map((schedule) => {
    const attendance = attendances?.find(
      (att) => att.schedule_id === schedule.id
    );

    return {
      ...schedule,
      attendance_id: attendance?.id ?? null,
      attendance_status: attendance?.status ?? null,
      attendance: attendance ? attendance : null,
    };
  });
  console.log(workers);
  // END FOR MAKE WORKER ARRAY

  // 🪐 RING
  const [totalPresent, setTotalPresent] = useState<number>(0);
  const [totalLate, setTotalLate] = useState<number>(0);
  const [totalAbsen, setTotalAbsen] = useState<number>(0);

  useEffect(() => {
    const totalEmployee = schedules
      ? schedules.filter((data) =>
          status == "Semua" ? true : data.employee.account.status == status
        ).length
      : 0;

    const presentCount = schedules
      ? schedules.filter((data) =>
          (data.attendance_status === "Working" ||
            data.attendance_status === "Present") &&
          status === "Semua"
            ? true
            : data.employee.account.status == status
        ).length
      : 0;

    const lateCount = schedules
      ? schedules.filter((data) =>
          data.attendance_status === "Late" && status === "Semua"
            ? true
            : data.employee.account.status == status
        ).length
      : 0;

    const absenCount = schedules
      ? schedules.filter((data) =>
          data.attendance_status === "belum hadir" && status === "Semua"
            ? true
            : data.employee.account.status == status
        ).length
      : 0;

    setTotalPresent((presentCount * 100) / totalEmployee);
    setTotalLate((lateCount * 100) / totalEmployee);
    setTotalAbsen((absenCount * 100) / totalEmployee);
  }, [schedules]);
  // 🔚 END RING

  return (
    <section className="bg-white shadow-lg p-6 rounded-lg ">
      <div className="grid lg:grid-cols-2">
        <div>
          <h2 className="font-bold">Rekap Absensi Karyawan</h2>
          <div className="-mt-1 text-xs text-slate-400">
            Berikut rekap absensi pada hari ini
          </div>
        </div>
        <Select
          className="mt-2 lg:mt-0 w-full"
          placeholder="Pilih status"
          data={[
            { label: "Semua", value: "Semua" },
            { label: "Pegawai tetap", value: "Pegawai tetap" },
            { label: "Part time", value: "Part time" },
          ]}
          value={status}
          onChange={setStatus}
        />
      </div>
      <div className="grid grid-cols-2">
        <div className="py-7 text-sm">
          <div className="ml-3 mb-2">
            <Divider my={10} label="Status kehadiran" labelPosition="right" />
            <div className="flex">
              <Badge radius={"sm"} color="#8FD14F" size="md">
                {
                  schedules?.filter(
                    (data) =>
                      (data.attendance_status === "Present" ||
                        data.attendance_status === "Late") &&
                      (status === "Semua" ||
                        data.employee.account.status === status)
                  ).length
                }
              </Badge>
              <Text fw={600} size="sm" ml={3}>
                Hadir
              </Text>
            </div>
            <div className="flex mt-2">
              <Badge radius={"sm"} color="yellow" size="md">
                {
                  schedules?.filter(
                    (data) =>
                      data.attendance_status == "Late" &&
                      (status == "Semua" ||
                        data.employee.account.status == status)
                  ).length
                }
              </Badge>
              <Text fw={600} size="sm" ml={3}>
                Terlambat
              </Text>
            </div>
            <div className="flex mt-2">
              <Badge radius={"sm"} color="grey" size="md">
                {
                  schedules?.filter((data) =>
                    data.attendance_status == "belum hadir" && status == "Semua"
                      ? true
                      : data.employee.account.status == status
                  ).length
                }
              </Badge>
              <Text fw={600} size="sm" ml={3}>
                Belum hadir
              </Text>
            </div>
            <Divider my={10} label="Pegawai" labelPosition="right" />
            <div className="flex mt-2">
              <Badge radius={"sm"} color="blue" size="md">
                {
                  schedules?.filter(
                    (data) => data.employee.account.status == "Pegawai tetap"
                  ).length
                }
              </Badge>
              <Text fw={600} size="sm" ml={3}>
                Pegawai tetap
              </Text>
            </div>
            <div className="flex mt-2 mb-5">
              <Badge radius={"sm"} color="#9f7aea" size="md">
                {
                  schedules?.filter(
                    (data) => data.employee.account.status == "Part time"
                  ).length
                }
              </Badge>
              <Text fw={600} size="sm" ml={3}>
                Part time
              </Text>
            </div>
          </div>
          <Button
            justify="space-between"
            fullWidth
            className=" border-2 shadow-lg"
            onClick={() => {
              setTitle("Absensi");
              navigate("/schedule");
            }}
            rightSection={<IconChevronRight size={14} />}
          >
            Lihat Seluruh Jadwal
          </Button>
        </div>
        <div className="m-auto">
          <RingProgress
            ml={20}
            size={260}
            thickness={35}
            label={
              <Text fw={700} size="30px" ta="center">
                {
                  schedules?.filter(
                    (data) =>
                      (data.attendance_status === "Present" ||
                        data.attendance_status === "Late") &&
                      (status === "Semua" ||
                        data.employee.account.status === status)
                  ).length
                }
                /
                {
                  schedules?.filter((data) =>
                    status == "Semua"
                      ? true
                      : data.employee.account.status == status
                  ).length
                }
              </Text>
            }
            sections={[
              { value: totalPresent, color: "#8FD14F" },
              { value: totalLate, color: "yellow" },
              { value: totalAbsen, color: "grey" },
            ]}
          />
        </div>
      </div>
    </section>
  );
};
