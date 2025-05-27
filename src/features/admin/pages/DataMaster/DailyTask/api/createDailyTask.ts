import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;
const token = import.meta.env.VITE_TOKEN;

type DailyTaskPost = {
  task_code: string;
  task_name: string;
};

export const postDailyTasks = async (dailyTask: DailyTaskPost) => {
  console.log("Data yang dikirim : ", dailyTask);
  const response = await axios.post(`${BaseURL}/daily-tasks/`, dailyTask, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

export const useCreateDailyTask = () => {
  return useMutation({
    mutationFn: postDailyTasks,
    onMutate: async (dailyTask: DailyTaskPost) => {},
    onError: (error) => {
      console.log("Error :", error);
    },
  });
};
