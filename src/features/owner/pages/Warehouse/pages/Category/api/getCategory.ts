import storage from "@/utils/storage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

export async function getAllCategory() {
  const res = await axios.get(
    `${BaseURL}/categories`,
    {
      headers: {
        Authorization: `Bearer ${storage.getToken()}`,
      },
    }
  );
  return res.data.data;
}

export const useGetAllCategory = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategory(),
  });
};
