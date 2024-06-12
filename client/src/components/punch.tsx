import { toast } from "react-toastify";

import { usePostPunch } from "../hooks/punchHooks/punchHooks";

const Punch = () => {
  const { mutateAsync } = usePostPunch();
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const punchClickHandler = (mode: "punch-in" | "punch-out") => {
    const punchInResult = mutateAsync({ mode: mode });
    toast.promise(punchInResult, {
      pending: {
        render() {
          return mode === "punch-in" ? "Punching-In" : "Punching-Out";
        },
      },
      success: {
        render({ data }) {
          if (data.data.message) {
            return `${data.data.message}`;
          } else {
            return `Noted! ${
              mode === "punch-in"
                ? `You are punched-in. You can start your work`
                : `You are punched-out. You can enjoy rest of your day.`
            }`;
          }
        },
      },
      error: {
        render({ data }) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const errorData: any = data;
          if (errorData.response) {
            return `${errorData.response.data.message}`;
          } else {
            return `something went wrong`;
          }
        },
      },
    });
  };
  return currentDay !== 0 ? (
    <fieldset className="border border-mavrick border-solid w-1/2">
      <legend className="ml-4 text-mavrick">Attendence</legend>
      <div className="flex justify-center items-center gap-32 m-10">
        <div>
          <button
            className="px-11 py-7 border-2 border-green-600 rounded-lg text-white bg-green-600 hover:bg-white hover:text-green-600 font-semibold"
            onClick={() => punchClickHandler("punch-in")}
          >
            Punch-in
          </button>
        </div>
        <div>
          <button
            className="px-11 py-7 border border-yellow-500 rounded-lg text-white bg-yellow-500 hover:bg-white hover:text-yellow-500 font-semibold"
            onClick={() => punchClickHandler("punch-out")}
          >
            Punch-out
          </button>
        </div>
      </div>
    </fieldset>
  ) : null;
};

export default Punch;
