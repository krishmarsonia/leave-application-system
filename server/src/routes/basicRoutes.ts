import { Server, Socket } from "socket.io";
import io from "../app";
import Notification from "../model/Notification";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

const sleep = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

// io.on("notify", async () => {
//   //   await Notification.create({ tempCountArr: ["a"] });
//   console.log("hii there");
//   await sleep(2000);

//   io.emit("notifySuccess", { status: "success" });
// });

const sideFunc = async (
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
  socket.on("notify", async (data: string) => {
    console.log("22",data);
    console.log("niceeee!!");
    // await Notification.create({ tempCountArr: ["a"] });
    await Notification.findOneAndUpdate(
      { _id: "6642f5ffa7cf5e0080a43229" },
      { $push: { tempCountArr: "b" } }
    );
    io.to(data).emit("notifySuccess", { status: "Success" });
  });
};

export default sideFunc;
