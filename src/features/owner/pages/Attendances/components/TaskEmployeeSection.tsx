import { Divider, Text } from "@mantine/core";
import { IconChecklist, IconSquare, IconSquareCheck, IconX } from "@tabler/icons-react";

export const TaskEmployeeSection: React.FC = () => {
  return (
    <section className="bg-white mx-auto max-w-xs w-full shadow-lg rounded-xl z-50 relative p-4">
      <div className="flex justify-between text-xs items-center mb-2">
        <span className="text-base font-bold text-brown">Tugas harian</span>
        <IconChecklist size={22} />
      </div>
      <Divider size="xs" className="mb-2" />
      <div className="grid grid-cols-12 ">
        <div className="col-span-1 m-auto">
          <Text fw={700} size="md">
            DT01
          </Text>
        </div>
        <div className="col-span-1 ml-1">
          <div className="w-px h-full bg-gray-300 mx-4" />
        </div>
        <div className="col-span-9 ml-1">
          <Text size="xs" lineClamp={2}>
            Membersihkan panggangan dan membersihkan lantai dan aksdjkajs
          </Text>
        </div>
        <div className="col-span-1 m-auto ">
          {/* <IconSquareCheck size={20}/> */}
          <IconX size={20} />
        </div>
      </div>
      <div className="mt-2">
        <Divider />
      </div>
    </section>
  );
};
