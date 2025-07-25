import {
  DetailIncomingType,
  DetailOutgoingType,
  OutgoingDataType,
} from "@/types";
import {
  Button,
  Divider,
  Drawer,
  Image,
  Modal,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { AxiosError } from "axios";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useDeleteOutgoingData,
  useDeleteOutgoingDetail,
  useUpdateIncomingDetail,
} from "../api";
import {
  IconSquareChevronLeftFilled,
  IconSquareChevronRightFilled,
} from "@tabler/icons-react";

const BaseURL = import.meta.env.VITE_API_URL;
const DEFAULT_IMAGE = "/images/profile-default.png";

type UpdateDetailRequest = {
  amount?: number;
};

interface DetailOutgoingProps {
  outgoingData: OutgoingDataType;
  details: DetailOutgoingType[];
  RefetchDetails: () => void;
}

export const DetailOutgoingSection: React.FC<DetailOutgoingProps> = ({
  outgoingData,
  details,
  RefetchDetails,
}) => {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const [openedDrawer, { open: openDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [selectedData, setSelectedData] = useState<
    DetailOutgoingType | undefined
  >();
  const [amount, setAmount] = useState<number | undefined>(
    selectedData?.amount ?? 0
  );
  useEffect(() => {
    setAmount(selectedData?.amount);
  }, [selectedData]);

  // DELETE INCOMING DATA
  const deleteOutgoingDataMutation = useDeleteOutgoingData();
  const deleteOutgoingData = async (id: number | undefined) => {
    deleteOutgoingDataMutation.mutateAsync(id, {
      onSuccess: (data) => {
        console.log("Sukses :", data);
        showNotification({
          message: "Data barang keluar berhasil dihapus",
          color: "green",
          position: "top-center",
        });
        close();
        navigate(-1);
      },
      onError: (error) => {
        const axiosError = error as AxiosError<{ errors: string }>;
        const errorMessage =
          axiosError?.response?.data?.errors ||
          "Gagal menghapus barang keluar. Silakan coba lagi.";
        close();
        showNotification({
          message: errorMessage,
          color: "red",
          position: "top-center",
        });
      },
    });
  };
  // END FOR DELETE INCOMING DATA

  //   DELETE OUTGOING DETAIL
  const deleteDetailMutation = useDeleteOutgoingDetail();
  const deleteDetail = async (id: number | undefined) => {
    deleteDetailMutation.mutateAsync(id, {
      onSuccess: () => {
        RefetchDetails();
        showNotification({
          message: "Detail barang keluar berhasil dihapus",
          color: "green",
          position: "top-center",
        });
        closeDrawer();
      },
      onError: (error: any) => {
        const axiosError = error as AxiosError<{ errors: string }>;
        const errorMessage =
          axiosError?.response?.data?.errors ||
          "Gagal menghapus detail. Silakan coba lagi.";
        close();
        showNotification({
          message: errorMessage,
          color: "red",
          position: "top-center",
        });
      },
    });
  };
  //   END FOR DELETE OUTGOING DETAIL

  //   UPDATE OUTGOING DETAIL
  const mutationUpdateIncomingDetail = useUpdateIncomingDetail(
    selectedData?.id
  );
  const handleUpdateDetail = async () => {
    const updateDetail: UpdateDetailRequest = {
      amount: amount,
    };
    await mutationUpdateIncomingDetail.mutateAsync(updateDetail, {
      onSuccess: () => {
        RefetchDetails();
        closeDrawer();
        showNotification({
          message: `Detail berhasil diubah`,
          color: "green",
          position: "top-center",
        });
        setAmount(0);
      },
      onError: (error) => {
        const axiosError = error as AxiosError<{ errors: string }>;
        const errorMessage =
          axiosError?.response?.data?.errors ||
          "Gagal mengubah detail. Silakan coba lagi.";
        closeDrawer();
        showNotification({
          message: errorMessage,
          color: "red",
          position: "top-center",
        });
      },
    });
  };
  //   END FOR UPDATE OUTGOING DETAIL
  return (
    <>
      <div className="bg-white shadow-md rounded-md p-4">
        <div className="grid grid-cols-12">
          <div className="col-span-6">
            <Text size="xs" fw={400}>
              {format(outgoingData.created_at, "EEEE, dd MMM yyyy HH:mm", {
                locale: id,
              })}
            </Text>
          </div>
          <div className="col-span-6 flex justify-end">
            <Image
              radius="10px"
              h={20}
              w={20}
              src={
                outgoingData.employee.profile_pic
                  ? `${BaseURL}/uploads/employees/${outgoingData.employee?.profile_pic}`
                  : DEFAULT_IMAGE
              }
            />
            <Text size="xs" fw={400} truncate="end">
              {outgoingData.employee.name}
            </Text>
          </div>
        </div>
        <Divider my={8} />
        {details.map((data, index) => (
          <UnstyledButton
            onClick={() => {
              openDrawer();
              setSelectedData(data);
            }}
            className="w-full mb-3 px-2"
            key={index}
          >
            <div className="grid grid-cols-12">
              <div className="col-span-2">
                <Image
                  radius="10px"
                  h={35}
                  w={35}
                  src={
                    data.item.image
                      ? `${BaseURL}/uploads/items/${data.item.image}`
                      : "/images/splash.png"
                  }
                />
              </div>
              <div className="col-span-8">
                <Text size="sm" fw={600}>
                  {data.item.name}
                </Text>
                <Text size="xs" fw={300}>
                  {data.item.code}
                </Text>
              </div>
              <div className="col-span-2 text-end">
                <Text size="xl" fw={700} mr={3}>
                  {data.amount}
                </Text>
              </div>
            </div>
          </UnstyledButton>
        ))}
        <Divider />
        <div className="flex justify-between gap-2 mt-3">
          <Button
            size="xs"
            color="gray"
            onClick={() => {
              navigate(-1);
            }}
            fullWidth
          >
            Kembali
          </Button>
          <Button
            size="xs"
            color="red"
            onClick={() => {
              open();
            }}
            fullWidth
          >
            Hapus
          </Button>
        </div>
      </div>

      <Modal opened={opened} onClose={close} title="Konfirmasi hapus">
        <div className="px-1">
          <div className=" text-center px-2">
            <Text size="sm" fw={500}>
              Apakah anda yakin ingin menghapus seluruh transaksi ini?
            </Text>
            <Text size="sm" c={"red"} fw={700}>
              "
              {format(outgoingData.created_at, "EEEE dd MMM yyyy HH:mm", {
                locale: id,
              })}{" "}
              || {outgoingData.details.length} Barang "
            </Text>
          </div>
          <div className="flex justify-betwen gap-2 mt-2 mb-2">
            <Button color="grey" size="xs" fullWidth onClick={close}>
              Kembali
            </Button>
            <Button
              color="yellow"
              size="xs"
              fullWidth
              onClick={() => {
                deleteOutgoingData(outgoingData?.id);
              }}
            >
              Ya! Hapus
            </Button>
          </div>
        </div>
      </Modal>

      <Drawer
        opened={openedDrawer}
        onClose={() => {
          closeDrawer(), setSelectedData(undefined);
        }}
        position="bottom"
        withCloseButton={false}
        size={"xs"}
      >
        <div className="p-3">
          <div className="text-center">
            <Text size="md" fw={500}>
              {selectedData?.item.name}
            </Text>
            <Divider my={7} />
          </div>
          <div className="grid grid-cols-12 text-center">
            <div className="col-span-4 my-auto">
              <UnstyledButton
                size="xl"
                disabled={(amount ?? 0) <= 1}
                onClick={() => setAmount((prev) => (prev ?? 0) - 1)}
              >
                <IconSquareChevronLeftFilled size={40} color="#4B352A" />
              </UnstyledButton>
            </div>
            <div className="col-span-4">
              <Text size={"60px"} c={"green"} fw={700}>
                {amount}
              </Text>
            </div>
            <div className="col-span-4 my-auto">
              <UnstyledButton
                size="xl"
                onClick={() => setAmount((prev) => (prev ?? 0) + 1)}
              >
                <IconSquareChevronRightFilled size={40} color="#4B352A" />
              </UnstyledButton>
            </div>
          </div>
          <div className="flex justify-between gap-2 mt-12 -mx-3">
            <Button
              fullWidth
              size="sm"
              color="red"
              onClick={() => {
                deleteDetail(selectedData?.id);
              }}
            >
              Hapus
            </Button>
            <Button
              fullWidth
              size="sm"
              color="blue"
              onClick={() => {
                handleUpdateDetail();
              }}
            >
              Ubah
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  );
};
