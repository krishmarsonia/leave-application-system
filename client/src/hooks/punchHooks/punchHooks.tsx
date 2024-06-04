import axios from "axios";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";

const putUpdatePunch = (data: {
  userId?: string;
  punchInTime?: number;
  punchOutTime?: number;
  date?: number;
}) => {
  return axios.put("http://localhost:5000/updatePunch", data);
};

export const usePutUpdatePunch = () => {
  return useMutation({ mutationFn: putUpdatePunch });
};

const postPunch = (data: { mode: "punch-in" | "punch-out" }) => {
  return axios.post("http://localhost:5000/punch", data, {
    withCredentials: true,
  });
};

export const usePostPunch = () => {
  return useMutation({ mutationFn: postPunch });
};

const getPunchDisplay = ({ pageParam }: { pageParam: number }) => {
  return axios.get<{
    data: {
      userId: {
        email: string;
        externalId: string;
        isAdmin: boolean;
        leaves_remaining: number;
        name: string;
        profileImage: string;
        _id: string;
      };
      punchInTime: number;
      punchOutTime: number;
      _id: string;
    }[];
    currentPage: number;
    nextPage: number;
  }>(`http://localhost:5000/punchDisplay/${pageParam}`);
};

export const usePunchDisplay = () => {
  return useInfiniteQuery({
    queryKey: ["punches"],
    queryFn: getPunchDisplay,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.data.nextPage,
  });
};
