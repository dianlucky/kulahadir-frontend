import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;
const token = import.meta.env.VITE_TOKEN;

const deleteDailyTask = async (taskId: number | undefined | null) => {
  const response = await axios.delete(`${BaseURL}/daily-tasks/${taskId}`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

export const useDeleteDailyTask = () => {
  return useMutation({
    mutationFn: (taskId: number | undefined | null) => deleteDailyTask(taskId),
    onError: (error) => {
      console.log(error);
    },
  });
};
