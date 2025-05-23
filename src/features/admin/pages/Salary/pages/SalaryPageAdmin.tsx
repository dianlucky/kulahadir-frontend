import { Divider, Text } from "@mantine/core";
import { DetailAttendancesEmployee, EmployeeCardSalary } from "../components";

export const SalaryPageAdmin: React.FC = () => {
  return (
    <section>
      <div className="bg-white shadow-lg p-6 rounded-lg">
        <div className="flex justify-center mb-4">
          <Text fw={"bolder"} size="lg" c="#343a40">
            Gaji pegawai
          </Text>
        </div>
        <Divider />
        <div className="grid grid-cols-12 mt-4 gap-3">
          <div className="col-span-4">
            <EmployeeCardSalary />
          </div>
          <div className="col-span-8">
            <DetailAttendancesEmployee />
          </div>
        </div>
      </div>
    </section>
  );
};
