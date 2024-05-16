import SocketState from "../context/socket/socketState";
import { Outlet } from "react-router-dom";

const ContextLayout = () => {
  return (
    <SocketState>
      <Outlet />
    </SocketState>
  );
};

export default ContextLayout;
