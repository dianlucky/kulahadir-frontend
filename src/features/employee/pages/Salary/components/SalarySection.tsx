import { Button, Divider, Text } from "@mantine/core";
import { IconCalendarCheck, IconDownload } from "@tabler/icons-react";
import React from "react";

export const SalarySection: React.FC = () => {
  return (
    <div className="bg-white shadow-sm p-4">
      <div className="flex justify-between mb-1">
        <div className="text-dark font-semibold cursor-pointer text-md">
          Slip gaji pegawai
        </div>
        <div className="my-auto">
          <Button size="xs" className="h-6 w-6 px-0 py-0 min-w-0">
            <IconDownload className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <Divider />
      <div className="text-center mt-2 mb-3">
        <div>
          <Text fw={"bold"} size="md">
            ANGKRINGAN KULAKITA
          </Text>
        </div>
        <div>
          <Text size="10px">
            Jl. Ahmad Yani, Angsau, Kec. Pelaihari, Kab. Tanah Laut, Kalimantan
            Selatan 70815
          </Text>
        </div>
      </div>
      <Divider />
      <div className="px-2 mt-1 mb-2">
        <div className="grid grid-cols-12">
          <div className="col-span-3">
            <Text size="sm" fw={"bold"}>
              Nama{" "}
            </Text>
          </div>
          <div className="col-span-1">
            <Text size="sm" fw={"bold"}>
              :
            </Text>
          </div>
          <div className="col-span-8 mt-1">
            <Text size="13px">Dian Lucky Prayogi</Text>
          </div>
        </div>
        <div className="grid grid-cols-12">
          <div className="col-span-3">
            <Text size="sm" fw={"bold"}>
              Jabatan{" "}
            </Text>
          </div>
          <div className="col-span-1">
            <Text size="sm" fw={"bold"}>
              :
            </Text>
          </div>
          <div className="col-span-8 mt-1">
            <Text size="13px">Pegawai</Text>
          </div>
        </div>
        <div className="grid grid-cols-12">
          <div className="col-span-3">
            <Text size="sm" fw={"bold"}>
              Status{" "}
            </Text>
          </div>
          <div className="col-span-1">
            <Text size="sm" fw={"bold"}>
              :
            </Text>
          </div>
          <div className="col-span-8 mt-1">
            <Text size="13px">Pegawai tetap</Text>
          </div>
        </div>
        <div className="grid grid-cols-12">
          <div className="col-span-3">
            <Text size="sm" fw={"bold"}>
              Bulan{" "}
            </Text>
          </div>
          <div className="col-span-1">
            <Text size="sm" fw={"bold"}>
              :
            </Text>
          </div>
          <div className="col-span-8 mt-1">
            <Text size="13px">Mei 2025</Text>
          </div>
        </div>
      </div>
      <Divider />
      <div className="px-2 mt-1 mb-2">
        <div className="grid grid-cols-12">
          <div className="col-span-4">
            <Text size="sm" fw={"bold"}>
              Gaji pokok{" "}
            </Text>
          </div>
          <div className="col-span-1">
            <Text size="sm" fw={"bold"}>
              :
            </Text>
          </div>
          <div className="col-span-7 mt-1 text-end">
            <Text size="13px">Rp. 1.250.000</Text>
          </div>
        </div>
        <div className="grid grid-cols-12">
          <div className="col-span-4">
            <Text size="sm" fw={"bold"}>
              Bonus{" "}
            </Text>
          </div>
          <div className="col-span-1">
            <Text size="sm" fw={"bold"}>
              :
            </Text>
          </div>
          <div className="col-span-7 mt-1 text-end">
            <Text size="13px">Rp. 200.000</Text>
          </div>
        </div>
        <div className="grid grid-cols-12">
          <div className="col-span-7">
            <Text size="sm" fw={"bold"}>
              Total pendapatan :{" "}
            </Text>
          </div>
          <div className="col-span-5 mt-1 text-end">
            <Text size="13px">Rp. 1.450.000</Text>
          </div>
        </div>
        <div className="grid grid-cols-12 mt-3">
          <div className="col-span-4">
            <Text size="sm" fw={"bold"}>
              Potongan{" "}
            </Text>
          </div>
          <div className="col-span-1">
            <Text size="sm" fw={"bold"}>
              :
            </Text>
          </div>
          <div className="col-span-7 mt-1 text-end">
            <Text size="13px">-</Text>
          </div>
        </div>
        <div className="grid grid-cols-12">
          <div className="col-span-4">
            <Text size="sm" fw={"bold"}>
              Kasbon{" "}
            </Text>
          </div>
          <div className="col-span-1">
            <Text size="sm" fw={"bold"}>
              :
            </Text>
          </div>
          <div className="col-span-7 mt-1 text-end">
            <Text size="13px">Rp. 250.000</Text>
          </div>
        </div>
        <div className="grid grid-cols-12">
          <div className="col-span-7">
            <Text size="sm" fw={"bold"}>
              Total potongan :{" "}
            </Text>
          </div>
          <div className="col-span-5 mt-1 text-end">
            <Text size="13px">Rp. 250.000</Text>
          </div>
        </div>
        <div className="grid grid-cols-12 mt-3 mb-1">
          <div className="col-span-5">
            <Text size="sm" fw={"bold"}>
              Gaji diterima{" "}
            </Text>
          </div>
          <div className="col-span-1">
            <Text size="sm" fw={"bold"}>
              :
            </Text>
          </div>
          <div className="col-span-6 mt-1 text-end">
            <Text size="13px">Rp. 1.200.000</Text>
          </div>
        </div>
        <Divider />
        <div className="grid grid-cols-12 mt-4 mb-2">
          <div className="col-span-3" />
          <div className="col-span-9 text-center">
            <Text size="xs">Tanah Laut, 13 Juni 2025 </Text>
            <Text size="xs" m={6} fs={"italic"}>
              Hafiz Anshari{" "}
            </Text>
            <Text size="xs">(Owner Kulakita)</Text>
          </div>
        </div>
      </div>
    </div>
  );
};
