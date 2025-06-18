import { LeaveRequestType } from "@/types";
import { Button, CloseButton, Divider, Text } from "@mantine/core";
import { useDeleteRequest } from "../api";
import { showNotification } from "@mantine/notifications";

interface DeleteRequestAdminProps {
  setDelete: React.Dispatch<React.SetStateAction<boolean>>;
  selectedRequest?: LeaveRequestType;
  RefetchRequest: () => void;
}

export const DeleteRequestAdmin: React.FC<DeleteRequestAdminProps> = ({
  setDelete,
  selectedRequest,
  RefetchRequest,
}) => {
  const deleteRequestMutation = useDeleteRequest();
  const deleteRequest = async (id: number | undefined) => {
    deleteRequestMutation.mutateAsync(id, {
      onSuccess: (data) => {
        console.log("Success Delete:", data);
        setDelete(false);
        showNotification({
          message: "Berhasil menghapus pengajuan pegawai",
          color: "green",
          position: "bottom-right",
        });
        RefetchRequest();
        close();
      },
    });
  };
  return (
    <section className="col-span-4 bg-white shadow-lg p-6 rounded-lg mt-2">
      <div>
        <div className="grid grid-cols-12">
          <div className="col-span-10 text-dark font-semibold cursor-pointer text-lg mb-2">
            Hapus data pegawai
          </div>
          <div className="col-span-1"></div>
          <div className="col-span-1">
            <CloseButton onClick={() => setDelete(false)}></CloseButton>
          </div>
        </div>
        <Divider />
        <div className="mt-4 text-center">
          <Text size="md" fw={500}>
            Apakah anda yakin ingin menghapus data pengajuan dari pegawai ?
          </Text>
          <Text size="md" c={"red"} fw={600}>
            "{selectedRequest?.employee.name}"
          </Text>
        </div>
        <div className="flex justify-center mt-2">
          <Button
            onClick={() => deleteRequest(selectedRequest?.id)}
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
