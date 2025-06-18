import { Text } from "@mantine/core";
import { IconClipboardList, IconUserCheck } from "@tabler/icons-react";
import React from "react";
import { Link } from "react-router-dom";

export const DailyTaskMenu: React.FC = () => {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-6">
        <Link to={"/daily-task-data"}>
          <div className="bg-white rounded-lg shadow-lg p-3">
            <div className="flex justify-center">
              <div>
                <IconClipboardList
                  size={40}
                  color="#654433"
                  className="mx-auto"
                />
                <Text size="sm" c={"#654433"} fw={700} mt={7}>
                  Tugas harian
                </Text>
              </div>
            </div>
          </div>
        </Link>
      </div>
      <div className="col-span-6">
        <Link to={"/task-employee-data"}>
          <div className="bg-white rounded-lg shadow-lg p-3">
            <div className="flex justify-center">
              <div>
                <IconUserCheck size={40} color="#654433" className="mx-auto" />
                <Text size="sm" c={"#654433"} fw={700} mt={7}>
                  Tugas Pegawai
                </Text>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};
