import { EmployeeType } from "@/types";
import { Button, Divider, Popover, Select, Table, Text } from "@mantine/core";
import {
  IconAdjustments,
  IconFileTypePdf,
  IconFileTypeXls,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useGetAllEmployee } from "../../DataMaster/Employee";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { downloadFile } from "../api";

const BASE_URL = import.meta.env.VITE_API_URL;

export const EmployeeTable: React.FC = () => {
  const [opened, setOpened] = useState<boolean>(false);
  // FILTER STATE
  const [status, setStatus] = useState<string | null>("Semua");
  const [activeStatus, setActiveStatus] = useState<string | null>("Semua");
  // END FOR FILTER STATE

  //   GET ALL EMPLOYEE
  const [employees, setEmployees] = useState<EmployeeType[]>([]);
  const { data: DataEmployees } = useGetAllEmployee();
  useEffect(() => {
    if (DataEmployees) {
      setEmployees(DataEmployees);
    }
  }, [DataEmployees]);
  //   END FOR GET ALL EMPLOYEE

  const rows = employees
    .filter(
      (data) =>
        (activeStatus === "Semua"
          ? true
          : data.account.status === activeStatus) &&
        data.account.level == "Pegawai"
    )
    .map((data, index) => (
      <Table.Tr key={index}>
        <Table.Td>{index + 1}</Table.Td>
        <Table.Td>{data.name}</Table.Td>
        <Table.Td>
          {data.birth_date
            ? format(data.birth_date, "dd MMMM yyyy", { locale: id })
            : "-"}
        </Table.Td>
        <Table.Td>{data.phone}</Table.Td>
        <Table.Td>{data.account.level}</Table.Td>
        <Table.Td>{data.account.status}</Table.Td>
      </Table.Tr>
    ));

  // HANDLE DOWNLOAD
  const handleDownloadPDF = () => {
    downloadFile(
      `${BASE_URL}/employees/pdf?status=${status}`,
      `laporan-pegawai-${status}.pdf`
    );
  };

  const handleDownloadExcel = () => {
    downloadFile(
      `${BASE_URL}/employees/excel?status=${status}`,
      "laporan-pegawai.xlsx"
    );
  };

  // END FOR HANDLE DOWNLOAD
  return (
    <section className="bg-white shadow-sm p-4">
      <div className="flex justify-between mb-2">
        <div className="text-dark font-semibold cursor-pointer text-md">
          Data Pegawai
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
                  size="xs"
                  value={status}
                  onChange={setStatus}
                  data={[
                    { label: "Pegawai tetap", value: "Pegawai tetap" },
                    { label: "Part time", value: "Part time" },
                    { label: "Semua", value: "Semua" },
                  ]}
                />
              </div>
              <Divider />
              <div>
                <Button
                  fullWidth
                  size="xs"
                  onClick={() => {
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
                <Table.Th className="font-semibold">Tanggal lahir</Table.Th>
                <Table.Th className="font-semibold">No.WA</Table.Th>
                <Table.Th className="font-semibold">Role</Table.Th>
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
