import { Button, Divider, Image, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const DEFAULT_IMAGE = "/images/splash.png";
export const DetailItemSection: React.FC = () => {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <div className="bg-white rounded-xl shadow-md p-2">
        <div className="grid grid-cols-12 p-2">
          <div className="col-span-4 mx-auto ">
            <Image radius="10px" h={80} w={80} src={DEFAULT_IMAGE} />
          </div>
          <div className="col-span-6 mt-1">
            <Text size="md" fw={700}>
              Sirup mawar
            </Text>
            <Text size="xl" fw={700} mt={18}>
              5
            </Text>
          </div>
          <div className="col-span-2 text-end -mt-2 -mr-1">
            <Button size="compact-xs" color="red" onClick={open}>
              <IconTrash size={15} />
            </Button>
          </div>
        </div>
        <Divider mx={7} />
        <div className="mt-2 px-4 flex justify-between">
          <Text size="sm" fw={400}>
            Kode barang
          </Text>
          <Text size="sm" fw={700}>
            K01
          </Text>
        </div>
        <Divider mx={7} mt={6} />
        <div className="mt-2 px-4 flex justify-between">
          <Text size="sm" fw={400}>
            Kategori
          </Text>
          <Text size="sm" fw={700}>
            Sirup - sirupan
          </Text>
        </div>
        <div className="flex justify-between px-2 gap-1 mt-4 mb-3">
          <Button
            fullWidth
            color="yellow"
            size="sm"
            onClick={() => navigate("/warehouse-inventory/item/update")}
          >
            Edit
          </Button>
          <Button
            fullWidth
            size="sm"
            onClick={() => navigate("/warehouse-inventory/item/history")}
          >
            Riwayat
          </Button>
        </div>
        <Modal opened={opened} onClose={close} title="Konfirmasi hapus">
          <div className="px-1">
            <div className=" text-center px-2">
              <Text size="sm" fw={500}>
                Apakah anda yakin ingin menghapus barang dengan kode
              </Text>
              <Text size="md" c={"red"} fw={700}>
                "B01 || Sirup mawar"
              </Text>
            </div>
            <div className="flex justify-betwen gap-2 mt-2 mb-2">
              <Button color="grey" size="sm" fullWidth onClick={close}>
                Kembali
              </Button>
              <Button
                color="yellow"
                size="sm"
                fullWidth
                //   onClick={() => {
                //     deleteDailyTask(selectedTask?.id);
                //   }}
              >
                Ya! Hapus barang
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};
