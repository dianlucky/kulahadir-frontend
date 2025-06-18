import {
  AppShell,
  Avatar,
  Group,
  Menu,
  UnstyledButton,
  Button,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconCalendar,
  IconSettings,
  IconClockHour1,
  IconUsersGroup,
  IconClipboardText,
  IconGauge,
  IconBuildingEstate,
  IconBriefcase,
  IconLogout,
  IconAlarmPlus,
  IconFileAlert,
  IconClockPin,
  IconMap2,
} from "@tabler/icons-react";
import { Suspense, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { LoadingScreen } from "../elements";
import { SegmentControl } from "../navigation";
import { useTitleContext } from "../providers/TitleProvider";
import { useAuth } from "@/features/auth";
type SubMenuListType = {
  maintitle: string;
  title: string;
  href: string;
  icon: JSX.Element;
};

const MenuBeranda = [
  {
    maintitle: "none",
    title: "Beranda",
    href: "/beranda",
    icon: <IconCalendar size={15} />,
  },
];

const MenuJadwal = [
  {
    maintitle: "none",
    title: "Jadwal",
    href: "/schedule",
    icon: <IconCalendar size={15} />,
  },
];

const MenuDataMaster = [
  {
    maintitle: "Data Master",
    title: "Data Divisi",
    href: "/division",
    icon: <IconBuildingEstate size={15} />,
  },
  {
    maintitle: "Data Master",
    title: "Data Shift",
    href: "/shift",
    icon: <IconClockHour1 size={15} />,
  },
  {
    maintitle: "Data Master",
    title: "Data Lokasi",
    href: "/locations",
    icon: <IconMap2 size={15} />,
  },
  {
    maintitle: "Data Master",
    title: "Data Karyawan",
    href: "/employees",
    icon: <IconBriefcase size={15} />,
  },
  {
    maintitle: "Data Master",
    title: "Data User",
    href: "/users",
    icon: <IconUsersGroup size={15} />,
  },
];

const MenuAbsensi = [
  {
    maintitle: "Laporan",
    title: "Presensi",
    href: "/attendance",
    icon: <IconClipboardText size={15} />,
  },
  {
    maintitle: "Laporan",
    title: "Aktivitas",
    href: "/activity",
    icon: <IconGauge size={15} />,
  },
];

const MenuPengajuan = [
  {
    maintitle: "Pengajuan",
    title: "Absensi",
    href: "/request-attendance",
    icon: <IconClockPin size={15} />,
  },
  {
    maintitle: "Pengajuan",
    title: "Izin/Sakit/Cuti",
    href: "/permission",
    icon: <IconFileAlert size={15} />,
  },
  {
    maintitle: "Pengajuan",
    title: "Lembur",
    href: "/overtime",
    icon: <IconAlarmPlus size={15} />,
  },
];

const MenuFreelancer = [
  {
    maintitle: "Pekerja Lepas",
    title: "Data Pekerja",
    href: "/freelancer",
    icon: <IconUsersGroup size={15} />,
  },
  {
    maintitle: "Pekerja Lepas",
    title: "Data Sesi",
    href: "/session",
    icon: <IconClockHour1 size={15} />,
  },
  {
    maintitle: "Pekerja Lepas",
    title: "Data Kelompok",
    href: "/group",
    icon: <IconBuildingEstate size={15} />,
  },
  {
    maintitle: "Pekerja Lepas",
    title: "Presensi",
    href: "/attendance_freelancer",
    icon: <IconClipboardText size={15} />,
  },
];

// ====================================================================================
// ================== THIS LAYOUT FOR ADMIN ONLY (SINGLE ROLE) =======================
// ====================================================================================
export const AdminLayout: React.FC = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const { title, setTitle } = useTitleContext();
  console.log(title);
  const navigate = useNavigate();
  const [submenu, setSubmenu] = useState<SubMenuListType[]>(MenuBeranda);
  const isMobile = useMediaQuery("(max-width: 800px)");
  const isTablet = useMediaQuery("(max-width: 1000px)");

  useEffect(() => {
    if (location.pathname.includes("/beranda")) {
      setSubmenu(MenuBeranda);
      setTitle("Beranda");
      navigate("/beranda");
    }

    if (
      ["/division", "/shift", "/users", "/locations", "/employees"].some(
        (path) => location.pathname.includes(path)
      )
    ) {
      setSubmenu(MenuDataMaster);
      setTitle("Data Master");
    }

    if (
      ["/attendance", "/activity"].some((path) =>
        location.pathname.includes(path)
      )
    ) {
      setSubmenu(MenuAbsensi);
      setTitle("Laporan");
    }

    if (location.pathname.includes("/schedule")) {
      setSubmenu(MenuJadwal);
      setTitle("Jadwal");
    }

    if (
      ["/request-attendance", "/permission", "/overtime"].some((path) =>
        location.pathname.includes(path)
      )
    ) {
      setSubmenu(MenuPengajuan);
      setTitle("Pengajuan");
    }

    if (
      ["/freelancer", "/session", "/group", "/attendance_freelancer"].some(
        (path) => location.pathname.includes(path)
      )
    ) {
      setSubmenu(MenuFreelancer);
      setTitle("Pekerja Lepas");
    }
  }, [location.pathname, navigate, setTitle]);
  if (isMobile || isTablet) {
    return (
      <div className="bg-blue-600 min-h-screen text-white flex justify-center items-center text-lg text-center p-20">
        <div>
          <div>Halaman Admin hanya bisa diakses Melalui Layar Laptop</div>
          <Button
            className="mt-3"
            color="blue"
            variant="white"
            // onClick={() => logout()}
          >
            Kembali Ke Halaman Login
          </Button>
        </div>
      </div>
    );
  }
  return (
    <Suspense fallback={<LoadingScreen />}>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 0,
          breakpoint: "sm",
        }}
        padding="md"
        withBorder={false}
      >
        <AppShell.Header className="shadow-md">
          <Group
            w="100%"
            h="100%"
            justify="space-between"
            gap={0}
            className="px-3"
          >
            <Group
              gap={5}
              justify={isMobile ? "end" : "center"}
              style={{ width: 240 }}
              className="h-full"
            >
              <div className="flex gap-2 items-center">
                <>
                  {/* <Avatar
                    className="shadow-lg"
                    src={"/images/kulakita-logo.svg"}
                    alt="Logo company"
                    size={40}
                  /> */}
                  <div className="text-sm font-bold uppercase text-slate-400 text-center ">
                    Kulakita
                  </div>
                </>
              </div>
            </Group>

            <>{!isTablet && <SegmentControl />}</>

            {/* Profile and Name Information */}
            {!isTablet && (
              <Group className="h-full" justify="space-between">
                <Group gap={5} className="h-full" justify="end">
                  <Menu shadow="md" width={200}>
                    <Menu.Target>
                      <UnstyledButton>
                        <Group gap={16} px={20}>
                          <div className="text-sm text-end">
                            <div className="font-semibold">Testing</div>
                            <div className="text-xs -mt-1 text-slate-400 capitalize">
                              Admin
                            </div>
                          </div>
                          <Avatar
                            src={"/images/user-blue-person.png"}
                            alt={"User"}
                            radius="xl"
                            size={33}
                          />
                        </Group>
                      </UnstyledButton>
                    </Menu.Target>

                    <Menu.Dropdown>
                      <Menu.Label>List Menu</Menu.Label>
                      <Menu.Item leftSection={<IconSettings size={14} />}>
                        Settings
                      </Menu.Item>

                      <Menu.Divider />

                      <Menu.Item
                        onClick={() => logout()}
                        color="red"
                        leftSection={<IconLogout size={14} />}
                      >
                        Logout
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Group>
              </Group>
            )}
          </Group>
        </AppShell.Header>

        <AppShell.Main>
          {/* SUB MENU LIST */}

          {submenu[0].maintitle !== "none" && (
            <section
              id="submenulist"
              className="rounded-md mb-4 flex justify-center gap-5"
            >
              {submenu.map((item, index) => (
                <Button
                  key={index}
                  onClick={() => navigate(item.href)}
                  variant={
                    location.pathname.includes(item.href) ? "filled" : "outline"
                  }
                  color="blue"
                  leftSection={item.icon}
                >
                  {item.title}
                </Button>
              ))}
            </section>
          )}

          <Outlet />
        </AppShell.Main>
      </AppShell>
    </Suspense>
  );
};
