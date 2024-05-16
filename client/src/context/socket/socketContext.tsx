import { createContext } from "react";
import { Socket } from "socket.io-client";
import DefaultEventsMap from "socket.io-client";

const SocketContext = createContext<{
  socket: Socket<typeof DefaultEventsMap, typeof DefaultEventsMap> | undefined;
  setSocket: React.Dispatch<
    React.SetStateAction<
      Socket<typeof DefaultEventsMap, typeof DefaultEventsMap> | undefined
    >
  >;
}>({ socket: undefined, setSocket: () => null });

export default SocketContext;
