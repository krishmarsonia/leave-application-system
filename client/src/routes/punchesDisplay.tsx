import { useInView } from "react-intersection-observer";

import { usePunchDisplay } from "../hooks/punchHooks/punchHooks";
import React, { useEffect } from "react";
import {
  getDateFromMilliSeconds,
  getTimeFromMilliSeconds,
} from "../util/timeCalculation";

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
  console.log(data);
  return status === "pending" ? (
    <div>Loading...</div>
  ) : (
    <div>
      <table className="table-auto w-full border-2 border-black rounded-lg">
        <thead>
          <tr className="border">
            <th className="p-2 text-left bg-baylor border-b border-white">
              Name
            </th>
            <th className="p-2 text-left bg-baylor border-b border-white">
              PunchIn Time
            </th>
            <th className="p-2 text-left bg-baylor border-b border-white">
              PunchOut time
            </th>
            <th className="p-2 text-left bg-baylor border-b border-white">
              On Leave
            </th>
            <th className="p-2 text-left bg-baylor border-b border-white">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {data.pages.map((page) => {
            return (
              <React.Fragment key={page.data.currentPage}>
                {page.data.data.map((da) => {
                  const punchIn = getTimeFromMilliSeconds(da.punchInTime);
                  const punchOut = getTimeFromMilliSeconds(da.punchOutTime);
                  const punchDate = getDateFromMilliSeconds(da.date);
                  // console.log(da);
                  return (
                    <tr key={da._id} className="border">
                      <td className="p-2 border-b border-white">
                        {da.userId.name}
                      </td>
                      <td className="p-2 border-b border-white">
                        {da.punchInTime !== 0 ? punchIn : "didn't punch-in"}
                      </td>
                      <td className="p-2 border-b border-white">
                        {da.punchOutTime !== 0 ? punchOut : "didn't punch-out"}
                      </td>
                      <td className="p-2 border-b border-white">
                        {da.isOnLeave ? "Yes" : "No"}
                      </td>
                      <td className="p-2 border-b border-white">{punchDate}</td>
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
};

export default PunchesDisplay;
