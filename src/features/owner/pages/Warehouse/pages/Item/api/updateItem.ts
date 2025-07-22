/* eslint-disable linebreak-style */
import storage from "@/utils/storage";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

const logFormData = (formData: FormData) => {
  for (const [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }
};

async function updateItemById(itemId: number | undefined, formData: FormData) {
  logFormData(formData);
  const response = await axios.patch(`${BaseURL}/items/${itemId}`, formData, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}

export const useUpdateItemById = (itemId: number | undefined) => {
  return useMutation({
    mutationFn: (formData: FormData) => updateItemById(itemId, formData),
  });
};
