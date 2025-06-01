import storage from "@/utils/storage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

export async function getNotification(employeeId?: number) {
  const res = await axios.get(
    `${BaseURL}/notifications?employeeId=${employeeId}`,
    {
      headers: {
        Authorization: `Bearer ${storage.getToken()}`,
      },
    }
  );
  return res.data.data;
}

export const usegetNotification = (employeeId?: number) => {
  return useQuery({
    queryKey: ["notification", employeeId],
    queryFn: () => getNotification(employeeId),
  });
};
