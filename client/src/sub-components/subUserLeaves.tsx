// import { useEffect } from "react";
import { useChannel } from "ably/react";
import { useGetLeaves } from "../hooks/leaveHooks/leaveHooks";
// import { socket } from "../socket";
import { isApprovedByAUser } from "../types/Leaves";

const SubUserLeaves = (props: { userId: string }) => {
  const { userId } = props;
  const { data, isLoading, isError, error, refetch } = useGetLeaves(userId);
  console.log(data);

  useChannel("leaveUpdated", `notify-user-${userId}`, (message) => {
    console.log(message);
    refetch();
  });

  // useEffect(() => {
  //   socket.on("actionSuccess", () => {
  //     refetch();
  //   });
  //   return () => {
  //     socket.off("actionSuccess", () => {
  //       console.log("actionSuccess is being removed");
  //     });
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    console.log(error);
    throw new Error("unable to fetch leaves");
  }
  if (data!.data.length === 0) {
    return (
      <h1 className="text-center text-3xl">
        Seems, like you don't have any previous leaves. Apply for a leave and
        the status of the leave will be visible here.
      </h1>
    );
  }
  return (
    <div>
      <h1 className="text-center text-3xl text-mavrick font-semibold">
        All Your Leaves Status
      </h1>{" "}
      <br />
      <table className="table-fixed border w-full">
        <thead>
          <tr>
            <th className="p-5 border text-center bg-knox">Leave Type</th>
            <th className="p-5 border text-center bg-knox">Start Date</th>
            <th className="p-5 border text-center bg-knox">End Date</th>
            <th className="p-5 border text-center bg-knox">Start Time</th>
            <th className="p-5 border text-center bg-knox">End Time</th>
            <th className="p-5 border text-center bg-knox">Reason</th>
            <th className="p-5 border text-center bg-knox">Status</th>
            <th className="p-5 border text-center bg-knox">ApprovedBy</th>
          </tr>
        </thead>
        <tbody>
          {data?.data.map((leave) => {
            const tempStartDate = new Date(leave.startDate);
            const tempEndDate = new Date(leave.endDate);
            const tempStartTime = new Date(leave.startDate);
            const tempEndTime = new Date(leave.endDate);
            const startDate =
              tempStartDate.getDate() +
              "/" +
              tempStartDate.getMonth() +
              "/" +
              tempStartDate.getFullYear();
            const endDate =
              tempEndDate.getDate() +
              "/" +
              tempEndDate.getMonth() +
              "/" +
              tempEndDate.getFullYear();
            const startTime = tempStartTime.getHours() + ":00";
            const endTime = tempEndTime.getHours() + ":00";
            return (
              <tr key={leave._id}>
                <td className="p-5 border text-center bg-baylor">
                  {leave.leaveType}
                </td>
                <td className="p-5 border text-center bg-baylor">
                  {startDate}
                </td>
                <td className="p-5 border text-center bg-baylor">{endDate}</td>
                <td className="p-5 border text-center bg-baylor">
                  {leave.leaveType === "selectedHours" ? startTime : "10:00"}
                </td>
                <td className="p-5 border text-center bg-baylor">
                  {leave.leaveType === "selectedHours" ? endTime : "06:00"}
                </td>
                <td className="p-5 border text-center bg-baylor">
                  {leave.reason}
                </td>
                <td className="p-5 border text-center bg-baylor">
                  {leave.approved
                    ? "Approved"
                    : leave.cancelled
                    ? "Cancelled"
                    : "Pending"}
                </td>
                <td className="p-5 border text-center bg-baylor">
                  {leave.approvedBy
                    ? isApprovedByAUser(leave.approvedBy)
                      ? leave.approvedBy.name
                      : null
                    : ""}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SubUserLeaves;
