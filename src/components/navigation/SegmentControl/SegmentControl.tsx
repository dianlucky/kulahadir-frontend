import { Menu, UnstyledButton } from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "@/features/auth";
import { IconChevronDown } from "@tabler/icons-react";

export const SegmentControl: React.FC = () => {
  const { creds } = useAuth();
  const navigate = useNavigate();
  if (!creds) navigate("/login");
  const location = useLocation();

  return (
    <section className="flex gap-7">
      <UnstyledButton onClick={() => navigate("/")}>
        <span
          className={`font-semibold cursor-pointer text-sm ${
            location.pathname === "/" ? "text-brown" : "text-slate-400"
          }`}
        >
          Beranda
        </span>
      </UnstyledButton>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <UnstyledButton>
            <span
              className={`font-semibold cursor-pointer text-sm flex items-center gap-1 ${
                ["/account", "/employee", "/daily-task"].some((path) =>
                  location.pathname.startsWith(path)
                )
                  ? "text-brown"
                  : "text-slate-400"
              }`}
            >
              Data Master <IconChevronDown size={16} />
            </span>
          </UnstyledButton>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item onClick={() => navigate("/account")}>Akun</Menu.Item>
          <Menu.Item onClick={() => navigate("/employee")}>Pegawai</Menu.Item>
          <Menu.Item onClick={() => navigate("/daily-task")}>
            Tugas harian
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <UnstyledButton onClick={() => navigate("/schedule")}>
        <span
          className={`font-semibold cursor-pointer text-sm ${
            location.pathname === "/schedule" ? "text-brown" : "text-slate-400"
          }`}
        >
          Jadwal
        </span>
      </UnstyledButton>
      <UnstyledButton onClick={() => navigate("/request")}>
        <span
          className={`font-semibold cursor-pointer text-sm ${
            location.pathname === "/request" ? "text-brown" : "text-slate-400"
          }`}
        >
          Pengajuan
        </span>
      </UnstyledButton>
      <UnstyledButton onClick={() => navigate("/salary")}>
        <span
          className={`font-semibold cursor-pointer text-sm ${
            location.pathname === "/salary" ? "text-brown" : "text-slate-400"
          }`}
        >
          Gaji
        </span>
      </UnstyledButton>
      <UnstyledButton onClick={() => navigate("/report")}>
        <span
          className={`font-semibold cursor-pointer text-sm ${
            location.pathname === "/report" ? "text-brown" : "text-slate-400"
          }`}
        >
          Laporan
        </span>
      </UnstyledButton>
    </section>
  );
};
