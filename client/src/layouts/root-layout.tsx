import { Link, Outlet } from "react-router-dom";
import {
  // ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
  useAuth,
} from "@clerk/clerk-react";
import { socket } from "../socket";
// import { io } from "socket.io-client";
// import { useContext } from "react";
// import { useContext } from "react";
// import SocketContext from "../context/socket/socketContext";
import SocketState from "../context/socket/socketState";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Publishable key missing");
}

export default function RootLayout() {
  const { userId } = useAuth();
  // const { setSocket } = useContext(SocketContext);

  if (userId) {
    socket.disconnect();
    socket.io.opts.query = {userId: userId}
    socket.connect();
  }
  return (
    // <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <>
      <SocketState>
        <header>
          <div>
            <p>Test</p>
          </div>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Link to={"/sign-in"}>Sign In</Link>
          </SignedOut>
        </header>
        <main>
          <Outlet />
        </main>
      </SocketState>
    </>
    // </ClerkProvider>
  );
}
