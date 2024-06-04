import { useInView } from "react-intersection-observer";

import { usePunchDisplay } from "../hooks/punchHooks/punchHooks";
import { useEffect } from "react";

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
      <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>PunchIn Time</th>
            </tr>
        </thead>
        {data.pages.map((page) => {
          return (
            <div key={page.data.currentPage}>
              {page.data.data.map((da) => {
                const tempPunchInTime = new Date(da.punchInTime);
                const punchIn =
                  tempPunchInTime.getDate() +
                  "/" +
                  (tempPunchInTime.getMonth() + 1) +
                  "/" +
                  tempPunchInTime.getFullYear();
                console.log(da);
                return (
                  <div key={da._id}>
                    <div className="h-1/3">Punch In Time: {punchIn}</div>
                    <div className="h-1/3">
                      Punch Out Time: {da.punchOutTime}
                    </div>
                    <div className="h-1/3">UserId: {da.userId.name}</div>
                  </div>
                );
              })}
            </div>
          );
        })}
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
