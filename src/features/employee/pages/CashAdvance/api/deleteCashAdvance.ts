import storage from "@/utils/storage";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

const deleteCashAdvance = async (cashAdvanceId: number | undefined | null) => {
  const response = await axios.delete(
    `${BaseURL}/cash-advances/${cashAdvanceId}`,
    {
      headers: {
        Authorization: `Bearer ${storage.getToken()}`,
      },
    }
  );
  return response.data;
};

export const useDeleteCashAdvance = () => {
  return useMutation({
    mutationFn: (cashAdvanceId: number | undefined | null) =>
      deleteCashAdvance(cashAdvanceId),
    onError: (error) => {
      console.log(error);
    },
  });
};
