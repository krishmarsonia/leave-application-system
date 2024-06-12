import { useContext } from "react";
import { SignIn } from "@clerk/clerk-react";

import LocationHistoryContext from "../context/locationHistory/locationHistoryContext";

const SignInPage = () => {
  const { locationHistory } = useContext(LocationHistoryContext);
  return (
    <div className="flex justify-center items-center">
      <SignIn fallbackRedirectUrl={locationHistory} path="/sign-in" />
    </div>
  );
};

export default SignInPage;
