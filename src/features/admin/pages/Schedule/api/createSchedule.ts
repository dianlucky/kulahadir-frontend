import storage from "@/utils/storage";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

type CreateScheduleRequest = {
  month: string;
  make_schedule: boolean;
};

export const createSchedule = async (data: CreateScheduleRequest) => {
  console.log("Data yang dikirim : ", data);
  const response = await axios.post(`${BaseURL}/schedules`, data, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
  return response.data;
};

export const useCreateSchedule = () => {
  return useMutation({
    mutationFn: createSchedule,
    onMutate: async () => {},
    onError: (error) => {
      console.log("Error :", error);
    },
  });
};
