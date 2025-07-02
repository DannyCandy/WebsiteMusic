import {  keepPreviousData, useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../axios';
import { AggregatedPaginatedResult, Song } from '@/types';
import { useMemo } from 'react';

// const fetchSearchResults = async (path: string, query: Record<string, any>, config = {}):Promise<AggregatedPaginatedResult<Song>> => {
//   const queryString = new URLSearchParams(query).toString();
//   const res = await axiosInstance.get(`${path}/search?${queryString}`, config);
//   return res.data;
// };

// const useSearchFilter = (path: string, query: Record<string, any>, config = {}) => {
//   const queryKey = useMemo(() => (['searchResults', path, query, config] as const), [path, query, config]);
//   console.log("fetch lại", query, path, config);
//   const queryResult = useQuery({
//     queryKey,
//     queryFn: ({signal}) => fetchSearchResults(path, query, {signal, ...config}),
//     enabled: Boolean(query), // tránh gọi API nếu query rỗng
//     staleTime: 1000 * 60, // tùy chỉnh thời gian cache
//   });

//   return { ...queryResult, queryKey };
// };
const fetchSearchResults = async ( query: Record<string, any>, config = {}):Promise<AggregatedPaginatedResult<Song>> => {
  const queryString = new URLSearchParams(query).toString();
  const res = await axiosInstance.get(`/songs/search?${queryString}`, config);
  return res.data;
};

const useSearchFilter = ( query: Record<string, any>, config = {}) => {

  // const catchedPage = useCallback((data: any):any => ({
  //   // catch để thanh page không rerender
  //   totalPageCatched: data.totalPages,
  // }), []);

  const queryKey = useMemo(() => (['searchResults', query, config] as const), [ query, config]);
  console.log("fetch lại", query, config);
  const queryResult = useQuery({
    queryKey,
    queryFn: ({signal}) => fetchSearchResults( query, {signal, ...config}),
    enabled: Boolean(query), // tránh gọi API nếu query rỗng
    // select: catchedPage,
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 2, // tùy chỉnh thời gian cache
  });

  return { ...queryResult, queryKey };
};

export default useSearchFilter;
