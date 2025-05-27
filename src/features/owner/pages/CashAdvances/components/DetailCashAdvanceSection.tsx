import { Button, Divider, Image, Text } from "@mantine/core";
import { IconCashRegister } from "@tabler/icons-react";
import React from "react";

export const DetailCashAdvanceSection: React.FC = () => {
  return (
    <section className="bg-white mx-auto max-w-xs w-full shadow-sm rounded-xl z-50 relative p-4">
      <div className="flex justify-between text-xs items-center mb-2">
        <Text fw={700} c="#654433">
          Detail pengajuan kasbon
        </Text>
        <IconCashRegister className="opacity-80" size={24} />
      </div>
      <Divider size="xs" className="mb-2" />
      <div className="mt-2 mb-2">
        <div className="flex justify-center px-2 my-auto -ml-8">
          <div className="mt-2">
            <Image
              radius="30px"
              h={40}
              w={40}
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-10.png"
            />
          </div>
          <div className="ml-3 my-auto">
            <Text fw={700} size="18px">
              Dian Lucky Prayogi
            </Text>
            <Text fw={300} size="xs" mt={-3}>
              Pegawai tetap
            </Text>
          </div>
        </div>
      </div>
      <Divider />
      <div className="grid grid-cols-12 px-2 mt-2 mb-2">
        <div className="col-span-12">
          <Text fw={500} size="xs">
            Total kasbon bulan ini :
          </Text>
          <Text fw={700} size="sm" mt={-3}>
            Rp. 350.000
          </Text>
        </div>
        <div className="col-span-12 mt-2">
          <Divider />
        </div>
        <div className="col-span-12 mt-1">
          <Text fw={500} size="xs">
            Tanggal pengajuan :
          </Text>
          <Text fw={700} size="sm" mt={-3}>
            Jumat, 23 Mei 2025
          </Text>
        </div>
        <div className="col-span-12 mt-1">
          <Text fw={500} size="xs">
            Kasbon yang diajukan :
          </Text>
          <Text fw={700} size="sm" mt={-3}>
            Rp. 200.000
          </Text>
        </div>
        <div className="col-span-12 mt-1">
          <Text fw={500} size="xs">
            Alasan pengajuan kasbon :
          </Text>
          <Text fw={700} size="sm" mt={-3}>
            Buat bayar STNK bang
          </Text>
        </div>
      </div>
      <Divider />
      <div className="flex justify-between gap-2 mt-2">
        <Button size="sm" fullWidth color="red">Tolak</Button>
        <Button size="sm" fullWidth>Setujui</Button>
      </div>
    </section>
  );
};
