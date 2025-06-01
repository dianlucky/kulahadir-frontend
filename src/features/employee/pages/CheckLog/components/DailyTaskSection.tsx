import { DailyTaskEmployeeType, ScheduleType } from "@/types";
import {
  Checkbox,
  Divider,
  Text,
  UnstyledButton,
  Tooltip,
  Button,
} from "@mantine/core";
import { IconChecklist, IconSquareCheckFilled } from "@tabler/icons-react";
import { useState } from "react";
import { useUpdateDailyTaskEmployeeById } from "../api";
import { showNotification } from "@mantine/notifications";

interface DailyTaskSectionProps {
  dailyTask: DailyTaskEmployeeType[];
  RefetchDailyTaskEmployee: () => void;
  schedule?: ScheduleType;
}

type UpdateStatusRequest = {
  status: string;
};

export const DailyTaskSection: React.FC<DailyTaskSectionProps> = ({
  dailyTask,
  RefetchDailyTaskEmployee,
  schedule,
}) => {
  const [checkedTasks, setCheckedTasks] = useState<number[]>([]);
  const handleCheckboxChange = (taskId: number) => {
    setCheckedTasks(
      (prev) =>
        prev.includes(taskId)
          ? prev.filter((id) => id !== taskId) // Uncheck
          : [...prev, taskId] // Check
    );
  };

  // UPDATE STATUS 🛌🛌🛀🛀
  const mutationUpdateStatus = useUpdateDailyTaskEmployeeById();
  const handleUpdateStatus = async () => {
    if (checkedTasks.length === 0) {
      showNotification({ message: "Centang minimal 1 tugas", color: "red" });
      return;
    }
    const updateStatusData: UpdateStatusRequest = { status: "Sudah" };
    try {
      // Jalankan semua update secara berurutan
      for (const taskId of checkedTasks) {
        await mutationUpdateStatus.mutateAsync({
          id: taskId,
          data: updateStatusData,
        });
      }
      showNotification({
        message: "Berhasil update status tugas harian",
        color: "green",
        position: "top-center",
      });
      RefetchDailyTaskEmployee();
      close();
    } catch (error) {
      console.error("Error:", error);
      showNotification({
        message: "Gagal update status",
        color: "red",
        position: "top-center",
      });
    }
  };
  // END FOR UPDATE STATUS 🛌🛌🛀🛀
  console.log("yang dicentang :", checkedTasks);
  return (
    <>
      <section className="bg-white mx-auto max-w-xs w-full shadow-lg rounded-xl z-50 relative p-4">
        <div className="flex justify-between text-xs items-center mb-2">
          <span className="text-base font-bold text-brown">Tugas harian</span>
          <IconChecklist size={22} />
        </div>
        <Divider size="xs" className="mb-2" />
        {dailyTask.length != 0 &&
          dailyTask.map((data, index) => (
            <div key={index}>
              <div className="grid grid-cols-12 px-1">
                <div className="col-span-1 m-auto">
                  <Text fw={700} size="sm">
                    {data.task_employee.task.task_code}
                  </Text>
                </div>
                <div className="col-span-1 ml-1">
                  <div className="w-px h-full bg-gray-300 mx-4" />
                </div>
                <div className="col-span-9 ml-1 my-auto">
                  <Text size="12px" lineClamp={2}>
                    {data.task_employee.task.task_name}
                  </Text>
                </div>
                <div className="col-span-1 ">
                  {data.status == "Belum" && (
                    <UnstyledButton>
                      <Tooltip label="Tandai tugas ini">
                        <Checkbox
                          onChange={() => handleCheckboxChange(data.id)}
                        />
                      </Tooltip>
                    </UnstyledButton>
                  )}
                  {data.status == "Sudah" && (
                    <div style={{ marginLeft: "-2px" }}>
                      <IconSquareCheckFilled color="#77B254" />
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-2 mb-2">
                <Divider />
              </div>
            </div>
          ))}
        <div className="mt-2">
          <Button
            fullWidth
            size="sm"
            disabled={
              schedule?.attendance_status == "belum hadir" ||
              dailyTask.filter((data) => data.status == "Belum").length == 0 ||
              checkedTasks.length == 0
                ? true
                : false
            }
            onClick={() => {
              handleUpdateStatus();
            }}
          >
            Tandai selesai
          </Button>
        </div>
      </section>
    </>
  );
};
