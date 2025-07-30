import { OutgoingDataType } from "@/types";
import { Button, Divider, Image, Popover, Skeleton, Text } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import {
  IconArrowBigUpFilled,
  IconCalendar,
  IconInfoCircle,
} from "@tabler/icons-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface HistoryOutgoingProps {
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
  outgoingData: OutgoingDataType[];
  LoadingOutgoingData: boolean;
  selectedDate: Date | null;
}

export const HistoryOutgoingSection: React.FC<HistoryOutgoingProps> = ({
  setSelectedDate,
  outgoingData,
  LoadingOutgoingData,
  selectedDate,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      <section className="bg-white mx-auto max-w-sm w-full shadow-lg rounded-md relative p-4">
        <div className="flex justify-between text-xs items-center mb-2">
          {LoadingOutgoingData ? (
            <Skeleton height={10} width="80%" />
          ) : (
            <span className="text-sm font-bold text-brown">
              Barang keluar,{" "}
              {format(selectedDate ?? new Date(), "EEEE, dd MMM yyyy", {
                locale: id,
              })}
            </span>
          )}
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
                  value={selectedDate}
                  onChange={setSelectedDate}
                />
              </div>
            </Popover.Dropdown>
          </Popover>
        </div>
        <Divider size="xs" className="mb-2" />
        {outgoingData.length == 0 && (
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
                Data tidak ditemukan
              </Text>
            </div>
          </div>
        )}
        {outgoingData.map((data, index) => (
          <div key={index}>
            <div className=" px-3">
              <div className="col-span-12 flex justify-between">
                <div>
                  {LoadingOutgoingData ? (
                    <Skeleton height={10} width="80%" />
                  ) : (
                    <Text size="xs" fw={400}>
                      {format(new Date(), "EEEE, dd MMM yyyy HH:mm", {
                        locale: id,
                      })}
                    </Text>
                  )}

                  <div className="flex mt-1">
                    {LoadingOutgoingData ? (
                      <Skeleton height={10} width="50%" />
                    ) : (
                      <div className="flex">
                        <IconArrowBigUpFilled size={16} color="red" />
                        <Text size="sm" c={"red"} fw={800} mt={-2} ml={3}>
                          Stok keluar
                        </Text>
                      </div>
                    )}
                  </div>
                </div>
                <div className="">
                  <Button
                    size="compact-xs"
                    color="blue"
                    onClick={() => {
                      navigate(
                        `/${
                          location.pathname.includes("frozen")
                            ? `frozen`
                            : `warehouse`
                        }-inventory/outgoing/detail`,
                        { state: { data } }
                      );
                    }}
                  >
                    <IconInfoCircle size={17} color="white" />
                  </Button>
                </div>
              </div>
              {data.details.map((item, index) => (
                <div className="grid grid-cols-12" key={index}>
                  <div className="col-span-6 mt-1">
                    {LoadingOutgoingData ? (
                      <Skeleton height={10} width="50%" />
                    ) : (
                      <Text size="sm" fw={500}>
                        {item.item.name}
                      </Text>
                    )}
                  </div>
                  <div className="col-span-6 text-end">
                    {LoadingOutgoingData ? (
                      <div className="flex justify-end">
                        <Skeleton height={10} width="10%" />
                      </div>
                    ) : (
                      <Text size="md" fw={600} mr={10}>
                        {item.amount}
                      </Text>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="my-2">
              <Divider />
            </div>
          </div>
        ))}
      </section>
    </>
  );
};
