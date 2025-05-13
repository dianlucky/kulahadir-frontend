import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

export async function getSchedule(scheduleId: number) {
  const res = await axios.get(`${BaseURL}/schedules/${scheduleId}`, {
    headers: {
      Authorization: `14b0945f-0ca3-4c26-ad92-00243da99951`,
    },
  });
  console.log(res.data);
  return res.data.data;
}

export const useGetSchedule = (scheduleId: number) => {
  return useQuery({
    queryKey: ["schedule"],
    queryFn: () => getSchedule(scheduleId),
  });
};
