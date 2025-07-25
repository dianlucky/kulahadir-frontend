import storage from "@/utils/storage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

export async function getDetailByIncomingId(incomingId: number) {
  const res = await axios.get(
    `${BaseURL}/incoming-details/by-incomingId?incomingId=${incomingId}`,
    {
      headers: {
        Authorization: `Bearer ${storage.getToken()}`,
      },
    }
  );
  return res.data.data;
}

export const useGetDetailByIncomingId = (incomingId: number) => {
  return useQuery({
    queryKey: ["incoming-details", incomingId],
    queryFn: () => getDetailByIncomingId(incomingId),
  });
};

export async function getDetailByItemId(itemId: number) {
  const res = await axios.get(
    `${BaseURL}/incoming-details/by-itemId?itemId=${itemId}`,
    {
      headers: {
        Authorization: `Bearer ${storage.getToken()}`,
      },
    }
  );
  return res.data.data;
}

export const useGetIncomingDetailByItemId = (itemId: number) => {
  return useQuery({
    queryKey: ["incoming-details", itemId],
    queryFn: () => getDetailByItemId(itemId),
  });
};
