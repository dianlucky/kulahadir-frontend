import storage from "@/utils/storage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

export async function getIncomingByDate(dateString: string) {
  const res = await axios.get(
    `${BaseURL}/incoming-items/by-date?dateString=${dateString}`,
    {
      headers: {
        Authorization: `Bearer ${storage.getToken()}`,
      },
    }
  );
  return res.data.data;
}

export const useGetIncomingByDate = (dateString: string) => {
  return useQuery({
    queryKey: ["item", dateString],
    queryFn: () => getIncomingByDate(dateString),
  });
};
