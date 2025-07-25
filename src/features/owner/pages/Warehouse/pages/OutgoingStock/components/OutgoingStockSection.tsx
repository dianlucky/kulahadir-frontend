import { useAuth } from "@/features/auth";
import { ItemType } from "@/types";
import {
  Button,
  Divider,
  Drawer,
  Image,
  Skeleton,
  Text,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconSearch,
  IconSquareChevronLeftFilled,
  IconSquareChevronRightFilled,
} from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateOutgoingDetail, useCreateOutgoingItem } from "../api";
import { showNotification } from "@mantine/notifications";

const DEFAULT_IMAGE = "/images/splash.png";
const BaseURL = import.meta.env.VITE_API_URL;
interface OutgoingStockSectionProps {
  items: ItemType[];
  LoadingItems: boolean;
}

export const OutgoingStockSection: React.FC<OutgoingStockSectionProps> = ({
  items,
  LoadingItems,
}) => {
  const { creds } = useAuth();
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const [finalStock, setFinalStock] = useState<number>(0);
  const [selectedItem, setSelectedItem] = useState<ItemType | null>(null);
  const [count, setCount] = useState<number>(0);
  useEffect(() => {
    if (selectedItem) {
      setFinalStock(selectedItem.stock - count);
    }
  }, [count, selectedItem]);
  // SEARCH INPUT
  const [search, setSearch] = useState<string | null>("");
  // END FOR SEARCH INPUT

  const [outgoingList, setOutgoingList] = useState<
    { item_id: number; amount: number }[]
  >([]);

  const createOutgoingItem = useCreateOutgoingItem();
  const createOutgoingDetail = useCreateOutgoingDetail();

  const handleSubmitToBackend = async () => {
    if (outgoingList.length === 0) return;

    const employee_id = creds?.employee_id ?? 1;

    try {
      // Step 1: Create incoming item
      const outgoing = await createOutgoingItem.mutateAsync({ employee_id });
      const outgoing_id = outgoing.data.id;

      // Step 2: Loop each item and create incoming detail
      for (const item of outgoingList) {
        await createOutgoingDetail.mutateAsync({
          employee_id,
          item_id: item.item_id,
          outgoing_id,
          amount: item.amount,
        });
      }

      // Reset state
      setOutgoingList([]);
      setSelectedItem(null);
      setCount(0);
      showNotification({
        message: "Berhasil menambahkan data",
        color: "green",
        position: "top-center",
      });
      navigate(-1);
    } catch (err) {
      console.error(err);
      showNotification({
        message: "Gagal menambahkan data!",
        color: "red",
        position: "top-center",
      });
    }
  };
  return (
    <>
      <section className="bg-white shadow-md rounded-lg p-2">
        <div className="flex justify-between px-2">
          <TextInput
            leftSectionPointerEvents="none"
            leftSection={<IconSearch size={16} />}
            placeholder="Cari barang ..."
            radius={"md"}
            size="sm"
            value={search ?? ""}
            onChange={(e) => setSearch(e.currentTarget.value)}
          />
        </div>
        <div className="mt-4">
          {items
            .filter((item) =>
              item.name
                .toLowerCase()
                .includes(search ? search.toLowerCase() : "")
            )
            .map((item, index) => (
              <div key={index}>
                <UnstyledButton
                  className="w-full grid grid-cols-12"
                  onClick={() => {
                    const matched = outgoingList.find(
                      (outgoing) => outgoing.item_id === item.id
                    );
                    setCount(0);
                    if (matched) setCount(matched.amount);
                    setSelectedItem(item);
                    open();
                  }}
                >
                  <div className="col-span-2 flex justify-center">
                    {LoadingItems ? (
                      <Skeleton height={40} width="80%" />
                    ) : (
                      <Image
                        radius="10px"
                        h={35}
                        w={35}
                        src={
                          item.image
                            ? `${BaseURL}/uploads/items/${item.image}`
                            : DEFAULT_IMAGE
                        }
                      />
                    )}
                  </div>
                  <div className="col-span-8 text-left">
                    {LoadingItems ? (
                      <Skeleton height={10} width="80%" />
                    ) : (
                      <Text size="sm" truncate="end" fw={700}>
                        {item.name}
                      </Text>
                    )}
                    {LoadingItems ? (
                      <Skeleton height={10} width="20%" mt={16} />
                    ) : (
                      <Text size="xs" truncate="end" fw={400} mt={-4}>
                        {item.code}
                      </Text>
                    )}
                  </div>
                  <div className="col-span-2 text-center my-auto">
                    {LoadingItems ? (
                      <div className="flex justify-end mr-3 -mt-2">
                        <Skeleton height={23} width="40%" />
                      </div>
                    ) : (
                      <div>
                        {(() => {
                          const matchedData = outgoingList.find(
                            (outgoing) => outgoing.item_id === item.id
                          );
                          if (!matchedData)
                            return (
                              <Text size="xl" fw={700}>
                                {item.stock}
                              </Text>
                            );
                          return (
                            <div>
                              <Text size="md" fw={700}>
                                {item.stock}
                              </Text>
                              <Text size="sm" c="red" fw={600} mt={-4} mr={4}>
                                -{matchedData.amount}
                              </Text>
                            </div>
                          );
                        })()}
                      </div>
                    )}
                  </div>
                </UnstyledButton>
                <div className="px-2">
                  <Divider my={10} />
                </div>
              </div>
            ))}
          <Drawer
            opened={opened}
            onClose={close}
            position="bottom"
            withCloseButton={false}
            size={"xs"}
          >
            <div className="p-3">
              <div className="text-center">
                <Text size="md" fw={500}>
                  {selectedItem?.name}
                </Text>
                <Divider my={7} />
              </div>
              <div className="flex gap-2 mb-4">
                <TextInput
                  label="Stok awal"
                  size="sm"
                  disabled
                  value={selectedItem?.stock ?? 0}
                />
                <TextInput
                  label="Stok akhir"
                  size="sm"
                  disabled
                  value={finalStock ?? 0}
                />
              </div>
              <div className="grid grid-cols-12 text-center">
                <div className="col-span-4 my-auto">
                  <UnstyledButton
                    size="xl"
                    onClick={() => setCount((count ?? 0) - 1)}
                  >
                    <IconSquareChevronLeftFilled size={40} color="#4B352A" />
                  </UnstyledButton>
                </div>
                <div className="col-span-4">
                  <Text size={"60px"} c={"red"} fw={700}>
                    {count}
                  </Text>
                </div>
                <div className="col-span-4 my-auto">
                  <UnstyledButton
                    size="xl"
                    disabled={finalStock <= 0}
                    onClick={() => setCount((prev) => prev + 1)}
                  >
                    <IconSquareChevronRightFilled size={40} color="#4B352A" />
                  </UnstyledButton>
                </div>
              </div>
              <div className="flex justify-between gap-2 mt-8 -mx-3">
                <Button fullWidth size="sm" color="gray" onClick={close}>
                  Batal
                </Button>
                <Button
                  fullWidth
                  size="sm"
                  onClick={() => {
                    if (selectedItem && count > 0) {
                      setOutgoingList((prev) => {
                        const existingIndex = prev.findIndex(
                          (i) => i.item_id === selectedItem.id
                        );
                        if (existingIndex !== -1) {
                          const updated = [...prev];
                          updated[existingIndex].amount = count; // Ganti dari += count jadi set langsung
                          return updated;
                        }
                        return [
                          ...prev,
                          { item_id: selectedItem.id, amount: count },
                        ];
                      });
                    }
                    close();
                  }}
                >
                  Simpan
                </Button>
              </div>
            </div>
          </Drawer>
        </div>
        {/* <div className="mt-4">
          <div>
            <UnstyledButton className="w-full grid grid-cols-12" onClick={open}>
              <div className="col-span-2 flex justify-center">
                <Image radius="10px" h={35} w={35} src={DEFAULT_IMAGE} />
              </div>
              <div className="col-span-8 text-left">
                <Text size="sm" truncate="end" fw={700}>
                  {" "}
                  Sirup Mangga
                </Text>
                <Text size="xs" truncate="end" fw={400} mt={-4}>
                  {" "}
                  B01
                </Text>
              </div>
              <div className="col-span-2 text-center my-auto">
                <Text size="xl" fw={700}>
                  4
                </Text>
              </div>
            </UnstyledButton>
            <div className="px-2">
              <Divider my={10} />
            </div>
            <Drawer
              opened={opened}
              onClose={close}
              position="bottom"
              withCloseButton={false}
              size={"xs"}
            >
              <div className="p-3">
                <div className="text-center">
                  <Text size="md" fw={500}>
                    Sirup mangga
                  </Text>
                  <Divider my={7} />
                </div>
                <div className="flex gap-2 mb-4">
                  <TextInput label="Stok awal" size="sm" disabled value={5} />
                  <TextInput
                    label="Stok akhir"
                    size="sm"
                    disabled
                    value={count ?? 0}
                  />
                </div>
                <div className="grid grid-cols-12 text-center">
                  <div className="col-span-4 my-auto">
                    <UnstyledButton
                      size="xl"
                      onClick={() => setCount((count ?? 0) - 1)}
                    >
                      <IconSquareChevronLeftFilled size={40} color="#4B352A" />
                    </UnstyledButton>
                  </div>
                  <div className="col-span-4">
                    <Text size={"60px"} c={"red"} fw={700}>
                      {count}
                    </Text>
                  </div>
                  <div className="col-span-4 my-auto">
                    <UnstyledButton
                      size="xl"
                      onClick={() => setCount((count ?? 0) + 1)}
                      disabled={count ? (count < 1 ? true : false) : true}
                    >
                      <IconSquareChevronRightFilled size={40} color="#4B352A" />
                    </UnstyledButton>
                  </div>
                </div>
                <div className="flex justify-between gap-2 mt-8 -mx-3">
                  <Button fullWidth size="sm" color="gray" onClick={close}>
                    Batal
                  </Button>
                  <Button fullWidth size="sm" onClick={close}>
                    Simpan
                  </Button>
                </div>
              </div>
            </Drawer>
          </div>
        </div> */}
      </section>
      <div className="fixed bottom-22 right-4 z-10 w-32">
        <Button
          size="sm"
          disabled={outgoingList.length == 0 ? true : false}
          fullWidth
          onClick={handleSubmitToBackend}
        >
          Simpan
        </Button>
      </div>
    </>
  );
};
