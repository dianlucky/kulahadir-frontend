import storage from "@/utils/storage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;
const token = import.meta.env.VITE_TOKEN;

export async function getAllLevel() {
  const res = await axios.get(`${BaseURL}/levels`, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
  return res.data.data;
}

export const useGetAllLevel = () => {
  return useQuery({
    queryKey: ["daily-task"],
    queryFn: () => getAllLevel(),
  });
};
