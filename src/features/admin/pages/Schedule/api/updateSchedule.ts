/* eslint-disable linebreak-style */
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
        Authorization: token,
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
