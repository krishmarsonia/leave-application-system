import moment from "moment";
import { useEffect, useState } from "react";

import WeekCalender from "../components/weekCalender";
import { useWeeklyPunch } from "../hooks/punchHooks/punchHooks";

const WeeklyPunches = () => {
  const [weekObj, setWeekObj] = useState<{
    date: Date;
    dateFrom: number;
    dateEnd: number;
  }>({
    date: new Date(),
    dateFrom: new Date(
      moment(new Date()).startOf("isoWeek").toString()
    ).getTime(),
    dateEnd: new Date(moment(new Date()).endOf("isoWeek").toString()).getTime(),
  });
  const { data, isLoading, isError, error, refetch } = useWeeklyPunch(
    weekObj.dateFrom,
    weekObj.dateEnd
  );

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weekObj]);
  const changehandler = (date: Date | null) => {
    console.log(date);
    const dateFrom = new Date(
      moment(date).startOf("isoWeek").toString()
    ).getTime();
    const dateEnd = new Date(
      moment(date).endOf("isoWeek").toString()
    ).getTime();
    if (date) {
      setWeekObj({
        date,
        dateFrom,
        dateEnd,
      });
    }
  };

  if (isLoading) {
    return <h1 className="text-xl">isLoading</h1>;
  }
  if (isError) {
    console.log(error);
    throw new Error("error occured while fetching the weekly punches data");
  }

  console.log(data);
  return (
    <div>
      <h1 className="text-2xl mb-4">Select Week</h1>
      <WeekCalender weekObj={weekObj} changeHandler={changehandler} />
      <table className="table-auto w-full border-2 border-black mt-5">
        <thead>
          <tr className="text-left">
            <th className="p-2 bg-baylor border-b border-white">UserName</th>
            <th className="p-2 bg-baylor border-b border-white">Total WorkHours</th>
            <th className="p-2 bg-baylor border-b border-white">LeaveDays</th>
          </tr>
        </thead>
        <tbody>
          {data?.data.map((da) => {
            return <tr key={da.userId}>
                <td className="p-2 border-b border-white">{da.userName}</td>
                <td className="p-2 border-b border-white">{da.workHours}</td>
                <td className="p-2 border-b border-white">{da.leaveDays}</td>

            </tr>
          })}
        </tbody>
      </table>
    </div>
  );
};

export default WeeklyPunches;
