import { CashAdvanceType } from "@/types";
import {
  Button,
  Divider,
  Image,
  Modal,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCoins, IconEye, IconTrash } from "@tabler/icons-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteCashAdvance } from "../api";

interface CashAdvanceListProps {
  cashAdvances: CashAdvanceType[];
  refetchCashAdvances: () => void;
}

export const CashAdvanceList: React.FC<CashAdvanceListProps> = ({
  cashAdvances,
  refetchCashAdvances,
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const [selectedCashAdvance, setSelectedCashAdvance] =
    useState<CashAdvanceType>();

  const deleteCashAdvanceMutation = useDeleteCashAdvance();
  const deleteCashAdvance = async (id: number | undefined) => {
    deleteCashAdvanceMutation.mutateAsync(id, {
      onSuccess: (data) => {
        console.log("Success Delete:", data);
        refetchCashAdvances();
        close();
      },
    });
  };
  return (
    <section className="bg-white shadow-md rounded-lg p-3">
      <div className="flex justify-between py-2 px-4">
        <div>
          <Text size="md" fw={"bold"}>
            Catatan kasbon
          </Text>
        </div>
        <div>
          <IconCoins />
        </div>
      </div>
      <div className="px-3">
        <Divider size={"md"} />
      </div>
      <div>
        {cashAdvances.length != 0 &&
          cashAdvances.map((data, index) => (
            <div className="px-3 py-2" key={index}>
              <div className="grid grid-cols-12 mb-3">
                <div className="col-span-2 text-center -mb-2">
                  <Text fw={"bold"} size="25px" ml={2}>
                    {format(data.created_at, "dd", { locale: id })}
                  </Text>
                  <Text size="sm" mt={-4}>
                    {format(data.created_at, "MMM", { locale: id })}
                  </Text>
                </div>
                <div className="col-span-1">
                  <div className="w-px h-full bg-gray-300 mx-4" />
                </div>
                <div className="col-span-6 m-auto">
                  <Text fw={"bold"} size="xl">
                    Rp. {new Intl.NumberFormat("id-ID").format(data.amount)}
                  </Text>
                </div>
                <div className="col-span-3 my-auto relative">
                  <div className="absolute -top-6 -right-0">
                    {/* <Indicator
                      mt={20}
                      color={data.status == "accepted" ? "green" : "red"}
                    ></Indicator> */}
                  </div>
                  <div className="ml-2 flex gap-1">
                    <Button
                      size="compact-sm"
                      disabled={data.status !== "pending"}
                      color="red"
                      onClick={() => {
                        open(), setSelectedCashAdvance(data);
                      }}
                    >
                      <IconTrash size={20} />
                    </Button>
                    <Button
                      size="compact-sm"
                      color="blue"
                      onClick={() =>
                        navigate("/cash-advance-request/detail", { state: data })
                      }
                    >
                      <IconEye size={20} />
                    </Button>
                  </div>
                </div>
              </div>
              <Divider />
            </div>
          ))}
        {cashAdvances.length == 0 && (
          <div className="mt-2 px-3 py-2">
            <div className="flex justify-center">
              <Image
                src="/images/not-found.svg"
                style={{
                  width: "120px",
                }}
              />
            </div>
            <div className="flex justify-center">
              <Text fw={700} size="md">
                Ups!
              </Text>
            </div>
            <div className="flex justify-center -mt-1">
              <Text fw={700} size="sm">
                Kasbon kosong
              </Text>
            </div>
          </div>
        )}
        <Modal opened={opened} onClose={close} withCloseButton={false}>
          <div className="mt-2">
            <div className="text-center">
              <Text fw={"bold"}>Apakah anda yakin ingin menghapus data?</Text>
              <Text fw={"bold"} size="md" c={"red"}>
                "{" "}
                {selectedCashAdvance &&
                  format(selectedCashAdvance?.date, "dd MMM yyyy", {
                    locale: id,
                  })}{" "}
                | Rp.{" "}
                {selectedCashAdvance &&
                  new Intl.NumberFormat("id-ID").format(
                    selectedCashAdvance.amount
                  )}
                "
              </Text>
            </div>
            <div className="flex justify-between gap-3 mt-3 px-3">
              <Button size="sm" fullWidth onClick={close} color="grey">
                Kembali
              </Button>
              <Button
                size="sm"
                fullWidth
                onClick={() => {
                  close(), deleteCashAdvance(selectedCashAdvance?.id);
                }}
                color="red"
              >
                Ya! Hapus
              </Button>
            </div>
          </div>
        </Modal>
        <div className="px-2 mt-1 mb-2">
          <Button
            size="sm"
            fullWidth
            onClick={() => {
              navigate("/cash-advance-request/add");
            }}
          >
            Ajukan kasbon
          </Button>
        </div>
      </div>
    </section>
  );
};
