/* eslint-disable linebreak-style */
import storage from "@/utils/storage";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

type UpdateCategoryRequest = {
  code?: string;
  name?: string;
};

async function updateCategory(
  id: number | undefined,
  data: UpdateCategoryRequest
) {
  const response = await axios.patch(`${BaseURL}/categories/${id}`, data, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
  return response.data;
}

export const useUpdateCategory = (id: number | undefined) => {
  return useMutation({
    mutationFn: (data: UpdateCategoryRequest) => updateCategory(id, data),
  });
};
