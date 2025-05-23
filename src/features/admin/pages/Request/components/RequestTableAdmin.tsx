import { RequestType } from "@/types";
import {
  Button,
  Divider,
  Loader,
  Popover,
  Select,
  Table,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useGetAllLeave } from "../api";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { IconAdjustments, IconPencil, IconTrash } from "@tabler/icons-react";
import { MonthPickerInput } from "@mantine/dates";

interface RequestTableAdminProps {
  setDelete: React.Dispatch<React.SetStateAction<boolean>>;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RequestTableAdmin: React.FC<RequestTableAdminProps> = ({
  setDelete,
  setEdit,
}) => {
  const [status, setStatus] = useState<string | null>("diproses");
  const [month, setMonth] = useState<Date | null>(new Date());
  const [opened, setOpened] = useState(false);

  const [requests, setRequests] = useState<RequestType[]>([]);
  const {
    data: DataRequest,
    refetch: RefetchRequest,
    isLoading: LoadingRequest,
  } = useGetAllLeave();
  useEffect(() => {
    if (DataRequest) {
      setRequests(DataRequest);
    }
  }, [DataRequest]);
  // console.log("Data request :", requests);

  const rows = requests.map((request, index) => (
    <Table.Tr key={index}>
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>{request.schedule.employee.name}</Table.Td>
      <Table.Td>
        {" "}
        {format(new Date(request.schedule.date), "dd MMMM yyyy", {
          locale: id,
        })}{" "}
      </Table.Td>
      <Table.Td>
        <Text truncate="end">{request.reason}</Text>
      </Table.Td>
      <Table.Td>{request.status}</Table.Td>
      <Table.Td className="w-40 ">
        <div className="flex gap-1 justify-center">
          <Button
            size="xs"
            color="yellow"
            onClick={() => {
              setEdit(true);
              setDelete(false);
            }}
          >
            <IconPencil />
          </Button>
          <Button
            size="xs"
            color="red"
            onClick={() => {
              setDelete(true);
              setEdit(false);
            }}
          >
            <IconTrash />
          </Button>
        </div>
      </Table.Td>
    </Table.Tr>
  ));

  if (LoadingRequest) {
    return (
      <div className="flex justify-center">
        <Loader color="orange" size="lg" type="dots" />
      </div>
    );
  }
  return (
    <>
      <section>
        <Popover
          width={250}
          position="bottom"
          withArrow
          shadow="md"
          opened={opened}
          closeOnClickOutside={true}
        >
          <div className="flex justify-between items-center">
            <div>
              <div className="text-dark font-semibold cursor-pointer text-lg">
                Daftar pegawai
              </div>
            </div>

            <Popover.Target>
              <Button size="xs" onClick={() => setOpened((prev) => !prev)}>
                <IconAdjustments color="white" />
              </Button>
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
                  label="status"
                  size="xs"
                  value={status}
                  onChange={setStatus}
                  data={[
                    { label: "diproses", value: "diproses" },
                    { label: "diterima", value: "diterima" },
                    { label: "ditolak", value: "ditolak" },
                  ]}
                />

                <MonthPickerInput
                  label="bulan"
                  size="xs"
                  value={month}
                  onChange={setMonth}
                />
              </div>
              <Divider />
              <div>
                <Button fullWidth size="xs" onClick={() => setOpened(false)}>
                  Simpan
                </Button>
              </div>
            </div>
          </Popover.Dropdown>
        </Popover>
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
                <Table.Th className="font-semibold">Tanggal pengajuan</Table.Th>
                <Table.Th className="font-semibold">Alasan</Table.Th>
                <Table.Th className="font-semibold">Status</Table.Th>
                <Table.Th className="font-semibold flex justify-center">
                  Aksi
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            {requests ? (
              <Table.Tbody>{rows}</Table.Tbody>
            ) : (
              <Table.Tbody>
                <Table.Td colSpan={6}>Data tidak ditemukan</Table.Td>
              </Table.Tbody>
            )}
          </Table>
        </div>
      </section>
    </>
  );
};
