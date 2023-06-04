import { createContext } from "react";

export const CurrentUser = createContext("");
export const UserId = createContext(null);
export const ClearData =createContext( 
  {
  key: "",
  radioSelection: "",
  timeOffData: {
    sickTime: [],
    personalTime: [],
  }}
  )