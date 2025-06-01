/* eslint-disable linebreak-style */
import storage from "@/utils/storage";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

type UpdateStatusTaskRequest = {
  status?: string;
};

async function updateDailyTaskEmployeeById(
  dailyTaskEmployeeId: number | undefined,
  data: UpdateStatusTaskRequest
) {
  const response = await axios.patch(
    `${BaseURL}/daily-task-employees/${dailyTaskEmployeeId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${storage.getToken()}`,
      },
    }
  );
  return response.data;
}

export const useUpdateDailyTaskEmployeeById = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateStatusTaskRequest }) =>
      updateDailyTaskEmployeeById(id, data),
  });
};
