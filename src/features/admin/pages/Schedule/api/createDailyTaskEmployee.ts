import storage from "@/utils/storage";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;
const token = import.meta.env.VITE_TOKEN;

type CreateDailyTaskEmployeeRequest = {
  month: string;
  make_task: boolean;
};

export const createDailyTaskEmployee = async (
  data: CreateDailyTaskEmployeeRequest
) => {
  console.log("Data yang dikirim : ", data);
  const response = await axios.post(`${BaseURL}/daily-task-employees`, data, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
  return response.data;
};

export const useCreateDailyTaskEmployee = () => {
  return useMutation({
    mutationFn: createDailyTaskEmployee,
    onMutate: async (data: CreateDailyTaskEmployeeRequest) => {},
    onError: (error) => {
      console.log("Error :", error);
    },
  });
};
