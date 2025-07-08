import { AttendanceType } from "@/types";
import { Button, Divider, Popover, Table, Text } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import {
  IconAdjustments,
  IconFileTypePdf,
  IconFileTypeXls,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { downloadFile } from "../api";
import { useGetAttendanceByMonth } from "@/features/employee/pages/History";

const BASE_URL = import.meta.env.VITE_API_URL;

export const AttendanceTable: React.FC = () => {
  const [opened, setOpened] = useState<boolean>(false);

  // FILTER STATE
  const [month, setMonth] = useState<Date | null>(new Date());
  const [activeMonth, setActiveMonth] = useState<Date | null>(new Date());
  // END FOR FILTER STATE

  //   GET ALL ATTENDANCES
  const [attendances, setAttendances] = useState<AttendanceType[]>([]);
  const { data: DataAttendances, refetch: RefetchAttendances } =
    useGetAttendanceByMonth(format(month ? month : new Date(), "yyyy-MM"));
  useEffect(() => {
    if (DataAttendances) {
      setAttendances(DataAttendances);
    }
  }, [DataAttendances]);

  useEffect(() => {
    RefetchAttendances();
  }, [month]);

  console.log(attendances);
  //   END FOR GET ALL ATTENDANCES

  const rows = attendances
    .filter((data) => {
      const date = new Date(data.schedule.date);
      const active = new Date(activeMonth ? activeMonth : "");

      const isSameMonthYear =
        date.getDay() === active.getDay() &&
        date.getMonth() === active.getMonth() &&
        date.getFullYear() === active.getFullYear();

      return isSameMonthYear;
    })
    .map((data, index) => (
      <Table.Tr key={index}>
        <Table.Td>{index + 1}</Table.Td>
        <Table.Td>{data.schedule.employee.name}</Table.Td>
        <Table.Td>
          {data.check_in ? format(data.check_in, "HH:mm", { locale: id }) : "-"}
        </Table.Td>
        <Table.Td>
          {data.check_out
            ? format(data.check_out, "HH:mm", { locale: id })
            : "-"}
        </Table.Td>
        <Table.Td>{data.schedule.attendance_status}</Table.Td>
      </Table.Tr>
    ));

  // HANDLE DOWNLOAD
  const handleDownloadPDF = () => {
    console.log(
      `${BASE_URL}/attendances/pdf?&date=${format(
        month ? month : new Date(),
        "yyyy-MM-dd"
      )}`
    );
    downloadFile(
      `${BASE_URL}/attendances/pdf?&date=${format(
        month ? month : new Date(),
        "yyyy-MM-dd"
      )}`,
      `laporan-kehadiran-pegawai-${format(
        month ? month : new Date(),
        "dd MMMM yyyy",
        {
          locale: id,
        }
      )}.pdf`
    );
  };

  const handleDownloadExcel = () => {
    downloadFile(
      `${BASE_URL}/attendances/excel?date=${format(
        month ? month : new Date(),
        "yyyy-MM-dd"
      )}`,
      `laporan-pegawai-${format(month ? month : new Date(), "dd MMMM yyyy", {
        locale: id,
      })}.xlsx`
    );
  };
  // END FOR HANDLE DOWNLOAD

  return (
    <section className="bg-white shadow-sm p-4">
      <div className="flex justify-between mb-2">
        <div className="text-dark font-semibold cursor-pointer text-md">
          Data Kehadiran pegawai{" "}
          {format(month ? month : new Date(), "EEEE, dd MMMM yyyy", {
            locale: id,
          })}
        </div>
        <Popover
          width={250}
          position="bottom"
          withArrow
          shadow="md"
          opened={opened}
          closeOnClickOutside={true}
        >
          <div>
            <Button.Group className="gap-1">
              <Popover.Target>
                <Button
                  size="xs"
                  color="blue"
                  onClick={() => setOpened((prev) => !prev)}
                >
                  <IconAdjustments size={20} />
                </Button>
              </Popover.Target>
              <Button size="xs" color="red" onClick={handleDownloadPDF}>
                <IconFileTypePdf size={20} />
              </Button>
              <Button size="xs" color="green" onClick={handleDownloadExcel}>
                <IconFileTypeXls size={20} />
              </Button>
            </Button.Group>
          </div>
          <Popover.Dropdown>
            <div className="mt-2">
              <div className="mb-3">
                <Text size="sm" fw={"bolder"}>
                  Filter
                </Text>
                <Divider className="mb-2" />

                <DatePickerInput
                  label="Tanggal"
                  onChange={setMonth}
                  value={month}
                />
              </div>
              <Divider />
              <div>
                <Button
                  fullWidth
                  size="xs"
                  onClick={() => {
                    setActiveMonth(month);
                    setOpened(false);
                  }}
                >
                  Simpan
                </Button>
              </div>
            </div>
          </Popover.Dropdown>
        </Popover>
      </div>
      <Divider />
      <div>
        <div className="mt-3">
          <Table
            striped
            highlightOnHover
            withTableBorder
            withColumnBorders
            className="text-dark font-semibold cursor-pointer text-sm"
          >
            <Table.Thead>
              <Table.Tr>
                <Table.Th className="font-semibold">No</Table.Th>
                <Table.Th className="font-semibold">Nama</Table.Th>
                <Table.Th className="font-semibold">Check-in</Table.Th>
                <Table.Th className="font-semibold">Check-out</Table.Th>
                <Table.Th className="font-semibold">Status</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </div>
      </div>
    </section>
  );
};
