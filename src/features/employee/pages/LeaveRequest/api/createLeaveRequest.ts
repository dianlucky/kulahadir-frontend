import storage from "@/utils/storage";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;
const token = import.meta.env.VITE_TOKEN;

type CreateLeaveRequest = {
  type: string;
  date: string;
  reason: string;
  employee_id?: number;
};

export const createLeaveRequest = async (data: CreateLeaveRequest) => {
  console.log("Data yang dikirim : ", data);
  const response = await axios.post(`${BaseURL}/leaves/`, data, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
  return response.data;
};

export const useCreateLeaveRequest = () => {
  return useMutation({
    mutationFn: createLeaveRequest,
    onMutate: async (data: CreateLeaveRequest) => {},
    onError: (error) => {
      console.log("Error :", error);
    },
  });
};
