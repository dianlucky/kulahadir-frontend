import { TransactionType } from "@/types";
import { Divider, Image, Skeleton, Text } from "@mantine/core";
import {
  IconArrowBigDownFilled,
  IconArrowBigUpFilled,
} from "@tabler/icons-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import React from "react";

const BaseURL = import.meta.env.VITE_API_URL;
const DEFAULT_IMAGE = "/images/profile-default.png";

interface HistroyItemSectionProps {
  transactionData: TransactionType[];
  LoadingIncoming: boolean;
  LoadingOutgoing: boolean;
}

export const HistoryItemSection: React.FC<HistroyItemSectionProps> = ({
  transactionData,
  LoadingIncoming,
  LoadingOutgoing,
}) => {
  return (
    <>
      <div className="bg-white rounded-md shadow-md p-3">
        {transactionData.length == 0 && (
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
        {transactionData.map((data, index) => (
          <div key={index}>
            <div className="grid grid-cols-12 px-3">
              <div className="col-span-6">
                <div>
                  {LoadingIncoming && LoadingOutgoing ? (
                    <Skeleton height={10} width="100%" />
                  ) : (
                    <Text size="xs" fw={400}>
                      {format(data.created_at, "EEEE, dd MMM yyyy HH:mm", {
                        locale: id,
                      })}
                    </Text>
                  )}
                  {LoadingIncoming && LoadingOutgoing ? (
                    <Skeleton height={10} width="70%" mt={4} />
                  ) : (
                    <div>
                      {data.type == "incoming" && (
                        <div className="flex mt-1">
                          <IconArrowBigDownFilled size={16} color="#40c057" />
                          <Text size="sm" c={"#40c057"} fw={800} mt={-2} ml={3}>
                            Stok masuk
                          </Text>
                        </div>
                      )}
                      {data.type == "outgoing" && (
                        <div className="flex mt-1">
                          <IconArrowBigUpFilled size={16} color="red" />
                          <Text size="sm" c={"red"} fw={800} mt={-2} ml={3}>
                            Stok keluar
                          </Text>
                        </div>
                      )}
                    </div>
                  )}

                  <Text size="sm" fw={700} mt={3}>
                    {data.item.name}
                  </Text>
                </div>
              </div>
              <div className="col-span-6 text-end mt-3">
                <div className="flex justify-end">
                  <Image
                    radius="10px"
                    h={20}
                    w={20}
                    src={
                      data.employee.profile_pic
                        ? `${BaseURL}/uploads/employees/${data.employee?.profile_pic}`
                        : DEFAULT_IMAGE
                    }
                  />
                  <Text size="xs" fw={400} truncate="end">
                    {data.employee.name}
                  </Text>
                </div>
                <Text size="lg" fw={600}>
                  {data.amount}
                </Text>
                {/* <div className="flex justify-end">
                  <Text size="xs" fw={400} mt={1}>
                    1
                  </Text>
                  <div className="mt-1">
                    <IconArrowRight size={12} />
                  </div>
                  <Text size="xs" fw={400} mt={1}>
                    3
                  </Text>
                </div> */}
              </div>
            </div>
            <div className="my-2">
              <Divider />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
