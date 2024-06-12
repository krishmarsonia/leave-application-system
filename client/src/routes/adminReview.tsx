import { isEmployeeIdAUser } from "../types/Leaves";
import {
  useGetAllLeaves,
  usePostActionOnLeave,
} from "../hooks/leaveHooks/leaveHooks";

const AdminReview = () => {
  const { data, isLoading, isError, error } = useGetAllLeaves();
  const { mutate } = usePostActionOnLeave();
  if (isLoading) {
    return <h1>Loading....</h1>;
  }
  if (isError) {
    console.log(error);
    throw new Error("error occurred");
  }
  return (
    <div>
      <h1 className="text-center text-2xl text-mavrick font-semibold">Leaves Action Center</h1>
      {data?.data.map((leave) => {
        const tempStartDate = new Date(leave.startDate);
        const tempEndDate = new Date(leave.endDate);
        const tempCreatedAt = new Date(leave.createdAt);
        const startTime = tempStartDate.getHours() + ":00";
        const endTime = tempEndDate.getHours() + ":00";
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
        const appliedOn =
          tempCreatedAt.getDate() +
          "/" +
          tempCreatedAt.getMonth() +
          "/" +
          tempCreatedAt.getFullYear();
        return (
          <div className="flex border my-3 bg-baylor shadow-sm rounded-md mx-auto">
            <div className="w-3/12 flex justify-center items-center flex-col">
              <img
                className="rounded-full w-20 h-20"
                src={
                  isEmployeeIdAUser(leave.employeeId)
                    ? leave.employeeId.profileImage
                    : ""
                }
                alt="profile picture"
              />
              <h1 className="mt-3 font-semibold">
                {isEmployeeIdAUser(leave.employeeId)
                  ? leave.employeeId.name
                  : ""}
              </h1>
            </div>
            <div className="flex flex-col items-center w-9/12">
              <div className=" flex flex-wrap">
                {/* <div className="my-2" style={{ flex: "50%" }}>
                User:
                <span className="font-medium">
                  {"  " +
                    (isEmployeeIdAUser(leave.employeeId)
                      ? leave.employeeId.name
                      : "")}
                </span>
              </div> */}
                <div className="my-2 w-1/2">
                  Leave type:
                  <span className="font-medium">
                    {"   "}
                    {leave.leaveType === "selectedHours"
                      ? "Selected Hours"
                      : leave.leaveType === "fullDay"
                      ? "Full Day"
                      : "Several Days"}
                  </span>
                </div>
                <div className="my-2 w-1/2">
                  Status:
                  <span className="font-medium">
                    {" "}
                    {"   "}
                    {!leave.cancelled && !leave.approved
                      ? "   Pending"
                      : leave.approved
                      ? "   Approved"
                      : "   Cancelled"}
                  </span>
                </div>
                {leave.leaveType === "selectedHours" ? (
                  <>
                    <div className="my-2 w-1/2">
                      Start Time:{" "}
                      <span className="font-medium">
                        {"   "}
                        {startTime}
                      </span>
                    </div>
                    <div className="my-2 w-1/2">
                      End Time:
                      <span className="font-medium">
                        {"   "}
                        {endTime}
                      </span>
                    </div>
                  </>
                ) : null}

                <div className="my-2 w-1/2">
                  Start Date:
                  <span className="font-medium">
                    {"   "}
                    {startDate}
                  </span>
                </div>
                <div className="my-2 w-1/2">
                  End Date:
                  <span className="font-medium">
                    {"   "}
                    {endDate}
                  </span>
                </div>
                <div className="my-2 w-1/2">
                  Applied for:
                  <span className="font-medium">
                    {"   "}
                    {leave.reason}
                  </span>
                </div>
                <div className="my-2 w-1/2">
                  Applied on:
                  <span className="font-medium">
                    {"   "}
                    {appliedOn}
                  </span>
                </div>
              </div>
              <div className="justify-end w-11/12 m-3 flex mt-8 mr-10">
                <div className="mx-2">
                  <button
                    className="text-green-600 border-2 border-green-600 rounded-md font-medium hover:bg-green-600 hover:text-white py-1 px-2"
                    onClick={() => {
                      mutate({
                        leaveId: leave._id,
                        approve: true,
                      });
                    }}
                  >
                    Approve
                  </button>
                </div>
                <div className="mx-2">
                  <button
                    className="text-red-600 border-2 border-red-600 rounded-md font-medium hover:bg-red-600 hover:text-white py-1 px-2"
                    onClick={() => {
                      mutate({
                        leaveId: leave._id,
                        approve: false,
                      });
                    }}
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdminReview;
