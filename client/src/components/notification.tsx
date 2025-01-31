// import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { IoMdNotifications } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
// import { socket } from "../socket";
import { useChannel, useConnectionStateListener } from "ably/react";

import { notificationTimeCalculation } from "../../../server/src/util/timeCalculations";
import {
  useGetNotifications,
  useSetNotifications,
} from "../hooks/notifyHooks/notifyHook";
// import { AxiosResponse } from "axios";


const Notification = ({
  userId,
  isAdmin,
}: {
  userId: string;
  isAdmin: boolean;
}) => {
  // const location = useLocation();
  const [notificationOpen, setNotificationOpen] = useState<boolean>(false);
  const [openOnce, setOpenOnce] = useState(false);
  const { data, isLoading, isError, error, refetch } =
    useGetNotifications(userId);
  const { mutateAsync } = useSetNotifications();
  const refs = useRef<HTMLDivElement | null>(null);
  useConnectionStateListener("connected", () => {
    console.log("ably connected");
  });
  useChannel("leaveUpdated", `notification-isAdmin-${isAdmin}`, (message) => {
    console.log(message);
    refetch();
    // setMessages((prevMessage) => [...prevMessage, message]);
  });

  useChannel("leaveUpdated", `notify-user-${userId}`, (message) => {
    console.log(message);
    refetch();
  });

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (refs.current !== null) {
        if (
          e.target instanceof HTMLElement &&
          !refs.current!.contains(e.target)
        ) {
          setNotificationOpen(false);
        }
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [refs]);

  useEffect(() => {
    if (notificationOpen && !openOnce) {
      let tempSeen = false;
      data?.data.map((item) => {
        if (!item.seen) {
          tempSeen = true;
        }
      });
      if (tempSeen) {
        mutateAsync({ userId, data: { seen: true } });
      }
      setOpenOnce(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notificationOpen, openOnce]);

  useEffect(() => {
    setOpenOnce(false);
  }, [data?.data]);

  // useEffect(() => {
  //   socket.on("actionSuccess", (arg: { status: "accepted" | "rejected" }) => {
  //     if (arg.status === "accepted") {
  //       toast.success("Your leave application have been accepted");
  //     } else {
  //       toast.warn("Your leave application have been rejected");
  //     }
  //     refetch();
  //   });
  //   return () => {
  //     socket.off("actionSuccess", () => {
  //       console.log("actionSuccess is being removed");
  //     });
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  console.log(data);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    console.log(error);
    throw new Error("error has occured while fetching notifications");
  }
  return (
    <div ref={refs}>
      <div
        className="hover:cursor-pointer mt-0.5"
        onClick={() => setNotificationOpen(!notificationOpen)}
      >
        <IoMdNotifications size={25} />
        <NotificationCount data={data?.data} />
      </div>
      {notificationOpen ? (
        <div className="w-80 h-96 shadow-lg absolute top-13 right-[210px] bg-baylor rounded-lg border border-baylor">
          <h1 className="font-semibold py-2 px-1 text-mavrick">
            Notifications
          </h1>
          <hr />
          <div className="flex flex-col">
            {data?.data.map((noti) => {
              return noti.route ? (
                <Link
                  to={noti.route}
                  onClick={() => setNotificationOpen(false)}
                >
                  <div className="w-full border-2 border-baylor border-t-0 border-x-0 py-2 px-1 bg-knox">
                    <div className=" font-medium text-zurix">
                      {noti.message}
                    </div>
                    <div className="flex justify-end text-xs font-normal text-zurix">
                      {notificationTimeCalculation(noti.createdAt)}
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="w-full border-2 border-black border-t-0 border-x-0 py-2 px-1">
                  {noti.message}
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

const NotificationCount = ({
  data,
}: {
  data?: {
    message: string;
    opened: boolean;
    route?: string | undefined;
    seen: boolean;
    userId: string;
    _id: string;
  }[];
}) => {
  const oCount = data?.filter((item) => item.seen === false);
  return oCount?.length && oCount.length > 0 ? (
    <div className="relative bottom-9 left-3 border-red-600 bg-red-600 rounded-full w-6 text-center">
      {oCount.length}
    </div>
  ) : null;
};

export default Notification;
