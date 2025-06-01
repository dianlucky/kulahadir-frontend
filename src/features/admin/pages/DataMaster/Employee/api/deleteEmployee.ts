import storage from "@/utils/storage";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;
const token = import.meta.env.VITE_TOKEN;

const deleteEmployee = async (employeeId: number | undefined | null) => {
  console.log("Account id: ", employeeId);
  const response = await axios.delete(`${BaseURL}/employees/${employeeId}`, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
  return response.data;
};

export const useDeleteEmployee = () => {
  return useMutation({
    mutationFn: (employeeId: number | undefined | null) =>
      deleteEmployee(employeeId),
    onError: (error) => {
      console.log(error);
    },
  });
};
