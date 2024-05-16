import { ReactNode, useState } from "react";

import SocketContext from "./socketContext";
import { Socket } from "socket.io-client";

import DefaultEventsMap from "socket.io-client";

const SocketState = (props: { children: ReactNode }) => {
  const [socket, setSocket] = useState<
    Socket<typeof DefaultEventsMap, typeof DefaultEventsMap> | undefined
  >(undefined);

  return (
    <SocketContext.Provider value={{ socket, setSocket }}>
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketState;
