import storage from "@/utils/storage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;
const token = import.meta.env.VITE_TOKEN;

export async function getAllSchedule() {
  const res = await axios.get(`${BaseURL}/schedules`, {
    headers: {
      // Authorization: `Bearer ${storage.getToken()}`,
      Authorization: `${token}`,
    },
  });
  return res.data.data;
}

export const useGetAllSchedule = () => {
  return useQuery({
    queryKey: ["schedules"],
    queryFn: () => getAllSchedule(),
  });
};

export async function getScheduleByDate(date: string | undefined) {
  const res = await axios.get(`${BaseURL}/schedules/by-date?date=${date}`, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
  return res.data.data;
}

export const useGetScheduleByDate = (date: string | undefined) => {
  return useQuery({
    queryKey: ["schedules", date],
    queryFn: () => getScheduleByDate(date),
  });
};

export async function getScheduleByDateStatus(
  date: string | undefined,
  status: string
) {
  const res = await axios.get(
    `${BaseURL}/schedules/by-date-status?date=${date}&status=${status}`,
    {
      headers: {
        Authorization: `Bearer ${storage.getToken()}`,
      },
    }
  );
  return res.data.data;
}

export const useGetScheduleByDateStatus = (
  date: string | undefined,
  status: string
) => {
  return useQuery({
    queryKey: ["schedules", date, status],
    queryFn: () => getScheduleByDateStatus(date, status),
  });
};

export async function getScheduleByMonthAll(month: string | undefined) {
  const res = await axios.get(`${BaseURL}/schedules/by-month-all?month=${month}`, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
  return res.data.data;
}

export const useGetScheduleByMonthAll = (month: string | undefined) => {
  return useQuery({
    queryKey: ["schedules", month],
    queryFn: () => getScheduleByMonthAll(month),
  });
};
