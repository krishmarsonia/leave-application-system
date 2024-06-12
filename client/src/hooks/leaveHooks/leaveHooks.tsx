import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Leaves } from "../../types/Leaves";
import axios from "../../util/axiosInstance";
import { LeaveInterface } from "../../../../server/src/types/Leave";

// const axiosInstance = axios.create({ baseURL: "/" });

const postCreateLeave = (data: LeaveInterface) => {
  return axios.post<string>("/postCreateLeave", data);
};

export const usePostCreateLeave = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postCreateLeave,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["userLeaves", data.data] });
    },
  });
};

const getLeaves = (userId: string) => {
  return axios.get<Leaves[]>(`/getLeaves/${userId}`, {
    withCredentials: true,
  });
};

export const useGetLeaves = (userId: string) => {
  return useQuery({
    queryKey: ["userLeaves", userId],
    queryFn: () => getLeaves(userId),
    refetchOnWindowFocus: false,
  });
};

const getAllLeavesList = () => {
  return axios.get<Leaves[]>("/getAllLeaves");
};

export const useGetAllLeaves = () => {
  return useQuery({
    queryKey: ["allLeaves"],
    queryFn: () => getAllLeavesList(),
    refetchOnWindowFocus: true,
  });
};

const postActionOnLeave = (data: {
  leaveId: string | null;
  approve: boolean;
}) => {
  console.log(42, data);
  return axios.post(
    "/postActionOnLeave",
    { data: data },
    { withCredentials: true }
  );
};

export const usePostActionOnLeave = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postActionOnLeave,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allLeaves"] });
    },
  });
};
