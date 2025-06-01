import { IconChevronLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { NotificationList } from "../components";
import { useAuth } from "@/features/auth";
import { useEffect, useState } from "react";
import { NotificationType } from "@/types";
import { usegetNotification } from "@/features/employee/api";

export const NotificationPage: React.FC = () => {
  const navigate = useNavigate();
  const { creds } = useAuth();

  // GET NOTIFICATION
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const { data: DataNotifications } = usegetNotification(creds?.employee_id);
  useEffect(() => {
    if (DataNotifications) {
      setNotifications(DataNotifications);
    }
  }, [DataNotifications]);
  // END FOR GET NOTIFICATION

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
            <h2 className="font-semibold">Notifikasi</h2>
          </div>
        </div>
      </section>
      <section className="mt-2 px-6 mb-20">
        <NotificationList notifications={notifications} />
      </section>
    </main>
  );
};
