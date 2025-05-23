import { Button, Divider, Popover, Select, Table, Text } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import {
  IconAdjustments,
  IconFileTypePdf,
  IconFileTypeXls,
} from "@tabler/icons-react";
import { useState } from "react";

export const ReportDataTable: React.FC = () => {
  const [opened, setOpened] = useState<boolean>(false);
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
              <Button size="xs" color="red">
                <IconFileTypePdf size={20} />
              </Button>
              <Button size="xs" color="green">
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
                  // value={status}
                  // onChange={setStatus}
                  data={[
                    { label: "diproses", value: "diproses" },
                    { label: "diterima", value: "diterima" },
                    { label: "ditolak", value: "ditolak" },
                  ]}
                />

                <MonthPickerInput
                  label="bulan"
                  size="xs"
                  // value={month}
                  // onChange={setMonth}
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
            {/* <Table.Tbody>{rows}</Table.Tbody> */}
          </Table>
        </div>
      </div>
    </section>
  );
};
