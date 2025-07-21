import { Button, Divider, Popover, Text } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { IconArrowBigUpFilled, IconCalendar } from "@tabler/icons-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import React from "react";

export const HistoryOutgoingSection: React.FC = () => {
  return (
    <>
      <section className="bg-white mx-auto max-w-sm w-full shadow-lg rounded-md relative p-4">
        <div className="flex justify-between text-xs items-center mb-2">
          <span className="text-sm font-bold text-brown">
            Barang keluar,{" "}
            {format(new Date(), "EEEE, dd MMM yyyy", { locale: id })}
          </span>
          <Popover
            width={300}
            position="bottom-end"
            offset={4}
            withArrow
            shadow="lg"
          >
            <Popover.Target>
              <Button size="compact-sm" color="#654433">
                <IconCalendar size={22} />
              </Button>
            </Popover.Target>
            <Popover.Dropdown>
              <div className="flex justify-center">
                <DatePicker
                  size="sm"
                  // value={selectedDate}
                  // onChange={setSelectedDate}
                />
              </div>
            </Popover.Dropdown>
          </Popover>
        </div>
        <Divider size="xs" className="mb-2" />
        <div>
          <div className=" px-3">
            <div className="col-span-12">
              <div>
                <Text size="xs" fw={400}>
                  {format(new Date(), "EEEE, dd MMM yyyy HH:mm", {
                    locale: id,
                  })}
                </Text>
                <div className="flex mt-1">
                  <IconArrowBigUpFilled size={16} color="red" />
                  <Text size="sm" c={"red"} fw={800} mt={-2} ml={3}>
                    Stok keluar
                  </Text>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-12">
              <div className="col-span-6">
                <Text size="sm" fw={500} mt={3}>
                  Sirup mawar
                </Text>
              </div>
              <div className="col-span-6 text-end">
                <Text size="md" fw={500}>
                  2
                </Text>
              </div>
            </div>
            <div className="grid grid-cols-12 -mt-1">
              <div className="col-span-6">
                <Text size="sm" fw={500} mt={3}>
                  Sirup mangga
                </Text>
              </div>
              <div className="col-span-6 text-end">
                <Text size="md" fw={500}>
                  1
                </Text>
              </div>
            </div>
            <div className="grid grid-cols-12 -mt-1">
              <div className="col-span-6">
                <Text size="sm" fw={500} mt={3}>
                  Sirup anggur
                </Text>
              </div>
              <div className="col-span-6 text-end">
                <Text size="md" fw={500}>
                  3
                </Text>
              </div>
            </div>
          </div>
          <div className="my-2">
            <Divider />
          </div>
        </div>
      </section>
    </>
  );
};
