// import { useEffect, useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import { socket } from "./socket";
// import { useGetNotifyCount } from "./hooks/notifyHooks/notifyHook";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

function App() {
  // const [count] = useState(0);
  // const { data, isLoading, isError, error, refetch } = useGetNotifyCount();
  const { userId } = useAuth();
  const navigate = useNavigate();
  // const {socket} = useContext(SocketContext);
  if (!userId) {
    navigate("/")
  }
  if (!socket) {
    throw new Error("socket not found");
  }
  // useEffect(() => {
  //   socket.on("connect", () => {
  //     console.log("connected");
  //   });
  //   socket.on("disconnect", () => {
  //     console.log("disconnected");
  //   });
  //   socket.on("notifySuccess", () => {
  //     console.log("first");
  //     refetch();
  //   });
  //   return () => {
  //     socket.off("connect", () => {
  //       console.log("connected");
  //     });
  //     socket.off("disconnect", () => {
  //       console.log("disconnected");
  //     });
  //     socket.off("notifySuccess", () => {
  //       console.log("first connected");
  //     });
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // if (isLoading) {
  //   return <h1>Loading...</h1>;
  // }
  // if (isError) {
  //   console.log(error);
  //   return <h1>Something went wrong</h1>;
  // }

  return (
    <>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className="text-7xl">Vite + React</h1>
      <div className="card">
        <button onClick={() => socket.emit("notify", "user_2gUau7YzJhUvI39X6iQDhDrrk34")}>
          click
        </button>
        <br />
        <p>{count}</p>
        <p>DBCount: {data?.data}</p>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <button onClick={() => {
        navigate("/private")
      }}>Let's go to private</button> */}
    </>
  );
}

export default App;
