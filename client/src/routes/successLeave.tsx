import { Link } from "react-router-dom";

import "./success.css";

const SuccessLeave = () => {
  return (
    <div className="absolute top-1/2 left-1/2 w-screen" id="centeradiv">
      <center>
        <h1 className="text-2xl h-full w-3/5 font-medium text-mavrick">
          Your Leave application has been received. You will be notified once
          your leave is approved by the Admins.
          <br />
          <br />
          You can see the status of your leave here.
        </h1>
        <div className="mt-7">
          <Link
            className="py-1.5 px-3 bg-knox text-mavrick font-bold rounded-lg border-knox border hover:bg-mavrick hover:border-white hover:text-white"
            to={"/userLeaves"}
          >
            Leaves History
          </Link>
        </div>
      </center>
    </div>
  );
};

export default SuccessLeave;
