import { useDeleteTaskEmployee } from "@/features/admin/pages/DataMaster/DailyTask";
import { TaskEmployeeType } from "@/types";
import { Button, Divider, Modal, Select, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import {  IconTrash } from "@tabler/icons-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import React, { useEffect, useState } from "react";

interface TaskEmployeeDataSectionProps {
  taskEmployee: TaskEmployeeType[];
  setSelectedDay: React.Dispatch<React.SetStateAction<string | null>>;
  RefetchTaskEmployee: () => void;
}

export const TaskEmployeeDataSection: React.FC<
  TaskEmployeeDataSectionProps
> = ({ taskEmployee, setSelectedDay, RefetchTaskEmployee }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedTaskEmployee, setSelectedTaskEmployee] =
    useState<TaskEmployeeType>();
  const [day, selectDay] = useState<string | null>(
    format(new Date(), "EEEE", { locale: id })
  );
  useEffect(() => {
    if (day) {
      setSelectedDay(day);
    }
  }, [day]);

  const groupByEmployeeName = (
    dailyTask: TaskEmployeeType[]
  ): Record<string, TaskEmployeeType[]> => {
    return dailyTask.reduce((acc, item) => {
      const name = item.employee.name;

      if (!acc[name]) {
        acc[name] = [];
      }

      acc[name].push(item);
      return acc;
    }, {} as Record<string, TaskEmployeeType[]>);
  };

  //   DELETE TASK EMPLOYEE
  // DELETE DAILY TASK
  const deleteTaskEmployeeMutation = useDeleteTaskEmployee();
  const deleteTaskEmployee = async (id: number | undefined) => {
    deleteTaskEmployeeMutation.mutateAsync(id, {
      onSuccess: (data) => {
        console.log("Success Delete:", data);
        RefetchTaskEmployee();
        showNotification({
          message: "Tugas pegawai berhasil dihapus",
          color: "green",
          position: "top-center",
        });
        close();
      },
    });
  };
  // END DELETE DAILY TASK
  //   END FOR DELETE TASK EMPLOYEE
  return (
    <section className="bg-white mx-auto max-w-sm w-full shadow-lg rounded-xl z-50 relative p-4">
      <div className="grid grid-cols-12 text-xs items-center mb-2">
        <div className="col-span-8">
          <span className="text-base font-bold text-brown">
            Tugas Hari {day}
          </span>
        </div>
        <div className="col-span-4">
          <Select
            withAsterisk
            allowDeselect={false}
            data={[
              { value: "Senin", label: "Senin" },
              { value: "Selasa", label: "Selasa" },
              { value: "Rabu", label: "Rabu" },
              { value: "Kamis", label: "Kamis" },
              { value: "Jumat", label: "Jumat" },
              { value: "Sabtu", label: "Sabtu" },
              { value: "Minggu", label: "Minggu" },
            ]}
            value={day}
            onChange={(value) => selectDay(value)}
          />
        </div>
      </div>
      <Divider size="xs" className="mb-2" />
      {taskEmployee.length != 0 &&
        Object.entries(groupByEmployeeName(taskEmployee)).map(
          ([employeeName, tasks]) => (
            <div key={employeeName}>
              <div className="my-2">
                <Divider label={employeeName} labelPosition="left" />
              </div>
              {tasks.map((data, index) => (
                <div key={index}>
                  <div className="grid grid-cols-12 px-1">
                    <div className="col-span-1 m-auto">
                      <Text fw={700} size="sm">
                        {data.task.task_code}
                      </Text>
                    </div>
                    <div className="col-span-1 ml-1">
                      <div className="w-px h-full bg-gray-300 mx-4" />
                    </div>
                    <div className="col-span-9 ml-1 my-auto">
                      <Text size="12px" lineClamp={2}>
                        {data.task.task_name}
                      </Text>
                    </div>
                    <div className="col-span-1">
                      <Button
                        color="red"
                        size={"compact-sm"}
                        onClick={() => {
                          open(), setSelectedTaskEmployee(data);
                        }}
                      >
                        <IconTrash size={18} />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-2 mb-2">
                    <Divider />
                  </div>
                </div>
              ))}
            </div>
          )
        )}

      <Modal opened={opened} onClose={close} title="Konfirmasi hapus">
        <div className="px-1">
          <div className=" text-center px-2">
            <Text size="sm" fw={500}>
              Apakah anda yakin ingin menghapus tugas dengan kode
            </Text>
            <Text size="sm" c={"red"} fw={700}>
              "{selectedTaskEmployee?.day} ||{" "}
              {selectedTaskEmployee?.employee.name} ||{" "}
              {selectedTaskEmployee?.task.task_name}"
            </Text>
          </div>
          <div className="flex justify-betwen gap-2 mt-2 mb-2">
            <Button color="grey" size="sm" fullWidth onClick={close}>
              Kembali
            </Button>
            <Button
              color="yellow"
              size="sm"
              fullWidth
              onClick={() => {
                deleteTaskEmployee(selectedTaskEmployee?.id);
              }}
            >
              Ya! Hapus tugas
            </Button>
          </div>
        </div>
      </Modal>
    </section>
  );
};
