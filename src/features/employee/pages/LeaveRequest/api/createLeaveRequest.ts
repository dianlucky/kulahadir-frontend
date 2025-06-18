import storage from "@/utils/storage";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;


const logFormData = (formData: FormData) => {
  console.log("FormData contents:");
  for (const [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }
};

export const createLeaveRequest = async (formData: FormData) => {
  logFormData(formData);
  const response = await axios.post(`${BaseURL}/leaves/`, formData, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const useCreateLeaveRequest = () => {
  return useMutation({
    mutationFn: createLeaveRequest,
    onMutate: async () => {},
    onError: (error) => {
      console.log("Error :", error);
    },
  });
};
