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
import React, { useState } from "react";

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
  const [count, setCount] = useState<number | null>(5);
  return (
    <>
      <section className="bg-white shadow-md rounded-lg p-2">
        <div className="flex justify-between px-2">
          <TextInput
            size="sm"
            placeholder="Cari barang..."
            leftSection={<IconSearch size={18} />}
          />
        </div>
        <div className="mt-4">
          {items.map((item) => (
            <div>
              <UnstyledButton
                className="w-full grid grid-cols-12"
                onClick={open}
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
                    <TextInput
                      label="Stok awal"
                      size="sm"
                      disabled
                      value={5}
                      // key={form.key("task_code")}
                      // {...form.getInputProps("task_code")}
                    />
                    <TextInput
                      label="Stok akhir"
                      size="sm"
                      disabled
                      value={count ?? 0}
                      // key={form.key("task_code")}
                      // {...form.getInputProps("task_code")}
                    />
                  </div>
                  <div className="grid grid-cols-12 text-center">
                    <div className="col-span-4 my-auto">
                      <UnstyledButton
                        size="xl"
                        onClick={() => setCount((count ?? 0) - 1)}
                      >
                        <IconSquareChevronLeftFilled
                          size={40}
                          color="#4B352A"
                        />
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
                        onClick={() => setCount((count ?? 0) + 1)}
                        disabled={count ? (count < 1 ? true : false) : true}
                      >
                        <IconSquareChevronRightFilled
                          size={40}
                          color="#4B352A"
                        />
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
          ))}
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
