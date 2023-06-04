import "./Form.css";
import RadioSelection from "./radioSelection/RadioSelection";
import SearchEmployee from "./searchEmployee/SearchEmployee";
import { useState, useContext, useEffect } from "react";
import DateRangeSelection from "./dateRangeSelection/DateRangeSelection";
import {UserId } from "../context/EmployeeContext";
import FormDataPublish from "./formDataPublish/FormDataPublish";
import firebase from "../../firebase";
import {
  getDatabase,
  ref,
  onValue,
  get,
  push,
  update,
} from "firebase/database";






const Form = ({clearForm}) => {
  const clearData = {
    key: "",
    radioSelection: "",
    timeOffData: {
      sickTime: [],
      personalTime: [],
    },
  };

  const clearDateRange = {
    startDate: "",
    endDate: "",
    numberOfDays: 0,
  };
  const [radioSelection, setRadioSelection] = useState("");
  let [formData,setFormData] = useState(clearData);
  const [selectedDateRange, setSelectedDateRange] = useState(clearDateRange);
  const { userId } = useContext(UserId);
  const updateDatabase = useEffect(()=>{
    

  },[])

  const handleFormSubmit = (e) => {
    
    e.preventDefault();
    if(userId && radioSelection){
      const employeeINFO = {
        key: userId,
        radioSelection: radioSelection,
        timeOffData: {
          sickTime: [],
          personalTime: [],
        },
      };

      if (radioSelection === "sickTime") {
        employeeINFO.timeOffData.sickTime.push(selectedDateRange);
      } else if (radioSelection === "personalTime") {
        employeeINFO.timeOffData.personalTime.push(selectedDateRange);
      }

    }
    clearForm(!true);
    setRadioSelection("");
  };
  return (
    <>
      <div className="trackTime__form--container">
        <form onSubmit={handleFormSubmit} action="" className="trackTime__form">
          <RadioSelection setRadioSelection={setRadioSelection} />
          <SearchEmployee />
          <DateRangeSelection updateDateRange={setSelectedDateRange} />
          <div>
            <button className="trackTime__submit--button" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className="formDataPublish">
        <FormDataPublish employee={formData} />
      </div>
    </>
  );
};

export default Form;
