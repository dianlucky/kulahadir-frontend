import { AttendanceType, ScheduleType } from "@/types";
import { Badge, Divider, Text } from "@mantine/core";
import { IconClockHour8 } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useGetScheduleByDateEmployeeId } from "../api";
import { id, se } from "date-fns/locale";
import { format } from "date-fns";
import { useGetAttendanceByScheduleId } from "../../History";
import { useAuth } from "@/features/auth";

type DailyScheduleProps = {
  selectedSchedule?: ScheduleType;
  attendance?: AttendanceType;
};

export const DailySchedule: React.FC<DailyScheduleProps> = ({
  selectedSchedule,
  attendance,
}) => {
  console.log("Kehadiran :", attendance);
  console.log("Jadwal :", selectedSchedule);
  return (
    <section className="mx-auto max-w-xs bg-white  w-full shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700 mb-4">
      <div className="flex justify-between text-xs items-center p-2 -mt-1 -mb-1">
        <div>
          <Text fw={700} c="#654433">
            Jadwal
          </Text>
        </div>
        <div className="my-auto text-right -mt-2 me-2">
          <Badge
            size="sm"
            className="uppercase"
            style={{
              marginTop: "7px",
              marginLeft: "4px",
              borderRadius: "2px",
            }}
            color={selectedSchedule?.status == "on" ? "green" : "red"}
          >
            {selectedSchedule?.status}
          </Badge>
        </div>
      </div>
      <Divider size={"sm"} />
      <div className="divide-y divide-gray-300">
        <div className="w-full grid grid-cols-12 divide-x divide-gray-300 p-1 -mb-2">
          <div className="col-span-3 text-center m-auto p-1">
            <Text size="28px" fw={700}>
              {selectedSchedule?.shift_code}
            </Text>
            <Text style={{ marginTop: "-5px" }} size="sm">
              Malam
            </Text>
          </div>
          <div className="col-span-9 ms-2 text-left">
            <div className="ms-2 -mb-2">
              <Text size="xs">Hari & tanggal : </Text>
              <Text size="sm" fw={700}>
                {selectedSchedule?.date
                  ? format(selectedSchedule.date, "EEEE, dd MMM yyyy", {
                      locale: id,
                    })
                  : ""}
              </Text>
            </div>
            <Divider my="sm" />
            <div className="-mt-2 w-full grid grid-cols-12 mb-1">
              <div className="col-span-6 text-left mt-1 ms-2">
                <Text size="xs">Jam kerja</Text>
                <Text size="sm" fw={700}>
                  {selectedSchedule?.start_time} - {selectedSchedule?.end_time}
                </Text>
              </div>
              <div className="col-span-6 text-right -mt-1"></div>
            </div>
          </div>
        </div>
        <Divider />
        <div className="flex justify-between text-xs p-2">
          <div className="flex gap-2">
            <IconClockHour8 size={15} className="text-green-400" /> Masuk :{" "}
            {attendance?.check_in
              ? format(new Date(attendance.check_in), "HH:mm", { locale: id })
              : "--:--"}
          </div>
          <div className="ml-5">
            <div className="w-px h-full bg-gray-300 mx-4" />
          </div>
          <div className="flex gap-2 mx-auto">
            <IconClockHour8 size={15} className="text-rose-400" />{" "}
            <Text size="xs" mt={-2} ml={-5}>
              Keluar :{" "}
              {attendance?.check_out
                ? format(new Date(attendance.check_out), "HH:mm", {
                    locale: id,
                  })
                : "--:--"}
            </Text>
          </div>
        </div>
      </div>
    </section>
  );
};
