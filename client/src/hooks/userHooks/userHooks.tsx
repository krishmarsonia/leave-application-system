import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getTodaysBirthday = () => {
  return axios.get<{_id: string, name: string, birthday: number, profileImage: string}[]>("http://localhost:5000/getTodaysBirthday");
};

export const useGetTodaysBirthday = () => {
  return useQuery({
    queryKey: ["birthdays"],
    queryFn: getTodaysBirthday,
    refetchOnWindowFocus: false,
  });
};
