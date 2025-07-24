import storage from "@/utils/storage";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

const deleteIncomingData = async (id: number | undefined | null) => {
  const response = await axios.delete(`${BaseURL}/incoming-items/${id}`, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
  return response.data;
};

export const useDeleteIncomingData = () => {
  return useMutation({
    mutationFn: (id: number | undefined | null) => deleteIncomingData(id),
    onError: (error) => {
      console.log(error);
    },
  });
};
