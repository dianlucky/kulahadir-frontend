import storage from "@/utils/storage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

export async function getSchedule(scheduleId: number) {
  const res = await axios.get(`${BaseURL}/schedules/${scheduleId}`, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
  return res.data.data;
}

export const useGetSchedule = (scheduleId: number) => {
  return useQuery({
    queryKey: ["schedule"],
    queryFn: () => getSchedule(scheduleId),
  });
};

export async function getScheduleByDateEmployeeId(
  employeeId?: number,
  date?: string
) {
  console.log(
    "URL :",
    `${BaseURL}/schedules?employeeId=${employeeId}&date=${date}`
  );
  const res = await axios.get(
    `${BaseURL}/schedules?employeeId=${employeeId}&date=${date}`,
    {
      headers: {
        Authorization: `Bearer ${storage.getToken()}`,
      },
    }
  );
  return res.data.data;
}

export const useGetScheduleByDateEmployeeId = (
  employeeId?: number,
  date?: string
) => {
  return useQuery({
    queryKey: ["schedule-by-date"],
    queryFn: () => getScheduleByDateEmployeeId(employeeId, date),
  });
};

export async function getScheduleByMonthEmployeeId(
  month: string,
  employeeId?: number
) {
  console.log(
    "URL :",
    `${BaseURL}/schedules/by-month?month=${month}&employeeId=${employeeId}`
  );
  const res = await axios.get(
    `${BaseURL}/schedules/by-month?month=${month}&employeeId=${employeeId}`,
    {
      headers: {
        Authorization: `Bearer ${storage.getToken()}`,
      },
    }
  );
  return res.data.data;
}

export const useGetScheduleByMonthEmployeeId = (
  month: string,
  employeeId?: number
) => {
  return useQuery({
    queryKey: ["schedule"],
    queryFn: () => getScheduleByMonthEmployeeId(month, employeeId),
  });
};
