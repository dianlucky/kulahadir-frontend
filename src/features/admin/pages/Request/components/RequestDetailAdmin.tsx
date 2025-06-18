import { useUpdateLeaveRequestById } from "@/features/employee/pages/LeaveRequest";
import { LeaveRequestType } from "@/types";
import { Badge, Button, Divider, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import React from "react";

interface RequestDetailAdminProps {
  selectedRequest?: LeaveRequestType;
  RefetchRequest: () => void;
}

type UpdateStatusRequest = {
  status: string;
};

export const RequestDetailAdmin: React.FC<RequestDetailAdminProps> = ({
  selectedRequest,
  RefetchRequest,
}) => {
  // UPDATE STATUS
  const mutationUpdateLeaveRequest = useUpdateLeaveRequestById(
    selectedRequest?.id
  );
  const handleUpdateLeaveRequest = async (status: string) => {
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
        RefetchRequest();
        close();
      },
    });
  };
  // END OF UPDATE LEAVE REQUEST
  return (
    <div>
      <div className="flex justify-between mb-2">
        <div className="text-dark font-semibold cursor-pointer text-md">
          Pengajuan {selectedRequest?.type}
        </div>
        <div className="-mt-1">
          <Badge
            radius={"xs"}
            color={
              selectedRequest?.status == "pending"
                ? "grey"
                : selectedRequest?.status == "accepted"
                ? "green"
                : "red"
            }
          >
            {selectedRequest?.status}
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
                {selectedRequest?.date
                  ? format(
                      new Date(selectedRequest?.date),
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
                Alasan:
              </Text>
              <Text size="sm" mt={-5}>
                {selectedRequest?.reason}
              </Text>
            </div>
          </div>
          <div className="col-span-12 mt-3">
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-6">
                <Button
                  color="red"
                  fullWidth
                  onClick={() => handleUpdateLeaveRequest("rejected")}
                >
                  Tolak
                </Button>
              </div>
              <div className="col-span-6">
                <Button
                  color="blue"
                  fullWidth
                  onClick={() => handleUpdateLeaveRequest("accepted")}
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
