import { Badge, Button, Divider, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCoins, IconTrash } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export const CashAdvanceList: React.FC = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  return (
    <section className="bg-white shadow-md rounded-lg p-3">
      <div className="flex justify-between py-2 px-4">
        <div>
          <Text size="md" fw={"bold"}>
            Catatan kasbon
          </Text>
        </div>
        <div>
          <IconCoins />
        </div>
      </div>
      <div className="px-3">
        <Divider size={"md"} />
      </div>
      <div>
        <div className="mt-2 px-3 py-2">
          <div className="grid grid-cols-12 mb-3">
            <div className="col-span-2 text-center">
              <Text fw={"bold"} size="27px">
                12
              </Text>
              <Text size="sm" mt={-3}>
                Mei
              </Text>
            </div>
            <div className="col-span-1">
              <div className="w-px h-full bg-gray-300 mx-4" />
            </div>
            <div className="col-span-6 m-auto">
              <Text fw={"bold"} size="xl">
                Rp. 200.000
              </Text>
            </div>
            <div className="col-span-3 my-auto relative">
              <div className="absolute -top-6 -right-0">
                <Badge size="xs" h={13} color="red"></Badge>
              </div>
              <div className="ml-2">
                <Button size="xs" color="red" onClick={open}>
                  <IconTrash />
                </Button>
              </div>
            </div>
          </div>
          <Divider />
        </div>
        <Modal opened={opened} onClose={close} withCloseButton={false}>
          <div className="mt-2">
            <div className="text-center">
              <Text fw={"bold"}>Apakah anda yakin ingin menghapus data?</Text>
              <Text fw={"bold"} size="md" c={"red"}>
                " 12 Mei 2025 | Rp. 200.000 "
              </Text>
            </div>
            <div className="flex justify-between gap-3 mt-3 px-3">
              <Button size="sm" fullWidth onClick={close} color="grey">
                Kembali
              </Button>
              <Button size="sm" fullWidth onClick={close} color="red">
                Ya! Hapus
              </Button>
            </div>
          </div>
        </Modal>
        <div className="px-5 mt-1 mb-2">
          <Button
            size="sm"
            fullWidth
            onClick={() => {
              navigate("/cash-advance-request/add");
            }}
          >
            Ajukan kasbon
          </Button>
        </div>
      </div>
    </section>
  );
};
