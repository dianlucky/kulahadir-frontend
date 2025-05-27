import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;
const token = import.meta.env.VITE_TOKEN;

export async function getAttendanceByScheduleId(scheduleId?: number) {
  const res = await axios.get(
    `${BaseURL}/attendances/by-schedule?scheduleId=${scheduleId}`,
    {
      headers: {
        Authorization: token,
      },
    }
  );
  console.log(res.data);
  return res.data.data;
}

export const useGetAttendanceByScheduleId = (scheduleId?: number) => {
  return useQuery({
    queryKey: ["attendance-schedule-id"],
    queryFn: () => getAttendanceByScheduleId(scheduleId),
  });
};

export async function getAttendanceByMonthEmployeeId(
  month?: string,
  employeeId?: number
) {
  const res = await axios.get(
    `${BaseURL}/attendances/by-month?month=${month}&employeeId=${employeeId}`,
    {
      headers: {
        Authorization: token,
      },
    }
  );
  console.log(res.data);
  return res.data.data;
}

export const useGetAttendanceByMonthEmployeeId = (
  month?: string,
  employeeId?: number
) => {
  return useQuery({
    queryKey: ["attendance-monthly"],
    queryFn: () => getAttendanceByMonthEmployeeId(month, employeeId),
  });
};

export async function getAttendanceByDateEmployeeId(
  date?: string,
  employeeId?: number
) {
  console.log(
    "URL get by date : ",
    `${BaseURL}/attendances/by-date?date=${date}&employeeId=${employeeId}`
  );
  console.log("Tanggal :", date);
  const res = await axios.get(
    `${BaseURL}/attendances/by-date?date=${date}&employeeId=${employeeId}`,
    {
      headers: {
        Authorization: token,
      },
    }
  );
  console.log(res.data);
  return res.data.data;
}

export const useGetAttendanceByDateEmployeeId = (
  date?: string,
  employeeId?: number
) => {
  return useQuery({
    queryKey: ["attendance-daily"],
    queryFn: () => getAttendanceByDateEmployeeId(date, employeeId),
  });
};
