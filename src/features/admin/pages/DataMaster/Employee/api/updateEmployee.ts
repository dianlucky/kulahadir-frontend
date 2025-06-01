/* eslint-disable linebreak-style */
import storage from "@/utils/storage";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;
const token = import.meta.env.VITE_TOKEN;

type UpdateEmployeeRequest = {
  name?: string;
  birth_date?: string | Date;
  phone?: string;
  account_id?: number;
};

async function updateEmployeeById(
  accountId: number | undefined,
  data: UpdateEmployeeRequest
) {
  const response = await axios.patch(
    `${BaseURL}/employees/${accountId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${storage.getToken()}`,
      },
    }
  );
  return response.data;
}

export const useUpdateEmployeeById = (accountId: number | undefined) => {
  return useMutation({
    mutationFn: (data: UpdateEmployeeRequest) =>
      updateEmployeeById(accountId, data),
  });
};
