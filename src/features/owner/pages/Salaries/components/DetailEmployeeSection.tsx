import { Divider, Image, Text } from "@mantine/core";
import { IconUser } from "@tabler/icons-react";
import React from "react";

export const DetailEmployeeSection: React.FC = () => {
  return (
    <section className="mx-auto max-w-xs bg-white w-full shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700 mb-4 mt-2">
      <div className="flex justify-between text-xs items-center p-2 px-2 -mt-1 -mb-1">
        <div>
          <Text fw={600} c="#654433">
            Detail pegawai
          </Text>
        </div>
        <div className="my-auto text-right mb-1 me-1">
          <IconUser />
        </div>
      </div>
      <Divider size={"sm"} />
      <div className="grid grid-cols-12 mt-3 mb-2 px-1">
        <div className="col-span-2 m-auto">
          <Image
            radius="30px"
            h={50}
            w={50}
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-10.png"
          />
        </div>
        <div className="col-span-1">
          <div className="w-px h-full bg-gray-300 mx-4" />
        </div>
        <div className="col-span-9 ml-2">
          <div>
            <Text fw={400} size="xs">
              Nama pegawai :
            </Text>
            <Text fw={700} size="sm">
              Dian Lucky Prayogi
            </Text>
          </div>
          <div>
            <Divider />
          </div>
          <div>
            <Text fw={400} size="xs">
              Status pegawai :
            </Text>
            <Text fw={700} size="sm">
              Pegawai tetap
            </Text>
          </div>
        </div>
      </div>
    </section>
  );
};
