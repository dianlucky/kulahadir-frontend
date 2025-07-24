/* eslint-disable linebreak-style */
import storage from "@/utils/storage";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

type UpdateDetailRequest = {
  amount?: number;
};

async function updateIncomingDetail(
  id: number | undefined,
  data: UpdateDetailRequest
) {
  const response = await axios.patch(`${BaseURL}/incoming-details/${id}`, data, {
    headers: {
      Authorization: `Bearer ${storage.getToken()}`,
    },
  });
  return response.data;
}

export const useUpdateIncomingDetail = (id: number | undefined) => {
  return useMutation({
    mutationFn: (data: UpdateDetailRequest) => updateIncomingDetail(id, data),
  });
};
