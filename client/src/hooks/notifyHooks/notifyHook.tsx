import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

const getNotifications = (userId: string) => {
  return axios.get<
    {
      message: string;
      opened: boolean;
      route?: string;
      seen: boolean;
      userId: string;
      _id: string;
    }[]
  >(`http://localhost:5000/getNotifications/${userId}`);
};

export const useGetNotifications = (userId: string) => {
  return useQuery("userNotification", () => getNotifications(userId), {
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
    "http://localhost:5000/setNotifications/" + data.userId,
    data.data
  );
};

export const useSetNotifications = () => {
  const queryClient = useQueryClient();
  return useMutation(setNotifications, {onSuccess: () => {
    queryClient.invalidateQueries("userNotification");
  }});
};
