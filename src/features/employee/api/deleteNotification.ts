import storage from "@/utils/storage";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

const deleteNotification = async (
  notificationId: number | undefined | null
) => {
  const response = await axios.delete(
    `${BaseURL}/notifications/${notificationId}`,
    {
      headers: {
        Authorization: `Bearer ${storage.getToken()}`,
      },
    }
  );
  return response.data;
};

export const useDeleteNotification = () => {
  return useMutation({
    mutationFn: (notificationId: number | undefined | null) =>
      deleteNotification(notificationId),
    onError: (error) => {
      console.log(error);
    },
  });
};
