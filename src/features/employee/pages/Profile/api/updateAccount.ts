/* eslint-disable linebreak-style */
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;
const token = import.meta.env.VITE_TOKEN;

type UpdateAccountRequest = {
  username?: string;
  password?: string;
};

async function updateAccountById(
  accountId: number | undefined,
  data: UpdateAccountRequest
) {
  const response = await axios.patch(`${BaseURL}/accounts/${accountId}`, data, {
    headers: {
      Authorization: token,
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
