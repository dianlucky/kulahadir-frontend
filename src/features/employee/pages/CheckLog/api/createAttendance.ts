/* eslint-disable linebreak-style */
import storage from "@/utils/storage";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

async function checkIn(formData: FormData) {
  const response = await axios.post(`${BaseURL}/attendances/`, formData, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}

export const useCheckIn = () => {
  return useMutation({
    mutationFn: (formData: FormData) => checkIn(formData),
  });
};
