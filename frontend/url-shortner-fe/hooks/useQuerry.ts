import { useQuery } from "@tanstack/react-query";
import api from "../src/api/api";

// 1. Define types for your API responses
export interface ShortUrl {
  id: string;
  shortCode: string;
  originalUrl: string;
  createdDate: string;
  clicks: number;
}

export type TotalClicksResponse = Record<string, number>; 
// Example: { "2024-01-01": 120, "2024-01-02": 95 }

export interface TotalClickItem {
  clickDate: string;
  count: number;
}

// 2. useFetchMyShortUrls hook
export const useFetchMyShortUrls = (
  token: string,
  onError?: (err: unknown) => void
) => {
  return useQuery<ShortUrl[], Error>({
    queryKey: ["my-shortenurls"],
    queryFn: async () => {
      const response = await api.get<ShortUrl[]>("/api/urls/myurls", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    select: (data) => {
      return [...data].sort(
        (a, b) =>
          new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
      );
    },
    // onError,
    staleTime: 5000,
  });
};

// 3. useFetchTotalClicks hook
export const useFetchTotalClicks = (
  token: string,
  onError?: (err: unknown) => void
) => {
  return useQuery<TotalClicksResponse, Error, TotalClickItem[]>({
    queryKey: ["url-totalclick"],
    queryFn: async () => {
      const response = await api.get<TotalClicksResponse>(
        "/api/urls/totalClicks?startDate=2025-01-01&endDate=2026-12-31",
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    select: (data) => {
      return Object.keys(data).map((key) => ({
        clickDate: key,
        count: data[key],
      }));
    },
    // onError,
    staleTime: 5000,
  });
};
