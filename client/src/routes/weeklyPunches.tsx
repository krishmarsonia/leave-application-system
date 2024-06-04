import { useState } from "react";
import moment from "moment";

import WeekCalender from "../components/weekCalender";


const WeeklyPunches = () => {
    const [weekObj, setWeekObj] = useState<{date: Date, dateFrom: null| string, dateEnd: null | string}>({
        date: new Date(),
        dateFrom: null,
        dateEnd: null,
    });

    const changehandler = (date: Date) => {
        const dateFrom = moment(date).startOf("isoWeek").toString();
        const dateEnd = moment(date).endOf("isoWeek").toString();

        setWeekObj({
            date, dateFrom, dateEnd
        })
    }
    return (
        <div>
            <WeekCalender weekObj={weekObj} changeHandler={changehandler}/>
        </div>
    );
};

export default WeeklyPunches;