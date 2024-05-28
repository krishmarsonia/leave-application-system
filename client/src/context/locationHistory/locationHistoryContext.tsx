import { createContext } from "react";

const LocationHistoryContext = createContext<{
  locationHistory: string;
  setLocationHistory: React.Dispatch<React.SetStateAction<string>>;
}>({
  locationHistory: "/",
  setLocationHistory: () => null,
});

export default LocationHistoryContext;
