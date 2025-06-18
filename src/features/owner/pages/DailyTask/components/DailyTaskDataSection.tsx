import { useDeleteDailyTask } from "@/features/admin/pages/DataMaster/DailyTask";
import { DailyTaskType } from "@/types";
import { Button, Divider, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { IconClipboardList, IconTrash } from "@tabler/icons-react";
import React, { useState } from "react";

interface DailyTaskDataSectionProps {
  dailyTask: DailyTaskType[];
  refetchDailyTask: () => void;
}

export const DailyTaskDataSection: React.FC<DailyTaskDataSectionProps> = ({
  dailyTask,
  refetchDailyTask,
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedTask, setSelectedTask] = useState<DailyTaskType>();

  // DELETE DAILY TASK
  const deleteDailyTaskMutation = useDeleteDailyTask();
  const deleteDailyTask = async (id: number | undefined) => {
    deleteDailyTaskMutation.mutateAsync(id, {
      onSuccess: (data) => {
        console.log("Sukses :", data);
        refetchDailyTask();
        showNotification({
          message: "Tugas harian berhasil dihapus",
          color: "green",
          position: "top-center",
        });
        close();
      },
    });
  };
  // END DELETE DAILY TASK
  return (
    <section className="bg-white mx-auto max-w-sm w-full shadow-lg rounded-md relative p-4">
      <div className="flex justify-between text-xs items-center mb-2">
        <span className="text-base font-bold text-brown">
          Data Tugas Harian
        </span>
        <IconClipboardList size={28} />
      </div>
      <Divider size="xs" className="mb-2" />
      {dailyTask.length != 0 &&
        dailyTask.map((data, index) => (
          <div key={index}>
            <div className="grid grid-cols-12 px-2">
              <div className="col-span-1 m-auto">
                <Text fw={700} size="sm">
                  {data.task_code}
                </Text>
              </div>
              <div className="col-span-1 ml-1">
                <div className="w-px h-full bg-gray-300 mx-4" />
              </div>
              <div className="col-span-9 ml-1 my-auto">
                <Text size="12px" lineClamp={2}>
                  {data.task_name}
                </Text>
              </div>
              <div className="col-span-1">
                <Button
                  color="red"
                  size={"compact-sm"}
                  onClick={() => {
                    open(), setSelectedTask(data);
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

      <Modal opened={opened} onClose={close} title="Konfirmasi hapus">
        <div className="px-1">
          <div className=" text-center px-2">
            <Text size="sm" fw={500}>
              Apakah anda yakin ingin menghapus tugas dengan kode
            </Text>
            <Text size="md" c={"red"} fw={700}>
              "{selectedTask?.task_code} || {selectedTask?.task_name}"
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
                deleteDailyTask(selectedTask?.id);
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
