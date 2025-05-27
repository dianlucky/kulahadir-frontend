import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;
const token = import.meta.env.VITE_TOKEN;

export async function getEmployeeByAccountId(accountId: number) {
  const res = await axios.get(
    `${BaseURL}/employees/by-account?accountId=${accountId}`,
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return res.data.data;
}

export const usegetEmployeeByAccountId = (accountId: number) => {
  return useQuery({
    queryKey: ["employee-account-id"],
    queryFn: () => getEmployeeByAccountId(accountId),
  });
};
