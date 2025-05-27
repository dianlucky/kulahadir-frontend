import { Divider, Image, Text } from "@mantine/core";
import { IconMap2, IconPhoto } from "@tabler/icons-react";
import React from "react";

export const PhotoSection: React.FC = () => {
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
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-10.png"
        />
      </div>
    </section>
  );
};
