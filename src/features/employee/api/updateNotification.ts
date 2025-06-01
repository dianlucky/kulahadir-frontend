/* eslint-disable linebreak-style */
import storage from "@/utils/storage";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

type updateReadNotification = {
  was_read: boolean;
};

async function updateReadNotification(
  notificationId: number | undefined,
  data: updateReadNotification
) {
  const response = await axios.patch(
    `${BaseURL}/notifications/${notificationId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${storage.getToken()}`,
      },
    }
  );
  return response.data;
}

export const useUpdateReadNotification = (
  notificationId: number | undefined
) => {
  return useMutation({
    mutationFn: (data: updateReadNotification) =>
      updateReadNotification(notificationId, data),
  });
};
