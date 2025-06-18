import { AttendanceType, ScheduleType } from "@/types";
import { Badge, Table, Text } from "@mantine/core";
import { IconUsers } from "@tabler/icons-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import React from "react";
interface AttendanceTableProps {
  attendances: AttendanceType[];
  schedules: ScheduleType[];
}

export const AttendanceTable: React.FC<AttendanceTableProps> = ({
  schedules,
  attendances,
}) => {
  const workers = schedules.map((schedule) => {
    const attendance = attendances.find(
      (att) => att.schedule_id === schedule.id
    );

    return {
      ...schedule,
      is_checkin: attendance ? attendance.check_in : null,
      attendance_id: attendance?.id ?? null,
      attendance_status: attendance?.status ?? null,
      attendance: attendance ? attendance : null,
    };
  });

  const rows = workers.map((data, index) => (
    <Table.Tr key={index}>
      <Table.Td>{data.employee.name}</Table.Td>
      <Table.Td>
        {data.attendance != null
          ? format(data.attendance.check_in, "HH:mm", { locale: id })
          : `--:--`}
      </Table.Td>
      <Table.Td>
        {" "}
        {data.attendance != null && data.attendance.check_out
          ? format(data.attendance.check_out, "HH:mm", { locale: id })
          : `--:--`}
      </Table.Td>
      <Table.Td>
        <Badge
          radius={"xs"}
          size="sm"
          color={
            data.attendance_status == "belum hadir"
              ? "red"
              : data.attendance_status == "Working"
              ? "grey"
              : data.attendance_status == "Done"
              ? "green"
              : "yellow"
          }
        >
          {data.attendance_status}
        </Badge>
      </Table.Td>
    </Table.Tr>
  ));
  console.log("worker: ", workers);
  return (
    <section className="bg-white rounded-sm shadow-sm p-4">
      <div className="flex justify-between mb-1 -mt-3 mb-3">
        <Text fw={700} size="md" c="#343a40">
          Daftar pegawai
        </Text>
        <IconUsers />
      </div>
      <div>
        <Table
          striped
          highlightOnHover
          withTableBorder
          withColumnBorders
          className="text-dark font-bold cursor-pointer text-sm"
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th className="font-bold">Nama pegawai</Table.Th>
              <Table.Th className="font-bold">Check-in</Table.Th>
              <Table.Th className="font-bold">Check-out</Table.Th>
              <Table.Th className="font-bold">Status</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </div>
    </section>
  );
};
