import storage from "@/utils/storage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

export async function getCashAdvanceByMonthEmployeeId(
  month?: string,
  employeeId?: number
) {
  // console.log(
  //   "URL cash advance:",
  //   `${BaseURL}/cash-advances/by-month?month=${month}&employeeId=${employeeId}`
  // );
  const res = await axios.get(
    `${BaseURL}/cash-advances/by-month?month=${month}&employeeId=${employeeId}`,
    {
      headers: {
        Authorization: `Bearer ${storage.getToken()}`,
      },
    }
  );
  return res.data.data;
}

export const useGetCashAdvanceByMonthEmployeeId = (
  month?: string,
  employeeId?: number
) => {
  return useQuery({
    queryKey: ["getCashAdvance-monthly", month, employeeId],
    queryFn: () => getCashAdvanceByMonthEmployeeId(month, employeeId),
  });
};

export async function getCashAdvanceByEmployeeId(employeeId?: number) {
  console.log(
    "URL :",
    `${BaseURL}/cash-advances/by-employee?employeeId=${employeeId}`
  );
  const res = await axios.get(
    `${BaseURL}/cash-advances/by-employee?employeeId=${employeeId}`,
    {
      headers: {
        Authorization: `Bearer ${storage.getToken()}`,
      },
    }
  );
  return res.data.data;
}

export const useGetCashAdvanceByEmployeeId = (employeeId?: number) => {
  return useQuery({
    queryKey: ["getCashAdvance-monthly"],
    queryFn: () => getCashAdvanceByEmployeeId(employeeId),
  });
};

export async function getAllCashAdvance() {
  const res = await axios.get(`${BaseURL}/cash-advances`, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
  return res.data.data;
}

export const useGetAllCashAdvance = () => {
  return useQuery({
    queryKey: ["getCashAdvance-all"],
    queryFn: () => getAllCashAdvance(),
  });
};
