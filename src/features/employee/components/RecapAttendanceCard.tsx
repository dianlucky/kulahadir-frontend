import { Badge, Button, Divider, RingProgress, Text } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";

export const RecapAttendanceCard: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="mx-auto max-w-xs bg-white w-full shadow-lg rounded-xl z-50 relative p-2 px-2 mb-2 -mt-16">
      <div className="px-3">
        <div className="text-center mb-1">
          <Text fw={600} size="sm">
            Rekap absensi hari ini
          </Text>
        </div>
        <Divider />
        <div className="grid grid-cols-12 mt-2 mb-2">
          <div className="col-span-5">
            <RingProgress
              size={130}
              thickness={20}
              label={
                <Text fw={"bold"} size="sm" ta="center">
                  4/7
                </Text>
              }
              sections={[
                { value: 58, color: "#8FD14F" },
                { value: 14, color: "yellow" },
                { value: 28, color: "grey" },
              ]}
            />
          </div>
          <div className="col-span-1">
            <div className="w-px h-full bg-gray-300 mx-4" />
          </div>
          <div className="col-span-6 my-auto ml-3">
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
        <div className="w-full my-2">
          <Button fullWidth size="xs" color="#654433" onClick={() => {navigate('/employee-attendances')}}>
            Cek kehadiran
          </Button>
        </div>
      </div>
    </section>
  );
};
