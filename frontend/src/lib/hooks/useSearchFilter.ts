import {  keepPreviousData, useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../axios';
import { AggregatedPaginatedResult } from '@/types';
import { useMemo } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { updateApiToken } from '../utils';

const fetchSearchResults = async <T>( query: Record<string, any>, path: string, config = {}):Promise<AggregatedPaginatedResult<T>> => {
  const queryString = new URLSearchParams(query).toString();
  const res = await axiosInstance.get(`${path}?${queryString}`, config);
  return res.data;
};

const useSearchFilter = <T>( query: Record<string, any>, path: string, config = {}) => {
  const queryKey = useMemo(() => (['searchResults', query, path, config] as const), [ query, path, config]);
  console.log("fetch lại", query, config);
  const { getToken } = useAuth();
  const queryResult = useQuery({
    queryKey,
    queryFn: async ({signal}) => {
      const token = await getToken();
      if(token){
        updateApiToken(token);
      }
      return fetchSearchResults<T>( query, path, {signal, ...config})
    },
    enabled: Boolean(query), // tránh gọi API nếu query rỗng
    // select: catchedPage,
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5, // tùy chỉnh thời gian cache
    gcTime: 1000 * 60 * 10
  });

  return { ...queryResult, queryKey };
};

export default useSearchFilter;
