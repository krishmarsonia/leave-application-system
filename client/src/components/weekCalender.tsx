import DatePicker from "rsuite/DatePicker";

import "../styles/datePicker.less";
import "../styles/weekCalender.css";

const WeekCalender = (props: {
  weekObj: {
    date: Date;
    dateFrom: null | string;
    dateEnd: null | string;
  };
  changeHandler: (date: Date) => void;
}) => {
  const { weekObj } = props;
  return (
    <div >
      <DatePicker
        isoWeek
        shouldDisableDate={(date) => {
          return Date.now() < date.getTime() ? true : false;
        }}
        value={weekObj.date}
      />
    </div>
  );
};

export default WeekCalender;
