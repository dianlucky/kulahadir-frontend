import storage from "@/utils/storage";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

type CreateIncomingDetailPost = {
  employee_id: number;
  item_id: number;
  incoming_id: number;
  amount: number;
};

export const postIncomingDetail = async (data: CreateIncomingDetailPost) => {
  const response = await axios.post(`${BaseURL}/incoming-details/`, data, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
  return response.data;
};

export const useCreateIncomingDetail = () => {
  return useMutation({
    mutationFn: postIncomingDetail,
    onMutate: async () => {},
    onError: (error) => {
      console.log("Error :", error);
    },
  });
};
