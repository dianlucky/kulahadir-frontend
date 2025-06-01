/* eslint-disable linebreak-style */
import storage from "@/utils/storage";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;
const token = import.meta.env.VITE_TOKEN;

type UpdateScheduleRequest = {
  attendance_status?: string;
  employee_id?: number;
  date?: string;
  status?: string | null;
};

async function updateSchedule(
  scheduleId: number | undefined,
  data: UpdateScheduleRequest
) {
  const response = await axios.patch(
    `${BaseURL}/schedules/${scheduleId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${storage.getToken()}`,
      },
    }
  );
  return response.data;
}

export const useUpdateSchedule = (scheduleId: number | undefined) => {
  return useMutation({
    mutationFn: (data: UpdateScheduleRequest) =>
      updateSchedule(scheduleId, data),
  });
};

async function updateScheduleByDateEmployeeId(data: UpdateScheduleRequest) {
  console.log("BaseURL : ", `${BaseURL}/schedules/by-date`);
  console.log("Data yang dikirim : ", data);
  const response = await axios.patch(`${BaseURL}/schedules/by-date`, data, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
  return response.data;
}

export const useUpdateScheduleByDateEmployeeId = () => {
  return useMutation({
    mutationFn: (data: UpdateScheduleRequest) =>
      updateScheduleByDateEmployeeId(data),
  });
};
