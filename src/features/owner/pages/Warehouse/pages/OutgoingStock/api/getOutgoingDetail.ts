import storage from "@/utils/storage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

export async function getDetailByOutgoingId(outgoingId: number) {
  const res = await axios.get(
    `${BaseURL}/outgoing-details/by-outgoingId?outgoingId=${outgoingId}`,
    {
      headers: {
        Authorization: `Bearer ${storage.getToken()}`,
      },
    }
  );
  return res.data.data;
}

export const useGetDetailByOutgoingId = (outgoingId: number) => {
  return useQuery({
    queryKey: ["incoming-details", outgoingId],
    queryFn: () => getDetailByOutgoingId(outgoingId),
  });
};

export async function getDetailByItemId(itemId: number) {
  const res = await axios.get(
    `${BaseURL}/outgoing-details/by-itemId?itemId=${itemId}`,
    {
      headers: {
        Authorization: `Bearer ${storage.getToken()}`,
      },
    }
  );
  return res.data.data;
}

export const useGetOutgoingDetailByItemId = (itemId: number) => {
  return useQuery({
    queryKey: ["incoming-details", itemId],
    queryFn: () => getDetailByItemId(itemId),
  });
};

export async function getStatsOfOutgoingDataMonthly(month: string) {
  const res = await axios.get(
    `${BaseURL}/outgoing-details/monthly-stats?monthParams=${month}`,
    {
      headers: {
        Authorization: `Bearer ${storage.getToken()}`,
      },
    }
  );
  return res.data.data;
}

export const useGetStatsOfOutgoingDataMonthly = (month: string) => {
  return useQuery({
    queryKey: ["stats-outgoing-monthly", month],
    queryFn: () => getStatsOfOutgoingDataMonthly(month),
  });
};

export async function getStatsOfOutgoingDataAnnually(
  type: string,
  year: string
) {
  const res = await axios.get(
    `${BaseURL}/outgoing-details/annual-stats?type=${type}&yearParams=${year}`,
    {
      headers: {
        Authorization: `Bearer ${storage.getToken()}`,
      },
    }
  );
  return res.data.data;
}

export const useGetStatsOfOutgoingDataAnnually = (
  type: string,
  year: string
) => {
  return useQuery({
    queryKey: ["stats-outgoing-annually", year, type],
    queryFn: () => getStatsOfOutgoingDataAnnually(type, year),
  });
};
export async function getStatsOfOutgoingDataDailyByMonth(
  type: string,
  month: string
) {
  const res = await axios.get(
    `${BaseURL}/outgoing-details/daily-month-stats?type=${type}&monthParams=${month}`,
    {
      headers: {
        Authorization: `Bearer ${storage.getToken()}`,
      },
    }
  );
  return res.data.data;
}

export const useGetStatsOfOutgoingDataDailyByMonth = (
  type: string,
  month: string
) => {
  return useQuery({
    queryKey: ["stats-outgoing-daily-byMonth", month, type],
    queryFn: () => getStatsOfOutgoingDataDailyByMonth(type, month),
  });
};
