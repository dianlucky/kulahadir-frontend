import { Divider, Text } from "@mantine/core";
import {
  AttendanceTable,
  EmployeeTable,
  ReportMenuList,
  SalaryTable,
} from "../components";
import { useState } from "react";

export const ReportPageAdmin: React.FC = () => {
  const [menu, setMenu] = useState<string>();
  return (
    <section>
      <div className="bg-white shadow-lg p-6 rounded-lg">
        <div className="flex justify-center mb-4">
          <Text fw={"bolder"} size="lg" c="#343a40">
            Laporan
          </Text>
        </div>
        <Divider />
        <div className="grid grid-cols-12 mt-4 gap-3">
          <div className="col-span-4 mb-59">
            <ReportMenuList setMenu={setMenu} />
          </div>
          <div className="col-span-8">
            {menu == "Pegawai" && <EmployeeTable />}
            {menu == "Kehadiran" && <AttendanceTable />}
            {menu == "Gaji" && <SalaryTable />}
          </div>
        </div>
      </div>
    </section>
  );
};
