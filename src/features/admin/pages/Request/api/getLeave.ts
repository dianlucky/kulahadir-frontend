import storage from "@/utils/storage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

export async function getAllLeave() {
  const res = await axios.get(`${BaseURL}/leaves`, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
  return res.data.data;
}

export const useGetAllLeave = () => {
  return useQuery({
    queryKey: ["leave-all"],
    queryFn: () => getAllLeave(),
  });
};
