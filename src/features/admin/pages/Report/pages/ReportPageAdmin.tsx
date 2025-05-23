import { Divider, Text } from "@mantine/core";
import { ReportDataTable, ReportMenuList } from "../components";

export const ReportPageAdmin: React.FC = () => {
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
          <div className="col-span-4">
            <ReportMenuList />
          </div>
          <div className="col-span-8">
            <ReportDataTable />
          </div>
        </div>
      </div>
    </section>
  );
};
