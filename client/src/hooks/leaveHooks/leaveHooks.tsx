import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Leaves } from "../../types/Leaves";
import { LeaveInterface } from "../../../../server/src/types/Leave";

const postCreateLeave = (data: LeaveInterface) => {
  return axios.create({baseURL: "/"}).post<string>("/postCreateLeave", data);
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
  return axios.get<Leaves[]>(`http://localhost:5000/getLeaves/${userId}`, {
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
  return axios.get<Leaves[]>("http://localhost:5000/getAllLeaves");
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
    "http://localhost:5000/postActionOnLeave",
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
