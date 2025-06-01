import { NotificationType } from "@/types";
import { Divider, Image, Text, UnstyledButton } from "@mantine/core";
import { IconBell, IconChevronRight } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

interface NotificationListProps {
  notifications: NotificationType[];
}

export const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
}) => {
  const navigate = useNavigate();
  return (
    <>
      {notifications.filter((data) => data.was_read == false).length != 0 && (
        <div className="mb-2">
          <Divider my="xs" label="Belum dibaca" labelPosition="left" />
          {notifications
            .filter((data) => data.was_read == false)
            .sort(
              (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
            )
            .map((data, index) => (
              <div
                className="bg-white shadow-md rounded-2xl"
                style={{ marginTop: "4px" }}
                key={index}
              >
                <div className="grid grid-cols-12 py-5 px-4">
                  <div className="col-span-1">
                    <IconBell size={27} />
                  </div>
                  <div className="col-span-1">
                    <div className="w-px h-full bg-gray-300 mx-4" />
                  </div>
                  <div className="col-span-9 mx-auto">
                    <Text fw={"bold"} size="14px" lineClamp={2} c={"#222831"}>
                      {data.message}
                    </Text>
                  </div>
                  <div className="col-span-1">
                    <UnstyledButton
                      onClick={() => {
                        navigate("/notification/detail", { state: { data } });
                      }}
                    >
                      <IconChevronRight color="#654433" />
                    </UnstyledButton>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
      {notifications.filter((data) => data.was_read == true).length != 0 && (
        <div className="mb-2">
          <Divider my="xs" label="Sudah dibaca" labelPosition="left" />
          {notifications
            .filter((data) => data.was_read == true)
            .map((data, index) => (
              <div
                className="bg-slate-100 shadow-sm rounded-2xl"
                style={{ marginTop: "4px" }}
                key={index}
              >
                <div className="grid grid-cols-12 py-5 px-4">
                  <div className="col-span-1">
                    <IconBell size={27} color="#A6AEBF" />
                  </div>
                  <div className="col-span-1">
                    <div className="w-px h-full bg-gray-300 mx-4" />
                  </div>
                  <div className="col-span-9 mx-auto">
                    <Text fw={"bold"} size="14px" lineClamp={2} c={"#A6AEBF"}>
                      {data.message}
                    </Text>
                  </div>
                  <div className="col-span-1">
                    <UnstyledButton
                      onClick={() => {
                        navigate("/notification/detail", { state: { data } });
                      }}
                    >
                      <IconChevronRight color="#A6AEBF" />
                    </UnstyledButton>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
      {notifications.length == 0 && (
        <div className="p-4 mt-28">
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
              <Text fw={700} size="xl" c={"gray"}>
                Ups!
              </Text>
            </div>
            <div className="flex justify-center -mt-1">
              <Text fw={700} size="sm" c={"gray"}>
                Notifikasi anda kosong
              </Text>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
