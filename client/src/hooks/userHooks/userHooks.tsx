import { useQuery } from "@tanstack/react-query";

import axios from "../../util/axiosInstance";

const getTodaysBirthday = () => {
  return axios.get<
    { _id: string; name: string; birthday: number; profileImage: string }[]
  >("/getTodaysBirthday");
};

export const useGetTodaysBirthday = () => {
  return useQuery({
    queryKey: ["birthdays"],
    queryFn: getTodaysBirthday,
    refetchOnWindowFocus: false,
  });
};
