import { useNavigate } from "react-router-dom";

import "./success.css";

const NotAdmin = () => {
  const navigate = useNavigate();
  return (
    <div className="absolute top-1/2 left-1/2 w-screen" id="centeradiv">
      <center>
        <h1 className="text-2xl h-full w-3/5 font-medium text-mavrick">
          Looks like you are not an Admin, Only Admins can see this page.
          <br />
          <br />
          Let's do a fresh start.
        </h1>
        <div className="mt-7">
          <button
            className="py-1.5 px-3 bg-mavrick text-white font-semibold rounded-lg border-mavrick border-2 hover:bg-white hover:text-mavrick"
            onClick={() => {
              navigate("/");
            }}
          >
            Go to Dashboard
          </button>
        </div>
      </center>
    </div>
  );
};

export default NotAdmin;
