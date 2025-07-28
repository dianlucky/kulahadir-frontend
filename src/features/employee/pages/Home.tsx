/* eslint-disable no-restricted-imports */
/* eslint-disable import/order */

import {
  IconCalendar,
  IconFileDollar,
  IconCashRegister,
  IconUsers,
  IconCalendarCancel,
  IconListCheck,
  IconPackages,
  IconSnowflake,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";

import { MenuList } from "@/components/navigation";
import { RecapAttendanceCard, ScheduleCard } from "../components";
import { EmployeeType } from "@/types";
import { usegetEmployeeByAccountId } from "./Profile";
import { useAuth } from "@/features/auth";

const BaseURL = import.meta.env.VITE_API_URL;
const DEFAULT_IMAGE = "/images/profile-default.png";

export const Home: React.FC = () => {
  const { creds } = useAuth();
  const [employee, setEmployee] = useState<EmployeeType>();
  const { data: DataEmployee } = usegetEmployeeByAccountId(creds?.id);
  useEffect(() => {
    if (DataEmployee) {
      setEmployee(DataEmployee);
    }
  }, [DataEmployee]);

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
            <div className="bg-brown rounded-full p-1 w-[52px] h-[52px] overflow-hidden border-4 border-gray-800">
              <img
                src={
                  employee?.profile_pic
                    ? `${BaseURL}/uploads/employees/${employee?.profile_pic}`
                    : DEFAULT_IMAGE
                }
                alt="Foto Profil"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
          <div className="col-span-10 my-auto">
            <div className="text-white text-lg font-bold relative z-10">
              {employee?.name}
            </div>
            <div className="text-sm text-white -mt-2">
              {employee?.account.status}
            </div>
            <div className="absolute right-5 top-5">
              <img src="/images/white-logo.png" alt="" className="w-14" />
            </div>
          </div>
        </div>
      </section>

      {creds?.level == "Pegawai" && <ScheduleCard />}
      {creds?.level == "Owner" && <RecapAttendanceCard />}

      {/* Menu List => Berisi daftar menu pada sistem */}

      <section className="px-7 mt-5" style={{ marginBottom: "-110px" }}>
        {creds?.status == "Pegawai tetap" ||
          (creds?.status == "Part time" && (
            <MenuList
              navigations={[
                {
                  title: "Jadwal bulanan",
                  href: "/schedule",
                  icon: IconCalendar,
                  color: "bg-brown",
                },
                {
                  title: "Pengajuan kasbon",
                  href: "/cash-advance-request",
                  icon: IconCashRegister,
                  color: "bg-brown",
                },
                {
                  title: "Jadwal Cuti",
                  href: "/paid-leave",
                  icon: IconCalendarCancel,
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
          ))}
        {creds?.status == "Pengelola Gudang" && (
          <MenuList
            navigations={[
              {
                title: "Jadwal bulanan",
                href: "/schedule",
                icon: IconCalendar,
                color: "bg-brown",
              },
              {
                title: "Pengajuan kasbon",
                href: "/cash-advance-request",
                icon: IconCashRegister,
                color: "bg-brown",
              },
              {
                title: "Jadwal Cuti",
                href: "/paid-leave",
                icon: IconCalendarCancel,
                color: "bg-brown",
              },
              {
                title: "Stok Gudang",
                href: "/warehouse-inventory",
                icon: IconPackages,
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
        )}

        {creds?.status == "Owner" && (
          <MenuList
            navigations={[
              {
                title: "Data pegawai",
                href: "/employee-data",
                icon: IconUsers,
                color: "bg-brown",
              },
              {
                title: "Data Jadwal",
                href: "/employee-schedule",
                icon: IconCalendar,
                color: "bg-brown",
              },
              {
                title: "Tugas Harian",
                href: "/daily-task",
                icon: IconListCheck,
                color: "bg-brown",
              },
              {
                title: "Cuti Pegawai",
                href: "/employee-paid-leave",
                icon: IconCalendarCancel,
                color: "bg-brown",
              },
              {
                title: "Permintaan kasbon",
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
              {
                title: "Stok Gudang",
                href: "/warehouse-inventory",
                icon: IconPackages,
                color: "bg-brown",
              },
              {
                title: "Stok Frozen",
                href: "/frozen-inventory",
                icon: IconSnowflake,
                color: "bg-brown",
              },
            ]}
          />
        )}
      </section>
    </main>
  );
};
