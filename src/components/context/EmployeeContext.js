import { createContext } from "react";

export const CurrentUser = createContext("");
export const UserId = createContext(null);
export const DateRange = 
createContext({
  startDate: "",
  endDate: "",
  numberOfDays: 0,
});
