import { useMutation } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { MutationConfig } from "@/lib/react-query";

import { Creds } from "../types";

const BaseURL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

type LoginDTO = {
  data: {
    username: string;
    password: string;
  };
};

type LoginResponse = {
  token: string;
  creds: Creds;
};

// type LoginResponse = {
//   id: number;
//   username: string;
//   level: string;
//   status: string;
//   token: string;
//   employee_id: number;
// };

export async function login({ data }: LoginDTO) {
  const res = await axios.post<LoginResponse>(`${BaseURL}/auth/login`, data);
  return res.data;
}

type UseLoginOption = {
  config?: MutationConfig<typeof login>;
};

export function useLogin({ config }: UseLoginOption = {}) {
  return useMutation({
    mutationFn: login,
    ...config,
  });
}
