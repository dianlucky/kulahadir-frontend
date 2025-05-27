import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;
const token = import.meta.env.VITE_TOKEN;

type CreateCashAdvanceRequest = {
  amount: number;
  date: Date;
  reason: string;
  employee_id: number;
};

export const createCashAdvance = async (data: CreateCashAdvanceRequest) => {
  console.log("Data yang dikirim : ", data);
  const response = await axios.post(`${BaseURL}/cash-advances/`, data, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

export const useCreateCashAdvance = () => {
  return useMutation({
    mutationFn: createCashAdvance,
    onMutate: async (data: CreateCashAdvanceRequest) => {},
    onError: (error) => {
      console.log("Error :", error);
    },
  });
};
