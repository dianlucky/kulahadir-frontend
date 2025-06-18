import { useUpdateCashAdvanceById } from "@/features/employee/pages/CashAdvance/api/updateCashAdvance";
import { CashAdvanceType, LeaveRequestType } from "@/types";
import { Badge, Button, Divider, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import React from "react";

interface CashAdvanceDetailProps {
  selectedCashAdvance?: CashAdvanceType;
  RefetchCashAdvance: () => void;
}

type UpdateStatusRequest = {
  status: string;
};

export const CashAdvanceDetail: React.FC<CashAdvanceDetailProps> = ({
  selectedCashAdvance,
  RefetchCashAdvance,
}) => {
  // UPDATE STATUS
  const mutationUpdateLeaveRequest = useUpdateCashAdvanceById(
    selectedCashAdvance?.id
  );
  const handleUpdateCashAdvance = async (status: string) => {
    const updateStatusData: UpdateStatusRequest = {
      status: status,
    };

    await mutationUpdateLeaveRequest.mutateAsync(updateStatusData, {
      onSuccess: (data: LeaveRequestType) => {
        console.log("Success:", data);
        showNotification({
          message: "Berhasil mengubah status pengajuan",
          color: "green",
          position: "bottom-right",
        });
        RefetchCashAdvance();
        close();
      },
    });
  };
  // END OF UPDATE LEAVE REQUEST
  return (
    <div>
      <div className="flex justify-between mb-2">
        <div className="text-dark font-semibold cursor-pointer text-md">
          Pengajuan kasbon
        </div>
        <div className="-mt-1">
          <Badge
            radius={"xs"}
            color={
              selectedCashAdvance?.status == "pending"
                ? "grey"
                : selectedCashAdvance?.status == "accepted"
                ? "green"
                : "red"
            }
          >
            {selectedCashAdvance?.status}
          </Badge>
        </div>
      </div>
      <Divider />
      <div className="mt-2">
        <div className="grid grid-cols-12 mt-2 ml-4">
          <div className="col-span-12">
            <div className="mt-2">
              <Text fw={"bold"} size="sm">
                Hari & Tanggal:
              </Text>
              <Text size="sm" mt={-5}>
                {selectedCashAdvance?.date
                  ? format(
                      new Date(selectedCashAdvance?.date),
                      "EEEE, dd MMMM yyyy",
                      { locale: id }
                    )
                  : ""}
              </Text>
            </div>
          </div>
          <div className="col-span-12">
            <div className="mt-2">
              <Text fw={"bold"} size="sm">
                Jumlah kasbon:
              </Text>
              <Text size="sm" mt={-5}>
                Rp.{" "}
                {selectedCashAdvance?.amount &&
                  new Intl.NumberFormat("id-ID").format(
                    selectedCashAdvance.amount
                  )}
              </Text>
            </div>
          </div>
          <div className="col-span-12">
            <div className="mt-2">
              <Text fw={"bold"} size="sm">
                Alasan:
              </Text>
              <Text size="sm" mt={-5}>
                {selectedCashAdvance?.reason}
              </Text>
            </div>
          </div>
          <div className="col-span-12 mt-3">
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-6">
                <Button
                  color="red"
                  fullWidth
                  onClick={() => handleUpdateCashAdvance("rejected")}
                >
                  Tolak
                </Button>
              </div>
              <div className="col-span-6">
                <Button
                  color="blue"
                  fullWidth
                  onClick={() => handleUpdateCashAdvance("accepted")}
                >
                  Terima
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
