import { DailyTaskEmployeeType } from "@/types";
import { Divider, Text } from "@mantine/core";
import { IconChecklist, IconSquareCheckFilled } from "@tabler/icons-react";

interface DailyTaskSectionProps {
  dailyTask: DailyTaskEmployeeType[];
}
export const DailyTaskSection: React.FC<DailyTaskSectionProps> = ({
  dailyTask,
}) => {
  return (
    <>
      <section className="bg-white mx-auto max-w-sm w-full shadow-lg rounded-xl z-50 relative p-4">
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
      </section>
    </>
  );
};
