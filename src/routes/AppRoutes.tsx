// import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import {
  HomeLayout,
  AppLayout,
  AdminLayout,
  AuthLayout,
} from "@/components/layout";
// import { useAuth } from "@/features/auth";
// import { queryClient } from '@/lib/react-query';
import { lazyImport } from "@/utils/lazyImport";
import { useAuth } from "@/features/auth";

const { Development } = lazyImport(
  () => import("@/features/employee"),
  "Development"
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
const { DetailCashAdvancePage } = lazyImport(
  () => import("@/features/employee/pages/CashAdvance"),
  "DetailCashAdvancePage"
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
const { DailyTaskPageOwner } = lazyImport(
  () => import("@/features/owner/pages/DailyTask"),
  "DailyTaskPageOwner"
);
const { DailyTaskDataPage } = lazyImport(
  () => import("@/features/owner/pages/DailyTask"),
  "DailyTaskDataPage"
);

const { TaskEmployeePage } = lazyImport(
  () => import("@/features/owner/pages/DailyTask"),
  "TaskEmployeePage"
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
const { CreateEmployeeOwnerPage } = lazyImport(
  () => import("@/features/owner/pages/Employees"),
  "CreateEmployeeOwnerPage"
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

const { HistoryPageOwner } = lazyImport(
  () => import("@/features/owner/pages/History"),
  "HistoryPageOwner"
);
const { HistoryRequestPageOwner } = lazyImport(
  () => import("@/features/owner/pages/History/"),
  "HistoryRequestPageOwner"
);
const { HistoryCashAdvancePageOwner } = lazyImport(
  () => import("@/features/owner/pages/History/"),
  "HistoryCashAdvancePageOwner"
);
const { WarehouseInventoryPage } = lazyImport(
  () => import("@/features/owner/pages/Warehouse/"),
  "WarehouseInventoryPage"
);
const { CategoryPage } = lazyImport(
  () => import("@/features/owner/pages/Warehouse/pages/Category"),
  "CategoryPage"
);
const { ItemPage } = lazyImport(
  () => import("@/features/owner/pages/Warehouse/pages/Item"),
  "ItemPage"
);
const { DetailItemPage } = lazyImport(
  () => import("@/features/owner/pages/Warehouse/pages/Item"),
  "DetailItemPage"
);
const { UpdateItemPage } = lazyImport(
  () => import("@/features/owner/pages/Warehouse/pages/Item"),
  "UpdateItemPage"
);
const { HistoryItemPage } = lazyImport(
  () => import("@/features/owner/pages/Warehouse/pages/Item"),
  "HistoryItemPage"
);
const { IncomingStockPage } = lazyImport(
  () => import("@/features/owner/pages/Warehouse/pages/IncomingStock"),
  "IncomingStockPage"
);
const { AddIncomingStock } = lazyImport(
  () => import("@/features/owner/pages/Warehouse/pages/IncomingStock"),
  "AddIncomingStock"
);
const { DetailIncomingStock } = lazyImport(
  () => import("@/features/owner/pages/Warehouse/pages/IncomingStock"),
  "DetailIncomingStock"
);
const { OutgoingStockPage } = lazyImport(
  () => import("@/features/owner/pages/Warehouse/pages/OutgoingStock"),
  "OutgoingStockPage"
);
const { AddOutgoingStock } = lazyImport(
  () => import("@/features/owner/pages/Warehouse/pages/OutgoingStock"),
  "AddOutgoingStock"
);

const { FrozenInventoryPage } = lazyImport(
  () => import("@/features/owner/pages/Frozen/"),
  "FrozenInventoryPage"
);

export const AppRoutes: React.FC = () => {
  // const role: string = "admin";
  const { creds } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        {creds?.level === "Pegawai" ? (
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
              <Route path="detail" element={<DetailCashAdvancePage />} />
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
          </Route>
        ) : (
          <Route path="development" element={<Development />} />
        )}

        {creds?.level === "Owner" ? (
          <Route element={<HomeLayout />}>
            <Route index element={<Home />} />
            <Route path="employee-data">
              <Route index element={<EmployeeOwnerPage />} />
              <Route path="detail" element={<DetailEmployeeOwnerPage />} />
              <Route path="add" element={<CreateEmployeeOwnerPage />} />
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
              <Route path="detail" element={<DetailLeaveRequestPage />} />
            </Route>
            <Route path="employee-cash-advance">
              <Route index element={<CashAdvanceOwnerPage />} />
              <Route path="detail" element={<DetailCashAdvanceOwnerPage />} />
            </Route>
            <Route path="employee-salary">
              <Route index element={<SalaryOwnerPage />} />
              <Route path="detail" element={<DetailSalaryOwnerPage />} />
            </Route>
            <Route path="history">
              <Route index element={<HistoryPageOwner />} />
              <Route path="request" element={<HistoryRequestPageOwner />} />

              <Route path="cash-advance">
                <Route index element={<HistoryCashAdvancePageOwner />} />
                <Route path="detail" element={<DetailCashAdvancePage />} />
              </Route>
            </Route>
            <Route path="leave-request">
              <Route index element={<LeaveRequestPage />} />
              <Route path="detail" element={<DetailLeaveRequestPage />} />
            </Route>
            <Route path="profile">
              <Route index element={<ProfilePage />} />
              <Route path="biodata" element={<BiodataPage />} />
              <Route path="edit" element={<BiodataEditPage />} />
            </Route>
            <Route path="notification">
              <Route index element={<NotificationPage />} />
              <Route path="detail" element={<DetailNotificationPage />} />
            </Route>
            <Route path="daily-task">
              <Route index element={<DailyTaskPageOwner />} />
            </Route>
            <Route path="daily-task-data">
              <Route index element={<DailyTaskDataPage />} />
            </Route>
            <Route path="task-employee-data">
              <Route index element={<TaskEmployeePage />} />
            </Route>
            {/* ITEM ROUTES PATH */}
            <Route path="warehouse-inventory">
              <Route index element={<WarehouseInventoryPage />} />
              <Route path="category">
                <Route index element={<CategoryPage />} />
              </Route>
              <Route path="item">
                <Route index element={<ItemPage />} />
                <Route path="detail" element={<DetailItemPage />} />
                <Route path="update" element={<UpdateItemPage />} />
                <Route path="history" element={<HistoryItemPage />} />
              </Route>
              <Route path="incoming">
                <Route index element={<IncomingStockPage />} />
                <Route path="add" element={<AddIncomingStock />} />
                <Route path="detail" element={<DetailIncomingStock />} />
              </Route>
              <Route path="outgoing">
                <Route index element={<OutgoingStockPage />} />
                <Route path="add" element={<AddOutgoingStock />} />
              </Route>
            </Route>
            {/* FROZEN ROUTES PATH  */}
            <Route path="frozen-inventory">
              <Route index element={<FrozenInventoryPage />} />
              <Route path="category">
                <Route index element={<CategoryPage />} />
              </Route>
              <Route path="item">
                <Route index element={<ItemPage />} />
                <Route path="detail" element={<DetailItemPage />} />
                <Route path="update" element={<UpdateItemPage />} />
                <Route path="history" element={<HistoryItemPage />} />
              </Route>
              <Route path="incoming">
                <Route index element={<IncomingStockPage />} />
                <Route path="add" element={<AddIncomingStock />} />
                <Route path="detail" element={<DetailIncomingStock />} />
              </Route>
              <Route path="outgoing">
                <Route index element={<OutgoingStockPage />} />
                <Route path="add" element={<AddOutgoingStock />} />
              </Route>
            </Route>
          </Route>
        ) : (
          <Route path="development" element={<Development />} />
        )}

        {creds?.level === "Admin" ? (
          <Route element={<AdminLayout />}>
            <Route index path="/" element={<DashboardAdmin />} />

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
      {/* Authentication Page */}
      <Route path="/" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
};
