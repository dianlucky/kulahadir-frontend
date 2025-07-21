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
import React from "react";
import { useNavigate } from "react-router-dom";

const DEFAULT_IMAGE = "/images/splash.png";

export const ItemData: React.FC = () => {
  const navigate = useNavigate();
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
            />
          </div>
          <div>
            <Popover
              width={250}
              position="bottom"
              withArrow
              withOverlay
              offset={5}
            >
              <Popover.Target>
                <Button size="compact-md" color="blue" c={"white"} mr={4}>
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
                    data={["Stok terendah", "Stok tertinggi"]}
                  />
                </div>
                <div className="mt-2 flex justify-between gap-2">
                  <Button fullWidth size="xs">
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
        <div>
          <UnstyledButton
            className="w-full grid grid-cols-12"
            onClick={() => navigate("/warehouse-inventory/item/detail")}
          >
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
        </div>
        <div>
          <UnstyledButton className="w-full grid grid-cols-12">
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
        </div>
        <div>
          <UnstyledButton className="w-full grid grid-cols-12">
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
        </div>
      </section>
    </>
  );
};
