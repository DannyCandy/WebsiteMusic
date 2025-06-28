// import { useEffect, useState } from "react";
// import { axiosInstance } from "../axios";

// const useSearchFilter = (path: string, query: string, config = {}) => {
//     const [data, setData] = useState<object[]>([]);
//     useEffect(() => {
//         const fetchListData = async () => {
//             const queryString = new URLSearchParams(query).toString();
//             const res = await axiosInstance.get(`${path}/search?${queryString}`, config);
//             console.log(res.data);
//             setData(res.data[path]);
//         }
//         fetchListData();
//     }, [path, JSON.stringify(query), JSON.stringify(config)]);
//     return data;
// }
// export default useSearchFilter
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../axios';
import { URLSearchParams } from 'url';
import { AggregatedPaginatedResult, Song } from '@/types';

const fetchSearchResults = async (path: string, query: Record<string, any>, config = {}):Promise<AggregatedPaginatedResult<Song>> => {
  const queryString = new URLSearchParams(query).toString();
  const res = await axiosInstance.get(`${path}/search?${queryString}`, config);
  return res.data;
};

const useSearchFilter = (path: string, query: Record<string, any>, config = {}) => {
  const queryKey = ['searchResults', path, query, config];

  return useQuery({
    queryKey,
    queryFn: () => fetchSearchResults(path, query, config),
    enabled: Boolean(query), // tránh gọi API nếu query rỗng
    staleTime: 1000 * 60, // tùy chỉnh thời gian cache
  });
};

export default useSearchFilter;
