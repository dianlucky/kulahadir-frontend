import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;
const token = import.meta.env.VITE_TOKEN;

export async function getAllLeave() {
  const res = await axios.get(`${BaseURL}/leaves`, {
    headers: {
      // Authorization: `Bearer ${storage.getToken()}`,
      Authorization: `${token}`,
    },
  });
  return res.data.data;
}

export const useGetAllLeave = () => {
  return useQuery({
    queryKey: ["employee"],
    queryFn: () => getAllLeave(),
  });
};
