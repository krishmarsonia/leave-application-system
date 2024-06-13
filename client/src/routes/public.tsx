import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../components/button";

const Public = () => {
  const navigate = useNavigate();
  return (
    <div
      className="absolute top-1/2 left-1/2 w-screen font-semibold"
      id="centeradiv"
    >
      <center>
        <div>
          <h3 className="text-2xl">Welcome to</h3>
        </div>
        <Link to={"https://www.thetetraddigitech.com/"} target="_blank">
        <div className="mb-5 mt-3">
          <h1 className="text-6xl">The Tetrad Digitech</h1>
          <h1 className="text-2xl">A Creative Branding Agency</h1>
        </div>
        </Link>
        
        <div>
          <h3 className="text-3xl">Leave Management System</h3>
        </div>
        <div className="flex gap-5 justify-center my-6">
          <div>
            <CustomButton onClickHandler={() => {navigate("/requestLeave")}}>
              Apply for Leave
            </CustomButton>
          </div>
          <div>
            <CustomButton onClickHandler={() => {}}>
              Apply for a job
            </CustomButton>{" "}
          </div>
          <div>
            <CustomButton onClickHandler={() => {navigate("/private")}}>
              Punch for the day
            </CustomButton>
          </div>
        </div>
      </center>
    </div>
  );
};

export default Public;
