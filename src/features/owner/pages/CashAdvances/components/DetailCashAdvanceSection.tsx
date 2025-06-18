import { useUpdateCashAdvanceById } from "@/features/employee/pages/CashAdvance/api/updateCashAdvance";
import { CashAdvanceType } from "@/types";
import { Button, Divider, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconCashRegister } from "@tabler/icons-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import React from "react";
import { useNavigate } from "react-router-dom";

// const BaseURL = import.meta.env.VITE_API_URL;

interface DetailCashAdvanceSectionProps {
  cashAdvance: CashAdvanceType;
  totalCashAdvance: number;
}

type UpdateStatusRequest = {
  status: string;
};

export const DetailCashAdvanceSection: React.FC<
  DetailCashAdvanceSectionProps
> = ({ cashAdvance, totalCashAdvance }) => {
  const navigate = useNavigate();
  // UPDATE STATUS
  const mutationUpdateLeaveRequest = useUpdateCashAdvanceById(cashAdvance.id);
  const handleUpdateCashAdvance = async (status: string) => {
    const updateStatusData: UpdateStatusRequest = {
      status: status,
    };

    await mutationUpdateLeaveRequest.mutateAsync(updateStatusData, {
      onSuccess: (data: CashAdvanceType) => {
        console.log("Success:", data);
        navigate(-1);
        showNotification({
          message: "Berhasil mengubah status pengajuan kasbon",
          color: "green",
          position: "top-center",
        });
        close();
      },
    });
  };
  // END OF UPDATE LEAVE REQUEST
  return (
    <section className="bg-white mx-auto max-w-sm w-full shadow-sm rounded-xl z-50 relative p-4">
      <div className="flex justify-between text-xs items-center mb-2">
        <Text fw={700} c="#654433">
          Detail pengajuan kasbon
        </Text>
        <IconCashRegister className="opacity-80" size={24} />
      </div>
      <Divider size="xs" className="mb-2" />
      <div className="mt-2 mb-2">
        <div className="flex justify-center gap-2 px-2 my-auto">
          {/* <div className="bg-slate-300 rounded-full p-1 w-[50px] h-[46px] overflow-hidden border-4 border-slate-800">
            <img
              src={
                cashAdvance?.employee.profile_pic
                  ? `${BaseURL}/uploads/employees/${cashAdvance?.employee.profile_pic}`
                  : "/images/profile-default.png"
              }
              alt="Foto Profil"
              className="w-full h-full object-cover rounded-full"
            />
          </div> */}
          <div className="my-auto">
            <Text fw={700} size="18px" truncate="end">
              {cashAdvance.employee.name}
            </Text>
            <Text fw={300} size="xs" mt={-3}>
              {cashAdvance.employee.account.status}
            </Text>
          </div>
        </div>
      </div>
      <Divider />
      <div className="grid grid-cols-12 px-2 mt-2 mb-2">
        <div className="col-span-12">
          <Text fw={500} size="xs">
            Total kasbon bulan ini :
          </Text>
          <Text fw={700} size="sm" mt={-1}>
            Rp. {new Intl.NumberFormat("id-ID").format(totalCashAdvance)}
          </Text>
        </div>
        <div className="col-span-12 mt-2">
          <Divider />
        </div>
        <div className="col-span-12 mt-1">
          <Text fw={500} size="xs">
            Tanggal pengajuan :
          </Text>
          <Text fw={700} size="sm" mt={-1}>
            {cashAdvance.created_at &&
              format(cashAdvance.created_at, "EEEE, dd MMMM yyyy", {
                locale: id,
              })}
          </Text>
        </div>
        <div className="col-span-12 mt-1">
          <Text fw={500} size="xs">
            Kasbon yang diajukan :
          </Text>
          <Text fw={700} size="sm" mt={-1}>
            Rp.{new Intl.NumberFormat("id-ID").format(cashAdvance.amount)}
          </Text>
        </div>
        <div className="col-span-12 mt-1">
          <Text fw={500} size="xs">
            Alasan pengajuan kasbon :
          </Text>
          <Text fw={700} size="sm" mt={-1}>
            {cashAdvance.reason}
          </Text>
        </div>
      </div>
      <Divider />
      <div className="flex gap-2 px-1">
        <Button
          fullWidth
          color="red"
          onClick={() => handleUpdateCashAdvance("rejected")}
        >
          Tolak
        </Button>

        <Button
          fullWidth
          color="blue"
          onClick={() => handleUpdateCashAdvance("accepted")}
        >
          Setujui
        </Button>
      </div>
    </section>
  );
};
