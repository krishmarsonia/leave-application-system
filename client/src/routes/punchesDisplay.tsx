import { useInView } from "react-intersection-observer";

import { usePunchDisplay } from "../hooks/punchHooks/punchHooks";
import React, { useEffect } from "react";

const PunchesDisplay = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    status,
    fetchNextPage,
    hasNextPage,
  } = usePunchDisplay();
  const { inView, ref } = useInView();
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);
  if (isLoading) {
    return "Loading...";
  }
  if (isError) {
    console.log(error);
    throw new Error("error occured in usePunchDisplay");
  }
  return status === "pending" ? (
    <div>Loading...</div>
  ) : (
    <div>
      <table className="table-auto w-full border-2 border-black rounded-lg">
        <thead>
          <tr className="border">
            <th className="p-2  text-left bg-baylor border-b border-white">Name</th>
            <th className="p-2  text-left bg-baylor border-b border-white">PunchIn Time</th>
            <th className="p-2  text-left bg-baylor border-b border-white">PunchOut time</th>
            <th className="p-2  text-left bg-baylor border-b border-white">On Leave</th>
          </tr>
        </thead>
        <tbody>
          {data.pages.map((page) => {
            return (
              <React.Fragment key={page.data.currentPage}>
                {page.data.data.map((da) => {
                  const tempPunchInTime = new Date(da.punchInTime);
                  const tempPunchOutTime = new Date(da.punchOutTime);
                  const punchIn =
                    tempPunchInTime.getHours() +
                    ":" +
                    (tempPunchInTime.getMinutes() < 10
                      ? "0" + tempPunchInTime.getMinutes()
                      : tempPunchInTime.getMinutes()) +
                    " at " +
                    tempPunchInTime.getDate() +
                    "/" +
                    (tempPunchInTime.getMonth() + 1) +
                    "/" +
                    tempPunchInTime.getFullYear();
                  const punchOut =
                    tempPunchOutTime.getHours() +
                    ":" +
                    (tempPunchOutTime.getMinutes() < 10
                      ? "0" + tempPunchOutTime.getMinutes()
                      : tempPunchOutTime.getMinutes()) + " at " +
                    tempPunchOutTime.getDate() +
                    "/" +
                    (tempPunchOutTime.getMonth() + 1) +
                    "/" +
                    tempPunchOutTime.getFullYear();
                  // console.log(da);
                  return (
                    <tr key={da._id} className="border">
                      <td className="p-2 border-b border-white">{da.userId.name}</td>
                      <td className="p-2 border-b border-white">
                        {da.punchInTime !== 0 ? punchIn : "didn't punch-in"}
                      </td>
                      <td className="p-2 border-b border-white">
                        {da.punchOutTime !== 0 ? punchOut : "didn't punch-out"}
                      </td>
                      <td className="p-2 border-b border-white">
                        {da.punchInTime === 0 ? "Yes" : "No"}
                      </td>
                    </tr>
                  );
                })}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
      {hasNextPage === true ? <div ref={ref}>Loading...</div> : null}
    </div>
  );
  // return (
  //     <div>

  //     </div>
  // );
};

export default PunchesDisplay;
