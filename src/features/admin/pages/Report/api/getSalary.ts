import storage from "@/utils/storage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

export async function getAllSalary() {
  const res = await axios.get(`${BaseURL}/salaries`, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
  return res.data.data;
}

export const useGetAllSalary = () => {
  return useQuery({
    queryKey: ["salary-all"],
    queryFn: () => getAllSalary(),
  });
};
