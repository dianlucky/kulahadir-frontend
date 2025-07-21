import { Divider, Text } from "@mantine/core";
import { IconArrowBigDownFilled, IconArrowBigUpFilled, IconArrowRight } from "@tabler/icons-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import React from "react";

export const HistoryItemSection: React.FC = () => {
  return (
    <>
      <div className="bg-white rounded-md shadow-md p-3">
        <div>
          <div className="grid grid-cols-12 px-3">
            <div className="col-span-6">
              <div>
                <Text size="xs" fw={400}>
                  {format(new Date(), "EEEE, dd MMM yyyy HH:mm", {
                    locale: id,
                  })}
                </Text>
                <div className="flex mt-1">
                  <IconArrowBigDownFilled size={16} color="#40c057" />
                  <Text size="sm" c={"#40c057"} fw={800} mt={-2} ml={3}>
                    Stok masuk
                  </Text>
                </div>
                <Text size="sm" fw={700} mt={3}>
                  Sirup mawar
                </Text>
              </div>
            </div>
            <div className="col-span-6 text-end mt-3">
              <Text size="lg" fw={600}>
                2
              </Text>
              <div className="flex justify-end">
                <Text size="xs" fw={400} mt={1}>
                  1
                </Text>
                <div className="mt-1">
                  <IconArrowRight size={12} />
                </div>
                <Text size="xs" fw={400} mt={1}>
                  3
                </Text>
              </div>
            </div>
          </div>
          <div className="my-2">
            <Divider />
          </div>
        </div>
        <div>
          <div className="grid grid-cols-12 px-3">
            <div className="col-span-6">
              <div>
                <Text size="xs" fw={400}>
                  {format(new Date(), "EEEE, dd MMM yyyy HH:mm", {
                    locale: id,
                  })}
                </Text>
                <div className="flex mt-1">
                  <IconArrowBigUpFilled size={16} color="#fa5252" />
                  <Text size="sm" c={"#fa5252"} fw={800} mt={-2} ml={3}>
                    Stok keluar
                  </Text>
                </div>
                <Text size="sm" fw={700} mt={3}>
                  Sirup mawar
                </Text>
              </div>
            </div>
            <div className="col-span-6 text-end mt-3">
              <Text size="lg" fw={600}>
                2
              </Text>
              <div className="flex justify-end">
                <Text size="xs" fw={400} mt={1}>
                  3
                </Text>
                <div className="mt-1">
                  <IconArrowRight size={12} />
                </div>
                <Text size="xs" fw={400} mt={1}>
                  1
                </Text>
              </div>
            </div>
          </div>
          <div className="my-2">
            <Divider />
          </div>
        </div>
      </div>
    </>
  );
};
