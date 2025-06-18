import {
  IconHome,
  IconUser,
  IconHandStop,
  IconChecklist,
  IconBellRinging,
} from "@tabler/icons-react";
import { Suspense, useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

import { LoadingScreen } from "../elements";
import { NavItem } from "../navigation/BottomNav/NavItem";
import { useAuth } from "@/features/auth";
import { NotificationType } from "@/types";
import { usegetNotification } from "@/features/employee/api";

export const HomeLayout: React.FC = () => {
  const location = useLocation();
  const { creds } = useAuth();
  const path = location.pathname;
  const [currentPath, setCurrentPath] = useState(path || "/");
  useEffect(() => {
    setCurrentPath(path);
  }, [path]);

  // GET NOTIFICATION
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const { data: DataNotifications } = usegetNotification(creds?.employee_id);
  useEffect(() => {
    if (DataNotifications) {
      setNotifications(DataNotifications);
    }
  }, [DataNotifications]);
  const unreadCount = notifications.filter((n) => !n.was_read).length;
  // END FOR GET NOTIFICATION
  const navigationsleft = [
    { title: "Home", href: "/", icon: IconHome },
    {
      title: "Notifikasi",
      href: "/notification",
      icon: IconBellRinging,
      hasUnread: unreadCount > 0,
    },
  ];
  const navigationsright = [
    { title: "Riwayat", href: "/history", icon: IconChecklist },
    { title: "Profil", href: "/profile", icon: IconUser },
  ];

  return (
    <div className="max-w-md min-h-screen pb-14 mx-auto bg-gradient-to-t from-[#f2f8fd] via-[#f6f9fc] to-[#f6f9fc] relative overflow-y-auto overflow-x-hidden">
      <Suspense fallback={<LoadingScreen />}>
        <Outlet />
      </Suspense>

      <footer className="fixed max-w-md w-full z-50 bottom-0 shadow-md bg-white border-t border-gray-100 flex items-center justify-around py-2.5 ">
        {navigationsleft.map((navigation) => (
          <NavItem
            key={navigation.title}
            {...navigation}
            currentPath={currentPath}
          />
        ))}
        <div className="w-full flex justify-center">
          <div className="absolute bottom-1">
            <Link
              to={creds?.level == "Pegawai" ? "/check-log": "/employee-attendances"}
              className="bg-brown flex flex-col items-center justify-center text-white w-16 max-w-16  rounded-full min-h-16 h-16 shadow-lg"
            >
              <IconHandStop className="mb-1" color="white" size={37} />
            </Link>
            <div className="text-sm font-medium mb-1 mt-1 text-slate-500 w-full text-center">
              {creds?.level == "Owner" ? "Kehadiran" : "Check-in"}
            </div>
          </div>
        </div>
        {navigationsright.map((navigation) => (
          <NavItem
            key={navigation.title}
            {...navigation}
            currentPath={currentPath}
          />
        ))}
      </footer>
    </div>
  );
};
