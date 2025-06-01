import storage from "@/utils/storage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

export async function getAllEmployee() {
  console.log("Token :", storage.getToken());
  const res = await axios.get(`${BaseURL}/employees`, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
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
