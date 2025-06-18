import storage from "@/utils/storage";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

type CreateSalaryRequest = {
  bonus: number | null;
  salary_deduction: number | null;
  cash_advance: number | null;
  note: string | null;
  date?: string;
  amount: number | null;
  employee_id?: number;
};

export const createSalary = async (data: CreateSalaryRequest) => {
  console.log("Data yang dikirim : ", data);
  const response = await axios.post(`${BaseURL}/salaries/`, data, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
  return response.data;
};

export const useCreateSalary = () => {
  return useMutation({
    mutationFn: createSalary,
    onMutate: async () => {},
    onError: (error) => {
      console.log("Error :", error);
    },
  });
};
