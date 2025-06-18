import storage from "@/utils/storage";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

type TaskEmployeePost = {
  day: string;
  task_id: number;
  employee_id: number;
};

export const postTaskEmployee = async (taskEmployee: TaskEmployeePost) => {
  console.log("Data yang dikirim : ", taskEmployee);
  const response = await axios.post(
    `${BaseURL}/task-employees/`,
    taskEmployee,
    {
      headers: {
        Authorization: `Bearer ${storage.getToken()}`,
      },
    }
  );
  return response.data;
};

export const useCreateTaskEmployee = () => {
  return useMutation({
    mutationFn: postTaskEmployee,
    onMutate: async () => {},
    onError: (error) => {
      console.log("Error :", error);
    },
  });
};
