import storage from "@/utils/storage";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

const deleteOutgoingDetail = async (id: number | undefined | null) => {
  const response = await axios.delete(`${BaseURL}/outgoing-details/${id}`, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
  return response.data;
};

export const useDeleteOutgoingDetail = () => {
  return useMutation({
    mutationFn: (id: number | undefined | null) => deleteOutgoingDetail(id),
    onError: (error) => {
      console.log(error);
    },
  });
};
