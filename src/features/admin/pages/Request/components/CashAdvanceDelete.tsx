import { CashAdvanceType } from "@/types";
import { Button, CloseButton, Divider, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useDeleteCashAdvance } from "@/features/employee/pages/CashAdvance";

interface CashAdvanceDeleteProps {
  deleteCashAdvance: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCashAdvance?: CashAdvanceType;
  RefetchCashAdvance: () => void;
}

export const CashAdvanceDelete: React.FC<CashAdvanceDeleteProps> = ({
  deleteCashAdvance,
  selectedCashAdvance,
  RefetchCashAdvance,
}) => {
  const deleteRequestMutation = useDeleteCashAdvance();
  const deleteRequest = async (id: number | undefined) => {
    deleteRequestMutation.mutateAsync(id, {
      onSuccess: (data) => {
        console.log("Success Delete:", data);
        deleteCashAdvance(false);
        showNotification({
          message: "Berhasil menghapus pengajuan kasbon pegawai",
          color: "green",
          position: "bottom-right",
        });
        RefetchCashAdvance();
        close();
      },
    });
  };
  return (
    <section className="col-span-4 bg-white shadow-lg p-6 rounded-lg mt-2">
      <div>
        <div className="grid grid-cols-12">
          <div className="col-span-10 text-dark font-semibold cursor-pointer text-lg mb-2">
            Hapus pengajuan kasbon
          </div>
          <div className="col-span-1"></div>
          <div className="col-span-1">
            <CloseButton onClick={() => deleteCashAdvance(false)}></CloseButton>
          </div>
        </div>
        <Divider />
        <div className="mt-4 text-center">
          <Text size="md" fw={500}>
            Apakah anda yakin ingin menghapus pengajuan kasbon dari pegawai ?
          </Text>
          <Text size="md" c={"red"} fw={600}>
            "{selectedCashAdvance?.employee.name}"
          </Text>
        </div>
        <div className="flex justify-center mt-2">
          <Button
            onClick={() => deleteRequest(selectedCashAdvance?.id)}
            type="submit"
            color="red"
          >
            Ya!
          </Button>
        </div>
      </div>
    </section>
  );
};
