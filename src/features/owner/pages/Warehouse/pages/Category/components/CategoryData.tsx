import { Button, Divider, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCategory, IconTrash } from "@tabler/icons-react";

export const CategoryData: React.FC = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <section className="bg-white mx-auto max-w-sm w-full shadow-lg rounded-md relative p-4">
        <div className="flex justify-between text-xs items-center mb-2">
          <span className="text-sm font-bold text-brown">Daftar Kategori</span>
          <IconCategory size={20} />
        </div>
        <Divider size="xs" className="mb-2" />
        <div>
          <div className="grid grid-cols-12 px-2">
            <div className="col-span-1 m-auto">
              <Text fw={700} size="sm">
                K01
              </Text>
            </div>
            <div className="col-span-1 ml-1">
              <div className="w-px h-full bg-gray-300 mx-4" />
            </div>
            <div className="col-span-8 ml-1 my-auto">
              <Text size="12px" lineClamp={2}>
                Barang Dapur
              </Text>
            </div>
            <div className="col-span-2 ml-4">
              <Button
                color="red"
                size={"compact-sm"}
                onClick={() => {
                  // open(), setSelectedTask(data);
                }}
              >
                <IconTrash size={18} />
              </Button>
            </div>
          </div>
          <div className="mt-2 mb-2">
            <Divider />
          </div>
        </div>
        <div>
          <div className="grid grid-cols-12 px-2">
            <div className="col-span-1 m-auto">
              <Text fw={700} size="sm">
                K02
              </Text>
            </div>
            <div className="col-span-1 ml-1">
              <div className="w-px h-full bg-gray-300 mx-4" />
            </div>
            <div className="col-span-8 ml-1 my-auto">
              <Text size="12px" lineClamp={2}>
                Minuman Serbuk
              </Text>
            </div>
            <div className="col-span-2 ml-4">
              <Button
                color="red"
                size={"compact-sm"}
                onClick={() => {
                  open();
                }}
              >
                <IconTrash size={18} />
              </Button>
            </div>
          </div>
          <div className="mt-2 mb-2">
            <Divider />
          </div>
        </div>
      </section>

      <Modal opened={opened} onClose={close} title="Konfirmasi hapus">
        <div className="px-1">
          <div className=" text-center px-2">
            <Text size="sm" fw={500}>
              Apakah anda yakin ingin menghapus kategori dengan kode
            </Text>
            <Text size="md" c={"red"} fw={700}>
              "K01 || Barang dapur"
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
              Ya! Hapus tugas
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
