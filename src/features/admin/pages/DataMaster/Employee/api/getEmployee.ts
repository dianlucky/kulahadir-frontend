import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;
const token = import.meta.env.VITE_TOKEN;

export async function getAllEmployee() {
  const res = await axios.get(`${BaseURL}/employees`, {
    headers: {
      // Authorization: `Bearer ${storage.getToken()}`,
      Authorization: `${token}`,
    },
  });
  return res.data.data;
}

export const useGetAllEmployee = () => {
  return useQuery({
    queryKey: ["employee"],
    queryFn: () => getAllEmployee(),
  });
};
