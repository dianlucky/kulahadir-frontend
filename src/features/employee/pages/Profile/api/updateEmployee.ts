/* eslint-disable linebreak-style */
import storage from "@/utils/storage";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

async function updateEmployeeById(
  accountId: number | undefined,
  formData: FormData
) {
  const response = await axios.patch(
    `${BaseURL}/employees/${accountId}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${storage.getToken()}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
}

export const useUpdateEmployeeById = (accountId: number | undefined) => {
  return useMutation({
    mutationFn: (formData: FormData) => updateEmployeeById(accountId, formData),
  });
};
