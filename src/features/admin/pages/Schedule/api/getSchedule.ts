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
  const res = await axios.get(`${BaseURL}/schedules?date=${date}`, {
    headers: {
      Authorization: token,
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
