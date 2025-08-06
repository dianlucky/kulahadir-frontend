import storage from "@/utils/storage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

export async function getDetailByIncomingId(incomingId: number) {
  const res = await axios.get(
    `${BaseURL}/incoming-details/by-incomingId?incomingId=${incomingId}`,
    {
      headers: {
        Authorization: `Bearer ${storage.getToken()}`,
      },
    }
  );
  return res.data.data;
}

export const useGetDetailByIncomingId = (incomingId: number) => {
  return useQuery({
    queryKey: ["incoming-details", incomingId],
    queryFn: () => getDetailByIncomingId(incomingId),
  });
};

export async function getDetailByItemId(itemId: number) {
  const res = await axios.get(
    `${BaseURL}/incoming-details/by-itemId?itemId=${itemId}`,
    {
      headers: {
        Authorization: `Bearer ${storage.getToken()}`,
      },
    }
  );
  return res.data.data;
}

export const useGetIncomingDetailByItemId = (itemId: number) => {
  return useQuery({
    queryKey: ["incoming-details", itemId],
    queryFn: () => getDetailByItemId(itemId),
  });
};

// Get stats of incoming data annually (sort per month)
export async function getStatsOfIncomingDataAnnually(
  type: string,
  year: string
) {
  const res = await axios.get(
    `${BaseURL}/incoming-details/annual-stats?type=${type}&yearParams=${year}`,
    {
      headers: {
        Authorization: `Bearer ${storage.getToken()}`,
      },
    }
  );
  return res.data.data;
}

export const useGetStatsOfIncomingDataAnnually = (
  type: string,
  year: string
) => {
  return useQuery({
    queryKey: ["stats-incoming-annually", year, type],
    queryFn: () => getStatsOfIncomingDataAnnually(type, year),
  });
};
// End block

// Get stats incoming data daily by month (get daily)
export async function getStatsOfIncomingDataDailyByMonth(
  type: string,
  month: string
) {
  const res = await axios.get(
    `${BaseURL}/incoming-details/daily-month-stats?type=${type}&monthParams=${month}`,
    {
      headers: {
        Authorization: `Bearer ${storage.getToken()}`,
      },
    }
  );
  return res.data.data;
}

export const useGetStatsOfIncomingDataDailyByMonth = (
  type: string,
  month: string
) => {
  return useQuery({
    queryKey: ["stats-incoming-daily-byMonth", month, type],
    queryFn: () => getStatsOfIncomingDataDailyByMonth(type, month),
  });
};
// End block
