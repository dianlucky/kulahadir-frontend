import { IncomingDataType } from "@/types";
import { Button, Divider, Popover, Skeleton, Text } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { IconArrowBigDownFilled, IconCalendar } from "@tabler/icons-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import React from "react";

interface HistoryIncomingProps {
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
  incomingData: IncomingDataType[];
  LoadingIncomingData: boolean;
  selectedDate: Date | null;
}

export const HistoryIncomingSection: React.FC<HistoryIncomingProps> = ({
  setSelectedDate,
  incomingData,
  LoadingIncomingData,
  selectedDate,
}) => {
  return (
    <>
      <section className="bg-white mx-auto max-w-sm w-full shadow-lg rounded-md relative p-4">
        <div className="flex justify-between text-xs items-center mb-2">
          {LoadingIncomingData ? (
            <Skeleton height={10} width="80%" />
          ) : (
            <span className="text-sm font-bold text-brown">
              Barang masuk,{" "}
              {format(new Date(), "EEEE, dd MMM yyyy", { locale: id })}
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
        {incomingData.map((data, index) => (
          <div key={index}>
            <div className=" px-3">
              <div className="col-span-12">
                <div>
                  {LoadingIncomingData ? (
                    <Skeleton height={10} width="80%" />
                  ) : (
                    <Text size="xs" fw={400}>
                      {format(data.created_at, "EEEE, dd MMM yyyy HH:mm", {
                        locale: id,
                      })}
                    </Text>
                  )}
                  <div className="mt-1">
                    {LoadingIncomingData ? (
                      <Skeleton height={10} width="50%" />
                    ) : (
                      <div className="flex">
                        <IconArrowBigDownFilled size={16} color="#40c057" />
                        <Text size="sm" c={"#40c057"} fw={800} mt={-2} ml={3}>
                          Stok masuk
                        </Text>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {data.details.map((item) => (
                <div className="grid grid-cols-12">
                  <div className="col-span-6 mt-1">
                    {LoadingIncomingData ? (
                      <Skeleton height={10} width="50%" />
                    ) : (
                      <Text size="sm" fw={500}>
                        {item.item.name}
                      </Text>
                    )}
                  </div>
                  <div className="col-span-6 text-end">
                    {LoadingIncomingData ? (
                      <div className="flex justify-end">
                        <Skeleton height={10} width="10%" />
                      </div>
                    ) : (
                      <Text size="md" fw={500}>
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
