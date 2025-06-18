import { DailyTaskEmployeeType } from "@/types";
import { Divider, Text } from "@mantine/core";
import {
  IconChecklist,
  IconSquareCheckFilled,
  IconSquareFilled,
} from "@tabler/icons-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import React from "react";

interface TodayTaskSectionProps {
  dailyTask: DailyTaskEmployeeType[];
}

export const TodayTaskSection: React.FC<TodayTaskSectionProps> = ({
  dailyTask,
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

  return (
    <section className="bg-white mx-auto max-w-sm w-full shadow-lg rounded-xl z-50 relative p-4">
      <div className="flex justify-between text-xs items-center mb-2">
        <span className="text-base font-bold text-brown">
          Tugas Hari {format(new Date(), "EEEE, dd MMMM yyyy", { locale: id })}
        </span>
        <IconChecklist size={22} />
      </div>
      <Divider size="xs" className="mb-2" />
      {dailyTask.length != 0 &&
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
