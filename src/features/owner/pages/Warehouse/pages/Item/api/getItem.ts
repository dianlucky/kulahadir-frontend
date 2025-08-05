import storage from "@/utils/storage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

export async function getAllItem() {
  const res = await axios.get(`${BaseURL}/items`, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
  return res.data.data;
}

export const useGetAllItem = () => {
  return useQuery({
    queryKey: ["item"],
    queryFn: () => getAllItem(),
  });
};

export async function getByCategory(category: string) {
  const res = await axios.get(
    `${BaseURL}/items/by-category?category=${category}`,
    {
      headers: {
        Authorization: `Bearer ${storage.getToken()}`,
      },
    }
  );
  return res.data.data;
}

export const useGetByCategory = (category: string) => {
  return useQuery({
    queryKey: ["item", category],
    queryFn: () => getByCategory(category),
  });
};

export async function getItemById(itemId: number) {
  const res = await axios.get(`${BaseURL}/items/${itemId}`, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
  return res.data.data;
}

export const useGetItemById = (itemId: number) => {
  return useQuery({
    queryKey: ["item", itemId],
    queryFn: () => getItemById(itemId),
  });
};

export async function getItemStatsWeekly(itemId: number, date: string) {
  console.log(
    "URL :",
    `${BaseURL}/items/weekly-stats?itemId=${itemId}&startDateParams=${date}`
  );
  const res = await axios.get(
    `${BaseURL}/items/weekly-stats?itemId=${itemId}&startDateParams=${date}`,
    {
      headers: {
        Authorization: `Bearer ${storage.getToken()}`,
      },
    }
  );
  return res.data.data;
}

export const useGetItemStatsWeekly = (itemId: number, date: string) => {
  return useQuery({
    queryKey: ["stats-weekly", itemId],
    queryFn: () => getItemStatsWeekly(itemId, date),
  });
};
