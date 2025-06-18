import { LeaveRequestType } from "@/types";
import {
  Badge,
  Button,
  Divider,
  Indicator,
  Popover,
  Select,
  Table,
  Text,
} from "@mantine/core";
import {  useState } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { IconAdjustments, IconPencil, IconTrash } from "@tabler/icons-react";
import { MonthPickerInput } from "@mantine/dates";

interface RequestTableAdminProps {
  request?: LeaveRequestType[];
  setDelete: React.Dispatch<React.SetStateAction<boolean>>;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedRequest: React.Dispatch<
    React.SetStateAction<LeaveRequestType | undefined>
  >;
}

export const RequestTableAdmin: React.FC<RequestTableAdminProps> = ({
  setDelete,
  setEdit,
  request,
  setSelectedRequest,
}) => {
  const [status, setStatus] = useState<string | null>("pending");
  const [month, setMonth] = useState<Date | null>(new Date());
  const [opened, setOpened] = useState(false);
  // console.log("Bulan :", month);

  const rows = request
    ?.sort((a, b) => {
      if (a.status === "pending" && b.status !== "pending") return -1;
      if (a.status !== "pending" && b.status === "pending") return 1;

      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    })
    .filter(
      (data) =>
        data.status === status &&
        new Date(data.date).getMonth() === month?.getMonth() &&
        new Date(data.date).getFullYear() === month?.getFullYear()
    )
    .map((data, index) => (
      <Table.Tr key={index}>
        <Table.Td>{index + 1}</Table.Td>
        <Table.Td>{data.employee.name}</Table.Td>
        <Table.Td>
          {" "}
          {format(new Date(data.date), "EEEE, dd MMMM yyyy", {
            locale: id,
          })}{" "}
        </Table.Td>
        <Table.Td>
          <Text truncate="end">{data.type}</Text>
        </Table.Td>
        <Table.Td>
          <Badge
            radius={"sm"}
            color={
              data.status == "pending"
                ? "grey"
                : data.status == "accepted"
                ? "green"
                : "red"
            }
          >
            {data.status}
          </Badge>
        </Table.Td>
        <Table.Td className="w-40 ">
          <div className="flex gap-1 justify-center">
            <Button
              size="compact-md"
              color="yellow"
              onClick={() => {
                setEdit(true);
                setDelete(false);
                setSelectedRequest(data);
              }}
            >
              <IconPencil />
            </Button>
            <Button
              size="compact-md"
              color="red"
              onClick={() => {
                setDelete(true);
                setEdit(false);
                setSelectedRequest(data);
              }}
            >
              <IconTrash />
            </Button>
          </div>
        </Table.Td>
      </Table.Tr>
    ));

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
                Daftar pengajuan izin / sakit
              </div>
            </div>

            <Popover.Target>
              <Indicator inline color="red" size={10} offset={2}>
                <Button size="xs" onClick={() => setOpened((prev) => !prev)}>
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

                <MonthPickerInput
                  label="bulan"
                  size="xs"
                  value={month}
                  allowDeselect={false}
                  onChange={setMonth}
                />
              </div>
              <Divider />
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
                <Table.Th className="font-semibold">Tipe</Table.Th>
                <Table.Th className="font-semibold">Status</Table.Th>
                <Table.Th className="font-semibold flex justify-center">
                  Aksi
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {request && request.length > 0 ? (
                rows
              ) : (
                <Table.Tr>
                  <Table.Td colSpan={6} className="text-center">
                    Data tidak ditemukan
                  </Table.Td>
                </Table.Tr>
              )}
            </Table.Tbody>
          </Table>
        </div>
      </section>
    </>
  );
};
