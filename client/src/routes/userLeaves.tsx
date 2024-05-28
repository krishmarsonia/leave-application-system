import { useAuth } from "@clerk/clerk-react";
import SubUserLeaves from "../sub-components/subUserLeaves";

const UserLeaves = () => {
  const { userId, isLoaded } = useAuth();
  if (isLoaded && !userId) {
    throw new Error("");
  }

  if (isLoaded && userId) {
    return (
      <div>
        <SubUserLeaves userId={userId} />
      </div>
    );
  }
};

export default UserLeaves;
