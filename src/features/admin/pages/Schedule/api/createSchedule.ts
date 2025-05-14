import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;
const token = import.meta.env.VITE_TOKEN;

type CreateScheduleRequest = {
  month: string;
  make_schedule: boolean;
};

export const createSchedule = async (data: CreateScheduleRequest) => {
  console.log("Data yang dikirim : ", data);
  const response = await axios.post(`${BaseURL}/schedules`, data, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

export const useCreateSchedule = () => {
  return useMutation({
    mutationFn: createSchedule,
    onMutate: async (data: CreateScheduleRequest) => {},
    onError: (error) => {
      console.log("Error :", error);
    },
  });
};
