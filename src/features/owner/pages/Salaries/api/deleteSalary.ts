import storage from "@/utils/storage";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

const deleteSalary = async (
  salaryId: number | undefined | null
) => {
  const response = await axios.delete(
    `${BaseURL}/salaries/${salaryId}`,
    {
      headers: {
        Authorization: `Bearer ${storage.getToken()}`,
      },
    }
  );
  return response.data;
};

export const useDeleteSalary = () => {
  return useMutation({
    mutationFn: (salaryId: number | undefined | null) =>
      deleteSalary(salaryId),
    onError: (error) => {
      console.log(error);
    },
  });
};