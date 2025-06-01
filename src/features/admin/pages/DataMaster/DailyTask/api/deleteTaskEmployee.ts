import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;
const token = import.meta.env.VITE_TOKEN;

const deleteTaskEmployee = async (
  taskEmployeeId: number | undefined | null
) => {
  const response = await axios.delete(
    `${BaseURL}/task-employees/${taskEmployeeId}`,
    {
      headers: {
        Authorization: `Bearer ${storage.getToken()}`,
      },
    }
  );
  return response.data;
};

export const useDeleteTaskEmployee = () => {
  return useMutation({
    mutationFn: (taskEmployeeId: number | undefined | null) =>
      deleteTaskEmployee(taskEmployeeId),
    onError: (error) => {
      console.log(error);
    },
  });
};
