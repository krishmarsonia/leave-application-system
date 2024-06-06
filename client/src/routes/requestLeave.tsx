import { useAuth } from "@clerk/clerk-react";
import { useState } from "react";
import { usePostCreateLeave } from "../hooks/leaveHooks/leaveHooks";
import { useNavigate } from "react-router-dom";
import CustomButton from "../components/button";

const RequestLeave = () => {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();
  if (isLoaded && !userId) {
    throw new Error("user not signed in");
  }
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentFormatedDate =
    currentDate.getFullYear() +
    "-" +
    (currentMonth < 9 ? "0" + currentMonth : currentMonth) +
    "-" +
    currentDate.getDate();
  const [selectedType, setSelectedType] = useState<
    "selectedHours" | "fullDay" | "SeveralDays"
  >("fullDay");
  const [fromTime, setFromTime] = useState("10:00");
  const [endTime, setEndTime] = useState("11:00");
  const [fromDate, setFromDate] = useState(currentFormatedDate);
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const { mutate } = usePostCreateLeave();

  const submitHandler = () => {
    let startMilliSec;
    let endMilliSec;
    let isError = false;
    if (selectedType === "selectedHours") {
      if (Number(fromTime.split(":")[0]) > Number(endTime.split(":")[0]))
        isError = true;
      const newStartDate = new Date(fromDate);
      newStartDate.setHours(Number(fromTime.split(":")[0]), 0, 0);
      const newEndDate = new Date(fromDate);
      newEndDate.setHours(Number(endTime.split(":")[0]), 0, 0);
      startMilliSec = newStartDate.getTime();
      endMilliSec = newEndDate.getTime();
    } else if (selectedType === "fullDay") {
      const newStartDate = new Date(fromDate);
      const newEndDate = new Date(fromDate);
      newStartDate.setHours(0, 0, 0, 0);
      newEndDate.setHours(23, 59, 59, 999);
      startMilliSec = newStartDate.getTime();
      endMilliSec = newEndDate.getTime();
    } else {
      const newStartDate = new Date(fromDate);
      const newEndDate = new Date(endDate);
      newStartDate.setHours(0, 0, 0, 0);
      newEndDate.setHours(23, 59, 59, 999);
      startMilliSec = newStartDate.getTime();
      endMilliSec = newEndDate.getTime();
    }
    if (startMilliSec > endMilliSec) isError = true;
    if (isError === false) {
      mutate(
        {
          employeeId: userId!,
          endDate: endMilliSec,
          leaveType: selectedType,
          reason: reason,
          startDate: startMilliSec,
        },
        {
          onSuccess: () => {
            navigate("/successLeave");
          },
        }
      );
    }
  };

  return (
    <div>
      <h1 className="text-2xl">Apply for Leave</h1>
      <p className="text-lg">
        You have <span className="text-mavrick font-bold">15 Leaves</span> in
        your account
      </p>
      <hr />
      {/* 3 top buttons */}
      <div className="flex justify-around items-center mt-7">
        <CustomButton
          custom={true}
          onClickHandler={() => setSelectedType("selectedHours")}
          extraClassName={`px-16 py-1.5 ${
            selectedType === "selectedHours"
              ? `bg-mavrick text-white`
              : `text-mavrick`
          }`}
        >
          Selected Hours
        </CustomButton>
        <CustomButton
          custom={true}
          onClickHandler={() => setSelectedType("fullDay")}
          extraClassName={`px-16 py-1.5 ${
            selectedType === "fullDay"
              ? `bg-mavrick text-white`
              : `text-mavrick`
          }`}
        >
          Full Day
        </CustomButton>
        <CustomButton
          custom={true}
          onClickHandler={() => setSelectedType("SeveralDays")}
          extraClassName={`px-16 py-1.5 ${
            selectedType === "SeveralDays"
              ? `bg-mavrick text-white`
              : `text-mavrick`
          }`}
        >
          Several Days
        </CustomButton>
      </div>

      <div className="flex justify-center items-center flex-col w-full">
        <div className="flex justify-between w-[37rem] mt-6">
          <div>
            <p className="font-medium">From Date</p>
            <input
              type="date"
              className="border border-black h-8 w-36 mt-1 px-1"
              min={currentFormatedDate}
              value={fromDate}
              onChange={(e) => {
                setFromDate(e.target.value);
              }}
            />
          </div>
          <div>
            <p className="font-medium">To Date</p>
            <input
              type="date"
              name=""
              id=""
              className="border border-black h-8 w-36 mt-1 px-1"
              min={currentFormatedDate}
              value={selectedType !== "SeveralDays" ? fromDate : endDate}
              disabled={selectedType !== "SeveralDays"}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-center w-[37rem] mt-8">
          {selectedType !== "selectedHours" ? null : (
            <div className="flex justify-between w-full">
              <div>
                <p>Start Time: </p>
                <input
                  type="time"
                  className="w-36"
                  value={fromTime}
                  onChange={(e) => {
                    const splitedHour = Number(e.target.value.split(":")[0]);
                    const splitedMinutes = Number(e.target.value.split(":")[1]);
                    if (splitedHour < 10) {
                      setFromTime("10:00");
                    } else if (splitedHour > 17) {
                      setFromTime("17:00");
                    } else {
                      setFromTime(e.target.value);
                    }
                    if (splitedMinutes !== 0) {
                      setFromTime(`${splitedHour}:00`);
                    }
                  }}
                />
              </div>
              <div>
                <p>End Time: </p>
                <input
                  type="time"
                  className="w-36"
                  name=""
                  id=""
                  value={endTime}
                  onChange={(e) => {
                    const splitedHour = Number(e.target.value.split(":")[0]);
                    const splitedMinutes = Number(e.target.value.split(":")[1]);
                    if (splitedHour < 11) {
                      setEndTime("11:00");
                    } else if (splitedHour > 18) {
                      setEndTime("18:00");
                    } else {
                      setEndTime(e.target.value);
                    }
                    if (splitedMinutes !== 0) {
                      setEndTime(`${splitedHour}:00`);
                    }
                  }}
                />
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-start w-[37rem] mt-7">
          <p className="font-medium">Reason</p>
          <textarea
            name="text-area"
            id="text-area"
            rows={3}
            className="w-full border-black border mt-1 px-1"
            onChange={(e) => {
              setReason(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center mt-5">
          <CustomButton onClickHandler={submitHandler}>Submit</CustomButton>
        </div>
      </div>
    </div>
  );
};

export default RequestLeave;
