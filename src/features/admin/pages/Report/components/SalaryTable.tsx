import { SalaryType } from "@/types";
import { Button, Divider, Popover, Select, Table, Text } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import {
  IconAdjustments,
  IconFileTypePdf,
  IconFileTypeXls,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { downloadFile, useGetAllSalary } from "../api";

const BASE_URL = import.meta.env.VITE_API_URL;

export const SalaryTable: React.FC = () => {
  const [opened, setOpened] = useState<boolean>(false);
  // FILTER STATE
  const [month, setMonth] = useState<Date | null>(new Date());
  const [activeMonth, setActiveMonth] = useState<Date | null>(new Date());
  const [status, setStatus] = useState<string | null>("Semua");
  const [activeStatus, setActiveStatus] = useState<string | null>("Semua");
  // END FOR FILTER STATE

  //   GET ALL EMPLOYEE
  const [salaries, setSalaries] = useState<SalaryType[]>([]);
  const { data: DataSalaries } = useGetAllSalary();
  useEffect(() => {
    if (DataSalaries) {
      setSalaries(DataSalaries);
    }
  }, [DataSalaries]);
  //   END FOR GET ALL EMPLOYEE

  const rows = salaries
    .filter((data) => {
      const date = new Date(data.date);
      const active = new Date(activeMonth ? activeMonth : "");

      const isSameMonthYear =
        date.getMonth() === active.getMonth() &&
        date.getFullYear() === active.getFullYear();

      const isStatusMatch =
        activeStatus === "Semua" ||
        data.employee?.account?.status === activeStatus;

      const isLevelPegawai = data.employee?.account?.level === "Pegawai";

      return isSameMonthYear && isStatusMatch && isLevelPegawai;
    })
    .map((data, index) => (
      <Table.Tr key={index}>
        <Table.Td>{index + 1}</Table.Td>
        <Table.Td>{data.employee.name}</Table.Td>
        <Table.Td>
          {data.date ? format(data.date, "dd MMMM yyyy", { locale: id }) : "-"}
        </Table.Td>
        <Table.Td>
          Rp. {new Intl.NumberFormat("id-ID").format(data.amount)}
        </Table.Td>
        <Table.Td>{data.employee.account.status}</Table.Td>
      </Table.Tr>
    ));

  // HANDLE DOWNLOAD
  const handleDownloadPDF = () => {
    downloadFile(
      `${BASE_URL}/salaries/pdf?status=${status}&month=${format(
        month ? month : new Date(),
        "yyyy-MM"
      )}`,
      `laporan-gaji-pegawai-${format(month ? month : new Date(), "MMMM yyyy", {
        locale: id,
      })}-${status}.pdf`
    );
  };

  const handleDownloadExcel = () => {
    console.log(
      "URL :",
      `${BASE_URL}/salaries/excel?status=${status}&month=${format(
        month ? month : new Date(),
        "yyyy-MM"
      )}`
    );
    downloadFile(
      `${BASE_URL}/salaries/excel?status=${status}&month=${format(
        month ? month : new Date(),
        "yyyy-MM"
      )}`,
      "laporan-pegawai.xlsx"
    );
  };
  // END FOR HANDLE DOWNLOAD

  return (
    <section className="bg-white shadow-sm p-4">
      <div className="flex justify-between mb-2">
        <div className="text-dark font-semibold cursor-pointer text-md">
          Data Gaji pegawai
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

                <Select
                  label="status"
                  size="sm"
                  value={status}
                  onChange={setStatus}
                  data={[
                    { label: "Pegawai tetap", value: "Pegawai tetap" },
                    { label: "Part time", value: "Part time" },
                    { label: "Semua", value: "Semua" },
                  ]}
                />
                <MonthPickerInput
                  label="bulan"
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
                    setActiveStatus(status);
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
                <Table.Th className="font-semibold">Bulan</Table.Th>
                <Table.Th className="font-semibold">Gaji</Table.Th>
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
