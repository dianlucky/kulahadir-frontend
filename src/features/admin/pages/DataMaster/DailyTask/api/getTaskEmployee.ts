import storage from "@/utils/storage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;
const token = import.meta.env.VITE_TOKEN;

export async function getAllTaskEmployee() {
  const res = await axios.get(`${BaseURL}/task-employees`, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
  return res.data.data;
}

export const useGetAllTaskEmployee = () => {
  return useQuery({
    queryKey: ["task-employee"],
    queryFn: () => getAllTaskEmployee(),
  });
};

export async function getTaskEmployeeByDay(day: string | null) {
  const res = await axios.get(`${BaseURL}/task-employees?day=${day}`, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
  console.log("URL : ", `${BaseURL}/task-employees?day=${day}`);
  return res.data.data;
}

export const useGetTaskByDay = (day: string | null) => {
  return useQuery({
    queryKey: ["task-employee.day"],
    queryFn: () => getTaskEmployeeByDay(day),
  });
};
