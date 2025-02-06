// import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { HomeLayout, AppLayout } from "@/components/layout";
// import { useAuth } from "@/features/auth";
// import { queryClient } from '@/lib/react-query';
import { lazyImport } from "@/utils/lazyImport";

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

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="schedule" element={<SchedulePage />} />
          <Route path="paid-leave-request">
            <Route index element={<PaidLeaveRequestPage />} />
            <Route path="detail" element={<DetailPaidLeaveRequest/>} />
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
        </Route>
      </Route>
    </Routes>
  );
};
