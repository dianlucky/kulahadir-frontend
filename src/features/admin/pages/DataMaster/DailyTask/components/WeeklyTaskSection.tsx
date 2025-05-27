import { TaskEmployeeType } from "@/types";
import {
  Button,
  Divider,
  Loader,
  Popover,
  Select,
  Table,
  Text,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { IconAdjustments, IconTrash } from "@tabler/icons-react";
import { useGetAllDailyTask, useGetAllTaskEmployee } from "../api";

interface WeeklyTaskSectionProps {
  taskEmployees: TaskEmployeeType[];
  daySelect: string | null;
  setDaySelect: React.Dispatch<React.SetStateAction<string | null>>;
  setDeleteTask: React.Dispatch<React.SetStateAction<boolean>>;
  setTaskEmployee: React.Dispatch<
    React.SetStateAction<TaskEmployeeType | null | undefined>
  >;
}

export const WeeklyTaskSection: React.FC<WeeklyTaskSectionProps> = ({
  taskEmployees,
  daySelect,
  setDaySelect,
  setDeleteTask,
  setTaskEmployee,
}) => {
  const [opened, setOpened] = useState(false);
  const rows = taskEmployees.map((data, index) => (
    <Table.Tr key={index}>
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>{data?.day}</Table.Td>
      <Table.Td>{data.task.task_code}</Table.Td>
      <Table.Td>{data.employee.name}</Table.Td>
      <Table.Td className="w-40">
        <Button
          size="xs"
          color="red"
          onClick={() => {
            setDeleteTask(true);
            setTaskEmployee(data);
          }}
        >
          <IconTrash />
        </Button>
      </Table.Td>
    </Table.Tr>
  ));
  return (
    <section className="bg-white shadow-lg p-6 rounded-lg">
      <Popover
        width={250}
        position="bottom"
        withArrow
        shadow="md"
        opened={opened}
        closeOnClickOutside={true}
      >
        <div className="flex justify-between">
          <div>
            <div className="text-dark font-semibold cursor-pointer text-lg">
              Tugas mingguan pegawai
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
                label="Hari"
                size="xs"
                value={daySelect}
                onChange={setDaySelect}
                data={[
                  { label: "Senin", value: "Senin" },
                  { label: "Selasa", value: "Selasa" },
                  { label: "Rabu", value: "Rabu" },
                  { label: "Kamis", value: "Kamis" },
                  { label: "Jumat", value: "Jumat" },
                  { label: "Sabtu", value: "Sabtu" },
                  { label: "Minggu", value: "Minggu" },
                ]}
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
              <Table.Th className="font-semibold">Hari</Table.Th>
              <Table.Th className="font-semibold">Kode tugas</Table.Th>
              <Table.Th className="font-semibold">Pegawai</Table.Th>
              <Table.Th className="font-semibold">Aksi</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </div>
    </section>
  );
};
