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

const DEFAULT_IMAGE = "/images/splash.png";
const BaseURL = import.meta.env.VITE_API_URL;

interface IncomingStockSectionProps {
  items: ItemType[];
  LoadingItems: boolean;
}

export const IncomingStockSection: React.FC<IncomingStockSectionProps> = ({
  items,
  LoadingItems,
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [finalStock, setFinalStock] = useState<number>(0);
  const [selectedItem, setSelectedItem] = useState<ItemType | null>(null);
  const [count, setCount] = useState<number>(0);
  useEffect(() => {
    if (selectedItem) {
      setFinalStock(selectedItem.stock + count);
    }
  }, [count, selectedItem]);
  console.log("Stok awal :", selectedItem?.stock);
  console.log("Count :", count);
  console.log("Stok akhir :", finalStock);
  // SEARCH INPUT
  const [search, setSearch] = useState<string | null>("");
  // END FOR SEARCH INPUT
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
                    open(), setCount(0), setSelectedItem(item);
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
                        {item.stock}
                      </Text>
                    )}
                  </div>
                  <div className="col-span-2 text-center my-auto">
                    {LoadingItems ? (
                      <div className="flex justify-end mr-3 -mt-2">
                        <Skeleton height={23} width="40%" />
                      </div>
                    ) : (
                      <Text size="xl" fw={700}>
                        {item.stock}
                      </Text>
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
                  // key={form.key("task_code")}
                  // {...form.getInputProps("task_code")}
                />
                <TextInput
                  label="Stok akhir"
                  size="sm"
                  disabled
                  value={finalStock ?? 0}
                  // key={form.key("task_code")}
                  // {...form.getInputProps("task_code")}
                />
              </div>
              <div className="grid grid-cols-12 text-center">
                <div className="col-span-4 my-auto">
                  <UnstyledButton
                    size="xl"
                    disabled={count ? (count < 1 ? true : false) : true}
                    onClick={() => setCount((count ?? 0) - 1)}
                  >
                    <IconSquareChevronLeftFilled size={40} color="#4B352A" />
                  </UnstyledButton>
                </div>
                <div className="col-span-4">
                  <Text size={"60px"} c={"green"} fw={700}>
                    {count}
                  </Text>
                </div>
                <div className="col-span-4 my-auto">
                  <UnstyledButton
                    size="xl"
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
                <Button fullWidth size="sm" onClick={close}>
                  Simpan
                </Button>
              </div>
            </div>
          </Drawer>
        </div>
      </section>
      <div className="fixed bottom-22 right-4 z-10 w-32">
        <Button size="sm" fullWidth>
          Simpan
        </Button>
      </div>
    </>
  );
};
