import storage from "@/utils/storage";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

const deleteAccount = async (accountId: number | undefined | null) => {
  console.log("Account id: ", accountId);
  const response = await axios.delete(`${BaseURL}/accounts/${accountId}`, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
  return response.data;
};

export const useDeleteAccount = () => {
  return useMutation({
    mutationFn: (accountId: number | undefined | null) =>
      deleteAccount(accountId),
    onError: (error) => {
      console.log(error);
    },
  });
};
