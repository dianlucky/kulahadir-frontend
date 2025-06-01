import storage from "@/utils/storage";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;
const token = import.meta.env.VITE_TOKEN;

type CreateEmployeeRequest = {
  name: string;
  birth_date: string;
  phone: string;
  account_id: number;
};

export const createEmployee = async (data: CreateEmployeeRequest) => {
  console.log("Data yang dikirim : ", data);
  const response = await axios.post(`${BaseURL}/employees/`, data, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
  return response.data;
};

export const useCreateEmployee = () => {
  return useMutation({
    mutationFn: createEmployee,
    onMutate: async (data: CreateEmployeeRequest) => {},
    onError: (error) => {
      console.log("Error :", error);
    },
  });
};
