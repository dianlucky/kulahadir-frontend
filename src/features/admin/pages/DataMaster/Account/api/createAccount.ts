import storage from "@/utils/storage";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

type AccountPost = {
  username: string;
  password: string;
  level: string;
  status: string;
};

export const postAccount = async (data: AccountPost) => {
  //   console.log("Data yang dikirim : ", data);
  const response = await axios.post(`${BaseURL}/accounts/`, data, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
  return response.data;
};

export const useCreateAccount = () => {
  return useMutation({
    mutationFn: postAccount,
    onMutate: async () => {},
    onError: (error) => {
      console.log("Error :", error);
    },
  });
};
