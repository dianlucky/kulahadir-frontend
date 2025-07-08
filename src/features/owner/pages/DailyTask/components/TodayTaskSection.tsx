import { DailyTaskEmployeeType } from "@/types";
import { Button, Divider, Popover, Skeleton, Text } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import {
  IconCalendarCheck,
  IconSquareCheckFilled,
  IconSquareFilled,
} from "@tabler/icons-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface TodayTaskSectionProps {
  dailyTask: DailyTaskEmployeeType[];
  selectedDate: Date | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
  formattedDate: string;
  LoadingDailyTaskEmployee: boolean;
}

export const TodayTaskSection: React.FC<TodayTaskSectionProps> = ({
  dailyTask,
  selectedDate,
  setSelectedDate,
  formattedDate,
  LoadingDailyTaskEmployee,
}) => {
  const groupByEmployeeName = (
    dailyTask: DailyTaskEmployeeType[]
  ): Record<string, DailyTaskEmployeeType[]> => {
    return dailyTask.reduce((acc, item) => {
      const name = item.task_employee.employee.name;

      if (!acc[name]) {
        acc[name] = [];
      }

      acc[name].push(item);
      return acc;
    }, {} as Record<string, DailyTaskEmployeeType[]>);
  };
  const skeletonItems = Array(6).fill(null);
  return (
    <section className="bg-white mx-auto max-w-sm w-full shadow-lg rounded-xl z-50 relative p-4">
      <div className="flex justify-between text-xs items-center mb-2">
        <span className="text-base font-bold text-brown">
          Tugas Hari{" "}
          {format(
            new Date(selectedDate ?? formattedDate),
            "EEEE, dd MMM yyyy",
            {
              locale: id,
            }
          )}
        </span>
        <Popover
          width={300}
          position="bottom-end"
          offset={4}
          withArrow
          shadow="lg"
        >
          <Popover.Target>
            <Button size="compact-sm" color="#654433">
              <IconCalendarCheck size={22} />
            </Button>
          </Popover.Target>
          <Popover.Dropdown>
            <div className="flex justify-center">
              <DatePicker
                size="sm"
                value={selectedDate}
                onChange={setSelectedDate}
              />
            </div>
          </Popover.Dropdown>
        </Popover>
      </div>
      <Divider size="xs" className="mb-2" />
      {LoadingDailyTaskEmployee && (
        <div>
          <div className="grid grid-cols-12 px-1">
            <div className="col-span-1 m-auto -mb-7">
              <Skeleton height={30} circle mb="xl" />
            </div>
            <div className="col-span-1 ml-1">
              <div className="w-px h-full bg-gray-300 mx-4" />
            </div>
            <div className="col-span-9 ml-1 my-auto">
              <Skeleton height={8} radius="xl" />
              <Skeleton height={8} mt={2} width="40%" radius="xl" />
            </div>
          </div>
          {skeletonItems.map((_, index) => (
            <div key={index}>
              <div className="my-2">
                <Divider labelPosition="left" />
              </div>
              <div className="grid grid-cols-12 px-1">
                <div className="col-span-1 m-auto -mb-7">
                  <Skeleton height={30} circle mb="xl" />
                </div>
                <div className="col-span-1 ml-1">
                  <div className="w-px h-full bg-gray-300 mx-4" />
                </div>
                <div className="col-span-9 ml-1 my-auto">
                  <Skeleton height={8} radius="xl" />
                  <Skeleton height={8} mt={2} width="40%" radius="xl" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {dailyTask.length != 0 && !LoadingDailyTaskEmployee && 
        Object.entries(groupByEmployeeName(dailyTask)).map(
          ([employeeName, tasks]) => (
            <div key={employeeName}>
              <div className="my-2">
                <Divider label={employeeName} labelPosition="left" />
              </div>
              {tasks.map((task, index) => (
                <div key={index}>
                  <div className="grid grid-cols-12 px-1">
                    <div className="col-span-1 m-auto">
                      <Text fw={700} size="sm">
                        {task.task_employee.task.task_code}
                      </Text>
                    </div>
                    <div className="col-span-1 ml-1">
                      <div className="w-px h-full bg-gray-300 mx-4" />
                    </div>
                    <div className="col-span-9 ml-1 my-auto">
                      <Text size="12px" lineClamp={2}>
                        {task.task_employee.task.task_name}
                      </Text>
                    </div>
                    <div className="col-span-1 ">
                      {task.status == "Belum" && (
                        <div style={{ marginLeft: "-2px" }}>
                          <IconSquareFilled color="grey" />
                        </div>
                      )}
                      {task.status == "Sudah" && (
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
            </div>
          )
        )}
    </section>
  );
};
