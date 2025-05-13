export type ScheduleType = {
    id: number;
    date: Date;
    status:string;
    attendance_status: string;
    employee_id: number;
}

export type DailyTaskType = {
    id: number;
    task: string;
}