import { AttendanceType } from "@/types";
import { Divider, Image, Text } from "@mantine/core";
import { IconMap2, IconPhoto } from "@tabler/icons-react";
import React from "react";

const BaseURL = import.meta.env.VITE_API_URL;
const DEFAULT_IMAGE =
  "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-9.png";
interface PhotoSectionProps {
  attendance: AttendanceType;
}

export const PhotoSection: React.FC<PhotoSectionProps> = ({ attendance }) => {
  return (
    <section className="bg-white mx-auto max-w-xs w-full shadow-sm rounded-xl z-50 relative p-4 text-slate-700">
      <div className="flex justify-between text-xs items-center mb-2">
        <Text fw={700} c="#654433">
          Bukti foto
        </Text>
        <IconPhoto className="opacity-80" size={20} />
      </div>
      <Divider size="xs" className="mb-2" />
      <div className="mt-2">
        <Image
          radius=""
          h={"full"}
          w={"full"}
          src={
            attendance.snapshot
              ? `${BaseURL}/uploads/attendances/${attendance.snapshot}`
              : DEFAULT_IMAGE
          }
        />
      </div>
    </section>
  );
};
