/* eslint-disable linebreak-style */
import storage from "@/utils/storage";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

type UpdateAccountRequest = {
  username?: string;
  password?: string;
  status?: string;
};

async function updateAccountById(
  accountId: number | undefined,
  data: UpdateAccountRequest
) {
  const response = await axios.patch(`${BaseURL}/accounts/${accountId}`, data, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
  return response.data;
}

export const useUpdateAccountById = (accountId: number | undefined) => {
  return useMutation({
    mutationFn: (data: UpdateAccountRequest) =>
      updateAccountById(accountId, data),
  });
};
