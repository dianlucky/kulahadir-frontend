import { ItemType } from "@/types";
import {
  Button,
  Divider,
  Image,
  Popover,
  Select,
  Text,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
import { IconAdjustments, IconDownload, IconSearch } from "@tabler/icons-react";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface ItemDataSection {
  items: ItemType[];
}

const DEFAULT_IMAGE = "/images/splash.png";
const BaseURL = import.meta.env.VITE_API_URL;

export const ItemData: React.FC<ItemDataSection> = ({ items }) => {
  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);
  const {pathname} = useLocation()

  // SEARCH INPUT
  const [search, setSearch] = useState<string | null>("");
  // END FOR SEARCH INPUT

  // FILTER SORT ITEM
  const [sort, setSort] = useState<string | null>("asc");
  const [selectedSort, setSelectedSort] = useState<string | null>("asc");
  let sortedItems: ItemType[] = [];
  if (selectedSort == "asc") {
    sortedItems = items
      .filter((item) =>
        item.name.toLowerCase().includes(search ? search.toLowerCase() : "")
      )
      .sort((a, b) => a.stock - b.stock);
  } else {
    sortedItems = items
      .filter((item) =>
        item.name.toLowerCase().includes(search ? search.toLowerCase() : "")
      )
      .sort((a, b) => b.stock - a.stock);
  }
  // END FOR FILTER SORT ITEM

  return (
    <>
      <section className="bg-white mx-auto max-w-sm w-full shadow-lg rounded-md relative p-4">
        <div className="flex justify-between text-xs items-center mb-4">
          <div>
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
          <div>
            <Popover
              width={200}
              position="bottom"
              withArrow
              withOverlay
              offset={5}
              opened={opened}
            >
              <Popover.Target>
                <Button
                  size="compact-md"
                  color="blue"
                  c={"white"}
                  mr={4}
                  onClick={() => setOpened((o) => !o)}
                >
                  <IconAdjustments size={20} />
                </Button>
              </Popover.Target>
              <Popover.Dropdown>
                <div>
                  <Select
                    size="xs"
                    label="Urutkan berdasarkan"
                    placeholder="Pilih filter"
                    checkIconPosition="right"
                    comboboxProps={{ withinPortal: false }}
                    value={sort}
                    onChange={setSort}
                    data={[
                      { label: "Stok terendah", value: "asc" },
                      { label: "Stok tertinggi", value: "desc" },
                    ]}
                  />
                </div>
                <div className="mt-2 flex justify-between gap-2">
                  <Button
                    fullWidth
                    size="xs"
                    onClick={() => {
                      setSelectedSort(sort);
                      setOpened(false);
                    }}
                  >
                    Simpan
                  </Button>
                </div>
              </Popover.Dropdown>
            </Popover>

            <Button size="compact-md" color="green" c={"white"}>
              <IconDownload size={20} />
            </Button>
          </div>
        </div>
        {sortedItems.length == 0 && (
          <div className="my-10">
            <div className="flex justify-center">
              <Image
                radius="10px"
                h={120}
                w={120}
                src={"/images/not-found.svg"}
              />
            </div>
            <div className="text-center mt-1">
              <Text size="sm" fw={600}>
                Data barang tidak ditemukan
              </Text>
            </div>
          </div>
        )}
        {sortedItems.map((data, index) => (
          <div key={index}>
            <UnstyledButton
              className="w-full grid grid-cols-12"
              onClick={() =>
                navigate(
                  `/${
                    pathname.includes("frozen") ? `frozen` : `warehouse`
                  }-inventory/item/detail`,
                  {
                    state: { data },
                  }
                )
              }
            >
              <div className="col-span-2 flex justify-center">
                <div className="border-2 border-gray-300 rounded-[10px]">
                  <Image
                    radius="10px"
                    h={35}
                    w={35}
                    src={
                      data.image
                        ? `${BaseURL}/uploads/items/${data?.image}`
                        : DEFAULT_IMAGE
                    }
                  />
                </div>
              </div>
              <div className="col-span-8 text-left">
                <Text size="sm" truncate="end" fw={700}>
                  {data.name}
                </Text>
                <Text size="xs" truncate="end" fw={400} mt={-4}>
                  {data.code}
                </Text>
              </div>
              <div className="col-span-2 text-center my-auto">
                <Text size="xl" fw={700} c={data.stock <= 0 ? `red` : `dark`}>
                  {data.stock}
                </Text>
              </div>
            </UnstyledButton>
            <div className="px-2">
              <Divider my={10} />
            </div>
          </div>
        ))}
      </section>
    </>
  );
};
