import storage from "@/utils/storage";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

const deleteIncomingDetail = async (id: number | undefined | null) => {
  const response = await axios.delete(`${BaseURL}/incoming-details/${id}`, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
  return response.data;
};

export const useDeleteIncomingDetail = () => {
  return useMutation({
    mutationFn: (id: number | undefined | null) => deleteIncomingDetail(id),
    onError: (error) => {
      console.log(error);
    },
  });
};
