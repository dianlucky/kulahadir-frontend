import storage from "@/utils/storage";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

type CreateCategoryPost = {
  code: string;
  name: string;
};

export const postCategory = async (data: CreateCategoryPost) => {
  const response = await axios.post(`${BaseURL}/categories/`, data, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
  return response.data;
};

export const useCreateCategory = () => {
  return useMutation({
    mutationFn: postCategory,
    onMutate: async () => {},
    onError: (error) => {
      console.log("Error :", error);
    },
  });
};
