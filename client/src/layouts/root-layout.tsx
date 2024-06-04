import { Link, Outlet } from "react-router-dom";
import {
  // ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
  useAuth,
  useUser,
} from "@clerk/clerk-react";
import { socket } from "../socket";
import LocationHistoryState from "../context/locationHistory/locationHistoryState";
import { useEffect } from "react";
import { ErrorBoundary } from "../ErrorBoundary";
import Notification from "../components/notification";
import { Bounce, ToastContainer } from "react-toastify";
// import { io } from "socket.io-client";
// import { useContext } from "react";
// import { useContext } from "react";
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Publishable key missing");
}

export default function RootLayout() {
  const { userId, isLoaded } = useAuth();
  const { user } = useUser();

  let isAdmin = false;
  // const { setSocket } = useContext(SocketContext);

  useEffect(() => {
    const preferedDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    document.documentElement.classList.toggle("dark", preferedDarkMode);
  }, []);

  if (isLoaded && userId) {
    socket.disconnect();
    socket.io.opts.query = { userId: userId };
    socket.connect();
  }
  if (isLoaded) {
    if (userId) {
      if (user?.publicMetadata.isAdmin) {
        isAdmin = true;
      } else {
        isAdmin = false;
      }
    }
  }
  return (
    // <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <>
      <LocationHistoryState>
        <header>
          <div className="flex justify-between items-center mx-36 mt-5">
            <div className="flex gap-16">
              <div>
                <Link to={"/"}>
                  <p className="font-semibold">Home</p>
                </Link>
              </div>
              <div>
                <Link to={"/requestLeave"}>
                  <p className="font-semibold">Apply for leave</p>
                </Link>
              </div>
              <div>
                <p className="font-semibold">Upcoming Leaves</p>
              </div>
              {isAdmin ? (
                <div>
                  <p className="font-semibold">Leave History</p>
                </div>
              ) : null}
            </div>
            <div>
              <SignedIn>
                <div className="flex gap-10">
                  <div>
                    <Notification userId={userId!} />
                  </div>
                  <div>
                    <UserButton />
                  </div>
                </div>
              </SignedIn>
              <SignedOut>
                <Link to={"/sign-in"}>Sign In</Link>
              </SignedOut>
            </div>
          </div>
          {user?.firstName ? (
            <p className="float-end mr-36 font-semibold">
              Welcome back, {user.firstName}
            </p>
          ) : null}
        </header>
        <main className="mt-16 mx-36">
          <ErrorBoundary>
            <Outlet />
            <ToastContainer
              position="top-right"
              autoClose={2700}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss={false}
              draggable
              pauseOnHover={false}
              theme="colored"
              transition={Bounce}
            />
          </ErrorBoundary>
        </main>
      </LocationHistoryState>
    </>
    // </ClerkProvider>
  );
}
