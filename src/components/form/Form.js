import "./Form.css";
import RadioSelection from "./radioSelection/RadioSelection";
import SearchEmployee from "./searchEmployee/SearchEmployee";
import { useState, useContext } from "react";
import DateRangeSelection from "./dateRangeSelection/DateRangeSelection";
import { UserId, ClearData, CurrentUser } from "../context/EmployeeContext";

const Form = ({ clearForm }) => {
  const clearDateRange = {
    startDate: "",
    endDate: "",
    numberOfDays: 0,
  };
  const [radioSelection, setRadioSelection] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState(clearDateRange);
  const { formData, setFormData } = useContext(ClearData);
  const { currentEmployeeName, setCurrentEmployeeName } =
    useContext(CurrentUser);
  const { userId } = useContext(UserId);
  const handleFormSubmit = (e) => {
    setFormData({
      ...formData,
      timeOffData: {
        sickTime: [],
        personalTime: [],
      },
    });
    e.preventDefault();
    if (userId && radioSelection) {
      
      if (radioSelection === "sickTime") {
        // console.log(`From FORM Radio Selected Sick: ${formData.timeOffData.sickTime}`);
        formData.timeOffData.sickTime.push(selectedDateRange);
      } else if (radioSelection === "personalTime") {
        // console.log(
        //   `From FORM Radio Selected Personal: ${formData.timeOffData.personalTime}`
        // );
        formData.timeOffData.personalTime.push(selectedDateRange);
        // formData.timeOffData.personalTime.push(selectedDateRange);
      }
      // console.log(formData);
    }
    setFormData(formData);
    setRadioSelection("");
    setCurrentEmployeeName("");
    clearForm(!true);
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
    </>
  );
};

export default Form;
