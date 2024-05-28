import { ReactNode, useState } from "react";
import LocationHistoryContext from "./locationHistoryContext";

const LocationHistoryState = (props: { children: ReactNode }) => {
  const [locationHistory, setLocationHistory] = useState("/");

  return (
    <LocationHistoryContext.Provider
      value={{ locationHistory, setLocationHistory }}
    >
      {props.children}
    </LocationHistoryContext.Provider>
  );
};

export default LocationHistoryState;
