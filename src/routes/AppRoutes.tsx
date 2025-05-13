// import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { HomeLayout, AppLayout, AdminLayout } from "@/components/layout";
// import { useAuth } from "@/features/auth";
// import { queryClient } from '@/lib/react-query';
import { lazyImport } from "@/utils/lazyImport";

const { Development } = lazyImport(
  () => import("@/features/employee"),
  "Development"
);
const { NotFoundLayout } = lazyImport(
  () => import("@/components/layout"),
  "NotFoundLayout"
);
const { Login } = lazyImport(() => import("@/features/auth"), "Login");

const { DashboardAdmin } = lazyImport(
  () => import("@/features/admin/pages"),
  "DashboardAdmin"
);
const { DailyTaskPage } = lazyImport(
  () => import("@/features/admin/pages/DataMaster/DailyTask"),
  "DailyTaskPage"
);

const { Home } = lazyImport(() => import("@/features/employee"), "Home");
const { SchedulePage } = lazyImport(
  () => import("@/features/employee/pages/schedule/pages"),
  "SchedulePage"
);
const { PaidLeaveRequestPage } = lazyImport(
  () => import("@/features/employee/pages/PaidLeaveRequest"),
  "PaidLeaveRequestPage"
);
const { DetailPaidLeaveRequest } = lazyImport(
  () => import("@/features/employee/pages/PaidLeaveRequest"),
  "DetailPaidLeaveRequest"
);
const { SickRequestPage } = lazyImport(
  () => import("@/features/employee/pages/SickRequest"),
  "SickRequestPage"
);
const { LeaveRequestPage } = lazyImport(
  () => import("@/features/employee/pages/LeaveRequest"),
  "LeaveRequestPage"
);
const { CashAdvancePage } = lazyImport(
  () => import("@/features/employee/pages/CashAdvance"),
  "CashAdvancePage"
);
const { SalaryPage } = lazyImport(
  () => import("@/features/employee/pages/Salary"),
  "SalaryPage"
);

const { ProfilePage } = lazyImport(
  () => import("@/features/employee/pages/Profile"),
  "ProfilePage"
);
const { HistoryPage } = lazyImport(
  () => import("@/features/employee/pages/History"),
  "HistoryPage"
);
const { NotificationPage } = lazyImport(
  () => import("@/features/employee/pages/Notification"),
  "NotificationPage"
);
const { CheckLogPage } = lazyImport(
  () => import("@/features/employee/pages/CheckLog"),
  "CheckLogPage"
);

const { DataMasterPage } = lazyImport(
  () => import("@/features/admin/pages/DataMaster"),
  "DataMasterPage"
);

export const AppRoutes: React.FC = () => {
  const role: string = "admin";
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        {role === "employee" || role === "owner" ? (
          <Route element={<HomeLayout />}>
            <Route index element={<Home />} />
            <Route path="schedule" element={<SchedulePage />} />
            <Route path="paid-leave-request">
              <Route index element={<PaidLeaveRequestPage />} />
              <Route path="detail" element={<DetailPaidLeaveRequest />} />
            </Route>
            <Route path="sick-request" element={<SickRequestPage />} />
            <Route path="leave-request" element={<LeaveRequestPage />} />
            <Route path="cash-advance-request" element={<CashAdvancePage />} />
            <Route path="salary" element={<SalaryPage />} />
            <Route path="profile">
              <Route index element={<ProfilePage />} />
            </Route>
            <Route path="history">
              <Route index element={<HistoryPage />} />
            </Route>
            <Route path="notification">
              <Route index element={<NotificationPage />} />
            </Route>
            <Route path="check-log">
              <Route index element={<CheckLogPage />} />
            </Route>
            <Route path="*" element={<NotFoundLayout />} />
          </Route>
        ) : (
          <Route path="development" element={<Development />} />
        )}

        {role === "admin" ? (
          <Route element={<AdminLayout />}>
            <Route index path="/" element={<DashboardAdmin />} />
            <Route path="/data-master">
              <Route index element={<DataMasterPage />} />
            </Route>
            <Route path="/daily-task">
              <Route index element={<DailyTaskPage />} />
            </Route>
          </Route>
        ) : (
          <Route path="development" element={<Development />} />
        )}

        {/* Route For Development */}
        <Route path="development" element={<Development />} />
      </Route>
    </Routes>
  );
};
