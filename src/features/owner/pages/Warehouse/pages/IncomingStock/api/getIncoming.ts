import storage from "@/utils/storage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

export async function getIncomingByDate(type: string, dateString: string) {
  const res = await axios.get(
    `${BaseURL}/incoming-items/by-date?type=${type}&dateString=${dateString}`,
    {
      headers: {
        Authorization: `Bearer ${storage.getToken()}`,
      },
    }
  );
  return res.data.data;
}

export const useGetIncomingByDate = (type: string, dateString: string) => {
  return useQuery({
    queryKey: ["incoming-item", type, dateString],
    queryFn: () => getIncomingByDate(type, dateString),
  });
};
