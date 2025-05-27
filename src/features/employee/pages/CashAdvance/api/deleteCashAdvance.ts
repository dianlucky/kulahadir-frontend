import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;
const token = import.meta.env.VITE_TOKEN;

const deleteCashAdvance = async (cashAdvanceId: number | undefined | null) => {
  const response = await axios.delete(
    `${BaseURL}/cash-advances/${cashAdvanceId}`,
    {
      headers: {
        Authorization: token,
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
