/* eslint-disable no-restricted-imports */
/* eslint-disable import/order */
import {
  Anchor,
  Badge,
  Divider,
  Group,
  Loader,
  RingProgress,
  Text,
} from "@mantine/core";
import {
  IconCalendar,
  IconFileTime,
  IconNews,
  IconFingerprint,
  IconClockHour8,
  IconClock24,
  IconLuggage,
  IconClipboardText,
  IconFileDollar,
  IconUsersGroup,
  IconClock,
  IconFileText,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { MenuList } from "@/components/navigation";

type DataAttendanceDivisionType = {
  Hadir: number;
  BelumHadir: number;
  Cuti: number;
  Terlambat: number;
  Sakit: number;
  Izin: number;
  Overall: any;
};

export const Home: React.FC = () => {
  return (
    <main>
      <section className="bg-brown w-full rounded-b-3xl px-5 pt-8 pb-20 relative">
        <img
          src="../images/making presentations.svg"
          className="absolute w-32 right-5 top-1 opacity-85"
          alt=""
        />
        <div className="grid grid-cols-12">
          <div className="col-span-2">
            
          </div>
          <div className="col-span-10">
            <div className="text-white text-2xl font-bold relative z-10">
              Pegawai 1
            </div>
            <div className="text-sm font-semibold text-white">
              Pegawai tetap
            </div>
            <div className="absolute right-5 top-5">
              <img src="/images/white-logo.png" alt="" className="w-14" />
            </div>
          </div>
        </div>
      </section>
      
      <section className="mx-auto max-w-xs bg-white  w-full shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700 mb-2 -mt-16">
        <div className="flex justify-between text-xs items-center p-2 -mt-1 -mb-1">
          <div>
            <Text fw={700} c="blue">
              Jadwal
            </Text>
          </div>
          <div className="my-auto text-right -mt-2 me-2">
            <Badge
              size="sm"
              className="uppercase"
              style={{
                marginTop: "7px",
                marginLeft: "4px",
                borderRadius: "2px",
              }}
              color="green"
            >
              on
            </Badge>
          </div>
        </div>
        <Divider size={"sm"} />
        <div className="divide-y divide-gray-300">
          <div className="w-full grid grid-cols-12 divide-x divide-gray-300 p-1 -mb-2">
            <div className="col-span-3 text-center m-auto p-1">
              <Text size="28px" fw={700}>
                S2
              </Text>
              <Text style={{ marginTop: "-5px" }} size="sm">
                Malam
              </Text>
            </div>
            <div className="col-span-9 ms-2 text-left">
              <div className="ms-2 -mb-2">
                <Text size="xs">Hari & tanggal : </Text>
                <Text size="sm" fw={700}>
                  Kamis, 17 April 2025
                </Text>
              </div>
              <Divider my="sm" />
              <div className="-mt-2 w-full grid grid-cols-12 mb-1">
                <div className="col-span-6 text-left mt-1 ms-2">
                  <Text size="xs">Jam kerja</Text>
                  <Text size="sm" fw={700}>
                    16.00 - 01.00
                  </Text>
                </div>
                <div className="col-span-6 text-right -mt-1"></div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 text-xs divide-x divide-gray-300 p-2">
            <div className="flex gap-2">
              <IconClockHour8 size={15} className="text-green-400" /> Check-in :
              '--'
            </div>
            <div className="ps-3 flex gap-2">
              <IconClockHour8 size={15} className="text-rose-400" /> Check-out :{" "}
              '--:--'
            </div>
          </div>
        </div>
      </section>
      {/* Menu List => Berisi daftar menu pada sistem */}

      <section className="px-7 mt-5" style={{ marginBottom: "-110px" }}>
        <MenuList
          navigations={[
            {
              title: "Jadwal",
              href: "/schedule",
              icon: IconCalendar,
              color: "bg-brown",
            },
            {
              title: "Pengajuan",
              href: "/application",
              icon: IconClipboardText,
              color: "bg-brown",
            },
            {
              title: "Lembur",
              href: "/overtime",
              icon: IconClock24,
              color: "bg-brown",
            },
            {
              title: "Slip Gaji",
              href: "/development",
              icon: IconFileDollar,
              color: "bg-brown",
            },
          ]}
        />
      </section>
    </main>
  );
};
