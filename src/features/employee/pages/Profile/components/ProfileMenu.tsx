import { useAuth } from "@/features/auth";
import { EmployeeType } from "@/types";
import { Button, Divider, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronRight, IconLogout, IconUser } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

interface ProfileMenuProps {
  employee?: EmployeeType;
}

export const ProfileMenu: React.FC<ProfileMenuProps> = ({ employee }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <section className="w-full mt-8 px-7 flex flex-col divide-y divide-gray-300">
      {/* Data Diri */}
      <button
        onClick={() => navigate("/profile/biodata", { state: employee })}
        className="bg-transparent text-left flex w-full items-center py-3 hover:bg-slate-100 ps-2"
      >
        <div className="bg-brown text-white rounded-lg p-2">
          <IconUser size={25} />
        </div>
        <div className="font-semibold px-4 flex-grow text-sm">Data Diri</div>
        <IconChevronRight size={25} />
      </button>

      <Divider my={"md"}></Divider>

      <button
        onClick={open}
        className="bg-transparent text-left flex w-full items-center py-3 hover:bg-slate-100 ps-2"
      >
        <div className="bg-red-400 text-white rounded-lg p-2">
          <IconLogout size={25} />
        </div>
        <div className="font-semibold px-4 flex-grow text-sm">Logout</div>
        <IconChevronRight size={25} />
      </button>

      <Modal opened={opened} onClose={close} withCloseButton={false}>
        <div className="px-3">
          <div className="text-center">
            <Text fw={500} size="md">
              Apakah anda yakin ingin logout?
            </Text>
          </div>
          <div className="flex gap-2 mt-4">
            <Button fullWidth color="grey" onClick={() => close()}>
              Tidak
            </Button>
            <Button fullWidth color="blue" onClick={() => logout()}>
              Ya
            </Button>
          </div>
        </div>
      </Modal>
    </section>
  );
};
