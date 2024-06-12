import * as React from "react";
import { toast } from "react-toastify";
import { useAuth } from "@clerk/clerk-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import LocationHistoryContext from "../context/locationHistory/locationHistoryContext";
import { useChannel } from "ably/react";

export default function DashboardLayout() {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();
  const { setLocationHistory } = React.useContext(LocationHistoryContext);
  const location = useLocation();

  React.useEffect(() => {
    if (isLoaded && !userId) {
      setLocationHistory(location.pathname);
      navigate("/sign-in");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  useChannel("leaveUpdated", `notify-user-${userId}`, (message) => {
    console.log(message);
    // setMessages((prevMessage) => [...prevMessage, message]);
    message.data.status === "accepted"
      ? toast.success("Your leave application has been accepted.")
      : toast.error("Your Leave application has been rejected.");
  });

  if (!isLoaded) return "Loading...";

  return <Outlet />;
}
