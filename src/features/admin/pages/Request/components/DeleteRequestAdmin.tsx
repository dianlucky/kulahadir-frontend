import { RequestType } from "@/types";
import { Button, CloseButton, Divider, Text } from "@mantine/core";
import { useDeleteRequest } from "../api";

interface DeleteRequestAdminProps {
  setDelete: React.Dispatch<React.SetStateAction<boolean>>;
  setSuccessDelete: React.Dispatch<React.SetStateAction<boolean>>;
  request: RequestType | undefined;
}

export const DeleteRequestAdmin: React.FC<DeleteRequestAdminProps> = ({
  setDelete,
  setSuccessDelete,
  request,
}) => {
  const deleteRequestMutation = useDeleteRequest();
  const deleteRequest = async (id: number | undefined) => {
    deleteRequestMutation.mutateAsync(id, {
      onSuccess: (data) => {
        console.log("Success Delete:", data);
        setSuccessDelete(true);
        setDelete(false);
        close();
        setTimeout(() => {
          setSuccessDelete(false);
        }, 4500);
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
            "Dian Lucky Prayogi"
          </Text>
        </div>
        <div className="flex justify-center mt-2">
          <Button
            onClick={() => deleteRequest(request?.id)}
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
