import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;
const token = import.meta.env.VITE_TOKEN;

export async function getSalaryByMonthEmployeeId(
  month?: string,
  employeeId?: number
) {
  console.log(
    "URL :",
    `${BaseURL}/salaries/by-month?month=${month}&employeeId=${employeeId}`
  );
  const res = await axios.get(
    `${BaseURL}/salaries/by-month?month=${month}&employeeId=${employeeId}`,
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return res.data.data;
}

export const useGetSalaryByMonthEmployeeId = (
  month?: string,
  employeeId?: number
) => {
  return useQuery({
    queryKey: ["getCashAdvance-monthly"],
    queryFn: () => getSalaryByMonthEmployeeId(month, employeeId),
  });
};
