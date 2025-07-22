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

async function createItem(formData: FormData) {
  logFormData(formData);
  const response = await axios.post(`${BaseURL}/items`, formData, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}

export const useCreateItem = () => {
  return useMutation({
    mutationFn: (formData: FormData) => createItem(formData),
  });
};
