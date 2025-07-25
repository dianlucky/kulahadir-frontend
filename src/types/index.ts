export type ScheduleType = {
  id: number;
  date: Date;
  shift_code: string;
  start_time: string;
  end_time: string;
  status: string;
  attendance_status: string;
  employee_id: number;
  employee: EmployeeType;
};

export type AttendanceType = {
  id: number;
  check_in: Date | string;
  check_out: Date | string;
  attendance_long: string;
  attendance_lat: string;
  status: string;
  snapshot: string;
  schedule_id: number;

  schedule: ScheduleType;
};

export type DailyTaskType = {
  id: number;
  task_code: string;
  task_name: string;
};

export type TaskEmployeeType = {
  id: number;
  day: string;
  task_id: number;
  employee_id: number;

  task: DailyTaskType;
  employee: EmployeeType;
};

export type DailyTaskEmployeeType = {
  id: number;
  status: string;
  task_employee_id: number;
  date: Date;

  task_employee: TaskEmployeeType;
};

export type EmployeeType = {
  id: number;
  name: string;
  birth_date: Date;
  phone: string;
  created_at: Date;
  profile_pic: string;
  account_id: number;
  account: AccountType;
};

export type AccountType = {
  id: number;
  username: string;
  password?: string;
  token?: string;
  level: string;
  status: string;
};

export type RequestType = {
  id: number;
  reason: string;
  status: string;
  schedule_id: number;
  schedule: ScheduleType;
};

export type LeaveRequestType = {
  id: number;
  reason: string;
  type: string;
  date: Date;
  status: string;
  attachment: string;
  created_at: Date;
  employee_id: number;
  employee: EmployeeType;
};

export type CashAdvanceType = {
  id: number;
  amount: number;
  date: Date;
  reason: string;
  status: string;
  created_at: Date;
  employee_id: number;
  employee: EmployeeType;
};

export type SalaryType = {
  id: number;
  amount: number;
  bonus: number;
  salary_deduction: number;
  cash_advance: number;
  note: string;
  date: Date;
  created_at: Date;
  employee_id: number;
  employee: EmployeeType;
};

export type NotificationType = {
  id: number;
  type: string;
  message: string;
  was_read: boolean;
  created_at: Date;
  employee_id: number;
  employee: EmployeeType;
};

export type CategoryType = {
  id: number;
  code: string;
  name: string;
};

export type ItemType = {
  id: number;
  code: string;
  name: string;
  stock: number;
  image: string;
  category_id: number;
  category?: CategoryType;
};

export type DetailIncomingType = {
  id: number;
  amount: number;
  created_at: Date;
  incoming_id: number;
  item_id: number;
  item: ItemType;
  employee_id: number;
  employee: EmployeeType;
};

export type IncomingDataType = {
  id: number;
  created_at: Date;
  employee_id: number;
  employee: EmployeeType;
  details: DetailIncomingType[];
};

export type DetailOutgoingType = {
  id: number;
  amount: number;
  created_at: Date;
  outgoing_id: number;
  item_id: number;
  item: ItemType;
  employee_id: number;
  employee: EmployeeType;
};

export type OutgoingDataType = {
  id: number;
  created_at: Date;
  employee_id: number;
  employee: EmployeeType;
  details: DetailOutgoingType[];
};

export type TransactionType = {
  id: number;
  amount: number;
  created_at: Date;
  item_id: number;
  item: ItemType;
  employee_id: number;
  employee: EmployeeType;
  type: "incoming" | "outgoing";
};
