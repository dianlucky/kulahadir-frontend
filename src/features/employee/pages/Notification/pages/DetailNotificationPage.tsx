import {
  useDeleteNotification,
  useUpdateReadNotification,
} from "@/features/employee/api";
import { NotificationType } from "@/types";
import { Button, Divider, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { IconChevronLeft } from "@tabler/icons-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useLocation, useNavigate } from "react-router-dom";

type UpdateWasReaded = {
  was_read: boolean;
};

export const DetailNotificationPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const notification = location.state.data as NotificationType;

  // HANDLE WAS READED
  const mutationWasReaded = useUpdateReadNotification(notification.id);
  const dataUpdate: UpdateWasReaded = {
    was_read: true,
  };
  const handleWasRead = async () => {
    await mutationWasReaded.mutateAsync(dataUpdate, {
      onSuccess: (data: NotificationType) => {
        console.log("Success:", data);
        navigate(-1);
        close();
      },
    });
  };
  // END FOR HANDLE WAS READED

  // HANDLE DELETE NOTIFICATION
  const deleteNotificationMutation = useDeleteNotification();
  const handleDeleteNotification = async (id: number | undefined) => {
    deleteNotificationMutation.mutateAsync(id, {
      onSuccess: (data) => {
        console.log("Success Delete:", data);
        showNotification({
          message: "Berhasil menghapus notifikasi",
          color: "green",
          position: "top-center",
        });
        navigate(-1);
        close();
      },
    });
  };
  // END FOR HANDLE DELETE NOTIFICATION
  return (
    <main>
      <section className="w-full h-20 bg-brown rounded-b-3xl"></section>
      <section className="bg-white mx-5 p-3 shadow-md rounded-lg flex flex-col gap-2 -mt-10 mb-2">
        <div className="grid grid-cols-12 mb-1">
          <div className="col-span-1">
            <IconChevronLeft
              onClick={() => {
                navigate(-1);
              }}
              size={21}
              className="font-bold rounded-md"
            />
          </div>
          <div className="col-span-11 text-center -ml-4 font-semibold text-brown">
            <h2 className="font-semibold">Detail Notifikasi</h2>
          </div>
        </div>
      </section>
      <section className="bg-white mx-5 p-3 shadow-md rounded-lg flex flex-col gap-2 mt-2 mb-2">
        <div className="flex justify-between px-4">
          <Text size="md" fw={"bold"}>
            {notification.type}
          </Text>
          <Text size="sm" my={"auto"}>
            {/* 18 Mei 2025, 17.45 */}
            {format(notification.created_at, "dd MMM yyyy, HH:mm", {
              locale: id,
            })}
          </Text>
        </div>
        <Divider />
        <div className="px-4 mb-5">
          <Text size="md">{notification.message}</Text>
        </div>
        <div className="flex justify-between gap-2">
          <Button
            size="sm"
            color="grey"
            fullWidth
            onClick={() => handleDeleteNotification(notification.id)}
          >
            Hapus
          </Button>
          <Button
            size="sm"
            color="blue"
            fullWidth
            disabled={notification.was_read}
            onClick={() => handleWasRead()}
          >
            Tandai dibaca
          </Button>
        </div>
      </section>
    </main>
  );
};
