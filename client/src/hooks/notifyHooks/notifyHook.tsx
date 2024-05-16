import axios from "axios";
import { useQuery } from "react-query";

const getNotifyCount = async () => {
  const data = await axios.get("http://localhost:5000/notifyCount");
  console.log(data);
  return data;
};

export const useGetNotifyCount = () => {
  return useQuery("notifyCount", getNotifyCount, {
    refetchOnWindowFocus: false,
  });
};
