import { useAuth } from "@/features/auth";
import { LeaveRequestType } from "@/types";
import { Button, Divider, Image, Text } from "@mantine/core";
import { IconClipboardText } from "@tabler/icons-react";
import { useUpdateLeaveRequestById } from "../api";
import { useNavigate } from "react-router-dom";

const BaseURL = import.meta.env.VITE_API_URL;
const DEFAULT_IMAGE =
  "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-9.png";

interface AttachmentDescriptionCardProps {
  leaveRequestData: LeaveRequestType;
}

type UpdateStatusRequest = {
  status: string;
};

export const AttachmentDescriptionCard: React.FC<
  AttachmentDescriptionCardProps
> = ({ leaveRequestData }) => {
  const { creds } = useAuth();
  const navigate = useNavigate();
  
  // UPDATE STATUS
  const mutationUpdateLeaveRequest = useUpdateLeaveRequestById(
    leaveRequestData.id
  );
  const handleUpdateLeaveRequest = async (status: string) => {
    const updateStatusData: UpdateStatusRequest = {
      status: status,
    };

    await mutationUpdateLeaveRequest.mutateAsync(updateStatusData, {
      onSuccess: (data: LeaveRequestType) => {
        console.log("Success:", data);
        navigate(-1);
        close();
      },
    });
  };
  // END OF UPDATE LEAVE REQUEST
  return (
    <section className="bg-white mx-auto max-w-xs w-full mt-1 shadow-lg rounded-xl z-50 relative p-2 px-2 text-slate-700">
      <div className="flex justify-between text-xs items-center mt-1 -mb-1 px-2">
        <span style={{ fontSize: "14px" }} className="font-bold text-brown">
          Lampiran dan keterangan
        </span>
        <IconClipboardText className="opacity-100" size={20} />
      </div>
      <Divider my="sm" />
      <div className="w-full grid grid-cols-1 pb-2 pt-2 -mt-2">
        <div className="gap-2 mt-0 ms-3">
          {creds?.level == "Owner" && (
            <>
              {" "}
              <div className="flex mb-1">
                <Text size="sm" fw={700}>
                  Pegawai :
                </Text>
                <Text size="sm" fw={700} ml={2} truncate="end">
                  {leaveRequestData.employee.name}
                </Text>
              </div>
            </>
          )}

          <Text size="sm" fw={700}>
            Lampiran :
          </Text>
          <Image
            radius="md"
            h={200}
            style={{
              justifyContent: "center",
              padding: "10",
              marginTop: "-20px",
              width: "90% ",
            }}
            fit="contain"
            src={
              leaveRequestData.attachment
                ? `${BaseURL}/uploads/attachments/${leaveRequestData.attachment}`
                : DEFAULT_IMAGE
            }
          />
        </div>
        <div className="gap-2 -mt-2 mb-5 ms-3">
          <Text size="sm" fw={700}>
            Keterangan : {leaveRequestData.reason}
          </Text>
          <Text size="sm"></Text>
        </div>
        {creds?.level == "Owner" && (
          <div>
            <div className="my-1 px-2 mb-2">
              <Divider />
            </div>
            <div className="flex gap-2 px-1">
              <Button
                fullWidth
                color="red"
                onClick={() => handleUpdateLeaveRequest("rejected")}
              >
                Tolak
              </Button>

              <Button
                fullWidth
                color="blue"
                onClick={() => handleUpdateLeaveRequest("accepted")}
              >
                Setujui
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
