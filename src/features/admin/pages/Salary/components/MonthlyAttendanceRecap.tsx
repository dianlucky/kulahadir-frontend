import { Badge, Divider, RingProgress, Text } from "@mantine/core";
import { IconCalendarCheck } from "@tabler/icons-react";

export const MonthlyAttendanceRecap: React.FC = () => {
  return (
    <>
      <div className="bg-white shadow-sm p-4">
        <div className="flex justify-between mb-1">
          <div className="text-dark font-semibold cursor-pointer text-sm">
            Rekap Kehadiran Bulanan
          </div>
          <div>
            <IconCalendarCheck size={20} />
          </div>
        </div>
        <Divider />
        <div className="mt-2 grid grid-cols-12">
          <div className="col-span-7 flex justify-center">
            <RingProgress
              size={130}
              thickness={20}
              label={
                <Text fw={"bold"} size="sm" ta="center">
                  27/31
                </Text>
              }
              sections={[
                { value: 80, color: "#8FD14F" },
                { value: 10, color: "yellow" },
                { value: 10, color: "grey" },
              ]}
            />
          </div>
          <div className="col-span-5 mt-6">
            <div className="flex">
              <Badge color="#8FD14F" radius="xl" size="xs" />
              <Text fw={"bold"} size="xs" ml={3}>
                Hadir
              </Text>
            </div>
            <div className="flex mt-2">
              <Badge color="yellow" radius="xl" size="xs" />
              <Text fw={"bold"} size="xs" ml={3}>
                Terlambat
              </Text>
            </div>
            <div className="flex mt-2">
              <Badge color="grey" radius="xl" size="xs" />
              <Text fw={"bold"} size="xs" ml={3}>
                Tidak hadir
              </Text>
            </div>
          </div>
        </div>
        <Divider />
      </div>
    </>
  );
};
