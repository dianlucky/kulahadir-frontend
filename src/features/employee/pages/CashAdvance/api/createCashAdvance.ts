import storage from "@/utils/storage";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

type CreateCashAdvanceRequest = {
  amount: number;
  date: Date;
  reason: string;
  employee_id?: number;
};

export const createCashAdvance = async (data: CreateCashAdvanceRequest) => {
  console.log("Data yang dikirim : ", data);
  const response = await axios.post(`${BaseURL}/cash-advances/`, data, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
  return response.data;
};

export const useCreateCashAdvance = () => {
  return useMutation({
    mutationFn: createCashAdvance,
    onMutate: async () => {},
    onError: (error) => {
      console.log("Error :", error);
    },
  });
};
