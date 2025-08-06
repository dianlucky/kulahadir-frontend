import storage from "@/utils/storage";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

type CreateIncomingItemPost = {
  employee_id: number;
  isFrozen: boolean;
};

export const postIncomingItem = async (data: CreateIncomingItemPost) => {
  const response = await axios.post(`${BaseURL}/incoming-items/`, data, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
  return response.data;
};

export const useCreateIncomingItem = () => {
  return useMutation({
    mutationFn: postIncomingItem,
    onMutate: async () => {},
    onError: (error) => {
      console.log("Error :", error);
    },
  });
};
