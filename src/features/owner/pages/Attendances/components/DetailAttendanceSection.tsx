import { Badge, Divider, Text } from "@mantine/core";
import { IconCalendar } from "@tabler/icons-react";

export const DetailAttendanceSection: React.FC = () => {
  return (
    <section className="bg-white shadow-sm rounded-xl p-2">
      <div className="flex justify-between p-1 px-3">
        <div>
          <Text fw={700} size="md" c={"#654433"}>
            Absensi
          </Text>
        </div>
        <div className="-mt-1">
          <Badge radius="xs" size="sm">
            Hadir
          </Badge>
        </div>
      </div>
      <Divider size={"md"} />
      <div className="grid grid-cols-12 p-3">
        <div className="col-span-2 text-center my-auto">
          <Text fw={"bold"} size="40px">
            S2
          </Text>
          <Text size="14px" mt={-2}>
            Malam
          </Text>
        </div>
        <div className="col-span-1">
          <div className="w-px h-full bg-gray-300 mx-4" />
        </div>
        <div className="col-span-9">
          <div>
            <Text size="sm">Hari & tangal :</Text>
            <Text size="sm" fw={"bold"} mt={-5}>
              Kamis, 17 April 2025
            </Text>
          </div>
          <div className="py-1">
            <Divider />
          </div>
          <div className="flex justify-between mr-5">
            <div>
              <Text size="sm">Check-in</Text>
              <Text size="sm" fw={"bold"} mt={-5}>
                15.53 WITA
              </Text>
            </div>
            <div>
              <Text size="sm">Check-out</Text>
              <Text size="sm" fw={"bold"} mt={-5}>
                01.13 WITA
              </Text>
            </div>
          </div>
        </div>
      </div>
      <Divider />
      <div className="flex justify-between px-7 mt-1">
        <div className="text-center">
          <Text size="sm">Jadwal masuk</Text>
          <Text size="sm" fw={"bold"} mt={-5}>
            16.00 WITA
          </Text>
        </div>
        <div className="mt-2">
          <div className="w-px h-8 bg-gray-300 mx-4" />
        </div>
        <div className="text-center">
          <Text size="sm">Jadwal keluar</Text>
          <Text size="sm" fw={"bold"} mt={-5}>
            01.00 WITA
          </Text>
        </div>
      </div>
    </section>
  );
};
