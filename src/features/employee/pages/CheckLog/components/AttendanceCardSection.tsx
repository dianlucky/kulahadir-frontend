import { Badge, Button, Divider, Text } from "@mantine/core";

export const AttendanceCardSection: React.FC = () => {
  return (
    <section className="bg-white mx-auto max-w-xs w-full shadow-lg rounded-xl z-50 relative p-4">
      <div className="flex justify-between text-xs items-center mb-2">
        <span className="text-base font-bold text-slate-700">Absensi</span>
        <Badge size="xs" color="red" radius={"xs"} mr={5}>
          Belum check-in
        </Badge>
      </div>
      <Divider size="xs" className="mb-2" />
      <div className="grid grid-cols-12 px-2">
        <div className="col-span-2 text-center m-auto">
          <Text fw={"bold"} size="40px">
            S2
          </Text>
        </div>
        <div className="col-span-1 text-center">
          <div className="w-px h-full bg-gray-300 mx-4" />
        </div>
        <div className="col-span-9 ml-2">
          <div className="mt-2">
            <Text fw={600} size="sm">
              Jum'at, 23 Mei 2025
            </Text>
          </div>
          <div className="py-2">
            <Divider />
          </div>
          <div className="mt-1">
            <Text fw={600} size="sm">
              16.00 - 01.00
            </Text>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <Divider />
      </div>
      <div className="w-full px-1 mt-3">
        <Button size="sm" fullWidth>
          CHECK-IN
        </Button>
      </div>
    </section>
  );
};
