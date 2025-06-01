import storage from "@/utils/storage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;
const token = import.meta.env.VITE_TOKEN;

export async function getAllAccount() {
  const res = await axios.get(`${BaseURL}/accounts`, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
  return res.data.data;
}

export const useGetAllAccount = () => {
  return useQuery({
    queryKey: ["accounts"],
    queryFn: () => getAllAccount(),
  });
};

export async function getAccountById(accountId?: number) {
  const res = await axios.get(`${BaseURL}/accounts/${accountId}`, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
  return res.data.data;
}

export const useGetAccountById = (accountId?: number) => {
  return useQuery({
    queryKey: ["accounts", accountId],
    queryFn: () => getAccountById(accountId),
  });
};
