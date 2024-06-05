import DatePicker from "rsuite/DatePicker";

import "../styles/datePicker.less";
import "../styles/weekCalender.css";

const WeekCalender = (props: {
  weekObj: {
    date: Date;
    dateFrom: number;
    dateEnd: number;
  };
  changeHandler: (date: Date | null) => void;
}) => {
  const { weekObj, changeHandler } = props;
  return (
    <div>
      <DatePicker
        isoWeek
        shouldDisableDate={(date) => {
          return Date.now() < date.getTime() ? true : false;
        }}
        value={weekObj.date}
        onChange={changeHandler}
      />
    </div>
  );
};

export default WeekCalender;
