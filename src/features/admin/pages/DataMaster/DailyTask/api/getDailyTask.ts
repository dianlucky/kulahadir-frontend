import storage from "@/utils/storage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;
const token = import.meta.env.VITE_TOKEN;

export async function getAllDailyTask() {
  const res = await axios.get(
    `${BaseURL}/daily-tasks`,
    {
      headers: {
        Authorization: `Bearer ${storage.getToken()}`,
      },
    }
  );
  return res.data.data;
}

export const useGetAllDailyTask = () => {
  return useQuery({
    queryKey: ["daily-task"],
    queryFn: () => getAllDailyTask(),
  });
};
