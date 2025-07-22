import { ItemType } from "@/types";
import { Button, Divider, Image, Modal, Skeleton, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

interface DetailItemSectionProps {
  item?: ItemType;
  LoadingItem: boolean;
}

const DEFAULT_IMAGE = "/images/splash.png";
const BaseURL = import.meta.env.VITE_API_URL;
export const DetailItemSection: React.FC<DetailItemSectionProps> = ({
  item,
  LoadingItem,
}) => {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <div className="bg-white rounded-xl shadow-md p-2">
        <div className="grid grid-cols-12 p-2">
          <div className="col-span-4 mx-auto ">
            {LoadingItem ? (
              <Skeleton height={70} circle />
            ) : (
              <Image
                radius="10px"
                h={80}
                w={80}
                src={
                  item?.image
                    ? `${BaseURL}/uploads/items/${item?.image}`
                    : DEFAULT_IMAGE
                }
              />
            )}
          </div>
          <div className="col-span-7 mt-1">
            {LoadingItem ? (
              <Skeleton height={15} width="60%" />
            ) : (
              <Text size="md" fw={700} truncate="end">
                {item?.name}
              </Text>
            )}

            {LoadingItem ? (
              <Skeleton height={15} width="20%" mt={22} />
            ) : (
              <Text size="xl" fw={700} mt={18}>
                {item?.stock}
              </Text>
            )}
          </div>
          <div className="col-span-1 text-end -mt-2">
            <Button
              disabled={LoadingItem}
              size="compact-xs"
              color="red"
              onClick={open}
            >
              <IconTrash size={15} />
            </Button>
          </div>
        </div>
        <Divider mx={7} />
        {LoadingItem ? (
          <Skeleton height={15} width="80%" my={10} ml={10} />
        ) : (
          <div className="mt-2 px-4 flex justify-between">
            <Text size="sm" fw={400}>
              Kode barang
            </Text>
            <Text size="sm" fw={700}>
              {item?.code}
            </Text>
          </div>
        )}

        <Divider mx={7} mt={6} />
        {LoadingItem ? (
          <Skeleton height={15} width="80%" my={10} ml={10} />
        ) : (
          <div className="mt-2 px-4 flex justify-between">
            <Text size="sm" fw={400}>
              Kategori
            </Text>
            <Text size="sm" fw={700}>
              {item?.category?.name}
            </Text>
          </div>
        )}

        <div className="flex justify-between px-2 gap-1 mt-4 mb-3">
          <Button
            fullWidth
            color="yellow"
            disabled={LoadingItem}
            size="sm"
            onClick={() =>
              navigate("/warehouse-inventory/item/update", { state: { item } })
            }
          >
            Edit
          </Button>
          <Button
            fullWidth
            disabled={LoadingItem}
            size="sm"
            onClick={() =>
              navigate("/warehouse-inventory/item/history", { state: { item } })
            }
          >
            Riwayat
          </Button>
        </div>
        <Modal opened={opened} onClose={close} title="Konfirmasi hapus">
          <div className="px-1">
            <div className=" text-center px-2">
              <Text size="sm" fw={500}>
                Apakah anda yakin ingin menghapus barang dengan nama
              </Text>
              <Text size="md" c={"red"} fw={700}>
                "{item?.name}"
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
