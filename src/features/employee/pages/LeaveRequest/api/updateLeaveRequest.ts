/* eslint-disable linebreak-style */
import storage from "@/utils/storage";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

type UpdateStatusRequest = {
  status?: string;
};

async function updateLeaveRequestById(
  leaveRequestId: number | undefined,
  data: UpdateStatusRequest
) {
  const response = await axios.patch(
    `${BaseURL}/leaves/${leaveRequestId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${storage.getToken()}`,
      },
    }
  );
  return response.data;
}

export const useUpdateLeaveRequestById = (
  leaveRequestId: number | undefined
) => {
  return useMutation({
    mutationFn: (data: UpdateStatusRequest) =>
      updateLeaveRequestById(leaveRequestId, data),
  });
};
