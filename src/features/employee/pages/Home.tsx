/* eslint-disable no-restricted-imports */
/* eslint-disable import/order */
import {
  Anchor,
  Badge,
  Divider,
  Group,
  Image,
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
  IconClipboardHeart,
  IconCashRegister,
  IconUsers,
  IconCalendarCancel,
  IconHandStop,
  IconFile,
  IconClipboardPlus,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { MenuList } from "@/components/navigation";
import { RecapAttendanceCard, ScheduleCard } from "../components";

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
            <Image
              radius="30px"
              h={50}
              w={50}
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-10.png"
            />
          </div>
          <div className="col-span-10 my-auto">
            <div className="text-white text-lg font-bold relative z-10">
              Dian Lucky Prayogi
            </div>
            <div className="text-sm text-white -mt-2">Pegawai tetap</div>
            <div className="absolute right-5 top-5">
              <img src="/images/white-logo.png" alt="" className="w-14" />
            </div>
          </div>
        </div>
      </section>

      <ScheduleCard />  
      {/* <RecapAttendanceCard /> */}
      {/* Menu List => Berisi daftar menu pada sistem */}

      <section className="px-7 mt-5" style={{ marginBottom: "-110px" }}>
        <MenuList
          navigations={[
            {
              title: "Jadwal bulanan",
              href: "/schedule",
              icon: IconCalendar,
              color: "bg-brown",
            },
            {
              title: "Pengajuan izin",
              href: "/leave-request",
              icon: IconFileDollar,
              color: "bg-brown",
            },
            {
              title: "Pengajuan kasbon",
              href: "/cash-advance-request",
              icon: IconCashRegister,
              color: "bg-brown",
            },
            {
              title: "Gaji",
              href: "/salary",
              icon: IconFileDollar,
              color: "bg-brown",
            },
          ]}
        />
        {/* <MenuList
          navigations={[
            {
              title: "Data pegawai",
              href: "/employee-data",
              icon: IconUsers,
              color: "bg-brown",
            },
            {
              title: "Jadwal pegawai",
              href: "/employee-schedule",
              icon: IconCalendar,
              color: "bg-brown",
            },
            {
              title: "Atur cuti pegawai",
              href: "/employee-paid-leave",
              icon: IconCalendarCancel,
              color: "bg-brown",
            },
            {
              title: "Data kehadiran",
              href: "/employee-attendances",
              icon: IconHandStop,
              color: "bg-brown",
            },
            {
              title: "Pengajuan izin / sakit",
              href: "/employee-request",
              icon: IconClipboardPlus,
              color: "bg-brown",
            },
            {
              title: "Pengajuan kasbon",
              href: "/employee-cash-advance",
              icon: IconCashRegister,
              color: "bg-brown",
            },
            {
              title: "Gaji pegawai",
              href: "/employee-salary",
              icon: IconFileDollar,
              color: "bg-brown",
            },
          ]}
        /> */}
      </section>
    </main>
  );
};
