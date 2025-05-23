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

const { AccountPage } = lazyImport(
  () => import("@/features/admin/pages/DataMaster/Account"),
  "AccountPage"
);

const { EmployeePage } = lazyImport(
  () => import("@/features/admin/pages/DataMaster/Employee"),
  "EmployeePage"
);

const { SchedulePageAdmin } = lazyImport(
  () => import("@/features/admin/pages/Schedule"),
  "SchedulePageAdmin"
);
const { RequestPageAdmin } = lazyImport(
  () => import("@/features/admin/pages/Request"),
  "RequestPageAdmin"
);
const { SalaryPageAdmin } = lazyImport(
  () => import("@/features/admin/pages/Salary"),
  "SalaryPageAdmin"
);
const { ReportPageAdmin } = lazyImport(
  () => import("@/features/admin/pages/Report"),
  "ReportPageAdmin"
);

const { DataMasterPage } = lazyImport(
  () => import("@/features/admin/pages/DataMaster"),
  "DataMasterPage"
);

// EMPLOYEE && OWNER

const { Home } = lazyImport(() => import("@/features/employee"), "Home");
const { SchedulePage } = lazyImport(
  () => import("@/features/employee/pages/schedule/pages"),
  "SchedulePage"
);

const { LeaveRequestPage } = lazyImport(
  () => import("@/features/employee/pages/LeaveRequest"),
  "LeaveRequestPage"
);
const { DetailLeaveRequestPage } = lazyImport(
  () => import("@/features/employee/pages/LeaveRequest"),
  "DetailLeaveRequestPage"
);
const { CreateLeaveRequestPage } = lazyImport(
  () => import("@/features/employee/pages/LeaveRequest"),
  "CreateLeaveRequestPage"
);
const { CashAdvancePage } = lazyImport(
  () => import("@/features/employee/pages/CashAdvance"),
  "CashAdvancePage"
);

const { CreateCashAdvanceRequestPage } = lazyImport(
  () => import("@/features/employee/pages/CashAdvance"),
  "CreateCashAdvanceRequestPage"
);

const { SalaryPage } = lazyImport(
  () => import("@/features/employee/pages/Salary"),
  "SalaryPage"
);

const { ProfilePage } = lazyImport(
  () => import("@/features/employee/pages/Profile"),
  "ProfilePage"
);

const { BiodataPage } = lazyImport(
  () => import("@/features/employee/pages/Profile"),
  "BiodataPage"
);

const { BiodataEditPage } = lazyImport(
  () => import("@/features/employee/pages/Profile"),
  "BiodataEditPage"
);

const { HistoryPage } = lazyImport(
  () => import("@/features/employee/pages/History"),
  "HistoryPage"
);
const { HistoryAttendancePage } = lazyImport(
  () => import("@/features/employee/pages/History/pages/attendance"),
  "HistoryAttendancePage"
);
const { HistoryRequestPage } = lazyImport(
  () => import("@/features/employee/pages/History/pages/Request"),
  "HistoryRequestPage"
);
const { HistoryCashAdvancePage } = lazyImport(
  () => import("@/features/employee/pages/History/pages/CashAdvance"),
  "HistoryCashAdvancePage"
);
const { NotificationPage } = lazyImport(
  () => import("@/features/employee/pages/Notification"),
  "NotificationPage"
);
const { DetailNotificationPage } = lazyImport(
  () => import("@/features/employee/pages/Notification"),
  "DetailNotificationPage"
);
const { CheckLogPage } = lazyImport(
  () => import("@/features/employee/pages/CheckLog"),
  "CheckLogPage"
);

const { EmployeeOwnerPage } = lazyImport(
  () => import("@/features/owner/pages/Employees"),
  "EmployeeOwnerPage"
);
const { DetailEmployeeOwnerPage } = lazyImport(
  () => import("@/features/owner/pages/Employees"),
  "DetailEmployeeOwnerPage"
);
const { ScheduleOwnerPage } = lazyImport(
  () => import("@/features/owner/pages/Schedules"),
  "ScheduleOwnerPage"
);
const { PaidLeavesOwnerPage } = lazyImport(
  () => import("@/features/owner/pages/PaidLeaves"),
  "PaidLeavesOwnerPage"
);
const { AttendancesOwnerPages } = lazyImport(
  () => import("@/features/owner/pages/Attendances"),
  "AttendancesOwnerPages"
);
const { DetailAttendancesOwnerPage } = lazyImport(
  () => import("@/features/owner/pages/Attendances"),
  "DetailAttendancesOwnerPage"
);
const { RequestOwnerPage } = lazyImport(
  () => import("@/features/owner/pages/Requests"),
  "RequestOwnerPage"
);
const { CashAdvanceOwnerPage } = lazyImport(
  () => import("@/features/owner/pages/CashAdvances"),
  "CashAdvanceOwnerPage"
);
const { DetailCashAdvanceOwnerPage } = lazyImport(
  () => import("@/features/owner/pages/CashAdvances"),
  "DetailCashAdvanceOwnerPage"
);
const { SalaryOwnerPage } = lazyImport(
  () => import("@/features/owner/pages/Salaries"),
  "SalaryOwnerPage"
);
const { DetailSalaryOwnerPage } = lazyImport(
  () => import("@/features/owner/pages/Salaries"),
  "DetailSalaryOwnerPage"
);

export const AppRoutes: React.FC = () => {
  const role: string = "owner";
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        {role === "employee" || role === "owner" ? (
          <Route element={<HomeLayout />}>
            <Route index element={<Home />} />
            <Route path="schedule" element={<SchedulePage />} />
            <Route path="leave-request">
              <Route index element={<LeaveRequestPage />} />
              <Route path="add" element={<CreateLeaveRequestPage />} />
              <Route path="detail" element={<DetailLeaveRequestPage />} />
            </Route>
            <Route path="cash-advance-request">
              <Route index element={<CashAdvancePage />} />
              <Route path="add" element={<CreateCashAdvanceRequestPage />} />
            </Route>
            <Route path="salary" element={<SalaryPage />} />
            <Route path="profile">
              <Route index element={<ProfilePage />} />
              <Route path="biodata" element={<BiodataPage />} />
              <Route path="edit" element={<BiodataEditPage />} />
            </Route>
            <Route path="history">
              <Route index element={<HistoryPage />} />
              <Route path="attendance" element={<HistoryAttendancePage />} />
              <Route path="request" element={<HistoryRequestPage />} />
              <Route path="cash-advance" element={<HistoryCashAdvancePage />} />
            </Route>
            <Route path="notification">
              <Route index element={<NotificationPage />} />
              <Route path="detail" element={<DetailNotificationPage />} />
            </Route>
            <Route path="check-log">
              <Route index element={<CheckLogPage />} />
            </Route>

            {/* ROUTE OWNER */}
            <Route path="employee-data">
              <Route index element={<EmployeeOwnerPage />} />
              <Route path="detail" element={<DetailEmployeeOwnerPage />} />
            </Route>
            <Route path="employee-schedule">
              <Route index element={<ScheduleOwnerPage />} />
            </Route>
            <Route path="employee-paid-leave">
              <Route index element={<PaidLeavesOwnerPage />} />
            </Route>
            <Route path="employee-attendances">
              <Route index element={<AttendancesOwnerPages />} />
              <Route path="detail" element={<DetailAttendancesOwnerPage />} />
            </Route>
            <Route path="employee-request">
              <Route index element={<RequestOwnerPage />} />
            </Route>
            <Route path="employee-cash-advance">
              <Route index element={<CashAdvanceOwnerPage />} />
              <Route path="detail" element={<DetailCashAdvanceOwnerPage />} />
            </Route>
            <Route path="employee-salary">
              <Route index element={<SalaryOwnerPage />} />
              <Route path="detail" element={<DetailSalaryOwnerPage />} />
            </Route>
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
            <Route path="/account" element={<AccountPage />} />
            <Route path="/employee" element={<EmployeePage />} />
            <Route path="/schedule">
              <Route index element={<SchedulePageAdmin />} />
            </Route>
            <Route path="/request">
              <Route index element={<RequestPageAdmin />} />
            </Route>
            <Route path="/salary">
              <Route index element={<SalaryPageAdmin />} />
            </Route>
            <Route path="/report">
              <Route index element={<ReportPageAdmin />} />
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
