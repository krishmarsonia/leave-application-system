import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import axios from "../../util/axiosInstance";

const getNotifications = (userId: string) => {
  return axios.get<
    {
      message: string;
      opened: boolean;
      route?: string;
      seen: boolean;
      userId: string;
      _id: string;
      createdAt: string;
      updatedAt: string;
    }[]
  >(`/getNotifications/${userId}`);
};

export const useGetNotifications = (userId: string) => {
  return useQuery({
    queryKey: ["userNotification"],
    queryFn: () => getNotifications(userId),
    refetchOnWindowFocus: false,
  });
};

const setNotifications = (data: {
  userId: string;
  data: {
    message?: string;
    opened?: boolean;
    route?: string;
    seen?: boolean;
    userId?: string;
    _id?: string;
  };
}) => {
  return axios.put(
    "/setNotifications/" + data.userId,
    data.data
  );
};

export const useSetNotifications = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: setNotifications,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userNotification"] });
    },
  });
};
