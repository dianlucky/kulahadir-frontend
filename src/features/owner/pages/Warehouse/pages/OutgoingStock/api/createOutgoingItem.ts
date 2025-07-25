import storage from "@/utils/storage";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

type CreateOutgoingDataPost = {
  employee_id: number;
};

export const postOugoingItem = async (data: CreateOutgoingDataPost) => {
  const response = await axios.post(`${BaseURL}/outgoing-items/`, data, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
  return response.data;
};

export const useCreateOutgoingItem = () => {
  return useMutation({
    mutationFn: postOugoingItem,
    onMutate: async () => {},
    onError: (error) => {
      console.log("Error :", error);
    },
  });
};
