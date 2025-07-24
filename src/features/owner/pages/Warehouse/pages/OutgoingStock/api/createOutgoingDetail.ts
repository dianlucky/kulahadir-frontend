import storage from "@/utils/storage";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

type CreateOutgoingDetailPost = {
  employee_id: number;
  item_id: number;
  outgoing_id: number;
  amount: number;
};

export const postOutgoingDetail = async (data: CreateOutgoingDetailPost) => {
  const response = await axios.post(`${BaseURL}/outgoing-details/`, data, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
  return response.data;
};

export const useCreateOutgoingDetail = () => {
  return useMutation({
    mutationFn: postOutgoingDetail,
    onMutate: async () => {},
    onError: (error) => {
      console.log("Error :", error);
    },
  });
};
