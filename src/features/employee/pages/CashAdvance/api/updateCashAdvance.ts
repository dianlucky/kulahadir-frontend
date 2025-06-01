/* eslint-disable linebreak-style */
import storage from "@/utils/storage";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

type updateCashAdvanceById = {
  status?: string;
};

async function updateCashAdvanceById(
  cashAdvanceId: number | undefined,
  data: updateCashAdvanceById
) {
  const response = await axios.patch(
    `${BaseURL}/cash-advances/${cashAdvanceId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${storage.getToken()}`,
      },
    }
  );
  return response.data;
}

export const useUpdateCashAdvanceById = (cashAdvanceId: number | undefined) => {
  return useMutation({
    mutationFn: (data: updateCashAdvanceById) =>
      updateCashAdvanceById(cashAdvanceId, data),
  });
};
