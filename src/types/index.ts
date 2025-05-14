export type ScheduleType = {
  id: number;
  date: Date;
  status: string;
  attendance_status: string;
  employee_id: number;
  employee: EmployeeType;
};

export type DailyTaskType = {
  id: number;
  task: string;
};

export type EmployeeType = {
  id: number;
  name: string;
  birth_date: Date;
  phone: string;
  account_id: number;
  account: AccountType;
};

export type AccountType = {
  id: number;
  username: string;
  password?: string;
  token?: string;
  level_id: number;
  level: LevelType;
};

export type LevelType = {
  id: number;
  name: string;
};
