import storage from "@/utils/storage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

export async function getDailyTaskEmployeeByDateEmployeeId(
  date?: string,
  employeeId?: number
) {
  const res = await axios.get(
    `${BaseURL}/daily-task-employees/by-date?date=${date}&employeeId=${employeeId}`,
    {
      headers: {
        Authorization: `Bearer ${storage.getToken()}`,
      },
    }
  );
  return res.data.data;
}

export const useGetDailyTaskEmployeeByDateEmployeeId = (
  date?: string,
  employeeId?: number
) => {
  return useQuery({
    queryKey: ["getDailyTaskEmployee", date],
    queryFn: () => getDailyTaskEmployeeByDateEmployeeId(date, employeeId),
  });
};
