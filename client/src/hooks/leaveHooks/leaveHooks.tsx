import axios from "axios";
import { LeaveInterface } from "../../../../server/src/types/Leave";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Leaves } from "../../types/Leaves";

const postCreateLeave = (data: LeaveInterface) => {
  return axios.post<string>("http://localhost:5000/postCreateLeave", data);
};

export const usePostCreateLeave = () => {
  const queryClient = useQueryClient();
  return useMutation(postCreateLeave, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["userLeaves", data.data]);
    },
  });
};

const getLeaves = (userId: string) => {
  return axios.get<Leaves[]>(`http://localhost:5000/getLeaves/${userId}`, {
    withCredentials: true,
  });
};

export const useGetLeaves = (userId: string) => {
  return useQuery(["userLeaves", userId], () => getLeaves(userId), {
    refetchOnWindowFocus: false,
  });
};

const getAllLeavesList = () => {
  return axios.get<Leaves[]>("http://localhost:5000/getAllLeaves");
};

export const useGetAllLeaves = () => {
  return useQuery("allLeaves", () => getAllLeavesList(), {
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
  return useMutation(postActionOnLeave, {
    onSuccess: () => {
      queryClient.invalidateQueries("allLeaves");
    },
  });
};
