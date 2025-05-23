import {
  Button,
  Divider,
  Image,
  Modal,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconUsers } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export const EmployeePaidLeaveList: React.FC = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  return (
    <section className="mx-auto max-w-xs bg-white w-full shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700 mb-4 mt-2">
      <div className="flex justify-between text-xs items-center p-2 px-2 -mt-1 -mb-1">
        <div>
          <Text fw={700} c="#654433">
            Pegawai yang cuti
          </Text>
        </div>
        <div className="my-auto text-right mb-1 me-2">
          <IconUsers />
        </div>
      </div>
      <Divider size={"sm"} />
      <div className="">
        <div className="grid grid-cols-12 p-2 mb-2">
          <div className="col-span-2 m-auto">
            <Image
              radius="30px"
              h={40}
              w={40}
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-10.png"
            />
          </div>
          <div className="col-span-1">
            <div className="w-px h-full bg-gray-300 mx-4" />
          </div>
          <div className="col-span-9">
            <div>
              <Text fw={700} size="md">
                Dian Lucky Prayogi
              </Text>
            </div>
            <div className="my-1">
              <Divider />
            </div>
            <div>
              <Text fw={400} size="xs">
                Pegawai tetap
              </Text>
            </div>
          </div>
        </div>
        <Divider />
      </div>
      <div className="mt-2 px-1">
        <Button fullWidth size="sm" onClick={open}>
          Tambahkan pegawai yang cuti
        </Button>
      </div>
      <Modal opened={opened} onClose={close} title="Tambah pegawai">
        <div className="p-2">
          <div className="">
            <TextInput
              label="Tanggal"
              disabled
              value={"23 Mei 2025"}
            ></TextInput>
          </div>
          <div className="mt-2">
            <Select label="Pegawai" />
          </div>
          <div className="mt-4 flex justify-between gap-2">
            <Button
              onClick={() => {
                close();
              }}
              fullWidth
              color={"grey"}
            >
              Kembali
            </Button>
            <Button fullWidth>Simpan</Button>
          </div>
        </div>
      </Modal>
    </section>
  );
};
