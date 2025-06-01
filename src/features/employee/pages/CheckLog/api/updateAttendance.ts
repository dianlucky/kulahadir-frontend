/* eslint-disable linebreak-style */
import storage from "@/utils/storage";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

type CheckOutRequest = {
  check_out: Date;
  schedule_id?: number;
};

async function checkOut(
  attendanceId: number | undefined,
  data: CheckOutRequest
) {
  const response = await axios.patch(
    `${BaseURL}/attendances/${attendanceId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${storage.getToken()}`,
      },
    }
  );
  return response.data;
}

export const useCheckOut = (attendanceId: number | undefined) => {
  return useMutation({
    mutationFn: (data: CheckOutRequest) => checkOut(attendanceId, data),
  });
};
