import storage from "@/utils/storage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

export async function getDailyTaskEmployeeByDate(date?: string) {
  console.log("Date :", date);
  const res = await axios.get(
    `${BaseURL}/daily-task-employees/by-date-all?date=${date}`,
    {
      headers: {
        Authorization: `Bearer ${storage.getToken()}`,
      },
    }
  );
  return res.data.data;
}

export const useGetDailyTaskEmployeeByDate = (date?: string) => {
  return useQuery({
    queryKey: ["getDailyTaskEmployee", date],
    queryFn: () => getDailyTaskEmployeeByDate(date),
  });
};
