import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;
const token = import.meta.env.VITE_TOKEN;

const deleteRequest = async (requestId: number | undefined | null) => {
  //   console.log("Account id: ", employeeId);
  const response = await axios.delete(`${BaseURL}/leaves/${requestId}`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

export const useDeleteRequest = () => {
  return useMutation({
    mutationFn: (requestId: number | undefined | null) =>
      deleteRequest(requestId),
    onError: (error) => {
      console.log(error);
    },
  });
};
