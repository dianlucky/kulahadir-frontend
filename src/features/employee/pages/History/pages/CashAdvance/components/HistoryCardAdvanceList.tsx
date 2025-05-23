import { Badge, Text } from "@mantine/core";

export const HistoryCashAdvanceList: React.FC = () => {
  return (
    <section className="bg-white shadow-md rounded-xl p-1">
      <div className="grid grid-cols-12 p-2">
        <div className="col-span-2 text-center">
          <Text fw={"bold"} size="27px">
            12
          </Text>
          <Text size="13px">Mei</Text>
        </div>
        <div className="col-span-1">
          <div className="w-px h-full bg-gray-300 mx-4" />
        </div>
        <div className="col-span-9">
            <div className="flex justify-end">
                <Badge radius={"xs"} size="xs" color="green">Disetujui</Badge>
            </div>
            <div className="w-full -mt-2 ml-3">
                <Text fw={"bold"} size="md">Rp. 250.000</Text>
            </div>
        </div>
      </div>
    </section>
  );
};
