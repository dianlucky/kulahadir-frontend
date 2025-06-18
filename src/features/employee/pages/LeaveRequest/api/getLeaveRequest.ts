import storage from "@/utils/storage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

export async function getLeaveRequestByEmployeeId(employeeId?: number) {
  const res = await axios.get(
    `${BaseURL}/leaves/by-employee?employeeId=${employeeId}`,
    {
      headers: {
        Authorization: `Bearer ${storage.getToken()}`,
      },
    }
  );
  return res.data.data;
}

export const useGetLeaveRequestByEmployeeId = (employeeId?: number) => {
  return useQuery({
    queryKey: ["schedule"],
    queryFn: () => getLeaveRequestByEmployeeId(employeeId),
  });
};
