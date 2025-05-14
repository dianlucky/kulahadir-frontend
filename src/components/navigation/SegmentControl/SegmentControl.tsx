import { Menu, UnstyledButton } from "@mantine/core";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/features/auth";
import { IconChevronDown } from "@tabler/icons-react";

export const SegmentControl: React.FC = () => {
  // const { creds } = useAuth();
  const navigate = useNavigate();

  // if (!creds) navigate('/login');

  return (
    <section className="flex gap-7">
      <UnstyledButton onClick={() => navigate("/")}>
        <span className="text-slate-400 font-semibold cursor-pointer text-sm">
          Beranda
        </span>
      </UnstyledButton>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <UnstyledButton>
            <span className="text-slate-400 font-semibold cursor-pointer text-sm flex items-center gap-1">
              Data Master <IconChevronDown size={16} />
            </span>
          </UnstyledButton>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item onClick={() => navigate("/account")}>Akun</Menu.Item>
          <Menu.Item onClick={() => navigate("/employee")}>Pegawai</Menu.Item>
          <Menu.Item onClick={() => navigate("/daily-task")}>Tugas harian</Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <UnstyledButton onClick={() => navigate("/schedule")}>
        <span className="text-slate-400 font-semibold cursor-pointer text-sm">
          Jadwal
        </span>
      </UnstyledButton>
      <UnstyledButton onClick={() => navigate("/request")}>
        <span className="text-slate-400 font-semibold cursor-pointer text-sm">
          Pengajuan
        </span>
      </UnstyledButton>
      <UnstyledButton onClick={() => navigate("/salary")}>
        <span className="text-slate-400 font-semibold cursor-pointer text-sm">
          Gaji
        </span>
      </UnstyledButton>
      <UnstyledButton onClick={() => navigate("/report")}>
        <span className="text-slate-400 font-semibold cursor-pointer text-sm">
          Laporan
        </span>
      </UnstyledButton>
    </section>
  );
};
