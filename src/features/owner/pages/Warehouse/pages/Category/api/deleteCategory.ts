import storage from "@/utils/storage";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

const deleteCategory = async (id: number | undefined | null) => {
  const response = await axios.delete(`${BaseURL}/categories/${id}`, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
  return response.data;
};

export const useDeleteCategory = () => {
  return useMutation({
    mutationFn: (id: number | undefined | null) => deleteCategory(id),
    onError: (error) => {
      console.log(error);
    },
  });
};
